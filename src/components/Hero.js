'use client'

import { useState, useRef, useEffect } from 'react'
import { Download, Mail, MessageSquare } from './ui/Icons'
import Button from './ui/Button'
import { useHero, useContact } from '@/lib/content-context'
import styles from './Hero.module.css'

export default function Hero() {
  const hero = useHero()
  const contact = useContact()
  const [showContact, setShowContact] = useState(false)
  const contactRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(e) {
      if (contactRef.current && !contactRef.current.contains(e.target)) {
        setShowContact(false)
      }
    }
    if (showContact) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [showContact])

  function handleContactOption() {
    setShowContact(false)
  }

  return (
    <section id="home" className={styles.hero}>
      <div className={styles.heroGlow} />
      <div className={styles.heroOrb} />
      <div className={styles.heroOrb} />
      <div className={styles.heroOrb} />
      <div className={styles.heroOrb} />
      <div className={styles.content}>
        <span className={styles.greeting}>Hi, I&apos;m</span>
        <h1 className={styles.name}>
          <span className={styles.nameMain}>
            <span className={styles.nameHighlight}>{hero?.name || 'Your Name'}</span>
          </span>
        </h1>
        <p className={styles.title}>
          {hero?.title || 'Your Title'}
        </p>
        <p className={styles.subtitle}>{hero?.subtitle}</p>
        <div className={styles.buttons}>
          <Button variant="brand" icon={Download}>
            <a href="/resume.pdf" download style={{ color: 'inherit', textDecoration: 'none' }}>
              Download Resume
            </a>
          </Button>
          <div className={styles.contactWrap} ref={contactRef}>
            <Button variant="secondary" icon={Mail} onClick={() => setShowContact(!showContact)}>
              Get In Touch
            </Button>
            {showContact && (
              <div className={styles.contactDropdown}>
                <a href={contact.whatsapp} target="_blank" rel="noopener noreferrer" className={styles.contactOption} onClick={handleContactOption}>
                  <MessageSquare size={16} />
                  WhatsApp
                </a>
                <a href={`mailto:${contact.email}`} className={styles.contactOption} onClick={handleContactOption}>
                  <Mail size={16} />
                  Email
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
