'use client'

import { useState, useEffect } from 'react'
import styles from './Navbar.module.css'
import { cn, smoothScrollTo } from '@/lib/utils'

const links = [
  { href: '#about', label: 'About' },
  { href: '#education', label: 'Education' },
  { href: '#experience', label: 'Experience' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)

    const onScrollActive = () => {
      const sections = links.map(l => l.href.slice(1))
      let current = ''
      for (const id of sections.reverse()) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= 150) {
          current = id
          break
        }
      }
      setActive(current)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('scroll', onScrollActive, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('scroll', onScrollActive)
    }
  }, [])

  function handleNavClick(e, href) {
    e.preventDefault()
    setOpen(false)
    const targetId = href.slice(1)
    const target = document.getElementById(targetId)
    if (target) {
      const offset = 80
      const top = target.getBoundingClientRect().top + window.scrollY - offset
      smoothScrollTo(top)
    }
  }

  return (
    <nav className={cn(styles.nav, scrolled && styles.navScrolled)}>
      <div className={styles.inner}>
        <a href="#home" className={styles.logo} onClick={(e) => handleNavClick(e, '#home')}>
          Mohamed<span className={styles.logoDot}>.</span>dev
        </a>
        <button
          className={cn(styles.hamburger, open && styles.hamburgerOpen)}
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
        <ul className={cn(styles.links, open && styles.linksOpen)}>
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={cn(styles.link, active === link.href.slice(1) && styles.linkActive)}
                onClick={(e) => handleNavClick(e, link.href)}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
