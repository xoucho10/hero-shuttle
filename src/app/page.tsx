"use client"
import { useState, useEffect, useMemo, useRef } from "react"
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'

const DEFAULT_ANNOUNCEMENTS = [
  { id:1, badge:"✈️ BEST TRANSFERS • PRIVATE CAR", title:"Zanzibar Airport Transfers - Private Vehicle per CAR", subtitle:"Meet & Greet + Flight Tracking + AC vehicle for your group + Child seat free + Pay After Trip", cta:"View Transfers", link:"#transfers", imageData:"https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&q=80&auto=format&fit=crop", active:true },
  { id:2, badge:"🐢 TOP RATED • PRIVATE BOAT", title:"Prison Island & Nakupenda Private Tour", subtitle:"Giant tortoises 100+ years + white sandbank + fruit & snorkeling - Private boat & licensed guide", cta:"View Tours", link:"#tours", imageData:"https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80&auto=format&fit=crop", active:true },
  { id:3, badge:"🏝️ FULL DAY • BEST SNORKELING", title:"Safari Blue & Mnemba Atoll - Private Dhow & Boat", subtitle:"Safari Blue sandbank + snorkeling + seafood BBQ & Mnemba best reef - Private dhow/boat", cta:"Build Itinerary", link:"#tours", imageData:"https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=800&q=80&auto=format&fit=crop", active:true },
]

const TRANSFER_IMAGE_MAP: Record<string, string> = {
  "airport-stone": "/transfers/airport-stone.jpg",
  "airport-nungwi": "/transfers/nungwi.jpg",
  "airport-matemwe": "/transfers/matemwe.jpg",
  "airport-paje": "/transfers/airport-paje.jpg",
  "airport-kizimkazi": "/transfers/kiwengwa.jpg",
  "airport-kiwengwa": "/transfers/kiwengwa.jpg",
  "paje-nungwi": "/transfers/paje-nungwi.jpg",
}
const TRANSFER_MARKET_MAP: Record<string, {price:number, market:number}> = {
  "airport-stone": {price:15, market:25},
  "airport-nungwi": {price:40, market:60},
  "airport-matemwe": {price:40, market:60},
  "airport-paje": {price:40, market:60},
  "airport-kiwengwa": {price:35, market:55},
  "airport-kizimkazi": {price:40, market:60},
  "paje-nungwi": {price:70, market:110},
}
function getTransferImage(id: string, name: string, apiImage?: string): string {
  const lowerId = id?.toLowerCase() || ""
  if (TRANSFER_IMAGE_MAP[lowerId]) return TRANSFER_IMAGE_MAP[lowerId]
  const key = (id + " " + name).toLowerCase()
  if (key.includes("stone")) return "/transfers/airport-stone.jpg"
  if ((key.includes("nungwi") && key.includes("airport")) || key.includes("kendwa") || key.includes("nungwi")) return "/transfers/nungwi.jpg"
  if (key.includes("matemwe") || key.includes("mnemba")) return "/transfers/matemwe.jpg"
  if (key.includes("paje") && key.includes("airport")) return "/transfers/airport-paje.jpg"
  if (key.includes("kiwengwa") || key.includes("pongwe") || key.includes("kizimkazi")) return "/transfers/kiwengwa.jpg"
  if (key.includes("paje") && key.includes("nungwi")) return "/transfers/paje-nungwi.jpg"
  return apiImage || ""
}
function getTransferPricing(id:string, name:string, apiPrice:number, apiMarket:number){
  const lowerId = id?.toLowerCase() || ""
  if(TRANSFER_MARKET_MAP[lowerId]) return TRANSFER_MARKET_MAP[lowerId]
  const key = (id + " " + name).toLowerCase()
  if(key.includes("paje") && key.includes("nungwi")) return {price:70, market:110}
  if(key.includes("stone")) return {price: apiPrice>0? apiPrice:15, market: apiMarket>0? apiMarket:25}
  if(key.includes("nungwi") || key.includes("kendwa")) return {price: apiPrice>0? apiPrice:40, market: apiMarket>0? apiMarket:60}
  if(key.includes("matemwe") || key.includes("mnemba")) return {price: apiPrice>0? apiPrice:40, market: apiMarket>0? apiMarket:60}
  if(key.includes("kiwengwa") || key.includes("pongwe")) return {price: apiPrice>0? apiPrice:35, market: apiMarket>0? apiMarket:55}
  if(key.includes("paje") || key.includes("jambiani")) return {price: apiPrice>0? apiPrice:40, market: apiMarket>0? apiMarket:60}
  if(key.includes("kizimkazi") || key.includes("fumba")) return {price: apiPrice>0? apiPrice:40, market: apiMarket>0? apiMarket:60}
  return {price: apiPrice||35, market: apiMarket|| (apiPrice+20)}
}

const PUBLIC_IMAGE_MAP: Record<string, string[]> = {
  "prison-nakupenda": ["/tours/prison-nakupenda.jpg"],
  "salaam": ["/tours/salaam-cave.jpg"],
  "salaam-cave": ["/tours/salaam-cave.jpg"],
  "kuza": ["/tours/kuza-cave.jpg"],
  "kuza-cave": ["/tours/kuza-cave.jpg"],
  "mnemba": ["/tours/mnemba.jpg", "/tours/mnemba2.jpg"],
  "safari-sharing": ["/tours/safari-sharing.jpg"],
  "sharing": ["/tours/safari-sharing.jpg"],
  "prison-island": ["/tours/prison-island.jpg", "/tours/prison-island2.jpg"],
  "prison-only": ["/tours/prison-island.jpg", "/tours/prison-island2.jpg"],
  "nakupenda-only": ["/tours/nakupenda-only.jpg", "/tours/nakupenda-only2.jpg"],
  "nakupenda": ["/tours/nakupenda-only.jpg", "/tours/nakupenda-only2.jpg"],
  "quad-bike": ["/tours/quad-bike.jpg", "/tours/quad-bike2.jpg"],
  "quad": ["/tours/quad-bike.jpg", "/tours/quad-bike2.jpg"],
  "safari-blue-private": ["/tours/safari-blue-private.jpg"],
  "private": ["/tours/safari-blue-private.jpg"],
  "stone-town": ["/tours/stone-town.jpg", "/tours/stone-town2.jpg"],
  "spice-farm": ["/tours/spice-farm.jpg", "/tours/spice-farm2.jpg"],
  "spice": ["/tours/spice-farm.jpg", "/tours/spice-farm2.jpg"],
  "jozani": ["/tours/jozani-monkeys1.jpg", "/tours/jozani-monkeys2.jpg", "/tours/jozani-monkeys3.jpg"],
  "sunset-dhow": ["/tours/sunset-dhow.jpg"],
  "sunset": ["/tours/sunset-dhow.jpg"],
  "kizimkazi-dolphin": ["/tours/kizimkazi-dolphin.jpg"],
  "kizimkazi": ["/tours/kizimkazi-dolphin.jpg"],
  "dolphin": ["/tours/kizimkazi-dolphin.jpg"],
}
function getPublicImages(id: string, name: string): string[] | null {
  const raw = (id + " " + name).toLowerCase()
  const key = raw.replace(/-/g, " ")
  if (PUBLIC_IMAGE_MAP[id?.toLowerCase()]) return PUBLIC_IMAGE_MAP[id.toLowerCase()]
  for (const mapKey in PUBLIC_IMAGE_MAP) {
    const mapKeyNorm = mapKey.replace(/-/g, " ")
    if (key.includes(mapKey) || key.includes(mapKeyNorm) || raw.includes(mapKey)) {
      return PUBLIC_IMAGE_MAP[mapKey]
    }
  }
  return null
}

const REAL_10_TRANSFERS = [
  { id:"airport-stone", name:"Airport → Stone Town", area:"West", duration:"15 min", distance:"6 km", price:15, market:25, desc:"Per CAR up to 6 pax - Pay after trip", active:true, cat:["Popular"] },
  { id:"airport-nungwi", name:"Airport → Nungwi / Kendwa", area:"North", duration:"1h 15m", distance:"58 km", price:40, market:60, desc:"Per CAR up to 6 pax - North beach", active:true, cat:["Popular","North"] },
  { id:"airport-matemwe", name:"Airport → Matemwe / Mnemba", area:"North-East", duration:"1h 20m", distance:"52 km", price:40, market:60, desc:"Per CAR up to 6 pax - Mnemba area", active:true, cat:["Popular","North"] },
  { id:"airport-kiwengwa", name:"Airport → Kiwengwa / Pongwe", area:"East", duration:"1h", distance:"36 km", price:35, market:55, desc:"Per CAR - East coast", active:true, cat:["East"] },
  { id:"airport-paje", name:"Airport → Paje / Jambiani", area:"South-East", duration:"1h", distance:"48 km", price:40, market:60, desc:"Per CAR up to 6 pax - Kitesurf area", active:true, cat:["Popular","South"] },
  { id:"paje-nungwi", name:"Paje → Nungwi", area:"North", duration:"1h 30m", distance:"75 km", price:70, market:110, desc:"Per CAR - East to North crossing", active:true, cat:["Popular"] },
]

const HOME_BLOGS = [
  { slug:"prison-island-nakupenda-guide", cat:"Guide", title:"Prison Island & Nakupenda: Complete Guide 2026", excerpt:"Giant tortoises 100+ years + white sandbank - best time, itinerary and private boat inclusions." },
  { slug:"mnemba-atoll-snorkeling-guide", cat:"Snorkeling", title:"Mnemba Atoll Snorkeling: Best Reef in Zanzibar", excerpt:"Why Mnemba is best snorkeling spot, visibility, tropical fish and private boat from Matemwe." },
  { slug:"safari-blue-full-guide", cat:"Guide", title:"Safari Blue: Sandbank, Snorkeling & Seafood BBQ", excerpt:"Full day from Fumba to Kwale Island - sandbank, snorkeling, BBQ and mangrove lagoon." },
  { slug:"zanzibar-airport-transfers-guide", cat:"Transfers", title:"Zanzibar Airport Transfers: Guide to All Areas 2026", excerpt:"How to get from Zanzibar Airport to Stone Town, Nungwi, Paje and Jambiani with private vehicle." },
  { slug:"stone-town-walking-guide", cat:"Cultural", title:"Stone Town Walking Tour: UNESCO Heritage", excerpt:"Freddie Mercury house, Old Fort, Slave Market Cathedral and Forodhani Gardens." },
  { slug:"best-time-to-visit-zanzibar", cat:"Tips", title:"Best Time to Visit Zanzibar: Weather by Month", excerpt:"Dry season June to October, best months for Mnemba snorkeling, Safari Blue." },
]

const HIDDEN_TOUR_IDS = ["kite-lesson","chumbe","rock","nungwi-sunset","paje-kite","chumbe-island","the-rock","nungwi-beach","kite-surfing","quad-bike-village"]

export default function HomePage(){
  const [announcements, setAnnouncements] = useState(DEFAULT_ANNOUNCEMENTS)
  const [activeSlide, setActiveSlide] = useState(0)
  const [tours, setTours] = useState<any[]>([])
  const [transfers, setTransfers] = useState<any[]>(REAL_10_TRANSFERS.map(t=>({...t, imageData:getTransferImage(t.id,t.name,""), imageDatas:[getTransferImage(t.id,t.name,"")]})))
  const [filter, setFilter] = useState("Popular")
  const [selectedTours, setSelectedTours] = useState<any[]>([])
  const [selectedTransfers, setSelectedTransfers] = useState<any[]>([])
  const [waNumber, setWaNumber] = useState("255773628792")
  const [blogs, setBlogs] = useState(HOME_BLOGS)
  const [showCart, setShowCart] = useState(false)
  // --- ADDED REVIEWS FETCH ONLY ---
  const [reviews, setReviews] = useState<any[]>([])
  const [reviewsLoading, setReviewsLoading] = useState(true)

  const announcementsRef = useRef(announcements)
  useEffect(()=>{ announcementsRef.current = announcements }, [announcements])
  useEffect(()=>{ if(selectedTours.length+selectedTransfers.length>0) setShowCart(true); else setShowCart(false) },[selectedTours, selectedTransfers])
  useEffect(()=>{ if(activeSlide >= announcements.length) setActiveSlide(0) },[announcements.length, activeSlide])

  const syncAll = async ()=>{
    try{
      const r = await fetch('/api/announcements',{cache:'no-store'})
      const data = await r.json()
      if(Array.isArray(data) && data.length>0){
        const filtered = data.filter((a:any)=>a.active!==false)
        if(filtered.length>0){
          const mapped = filtered.map((a:any, idx:number)=>{
            const fallbackImg = DEFAULT_ANNOUNCEMENTS[idx % DEFAULT_ANNOUNCEMENTS.length]?.imageData || DEFAULT_ANNOUNCEMENTS[0].imageData
            return { id:a.id, badge:a.badge || DEFAULT_ANNOUNCEMENTS[idx % DEFAULT_ANNOUNCEMENTS.length].badge, title:a.title || DEFAULT_ANNOUNCEMENTS[idx % DEFAULT_ANNOUNCEMENTS.length].title, subtitle:a.subtitle || DEFAULT_ANNOUNCEMENTS[idx % DEFAULT_ANNOUNCEMENTS.length].subtitle, cta:a.cta || "View Tours", link:a.link || "#tours", active:a.active!==false, imageData:(a.image_urls?.[0]||a.imageData||a.image||"") || fallbackImg }
          })
          setAnnouncements(mapped)
        }
      }
    }catch{}
    try{
      const r = await fetch('/api/tours',{cache:'no-store'})
      const data = await r.json()
      if(Array.isArray(data) && data.length>0){
        const mapped = data.filter((d:any)=>d.active!==false).filter((d:any)=>!HIDDEN_TOUR_IDS.includes(d.id)).map((d:any)=>{
          const publicUrls = getPublicImages(d.id, d.name||d.title||"")
          const urls = publicUrls && publicUrls.length>0 ? publicUrls : []
          const apiPrice = Number(d.price?? 0)
          const apiMarket = Number(d.market_price?? d.market?? 0)
          const market = apiMarket>apiPrice ? apiMarket : apiPrice+20
          return { id:d.id, name:d.name||d.title, cat: Array.isArray(d.cat)? d.cat : d.category? [d.category] : ["Popular"], price: apiPrice, market, duration: d.duration || "3 Hours", pickup: d.pickup || "Stone Town", desc: d.description || d.desc || "", area: d.area || "West", active: d.active!==false, featured:!!d.featured, imageData: urls[0]||"", imageDatas: urls, image: urls[0]||"", }
        })
        if(mapped.length>0) setTours(mapped)
      }
    }catch{}
    try{
      const r = await fetch('/api/transfers',{cache:'no-store'})
      const data = await r.json()
      if(Array.isArray(data) && data.length>0){
        const mapped = data.filter((d:any)=>d.active!==false).map((d:any)=>{
          const apiPrice = Number(d.price?? 0)
          const apiMarket = Number(d.market_price?? d.market?? 0)
          const pricing = getTransferPricing(d.id, d.name||d.title, apiPrice, apiMarket)
          const apiImg = d.image_urls?.[0] || d.images?.[0] || ""
          const finalImg = getTransferImage(d.id, d.name, apiImg)
          return { id:d.id, name:d.name||d.title, area: d.area || "West", duration: d.duration || "", distance: d.distance || "", price: pricing.price, market: pricing.market, desc: d.description || d.desc || "", imageData: finalImg, imageDatas: finalImg ? [finalImg] : [], image: finalImg, active: d.active!==false, cat: Array.isArray(d.cat)? d.cat : d.category? [d.category] : ["Popular"] }
        })
        if(mapped.length>0) setTransfers(mapped)
      }
    }catch{}
    try{ const r = await fetch('/api/blogs',{cache:'no-store'}); const data = await r.json(); if(Array.isArray(data)&&data.length>0) setBlogs(data.slice(0,6).map((b:any)=>({ slug:b.slug||b.id, cat:b.cat||b.category, title:b.title, excerpt:b.excerpt||b.desc||"" }))) }catch{}
    try{ const r = await fetch('/api/settings',{cache:'no-store'}); const data = await r.json(); if(data?.whatsapp) setWaNumber(data.whatsapp) }catch{}

    // --- REVIEWS API FETCH (ADDED) ---
    try{
      setReviewsLoading(true)
      const r = await fetch('/api/reviews',{cache:'no-store'})
      const data = await r.json()
      if(Array.isArray(data)) setReviews(data)
      else if(Array.isArray(data?.data)) setReviews(data.data)
      else if(Array.isArray(data?.reviews)) setReviews(data.reviews)
      else if(Array.isArray(data?.data?.data)) setReviews(data.data.data)
      else setReviews([])
    }catch{
      setReviews([])
    }finally{
      setReviewsLoading(false)
    }
  }

  useEffect(()=>{ syncAll(); const ivSync = setInterval(syncAll, 15000); const onFocus = ()=> syncAll(); window.addEventListener('focus', onFocus); return ()=>{ clearInterval(ivSync); window.removeEventListener('focus', onFocus) } },[])
  useEffect(()=>{ const ivSlide = setInterval(()=>{ setActiveSlide(prev=>{ const len = announcementsRef.current.length || 1; return (prev + 1) % len }) }, 3000); return ()=> clearInterval(ivSlide) },[])

  const filteredForDisplay = useMemo(()=>{
    if(tours.length===0) return []
    if(filter==="Popular") return tours.filter(t=>t.cat?.includes("Popular") || t.featured)
    return tours.filter(t=> t.cat?.includes(filter))
  },[tours, filter])

  const toursToShow = filteredForDisplay.length>0? filteredForDisplay.slice(0,8) : tours.slice(0,8)
  const toursTotal = useMemo(()=> selectedTours.reduce((s,t)=> s + (t.price*(t.guests||1)),0),[selectedTours])
  const transfersTotal = useMemo(()=> selectedTransfers.reduce((s,t)=> s + (t.price*(t.guests||1)),0),[selectedTransfers])
  const grandTotal = toursTotal + transfersTotal
  const marketTotal = useMemo(()=> [...selectedTours,...selectedTransfers].reduce((s,t:any)=> s + ((t.market||0)*(t.guests||1)),0),[selectedTours, selectedTransfers])
  const savings = marketTotal - grandTotal
  const activeAnn = announcements[activeSlide] || announcements[0] || DEFAULT_ANNOUNCEMENTS[0]
  const toggleTour = (tour:any)=> setSelectedTours(prev=> prev.find(p=>p.id===tour.id)? prev.filter(p=>p.id!==tour.id) : [...prev, {...tour, guests:1, type:'tour'}])
  const toggleTransfer = (tr:any)=> setSelectedTransfers(prev=> prev.find(p=>p.id===tr.id)? prev.filter(p=>p.id!==tr.id) : [...prev, {...tr, guests:1, type:'transfer'}])
  const allSelected = [...selectedTransfers, ...selectedTours]

  const TA_WRITE_URL = "https://www.tripadvisor.com/UserReviewEdit-g8055401-d34749047-Hero_Shuttles-Zanzibar_City_Zanzibar_Island_Zanzibar_Archipelago.html"
  const TA_VIEW_URL = "https://www.tripadvisor.com/Attraction_Review-g8055401-d34749047-Reviews-Hero_Shuttles-Zanzibar_City_Zanzibar_Island_Zanzibar_Archipelago.html"

  return (
    <main className="min-h-screen bg-[#F8FAFF]">
      <Header/>

      <div className={`fixed top-0 right-0 h-full w-[380px] max-w-[85vw] bg-white shadow-[0_0_40px_rgba(0,0,0,0.15)] z-[100] border-l-2 border-[#0a2342] transition-transform duration-500 ease-in-out ${showCart ? "translate-x-0" : "translate-x-full"} flex flex-col`}>
        <div className="p-5 border-b bg-[#0a2342] text-white flex justify-between items-start">
          <div>
            <h3 className="font-black text-[16px]">🛒 Your Selection</h3>
            <p className="text-[11px] font-bold opacity-80 mt-1">${grandTotal} • {allSelected.length} items • Save ${savings>0? savings:0}</p>
          </div>
          <button onClick={()=>setShowCart(false)} className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center font-black text-[14px]">✕</button>
        </div>
        <div className="flex-1 overflow-auto p-3 space-y-3">
          {allSelected.map(t=>{
            const img = t.imageData || t.imageDatas?.[0] || t.image || ""
            const save = (t.market||0)-(t.price||0)
            return (
              <div key={t.id} className="flex gap-3 bg-[#f5f7fa] rounded-[14px] p-3 border">
                <div className="w-[72px] h-[72px] rounded-[10px] overflow-hidden bg-[#0a2342] flex-shrink-0">
                  {img? <img src={img} alt={t.name} className="w-full h-full object-cover"/> : <div className="w-full h-full bg-gradient-to-br from-[#0a2342] to-[#1e3a5f]" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between gap-2">
                    <p className="font-black text-[12px] text-[#0a2342] leading-tight line-clamp-2">{t.name}</p>
                    <button onClick={()=> t.type==='transfer' ? toggleTransfer(t) : toggleTour(t)} className="text-red-500 font-black text-[12px] w-6 h-6 flex items-center justify-center rounded-full bg-white border flex-shrink-0">✕</button>
                  </div>
                  <p className="text-[10px] text-gray-500 mt-1">📍 {t.area} {t.distance? `• 📏 ${t.distance}`:''} • ⏱ {t.duration}</p>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-[10px] text-red-500 line-through font-bold">${t.market}</span>
                    <span className="text-[13px] font-black text-green-600">${t.price}{t.type==='transfer'? '/car':''}</span>
                  </div>
                  {save>0 && <p className="text-[10px] font-bold text-green-600 mt-0.5">Save ${save}</p>}
                </div>
              </div>
            )
          })}
        </div>
        {allSelected.length>0 && (
          <div className="p-4 border-t bg-[#f8faff] space-y-2">
            <div className="flex justify-between text-[12px] text-gray-500"><span>Market</span><span className="line-through">${marketTotal}</span></div>
            <div className="flex justify-between font-black text-[15px] text-[#0a2342]"><span>Total</span><span>${grandTotal}</span></div>
            {savings>0 && <div className="bg-green-50 border border-green-200 text-green-700 text-[11px] font-black px-3 py-2 rounded-full text-center">You Save ${savings} - Pay After Trip</div>}
            <button onClick={()=>{
              const msg=`Jambo HERO!%0A${selectedTransfers.map(t=>`• ${t.name} - ${t.distance} - $${t.price}/car (Save $${(t.market||0)-t.price})`).join("%0A")}%0A${selectedTours.map(t=>`• ${t.name} - $${t.price}`).join("%0A")}%0ATotal $${grandTotal} Save $${savings}`
              window.open(`https://wa.me/${waNumber}?text=${msg}`,"_blank")
            }} className="w-full bg-[#0a2342] text-white py-3.5 rounded-full font-black text-[13px]">📱 Book on WhatsApp - ${grandTotal}</button>
          </div>
        )}
      </div>

      {allSelected.length>0 && !showCart && (
        <button onClick={()=>setShowCart(true)} className="fixed bottom-6 right-6 z-[90] bg-[#0a2342] text-white px-5 py-3.5 rounded-full font-black text-[13px] shadow-2xl border-2 border-white flex items-center gap-2 animate-bounce">
          🛒 {allSelected.length} • ${grandTotal} • Save ${savings} → View Cart
        </button>
      )}

      <section className="relative bg-white border-b overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#FFF6E8] via-white to-[#EAF2FF]" />
        <div className="relative max-w-[1400px] mx-auto px-6 md:px-12 py-10 md:py-14 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <span className="inline-block bg-[#0A2342] text-white text-[11px] font-black px-3 py-1 rounded-full tracking-widest">{activeAnn?.badge}</span>
            <h1 className="mt-4 font-black text-[32px] md:text-[42px] leading-[0.95] text-[#0A2342]">{activeAnn?.title}</h1>
            <p className="mt-3 text-[14px] md:text-[15px] text-[#0A2342]/70 leading-relaxed font-medium">{activeAnn?.subtitle}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              <span className="bg-[#F8FAFF] border border-[#0A2342]/10 text-[12px] font-bold px-3.5 py-1.5 rounded-full">✓ Licensed & Insured</span>
              <span className="bg-[#F8FAFF] border border-[#0A2342]/10 text-[12px] font-bold px-3.5 py-1.5 rounded-full">✓ Private Vehicle for Your Group</span>
              <span className="bg-[#F8FAFF] border border-[#0A2342]/10 text-[12px] font-bold px-3.5 py-1.5 rounded-full">✓ Pay After Trip</span>
            </div>
            <div className="mt-6 flex gap-3">
              <a href={activeAnn?.link} className="bg-[#0A2342] text-white px-7 py-3.5 rounded-full font-black text-[13px] hover:bg-black transition">{activeAnn?.cta}</a>
              <a href={`https://wa.me/${waNumber}`} target="_blank" className="bg-white border-2 border-[#0A2342]/10 text-[#0A2342] px-7 py-3.5 rounded-full font-black text-[13px]">WhatsApp Us</a>
            </div>
            <div className="mt-4 flex gap-2 items-center">
              {announcements.map((_,i)=><button key={i} onClick={()=>setActiveSlide(i)} className={`h-1.5 rounded-full transition-all ${i===activeSlide? "w-8 bg-[#0A2342]" : "w-3 bg-[#0A2342]/20"}`} />)}
            </div>
          </div>
          <div className="h-[300px] md:h-[380px] bg-[#F8FAFF] rounded-[20px] border border-[#0A2342]/5 overflow-hidden shadow-sm">
            {activeAnn?.imageData? <img src={activeAnn.imageData} className="w-full h-full object-cover" alt={activeAnn.title}/> : <div className="w-full h-full bg-gradient-to-br from-[#0A2342] to-[#2a5a8a]" />}
          </div>
        </div>
      </section>

      <section id="transfers" className="px-6 md:px-12 py-12 bg-white">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center max-w-[750px] mx-auto">
            <h2 className="font-black text-[#0A2342] text-[28px] md:text-[32px]">Zanzibar Airport Transfers - Private Vehicle</h2>
            <p className="text-[13.5px] md:text-[14px] text-[#0A2342]/65 mt-2 leading-relaxed font-medium">Same pricing & images as transfers page - fast local images, pay after trip.</p>
          </div>
          <div className="mt-9 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {transfers.slice(0,8).map((tr:any)=>{
              const isSel = selectedTransfers.find(s=>s.id===tr.id)
              const save = (tr.market||0)-(tr.price||0)
              return (
              <div key={tr.id} className={`bg-white rounded-[18px] overflow-hidden shadow-sm border-2 transition flex flex-col ${isSel?'border-[#0A2342] shadow-lg':'border-[#0A2342]/5 hover:border-[#0A2342]/15 hover:shadow-md'}`}>
                <div className="h-[175px] bg-[#EAF2FF] relative overflow-hidden">
                  {tr.imageData? <img src={tr.imageData} alt={tr.name} className="w-full h-full object-cover"/> : <div className="w-full h-full bg-gradient-to-br from-[#0A2342] to-[#2a5a8a]" />}
                  <span className="absolute top-2.5 left-2.5 bg-[#0A2342] text-white text-[10px] px-3 py-1 rounded-full font-black tracking-wide">{tr.area} • {tr.duration}</span>
                  {save>0 && <span className="absolute top-2.5 right-2.5 bg-[#16A34A] text-white text-[10px] px-2.5 py-1 rounded-full font-black shadow">Save ${save}</span>}
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <p className="font-black text-[15px] md:text-[16px] text-[#0A2342] leading-tight">{tr.name}</p>
                  <p className="text-[12.5px] md:text-[13px] text-[#0A2342]/60 mt-1.5 line-clamp-2 leading-relaxed font-medium">{tr.desc}</p>
                  <div className="mt-4 flex justify-between items-end mt-auto">
                    <div>
                      <p className="text-[13px] font-black text-[#DC2626] line-through decoration-2">${tr.market}</p>
                      <p className="font-black text-[22px] md:text-[24px] text-[#16A34A] leading-none mt-1">${tr.price} <span className="text-[11px] font-bold text-[#0A2342]/50">per car</span></p>
                      {save>0 && <p className="text-[11px] font-bold text-green-600 mt-1">Save ${save}</p>}
                    </div>
                    <button onClick={()=>toggleTransfer(tr)} className={`px-5 py-2.5 rounded-full text-[12px] font-black transition shadow-sm ${isSel?'bg-[#0A2342] text-white':'bg-[#F8FAFF] border-2 border-[#0A2342]/10 text-[#0A2342] hover:bg-[#0A2342] hover:text-white'}`}>{isSel?'✓ Added':'Add +'}</button>
                  </div>
                </div>
              </div>
            )})}
          </div>
          <div className="text-center">
            <Link href="/airport-transfers" className="inline-block mt-9 bg-white border-2 border-[#0A2342] text-[#0A2342] px-8 py-3.5 rounded-full font-black text-[13px] hover:bg-[#0A2342] hover:text-white transition">View All Transfers →</Link>
          </div>
        </div>
      </section>

      <section id="tours" className="px-6 md:px-12 py-12 bg-[#EEF4FF]">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center">
            <h2 className="font-black text-[#0A2342] text-[30px] md:text-[34px]">Private Zanzibar Tours</h2>
            <div className="mt-6 inline-flex bg-white rounded-full p-1.5 gap-1 shadow-sm border border-[#0A2342]/10">
              {["Popular","Half Day","Full Day"].map(c=>(
                <button key={c} onClick={()=>setFilter(c)} className={`px-7 py-2.5 rounded-full text-[12px] font-black transition ${filter===c? "bg-[#0A2342] text-white shadow" : "text-[#0A2342]/60 hover:text-[#0A2342]"}`}>{c}</button>
              ))}
            </div>
          </div>
          <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {toursToShow.map((t:any)=>{
              const isSel = selectedTours.find(s=>s.id===t.id)
              const save = (t.market||0)-(t.price||0)
              return (
              <div key={t.id} className={`bg-white rounded-[18px] overflow-hidden shadow-sm hover:shadow-xl transition flex flex-col border-2 ${isSel?'border-[#0A2342] shadow-lg':'border-[#0A2342]/5 hover:border-[#0A2342]/10'}`}>
                <div className="h-[200px] bg-[#E6F5F3] relative overflow-hidden">
                  {t.imageData? <img src={t.imageData} alt={t.name} className="w-full h-full object-cover"/> : <div className="w-full h-full bg-gradient-to-br from-[#1eb3a5] to-[#0A2342]" />}
                  <span className="absolute top-2.5 left-2.5 bg-[#0A2342] text-white text-[10px] px-3 py-1 rounded-full font-black">{t.cat?.[0]} • {t.duration}</span>
                  <span className="absolute bottom-2.5 left-2.5 bg-white text-[#0A2342] text-[10px] px-3 py-1 rounded-full font-bold shadow">{t.area}</span>
                  {save>0 && <span className="absolute top-2.5 right-2.5 bg-[#16A34A] text-white text-[10px] px-2.5 py-1 rounded-full font-black shadow">Save ${save}</span>}
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <p className="font-black text-[15px] md:text-[16px] leading-tight text-[#0A2342] min-h-[38px]">{t.name}</p>
                  <p className="text-[12.5px] md:text-[13px] text-[#0A2342]/60 mt-1.5 line-clamp-2 min-h-[38px] leading-relaxed font-medium">{t.desc}</p>
                  <div className="mt-4 flex justify-between items-end mt-auto">
                    <div>
                      <p className="text-[13px] font-black text-[#DC2626] line-through decoration-2">${t.market}</p>
                      <p className="font-black text-[22px] md:text-[24px] text-[#16A34A] leading-none mt-1">${t.price}</p>
                      {save>0 && <p className="text-[11px] font-bold text-green-600">Save ${save}</p>}
                    </div>
                    <button onClick={()=>toggleTour(t)} className={`px-5 py-2.5 rounded-full text-[12px] font-black transition shadow-sm ${isSel? "bg-[#0A2342] text-white" : "bg-[#F8FAFF] border-2 border-[#0A2342]/10 text-[#0A2342] hover:bg-[#0A2342] hover:text-white"}`}>{isSel? "✓ Added" : "Add +"}</button>
                  </div>
                </div>
              </div>
            )})}
          </div>
        </div>
      </section>

      <section className="px-6 md:px-12 py-14 bg-white border-t border-[#0A2342]/5">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex justify-between items-end gap-4">
            <div>
              <span className="bg-[#0A2342] text-white text-[11px] px-3.5 py-1 rounded-full font-black tracking-widest">ZANZIBAR GUIDES • LOCAL TIPS</span>
              <h2 className="font-black text-[24px] md:text-[30px] text-[#0A2342] mt-3 leading-tight">Travel guides related to our tours & transfers</h2>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            {blogs.map(b=>(
              <Link key={b.slug} href={`/blogs/${b.slug}`} className="bg-[#F8FAFF] rounded-[18px] border-2 border-[#0A2342]/5 p-6 hover:bg-white hover:border-[#0A2342]/15 hover:shadow-sm transition group">
                <span className="text-[10px] font-black bg-[#0A2342] text-white px-3 py-1 rounded-full">{b.cat}</span>
                <h3 className="font-black text-[15px] md:text-[16px] text-[#0A2342] mt-3 line-clamp-2 group-hover:text-black leading-tight">{b.title}</h3>
                <p className="text-[13px] text-[#0A2342]/65 mt-2.5 line-clamp-2 leading-relaxed font-medium">{b.excerpt}</p>
                <span className="inline-block mt-4 text-[12px] font-black text-[#0A2342]">Read Guide →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="reviews" className="px-6 md:px-12 py-16 bg-white border-t border-[#0A2342]/10">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="font-black text-[28px] md:text-[38px] text-[#0a2342] leading-[1.1]">What guests say on TripAdvisor after their<br/>private tours with HERO</h2>
            <p className="text-[13px] text-[#0A2342]/60 mt-3">Verified reviews from TripAdvisor • #112 of 1198 in Zanzibar City • Location ID: 34749047</p>
          </div>

          <div className="mt-10 grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2 bg-[#F8FAFF] rounded-[24px] border-2 border-[#0a2342]/5 p-8">
              <div className="flex items-center gap-3">
                <span className="font-black text-[18px] text-[#0a2342]">TripAdvisor</span>
                <span className="bg-[#00aa6c] text-white text-[10px] px-3 py-1 rounded-full font-black">VERIFIED</span>
                <span className="text-[11px] text-gray-500">{reviewsLoading? "Loading..." : `${reviews.length} reviews loaded`}</span>
              </div>
              <h3 className="font-black text-[22px] md:text-[26px] text-[#0a2342] mt-6 leading-tight">Enjoyed your private tour with HERO?</h3>
              <p className="text-[14px] text-[#0a2342]/70 mt-3 leading-relaxed">Tap below to leave a review on TripAdvisor. Takes 30 seconds and helps other travelers find us. Asante sana!</p>
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-3">
                <a href={TA_WRITE_URL} target="_blank" className="bg-[#00aa6c] text-white px-6 py-4 rounded-full font-black text-[14px] text-center hover:bg-[#009a62] transition">✍️ Tap to Write a Review</a>
                <a href={TA_VIEW_URL} target="_blank" className="bg-white border-2 border-[#0a2342] text-[#0a2342] px-6 py-4 rounded-full font-black text-[14px] text-center hover:bg-[#0a2342] hover:text-white transition">👁️ View All Reviews on TA</a>
              </div>
              <div className="mt-6 flex items-center gap-2 text-[11px] text-gray-500">
                <span>⭐⭐⭐⭐⭐</span>
                <span>Location ID: 34749047 • Hero Shuttles • Zanzibar City</span>
              </div>
            </div>

            <div className="bg-white rounded-[24px] border-2 border-[#0a2342]/10 p-3 text-center shadow-sm flex flex-col items-center">
              <div className="bg-[#00E078] rounded-[28px] p-5 w-full flex flex-col items-center">
                <div className="bg-white rounded-[18px] p-3 w-full">
                  <img src="/tripadvisor-qr.png" alt="TripAdvisor QR" className="w-full h-auto rounded-[8px]" />
                </div>
                <div className="mt-5 text-center">
                  <p className="font-black text-[26px] leading-none text-black">Review us</p>
                  <p className="font-black text-[26px] leading-none text-black mt-1">on</p>
                  <p className="font-black text-[26px] leading-none text-black mt-1">Tripadvisor</p>
                  <div className="mt-4 flex justify-center">
                    <svg width="80" height="32" viewBox="0 0 100 40" fill="none">
                      <ellipse cx="25" cy="18" rx="20" ry="12" fill="black"/>
                      <ellipse cx="75" cy="18" rx="20" ry="12" fill="black"/>
                      <ellipse cx="25" cy="18" rx="13" ry="8" fill="white"/>
                      <ellipse cx="75" cy="18" rx="13" ry="8" fill="white"/>
                      <circle cx="25" cy="18" r="5" fill="black"/>
                      <circle cx="75" cy="18" r="5" fill="black"/>
                      <path d="M50 28 L45 36 L55 36 Z" fill="black"/>
                    </svg>
                  </div>
                </div>
              </div>
              <a href={TA_WRITE_URL} target="_blank" className="block mt-4 w-full bg-[#0a2342] text-white px-5 py-3 rounded-full font-black text-[12px] text-center">Open Review Page →</a>
              <p className="text-[10px] text-gray-400 mt-2">Scan with phone camera • Goes to TripAdvisor</p>
            </div>
          </div>

          <div className="mt-12">
            <div className="flex justify-between items-center">
              <h3 className="font-black text-[18px] text-[#0a2342]">All Guest Reviews from TripAdvisor API</h3>
              <a href={TA_VIEW_URL} target="_blank" className="text-[12px] font-black text-[#00aa6c] underline">View on TripAdvisor →</a>
            </div>

            {reviewsLoading ? (
              <div className="mt-6 grid md:grid-cols-3 gap-4">
                {[1,2,3].map(i=><div key={i} className="bg-[#F8FAFF] rounded-[18px] p-6 animate-pulse h-[160px] border-2 border-[#0a2342]/5"></div>)}
              </div>
            ) : reviews.length > 0 ? (
              <div className="mt-6 grid md:grid-cols-3 gap-4">
                {reviews.map((rv:any, idx:number)=>(
                  <div key={rv.id||idx} className="bg-white rounded-[18px] border-2 border-[#0a2342]/5 p-5 shadow-sm">
                    <div className="flex justify-between items-start gap-2">
                      <p className="font-black text-[13px] text-[#0a2342]">{rv.user?.username || rv.author || "Guest"}</p>
                      <span className="bg-[#00aa6c]/10 text-[#00aa6c] text-[11px] font-black px-2 py-0.5 rounded-full">⭐ {rv.rating || 5}/5</span>
                    </div>
                    <p className="text-[12px] text-gray-500 mt-1">{rv.published_date || rv.date || ""} • {rv.title || ""}</p>
                    <p className="text-[13px] text-[#0a2342]/80 mt-3 leading-relaxed line-clamp-4">{rv.text || rv.review_text || rv.comment || JSON.stringify(rv).slice(0,200)}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="mt-6 bg-[#F8FAFF] rounded-[24px] border-2 border-[#0a2342]/5 p-8 text-center">
                <div className="max-w-xl mx-auto">
                  <div className="w-16 h-16 bg-[#00aa6c]/10 rounded-full flex items-center justify-center mx-auto"><span className="text-[28px]">💬</span></div>
                  <h4 className="font-black text-[16px] text-[#0a2342] mt-4">No reviews from API yet - Terra not migrated</h4>
                  <p className="text-[13px] text-[#0a2342]/60 mt-2 leading-relaxed">Your listing ID 34749047 exists on TripAdvisor but not yet in Terra API. API returns empty. Guests can still review via QR above - once migrated, reviews auto-appear here. Use Widget fallback for now.</p>
                  <div className="mt-6 flex flex-col md:flex-row justify-center gap-3">
                    <a href={TA_WRITE_URL} target="_blank" className="bg-[#0a2342] text-white px-8 py-3 rounded-full font-black text-[13px]">Write First Review →</a>
                    <a href={TA_VIEW_URL} target="_blank" className="bg-white border-2 border-[#0a2342]/10 text-[#0a2342] px-8 py-3 rounded-full font-black text-[13px]">View Listing →</a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer/>
    </main>
  )
}