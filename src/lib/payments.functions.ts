import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
import { z } from "zod";

const MIN_AMOUNT = 100;
const MAX_AMOUNT = 1_000_000;

const createSchema = z.object({
  purpose: z.enum(["package", "invoice"]),
  package_slug: z.string().trim().max(80).optional().or(z.literal("")),
  amount: z.number().finite().optional(),
  payer_name: z.string().trim().min(2).max(100),
  payer_email: z.string().trim().email().max(255),
  payer_phone: z.string().trim().max(30).optional().or(z.literal("")),
  note: z.string().trim().max(500).optional().or(z.literal("")),
  referral_code: z.string().trim().max(20).regex(/^[A-Za-z0-9]*$/).optional().or(z.literal("")),
});

function originFromRequest(): string {
  const req = getRequest();
  const url = new URL(req.url);
  const forwardedHost = req.headers.get("x-forwarded-host");
  const host = forwardedHost || url.host;
  const proto = host.startsWith("localhost") || host.startsWith("127.0.0.1") ? "http" : "https";
  return `${proto}://${host}`;
}

/** Creates a pending payment row and returns the exact fields to POST to eSewa. */
export const createEsewaPayment = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => createSchema.parse(data))
  .handler(async ({ data }) => {
    const { getEsewaConfig, sign, buildSignedMessage, newTransactionUuid } = await import("./esewa.server");
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const config = getEsewaConfig();

    // Amount is always resolved on the server; never trusted from the browser for packages.
    let amount: number;
    let packageSlug: string | null = null;
    if (data.purpose === "package") {
      const slug = (data.package_slug || "").trim();
      if (!slug) throw new Error("Please choose a package.");
      const { data: pkg, error } = await supabaseAdmin
        .from("service_packages")
        .select("slug, price, is_active")
        .eq("slug", slug)
        .maybeSingle();
      if (error || !pkg || !(pkg as any).is_active) throw new Error("That package is not available.");
      amount = Number((pkg as any).price);
      packageSlug = (pkg as any).slug;
    } else {
      amount = Math.round(Number(data.amount || 0) * 100) / 100;
      if (!Number.isFinite(amount) || amount < MIN_AMOUNT || amount > MAX_AMOUNT) {
        throw new Error(`Enter an amount between Rs ${MIN_AMOUNT} and Rs ${MAX_AMOUNT}.`);
      }
    }

    const transactionUuid = newTransactionUuid();
    const totalAmount = amount.toFixed(2);
    const origin = originFromRequest();

    const fields: Record<string, string> = {
      amount: totalAmount,
      tax_amount: "0",
      total_amount: totalAmount,
      transaction_uuid: transactionUuid,
      product_code: config.productCode,
      product_service_charge: "0",
      product_delivery_charge: "0",
      success_url: `${origin}/payment/success`,
      failure_url: `${origin}/payment/failed`,
      signed_field_names: "total_amount,transaction_uuid,product_code",
    };
    fields["signature"] = sign(buildSignedMessage(fields, fields["signed_field_names"]!), config.secretKey);

    const { error: insertError } = await supabaseAdmin.from("payments").insert({
      transaction_uuid: transactionUuid,
      purpose: data.purpose,
      package_slug: packageSlug,
      amount,
      total_amount: amount,
      status: "PENDING",
      provider: "esewa",
      environment: config.environment,
      product_code: config.productCode,
      payer_name: data.payer_name,
      payer_email: data.payer_email,
      payer_phone: data.payer_phone || null,
      referral_code: (data.referral_code || "").toUpperCase() || null,
      note: data.note || null,
    } as any);
    if (insertError) {
      console.error("[payments] insert failed:", insertError);
      throw new Error("Could not start the payment. Please try again.");
    }

    return { formAction: config.formUrl, fields, transactionUuid, totalAmount };
  });

const verifySchema = z.object({
  data: z.string().trim().max(4000).optional().or(z.literal("")),
  transaction_uuid: z.string().trim().max(120).optional().or(z.literal("")),
});

/**
 * Verifies an eSewa return. The browser redirect is never trusted on its own:
 * the base64 payload signature is checked and then confirmed server-to-server.
 */
export const verifyEsewaPayment = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => verifySchema.parse(input))
  .handler(async ({ data }) => {
    const { getEsewaConfig, sign, buildSignedMessage, safeEqual, checkStatus } = await import("./esewa.server");
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const config = getEsewaConfig();

    let payload: Record<string, any> | null = null;
    let signatureValid = false;

    if (data.data) {
      try {
        payload = JSON.parse(Buffer.from(data.data, "base64").toString("utf8"));
      } catch {
        payload = null;
      }
    }

    if (payload && typeof payload["signed_field_names"] === "string" && typeof payload["signature"] === "string") {
      const stringFields: Record<string, string> = {};
      for (const [k, v] of Object.entries(payload)) stringFields[k] = String(v ?? "");
      const expected = sign(
        buildSignedMessage(stringFields, payload["signed_field_names"]),
        config.secretKey,
      );
      signatureValid = safeEqual(expected, payload["signature"]);
    }

    const transactionUuid = String(payload?.["transaction_uuid"] || data.transaction_uuid || "");
    if (!transactionUuid) {
      return { state: "unknown" as const, message: "No payment reference was returned." };
    }

    const { data: row } = await supabaseAdmin
      .from("payments")
      .select("*")
      .eq("transaction_uuid", transactionUuid)
      .maybeSingle();

    if (!row) {
      return { state: "unknown" as const, message: "We could not find that payment reference." };
    }

    const record = row as any;
    if (record.status === "COMPLETE") {
      return {
        state: "complete" as const,
        amount: Number(record.total_amount),
        transactionUuid,
        refId: record.ref_id,
      };
    }

    // Authoritative check, regardless of what the redirect claimed.
    const status = await checkStatus({
      productCode: config.productCode,
      totalAmount: Number(record.total_amount).toFixed(2),
      transactionUuid,
      statusUrl: config.statusUrl,
    });

    const esewaStatus = String(status.status || "").toUpperCase();
    const unresolved = ["PENDING", "AMBIGUOUS", ""].includes(esewaStatus);

    await supabaseAdmin
      .from("payments")
      .update({
        status: esewaStatus || "PENDING",
        ref_id: status.ref_id ?? record.ref_id ?? null,
        transaction_code: payload?.["transaction_code"] ?? record.transaction_code ?? null,
        raw_response: { redirect: payload, status, signature_valid: signatureValid } as any,
      } as any)
      .eq("transaction_uuid", transactionUuid);

    if (esewaStatus === "COMPLETE") {
      return {
        state: "complete" as const,
        amount: Number(record.total_amount),
        transactionUuid,
        refId: status.ref_id ?? null,
      };
    }
    if (unresolved) {
      return {
        state: "pending" as const,
        transactionUuid,
        message:
          "Your payment is still being confirmed by eSewa. Keep this reference and we will confirm shortly.",
      };
    }
    return {
      state: "failed" as const,
      transactionUuid,
      message: `eSewa reported this payment as ${esewaStatus.toLowerCase()}.`,
    };
  });

/** Public list of purchasable packages. */
export const listServicePackages = createServerFn({ method: "GET" }).handler(async () => {
  const { createClient } = await import("@supabase/supabase-js");
  const key = process.env["SUPABASE_PUBLISHABLE_KEY"]!;
  const client = createClient(process.env["SUPABASE_URL"]!, key, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: {
      fetch: (input, init) => {
        const h = new Headers(init?.headers);
        if (key.startsWith("sb_") && h.get("Authorization") === `Bearer ${key}`) h.delete("Authorization");
        h.set("apikey", key);
        return fetch(input, { ...init, headers: h });
      },
    },
  });
  const { data, error } = await client
    .from("service_packages")
    .select("slug, name, description, price, features, sort_order")
    .eq("is_active", true)
    .order("sort_order", { ascending: true });
  if (error) {
    console.error("[payments] package list failed:", error);
    return [] as any[];
  }
  return data ?? [];
});
