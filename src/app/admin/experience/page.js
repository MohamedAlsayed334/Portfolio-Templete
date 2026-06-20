'use client'

import { useEffect, useState } from 'react'
import { api } from '@/lib/api'
import TagInput from '@/components/admin/TagInput'

const empty = { title: '', company: '', period: '', image: '', details: [], order_index: 0 }

export default function AdminExperience() {
  const [items, setItems] = useState([])
  const [editing, setEditing] = useState(null)
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState('')

  useEffect(() => { load() }, [])

  async function load() {
    const data = await api.admin.fetch('experience', { query: '?order=order_index.asc' })
    setItems(data || [])
  }

  function startEdit(item) {
    setEditing(item ? { ...item } : { ...empty })
  }

  async function save(e) {
    e.preventDefault()
    setSaving(true)
    setMsg('')
    try {
      if (editing.id) {
        await api.admin.fetch('experience', { method: 'PATCH', query: `?id=eq.${editing.id}`, body: editing })
      } else {
        await api.admin.fetch('experience', { method: 'POST', body: editing })
      }
      setMsg('Saved!')
      setEditing(null)
      await load()
    } catch {
      setMsg('Error saving')
    } finally {
      setSaving(false)
    }
  }

  async function remove(id) {
    if (!confirm('Delete this entry?')) return
    await api.admin.fetch('experience', { method: 'DELETE', query: `?id=eq.${id}` })
    await load()
  }

  return (
    <div>
      <div className="pageHeader">
        <h1 className="pageTitle">Experience</h1>
        <p className="pageDesc">Manage your work experience entries.</p>
      </div>
      {msg && <div className="successMsg">{msg}</div>}

      {editing && (
        <form onSubmit={save}>
          <div className="card">
            <div className="cardTitle">{editing.id ? 'Edit Entry' : 'New Entry'}</div>
            <div className="inputRow">
              <div className="field">
                <label className="label">Title</label>
                <input className="input" value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} required />
              </div>
              <div className="field">
                <label className="label">Company</label>
                <input className="input" value={editing.company} onChange={(e) => setEditing({ ...editing, company: e.target.value })} required />
              </div>
            </div>
            <div className="inputRow">
              <div className="field">
                <label className="label">Period</label>
                <input className="input" value={editing.period} onChange={(e) => setEditing({ ...editing, period: e.target.value })} />
              </div>
              <div className="field">
                <label className="label">Image Path</label>
                <input className="input" value={editing.image} onChange={(e) => setEditing({ ...editing, image: e.target.value })} />
              </div>
            </div>
            <div className="field">
              <label className="label">Order</label>
              <input className="input" type="number" value={editing.order_index} onChange={(e) => setEditing({ ...editing, order_index: +e.target.value })} />
            </div>
            <div className="field">
              <label className="label">Details</label>
              <TagInput tags={editing.details} onChange={(v) => setEditing({ ...editing, details: v })} placeholder="Add detail and press Enter" />
            </div>
            <div style={{ display: 'flex', gap: 12 }}>
              <button className="saveBtn" type="submit" disabled={saving}>{saving ? 'Saving...' : 'Save'}</button>
              <button type="button" className="deleteBtn" onClick={() => setEditing(null)}>Cancel</button>
            </div>
          </div>
        </form>
      )}

      {!editing && (
        <button className="addBtn" onClick={() => startEdit(null)} style={{ marginBottom: 20 }}>+ Add Experience Entry</button>
      )}

      {items.map((item) => (
        <div key={item.id} className="entryCard">
          <div className="entryHeader">
            <span className="entryTitle">{item.title}</span>
            <div className="entryActions">
              <button className="saveBtn" style={{ padding: '6px 14px', fontSize: 11 }} onClick={() => startEdit(item)}>Edit</button>
              <button className="deleteBtn" onClick={() => remove(item.id)}>Delete</button>
            </div>
          </div>
          <div style={{ fontSize: 13, color: '#a0a3b5' }}>{item.company} &middot; {item.period}</div>
        </div>
      ))}
    </div>
  )
}
