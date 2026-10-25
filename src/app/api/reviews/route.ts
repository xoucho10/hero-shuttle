export async function GET() {
  const key = process.env.TRIPADVISOR_API_KEY?.trim()
  
  // Search ALL attractions near Zanzibar City - no query filter
  const res = await fetch(
    `https://terra.tripadvisor.com/api/locations/nearby-search?latLong=-6.1659,39.2026&radius=20&radiusUnit=km&category=attractions&locale=en-US`,
    { headers: { "x-api-key": key! } }
  )
  
  const text = await res.text()
  try {
    const json = JSON.parse(text)
    // Return only first 10 with names to find Hero
    return Response.json(json)
  } catch {
    return new Response(text, { headers: { "Content-Type": "text/plain" } })
  }
}