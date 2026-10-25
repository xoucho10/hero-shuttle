export async function GET() {
  const key = process.env.TRIPADVISOR_API_KEY?.trim()
  
  // Terra expects ?query= not ?searchQuery=
  const url = `https://terra.tripadvisor.com/api/locations/search?query=Hero%20Shuttles&locale=en-US`
  const res = await fetch(url, { headers: { "x-api-key": key! } })
  const text = await res.text()
  
  try {
    return Response.json(JSON.parse(text))
  } catch {
    return new Response(text, { status: res.status, headers: { "Content-Type": "text/plain" } })
  }
}