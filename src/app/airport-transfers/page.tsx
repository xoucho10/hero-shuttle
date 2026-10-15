"use client"
import { useState, useEffect } from "react"
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const REAL_TRANSFERS = [
  { id:"airport-stone", name:"Airport to Stone Town", distance:"6 km", duration:"12-15 min", price:15, market:25, area:"West", cat:["Popular"], featured:true, desc:"Stone Town hotels - Forodhani, Tembo, Park Hyatt - Per CAR up to 6 pax", image_urls:[] },
  { id:"airport-chuwini", name:"Airport to Chuwini / Bububu", distance:"14 km", duration:"20-25 min", price:25, market:35, area:"West", cat:[], featured:false, desc:"Bububu beach resorts north of Stone Town - Per CAR", image_urls:[] },
  { id:"airport-nungwi", name:"Airport to Nungwi / Kendwa", distance:"58 km", duration:"1h 15m", price:40, market:60, area:"North", cat:["Popular"], featured:true, desc:"Per CAR up to 6 pax - North beach", image_urls:[] },
  { id:"airport-matemwe", name:"Airport to Matemwe / Mnemba", distance:"52 km", duration:"1h 20m", price:40, market:60, area:"North-East", cat:["Popular"], featured:true, desc:"Per CAR up to 6 pax - Mnemba area", image_urls:[] },
  { id:"airport-pwani", name:"Airport to Pwani Mchangani", distance:"38 km", duration:"50-60 min", price:35, market:50, area:"North-East", cat:[], featured:false, desc:"Pwani Mchangani, Kiambwe - Per CAR", image_urls:[] },
  { id:"airport-kiwengwa", name:"Airport to Kiwengwa / Pongwe / Pingwe", distance:"36 km", duration:"50-55 min", price:35, market:55, area:"East", cat:[], featured:false, desc:"Kiwengwa, Pongwe, The Rock - Per CAR", image_urls:[] },
  { id:"airport-uroa", name:"Airport to Uroa / Marumbi / Michamvi", distance:"32 km", duration:"45-50 min", price:35, market:50, area:"East", cat:[], featured:false, desc:"Uroa, Chwaka, Marumbi - Per CAR", image_urls:[] },
  { id:"airport-paje", name:"Airport to Paje / Bwejuu", distance:"48 km", duration:"50-60 min", price:35, market:50, area:"South-East", cat:["Popular"], featured:true, desc:"Paje Jambiani kitesurf area - Per CAR", image_urls:[] },
  { id:"airport-jambiani", name:"Airport to Jambiani / Makunduchi", distance:"55 km", duration:"55-65 min", price:40, market:60, area:"South-East", cat:[], featured:false, desc:"Jambiani Makunduchi - Per CAR", image_urls:[] },
  { id:"airport-kizimkazi", name:"Airport to Kizimkazi", distance:"56 km", duration:"60-70 min", price:40, market:60, area:"South", cat:[], featured:false, desc:"Kizimkazi Dolphin, Fumba - Per CAR", image_urls:[] },
  { id:"paje-nungwi", name:"Paje → Nungwi", distance:"75 km", duration:"1h 30m", price:50, market:70, area:"North", cat:["Popular"], featured:false, desc:"Per CAR - East to North crossing", image_urls:[] },
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
        // USE DB AS SOURCE - not hard coded - this is real live
        // Normalize DB shape to UI shape
        const live = data
         .filter((d:any)=> d.active!==false) // hide if you toggled off in admin
         .map((d:any)=>({
            id: d.id,
            name: d.name,
            distance: d.distance || "—",
            duration: d.duration || d.duration_text || "—",
            price: Number(d.price),
            market: Number(d.market_price || d.market || 0),
            area: d.area || "West",
            cat: d.cat || d.category || [],
            featured: d.featured || false,
            desc: d.description || d.desc || "",
            image_urls: d.image_urls || [],
            // for fast launch: only first image on list
            imageDatas: d.image_urls || []
          }))
        setTransfers(live)
      } else {
        // fallback only if DB empty
        setTransfers(REAL_TRANSFERS)
      }
    }catch(e){
      setTransfers(REAL_TRANSFERS)
    }finally{
      setLoading(false)
    }
  }

  useEffect(()=>{
    loadLive()
    // auto-refresh every 20 sec while live - so price change in admin shows without reload
    const id = setInterval(loadLive, 20000)
    return ()=> clearInterval(id)
  },[])

  const toggle = (tr:any)=>{
    setSelected(prev=> prev.find(p=>p.id===tr.id)? prev.filter(p=>p.id!==tr.id) : [...prev, tr])
  }

  const filtered = filter==="All"? transfers : filter==="Popular"? transfers.filter(t=>t.featured || t.cat?.includes("Popular")) : transfers.filter(t=>t.area===filter)
  const total = selected.reduce((s,t)=>s+t.price,0)

  const checkout = ()=>{
    const msg = `Jambo HERO! Transfer booking:%0A${selected.map(t=>`• ${t.name} $${t.price} ${t.duration}`).join('%0A')}%0ATotal: $${total} per CAR up to 6 pax`
    window.open(`https://wa.me/255773628792?text=${msg}`,'_blank')
  }

  return (
    <div className="min-h-screen bg-[#f7f8fa]">
      <Header/>
      <div className="bg-[#0a2342] text-white px-4 md:px-12 py-8">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-wrap gap-2 mb-3">
            <span className="bg-[#ff8a1a] text-white text-[10px] font-black px-3 py-1 rounded-full">LIVE FROM DB • {loading? "Loading...": `${transfers.length} Transfers`}</span>
            <span className="bg-white/10 text-[10px] px-3 py-1 rounded-full">Per CAR up to 6 pax • No per person scam</span>
          </div>
          <h1 className="font-black text-[28px] md:text-[36px] leading-[0.9]">Zanzibar Airport Transfers<br/>$15 - $40 per CAR up to 6 pax</h1>
          <p className="text-[13px] mt-3 opacity-80 max-w-3xl">Prices live from admin - edit price in /admin → SAVE ALL → shows here in 20 sec.</p>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-6">
        <div className="flex gap-2 overflow-x-auto pb-3">
          {["All","Popular","West","North","North-East","East","South-East","South"].map(a=>(
            <button key={a} onClick={()=>setFilter(a)} className={`px-5 py-2.5 rounded-full text-[11px] font-black border whitespace-nowrap ${filter===a? "bg-[#0a2342] text-white":"bg-white border-gray-200"}`}>{a}</button>
          ))}
          <button onClick={()=>setShowMap(!showMap)} className="ml-auto bg-white border px-4 py-2 rounded-full text-[11px] font-bold">🗺️ {showMap? "Hide Map":"Show Map"}</button>
          <button onClick={loadLive} className="bg-white border px-4 py-2 rounded-full text-[11px] font-bold">🔄 Refresh Live</button>
        </div>

        {loading? <div className="grid md:grid-cols-3 gap-5 mt-6">{[1,2,3,4,5,6].map(i=><div key={i} className="h-[260px] bg-white border rounded-[16px] animate-pulse"></div>)}</div> : (
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6 items-start">
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map(tr=>{
                const isSelected = selected.find(s=>s.id===tr.id)
                const img = tr.image_urls?.[0] || tr.imageDatas?.[0] || ""
                const save = (tr.market||0) - (tr.price||0)
                return (
                  <div key={tr.id} className={`bg-white rounded-[16px] border overflow-hidden shadow-sm hover:shadow-md transition-all ${isSelected? "border-[#ff8a1a] border-2":"border-gray-200"}`}>
                    <div className="h-[180px] bg-gradient-to-br from-[#0a2342] to-[#1e3a5f] relative flex items-center justify-center overflow-hidden">
                      {img? <img src={img} alt={tr.name} className="w-full h-full object-cover" loading="lazy" /> : <span className="text-white/40 text-[12px]">No image - add in admin</span>}
                      <div className="absolute top-3 left-3 bg-[#0a2342]/90 text-white text-[11px] font-black px-3 py-1 rounded-full flex items-center gap-1">🚕 {tr.area}</div>
                      <div className="absolute bottom-3 left-3 bg-white text-[#0a2342] text-[11px] font-bold px-3.5 py-1.5 rounded-full shadow">{tr.duration}</div>
                      {tr.image_urls?.length>1 && <div className="absolute bottom-3 right-3 bg-black/70 text-white text-[10px] px-2 py-1 rounded-full">+{tr.image_urls.length-1} pics</div>}
                    </div>
                    <div className="p-4 bg-white">
                      <h3 className="font-black text-[14px] text-[#0a2342] leading-tight">{tr.name}</h3>
                      <p className="text-[11px] text-gray-400 mt-1 leading-tight line-clamp-2">{tr.desc}</p>
                      <div className="flex items-end justify-between mt-3">
                        <div>
                          {tr.market>0 && <p className="text-[11px] text-red-400 line-through">${tr.market} market</p>}
                          <p className="font-black text-[20px] text-[#0a2342] leading-none mt-1">${tr.price} <span className="text-[11px] font-normal text-gray-500">per car</span></p>
                          {save>0 && <p className="text-[11px] font-bold text-green-600 mt-1">Save ${save}</p>}
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
            {filtered.length===0 && <div className="text-center py-20 bg-white rounded-xl border mt-5"><p className="font-black">No transfers in {filter} yet</p><p className="text-[12px] opacity-60 mt-2">Add one in admin with area = {filter}</p></div>}
          </div>

          <div className="lg:sticky top-4 space-y-4">
            <div className="bg-white rounded-[18px] border-2 border-[#0a2342] p-5 shadow-sm">
              <h3 className="font-black text-[14px]">🛒 Transfer Cart: ${total} ({selected.length}) per CAR • LIVE DB</h3>
              {selected.length===0? <p className="text-[12px] text-gray-500 mt-3">Click Add+ on cards. Price per CAR. Admin edits → live here.</p> :
                <div className="mt-4 space-y-2">
                  {selected.map(t=>(
                    <div key={t.id} className="flex justify-between items-center bg-[#f5f7fa] rounded-[10px] p-3">
                      <div><p className="font-bold text-[11px]">{t.name}</p><p className="text-[10px] opacity-60">{t.duration} • ${t.price}/car</p></div>
                      <button onClick={()=>toggle(t)} className="text-red-500 font-black text-[12px]">✕</button>
                    </div>
                  ))}
                  <div className="pt-3 border-t flex justify-between font-black text-[14px]"><span>Total per CAR</span><span>${total}</span></div>
                  <button onClick={checkout} className="w-full mt-3 bg-[#0a2342] text-white py-3 rounded-full font-black text-[12px]">Checkout - Send WhatsApp</button>
                </div>
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