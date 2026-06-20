'use client'

import { useRef, useState } from 'react'
import { Github, Linkedin, Mail, MessageSquare, Send } from './ui/Icons'
import emailjs from '@emailjs/browser'
import Section, { SectionHeader } from './ui/Section'
import Button from './ui/Button'
import { useContact } from '@/lib/content-context'
import styles from './Contact.module.css'
import { cn } from '@/lib/utils'

export default function Contact() {
  const contact = useContact()
  const formRef = useRef(null)
  const [status, setStatus] = useState(null)
  const [sending, setSending] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setSending(true)
    setStatus(null)
    const form = formRef.current
    try {
      const response = await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name.value,
          from_email: form.email.value,
          subject: form.subject.value,
          message: form.message.value,
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      )
      if (response.status === 200) {
        setStatus('success')
        form.reset()
      } else {
        throw new Error('Failed')
      }
    } catch {
      setStatus('error')
    } finally {
      setSending(false)
    }
  }

  return (
    <Section id="contact">
      <SectionHeader>
        <h2>Let&apos;s Connect</h2>
      </SectionHeader>
      <p className={styles.intro}>
        I&apos;m always interested in new opportunities, learning experiences, and connecting
        with fellow developers.
      </p>
      <div className={styles.columns}>
        <form ref={formRef} className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.inputRow}>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="name">Name</label>
              <input className={styles.input} id="name" name="name" required placeholder="John Doe" />
            </div>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="email">Email</label>
              <input className={styles.input} id="email" name="email" type="email" required placeholder="john@example.com" />
            </div>
          </div>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="subject">Subject</label>
            <input className={styles.input} id="subject" name="subject" required placeholder="What&apos;s this about?" />
          </div>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="message">Message</label>
            <textarea className={styles.textarea} id="message" name="message" required placeholder="Your message..." />
          </div>
          <Button variant="brand" type="submit" disabled={sending} icon={sending ? null : Send}>
            {sending ? 'Sending...' : 'Send Message'}
          </Button>
          {status === 'success' && (
            <p className={cn(styles.status, styles.success)}>Message sent successfully!</p>
          )}
          {status === 'error' && (
            <p className={cn(styles.status, styles.error)}>
              Something went wrong. Try emailing me at {contact?.email}
            </p>
          )}
        </form>

        <div className={styles.rightColumn}>
          <div className={styles.card}>
            <p className={styles.cardTitle}>Direct Contact</p>
            <div className={styles.quickLinks}>
              <a href={contact?.whatsapp} target="_blank" rel="noopener noreferrer" className={styles.quickLink}>
                <MessageSquare />
                WhatsApp
              </a>
              <a href={`mailto:${contact?.email}`} className={styles.quickLink}>
                <Mail />
                {contact?.email}
              </a>
            </div>
          </div>
          <div className={styles.card}>
            <p className={styles.cardTitle}>Social</p>
            <div className={styles.social}>
              <a href={contact?.github} target="_blank" rel="noopener noreferrer" title="GitHub">
                <Github size={24} />
              </a>
              <a href={contact?.linkedin} target="_blank" rel="noopener noreferrer" title="LinkedIn">
                <Linkedin size={24} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}
