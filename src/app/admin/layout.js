'use client'

import { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import { api } from '@/lib/api'
import './admin.css'

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: '#' },
  { href: '/admin/hero', label: 'Hero', icon: '!' },
  { href: '/admin/about', label: 'About', icon: '@' },
  { href: '/admin/education', label: 'Education', icon: 'E' },
  { href: '/admin/experience', label: 'Experience', icon: 'X' },
  { href: '/admin/skills', label: 'Skills', icon: 'S' },
  { href: '/admin/projects', label: 'Projects', icon: 'P' },
  { href: '/admin/contact', label: 'Contact', icon: 'C' },
]

export default function AdminLayout({ children }) {
  const [authed, setAuthed] = useState(false)
  const [loading, setLoading] = useState(true)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    if (pathname === '/admin/login') {
      setLoading(false)
      return
    }
    const token = localStorage.getItem('supabase_token')
    if (!token) {
      router.replace('/admin/login')
      return
    }
    api.auth.me(token)
      .then((user) => {
        if (user) setAuthed(true)
        else router.replace('/admin/login')
      })
      .catch(() => router.replace('/admin/login'))
      .finally(() => setLoading(false))
  }, [pathname, router])

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  if (pathname === '/admin/login') return children

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0a0a12' }}>
        <div style={{ color: '#6b6e80', fontSize: 13 }}>Loading...</div>
      </div>
    )
  }

  if (!authed) return null

  function handleLogout() {
    localStorage.removeItem('supabase_token')
    localStorage.removeItem('supabase_refresh')
    router.replace('/admin/login')
  }

  return (
    <div className="adminLayout">
      {menuOpen && <div className="overlay" onClick={() => setMenuOpen(false)} />}
      <aside className={`sidebar ${menuOpen ? 'sidebarOpen' : ''}`}>
        <div className="sidebarHeader">
          <div className="sidebarBrand">Admin Panel</div>
          <button className="closeBtn" onClick={() => setMenuOpen(false)} aria-label="Close menu">&times;</button>
        </div>
        <nav className="sidebarNav">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`sidebarLink ${pathname === item.href ? 'sidebarLinkActive' : ''}`}
              style={{ display: 'flex', alignItems: 'center', gap: 10 }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="sidebarLogout">
          <button className="logoutBtn" onClick={handleLogout}>Logout</button>
        </div>
      </aside>
      <main className="main">
        <button className="hamburger" onClick={() => setMenuOpen(true)} aria-label="Open menu">
          <span /><span /><span />
        </button>
        {children}
      </main>
    </div>
  )
}
