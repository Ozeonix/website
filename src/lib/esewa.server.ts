// eSewa ePay v2 helpers. Server-only: never import from client code.
import { createHmac, timingSafeEqual } from "crypto";

export type EsewaConfig = {
  environment: "uat" | "production";
  productCode: string;
  secretKey: string;
  formUrl: string;
  statusUrl: string;
};

export function getEsewaConfig(): EsewaConfig {
  const productCode = process.env["ESEWA_PRODUCT_CODE"] || "EPAYTEST";
  // UAT (test) sandbox secret published by eSewa; production uses ESEWA_SECRET_KEY.
  const secretKey = process.env["ESEWA_SECRET_KEY"] || "8gBm/:&EnhH.1/q";
  const environment = (process.env["ESEWA_ENVIRONMENT"] || "uat") === "production" ? "production" : "uat";

  return {
    environment,
    productCode,
    secretKey,
    formUrl:
      environment === "production"
        ? "https://epay.esewa.com.np/api/epay/main/v2/form"
        : "https://rc-epay.esewa.com.np/api/epay/main/v2/form",
    statusUrl:
      environment === "production"
        ? "https://esewa.com.np/api/epay/transaction/status/"
        : "https://rc.esewa.com.np/api/epay/transaction/status/",
  };
}

export function sign(message: string, secretKey: string): string {
  return createHmac("sha256", secretKey).update(message).digest("base64");
}

/** Builds `key=value,key=value` in the exact order of signed_field_names. */
export function buildSignedMessage(fields: Record<string, string>, signedFieldNames: string): string {
  return signedFieldNames
    .split(",")
    .map((k) => `${k}=${fields[k] ?? ""}`)
    .join(",");
}

export function safeEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return timingSafeEqual(bufA, bufB);
}

/** Unique, alphanumeric + hyphen only, fresh on every attempt. */
export function newTransactionUuid(): string {
  const now = new Date();
  const stamp = now.toISOString().replace(/[^0-9]/g, "").slice(2, 14);
  const rand = Math.random().toString(36).replace(/[^a-z0-9]/g, "").slice(0, 6);
  return `OZ-${stamp}-${rand}`;
}

export type EsewaStatus = {
  product_code?: string;
  transaction_uuid?: string;
  total_amount?: number;
  status?: string;
  ref_id?: string | null;
  code?: number;
  error_message?: string;
};

export async function checkStatus(params: {
  productCode: string;
  totalAmount: string;
  transactionUuid: string;
  statusUrl: string;
}): Promise<EsewaStatus> {
  const url = `${params.statusUrl}?product_code=${encodeURIComponent(params.productCode)}&total_amount=${encodeURIComponent(
    params.totalAmount,
  )}&transaction_uuid=${encodeURIComponent(params.transactionUuid)}`;
  try {
    const res = await fetch(url, { headers: { Accept: "application/json" } });
    return (await res.json()) as EsewaStatus;
  } catch (err) {
    console.error("[esewa] status check failed:", err);
    return { code: 0, error_message: "Service is currently unavailable" };
  }
}
