import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { COUNTRIES, CITIES, REQUIREMENTS, START_TIMES } from "@/lib/constants";

// Public contact form endpoint.
// - Validates input with Zod
// - Persists to public.contact_submissions (via service role)
// - Sends managed team and submitter emails (once the sender domain is verified)
//
// Placed under /api/public/* so the published site allows unauthenticated POSTs.
// Security in-handler: strict schema, length caps, basic in-memory rate limit.

const phoneRegex = /^\+?[0-9\s()\-]{7,20}$/;

function oneOf(values: readonly string[], message: string) {
  return z.string().refine((v) => values.includes(v), { message });
}

const bodySchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().max(30).optional().or(z.literal("")).refine(
    (v) => !v || phoneRegex.test(v),
    { message: "Invalid phone" },
  ),
  company: z.string().trim().max(120).optional().or(z.literal("")),
  country: oneOf(COUNTRIES, "Please select a country."),
  city: oneOf(CITIES, "Please select a city / region."),
  requirements: oneOf(REQUIREMENTS, "Please choose a requirement."),
  start_time: oneOf(START_TIMES, "Please select when you want to start."),
  budget: z.string().trim().min(1, "Please enter your approximate budget.").max(80),
  message: z.string().trim().min(10).max(1200),
  referral_code: z.string().trim().max(20).regex(/^[A-Za-z0-9]*$/).optional().or(z.literal("")),
});

// Simple sliding-window per-IP rate limit (per worker instance).
const RATE_WINDOW_MS = 60_000;
const RATE_MAX = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const arr = (hits.get(ip) || []).filter((t) => now - t < RATE_WINDOW_MS);
  arr.push(now);
  hits.set(ip, arr);
  return arr.length > RATE_MAX;
}

export const Route = createFileRoute("/api/public/contact")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const ip =
          request.headers.get("cf-connecting-ip") ||
          request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
          "unknown";
        if (rateLimited(ip)) {
          return Response.json(
            { ok: false, error: "Too many requests. Please try again shortly." },
            { status: 429 },
          );
        }

        let json: unknown;
        try {
          json = await request.json();
        } catch {
          return Response.json({ ok: false, error: "Invalid JSON body" }, { status: 400 });
        }
        const parsed = bodySchema.safeParse(json);
        if (!parsed.success) {
          return Response.json(
            { ok: false, error: "Please check the form and try again." },
            { status: 400 },
          );
        }
        const data = parsed.data;

        let submissionId: string;
        let partnerNotification: Promise<void> | null = null;

        // Persist first so every accepted inquiry has a durable record and stable email IDs.
        try {
          const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
          const referralCode = (data.referral_code || "").toUpperCase();
          const { data: submission, error } = await supabaseAdmin.from("contact_submissions").insert({
            name: data.name,
            email: data.email,
            phone: data.phone || null,
            company: data.company || null,
            country: data.country,
            city: data.city,
            requirements: data.requirements,
            start_time: data.start_time,
            budget: data.budget,
            message: data.message,
            referral_code: referralCode || null,
            source_ip: ip,
            user_agent: request.headers.get("user-agent") || null,
          } as any).select("id").single();
          if (error || !submission?.id) {
            console.error("[contact] db insert failed:", error);
            return Response.json({ ok: false, error: "We could not save your brief. Please try again." }, { status: 503 });
          }
          submissionId = submission.id;

          // Attribute the lead to the partner who owns this referral code.
          if (referralCode) {
            const { data: partner } = await supabaseAdmin
              .from("profiles")
              .select("id, full_name, email")
              .eq("referral_code", referralCode)
              .maybeSingle();
            if (partner?.id) {
              const notes = `Budget: ${data.budget} · Start: ${data.start_time} · ${data.city}, ${data.country}\n\n${data.message}`;
              const { data: referral, error: refErr } = await supabaseAdmin
                .from("referrals")
                .insert({
                  partner_id: partner.id,
                  client_name: data.name,
                  client_email: data.email,
                  client_phone: data.phone || null,
                  client_company: data.company || null,
                  requirements: data.requirements,
                  notes,
                  source: "link",
                } as any)
                .select("id, commission_rate")
                .maybeSingle();
              if (refErr) console.error("[contact] referral insert failed:", refErr);

              try {
                const { notifyNewReferralLead } = await import("@/lib/notify.server");
                partnerNotification = notifyNewReferralLead({
                  referralId: (referral as any)?.id ?? null,
                  clientName: data.name,
                  clientEmail: data.email,
                  clientPhone: data.phone || null,
                  clientCompany: data.company || null,
                  requirements: data.requirements,
                  notes,
                  source: "link",
                  commissionRate: Number((referral as any)?.commission_rate ?? 10),
                  partnerName: (partner as any).full_name ?? null,
                  partnerEmail: (partner as any).email ?? null,
                  referralCode,
                  notifyAdmin: false,
                });
              } catch (err) {
                console.error("[contact] referral notification failed:", err);
              }
            }
          }
        } catch (err) {
          console.error("[contact] db unavailable:", err);
          return Response.json({ ok: false, error: "We could not save your brief. Please try again." }, { status: 503 });
        }

        const { sendTemplateEmail } = await import("@/lib/email-templates/send-email");
        const templateData = {
          name: data.name, email: data.email, phone: data.phone || undefined,
          company: data.company || undefined, country: data.country, city: data.city,
          requirements: data.requirements, startTime: data.start_time,
          budget: data.budget, message: data.message,
          referralCode: data.referral_code || undefined, source: "Website project brief",
        };

        const sendResults = await Promise.allSettled([
          sendTemplateEmail("contact-admin-notification", "bhola.dev58@gmail.com", {
            templateData,
            idempotencyKey: `contact-admin-${submissionId}`,
            replyTo: data.email,
          }),
          sendTemplateEmail("contact-confirmation", data.email, {
            templateData,
            idempotencyKey: `contact-confirmation-${submissionId}`,
            replyTo: "bhola.dev58@gmail.com",
          }),
          ...(partnerNotification ? [partnerNotification] : []),
        ]);
        sendResults.forEach((result, index) => {
          if (result.status === "rejected") console.error(`[contact] email ${index + 1} failed:`, result.reason);
        });

        return Response.json({ ok: true, submissionId });
      },
    },
  },
});
