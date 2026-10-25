export async function GET() {
  const key = process.env.TRIPADVISOR_API_KEY?.trim()
  
  const res = await fetch(
    `https://terra.tripadvisor.com/api/locations/search?searchQuery=Hero%20Shuttle%20Tours%20Zanzibar&locale=en-US`,
    { headers: { "x-api-key": key! } }
  )
  
  const data = await res.json()
  return Response.json(data)
}