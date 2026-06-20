async function getAuthToken(request) {
  const token = request.headers.get('authorization')?.replace('Bearer ', '')
  if (!token) return null

  const res = await fetch(`${process.env.SUPABASE_URL}/auth/v1/user`, {
    headers: { apikey: process.env.SUPABASE_ANON_KEY, Authorization: `Bearer ${token}` },
  })
  if (!res.ok) return null
  return token
}

function supabaseHeaders(token) {
  return {
    apikey: process.env.SUPABASE_ANON_KEY,
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
    Prefer: 'return=representation',
  }
}

async function proxy(request, { params }, method) {
  const token = await getAuthToken(request)
  if (!token) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { table } = await params
  const query = request.nextUrl.search || ''
  const body = ['POST', 'PATCH'].includes(method) ? await request.json() : undefined

  const url = `${process.env.SUPABASE_URL}/rest/v1/${table}${query}`
  const res = await fetch(url, {
    method,
    headers: supabaseHeaders(token),
    body: body ? JSON.stringify(body) : undefined,
  })

  if (!res.ok) {
    const err = await res.text()
    return Response.json({ error: err }, { status: res.status })
  }

  if (method === 'DELETE') return new Response(null, { status: 204 })
  return Response.json(await res.json())
}

export const GET    = (req, ctx) => proxy(req, ctx, 'GET')
export const POST   = (req, ctx) => proxy(req, ctx, 'POST')
export const PATCH  = (req, ctx) => proxy(req, ctx, 'PATCH')
export const DELETE = (req, ctx) => proxy(req, ctx, 'DELETE')
