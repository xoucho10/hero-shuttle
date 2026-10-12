"use client"
import { useState, useEffect } from "react"
import Header from '@/components/Header'
import Footer from '@/components/Footer'

// REAL PRICES FROM YOUR SCREENSHOT - Per CAR not per person
const REAL_TRANSFERS = [
  { id:"airport-stone", name:"Airport to Stone Town", distance:"6 km", duration:"12-15 min", price:15, market:25, area:"West", cat:["Popular"], featured:true, desc:"Stone Town hotels - Forodhani, Tembo, Park Hyatt - Per CAR up to 6 pax", images:[], imageDatas:[] },
  { id:"airport-chuwini", name:"Airport to Chuwini / Bububu", distance:"14 km", duration:"20-25 min", price:25, market:35, area:"West", cat:[], featured:false, desc:"Bububu beach resorts north of Stone Town - Per CAR", images:[], imageDatas:[] },
  { id:"airport-nungwi", name:"Airport to Nungwi / Kendwa", distance:"58 km", duration:"65-75 min", price:40, market:60, area:"North", cat:["Popular"], featured:true, desc:"Nungwi Kendwa best sunset beach - Per CAR up to 6 pax same price", images:[], imageDatas:[] },
  { id:"airport-matemwe", name:"Airport to Matemwe", distance:"52 km", duration:"60-70 min", price:40, market:60, area:"North-East", cat:["Popular"], featured:true, desc:"Matemwe Mnemba area - SeVi, Zanzibar Retreat - Per CAR", images:[], imageDatas:[] },
  { id:"airport-pwani", name:"Airport to Pwani Mchangani", distance:"38 km", duration:"50-60 min", price:35, market:50, area:"North-East", cat:[], featured:false, desc:"Pwani Mchangani, Kiambwe, Kijongo - Per CAR", images:[], imageDatas:[] },
  { id:"airport-kiwengwa", name:"Airport to Kiwengwa / Pongwe / Pingwe", distance:"36 km", duration:"50-55 min", price:35, market:55, area:"East", cat:[], featured:false, desc:"Kiwengwa, Pongwe, The Rock, Blue Lagoon - Per CAR", images:[], imageDatas:[] },
  { id:"airport-uroa", name:"Airport to Uroa / Marumbi / Michamvi", distance:"32 km", duration:"45-50 min", price:35, market:50, area:"East", cat:[], featured:false, desc:"Uroa, Chwaka, Marumbi, Michamvi - Per CAR up to 6 pax", images:[], imageDatas:[] },
  { id:"airport-paje", name:"Airport to Paje / Bwejuu", distance:"48 km", duration:"50-60 min", price:35, market:50, area:"South-East", cat:["Popular"], featured:true, desc:"Paje Jambiani kitesurf area - Per CAR most popular East to South", images:[], imageDatas:[] },
  { id:"airport-jambiani", name:"Airport to Jambiani / Makunduchi", distance:"55 km", duration:"55-65 min", price:40, market:60, area:"South-East", cat:[], featured:false, desc:"Jambiani Makunduchi Mzuri - Per CAR up to 6 pax", images:[], imageDatas:[] },
  { id:"airport-kizimkazi", name:"Airport to Kizimkazi", distance:"56 km", duration:"60-70 min", price:40, market:60, area:"South", cat:[], featured:false, desc:"Kizimkazi Dolphin, Fumba Safari Blue - Per CAR", images:[], imageDatas:[] },
]

export default function TransfersPage(){
  const [transfers, setTransfers] = useState<any[]>(REAL_TRANSFERS)
  const [filter, setFilter] = useState("All")
  const [selected, setSelected] = useState<any[]>([])
  const [showMap, setShowMap] = useState(true)

  // CONNECT TO ADMIN - price + images auto update
  useEffect(()=>{
    fetch('/api/transfers').then(r=>r.json()).then(data=>{
      if(!Array.isArray(data) ||!data.length) return
      const dbMap = new Map(data.map((d:any)=>[d.id,d]))
      setTransfers(prev=> prev.map(t=>{
        const db:any = dbMap.get(t.id)
        if(!db) return t
        return {...t, price: db.price??t.price, market: db.market??t.market, duration: db.duration||t.duration, distance: db.distance||t.distance, desc: db.description||t.desc, images: db.image_urls||[], imageDatas: db.image_urls||[], featured: db.featured??t.featured }
      }))
    }).catch(()=>{})
  },[])

  const toggle = (tr:any)=>{
    setSelected(prev=> prev.find(p=>p.id===tr.id)? prev.filter(p=>p.id!==tr.id) : [...prev, tr])
  }

  const filtered = filter==="All"? transfers : filter==="Popular"? transfers.filter(t=>t.featured) : transfers.filter(t=>t.area===filter)
  const total = selected.reduce((s,t)=>s+t.price,0)

  const checkout = ()=>{
    const msg = `Jambo HERO! Transfer booking:%0A${selected.map(t=>`• ${t.name} $${t.price} ${t.distance} ${t.duration}`).join('%0A')}%0ATotal: $${total} per CAR up to 6 pax`
    window.open(`https://wa.me/255773628792?text=${msg}`,'_blank')
  }

  return (
    <div className="min-h-screen bg-[#f7f8fa]">
      <Header/>
      <div className="bg-[#0a2342] text-white px-4 md:px-12 py-8">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-wrap gap-2 mb-3">
            <span className="bg-[#ff8a1a] text-white text-[10px] font-black px-3 py-1 rounded-full">REAL LOCAL PRICE • PER CAR NOT PER PERSON</span>
            <span className="bg-white/10 text-[10px] px-3 py-1 rounded-full">Pay After Trip • Free Cancellation 24h</span>
          </div>
          <h1 className="font-black text-[28px] md:text-[36px] leading-[0.9]">Zanzibar Airport Transfers<br/>$15 - $40 per CAR up to 6 pax</h1>
          <p className="text-[13px] mt-3 opacity-80 max-w-3xl">No per person scam. Other sites charge $40 per person x4=$160. Our price $40 per CAR up to 6 pax same price - Save $120. Driver + fuel + car - Alphard/Minivan. Admin can edit price/images instantly - connects to DB.</p>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-6">
        <div className="flex gap-2 overflow-x-auto pb-3">
          {["All","Popular","West","North","North-East","East","South-East","South"].map(a=>(
            <button key={a} onClick={()=>setFilter(a)} className={`px-5 py-2.5 rounded-full text-[11px] font-black border whitespace-nowrap ${filter===a? "bg-[#0a2342] text-white":"bg-white border-gray-200"}`}>{a} {a!=="All"? `(${transfers.filter(t=> a==="Popular"? t.featured : t.area===a).length})` : ""}</button>
          ))}
          <button onClick={()=>setShowMap(!showMap)} className="ml-auto bg-white border px-4 py-2 rounded-full text-[11px] font-bold">🗺️ {showMap? "Hide Map":"Show Map"}</button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6 items-start">
          {/* CARDS - BIGGER SIZE */}
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {filtered.map(tr=>{
                const isSelected = selected.find(s=>s.id===tr.id)
                const img = tr.imageDatas?.[0] || ""
                return (
                  <div key={tr.id} className={`bg-white rounded-[18px] border-2 overflow-hidden shadow-sm hover:shadow-lg transition-all ${isSelected? "border-[#ff8a1a]":"border-gray-100"}`}>
                    {img? <div className="h-[160px] overflow-hidden"><img src={img} className="w-full h-full object-cover" /></div> : null}
                    <div className="p-5">
                      <div className="flex justify-between items-start">
                        <div>
                          {tr.featured && <span className="bg-[#0a2342] text-white text-[9px] font-black px-2.5 py-1 rounded-full">POPULAR</span>}
                          <h3 className="font-black text-[15px] text-[#0a2342] mt-2 leading-tight">{tr.name}</h3>
                          <p className="text-[11px] text-gray-500 mt-1">{tr.distance} • {tr.duration} • {tr.area}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-black text-[24px] text-[#0a2342] leading-none">${tr.price}</p>
                          <p className="text-[10px] text-gray-500">vehicle</p>
                          <p className="text-[10px] line-through text-red-400">${tr.market}</p>
                        </div>
                      </div>
                      <p className="text-[11px] text-gray-600 mt-3 bg-[#f5f7fa] p-2.5 rounded-[10px]">{tr.desc}</p>
                      <button onClick={()=>toggle(tr)} className={`w-full mt-4 py-3 rounded-full font-black text-[12px] transition ${isSelected? "bg-[#ff8a1a] text-white" : "bg-[#0a2342] text-white hover:bg-black"}`}>{isSelected? "✓ Added - Click to Remove" : "Add + "} </button>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* SEO CONTENT */}
            <div className="mt-10 bg-white rounded-[18px] border p-6">
              <h2 className="font-black text-[18px] text-[#0a2342]">Zanzibar Transfers Price per CAR - Why $15-$40 not per person?</h2>
              <div className="grid md:grid-cols-2 gap-6 mt-4 text-[12px] leading-relaxed text-gray-600">
                <div>
                  <h3 className="font-bold text-[#0a2342]">Airport to Stone Town $15 per CAR (6km)</h3>
                  <p className="mt-1">Shortest transfer 12-15 min. Our local driver Alphard up to 6 pax same price. No per person scam. Market $25 we charge $15 direct.</p>
                  <h3 className="font-bold text-[#0a2342] mt-4">Airport to Nungwi Kendwa $40 per CAR (58km)</h3>
                  <p className="mt-1">North beach best sunset. 65-75 min drive. Per CAR $40 includes driver + fuel. Other sites $50 per person x4=$200 vs our $40 save $160.</p>
                </div>
                <div>
                  <h3 className="font-bold text-[#0a2342]">Airport to Paje $35 per CAR (48km)</h3>
                  <p className="mt-1">Kitesurf area South-East most popular for young travelers. 50-60 min. Per CAR up to 6 pax.</p>
                  <h3 className="font-bold text-[#0a2342] mt-4">SEO: per CAR price explained</h3>
                  <p className="mt-1">All transfers per vehicle not per person. Price includes car, driver, fuel. Pay after trip. Free cancellation 24h. WhatsApp 2 minutes booking. Local owner 8 years Zanzibar.</p>
                </div>
              </div>
              <div className="mt-6 grid-cols-2 md:grid-cols-4 gap-3">
                {[{k:"Pay After",v:"No prepayment"},{k:"Per CAR",v:"Up to 6 pax same"},{k:"Free Cancel",v:"24h before"},{k:"Local Owner",v:"8 years Zanzibar"}].map(b=>(
                  <div key={b.k} className="bg-[#f5f7fa] rounded-[12px] p-3 text-center"><p className="font-black text-[11px]">{b.k}</p><p className="text-[10px] opacity-60">{b.v}</p></div>
                ))}
              </div>
            </div>

            {showMap && (
              <div className="mt-6 bg-white rounded-[18px] border overflow-hidden">
                <div className="p-4 flex justify-between"><h3 className="font-black text-[13px]">🗺️ Zanzibar Transfer Map - Distance Matrix per CAR</h3><span className="text-[10px] opacity-50">Admin matrix editable</span></div>
                <div className="h-[420px] bg-[#eef3f8] relative overflow-hidden">
                  <img src="https://maps.googleapis.com/maps/api/staticmap?center=-6.1639,39.1976&zoom=10&size=800x420&maptype=roadmap" alt="map" className="w-full h-full object-cover opacity-30" />
                  <div className="absolute inset-0 p-4 grid grid-cols-3 gap-2 text-[9px]">
                    {REAL_TRANSFERS.map(t=>(
                      <div key={t.id} className="bg-white/90 backdrop-blur rounded-[10px] p-2 border"><p className="font-black">{t.name.replace('Airport to ','')}</p><p>{t.distance} • {t.duration}</p><p className="font-black text-[#0a2342]">${t.price}/car</p></div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* SIDE CHECKOUT */}
          <div className="lg:sticky top-4 space-y-4">
            <div className="bg-white rounded-[18px] border-2 border-[#0a2342] p-5 shadow-sm">
              <h3 className="font-black text-[14px]">🛒 Transfer Cart: ${total} ({selected.length}) per CAR</h3>
              {selected.length===0? <p className="text-[12px] text-gray-500 mt-3">Click Add+ on cards. Price per CAR up to 6 pax. No fake cards - real 10 routes from screenshot. Admin edits price → shows here.</p> :
                <div className="mt-4 space-y-2">
                  {selected.map(t=>(
                    <div key={t.id} className="flex justify-between items-center bg-[#f5f7fa] rounded-[10px] p-3">
                      <div><p className="font-bold text-[11px]">{t.name}</p><p className="text-[10px] opacity-60">{t.distance} • {t.duration} • ${t.price}/car</p></div>
                      <button onClick={()=>toggle(t)} className="text-red-500 font-black text-[12px]">✕</button>
                    </div>
                  ))}
                  <div className="pt-3 border-t flex justify-between font-black text-[14px]"><span>Total per CAR</span><span>${total}</span></div>
                  <p className="text-[10px] text-gray-400">Up to 6 pax same price • Pay after trip</p>
                  <button onClick={checkout} className="w-full mt-3 bg-[#0a2342] text-white py-3 rounded-full font-black text-[12px]">Checkout - Send WhatsApp</button>
                </div>
              }
            </div>

            <div className="bg-[#0a2342] text-white rounded-[18px] p-5">
              <p className="font-black text-[12px]">Why per CAR not per person?</p>
              <p className="text-[11px] mt-2 opacity-80 leading-relaxed">Scam alert: Other sites show $35 per person. For 4 people = $140. Our price $35 per CAR up to 6 pax same price. Save $105. Local owner, direct drivers, no middleman. Admin connected for easy update.</p>
              <div className="mt-3 text-[10px] opacity-60">Keywords: zanzibar airport transfer price per car, airport to nungwi per car $40, airport to paje per car $35, stone town $15 per car</div>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  )
}