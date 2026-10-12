import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
export async function GET(){
  const { data } = await supabase.from('transfers').select('*')
  return NextResponse.json(data||[])
}
export async function POST(req: Request){
  const body = await req.json()
  const list = Array.isArray(body)? body : [body]
  for(const t of list){
    await supabase.from('transfers').upsert({
      id: t.id, name: t.name, price: t.price, market: t.market,
      duration: t.duration, distance: t.distance,
      area: t.area, description: t.description||t.desc,
      cat: t.cat, featured: t.featured||false,
      image_urls: t.image_urls||t.imageDatas||[]
    },{onConflict:'id'})
  }
  return NextResponse.json({success:true})
}