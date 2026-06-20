export async function POST(request) {
  const { email, password } = await request.json()

  const res = await fetch(`${process.env.SUPABASE_URL}/auth/v1/token?grant_type=password`, {
    method: 'POST',
    headers: {
      apikey: process.env.SUPABASE_ANON_KEY,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })

  const data = await res.json()
  if (!res.ok) {
    return Response.json({ error: data.error_description || data.msg || `Login failed (${res.status})` }, { status: res.status })
  }

  return Response.json({
    access_token: data.access_token,
    refresh_token: data.refresh_token,
    user: data.user,
  })
}
