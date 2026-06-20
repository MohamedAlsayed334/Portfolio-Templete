export async function GET(request, { params }) {
  const { table } = await params
  const query = request.nextUrl.search || ''

  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_ANON_KEY) {
    return Response.json([])
  }

  try {
    const res = await fetch(`${process.env.SUPABASE_URL}/rest/v1/${table}${query}`, {
      headers: {
        apikey: process.env.SUPABASE_ANON_KEY,
        Authorization: `Bearer ${process.env.SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json',
        Prefer: 'return=representation',
      },
    })

    if (!res.ok) return Response.json([])
    return Response.json(await res.json())
  } catch {
    return Response.json([])
  }
}
