import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
  const { data } = await supabase.from('tours').select('*')
  return NextResponse.json(data || [])
}

export async function POST(req: Request) {
  const body = await req.json()
  const list = Array.isArray(body)? body : [body]
  for (const t of list) {
    await supabase.from('tours').upsert({
      id: t.id,
      name: t.name,
      price: t.price,
      market: t.market,
      duration: t.duration,
      pickup: t.pickup,
      description: t.description || t.desc,
      includes: t.includes,
      area: t.area,
      cat: t.cat,
      featured: t.featured || false,
      image_urls: t.image_urls || t.imageDatas || (t.imageData? [t.imageData] : [])
    }, { onConflict: 'id' })
  }
  return NextResponse.json({ success: true })
}
export async function PUT(req: Request){ return POST(req) }