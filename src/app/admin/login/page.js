'use client'

import { useState } from 'react'
import { api } from '@/lib/api'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const data = await api.auth.login(email, password)
      localStorage.setItem('supabase_token', data.access_token)
      localStorage.setItem('supabase_refresh', data.refresh_token)

      window.location.href = '/admin'
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#0a0a12',
      padding: 24,
    }}>
      <form onSubmit={handleSubmit} style={{
        background: '#13131e',
        border: '1px solid #222233',
        borderRadius: 16,
        padding: 40,
        width: '100%',
        maxWidth: 400,
      }}>
        <h1 style={{ color: '#f0f0f5', fontSize: 22, marginBottom: 8 }}>Admin Login</h1>
        <p style={{ color: '#6b6e80', fontSize: 13, marginBottom: 32 }}>
            Sign in to manage your portfolio
        </p>

        <label style={{ display: 'block', color: '#818cf8', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>
        Email
        </label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            display: 'block',
            width: '100%',
            padding: '12px 14px',
            background: '#0a0a12',
            border: '1px solid #222233',
            borderRadius: 8,
            color: '#f0f0f5',
            fontSize: 14,
            marginBottom: 20,
            outline: 'none',
          }}
          onFocus={(e) => e.target.style.borderColor = '#818cf8'}
          onBlur={(e) => e.target.style.borderColor = '#222233'}
        />

        <label style={{ display: 'block', color: '#818cf8', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>

          Password
        </label>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            display: 'block',
            width: '100%',
            padding: '12px 14px',
            background: '#0a0a12',
            border: '1px solid #222233',
            borderRadius: 8,
            color: '#f0f0f5',
            fontSize: 14,
            marginBottom: 24,
            outline: 'none',
          }}
          onFocus={(e) => e.target.style.borderColor = '#818cf8'}
          onBlur={(e) => e.target.style.borderColor = '#222233'}
        />

        {error && (
          <p style={{ color: '#f87171', fontSize: 13, marginBottom: 16 }}>{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          style={{
            width: '100%',
            padding: '14px 24px',
            background: 'linear-gradient(135deg, #818cf8, #6366f1, #a78bfa)',
            border: 'none',
            borderRadius: 8,
            color: '#fff',
            fontSize: 13,
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.6 : 1,
          }}
        >
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>
    </div>
  )
}
