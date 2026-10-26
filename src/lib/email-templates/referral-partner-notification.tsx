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
  body: { backgroundColor: '#FFFFFF', color: '#06294B', fontFamily: 'Arial, sans-serif', margin: 0 },
  container: { border: '1px solid #E5E7EB', borderRadius: '8px', margin: '32px auto', maxWidth: '620px', overflow: 'hidden' as const },
  header: { backgroundColor: '#06294B', padding: '24px 28px' },
  brand: { color: '#FF6900', fontSize: '13px', fontWeight: 700, margin: '0 0 8px' },
  heading: { color: '#FFFFFF', fontSize: '25px', margin: 0 },
  content: { padding: '24px 28px' },
  text: { color: '#4B5563', fontSize: '16px', lineHeight: '25px' },
  summary: { backgroundColor: '#F4F7FA', borderLeft: '4px solid #00A982', color: '#06294B', fontSize: '15px', lineHeight: '24px', padding: '16px' },
}