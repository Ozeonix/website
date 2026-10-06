import * as React from 'react'
import { Body, Container, Head, Heading, Html, Preview, Section, Text } from '@react-email/components'
import type { TemplateEntry } from './registry'

interface ContactConfirmationProps {
  name?: string
  requirements?: string
  startTime?: string
}

const ContactConfirmationEmail = ({ name, requirements, startTime }: ContactConfirmationProps) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>We received your project brief</Preview>
    <Body style={styles.body}>
      <Container style={styles.container}>
        <Section style={styles.header}>
          <Text style={styles.brand}>OZEONIX INFINITY</Text>
          <Heading style={styles.heading}>Your project brief is with our team</Heading>
        </Section>
        <Section style={styles.content}>
          <Text style={styles.text}>Hi {name || 'there'},</Text>
          <Text style={styles.text}>Thanks for contacting Ozeonix Infinity. We’ve securely received your brief and our team will reply within one business day.</Text>
          <Text style={styles.summary}><strong>Requirement:</strong> {requirements || 'Project consultation'}<br /><strong>Preferred start:</strong> {startTime || 'Not specified'}</Text>
          <Text style={styles.text}>You can reply directly to this email if you need to add anything.</Text>
          <Text style={styles.signoff}>Ozeonix Infinity<br />Shape The Thought. Power Tomorrow</Text>
        </Section>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: ContactConfirmationEmail,
  subject: 'We received your Ozeonix Infinity project brief',
  displayName: 'Project brief confirmation',
  previewData: { name: 'Priya', requirements: 'Custom CRM', startTime: 'Within 1 month' },
} satisfies TemplateEntry

const styles = {
  body: { backgroundColor: '#ffffff', color: '#04284a', fontFamily: 'Arial, sans-serif', margin: 0 },
  container: { border: '1px solid #d9e2e8', borderRadius: '8px', margin: '32px auto', maxWidth: '620px', overflow: 'hidden' as const },
  header: { backgroundColor: '#04284a', padding: '24px 28px' },
  brand: { color: '#fee232', fontSize: '13px', fontWeight: 700, margin: '0 0 8px' },
  heading: { color: '#ffffff', fontSize: '25px', lineHeight: '32px', margin: 0 },
  content: { padding: '24px 28px' },
  text: { color: '#20394f', fontSize: '16px', lineHeight: '25px' },
  summary: { backgroundColor: '#f3f7f8', borderLeft: '4px solid #01b088', color: '#20394f', fontSize: '15px', lineHeight: '24px', padding: '16px' },
  signoff: { color: '#04284a', fontSize: '15px', fontWeight: 700, lineHeight: '23px', marginTop: '24px' },
}