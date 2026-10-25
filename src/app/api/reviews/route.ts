export async function GET() {
  const key = process.env.TRIPADVISOR_API_KEY
  if (!key) {
    return Response.json({ error: "No API key", reviews: [] }, { status: 500 })
  }

  // For now, test that key is loaded
  return Response.json({ 
    status: "key_loaded", 
    key_end: key.slice(-4),
    message: "Ready for Step 3" 
  })
}