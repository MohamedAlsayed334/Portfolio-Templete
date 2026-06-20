'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { api } from '@/lib/api'

const sections = ['hero', 'about', 'education', 'experience', 'skill_categories', 'projects', 'contact']

export default function AdminDashboard() {
  const [counts, setCounts] = useState({})
  const router = useRouter()

  useEffect(() => {
    async function load() {
      const results = {}
      for (const s of sections) {
        try {
          const data = await api.admin.fetch(s)
          results[s] = Array.isArray(data) ? data.length : 1
        } catch {
          results[s] = '?'
        }
      }
      setCounts(results)
    }
    load()
  }, [])

  const labels = {
    hero: 'Hero Section',
    about: 'About Section',
    education: 'Education',
    experience: 'Experience',
    skill_categories: 'Skills',
    projects: 'Projects',
    contact: 'Contact Info',
  }

  const paths = {
    hero: '/admin/hero',
    about: '/admin/about',
    education: '/admin/education',
    experience: '/admin/experience',
    skill_categories: '/admin/skills',
    projects: '/admin/projects',
    contact: '/admin/contact',
  }

  return (
    <div>
      <div className="pageHeader">
        <h1 className="pageTitle">Dashboard</h1>
        <p className="pageDesc">Manage all your portfolio content from one place.</p>
      </div>
      <div className="dashboardGrid">
        {sections.map((s) => (
          <a key={s} href={paths[s]} className="dashCard" onClick={(e) => { e.preventDefault(); router.push(paths[s]) }}>
            <span className="dashCardLabel">{labels[s]}</span>
            <span className="dashCardCount">{counts[s] ?? '...'}</span>
          </a>
        ))}
      </div>
    </div>
  )
}
