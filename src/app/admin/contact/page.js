'use client'

import { useEffect, useState } from 'react'
import { api } from '@/lib/api'

export default function AdminContact() {
  const [form, setForm] = useState({ whatsapp: '', email: '', github: '', linkedin: '', facebook: '' })
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState('')

  useEffect(() => {
    api.admin.fetch('contact').then((data) => {
      if (data && data[0]) setForm(data[0])
    })
  }, [])

  async function handleSave(e) {
    e.preventDefault()
    setSaving(true)
    setMsg('')
    try {
      await api.admin.fetch('contact', {
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
        <h1 className="pageTitle">Contact Info</h1>
        <p className="pageDesc">Edit your contact details and social links.</p>
      </div>
      {msg && <div className="successMsg">{msg}</div>}
      <form onSubmit={handleSave}>
        <div className="card">
          <div className="cardTitle">Contact Details</div>
          <div className="field">
            <label className="label">WhatsApp URL</label>
            <input className="input" value={form.whatsapp} onChange={(e) => setForm({ ...form, whatsapp: e.target.value })} />
          </div>
          <div className="field">
            <label className="label">Email</label>
            <input className="input" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          </div>
          <div className="field">
            <label className="label">GitHub URL</label>
            <input className="input" value={form.github} onChange={(e) => setForm({ ...form, github: e.target.value })} />
          </div>
          <div className="field">
            <label className="label">LinkedIn URL</label>
            <input className="input" value={form.linkedin} onChange={(e) => setForm({ ...form, linkedin: e.target.value })} />
          </div>
          <div className="field">
            <label className="label">Facebook URL</label>
            <input className="input" value={form.facebook} onChange={(e) => setForm({ ...form, facebook: e.target.value })} />
          </div>
          <button className="saveBtn" type="submit" disabled={saving}>
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  )
}
