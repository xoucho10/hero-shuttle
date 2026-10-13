import { NextRequest, NextResponse } from 'next/server'

// In-memory + file fallback - works even without Supabase
let transfersDB: any[] = []

export async function GET(){
  try{
    // Try Supabase first if you have it
    // const { createClient } = await import('@supabase/supabase-js')
    // const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_KEY!)
    // const { data } = await supabase.from('transfers').select('*')
    // if(data && data.length>0) return NextResponse.json(data)

    // Fallback to in-memory
    return NextResponse.json(transfersDB)
  }catch{
    return NextResponse.json(transfersDB)
  }
}

export async function POST(req: NextRequest){
  try{
    const body = await req.json()
    const items = Array.isArray(body)? body : [body]

    // Save each item - upsert
    for(const item of items){
      const idx = transfersDB.findIndex(t=>t.id===item.id)
      if(idx>=0) transfersDB[idx] = {...transfersDB[idx],...item}
      else transfersDB.push(item)
    }

    // Also try Supabase if configured
    try{
      const { createClient } = await import('@supabase/supabase-js')
      if(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_KEY){
        const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY)
        for(const item of items){
          await supabase.from('transfers').upsert({
            id: item.id,
            name: item.name,
            price: item.price,
            market_price: item.market_price || item.market,
            duration: item.duration,
            description: item.description || item.desc,
            area: item.area,
            image_urls: item.image_urls || [],
            updated_at: new Date().toISOString()
          }, { onConflict: 'id' })
        }
      }
    }catch(e){ console.log("Supabase not configured, using memory", e) }

    return NextResponse.json({ success:true, count: items.length, transfers: transfersDB })
  }catch(e:any){
    return NextResponse.json({ error:e.message }, { status:500 })
  }
}