'use client'

import { useEffect, useState } from 'react'
import { api } from '@/lib/api'
import TagInput from '@/components/admin/TagInput'

const empty = { title: '', description: '', tech: [], features: [], github: '', order_index: 0 }

export default function AdminProjects() {
  const [items, setItems] = useState([])
  const [editing, setEditing] = useState(null)
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState('')

  useEffect(() => { load() }, [])

  async function load() {
    const data = await api.admin.fetch('projects', { query: '?order=order_index.asc' })
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
        await api.admin.fetch('projects', { method: 'PATCH', query: `?id=eq.${editing.id}`, body: editing })
      } else {
        await api.admin.fetch('projects', { method: 'POST', body: editing })
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
    if (!confirm('Delete this project?')) return
    await api.admin.fetch('projects', { method: 'DELETE', query: `?id=eq.${id}` })
    await load()
  }

  return (
    <div>
      <div className="pageHeader">
        <h1 className="pageTitle">Projects</h1>
        <p className="pageDesc">Manage your portfolio projects.</p>
      </div>
      {msg && <div className="successMsg">{msg}</div>}

      {editing && (
        <form onSubmit={save}>
          <div className="card">
            <div className="cardTitle">{editing.id ? 'Edit Project' : 'New Project'}</div>
            <div className="inputRow">
              <div className="field">
                <label className="label">Title</label>
                <input className="input" value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} required />
              </div>
              <div className="field">
                <label className="label">GitHub URL</label>
                <input className="input" value={editing.github} onChange={(e) => setEditing({ ...editing, github: e.target.value })} />
              </div>
            </div>
            <div className="field">
              <label className="label">Description</label>
              <textarea className="textarea" value={editing.description} onChange={(e) => setEditing({ ...editing, description: e.target.value })} required />
            </div>
            <div className="field">
              <label className="label">Order</label>
              <input className="input" type="number" value={editing.order_index} onChange={(e) => setEditing({ ...editing, order_index: +e.target.value })} />
            </div>
            <div className="field">
              <label className="label">Tech Stack</label>
              <TagInput tags={editing.tech} onChange={(v) => setEditing({ ...editing, tech: v })} placeholder="Add tech and press Enter" />
            </div>
            <div className="field">
              <label className="label">Features</label>
              <TagInput tags={editing.features} onChange={(v) => setEditing({ ...editing, features: v })} placeholder="Add feature and press Enter" />
            </div>
            <div style={{ display: 'flex', gap: 12 }}>
              <button className="saveBtn" type="submit" disabled={saving}>{saving ? 'Saving...' : 'Save'}</button>
              <button type="button" className="deleteBtn" onClick={() => setEditing(null)}>Cancel</button>
            </div>
          </div>
        </form>
      )}

      {!editing && (
        <button className="addBtn" onClick={() => startEdit(null)} style={{ marginBottom: 20 }}>+ Add Project</button>
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
          <div style={{ fontSize: 13, color: '#a0a3b5' }}>{item.tech?.join(', ')}</div>
        </div>
      ))}
    </div>
  )
}
