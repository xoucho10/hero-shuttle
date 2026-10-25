export async function GET() {
  const key = process.env.TRIPADVISOR_API_KEY?.trim()
  
  const tests = []

  // Test 1: Terra with latLong + query
  const u1 = `https://terra.tripadvisor.com/api/locations/search?query=Hero&latLong=-6.1659,39.2026&locale=en-US`
  const r1 = await fetch(u1, { headers: { "x-api-key": key! } })
  tests.push({ test: "terra_latlong_Hero", status: r1.status, body: (await r1.text()).slice(0,3000) })

  // Test 2: Terra with just Shuttle
  const u2 = `https://terra.tripadvisor.com/api/locations/search?query=Shuttle&latLong=-6.1659,39.2026&locale=en-US`
  const r2 = await fetch(u2, { headers: { "x-api-key": key! } })
  tests.push({ test: "terra_latlong_Shuttle", status: r2.status, body: (await r2.text()).slice(0,3000) })

  // Test 3: Terra with Zanzibar broad search to see if ANY data returns
  const u3 = `https://terra.tripadvisor.com/api/locations/search?query=Zanzibar&locale=en-US`
  const r3 = await fetch(u3, { headers: { "x-api-key": key! } })
  tests.push({ test: "terra_Zanzibar", status: r3.status, body: (await r3.text()).slice(0,3000) })

  return Response.json(tests)
}