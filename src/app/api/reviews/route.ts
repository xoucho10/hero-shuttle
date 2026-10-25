export async function GET() {
  const key = process.env.TRIPADVISOR_API_KEY?.trim()
  if (!key) return Response.json({ error: "no key" })

  // Try 1: Terra Search (correct Terra endpoint)
  const url1 = `https://terra.tripadvisor.com/api/locations/search?searchQuery=Hero%20Shuttles&locale=en-US`
  const r1 = await fetch(url1, { headers: { "x-api-key": key } })
  const t1 = await r1.text()

  // Try 2: Content API v1 Search (old but might work with new key format)
  const url2 = `https://api.content.tripadvisor.com/api/v1/location/search?key=${key}&searchQuery=Hero%20Shuttles&locale=en-US`
  const r2 = await fetch(url2)
  const t2 = await r2.text()

  // Try 3: Direct fetch old location to see if Content API still works
  const url3 = `https://api.content.tripadvisor.com/api/v1/location/34749047?key=${key}&locale=en-US`
  const r3 = await fetch(url3)
  const t3 = await r3.text()

  return Response.json({
    terra_search_status: r1.status,
    terra_search_body: t1.slice(0, 2000),
    content_search_status: r2.status,
    content_search_body: t2.slice(0, 2000),
    content_location_status: r3.status,
    content_location_body: t3.slice(0, 2000),
  })
}