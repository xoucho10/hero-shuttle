"use client"
import { useState, useEffect } from "react"
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const TRANSFER_IMAGE_MAP: Record<string, string> = {
  "airport-stone": "/transfers/airport-stone.jpg",
  "airport-nungwi": "/transfers/nungwi.jpg",
  "airport-matemwe": "/transfers/matemwe.jpg",
  "airport-paje": "/transfers/airport-paje.jpg",
  "airport-kizimkazi": "/transfers/kiwengwa.jpg",
  "airport-kiwengwa": "/transfers/kiwengwa.jpg",
  "paje-nungwi": "/transfers/paje-nungwi.jpg",
}

function getTransferImage(id: string, name: string, apiImage?: string): string {
  const lowerId = id?.toLowerCase() || ""
  if (TRANSFER_IMAGE_MAP[lowerId]) return TRANSFER_IMAGE_MAP[lowerId]
  const key = (id + " " + name).toLowerCase()
  if (key.includes("paje") && key.includes("nungwi")) return "/transfers/paje-nungwi.jpg"
  if (key.includes("stone")) return "/transfers/airport-stone.jpg"
  if ((key.includes("nungwi") && key.includes("airport")) || key.includes("kendwa") || key.includes("nungwi")) return "/transfers/nungwi.jpg"
  if (key.includes("matemwe") || key.includes("mnemba")) return "/transfers/matemwe.jpg"
  if (key.includes("paje") && key.includes("airport")) return "/transfers/airport-paje.jpg"
  if (key.includes("kiwengwa") || key.includes("pongwe") || key.includes("kizimkazi")) return "/transfers/kiwengwa.jpg"
  return apiImage || ""
}

function getTransferPricing(id: string, name: string, apiPrice: number, apiMarket: number) {
  const key = (id + " " + name).toLowerCase()
  const isPajeNungwi = key.includes("paje") && key.includes("nungwi")
  if (isPajeNungwi) return { price: 70, market: 110 }
  return { price: apiPrice || 35, market: apiMarket || (apiPrice + 20) }
}

const REAL_TRANSFERS = [
  { id:"airport-stone", name:"Airport to Stone Town", distance:"6 km", duration:"12-15 min", price:15, market:25, area:"West", cat:["Popular"], featured:true, desc:"Stone Town hotels - Forodhani, Tembo, Park Hyatt - Per CAR up to 5 pax" },
  { id:"airport-chuwini", name:"Airport to Chuwini / Bububu", distance:"14 km", duration:"20-25 min", price:25, market:35, area:"West", cat:[], featured:false, desc:"Bububu beach resorts north of Stone Town - Per CAR up to 5 pax" },
  { id:"airport-nungwi", name:"Airport to Nungwi / Kendwa", distance:"58 km", duration:"1h 15m", price:40, market:60, area:"North", cat:["Popular"], featured:true, desc:"Per CAR up to 5 pax - North beach" },
  { id:"airport-matemwe", name:"Airport to Matemwe / Mnemba", distance:"52 km", duration:"1h 20m", price:40, market:60, area:"North-East", cat:["Popular"], featured:true, desc:"Per CAR up to 5 pax - Mnemba area" },
  { id:"airport-pwani", name:"Airport to Pwani Mchangani", distance:"38 km", duration:"50-60 min", price:35, market:50, area:"North-East", cat:[], featured:false, desc:"Pwani Mchangani, Kiambwe - Per CAR up to 5 pax" },
  { id:"airport-kiwengwa", name:"Airport to Kiwengwa / Pongwe / Pingwe", distance:"36 km", duration:"50-55 min", price:35, market:55, area:"East", cat:["Popular"], featured:true, desc:"Kiwengwa, Pongwe, The Rock, Pingwe - Per CAR up to 5 pax" },
  { id:"airport-uroa", name:"Airport to Uroa / Marumbi / Michamvi", distance:"32 km", duration:"45-50 min", price:35, market:50, area:"East", cat:[], featured:false, desc:"Uroa, Chwaka, Marumbi - Per CAR up to 5 pax" },
  { id:"airport-paje", name:"Airport to Paje / Bwejuu", distance:"48 km", duration:"50-60 min", price:35, market:50, area:"South-East", cat:["Popular"], featured:true, desc:"Paje Jambiani kitesurf area - Per CAR up to 5 pax" },
  { id:"airport-jambiani", name:"Airport to Jambiani / Makunduchi", distance:"55 km", duration:"55-65 min", price:40, market:60, area:"South-East", cat:[], featured:false, desc:"Jambiani Makunduchi - Per CAR up to 5 pax" },
  { id:"airport-kizimkazi", name:"Airport to Kizimkazi", distance:"56 km", duration:"60-70 min", price:40, market:60, area:"South", cat:[], featured:false, desc:"Kizimkazi Dolphin, Fumba - Per CAR up to 5 pax" },
  { id:"paje-nungwi", name:"Paje → Nungwi", distance:"75 km", duration:"1h 30m", price:70, market:110, area:"North", cat:["Popular"], featured:true, desc:"Long crossing East to North - Per CAR up to 5 pax - Save $40 vs market - Best for hotel change" },
]

export default function TransfersPage(){
  const [transfers, setTransfers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState("All")
  const [selected, setSelected] = useState<any[]>([])
  const [showMap, setShowMap] = useState(true)

  const loadLive = async ()=>{
    try{
      const r = await fetch('/api/transfers',{cache:'no-store'})
      const data = await r.json()
      if(Array.isArray(data) && data.length>0){
        const live = data
         .filter((d:any)=> d.active!==false)
         .map((d:any)=>{
            const apiPrice = Number(d.price)
            const apiMarket = Number(d.market_price || d.market || 0)
            const pricing = getTransferPricing(d.id, d.name, apiPrice, apiMarket)
            const apiImg = d.image_urls?.[0] || d.images?.[0] || ""
            const finalImg = getTransferImage(d.id, d.name, apiImg)
            return {
              id: d.id,
              name: d.name,
              distance: d.distance || "—",
              duration: d.duration || d.duration_text || "—",
              price: pricing.price,
              market: pricing.market,
              area: d.area || "West",
              cat: d.cat || d.category || [],
              featured: d.featured || false,
              desc: d.description || d.desc || "",
              image_urls: finalImg ? [finalImg] : [],
              imageDatas: finalImg ? [finalImg] : [],
              mainImage: finalImg
            }
         })
        setTransfers(live)
      } else {
        const fallback = REAL_TRANSFERS.map(d=>{
          const img = getTransferImage(d.id, d.name, "")
          return { ...d, image_urls: img?[img]:[], imageDatas: img?[img]:[], mainImage: img }
        })
        setTransfers(fallback)
      }
    }catch(e){
      const fallback = REAL_TRANSFERS.map(d=>{
        const img = getTransferImage(d.id, d.name, "")
        return { ...d, image_urls: img?[img]:[], imageDatas: img?[img]:[], mainImage: img }
      })
      setTransfers(fallback)
    }finally{
      setLoading(false)
    }
  }

  useEffect(()=>{
    loadLive()
    const id = setInterval(loadLive, 20000)
    return ()=> clearInterval(id)
  },[])

  const toggle = (tr:any)=>{
    setSelected(prev=> prev.find(p=>p.id===tr.id)? prev.filter(p=>p.id!==tr.id) : [...prev, tr])
  }

  const filtered = filter==="All"? transfers : filter==="Popular"? transfers.filter(t=>t.featured || t.cat?.includes("Popular")) : transfers.filter(t=>t.area===filter)
  const total = selected.reduce((s,t)=>s+t.price,0)
  const marketTotal = selected.reduce((s,t)=>s+(t.market||0),0)
  const savings = marketTotal - total

  const checkout = ()=>{
    const msg = `Jambo HERO! Transfer booking:%0A${selected.map(t=>`• ${t.name} - ${t.distance} - ${t.duration} - $${t.price} per CAR up to 5 pax (Save $${(t.market||0)-t.price})`).join('%0A')}%0A%0ATotal: $${total} per CAR up to 5 pax - Total Save $${savings}`
    window.open(`https://wa.me/255773628792?text=${msg}`,'_blank')
  }

  return (
    <div className="min-h-screen bg-[#f7f8fa]">
      <Header/>
      <div className="bg-[#0a2342] text-white px-4 md:px-12 py-8">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-wrap gap-2 mb-3">
            <span className="bg-[#ff8a1a] text-white text-[10px] font-black px-3 py-1 rounded-full">FAST • {loading? "Loading...": `${transfers.length} Transfers`} • Public Images</span>
            <span className="bg-white/10 text-[10px] px-3 py-1 rounded-full">Per CAR up to 5 pax • No per person scam • Pay after</span>
            {savings>0 && selected.length>0 && <span className="bg-green-500 text-white text-[10px] font-black px-3 py-1 rounded-full">You Save ${savings}</span>}
          </div>
          <h1 className="font-black text-[28px] md:text-[36px] leading-[0.9]">Zanzibar Airport Transfers<br/>$15 - $70 per CAR up to 5 pax</h1>
          <p className="text-[13px] mt-3 opacity-80 max-w-3xl">Private car, not sharing. Price per CAR not per person. Driver waits with name board at Abeid Amani Karume Airport (ZNZ).</p>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-6">
        <div className="flex gap-2 overflow-x-auto pb-3">
          {["All","Popular","West","North","North-East","East","South-East","South"].map(a=>(
            <button key={a} onClick={()=>setFilter(a)} className={`px-5 py-2.5 rounded-full text-[11px] font-black border whitespace-nowrap ${filter===a? "bg-[#0a2342] text-white":"bg-white border-gray-200"}`}>{a}</button>
          ))}
          <button onClick={()=>setShowMap(!showMap)} className="ml-auto bg-white border px-4 py-2 rounded-full text-[11px] font-bold">🗺️ {showMap? "Hide Map":"Show Map"}</button>
        </div>

        {loading? <div className="grid md:grid-cols-3 gap-5 mt-6">{[1,2,3,4,5,6].map(i=><div key={i} className="h-[260px] bg-white border rounded-[16px] animate-pulse"></div>)}</div> : (
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-6 items-start">
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map(tr=>{
                const isSelected = selected.find(s=>s.id===tr.id)
                const img = tr.mainImage || tr.image_urls?.[0] || ""
                const save = (tr.market||0) - (tr.price||0)
                const isPajeNungwi = tr.id.toLowerCase().includes("paje-nungwi")
                return (
                  <div key={tr.id} className={`bg-white rounded-[16px] border overflow-hidden shadow-sm hover:shadow-md transition-all ${isSelected? "border-[#ff8a1a] border-2": isPajeNungwi? "border-green-500 border-2":"border-gray-200"}`}>
                    <div className="h-[180px] bg-gradient-to-br from-[#0a2342] to-[#1e3a5f] relative flex items-center justify-center overflow-hidden">
                      {img? <img src={img} alt={tr.name} className="w-full h-full object-cover" /> : <span className="text-white/40 text-[12px]">No image</span>}
                      <div className="absolute top-3 left-3 bg-[#0a2342]/90 text-white text-[11px] font-black px-3 py-1 rounded-full flex items-center gap-1">🚕 {tr.area}</div>
                      <div className="absolute top-3 right-3 flex flex-col gap-1 items-end">
                        {save>0 && <div className="bg-green-600 text-white text-[10px] font-black px-3 py-1.5 rounded-full shadow">Save ${save}</div>}
                        {isPajeNungwi && <div className="bg-[#0a2342] text-white text-[9px] font-black px-2 py-1 rounded-full">POPULAR CROSSING</div>}
                      </div>
                      <div className="absolute bottom-3 left-3 bg-white text-[#0a2342] text-[11px] font-bold px-3.5 py-1.5 rounded-full shadow">{tr.duration} • {tr.distance}</div>
                    </div>
                    <div className="p-4 bg-white">
                      <h3 className="font-black text-[14px] text-[#0a2342] leading-tight">{tr.name}</h3>
                      <p className="text-[11px] text-gray-400 mt-1 leading-tight line-clamp-2">{tr.desc}</p>
                      <div className="flex items-end justify-between mt-3">
                        <div>
                          {tr.market>0 && <p className="text-[11px] text-red-400 line-through font-bold">${tr.market} market</p>}
                          <p className="font-black text-[20px] text-[#0a2342] leading-none mt-1">${tr.price} <span className="text-[11px] font-normal text-gray-500">per car</span></p>
                          {save>0 && <p className="text-[11px] font-bold text-green-600 mt-1">You Save ${save}</p>}
                        </div>
                        <button onClick={()=>toggle(tr)} className={`px-6 py-2.5 rounded-full font-black text-[12px] ${isSelected? "bg-[#ff8a1a] text-white" : "bg-[#0a2342] text-white hover:bg-black"}`}>
                          {isSelected? "Added ✓" : "Add +"}
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* SEO CONTENT BELOW TRANSFERS - FOR GOOGLE BOOST */}
            <div className="mt-12 bg-white rounded-[20px] border p-8 shadow-sm">
              <h2 className="font-black text-[22px] text-[#0a2342]">Zanzibar Airport Transfers - Private Car Per Group, Not Per Person</h2>
              <p className="text-[14px] text-gray-600 mt-4 leading-relaxed">
                Welcome to Hero Shuttle, Zanzibar's most trusted airport transfer service from Abeid Amani Karume International Airport (ZNZ). 
                We charge <strong>per CAR up to 5 pax</strong>, not per person. That means $15-$70 total for your whole group, including luggage, private driver, and pay after trip.
              </p>
              <div className="grid md:grid-cols-2 gap-8 mt-8">
                <div>
                  <h3 className="font-black text-[14px] text-[#0a2342]">🚕 Why Our Transfers?</h3>
                  <ul className="text-[13px] text-gray-600 mt-3 space-y-2 leading-relaxed list-disc pl-5">
                    <li><strong>Private, not sharing:</strong> Only your group in the car</li>
                    <li><strong>Per CAR price:</strong> 1-5 people same price - save 60% vs hotels</li>
                    <li><strong>Meet & Greet:</strong> Driver waits at arrival with your name board</li>
                    <li><strong>All areas covered:</strong> Stone Town, Nungwi, Kendwa, Matemwe, Mnemba, Paje, Jambiani, Kiwengwa, Pongwe, Uroa, Kizimkazi, Fumba</li>
                    <li><strong>Pay after:</strong> No advance, pay driver after safe arrival</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-black text-[14px] text-[#0a2342]">📍 Popular Routes & Times</h3>
                  <ul className="text-[13px] text-gray-600 mt-3 space-y-2 leading-relaxed list-disc pl-5">
                    <li><strong>Airport → Stone Town:</strong> 6km, 12-15 min - $15 (Save $10) - Per CAR up to 5 pax</li>
                    <li><strong>Airport → Nungwi / Kendwa:</strong> 58km, 1h15m - $40 (Save $20)</li>
                    <li><strong>Airport → Matemwe / Mnemba:</strong> 52km, 1h20m - $40</li>
                    <li><strong>Airport → Paje / Jambiani:</strong> 48km, 50-60 min - $35</li>
                    <li><strong>Airport → Kiwengwa / Pongwe:</strong> 36km, 50-55 min - $35 - near The Rock Restaurant</li>
                    <li><strong>Paje → Nungwi:</strong> 75km, 1h30m - $70 (Market $110 - You Save $40) - Best for hotel change - Per CAR up to 5 pax</li>
                  </ul>
                </div>
              </div>
              <div className="mt-8 p-5 bg-[#f8faff] rounded-[14px] border">
                <h3 className="font-black text-[13px] text-[#0a2342]">How Booking Works</h3>
                <p className="text-[13px] text-gray-600 mt-2 leading-relaxed">
                  1. Select your routes above → 2. Click Checkout → 3. WhatsApp opens with details → 4. We confirm driver + car photo → 5. Pay after trip in USD/TZS. No credit card needed. Free cancellation. All prices per CAR up to 5 pax, not per person.
                </p>
                <p className="text-[11px] text-gray-400 mt-3">Keywords: Zanzibar airport transfer, ZNZ taxi price per car up to 5 pax, Stone Town to Nungwi transfer, Paje to Nungwi taxi $70, private transfer Zanzibar per car</p>
              </div>
            </div>
          </div>

          <div className="lg:sticky top-4 space-y-4">
            <div className="bg-white rounded-[18px] border-2 border-[#0a2342] p-5 shadow-lg overflow-hidden">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-black text-[16px] text-[#0a2342]">🛒 Transfer Cart</h3>
                  <p className="text-[11px] font-bold text-gray-500 mt-1">${total} • {selected.length} routes • {selected.length>0? `Save $${savings}` : "per CAR up to 5 pax"}</p>
                </div>
                {selected.length>0 && <button onClick={()=>setSelected([])} className="text-[11px] font-bold text-gray-400 underline">Clear</button>}
              </div>
              {selected.length===0? <div className="mt-6 text-center py-8 bg-[#f8faff] rounded-[12px] border border-dashed"><p className="text-[28px]">🚕</p><p className="text-[12px] text-gray-500 mt-2 font-bold">No transfers selected</p></div> :
                <>
                <div className="mt-4 space-y-3 max-h-[420px] overflow-auto pr-1">
                  {selected.map(t=>{
                    const img = t.mainImage || t.image_urls?.[0] || ""
                    return (
                      <div key={t.id} className="flex gap-3 bg-[#f5f7fa] rounded-[14px] p-3 border">
                        <div className="w-[64px] h-[64px] rounded-[10px] overflow-hidden bg-[#0a2342] flex-shrink-0">
                          {img? <img src={img} alt={t.name} className="w-full h-full object-cover"/> : <div className="w-full h-full bg-gradient-to-br from-[#0a2342] to-[#1e3a5f]" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between gap-2">
                            <p className="font-black text-[12px] text-[#0a2342] leading-tight truncate">{t.name}</p>
                            <button onClick={()=>toggle(t)} className="text-red-500 font-black text-[12px] w-6 h-6 flex items-center justify-center rounded-full bg-white border">✕</button>
                          </div>
                          <p className="text-[10px] text-gray-500 mt-1">📍 {t.area} • 📏 {t.distance} • ⏱ {t.duration}</p>
                          <div className="flex justify-between items-center mt-2">
                            <span className="text-[10px] text-red-400 line-through font-bold">${t.market}</span>
                            <span className="text-[13px] font-black text-green-600">${t.price}/car</span>
                          </div>
                          {(t.market - t.price) > 0 && <p className="text-[10px] font-bold text-green-600 mt-1">Save ${t.market - t.price}</p>}
                        </div>
                      </div>
                    )
                  })}
                </div>
                <div className="pt-4 mt-4 border-t space-y-2">
                  <div className="flex justify-between text-[12px] text-gray-500"><span>Market Price</span><span className="line-through">${marketTotal}</span></div>
                  <div className="flex justify-between font-black text-[15px] text-[#0a2342]"><span>Total per CAR up to 5 pax</span><span>${total}</span></div>
                  {savings>0 && <div className="bg-green-50 border border-green-200 text-green-700 text-[11px] font-black px-3 py-2 rounded-full text-center">You Save ${savings} - Pay Driver After Trip</div>}
                  <button onClick={checkout} className="w-full mt-2 bg-[#0a2342] text-white py-3.5 rounded-full font-black text-[13px] hover:bg-black transition">📱 Checkout on WhatsApp - ${total}</button>
                </div>
                </>
              }
            </div>
          </div>
        </div>
        )}
      </div>
      <Footer/>
    </div>
  )
}