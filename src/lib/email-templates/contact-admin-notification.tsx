import * as React from 'react'
import { Body, Container, Head, Heading, Html, Preview, Section, Text } from '@react-email/components'
import type { TemplateEntry } from './registry'

interface ContactAdminProps {
  name?: string
  email?: string
  phone?: string
  company?: string
  country?: string
  city?: string
  requirements?: string
  startTime?: string
  budget?: string
  message?: string
  referralCode?: string
  source?: string
}

const ContactAdminEmail = (props: ContactAdminProps) => {
  const name = props.name || 'A prospective client'
  const details = [
    ['Name', name],
    ['Email', props.email || 'Not provided'],
    ['Phone', props.phone || 'Not provided'],
    ['Company', props.company || 'Not provided'],
    ['Location', [props.city, props.country].filter(Boolean).join(', ') || 'Not provided'],
    ['Requirements', props.requirements || 'Not provided'],
    ['Start time', props.startTime || 'Not provided'],
    ['Budget', props.budget || 'Not provided'],
    ['Source', props.source || 'Website project brief'],
    ['Referral code', props.referralCode || 'None'],
  ]

  return (
    <Html lang="en" dir="ltr">
      <Head />
      <Preview>{`New project brief from ${name}`}</Preview>
      <Body style={styles.body}>
        <Container style={styles.container}>
          <Section style={styles.header}>
            <Text style={styles.brand}>OZEONIX INFINITY</Text>
            <Heading style={styles.heading}>New project brief</Heading>
          </Section>
          <Section style={styles.content}>
            {details.map(([label, value]) => (
              <Text key={label} style={styles.detail}><strong>{label}:</strong> {value}</Text>
            ))}
            <Text style={styles.messageLabel}>Project details</Text>
            <Text style={styles.message}>{props.message || 'No additional details provided.'}</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

export const template = {
  component: ContactAdminEmail,
  subject: (data) => `New project brief from ${data.name || 'a prospective client'}`,
  displayName: 'Team project brief notification',
  to: 'bhola.dev58@gmail.com',
  previewData: {
    name: 'Priya Sharma', email: 'priya@example.com', phone: '+977 9800000000',
    company: 'Example Company', country: 'Nepal', city: 'Kathmandu',
    requirements: 'Custom CRM', startTime: 'Within 1 month', budget: 'Rs 2,00,000',
    message: 'We need a CRM for our sales and customer support teams.', source: 'Website project brief',
  },
} satisfies TemplateEntry

const styles = {
  body: { backgroundColor: '#ffffff', color: '#04284a', fontFamily: 'Arial, sans-serif', margin: 0 },
  container: { border: '1px solid #d9e2e8', borderRadius: '8px', margin: '32px auto', maxWidth: '620px', overflow: 'hidden' as const },
  header: { backgroundColor: '#04284a', padding: '24px 28px' },
  brand: { color: '#fee232', fontSize: '13px', fontWeight: 700, margin: '0 0 8px' },
  heading: { color: '#ffffff', fontSize: '26px', margin: 0 },
  content: { padding: '24px 28px' },
  detail: { color: '#20394f', fontSize: '15px', lineHeight: '22px', margin: '0 0 8px' },
  messageLabel: { color: '#04284a', fontSize: '15px', fontWeight: 700, margin: '22px 0 6px' },
  message: { backgroundColor: '#f3f7f8', borderLeft: '4px solid #01b088', color: '#20394f', fontSize: '15px', lineHeight: '23px', margin: 0, padding: '16px', whiteSpace: 'pre-wrap' as const },
}