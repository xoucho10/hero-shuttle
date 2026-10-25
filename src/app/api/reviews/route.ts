export async function GET() {
  const key = process.env.TRIPADVISOR_API_KEY?.trim()
  const LOCATION_ID = "34749047" // your old ID - let's test if Terra accepts it
  
  const res = await fetch(
    `https://terra.tripadvisor.com/api/locations/${LOCATION_ID}?locale=en-US`,
    { headers: { "x-api-key": key! } }
  )
  
  const text = await res.text()
  try {
    return Response.json(JSON.parse(text))
  } catch {
    return new Response(text, { headers: { "Content-Type": "text/plain" } })
  }
}