"use client"
import { useState, useEffect, useMemo } from "react"
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const DEFAULT_ANNOUNCEMENTS = [
  { id:1, badge:"🔥 NEW PROMOTION", title:"Book Direct & Save $100 per Car", subtitle:"Prison + Nakupenda $250 per CAR (not per person) - 5 Hours - Boat + Entrance + Fruit included", cta:"View Promotion", link:"#transfers", imageData:"", active:true },
  { id:2, badge:"⚡ LIMITED JANUARY", title:"Safari Blue Sharing - $190 per CAR Full Day BBQ", subtitle:"Sandbank + Snorkeling + Seafood BBQ + Dhow - All inclusive - Same car up to 6 pax same price", cta:"Build Your Itinerary", link:"#tours", imageData:"", active:true },
  { id:3, badge:"📢 ANNOUNCEMENT", title:"Free Cancellation 24h - Pay Driver After Each Trip", subtitle:"No prepayment. Pay after each trip. Local owner - 8 years in Zanzibar - WhatsApp booking in 2 minutes", cta:"Why Book With Us", link:"#why", imageData:"", active:true },
]

const DEFAULT_TRANSFERS = [
  { id:"airport-stone", name:"Airport → Stone Town", area:"West", duration:"15 min", price:25, market:40, desc:"Per CAR up to 6 pax - Taxi + driver - Pay after trip", image:"airport-stone.jpg", imageData:"", active:true, cat:["Popular"] },
  { id:"airport-paje", name:"Airport → Paje / Jambiani", area:"South-East", duration:"1h", price:40, market:60, desc:"Per CAR up to 6 pax - Most booked for kitesurf area", image:"airport-paje.jpg", imageData:"", active:true, cat:["Popular","South"] },
  { id:"airport-nungwi", name:"Airport → Nungwi / Kendwa", area:"North", duration:"1h 15m", price:40, market:60, desc:"Per CAR up to 6 pax - North beach, sunset best", image:"airport-nungwi.jpg", imageData:"", active:true, cat:["Popular","North"] },
  { id:"airport-matemwe", name:"Airport → Matemwe / Mnemba", area:"North-East", duration:"1h 20m", price:40, market:60, desc:"Per CAR up to 6 pax - Mnemba area", image:"airport-matemwe.jpg", imageData:"", active:true, cat:["North"] },
  { id:"stone-paje", name:"Stone Town → Paje", area:"South-East", duration:"1h", price:40, market:60, desc:"Per CAR - Transfer after Stone Town tour", image:"stone-paje.jpg", imageData:"", active:true, cat:["South"] },
  { id:"paje-nungwi", name:"Paje → Nungwi", area:"North", duration:"1h 30m", price:50, market:70, desc:"Per CAR - East to North crossing", image:"paje-nungwi.jpg", imageData:"", active:true, cat:["Popular"] },
  { id:"airport-jambiani", name:"Airport → Jambiani / Makunduchi", area:"South", duration:"1h 10m", price:40, market:60, desc:"Per CAR up to 6 pax", image:"airport-jambiani.jpg", imageData:"", active:true, cat:["South"] },
  { id:"airport-kiwengwa", name:"Airport → Kiwengwa / Pongwe", area:"East", duration:"1h", price:35, market:55, desc:"Per CAR - East coast", image:"airport-kiwengwa.jpg", imageData:"", active:true, cat:["East"] },
]

const DEFAULT_TOURS = [
  { id:"prison-nakupenda", name:"Prison Island + Nakupenda", cat:["Popular","Half Day"], price:250, market:350, duration:"5 Hours", pickup:"Stone Town 8:30 AM", desc:"Tortoise sanctuary + sandbank + fruit • Boat, Guide, Entrance, Fruit, Water", area:"West", active:true, image:"prison-nakupenda.jpg", featured:true, imageData:"" },
  { id:"nakupenda-only", name:"Nakupenda Sandbank Only", cat:["Half Day","Popular"], price:130, market:200, duration:"4 Hours", pickup:"Stone Town 9 AM", desc:"White sandbank in ocean, swimming • Boat, Fruit, Water", area:"West", active:true, image:"nakupenda-only.jpg", featured:true, imageData:"" },
  { id:"stone-town", name:"Stone Town Walking Tour", cat:["Popular","Half Day","Cultural"], price:120, market:180, duration:"3 Hours", pickup:"Stone Town", desc:"UNESCO, Slave Market, House of Wonders • Guide, Entrances", area:"West", active:true, image:"stone-town.jpg", featured:true, imageData:"" },
  { id:"jozani", name:"Jozani Forest Monkeys", cat:["Popular","Half Day"], price:90, market:140, duration:"2.5 Hours", pickup:"Paje / Stone Town", desc:"Red colobus monkeys only in Zanzibar • Entrance, Guide", area:"South-Central", active:true, image:"jozani.jpg", featured:true, imageData:"" },
  { id:"mnemba", name:"Mnemba Atoll Snorkeling", cat:["Popular","Half Day","North"], price:180, market:260, duration:"4 Hours", pickup:"Matemwe 8 AM", desc:"Best coral reef, colorful fish, dolphins • Boat, Gear, Guide", area:"North-East", active:true, image:"mnemba.jpg", featured:true, imageData:"" },
  { id:"safari-blue", name:"Sharing Safari Blue Full Day BBQ", cat:["Full Day","Popular","South"], price:190, market:280, duration:"8 Hours", pickup:"Fumba 8 AM", desc:"Sandbank + snorkeling + seafood BBQ • Dhow, BBQ, Drinks, Gear", area:"South-West", active:true, image:"safari-blue.jpg", featured:true, imageData:"" },
  { id:"dhow-stone", name:"Sunset Dhow Stone Town", cat:["Popular","Half Day"], price:80, market:130, duration:"2 Hours", pickup:"Stone Town 4:30 PM", desc:"Traditional dhow sunset cruise • Dhow, Drinks", area:"West", active:true, image:"dhow-stone.jpg", featured:false, imageData:"" },
  { id:"private-safari-blue", name:"Private Safari Blue Full Day BBQ", cat:["Full Day","Popular","South"], price:220, market:320, duration:"8 Hours", pickup:"8:30 AM", desc:"Sandbank + snorkeling + seafood BBQ • Private dhow", area:"West", active:true, image:"private-safari-blue.jpg", featured:true, imageData:"" },
]

const DEFAULT_BLOGS = [
  { id:"prison-island-guide", title:"Prison Island & Nakupenda: Complete Guide 2026", excerpt:"How to visit giant tortoises 100+ years old + best time for sandbank white sand. Price per CAR explained.", date:"Jan 12, 2026", cat:"Guide", image:"", slug:"prison-island-guide" },
  { id:"mnemba-vs-safari-blue", title:"Mnemba Atoll vs Safari Blue - Which is Better?", excerpt:"Snorkeling comparison, coral reef quality, dolphin chance, BBQ vs fruit. Both per CAR same price up to 6 pax.", date:"Jan 8, 2026", cat:"Comparison", image:"", slug:"mnemba-vs-safari-blue" },
  { id:"zanzibar-transfers", title:"Zanzibar Transfers: Airport to Paje, Nungwi Price per Car", excerpt:"No per person scam. Real per vehicle price $15-$40 local. Map distance + how we calculate.", date:"Jan 3, 2026", cat:"Transfers", image:"", slug:"zanzibar-transfers" },
]

export default function HomePage(){
  const [announcements, setAnnouncements] = useState(DEFAULT_ANNOUNCEMENTS)
  const [activeSlide, setActiveSlide] = useState(0)
  const [tours, setTours] = useState(DEFAULT_TOURS)
  const [transfers, setTransfers] = useState(DEFAULT_TRANSFERS)
  const [filter, setFilter] = useState("All")
  const [selectedTours, setSelectedTours] = useState<string[]>([])
  const [selectedTransfers, setSelectedTransfers] = useState<string[]>([])
  const [waNumber, setWaNumber] = useState("255773628792")
  const [from, setFrom] = useState("Abeid Airport (ZNZ)")
  const [to, setTo] = useState("Stone Town")
  const [date, setDate] = useState("")
  const [guests, setGuests] = useState("2 Guests")
  const [reviewTab, setReviewTab] = useState("google")

  useEffect(()=>{
    try{
      const a = localStorage.getItem("hero_announcements"); if(a) setAnnouncements(JSON.parse(a))
      const t = localStorage.getItem("hero_tours"); if(t){ const p=JSON.parse(t); if(p.length>0) setTours(p) }
      const tr = localStorage.getItem("hero_transfers"); if(tr){ const p=JSON.parse(tr); if(p.length>0) setTransfers(p) }
      const w = localStorage.getItem("hero_wa"); if(w) setWaNumber(w)
    }catch{}
    const iv = setInterval(()=> setActiveSlide(s=> (s+1)%announcements.length), 6000)
    return ()=> clearInterval(iv)
  },[])

  const filteredTours = filter==="All"? tours.filter(t=>t.active) : tours.filter(t=>t.active && t.cat.includes(filter))
  const filteredTransfers = filter==="All"? transfers.filter(t=>t.active) : transfers.filter(t=>t.active && (t.cat?.includes(filter) || t.area===filter))
  const toursTotal = useMemo(()=> selectedTours.reduce((s,id)=> s + (tours.find(t=>t.id===id)?.price||0),0),[selectedTours, tours])
  const transfersTotal = useMemo(()=> selectedTransfers.reduce((s,id)=> s + (transfers.find(t=>t.id===id)?.price||0),0),[selectedTransfers, transfers])
  const activeAnn = announcements[activeSlide] || announcements[0]

  return (
    <main className="min-h-screen bg-[#F8FAFF]">
      <Header/>

      {/* HERO - NOW BRIGHTER - WHITE/ LIGHT BLUE WITH COMPANY COLORS */}
      <section className="relative bg-white text-[#0A2342] overflow-hidden border-b">
        <div className="absolute inset-0 bg-gradient-to-br from-[#FFF6E8] via-white to-[#EAF2FF]" />
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#FF8A1A]/10 rounded-full blur-3xl" />
        <div className="relative max-w-[1400px] mx-auto px-6 md:px-12 py-10 md:py-14 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <span className="inline-block bg-[#0A2342] text-white text-[10px] font-black px-3 py-1 rounded-full">{activeAnn?.badge}</span>
            <h1 className="mt-4 font-black text-[28px] md:text-[38px] leading-[1.1] text-[#0A2342]">{activeAnn?.title}</h1>
            <p className="mt-3 text-[13px] text-[#0A2342]/70 leading-relaxed">{activeAnn?.subtitle}</p>
            <div className="mt-6 flex gap-3">
              <a href={activeAnn?.link} className="bg-[#0A2342] text-white px-6 py-3 rounded-full font-black text-[12px] hover:bg-black transition">{activeAnn?.cta}</a>
              <a href={`https://wa.me/${waNumber}`} target="_blank" className="bg-[#25D366] text-white px-6 py-3 rounded-full font-black text-[12px]">WhatsApp Us</a>
            </div>
            <div className="mt-6 flex gap-2">
              {announcements.map((_,i)=><button key={i} onClick={()=>setActiveSlide(i)} className={`h-1.5 rounded-full transition-all ${i===activeSlide? "w-8 bg-[#0A2342]" : "w-4 bg-[#0A2342]/20"}`} />)}
            </div>
          </div>
          <div className="h-[260px] md:h-[340px] bg-[#F8FAFF] rounded-[20px] border border-[#0A2342]/10 overflow-hidden flex items-center justify-center shadow-sm">
            {activeAnn?.imageData? <img src={activeAnn.imageData} className="w-full h-full object-cover"/> : <div className="text-center p-6"><p className="text-[11px] text-[#0A2342]/40">Promotion image from Admin → Content → Hero Image</p><p className="font-black text-[14px] mt-2 text-[#0A2342]">Hero where all announcements and new promotions will be placed</p><span className="inline-block mt-3 bg-[#FF8A1A] text-white text-[10px] px-3 py-1 rounded-full">Company colors kept • Brighter</span></div>}
          </div>
        </div>
      </section>

      {/* TRANSFER BAR - WHITE FLOATING */}
      <section className="bg-[#F0F6FF] px-4 py-4">
        <div className="max-w-[850px] mx-auto bg-white rounded-[16px] p-2.5 flex flex-wrap md:flex-nowrap gap-2 items-center shadow-md border border-[#0A2342]/5">
          <select value={from} onChange={e=>setFrom(e.target.value)} className="flex-1 bg-[#F8FAFF] rounded-full px-4 py-2.5 text-[11px] font-bold border border-[#0A2342]/10"><option>Abeid Airport (ZNZ)</option><option>Stone Town</option><option>Paje</option><option>Nungwi</option><option>Matemwe</option></select>
          <select value={to} onChange={e=>setTo(e.target.value)} className="flex-1 bg-[#F8FAFF] rounded-full px-4 py-2.5 text-[11px] font-bold border border-[#0A2342]/10"><option>Stone Town</option><option>Paje / Jambiani</option><option>Nungwi / Kendwa</option><option>Matemwe</option><option>Kiwengwa</option></select>
          <input type="date" value={date} onChange={e=>setDate(e.target.value)} className="flex-1 bg-[#F8FAFF] rounded-full px-4 py-2.5 text-[11px] font-bold border border-[#0A2342]/10"/>
          <select value={guests} onChange={e=>setGuests(e.target.value)} className="flex-1 bg-[#F8FAFF] rounded-full px-4 py-2.5 text-[11px] font-bold border border-[#0A2342]/10"><option>2 Guests</option><option>6 Guests - Same CAR Price</option></select>
          <button onClick={()=>{ const msg=`Hi HERO! Transfer:%0AFrom: ${from}%0ATo: ${to}%0ADate: ${date}%0AGuests: ${guests}%0APrice is per CAR`; window.open(`https://wa.me/${waNumber}?text=${msg}`,"_blank")}} className="bg-[#FF8A1A] text-white px-6 py-2.5 rounded-full font-black text-[11px] shadow">Book Transfer</button>
        </div>
      </section>

      {/* TRANSFERS - WHITE BG BRIGHT */}
      <section id="transfers" className="px-6 md:px-12 py-10 bg-white">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center">
            <span className="bg-[#0A2342] text-white text-[9px] font-black px-3 py-1 rounded-full">TRANSFERS • PER CAR NOT PER PERSON • PAY AFTER TRIP</span>
            <h2 className="mt-4 font-black text-[#0A2342] text-[26px] md:text-[30px]">Zanzibar Transfers - Price per CAR<br/><span className="text-[#FF8A1A]">Same Car up to 6 Pax Same Price</span></h2>
            <p className="mt-3 text-[#0A2342]/60 text-[11px] max-w-[700px] mx-auto">All transfers are per vehicle (CAR) not per person. $25-$50 per CAR. Select transfers first, then add tours below. Combo booking saves more.</p>
            <div className="mt-6 inline-flex bg-[#F0F6FF] rounded-full p-1 gap-1 border border-[#0A2342]/5">
              {["Popular","North","South","East","West"].map(c=>(
                <button key={c} onClick={()=>setFilter(c)} className={`px-5 py-2 rounded-full text-[11px] font-black transition ${filter===c? "bg-[#0A2342] text-white shadow" : "text-[#0A2342]/60 hover:text-[#0A2342]"}`}>{c}</button>
              ))}
              <button onClick={()=>setFilter("All")} className={`px-5 py-2 rounded-full text-[11px] font-black ${filter==="All"? "bg-[#0A2342] text-white shadow" : "text-[#0A2342]/60"}`}>All</button>
            </div>
          </div>

          <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {filteredTransfers.slice(0,8).map((tr:any)=>(
              <div key={tr.id} className="bg-white rounded-[16px] overflow-hidden shadow-sm hover:shadow-lg transition flex flex-col border border-[#0A2342]/5">
                <div className="h-[160px] bg-[#EAF2FF] relative">
                  {tr.imageData? <img src={tr.imageData} alt={tr.name} className="w-full h-full object-cover"/> : <div className="w-full h-full bg-gradient-to-br from-[#0A2342] to-[#2a5a8a] flex items-center justify-center text-white/40 text-[10px]">{tr.image}</div>}
                  <span className="absolute top-2 left-2 bg-[#0A2342] text-white text-[8px] px-2 py-1 rounded-full font-black">🚕 {tr.area}</span>
                  <span className="absolute bottom-2 left-2 bg-white text-[#0A2342] text-[9px] px-2 py-1 rounded-full font-bold shadow">{tr.duration}</span>
                  <span className="absolute bottom-2 right-2 bg-[#FF8A1A] text-white w-5 h-5 flex items-center justify-center rounded-full text-[10px] font-black">$</span>
                </div>
                <div className="p-3 flex flex-col flex-1">
                  <p className="font-black text-[12px] leading-tight text-[#0A2342]">{tr.name}</p>
                  <p className="text-[10px] text-[#0A2342]/50 mt-1">{tr.desc}</p>
                  <div className="mt-3 flex justify-between items-end mt-auto">
                    <div>
                      <p className="text-[9px] line-through text-red-400">${tr.market} market</p>
                      <p className="font-black text-[14px] text-[#0A2342]">${tr.price} <span className="text-[9px] font-medium opacity-60">per car</span></p>
                      <p className="text-[8px] font-bold text-green-600">Save ${tr.market - tr.price} per CAR</p>
                    </div>
                    <button onClick={()=> setSelectedTransfers(p=> p.includes(tr.id)? p.filter(x=>x!==tr.id) : [...p, tr.id])} className={`px-4 py-2 rounded-full text-[10px] font-black transition ${selectedTransfers.includes(tr.id)? "bg-green-600 text-white" : "bg-[#0A2342] text-white hover:bg-black"}`}>{selectedTransfers.includes(tr.id)? "✓ Added" : "Add +"}</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TOURS - LIGHT BLUE BG - BRIGHTER */}
      <section id="tours" className="px-6 md:px-12 py-10 bg-[#F0F6FF]">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center">
            <span className="bg-[#FF8A1A] text-white text-[9px] font-black px-3 py-1 rounded-full">TOURS + COMBO + BUILD YOUR OWN</span>
            <h2 className="mt-4 font-black text-[#0A2342] text-[26px] md:text-[32px] leading-tight">Add Tours to Your Transfer<br/><span className="text-[#0A2342]">Build Your Own Itinerary - <span className="text-[#FF8A1A]">Save More</span></span></h2>
            <p className="mt-3 text-[#0A2342]/60 text-[11px] max-w-[700px] mx-auto">Select tours, add to transfer, book combo on WhatsApp in 2 minutes. Pay driver after each trip. Free cancellation 24h. Prices FOR CAR - same CAR up to 6 pax same price.</p>
            <div className="mt-6 inline-flex bg-white rounded-full p-1 gap-1 shadow-sm border">
              {["Popular","Half Day","Full Day"].map(c=>(
                <button key={c} onClick={()=>setFilter(c)} className={`px-5 py-2 rounded-full text-[11px] font-black ${filter===c? "bg-[#0A2342] text-white" : "text-[#0A2342]/60"}`}>{c}</button>
              ))}
            </div>
          </div>

          <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {filteredTours.slice(0,8).map((t:any)=>(
              <div key={t.id} className="bg-white rounded-[16px] overflow-hidden shadow-sm hover:shadow-lg transition flex flex-col border border-[#0A2342]/5">
                <div className="h-[180px] bg-[#E6F5F3] relative">
                  {t.imageData? <img src={t.imageData} alt={t.name} className="w-full h-full object-cover"/> : <div className="w-full h-full bg-gradient-to-br from-[#1eb3a5] to-[#0A2342] flex items-center justify-center text-white/60 text-[10px]">{t.image}</div>}
                  <span className="absolute top-2 left-2 bg-[#0A2342] text-white text-[8px] px-2 py-1 rounded-full font-black">{t.cat[0]}</span>
                  <span className="absolute top-2 right-2 bg-white text-[#0A2342] text-[8px] px-2 py-1 rounded-full font-black shadow">{t.area}</span>
                  <span className="absolute bottom-2 left-2 bg-white text-[#0A2342] text-[9px] px-2 py-1 rounded-full font-bold shadow">{t.duration}</span>
                  <span className="absolute bottom-2 right-2 bg-[#FF8A1A] text-white w-5 h-5 flex items-center justify-center rounded-full text-[10px] font-black">$</span>
                </div>
                <div className="p-3 flex flex-col flex-1">
                  <p className="font-black text-[12px] leading-tight text-[#0A2342]">{t.name}</p>
                  <p className="text-[10px] text-[#0A2342]/50 mt-1 line-clamp-2">{t.desc}</p>
                  <div className="mt-3 flex justify-between items-end mt-auto">
                    <div>
                      <p className="text-[9px] line-through text-red-400">${t.market} market</p>
                      <p className="font-black text-[14px] text-[#0A2342]">${t.price} <span className="text-[9px] font-medium opacity-60">per car</span></p>
                      <p className="text-[8px] font-bold text-green-600">Save ${t.market - t.price} - per CAR</p>
                    </div>
                    <button onClick={()=> setSelectedTours(p=> p.includes(t.id)? p.filter(x=>x!==t.id) : [...p, t.id])} className={`px-4 py-2 rounded-full text-[10px] font-black ${selectedTours.includes(t.id)? "bg-green-600 text-white" : "bg-[#0A2342] text-white hover:bg-black"}`}>{selectedTours.includes(t.id)? "✓ Added" : "Add +"}</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {(selectedTours.length>0 || selectedTransfers.length>0) && (
            <div className="mt-8 bg-white rounded-[16px] p-5 max-w-[900px] mx-auto border shadow-xl sticky bottom-4 z-20">
              <div className="flex justify-between items-center">
                <p className="font-black text-[13px] text-[#0A2342]">🛒 {selectedTransfers.length} Transfers + {selectedTours.length} Tours - Price PER CAR</p>
                <p className="font-black text-[18px] text-[#0A2342]">${transfersTotal + toursTotal} per car</p>
              </div>
              <div className="mt-3 flex flex-wrap gap-2 text-[11px]">
                {selectedTransfers.map(id=>{ const tr=transfers.find(x=>x.id===id); return <span key={id} className="bg-[#EAF2FF] px-3 py-1 rounded-full font-bold text-[#0A2342]">🚕 {tr?.name} ${tr?.price} <button onClick={()=>setSelectedTransfers(p=>p.filter(x=>x!==id))} className="ml-1 text-red-500">×</button></span>})}
                {selectedTours.map(id=>{ const t=tours.find(x=>x.id===id); return <span key={id} className="bg-[#FFF3E0] px-3 py-1 rounded-full font-bold text-[#0A2342]">🏝️ {t?.name} ${t?.price} <button onClick={()=>setSelectedTours(p=>p.filter(x=>x!==id))} className="ml-1 text-red-500">×</button></span>})}
              </div>
              <button onClick={()=>{
                const trList=selectedTransfers.map(id=>{ const tt=transfers.find(x=>x.id===id); return `${tt?.name} $${tt?.price} per CAR`}).join("%0A")
                const tList=selectedTours.map(id=>{ const tt=tours.find(x=>x.id===id); return `${tt?.name} $${tt?.price} per CAR`}).join("%0A")
                const msg=`Hi HERO! Combo Booking PER CAR:%0A%0ATransfers:%0A${trList}%0A%0ATours:%0A${tList}%0A%0ATransfer Total: $${transfersTotal} per CAR%0ATours Total: $${toursTotal} per CAR%0AGrand Total: $${transfersTotal+toursTotal} per CAR (up to 6 pax same car)%0A%0APay driver after each trip`
                window.open(`https://wa.me/${waNumber}?text=${msg}`,"_blank")
              }} className="mt-4 w-full bg-[#0A2342] text-white py-3 rounded-full font-black text-[12px]">Book Combo ({selectedTransfers.length} Transfers + {selectedTours.length} Tours) - ${transfersTotal+toursTotal} per CAR on WhatsApp</button>
            </div>
          )}
        </div>
      </section>

      <section id="why" className="bg-white px-6 md:px-12 py-12 border-y border-[#0A2342]/5">
        <div className="max-w-[1200px] mx-auto grid md:grid-cols-3 gap-6">
          <div className="bg-[#F8FAFF] rounded-[16px] p-6 border border-[#0A2342]/5"><p className="text-[20px]">🚐</p><h3 className="font-black text-[14px] mt-2 text-[#0A2342]">Price Per CAR - Not Per Person</h3><p className="text-[11px] text-[#0A2342]/60 mt-2">Other agencies charge $60 x 4 pax = $240. We charge $250 per CAR up to 6 pax same price. Transparent.</p><a href="/tours" className="inline-block mt-3 text-[11px] font-black text-[#0A2342] border-b">See All Tours →</a></div>
          <div className="bg-[#FFF8ED] rounded-[16px] p-6 border border-[#FF8A1A]/20"><p className="text-[20px]">💳</p><h3 className="font-black text-[14px] mt-2 text-[#0A2342]">Pay After Each Trip</h3><p className="text-[11px] text-[#0A2342]/60 mt-2">No prepayment. Pay driver after each trip. Free cancellation 24h. Build your own itinerary.</p><a href="/transfers" className="inline-block mt-3 text-[11px] font-black text-[#0A2342] border-b">Transfers per Car →</a></div>
          <div className="bg-[#F8FAFF] rounded-[16px] p-6 border border-[#0A2342]/5"><p className="text-[20px]">📍</p><h3 className="font-black text-[14px] mt-2 text-[#0A2342]">Local Owner - 8 Years</h3><p className="text-[11px] text-[#0A2342]/60 mt-2">We are local, not middleman agency. Direct boat owners, direct guides. Best price guaranteed.</p><a href="/blogs" className="inline-block mt-3 text-[11px] font-black text-[#0A2342] border-b">Read Guides →</a></div>
        </div>
      </section>

      <section className="bg-[#F8FAFF] px-6 md:px-12 py-12">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex justify-between items-end"><div><h2 className="font-black text-[22px] text-[#0A2342]">Latest Guides & Tips</h2><p className="text-[11px] text-[#0A2342]/50 mt-1">Informative content leading you to more information - price per CAR, best time, maps</p></div><a href="/blogs" className="text-[11px] font-black bg-[#0A2342] text-white px-4 py-2 rounded-full">View All Blogs →</a></div>
          <div className="mt-6 grid md:grid-cols-3 gap-5">
            {DEFAULT_BLOGS.map(b=>(
              <div key={b.id} className="bg-white rounded-[14px] overflow-hidden border border-[#0A2342]/5 shadow-sm">
                <div className="h-[140px] bg-[#EAF2FF] flex items-center justify-center text-[10px] text-[#0A2342]/30">{b.title.slice(0,25)}</div>
                <div className="p-4"><span className="text-[9px] font-black bg-[#0A2342] text-white px-2 py-1 rounded-full">{b.cat}</span><h3 className="font-black text-[13px] mt-2 leading-tight text-[#0A2342]">{b.title}</h3><p className="text-[11px] text-[#0A2342]/60 mt-2 line-clamp-2">{b.excerpt}</p><div className="mt-3 flex justify-between items-center"><span className="text-[10px] text-[#0A2342]/30">{b.date}</span><a href={`/blogs/${b.slug}`} className="text-[11px] font-black text-[#0A2342]">Read →</a></div></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-6 md:px-12 py-12 border-t border-[#0A2342]/5">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center"><h2 className="font-black text-[22px] text-[#0A2342]">Real Reviews - Straight from Google & TripAdvisor</h2><p className="text-[11px] text-[#0A2342]/50 mt-2">Not fake reviews - Live widget pulls directly from Google and TripAdvisor - Cannot edit</p><div className="mt-4 inline-flex bg-[#F0F6FF] rounded-full p-1 border"><button onClick={()=>setReviewTab("google")} className={`px-5 py-2 rounded-full text-[11px] font-black ${reviewTab==="google"? "bg-[#0A2342] text-white" : "text-[#0A2342]"}`}>⭐ Google</button><button onClick={()=>setReviewTab("tripadvisor")} className={`px-5 py-2 rounded-full text-[11px] font-black ${reviewTab==="tripadvisor"? "bg-[#0A2342] text-white" : "text-[#0A2342]"}`}>🦉 TripAdvisor</button></div></div>
          <div className="mt-8 bg-[#F8FAFF] rounded-[16px] border border-[#0A2342]/5 p-6 min-h-[200px]">
            {reviewTab==="google"? <div className="bg-white rounded-[12px] p-4 border text-[11px]"><p className="font-black text-[#0A2342]">Google Reviews Widget - Paste embed in Admin → Settings → googleReviewsEmbed</p><p className="text-[#0A2342]/60 mt-2">Live reviews from Google Business. 4.9 ⭐ (127 reviews)</p></div> : <div className="bg-white rounded-[12px] p-4 border text-[11px]"><p className="font-black text-[#0A2342]">TripAdvisor Reviews Widget - Paste embed in Admin → Settings → tripadvisorEmbed</p><p className="text-[#0A2342]/60 mt-2">Live reviews from TripAdvisor. 5.0 ●●●●● (89 reviews)</p></div>}
          </div>
        </div>
      </section>

      <Footer/>
    </main>
  )
}
