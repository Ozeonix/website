import * as React from 'react'
import { render } from '@react-email/render'
import { TEMPLATES } from './registry'

export class EmailAPIError extends Error {
  code?: string;
  status?: number;

  constructor(message: string, code?: string, status?: number) {
    super(message);
    this.name = 'EmailAPIError';
    this.code = code;
    this.status = status;
  }
}

export async function sendOzeonixEmail(
  payload: {
    to: string;
    from: string;
    sender_domain: string;
    subject: string;
    html: string;
    text: string;
    purpose: string;
    label: string;
    idempotency_key: string;
    reply_to?: string;
  },
  options: { apiKey?: string; sendUrl?: string } = {}
) {
  const url = options.sendUrl || 'https://api.ozeonix.com/email/send';
  if (!options.apiKey) {
    console.warn('[sendOzeonixEmail] No API key configured. Email skipped:', payload.subject);
    return { ok: true };
  }
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${options.apiKey}`,
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const data = (await res.json().catch(() => ({}))) as { message?: string; code?: string };
    throw new EmailAPIError(data.message || 'Email delivery failed', data.code, res.status);
  }
  return res.json().catch(() => ({ ok: true }));
}

// Configuration baked in at scaffold time
const SITE_NAME = "Ozeonix Infinity Studio"
const SENDER_DOMAIN = "notify.ozeonix.com"
const FROM_DOMAIN = "ozeonix.com"

export type SendTemplateEmailResult =
  | { sent: true }
  | { sent: false; reason: 'recipient_suppressed' }

export interface SendTemplateEmailOptions {
  templateData?: Record<string, any>
  /** Dedupes retries of the same logical send; defaults to a random UUID (no dedupe). */
  idempotencyKey?: string
  replyTo?: string
}

/**
 * Renders a registered template and sends it through Ozeonix's managed email
 * API. Suppression, retries, and rate limits are enforced server-side.
 */
export async function sendTemplateEmail(
  templateName: string,
  to: string,
  options: SendTemplateEmailOptions = {}
): Promise<SendTemplateEmailResult> {
  const apiKey = process.env['OZEONIX_API_KEY'] || process.env['EMAIL_API_KEY']
  if (!apiKey) {
    console.warn('[sendTemplateEmail] OZEONIX_API_KEY is not configured. Running in safe mode.')
    return { sent: true }
  }

  const template = TEMPLATES[templateName]
  if (!template) {
    throw new Error(
      `Template '${templateName}' not found. Available: ${Object.keys(TEMPLATES).join(', ')}`
    )
  }

  const recipient = template.to || to
  if (!recipient) {
    throw new Error('Recipient is required (the template defines no fixed recipient)')
  }

  const templateData = options.templateData ?? {}
  const element = React.createElement(template.component, templateData)
  const html = await render(element)
  const text = await render(element, { plainText: true })
  const subject =
    typeof template.subject === 'function'
      ? template.subject(templateData)
      : template.subject

  try {
    await sendOzeonixEmail(
      {
        to: recipient,
        from: `${SITE_NAME} <noreply@${FROM_DOMAIN}>`,
        sender_domain: SENDER_DOMAIN,
        subject,
        html,
        text,
        purpose: 'transactional',
        label: templateName,
        idempotency_key: options.idempotencyKey || crypto.randomUUID(),
        reply_to: options.replyTo,
      },
      { apiKey, sendUrl: process.env['OZEONIX_SEND_URL'] || process.env['EMAIL_SEND_URL'] }
    )
  } catch (error) {
    if (error instanceof EmailAPIError && error.code === 'recipient_suppressed') {
      return { sent: false, reason: 'recipient_suppressed' }
    }
    throw error
  }

  return { sent: true }
}
