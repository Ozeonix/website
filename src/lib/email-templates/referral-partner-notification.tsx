import * as React from 'react'
import { Body, Container, Head, Heading, Html, Preview, Section, Text } from '@react-email/components'
import type { TemplateEntry } from './registry'

interface ReferralPartnerProps {
  partnerName?: string
  clientName?: string
  requirements?: string
  commissionRate?: number
}

const ReferralPartnerEmail = ({ partnerName, clientName, requirements, commissionRate }: ReferralPartnerProps) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>Your referral has been received</Preview>
    <Body style={styles.body}>
      <Container style={styles.container}>
        <Section style={styles.header}><Text style={styles.brand}>OZEONIX INFINITY</Text><Heading style={styles.heading}>Referral received</Heading></Section>
        <Section style={styles.content}>
          <Text style={styles.text}>Hi {partnerName || 'partner'},</Text>
          <Text style={styles.text}>We received the referral for <strong>{clientName || 'your client'}</strong>.</Text>
          <Text style={styles.summary}><strong>Requirement:</strong> {requirements || 'Not specified'}<br /><strong>Commission rate:</strong> {commissionRate ?? 10}%</Text>
          <Text style={styles.text}>You can track its status from your partner dashboard.</Text>
        </Section>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: ReferralPartnerEmail,
  subject: (data) => `Your referral was received: ${data.clientName || 'new client'}`,
  displayName: 'Partner referral notification',
  previewData: { partnerName: 'Partner', clientName: 'Priya Sharma', requirements: 'Custom CRM', commissionRate: 10 },
} satisfies TemplateEntry

const styles = {
  body: { backgroundColor: '#ffffff', color: '#04284a', fontFamily: 'Arial, sans-serif', margin: 0 },
  container: { border: '1px solid #d9e2e8', borderRadius: '8px', margin: '32px auto', maxWidth: '620px', overflow: 'hidden' as const },
  header: { backgroundColor: '#04284a', padding: '24px 28px' },
  brand: { color: '#fee232', fontSize: '13px', fontWeight: 700, margin: '0 0 8px' },
  heading: { color: '#ffffff', fontSize: '25px', margin: 0 },
  content: { padding: '24px 28px' },
  text: { color: '#20394f', fontSize: '16px', lineHeight: '25px' },
  summary: { backgroundColor: '#f3f7f8', borderLeft: '4px solid #01b088', color: '#20394f', fontSize: '15px', lineHeight: '24px', padding: '16px' },
}