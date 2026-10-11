"use client"
import { useState, useEffect, useMemo } from "react"
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const DEFAULT_TOURS = [
  { id:"prison-nakupenda", name:"Prison Island + Nakupenda", cat:["Popular","Half Day"], price:250, market:350, duration:"5 Hours", pickup:"Stone Town 8:30 AM", desc:"Tortoise sanctuary + sandbank + fruit", includes:"Boat, Guide, Entrance, Fruit, Water", area:"West", active:true, images:["prison-nakupenda.jpg"], imageDatas:[""], image:"prison-nakupenda.jpg", featured:true, imageData:"" },
  { id:"nakupenda-only", name:"Nakupenda Sandbank Only", cat:["Half Day","Popular"], price:130, market:200, duration:"4 Hours", pickup:"Stone Town 9 AM", desc:"White sandbank in ocean, swimming", includes:"Boat, Fruit, Water", area:"West", active:true, images:["nakupenda-only.jpg"], imageDatas:[""], image:"nakupenda-only.jpg", featured:false, imageData:"" },
  { id:"prison-only", name:"Prison Island Tortoises", cat:["Half Day"], price:135, market:180, duration:"3 Hours", pickup:"Stone Town 9 AM", desc:"Giant tortoises 100+ years", includes:"Boat, Entrance, Guide", area:"West", active:true, images:["prison-only.jpg"], imageDatas:[""], image:"prison-only.jpg", featured:false, imageData:"" },
  { id:"spice", name:"Spice Farm Tour", cat:["Cultural"], price:100, market:140, duration:"3 Hours", pickup:"Stone Town 9 AM", desc:"30+ spices + fruits tasting", includes:"Guide, Tasting, Lunch", area:"Central", active:true, images:["spice.jpg"], imageDatas:[""], image:"spice.jpg", featured:false, imageData:"" },
  { id:"jozani", name:"Jozani Forest Monkeys", cat:["Nature"], price:90, market:120, duration:"3 Hours", pickup:"Stone Town 8 AM", desc:"Red colobus monkeys only in Zanzibar", includes:"Car, Guide, Entrance", area:"South East", active:true, images:["jozani.jpg"], imageDatas:[""], image:"jozani.jpg", featured:false, imageData:"" },
]

export default function ToursPage(){
  const [tours, setTours] = useState(DEFAULT_TOURS)
  const [selected, setSelected] = useState<any[]>([])
  const [slideIndex, setSlideIndex] = useState<{[k:string]:number}>({})

  // Fetch from your heroshuttle schema (Supabase)
  useEffect(()=>{
    fetch('/api/tours').then(r=>r.json()).then(data=>{
      if(Array.isArray(data) && data.length>0){
        const mapped = data.map((t:any)=>({
          id: t.id, name: t.name, cat: t.cat||[t.area], price: t.price, market: t.market,
          duration: t.duration, pickup: t.pickup, desc: t.description||t.desc, includes: t.includes, area: t.area, active: t.active,
          images: t.image_urls||[], imageDatas: t.image_urls||[], image: (t.image_urls||[])[0]||"", featured: t.featured
        }))
        setTours(mapped)
      }
    }).catch(()=>{})
  },[])

  // Auto slider every 5 sec for 3 pics
  useEffect(()=>{
    const iv = setInterval(()=>{
      setSlideIndex(prev=>{
        const next:any = {...prev}
        tours.forEach(t=>{
          const imgs = t.imageDatas?.filter(Boolean) || t.images || []
          if(imgs.length>1){
            next[t.id] = ((prev[t.id]||0)+1) % imgs.length
          }
        })
        return next
      })
    },5000)
    return ()=>clearInterval(iv)
  },[tours])

  const toggleTour = (tour:any)=>{
    setSelected(prev=>{
      if(prev.find(p=>p.id===tour.id)) return prev.filter(p=>p.id!==tour.id)
      return [...prev, {...tour, guests:1}]
    })
  }

  const total = useMemo(()=>selected.reduce((s,t)=>s+(t.price*t.guests),0),[selected])
  const totalMarket = useMemo(()=>selected.reduce((s,t)=>s+((t.market||t.price)*t.guests),0),[selected])

  const bookWhatsApp = ()=>{
    if(selected.length===0) return
    const msg = `Jambo HeroShuttle! 🚤%0A%0AI want to book:%0A${selected.map(t=>`• ${t.name} - $${t.price} (${t.duration}, Pickup: ${t.pickup}, ${t.guests} guest)`).join('%0A')}%0A%0ATotal: $${total} (Market: $${totalMarket})%0ASaving: $${totalMarket-total}`
    window.open(`https://wa.me/255773000000?text=${msg}`, '_blank')
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="max-w-7xl mx-auto p-4 grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6">

        {/* LEFT - Tours Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tours.filter(t=>t.active).map(tour=>{
            const imgs = tour.imageDatas?.filter(Boolean).length? tour.imageDatas.filter(Boolean) : tour.images
            const idx = slideIndex[tour.id]||0
            const currentImg = imgs?.[idx] || ''
            const isSelected = selected.find(s=>s.id===tour.id)
            return (
              <div key={tour.id} className={`rounded-2xl overflow-hidden bg-white border-2 shadow-sm transition ${isSelected?'border-green-500 ring-2 ring-green-200': 'border-gray-800'}`}>
                <div className="h-48 relative bg-gradient-to-br from-teal-600 to-slate-900 flex items-center justify-center overflow-hidden">
                  {currentImg? <img src={currentImg} alt={tour.name} className="w-full h-full object-cover" /> : <span className="text-white/50 text-xs">{tour.id}</span>}
                  {imgs?.length>1 && <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">{imgs.map((_:any,i:number)=><div key={i} className={`w-1.5 h-1.5 rounded-full ${i===idx?'bg-white':'bg-white/40'}`} />)}</div>}
                  {tour.featured && <div className="absolute top-2 left-2 bg-yellow-400 text-xs font-bold px-2 py-1 rounded">FEATURED</div>}
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-[#0a2540]">{tour.name}</h3>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2">{tour.desc} • {tour.duration} • {tour.area}</p>
                  <div className="flex items-end justify-between mt-3">
                    <div>
                      <div className="text-xs text-red-600 font-bold">$</div>
                      <div className="font-extrabold text-[#0a2540] text-lg">${tour.price}</div>
                      {tour.market>tour.price && <div className="text-xs line-through text-gray-400">${tour.market}</div>}
                    </div>
                    <button onClick={()=>toggleTour(tour)} className={`px-4 py-2 rounded-full text-xs font-bold ${isSelected?'bg-red-500 text-white':'bg-[#0a2540] text-white'}`}>{isSelected?'Remove -':'Add +'}</button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* RIGHT - DETAILED SELECTION */}
        <div className="lg:sticky top-4 h-fit">
          <div className="bg-white rounded-2xl border border-gray-800 p-4 shadow-sm">
            <h3 className="font-bold text-[#0a2540] mb-3">🛒 Total: ${total} ({selected.length} tours)</h3>

            {selected.length===0? (
              <p className="text-sm text-gray-500">No tours selected yet. Click Add+ to build your trip.</p>
            ) : (
              <div className="space-y-3 max-h-[60vh] overflow-auto pr-1">
                {selected.map(t=>(
                  <div key={t.id} className="border rounded-xl p-3 bg-gray-50">
                    <div className="flex gap-3">
                      <div className="w-16 h-16 rounded-lg bg-slate-800 flex-shrink-0 overflow-hidden">
                        {(t.imageDatas?.[0]||t.images?.[0]) && <img src={t.imageDatas?.[0]||t.images?.[0]} className="w-full h-full object-cover" />}
                      </div>
                      <div className="flex-1">
                        <div className="font-bold text-sm text-[#0a2540] leading-tight">{t.name}</div>
                        <div className="text-[11px] text-gray-600 mt-1">⏱ {t.duration} • 📍 {t.area} • 🕘 {t.pickup}</div>
                        <div className="text-[11px] text-gray-500 mt-1">{t.includes}</div>
                      </div>
                      <button onClick={()=>toggleTour(t)} className="text-red-500 text-xs font-bold">✕</button>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <div className="flex items-center gap-2">
                        <button onClick={()=>setSelected(s=>s.map(x=>x.id===t.id?{...x, guests: Math.max(1, x.guests-1)}:x))} className="w-6 h-6 rounded-full border bg-white">-</button>
                        <span className="text-xs font-bold">{t.guests} guest</span>
                        <button onClick={()=>setSelected(s=>s.map(x=>x.id===t.id?{...x, guests: x.guests+1}:x))} className="w-6 h-6 rounded-full border bg-white">+</button>
                      </div>
                      <div className="font-bold text-[#0a2540]">${t.price * t.guests}</div>
                    </div>
                  </div>
                ))}
                <div className="border-t pt-3 text-sm space-y-1">
                  <div className="flex justify-between"><span>Subtotal</span><span>${total}</span></div>
                  <div className="flex justify-between text-gray-500"><span>Market price</span><span className="line-through">${totalMarket}</span></div>
                  <div className="flex justify-between font-bold text-green-600"><span>You save</span><span>${totalMarket-total}</span></div>
                </div>
              </div>
            )}

            <button disabled={selected.length===0} onClick={bookWhatsApp} className="w-full mt-4 bg-[#25D366] disabled:bg-gray-300 text-white font-bold py-3 rounded-full text-sm">
              📱 Book WhatsApp
            </button>
            {selected.length>0 && <p className="text-[10px] text-gray-500 mt-2 text-center">Detailed itinerary will be sent via WhatsApp with pickup times & inclusions</p>}
          </div>
        </div>

      </div>
      <Footer />
    </div>
  )
}