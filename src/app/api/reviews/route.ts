export async function GET() {
  const key = process.env.TRIPADVISOR_API_KEY?.trim()
  
  const res = await fetch(
    `https://terra.tripadvisor.com/api/locations/search?query=Hero%20Shuttle%20Tours&locale=en-US`,
    { headers: { "x-api-key": key! } }
  )
  
  const text = await res.text()
  // Return raw to see result
  try {
    return Response.json(JSON.parse(text))
  } catch {
    return new Response(text, { headers: { "Content-Type": "text/plain" } })
  }
}