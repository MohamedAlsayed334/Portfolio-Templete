export async function GET(request) {
  const token = request.headers.get('authorization')?.replace('Bearer ', '')
  if (!token) {
    return Response.json({ error: 'No token' }, { status: 401 })
  }

  const res = await fetch(`${process.env.SUPABASE_URL}/auth/v1/user`, {
    headers: {
      apikey: process.env.SUPABASE_ANON_KEY,
      Authorization: `Bearer ${token}`,
    },
  })

  if (!res.ok) {
    return Response.json({ error: 'Invalid token' }, { status: 401 })
  }

  const user = await res.json()
  return Response.json(user)
}
