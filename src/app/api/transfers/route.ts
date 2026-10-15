import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!
const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabase = createClient(url, key)

export async function GET(){
  const { data, error } = await supabase.from('transfers').select('*').order('price')
  if(error) return NextResponse.json({error:error.message},{status:500})
  return NextResponse.json(data || [], { headers: { 'Cache-Control': 'no-store' } })
}

export async function POST(req: NextRequest){
  try{
    const body = await req.json()
    const items = Array.isArray(body)? body : [body]
    console.log("SAVING", items.length, "transfers")

    // fix cat to be jsonb friendly and image_urls
    const clean = items.map((t:any)=>({
      id: t.id,
      name: t.name,
      price: Number(t.price) || 0,
      market: Number(t.market_price || t.market || 0),
      duration: t.duration || '',
      distance: t.distance || '',
      description: t.description || t.desc || '',
      area: t.area || 'West',
      cat: t.cat || [], // we will store as jsonb after next SQL
      featured:!!t.featured,
      active: t.active?? true,
      image_urls: t.image_urls || t.imageDatas || t.images || []
    }))

    const { error } = await supabase.from('transfers').upsert(clean, { onConflict: 'id' })
    if(error) {
      console.error("SUPABASE ERROR", error)
      return NextResponse.json({error:error.message, details:error},{status:500})
    }
    return NextResponse.json({ok:true, saved: clean.length})
  }catch(e:any){
    console.error("API ERROR", e)
    return NextResponse.json({error:e.message},{status:500})
  }
}