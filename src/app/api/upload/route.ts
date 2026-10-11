import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
export async function POST(req:Request){
  const form = await req.formData()
  const file = form.get('file') as File
  if(!file) return NextResponse.json({error:'no file'}, {status:400})
  const name = `${Date.now()}-${file.name}`
  const buf = Buffer.from(await file.arrayBuffer())
  const { error } = await supabaseAdmin.storage.from('tour-images').upload(name, buf, {contentType: file.type, upsert:true})
  if(error) return NextResponse.json({error:error.message}, {status:500})
  const { data } = supabaseAdmin.storage.from('tour-images').getPublicUrl(name)
  return NextResponse.json({url: data.publicUrl})
}