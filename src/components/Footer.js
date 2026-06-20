'use client'

import { smoothScrollTo } from '@/lib/utils'
import styles from './Footer.module.css'

const links = [
  { href: '#about', label: 'About' },
  { href: '#education', label: 'Education' },
  { href: '#experience', label: 'Experience' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
]

export default function Footer() {
  function handleClick(e, href) {
    e.preventDefault()
    const targetId = href.slice(1)
    const target = document.getElementById(targetId)
    if (target) {
      const offset = 80
      const top = target.getBoundingClientRect().top + window.scrollY - offset
      smoothScrollTo(top)
    }
  }

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.links}>
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={(e) => handleClick(e, l.href)}>{l.label}</a>
          ))}
        </div>
        <p className={styles.copy}>
          &copy; {new Date().getFullYear()} Mohamed Alsayed. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
