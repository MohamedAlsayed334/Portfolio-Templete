'use client'

import { useEffect, useState } from 'react'
import { api } from '@/lib/api'

export default function AdminHero() {
  const [form, setForm] = useState({ name: '', title: '', subtitle: '' })
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState('')

  useEffect(() => {
    api.admin.fetch('hero').then((data) => {
      if (data && data[0]) setForm(data[0])
    })
  }, [])

  async function handleSave(e) {
    e.preventDefault()
    setSaving(true)
    setMsg('')
    try {
      await api.admin.fetch('hero', {
        method: 'PATCH',
        query: '?id=eq.1',
        body: { ...form, updated_at: new Date().toISOString() },
      })
      setMsg('Saved successfully!')
    } catch {
      setMsg('Error saving')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div>
      <div className="pageHeader">
        <h1 className="pageTitle">Hero Section</h1>
        <p className="pageDesc">Edit your main hero banner content.</p>
      </div>
      {msg && <div className="successMsg">{msg}</div>}
      <form onSubmit={handleSave}>
        <div className="card">
          <div className="cardTitle">Hero Content</div>
          <div className="field">
            <label className="label">Name</label>
            <input className="input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </div>
          <div className="field">
            <label className="label">Title</label>
            <input className="input" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          </div>
          <div className="field">
            <label className="label">Subtitle</label>
            <textarea className="textarea" value={form.subtitle} onChange={(e) => setForm({ ...form, subtitle: e.target.value })} />
          </div>
          <button className="saveBtn" type="submit" disabled={saving}>
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  )
}
