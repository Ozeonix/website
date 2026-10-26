import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { z } from "zod";

const leadSchema = z.object({
  client_name: z.string().trim().min(2).max(120),
  client_email: z.string().trim().email().max(255),
  client_phone: z.string().trim().max(30).optional().or(z.literal("")),
  client_company: z.string().trim().max(120).optional().or(z.literal("")),
  requirements: z.string().trim().max(200).optional().or(z.literal("")),
  notes: z.string().trim().max(1500).optional().or(z.literal("")),
});

/**
 * Partner submits a lead manually. Insert runs as the signed-in partner (RLS),
 * then admin + partner notification emails go out.
 */
export const submitPartnerLead = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => leadSchema.parse(data))
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;

    const { data: inserted, error } = await supabase
      .from("referrals")
      .insert({
        partner_id: userId,
        client_name: data.client_name,
        client_email: data.client_email,
        client_phone: data.client_phone || null,
        client_company: data.client_company || null,
        requirements: data.requirements || null,
        notes: data.notes || null,
        source: "manual",
      } as any)
      .select("id, commission_rate")
      .maybeSingle();

    if (error) {
      console.error("[referrals] partner insert failed:", error);
      throw new Error(error.message);
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("full_name, email, referral_code")
      .eq("id", userId)
      .maybeSingle();

    try {
      const { notifyNewReferralLead } = await import("./notify.server");
      await notifyNewReferralLead({
        referralId: (inserted as any)?.id ?? null,
        clientName: data.client_name,
        clientEmail: data.client_email,
        clientPhone: data.client_phone || null,
        clientCompany: data.client_company || null,
        requirements: data.requirements || null,
        notes: data.notes || null,
        source: "manual",
        commissionRate: Number((inserted as any)?.commission_rate ?? 10),
        partnerName: (profile as any)?.full_name ?? null,
        partnerEmail: (profile as any)?.email ?? null,
        referralCode: (profile as any)?.referral_code ?? null,
      });
    } catch (err) {
      console.error("[referrals] notification failed:", err);
    }

    return { ok: true, id: (inserted as any)?.id ?? null };
  });

/** Admin-only: full contact-lead log with referral attribution + commission fields. */
export const listContactLeads = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data: isAdmin } = await context.supabase.rpc("has_role", {
      _user_id: context.userId,
      _role: "admin",
    });
    if (!isAdmin) throw new Error("Forbidden");

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data, error } = await supabaseAdmin
      .from("contact_submissions")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(1000);
    if (error) throw new Error(error.message);
    return data ?? [];
  });
