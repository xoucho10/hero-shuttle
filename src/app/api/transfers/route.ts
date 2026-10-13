import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
  const { data } = await supabase.from('transfers').select('*')
  return NextResponse.json(data || [])
}

export async function POST(req: Request) {
  const body = await req.json()
  const list = Array.isArray(body)? body : [body]
  for (const t of list) {
    await supabase.from('transfers').upsert({
      id: t.id,
      name: t.name,
      price: t.price,
      market: t.market || t.market_price || t.price,
      market_price: t.market_price || t.market || t.price,
      duration: t.duration || "",
      description: t.description || t.desc || "",
      area: t.area || "West",
      cat: t.cat || ["Popular"],
      image_urls: (t.image_urls || t.imageDatas || (t.imageData? [t.imageData] : [])).filter(Boolean).slice(0,3),
      updated_at: new Date().toISOString()
    }, { onConflict: 'id' })
  }
  return NextResponse.json({ success: true })
}
export async function PUT(req: Request){ return POST(req) }