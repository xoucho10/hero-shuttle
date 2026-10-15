"use client"
import { useState, useEffect, useMemo } from "react"
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'

const DEFAULT_ANNOUNCEMENTS = [
  { id:1, badge:"🔥 POPULAR", title:"Prison Island & Nakupenda Private Tour", subtitle:"Tortoise sanctuary + white sandbank + fruit & snorkeling - Private boat and guide included", cta:"View Tours", link:"#tours", imageData:"", active:true },
  { id:2, badge:"⚡ FULL DAY", title:"Safari Blue - Sandbank, Snorkeling & Seafood BBQ", subtitle:"Full day from Fumba to Kwale Island - Dhow sailing, BBQ and mangrove lagoon", cta:"Build Itinerary", link:"#tours", imageData:"", active:true },
  { id:3, badge:"TRUSTED", title:"Licensed Local Team • Pay After Trip • Free Cancellation", subtitle:"Stone Town based team, drivers live in Nungwi, Paje and Kizimkazi - WhatsApp support 24/7", cta:"Why Choose Us", link:"#reviews", imageData:"", active:true },
]

const REAL_10_TRANSFERS = [
  { id:"airport-stone", name:"Airport → Stone Town", area:"West", duration:"12-15 min", distance:"6 km", price:15, market:25, desc:"Private vehicle for your group - Stone Town hotels", image:"airport-stone.jpg", imageData:"", imageDatas:[], active:true, cat:["Popular"] },
  { id:"airport-chuwini", name:"Airport → Chuwini / Bububu", area:"West", duration:"20-25 min", distance:"14 km", price:25, market:35, desc:"Private vehicle - Bububu beach resorts", image:"airport-chuwini.jpg", imageData:"", imageDatas:[], active:true, cat:["West"] },
  { id:"airport-nungwi", name:"Airport → Nungwi / Kendwa", area:"North", duration:"1h 15m", distance:"58 km", price:40, market:60, desc:"Private vehicle - North beach, best sunset and swimming", image:"airport-nungwi.jpg", imageData:"", imageDatas:["airport-nungwi.jpg"], active:true, cat:["Popular","North"] },
  { id:"airport-matemwe", name:"Airport → Matemwe / Mnemba", area:"North-East", duration:"1h 20m", distance:"52 km", price:40, market:60, desc:"Private vehicle - Mnemba snorkeling area", image:"airport-matemwe.jpg", imageData:"", imageDatas:["airport-matemwe.jpg"], active:true, cat:["Popular","North"] },
  { id:"airport-pwani", name:"Airport → Pwani Mchangani", area:"North-East", duration:"50-60 min", distance:"38 km", price:35, market:50, desc:"Private vehicle - Pwani Mchangani", image:"airport-pwani.jpg", imageData:"", imageDatas:[], active:true, cat:["East"] },
  { id:"airport-kiwengwa", name:"Airport → Kiwengwa / Pongwe", area:"East", duration:"50-55 min", distance:"36 km", price:35, market:55, desc:"Private vehicle - East coast", image:"airport-kiwengwa.jpg", imageData:"", imageDatas:[], active:true, cat:["East"] },
  { id:"airport-uroa", name:"Airport → Uroa / Michamvi", area:"East", duration:"45-50 min", distance:"32 km", price:35, market:50, desc:"Private vehicle - Uroa", image:"airport-uroa.jpg", imageData:"", imageDatas:[], active:true, cat:["East"] },
  { id:"airport-paje", name:"Airport → Paje / Bwejuu", area:"South-East", duration:"50-60 min", distance:"48 km", price:35, market:50, desc:"Private vehicle - Kitesurf and beach area", image:"airport-paje.jpg", imageData:"", imageDatas:[], active:true, cat:["Popular","South"] },
  { id:"airport-jambiani", name:"Airport → Jambiani / Makunduchi", area:"South-East", duration:"55-65 min", distance:"55 km", price:40, market:60, desc:"Private vehicle - Jambiani", image:"airport-jambiani.jpg", imageData:"", imageDatas:[], active:true, cat:["South"] },
  { id:"airport-kizimkazi", name:"Airport → Kizimkazi / Fumba", area:"South", duration:"60-70 min", distance:"56 km", price:40, market:60, desc:"Private vehicle - Safari Blue departure", image:"airport-kizimkazi.jpg", imageData:"", imageDatas:[], active:true, cat:["South"] },
]

const FIXED_8_TOURS = [
  { id:"prison-nakupenda", name:"Prison Island + Nakupenda", cat:["Popular","Half Day"], price:250, market:350, duration:"5 Hours", pickup:"Stone Town 8:30 AM", desc:"Tortoise sanctuary + sandbank + fruit • Boat, Guide, Entrance", area:"West", active:true, image:"prison-nakupenda.jpg", imageDatas:[""], featured:true, imageData:"" },
  { id:"nakupenda-only", name:"Nakupenda Sandbank Only", cat:["Half Day","Popular"], price:130, market:200, duration:"4 Hours", pickup:"Stone Town 9 AM", desc:"White sandbank in ocean, swimming • Boat, Fruit, Water", area:"West", active:true, image:"nakupenda-only.jpg", imageDatas:[""], featured:true, imageData:"" },
  { id:"stone-town", name:"Stone Town Walking Tour", cat:["Popular","Half Day","Cultural"], price:120, market:180, duration:"3 Hours", pickup:"Stone Town", desc:"UNESCO, Slave Market, House of Wonders • Guide, Entrances", area:"West", active:true, image:"stone-town.jpg", imageDatas:[""], featured:true, imageData:"" },
  { id:"jozani", name:"Jozani Forest Monkeys", cat:["Popular","Half Day"], price:90, market:140, duration:"2.5 Hours", pickup:"Paje / Stone Town", desc:"Red colobus monkeys only in Zanzibar • Entrance, Guide", area:"South-Central", active:true, image:"jozani.jpg", imageDatas:[""], featured:true, imageData:"" },
  { id:"mnemba", name:"Mnemba Atoll Snorkeling", cat:["Popular","Half Day","North"], price:180, market:260, duration:"4 Hours", pickup:"Matemwe 8 AM", desc:"Best coral reef, colorful fish, dolphins • Boat, Gear", area:"North-East", active:true, image:"mnemba.jpg", imageDatas:[""], featured:true, imageData:"" },
  { id:"safari-blue", name:"Sharing Safari Blue Full Day BBQ", cat:["Full Day","Popular","South"], price:190, market:280, duration:"8 Hours", pickup:"Fumba 8 AM", desc:"Sandbank + snorkeling + seafood BBQ • Dhow, BBQ, Drinks", area:"South-West", active:true, image:"safari-blue.jpg", imageDatas:[""], featured:true, imageData:"" },
  { id:"dhow-stone", name:"Sunset Dhow Stone Town", cat:["Popular","Half Day"], price:80, market:130, duration:"2 Hours", pickup:"Stone Town 4:30 PM", desc:"Traditional dhow sunset cruise • Dhow, Drinks", area:"West", active:true, image:"dhow-stone.jpg", imageDatas:[""], featured:true, imageData:"" },
  { id:"private-safari-blue", name:"Private Safari Blue Full Day BBQ", cat:["Full Day","Popular","South"], price:220, market:320, duration:"8 Hours", pickup:"8:30 AM", desc:"Sandbank + snorkeling + seafood BBQ • Private dhow", area:"West", active:true, image:"private-safari-blue.jpg", imageDatas:[""], featured:true, imageData:"" },
]

const HOME_BLOGS = [
  { slug:"prison-island-nakupenda-guide", cat:"Guide", title:"Prison Island & Nakupenda: Complete Guide 2026", excerpt:"Giant tortoises 100+ years + white sandbank - best time, itinerary and private boat inclusions from Stone Town." },
  { slug:"mnemba-atoll-snorkeling-guide", cat:"Snorkeling", title:"Mnemba Atoll Snorkeling: Best Reef in Zanzibar", excerpt:"Why Mnemba is considered the best snorkeling spot, visibility, tropical fish and private boat from Matemwe." },
  { slug:"safari-blue-full-guide", cat:"Guide", title:"Safari Blue: Sandbank, Snorkeling & Seafood BBQ", excerpt:"Full day from Fumba to Kwale Island - sandbank, snorkeling, BBQ and mangrove lagoon with dhow sailing." },
  { slug:"zanzibar-airport-transfers-guide", cat:"Transfers", title:"Zanzibar Airport Transfers: Guide to All Areas 2026", excerpt:"How to get from Zanzibar Airport to Stone Town, Nungwi, Paje and Jambiani with private vehicle and meet & greet." },
  { slug:"stone-town-walking-guide", cat:"Cultural", title:"Stone Town Walking Tour: UNESCO Heritage", excerpt:"Freddie Mercury house, Old Fort, Slave Market Cathedral and Forodhani Gardens with licensed local guide." },
  { slug:"best-time-to-visit-zanzibar", cat:"Tips", title:"Best Time to Visit Zanzibar: Weather by Month", excerpt:"Dry season June to October, best months for Mnemba snorkeling, Safari Blue and Stone Town - month by month guide." },
]

const DEFAULT_REVIEWS = [
  { name:"Sarah M.", country:"UK • Jan 2026", text:"Our driver Ali was waiting with name sign. Car clean, AC cold, child seat was there. Prison Island + Nakupenda was perfectly timed.", rating:5, tour:"Prison + Nakupenda", verified:true },
  { name:"Jan L.", country:"Germany • Dec 2025", text:"We booked airport to Nungwi and Mnemba snorkeling. Transparent pricing, pay after trip worked great. North team knows the area.", rating:5, tour:"Airport + Mnemba", verified:true },
  { name:"Emily R.", country:"USA • Dec 2025", text:"Stone Town tour with Hassan was amazing. He is from Stone Town, knew every alley. No rush, very respectful.", rating:5, tour:"Stone Town Walking", verified:true },
]

export default function HomePage(){
  const [announcements, setAnnouncements] = useState(DEFAULT_ANNOUNCEMENTS)
  const [activeSlide, setActiveSlide] = useState(0)
  const [tours, setTours] = useState(FIXED_8_TOURS)
  const [transfers, setTransfers] = useState(REAL_10_TRANSFERS)
  const [filter, setFilter] = useState("Popular")
  const [selectedTours, setSelectedTours] = useState<any[]>([])
  const [selectedTransfers, setSelectedTransfers] = useState<any[]>([])
  const [waNumber, setWaNumber] = useState("255773628792")
  const [reviews, setReviews] = useState(DEFAULT_REVIEWS)
  const [blogs, setBlogs] = useState(HOME_BLOGS)
  const [lastSync, setLastSync] = useState("")

  const syncAll = async ()=>{
    const now = new Date().toLocaleTimeString()
    setLastSync(now)

    // 1. ANNOUNCEMENTS - DB FIRST
    try{
      const r = await fetch('/api/announcements',{cache:'no-store'})
      const data = await r.json()
      if(Array.isArray(data) && data.length>0){
        setAnnouncements(data.filter((a:any)=>a.active!==false).map((a:any)=>({
          id:a.id, badge:a.badge, title:a.title, subtitle:a.subtitle,
          cta:a.cta, link:a.link, active:a.active!==false,
          imageData:(a.image_urls?.[0]||a.imageData||"")
        })))
      } else {
        const rawA = localStorage.getItem("hero_announcements")
        if(rawA){ const p=JSON.parse(rawA); if(Array.isArray(p)&&p.length>0) setAnnouncements(p.filter((a:any)=>a.active!==false)) }
      }
    }catch{
      try{
        const rawA = localStorage.getItem("hero_announcements")
        if(rawA){ const p=JSON.parse(rawA); if(Array.isArray(p)&&p.length>0) setAnnouncements(p.filter((a:any)=>a.active!==false)) }
      }catch{}
    }

    // 2. TOURS - DB FIRST, 100% responsive to admin edits
    try{
      const r = await fetch('/api/tours',{cache:'no-store'})
      const data = await r.json()
      if(Array.isArray(data) && data.length>0){
        const mapped = data.filter((d:any)=>d.active!==false).map((d:any)=>{
          const urls = d.image_urls || d.images || []
          return {
            id:d.id, name:d.name||d.title,
            cat: Array.isArray(d.cat)? d.cat : d.category? [d.category] : ["Popular"],
            price: Number(d.price?? d.offer_price?? 0),
            market: Number(d.market_price?? d.market?? d.original_price?? 0),
            duration: d.duration || "3 Hours",
            pickup: d.pickup || "Stone Town",
            desc: d.description || d.desc || "",
            area: d.area || "Zanzibar",
            active: d.active!==false,
            featured:!!d.featured,
            imageData: urls[0]||d.imageData||"",
            imageDatas: urls,
            image: urls[0]||"",
            includes: d.includes||""
          }
        })
        setTours(mapped)
      }
    }catch{}

    // 3. TRANSFERS - DB FIRST, 100% responsive to admin edits
    try{
      const r = await fetch('/api/transfers',{cache:'no-store'})
      const data = await r.json()
      if(Array.isArray(data) && data.length>0){
        const mapped = data.filter((d:any)=>d.active!==false).map((d:any)=>{
          const urls = d.image_urls || d.images || []
          return {
            id:d.id, name:d.name||d.title,
            area: d.area || "West",
            duration: d.duration || "",
            distance: d.distance || "",
            price: Number(d.price?? d.offer_price?? 0),
            market: Number(d.market_price?? d.market?? d.original_price?? d.market_price?? 0),
            desc: d.description || d.desc || "",
            image: urls[0]||d.image||"",
            imageData: urls[0]||d.imageData||"",
            imageDatas: urls,
            active: d.active!==false,
            cat: Array.isArray(d.cat)? d.cat : d.category? [d.category] : ["Popular"]
          }
        })
        setTransfers(mapped)
      }
    }catch{}

    // 4. BLOGS - DB FIRST
    try{
      const r = await fetch('/api/blogs',{cache:'no-store'})
      const data = await r.json()
      if(Array.isArray(data)&&data.length>0) setBlogs(data.slice(0,6).map((b:any)=>({ slug:b.slug||b.id, cat:b.cat||b.category, title:b.title, excerpt:b.excerpt||b.desc||"" })))
      else {
        const rawB = localStorage.getItem("hero_blogs")
        if(rawB){ const p=JSON.parse(rawB); if(Array.isArray(p)&&p.length>0) setBlogs(p.slice(0,6).map((b:any)=>({ slug:b.slug, cat:b.cat, title:b.title, excerpt:b.excerpt||b.desc||"" }))) }
      }
    }catch{}

    // 5. REVIEWS - DB FIRST
    try{
      const r = await fetch('/api/reviews',{cache:'no-store'})
      const data = await r.json()
      if(Array.isArray(data)&&data.length>0) setReviews(data)
      else {
        const raw = localStorage.getItem("hero_reviews")
        if(raw){ const p=JSON.parse(raw); if(p.length>0) setReviews(p) }
      }
    }catch{
      try{
        const raw = localStorage.getItem("hero_reviews")
        if(raw){ const p=JSON.parse(raw); if(p.length>0) setReviews(p) }
      }catch{}
    }

    // 6. SETTINGS
    try{
      const r = await fetch('/api/settings',{cache:'no-store'})
      const data = await r.json()
      if(data?.whatsapp) setWaNumber(data.whatsapp)
      else {
        const rawS = localStorage.getItem("hero_settings")
        if(rawS){ const s=JSON.parse(rawS); if(s.whatsapp) setWaNumber(s.whatsapp) }
      }
    }catch{
      try{
        const rawS = localStorage.getItem("hero_settings")
        if(rawS){ const s=JSON.parse(rawS); if(s.whatsapp) setWaNumber(s.whatsapp) }
      }catch{}
    }
  }

  useEffect(()=>{
    syncAll()
    const ivSlide = setInterval(()=> setActiveSlide(s=> (s+1)%announcements.length), 6000)
    const ivSync = setInterval(syncAll, 10000)
    const onFocus = ()=> syncAll()
    window.addEventListener('focus', onFocus)
    window.addEventListener('storage', syncAll)
    return ()=>{ clearInterval(ivSlide); clearInterval(ivSync); window.removeEventListener('focus', onFocus); window.removeEventListener('storage', syncAll) }
  },[announcements.length])

  const filteredForDisplay = useMemo(()=>{
    if(filter==="Popular") return tours
    return tours.filter(t=> t.cat?.includes(filter))
  },[tours, filter])

  const toursToShow = filteredForDisplay.length>0? filteredForDisplay.slice(0,8) : tours.slice(0,8)
  const toursTotal = useMemo(()=> selectedTours.reduce((s,t)=> s + (t.price*(t.guests||1)),0),[selectedTours])
  const transfersTotal = useMemo(()=> selectedTransfers.reduce((s,t)=> s + (t.price*(t.guests||1)),0),[selectedTransfers])
  const grandTotal = toursTotal + transfersTotal
  const savings = useMemo(()=> [...selectedTours,...selectedTransfers].reduce((s,t:any)=> s + (((t.market||t.price)-t.price)*(t.guests||1)),0),[selectedTours, selectedTransfers])
  const activeAnn = announcements[activeSlide] || announcements[0]

  const toggleTour = (tour:any)=> setSelectedTours(prev=> prev.find(p=>p.id===tour.id)? prev.filter(p=>p.id!==tour.id) : [...prev, {...tour, guests:1}])
  const toggleTransfer = (tr:any)=> setSelectedTransfers(prev=> prev.find(p=>p.id===tr.id)? prev.filter(p=>p.id!==tr.id) : [...prev, {...tr, guests:1}])

  return (
    <main className="min-h-screen bg-[#F8FAFF]">
      <Header/>
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
              {lastSync && <span className="ml-3 text-[10px] text-[#0A2342]/30">Live • Synced {lastSync}</span>}
            </div>
          </div>
          <div className="h-[300px] md:h-[380px] bg-[#F8FAFF] rounded-[20px] border border-[#0A2342]/5 overflow-hidden shadow-sm">
            {activeAnn?.imageData? <img src={activeAnn.imageData} className="w-full h-full object-cover"/> : <div className="w-full h-full bg-gradient-to-br from-[#0A2342] to-[#2a5a8a] flex items-center justify-center"><p className="text-white/60 text-[13px] font-bold">Add image in Admin → Announcements</p></div>}
          </div>
        </div>
      </section>

      <section id="transfers" className="px-6 md:px-12 py-12 bg-white">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center max-w-[750px] mx-auto">
            <h2 className="font-black text-[#0A2342] text-[28px] md:text-[32px]">Zanzibar Airport Transfers - Private Vehicle</h2>
            <p className="text-[13.5px] md:text-[14px] text-[#0A2342]/65 mt-2 leading-relaxed font-medium">Private airport transfers from Zanzibar Airport to all hotels. Meet and greet, flight tracking, AC vehicle for your group, child seat free and pay after trip.</p>
          </div>
          <div className="mt-9 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {transfers.slice(0,8).map((tr:any)=>{
              const isSel = selectedTransfers.find(s=>s.id===tr.id)
              return (
              <div key={tr.id} className={`bg-white rounded-[18px] overflow-hidden shadow-sm border-2 transition flex flex-col ${isSel?'border-[#0A2342] shadow-lg':'border-[#0A2342]/5 hover:border-[#0A2342]/15 hover:shadow-md'}`}>
                <div className="h-[175px] bg-[#EAF2FF] relative overflow-hidden">
                  {tr.imageData? <img src={tr.imageData} className="w-full h-full object-cover"/> : <div className="w-full h-full bg-gradient-to-br from-[#0A2342] to-[#2a5a8a]" />}
                  <span className="absolute top-2.5 left-2.5 bg-[#0A2342] text-white text-[10px] px-3 py-1 rounded-full font-black tracking-wide">{tr.area} • {tr.duration}</span>
                  {tr.market>tr.price && <span className="absolute top-2.5 right-2.5 bg-[#16A34A] text-white text-[10px] px-2.5 py-1 rounded-full font-black shadow">Save ${tr.market-tr.price}</span>}
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <p className="font-black text-[15px] md:text-[16px] text-[#0A2342] leading-tight">{tr.name}</p>
                  <p className="text-[12.5px] md:text-[13px] text-[#0A2342]/60 mt-1.5 line-clamp-2 leading-relaxed font-medium">{tr.desc}</p>
                  <div className="mt-4 flex justify-between items-end mt-auto">
                    <div>
                      <p className="text-[13px] md:text-[14px] font-black text-[#DC2626] line-through decoration-2">${tr.market}</p>
                      <p className="font-black text-[22px] md:text-[24px] text-[#16A34A] leading-none mt-1">${tr.price} <span className="text-[11px] font-bold text-[#0A2342]/50">fixed for group</span></p>
                    </div>
                    <button onClick={()=>toggleTransfer(tr)} className={`px-5 py-2.5 rounded-full text-[12px] font-black transition shadow-sm ${isSel?'bg-[#0A2342] text-white':'bg-[#F8FAFF] border-2 border-[#0A2342]/10 text-[#0A2342] hover:bg-[#0A2342] hover:text-white hover:border-[#0A2342]'}`}>{isSel?'✓ Added':'Add +'}</button>
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
            <h2 className="font-black text-[#0A2342] text-[30px] md:text-[34px]">Private Zanzibar Tours - Build Your Itinerary</h2>
            <p className="text-[13.5px] md:text-[14px] text-[#0A2342]/65 mt-2 max-w-[650px] mx-auto leading-relaxed font-medium">Private tours for your group only with licensed guide, boat, entrance fees and hotel pickup included where listed. Transparent fixed pricing.</p>
            <div className="mt-6 inline-flex bg-white rounded-full p-1.5 gap-1 shadow-sm border border-[#0A2342]/10">
              {["Popular","Half Day","Full Day"].map(c=>(
                <button key={c} onClick={()=>setFilter(c)} className={`px-7 py-2.5 rounded-full text-[12px] font-black transition ${filter===c? "bg-[#0A2342] text-white shadow" : "text-[#0A2342]/60 hover:text-[#0A2342]"}`}>{c}</button>
              ))}
            </div>
          </div>

          <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {toursToShow.map((t:any)=>{
              const isSel = selectedTours.find(s=>s.id===t.id)
              return (
              <div key={t.id} className={`bg-white rounded-[18px] overflow-hidden shadow-sm hover:shadow-xl transition flex flex-col border-2 ${isSel?'border-[#0A2342] shadow-lg':'border-[#0A2342]/5 hover:border-[#0A2342]/10'}`}>
                <div className="h-[200px] bg-[#E6F5F3] relative overflow-hidden">
                  {t.imageData? <img src={t.imageData} alt={t.name} className="w-full h-full object-cover"/> : <div className="w-full h-full bg-gradient-to-br from-[#1eb3a5] to-[#0A2342]" />}
                  <span className="absolute top-2.5 left-2.5 bg-[#0A2342] text-white text-[10px] px-3 py-1 rounded-full font-black">{t.cat?.[0]} • {t.duration}</span>
                  <span className="absolute bottom-2.5 left-2.5 bg-white text-[#0A2342] text-[10px] px-3 py-1 rounded-full font-bold shadow">{t.area}</span>
                  {t.market>t.price && <span className="absolute top-2.5 right-2.5 bg-[#16A34A] text-white text-[10px] px-2.5 py-1 rounded-full font-black shadow">Save ${t.market-t.price}</span>}
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <p className="font-black text-[15px] md:text-[16px] leading-tight text-[#0A2342] min-h-[38px]">{t.name}</p>
                  <p className="text-[12.5px] md:text-[13px] text-[#0A2342]/60 mt-1.5 line-clamp-2 min-h-[38px] leading-relaxed font-medium">{t.desc}</p>
                  <div className="mt-4 flex justify-between items-end mt-auto">
                    <div>
                      <p className="text-[13px] md:text-[14px] font-black text-[#DC2626] line-through decoration-2">${t.market}</p>
                      <p className="font-black text-[22px] md:text-[24px] text-[#16A34A] leading-none mt-1">${t.price} <span className="text-[11px] font-bold text-[#0A2342]/50">fixed</span></p>
                    </div>
                    <button onClick={()=>toggleTour(t)} className={`px-5 py-2.5 rounded-full text-[12px] font-black transition shadow-sm ${isSel? "bg-[#0A2342] text-white" : "bg-[#F8FAFF] border-2 border-[#0A2342]/10 text-[#0A2342] hover:bg-[#0A2342] hover:text-white hover:border-[#0A2342]"}`}>{isSel? "✓ Added" : "Add +"}</button>
                  </div>
                </div>
              </div>
            )})}
          </div>

          <div className="mt-10 text-center">
            <Link href="/tours" className="inline-flex bg-[#0A2342] text-white px-9 py-3.5 rounded-full font-black text-[13px] hover:bg-black transition">View All Private Tours →</Link>
          </div>

          {(selectedTours.length>0 || selectedTransfers.length>0) && (
            <div className="mt-8 bg-white rounded-[20px] p-6 max-w-[1150px] mx-auto border-2 border-[#0A2342] shadow-2xl sticky bottom-4 z-30">
              <div className="flex justify-between items-center mb-3">
                <div>
                  <p className="font-black text-[16px] text-[#0A2342]">🛒 Your Selection - <span className="text-[#16A34A]">${grandTotal}</span> total • Save ${savings}</p>
                  <p className="text-[12px] text-[#0A2342]/60 font-medium">{selectedTours.length+selectedTransfers.length} items • Private for your group • Pay after trip</p>
                </div>
                <button onClick={()=>{setSelectedTours([]); setSelectedTransfers([])}} className="text-[12px] font-bold underline text-[#0A2342]/60">Clear</button>
              </div>
              <div className="flex gap-2 overflow-x-auto pb-2">
                {[...selectedTransfers,...selectedTours].map((t:any)=><span key={t.id} className="bg-[#F8FAFF] border border-[#0A2342]/10 px-3.5 py-1.5 rounded-full text-[11px] font-bold whitespace-nowrap">{t.name} ${t.price}</span>)}
              </div>
              <button onClick={()=>{
                const msg=`Jambo HERO!%0AMy Selection:%0A${selectedTransfers.map(t=>`• ${t.name} - $${t.price}`).join("%0A")}%0A${selectedTours.map(t=>`• ${t.name} - $${t.price}`).join("%0A")}%0ATotal $${grandTotal} (Save $${savings})%0AMy hotel is...`
                window.open(`https://wa.me/${waNumber}?text=${msg}`,"_blank")
              }} className="w-full mt-4 bg-[#0A2342] text-white py-4 rounded-full font-black text-[14px] hover:bg-black transition">Book on WhatsApp - ${grandTotal} total</button>
            </div>
          )}
        </div>
      </section>

      <section className="px-6 md:px-12 py-14 bg-white border-t border-[#0A2342]/5">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex justify-between items-end gap-4">
            <div>
              <span className="bg-[#0A2342] text-white text-[11px] px-3.5 py-1 rounded-full font-black tracking-widest">ZANZIBAR GUIDES • LOCAL TIPS</span>
              <h2 className="font-black text-[24px] md:text-[30px] text-[#0A2342] mt-3 leading-tight">Travel guides related to our tours & transfers</h2>
              <p className="text-[13.5px] text-[#0A2342]/65 mt-2 max-w-[650px] leading-relaxed font-medium">Local insights from our Stone Town team - best time, what is included, tide times and how to combine tours from your hotel area.</p>
            </div>
            <Link href="/blogs" className="hidden md:inline-block bg-white border-2 border-[#0A2342]/10 text-[#0A2342] px-6 py-3 rounded-full font-black text-[12px] hover:border-[#0A2342]/30 transition">View All Guides →</Link>
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
          <div className="text-center mt-8">
            <Link href="/blogs" className="inline-block bg-[#0A2342] text-white px-8 py-3.5 rounded-full font-black text-[13px] hover:bg-black transition">View All Zanzibar Guides →</Link>
          </div>
        </div>
      </section>

      <section id="reviews" className="px-6 md:px-12 py-14 bg-[#F8FAFF] border-t border-[#0A2342]/5">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between md:items-end gap-4">
            <div>
              <span className="bg-[#16A34A] text-white text-[11px] px-3.5 py-1 rounded-full font-black tracking-widest">REAL GUEST REVIEWS • VERIFIED</span>
              <h2 className="font-black text-[24px] md:text-[32px] text-[#0A2342] mt-3 leading-tight">What guests say after their private tours with HERO</h2>
              <p className="text-[13px] text-[#0A2342]/65 mt-2 max-w-[650px] font-medium">Real reviews from WhatsApp guests. Live sync from Admin and API.</p>
            </div>
            <div className="flex gap-2">
              <a href={`https://wa.me/${waNumber}?text=Hi HERO! I want to leave a review`} target="_blank" className="bg-white border-2 border-[#0A2342]/10 px-6 py-3 rounded-full text-[12px] font-black hover:border-[#0A2342]/30 transition">Leave Review</a>
              <a href="/about" className="hidden md:inline-block bg-[#0A2342] text-white px-6 py-3 rounded-full text-[12px] font-black">Why HERO →</a>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-8">
            {reviews.map((r:any,i)=>(
              <div key={i} className="bg-white border-2 border-[#0A2342]/5 rounded-[18px] p-6 shadow-sm hover:shadow-md transition">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-black text-[13px] text-[#0A2342] flex items-center gap-1.5">{r.name} {r.verified && <span className="bg-[#16A34A] text-white text-[8px] px-2 py-0.5 rounded-full font-black">✓ VERIFIED</span>}</p>
                    <p className="text-[11px] text-[#0A2342]/50 mt-1 font-medium">{r.country} • {r.tour}</p>
                  </div>
                  <p className="text-[14px]">{"⭐".repeat(r.rating)}</p>
                </div>
                <p className="text-[13.5px] text-[#0A2342]/75 mt-4 leading-relaxed font-medium">"{r.text}"</p>
                <p className="text-[11px] text-[#0A2342]/40 mt-3 font-bold">Private tour • Pay after trip • Local guide</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer/>
    </main>
  )
}