// Central outbound referral notification helper. Delivery, retry and suppression
// are handled by Ozeonix's managed email service.

export const ADMIN_NOTIFICATION_EMAIL = "bhola.dev58@gmail.com";

type LeadPayload = {
  referralId?: string | null;
  clientName: string;
  clientEmail: string;
  clientPhone?: string | null;
  clientCompany?: string | null;
  requirements?: string | null;
  notes?: string | null;
  source: string;
  commissionRate?: number;
  partnerName?: string | null;
  partnerEmail?: string | null;
  referralCode?: string | null;
  notifyAdmin?: boolean;
};

/** Emails the admin and (when known) the partner about a brand-new referral lead. */
export async function notifyNewReferralLead(lead: LeadPayload): Promise<void> {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { sendTemplateEmail } = await import("@/lib/email-templates/send-email");

  const rows: {
    audience: string;
    recipient: string;
    templateName: "contact-admin-notification" | "referral-partner-notification";
    subject: string;
    templateData: Record<string, string | number | null | undefined>;
    replyTo?: string;
  }[] = [];

  if (lead.notifyAdmin !== false) {
    rows.push({
      audience: "admin",
      recipient: ADMIN_NOTIFICATION_EMAIL,
      templateName: "contact-admin-notification",
      subject: `New referral lead: ${lead.clientName}`,
      templateData: {
        name: lead.clientName, email: lead.clientEmail, phone: lead.clientPhone,
        company: lead.clientCompany, requirements: lead.requirements,
        message: lead.notes, referralCode: lead.referralCode, source: lead.source,
      },
      replyTo: lead.clientEmail,
    });
  }

  if (lead.partnerEmail) {
    const rate = lead.commissionRate ?? 10;
    rows.push({
      audience: "partner",
      recipient: lead.partnerEmail,
      templateName: "referral-partner-notification",
      subject: `Your referral was received: ${lead.clientName}`,
      templateData: {
        partnerName: lead.partnerName, clientName: lead.clientName,
        requirements: lead.requirements, commissionRate: rate,
      },
    });
  }

  for (const row of rows) {
    let sent = false;
    let sendError: string | null = null;
    try {
      const result = await sendTemplateEmail(row.templateName, row.recipient, {
        templateData: row.templateData,
        idempotencyKey: `${row.templateName}-${lead.referralId || lead.clientEmail}`,
        replyTo: row.replyTo,
      });
      sent = result.sent;
      if (!result.sent) sendError = result.reason;
    } catch (error) {
      sendError = error instanceof Error ? error.message : "Email delivery failed";
      console.error("[notify] managed email send failed:", error);
    }
    const { error } = await supabaseAdmin.from("lead_notifications").insert({
      referral_id: lead.referralId ?? null,
      recipient: row.recipient,
      audience: row.audience,
      channel: "email",
      subject: row.subject,
      body: JSON.stringify(row.templateData),
      sent,
      error: sendError,
    } as any);
    if (error) console.error("[notify] log insert failed:", error);
  }
}
