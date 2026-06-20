'use client'

import { useEffect, useState } from 'react'
import { api } from '@/lib/api'

export default function AdminAbout() {
  const [form, setForm] = useState({ image: '', paragraphs: [] })
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState('')

  useEffect(() => {
    api.admin.fetch('about').then((data) => {
      if (data && data[0]) setForm(data[0])
    })
  }, [])

  function handleParagraphChange(index, value) {
    const updated = [...form.paragraphs]
    updated[index] = value
    setForm({ ...form, paragraphs: updated })
  }

  function addParagraph() {
    setForm({ ...form, paragraphs: [...form.paragraphs, ''] })
  }

  function removeParagraph(index) {
    setForm({ ...form, paragraphs: form.paragraphs.filter((_, i) => i !== index) })
  }

  async function handleSave(e) {
    e.preventDefault()
    setSaving(true)
    setMsg('')
    try {
      await api.admin.fetch('about', {
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
        <h1 className="pageTitle">About Section</h1>
        <p className="pageDesc">Edit your about section content.</p>
      </div>
      {msg && <div className="successMsg">{msg}</div>}
      <form onSubmit={handleSave}>
        <div className="card">
          <div className="cardTitle">About Content</div>
          <div className="field">
            <label className="label">Image Path</label>
            <input className="input" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} />
          </div>
          <div className="field">
            <label className="label">Paragraphs</label>
            {form.paragraphs.map((p, i) => (
              <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                <textarea
                  className="textarea"
                  value={p}
                  onChange={(e) => handleParagraphChange(i, e.target.value)}
                  style={{ flex: 1 }}
                />
                <button type="button" className="deleteBtn" onClick={() => removeParagraph(i)} style={{ height: 42, alignSelf: 'flex-start' }}>
                  Remove
                </button>
              </div>
            ))}
            <button type="button" className="addBtn" onClick={addParagraph} style={{ marginTop: 8 }}>
              + Add Paragraph
            </button>
          </div>
          <button className="saveBtn" type="submit" disabled={saving}>
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  )
}
