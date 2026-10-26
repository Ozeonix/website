import type { ComponentType } from 'react'
import { template as contactAdminNotification } from './contact-admin-notification'
import { template as contactConfirmation } from './contact-confirmation'
import { template as referralPartnerNotification } from './referral-partner-notification'

export interface TemplateEntry {
  component: ComponentType<any>
  subject: string | ((data: Record<string, any>) => string)
  displayName?: string
  previewData?: Record<string, any>
  /** Fixed recipient — overrides caller-provided recipientEmail when set. */
  to?: string
}

/**
 * Template registry — maps template names to their React Email components.
 * Import and register new templates here after creating them in this directory.
 *
 * Example:
 *   import { template as welcomeTemplate } from './welcome'
 *   // then add to TEMPLATES: 'welcome': welcomeTemplate
 */
export const TEMPLATES: Record<string, TemplateEntry> = {
  'contact-admin-notification': contactAdminNotification,
  'contact-confirmation': contactConfirmation,
  'referral-partner-notification': referralPartnerNotification,
}
