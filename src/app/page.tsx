"use client"
import { useState, useEffect } from "react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"

export default function Home(){
  const [from, setFrom] = useState("Abeid Airport (ZNZ)")
  const [to, setTo] = useState("Stone Town")
  const [date, setDate] = useState("")
  const [pax, setPax] = useState("2 Guests")
  const [paxCount, setPaxCount] = useState(2)
  const [tab, setTab] = useState("All")
  const [tourTab, setTourTab] = useState("Popular")
  const [openFaq, setOpenFaq] = useState<number | null>(0)
  const [selectedTours, setSelectedTours] = useState<string[]>([])
  const [name, setName] = useState("")
  const [sloganIndex, setSloganIndex] = useState(0)
  const [showAllReviews, setShowAllReviews] = useState(false)

  const slogans = [
    { main:"Zanzibar Airport Transfers From $15", sub:"Your HERO in Zanzibar." },
    { main:"Fixed Price. No Surprises.", sub:"We Show Up When Others Don't." },
    { main:"Landing Tired? We Are Already Waiting.", sub:"At Arrivals With Your Name." },
    { main:"Honest Prices. Local Drivers.", sub:"Human Service, Every Time." },
    { main:"From Airport to Any Beach — $15 to $40", sub:"Same Price Day & Night." },
    { main:"No Bargaining. No Stress.", sub:"Your Ride is Ready." },
    { main:"Pay Driver Directly. Cancel Free 24h.", sub:"Book on WhatsApp in 2 Minutes." },
  ]

  useEffect(()=>{
    const id = setInterval(()=> setSloganIndex(s=> (s+1)%slogans.length), 5000)
    return ()=> clearInterval(id)
  },[])

  const handlePaxChange = (val:string) => {
    setPax(val)
    const num = parseInt(val)
    if(!isNaN(num)) setPaxCount(num)
    else if(val.includes("2")) setPaxCount(2)
    else if(val.includes("1")) setPaxCount(1)
    else if(val.includes("3")) setPaxCount(3)
    else if(val.includes("4")) setPaxCount(4)
  }

  const todayStr = new Date().toISOString().split('T')[0]

  const pricing = [
    { route:"Airport to Stone Town", short:"Stone Town", time:"15 min", pax:"4 Pax", price:15, type:"Stone Town", area:"West", popular:true, img:"/hero.jpg" },
    { route:"Airport to Chuwini / Bububu", short:"Chuwini", time:"25 min", pax:"4 Pax", price:25, type:"Stone Town", area:"West", popular:false, img:"/hero.jpg" },
    { route:"Airport to Nungwi / Kendwa", short:"Nungwi / Kendwa", time:"70 min", pax:"4 Pax", price:40, type:"North", area:"North", popular:true, img:"/hero.jpg" },
    { route:"Airport to Matemwe", short:"Matemwe", time:"65 min", pax:"4 Pax", price:40, type:"North", area:"North", popular:true, img:"/hero.jpg" },
    { route:"Airport to Pwani Mchangani", short:"Pwani Mchangani", time:"60 min", pax:"4 Pax", price:35, type:"East", area:"East", popular:false, img:"/hero.jpg" },
    { route:"Airport to Kiwengwa / Pongwe / Pingwe", short:"Kiwengwa", time:"55 min", pax:"4 Pax", price:35, type:"East", area:"East", popular:false, img:"/hero.jpg" },
    { route:"Airport to Uroa / Marumbi / Michamvi", short:"Uroa", time:"50 min", pax:"4 Pax", price:35, type:"East", area:"East", popular:false, img:"/hero.jpg" },
    { route:"Airport to Paje / Bwejuu", short:"Paje / Bwejuu", time:"55 min", pax:"4 Pax", price:35, type:"South", area:"South", popular:true, img:"/hero.jpg" },
    { route:"Airport to Jambiani / Makunduchi", short:"Jambiani", time:"60 min", pax:"4 Pax", price:40, type:"South", area:"South", popular:false, img:"/hero.jpg" },
    { route:"Airport to Kizimkazi", short:"Kizimkazi", time:"65 min", pax:"4 Pax", price:40, type:"South", area:"South", popular:false, img:"/hero.jpg" },
  ]

  const tours = [
    { id:"prison", name:"Prison Island + Nakupenda", desc:"Boat + Tortoises + Sandbank", price:55, duration:"Half Day", tag:"Popular", img:"/hero.jpg" },
    { id:"stone", name:"Stone Town Walking Tour", desc:"UNESCO + Slave Market", price:25, duration:"3 Hours", tag:"Popular", img:"/hero.jpg" },
    { id:"spice", name:"Spice Farm Tour", desc:"Taste + Farm Visit", price:22, duration:"3 Hours", tag:"Half Day", img:"/hero.jpg" },
    { id:"mnemba", name:"Mnemba Snorkeling", desc:"Dolphin + Reef", price:45, duration:"Half Day", tag:"Popular", img:"/hero.jpg" },
    { id:"safari", name:"Safari Blue", desc:"Sandbank + Seafood BBQ", price:85, duration:"Full Day", tag:"Full Day", img:"/hero.jpg" },
    { id:"jozani", name:"Jozani Forest + Salaam Cave", desc:"Red Monkeys + Turtles", price:38, duration:"4 Hours", tag:"Half Day", img:"/hero.jpg" },
    { id:"dhow", name:"Sunset Dhow Cruise", desc:"Stone Town Sunset", price:35, duration:"2 Hours", tag:"Popular", img:"/hero.jpg" },
    { id:"dolphin", name:"Kizimkazi Dolphin Tour", desc:"Early morning boat", price:40, duration:"Half Day", tag:"Full Day", img:"/hero.jpg" },
  ]

  const reviews: any[] = []
  const visibleReviews = showAllReviews? reviews : reviews.slice(0,3)
  const tripAdvisorWriteUrl = "https://www.tripadvisor.com/UserReviewEdit-g4824815-d28064273-a_writereview.jsp"

  const faqs = [
    { q:"What if my flight is delayed?", a:"Share flight number on WhatsApp +255773628792. We monitor and adjust pickup time. No extra charge. We track flight radar." },
    { q:"How do I pay? Do you need advance?", a:"No advance. Pay driver directly after trip in USD, TZS, Euro, or mobile money (M-Pesa, Tigo). Free cancellation 24h before. Receipt available." },
    { q:"How do I find my driver at Zanzibar Airport?", a:"Driver waits at arrivals with your name sign. Before pickup we share driver photo, name, phone and vehicle plate on WhatsApp. Meet & greet included." },
    { q:"What is included in price? Any hidden fees?", a:"Fixed per vehicle up to 4 pax, AC Toyota Noah / Alphard, driver, fuel, meet & greet, bottled water, child seat on request, 60 min free waiting after landing. No bargaining, same price day & night." },
    { q:"Why are you called HERO? Why per vehicle not per guest?", a:"Because we want to be the helpful person you need when you land. Other sites like Africa Holiday Hub charge $70 PER GUEST. We charge $40 PER VEHICLE up to 4 pax = $10 pp. Families save $240. Everyday honesty is why we are called HERO." },
  ]

  const getPrice = (dest:string) => {
    if(dest.includes("Stone")) return 15
    if(dest.includes("Chuwini")) return 25
    if(dest.includes("Nungwi") || dest.includes("Kendwa") || dest.includes("Matemwe") || dest.includes("Jambiani") || dest.includes("Makunduchi") || dest.includes("Kizimkazi") || dest.includes("Michamvi") || dest.includes("Pongwe") || dest.includes("Pingwe")) return 40
    return 35
  }

  const waNumber = "255773628792"
  const devNumber = "256700568634"

  const getTransferBookingLink = (routeName:string, price:number) => {
    const perPerson = (price / (paxCount || 2)).toFixed(2)
    const msg = `Hi HERO! I want to book TRANSFER ONLY: ${routeName} on ${date||'my date'} for ${pax} (${paxCount} pax = $${perPerson} pp). Price $${price} per vehicle. Name: ${name||'Guest'}. Flight tracking + 60min free wait included.`
    return `https://wa.me/${waNumber}?text=${encodeURIComponent(msg)}`
  }

  const toggleTour = (id:string) => setSelectedTours(prev => prev.includes(id)? prev.filter(t=>t!==id) : [...prev, id])
  const transferPrice = getPrice(to)
  const toursTotal = tours.filter(t=>selectedTours.includes(t.id)).reduce((s,t)=>s+t.price,0)
  const grandTotal = transferPrice + toursTotal

  const handleComboBooking = () => {
    if(!name.trim()){
      alert("Please enter your name to book combo.")
      return false
    }
    return true
  }

  const tourWaLink = `https://wa.me/${waNumber}?text=${encodeURIComponent(`Hi HERO! Combo booking: Name: ${name||'Guest'} | ${from} → ${to} on ${date||'my date'} for ${pax}. Transfer $${transferPrice} per vehicle ($${(transferPrice/(paxCount||2)).toFixed(2)} pp). Tours: ${tours.filter(t=>selectedTours.includes(t.id)).map(t=>t.name).join(', ')||'None'} = $${toursTotal}. TOTAL $${grandTotal} for ${paxCount} pax. Please confirm availability.`)}`
  const headerTransferLink = getTransferBookingLink(`${from} → ${to}`, transferPrice)
  const filteredPricing = tab==="All"? pricing : pricing.filter(p=>p.type===tab || p.area===tab)

  const imgFallback = (e:any) => { e.currentTarget.src = "https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?w=400&h=300&fit=crop" }

  return (
  <main className="bg-[#F5F7FA] overflow-x-hidden pb-20 md:pb-0">
    <Header/>

    <div className="bg-white/80 backdrop-blur border-b px-4 md:px-12 py-2.5 flex justify-between items-center text-[11px] font-medium">
      <span className="md:hidden">📍 From $15 Fixed • Per Vehicle</span>
      <span className="hidden md:inline">📍 Zanzibar Airport Transfers • From $15 Fixed • Per Vehicle, Not Per Guest • Pay Driver Directly • Free Cancellation 24h</span>
      <span className="font-bold text-[#0A2342]">💬 +255 773 628 792</span>
    </div>

    <section className="bg-[#0A2342] relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0A2342] via-[#0A2342] to-[#132F5A]"></div>
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#FF8A1A]/10 rounded-full blur-[120px]"></div>
      <div className="relative px-4 md:px-12 pt-4 flex gap-2 text-[10px] text-white/70">
        <span className="bg-white/10 px-3 py-1.5 rounded-full border border-white/10">✓ Fixed Per Vehicle</span>
        <span className="bg-white/10 px-3 py-1.5 rounded-full border border-white/10">✓ $10 pp for 4 Pax</span>
        <span className="bg-white/10 px-3 py-1.5 rounded-full border border-white/10">✓ Flight Tracking • 24/7</span>
      </div>
      <div className="relative grid md:grid-cols-2 px-4 md:px-12 py-8 md:py-16 gap-8 items-center">
        <div className="text-white order-2 md:order-1">
          <div className="min-h-[130px]">
            <h1 className="font-black text-[30px] md:text-[44px] leading-[0.95] tracking-tight transition-all duration-700">
              {slogans[sloganIndex].main.includes("$15")? <>{slogans[sloganIndex].main.split("$15")[0]}<span className="text-[#FF8A1A]">$15</span><br/>{slogans[sloganIndex].sub}</> : slogans[sloganIndex].main.includes("$40")? <>{slogans[sloganIndex].main.split("$40")[0]}<span className="text-[#FF8A1A]">$40</span><br/><span className="text-[22px] md:text-[28px] opacity-90">{slogans[sloganIndex].sub}</span></> : <>{slogans[sloganIndex].main}<br/><span className="text-[#FF8A1A] text-[24px] md:text-[30px]">{slogans[sloganIndex].sub}</span></>}
            </h1>
            <div className="flex gap-1.5 mt-4">{slogans.map((_,i)=><div key={i} className={`h-1 rounded-full transition-all ${i===sloganIndex?"w-8 bg-[#FF8A1A]":"w-2 bg-white/30"}`}></div>)}</div>
          </div>
          <p className="text-[13.5px] mt-5 opacity-80 leading-[1.6] max-w-[520px]">We live here. Every morning at Abeid Airport, planes land full of tired travelers landing without SIM, hotel transfer too expensive. At the same time local drivers wait outside for fair work. HERO bridges that gap. One clear price list for every corner of Zanzibar — Stone Town $15, Pwani $35, Paje $35, Nungwi $40 per vehicle up to 4 pax. You know price before you land. Driver gets fair pay. No bargaining. That everyday honesty is why we are called HERO.</p>
          <div className="mt-7 bg-white rounded-[20px] p-2.5 grid md:grid-cols-12 gap-2 shadow-[0_20px_60px_rgba(0,0,0,0.3)]">
            <select value={from} onChange={e=>setFrom(e.target.value)} className="md:col-span-3 text-black text-[13px] border rounded-[14px] px-3 py-3.5 font-semibold bg-gray-50 focus:bg-white outline-none"><option>Abeid Airport (ZNZ)</option></select>
            <select value={to} onChange={e=>setTo(e.target.value)} className="md:col-span-4 text-black text-[13px] border rounded-[14px] px-3 py-3.5 font-semibold bg-gray-50 focus:bg-white outline-none">
              <option>Stone Town $15</option><option>Chuwini $25</option><option>Nungwi / Kendwa $40</option><option>Matemwe $40</option><option>Pwani Mchangani $35</option><option>Kiwengwa $35</option><option>Pongwe $40</option><option>Uroa / Marumbi $35</option><option>Michamvi $40</option><option>Pingwe $40</option><option>Bwejuu $35</option><option>Paje $35</option><option>Jambiani $40</option><option>Makunduchi $40</option><option>Kizimkazi $40</option>
            </select>
            <input type="date" min={todayStr} value={date} onChange={e=>setDate(e.target.value)} className="md:col-span-2 text-black text-[13px] border rounded-[14px] px-3 py-3.5 bg-gray-50 focus:bg-white outline-none" />
            <select value={pax} onChange={e=>handlePaxChange(e.target.value)} className="md:col-span-1 text-black text-[13px] border rounded-[14px] px-3 py-3.5 bg-gray-50 focus:bg-white outline-none"><option>2 Guests</option><option>1 Guest</option><option>3 Guests</option><option>4 Guests</option></select>
            <a href={headerTransferLink} target="_blank" rel="noopener noreferrer" className="md:col-span-2 bg-[#0A2342] hover:bg-black text-white text-[13px] font-black rounded-[14px] px-3 py-3.5 text-center transition">Book ${transferPrice} →</a>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2.5">
            {[{l:"Stone Town", p:"$15"},{l:"Nungwi / Kendwa", p:"$40"},{l:"Paje / Bwejuu", p:"$35"},{l:"Jambiani / Pongwe", p:"$40"}].map(c=>(
              <button key={c.l} onClick={()=>setTo(c.l)} className={`text-left backdrop-blur border rounded-[14px] px-3 py-3 text-[11px] font-medium transition ${to===c.l?"bg-white text-black border-white":"bg-white/10 border-white/10 text-white hover:bg-white/20"}`}>📍 Airport → {c.l} <b className={to===c.l?"text-[#FF8A1A]":"text-[#FFB86A]"}> {c.p}</b></button>
            ))}
          </div>
        </div>
        <div className="relative order-1 md:order-2">
          <img src="/hero.jpg" onError={imgFallback} alt="Zanzibar Airport Transfer" className="w-full max-w-[620px] mx-auto rounded-[28px] h-[320px] md:h-[520px] object-cover shadow-[0_30px_80px_rgba(0,0,0,0.5)] bg-white/10" />
          <div className="absolute top-5 left-3 bg-white text-black text-[11px] font-bold px-4 py-2.5 rounded-full shadow-xl">✓ Meet & Greet at Arrivals</div>
          <div className="absolute bottom-7 right-3 bg-[#0A2342] text-white text-[11px] font-bold px-4 py-2.5 rounded-full shadow-xl">✓ Per Vehicle = ${(transferPrice/(paxCount||2)).toFixed(2)} pp • Concierge</div>
        </div>
      </div>
    </section>

    <section className="bg-white border-y border-gray-100 px-4 md:px-12 py-3">
      <div className="max-w-6xl mx-auto bg-[#F5F7FA] md:bg-white border border-gray-100 md:border-0 rounded-[16px] md:rounded-none px-4 py-3 md:py-2 flex flex-wrap md:flex-nowrap justify-between items-center gap-3 text-[11px] font-medium">
        <div className="flex items-center gap-2"><span className="w-6 h-6 bg-[#00AF87] rounded-full flex items-center justify-center text-white text-[10px] font-black">T</span><span className="font-bold">Tripadvisor</span><span className="opacity-60 hidden md:inline">• Verified Reviews</span></div>
        <div className="flex items-center gap-1"><span>⭐</span><span className="font-bold">Google</span><span className="opacity-60 hidden md:inline">• Real Experiences</span></div>
        <div className="hidden md:flex items-center gap-1"><span className="w-3 h-3 bg-[#00C2A2] rounded-full"></span><span className="font-bold">GetYourGuide</span></div>
        <div className="hidden md:flex items-center gap-1"><span className="w-3 h-3 bg-[#1A4A8A] rounded-full"></span><span className="font-bold">Viator</span></div>
        <div className="text-[10px] opacity-60 ml-auto">Licensed Zanzibar Tourism • AC Vehicles • Child Seat • Water • Secure • Pay Driver Directly</div>
      </div>
    </section>

    <section id="pricing" className="px-4 md:px-12 py-12 md:py-16 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center">
          <span className="bg-[#FFFBF5] border border-[#FF8A1A]/20 text-[#FF8A1A] text-[10px] px-4 py-1.5 rounded-full font-black tracking-widest">TRANSFER ONLY • OWN BOOKING • FIXED PRICES</span>
          <h2 className="font-serif font-black text-[28px] md:text-[36px] mt-4 leading-[1.05]">Fixed Per Vehicle, Not Per Guest<br/><span className="text-[#FF8A1A]">From $15 = $3.75 pp — 70% Cheaper Than Others</span></h2>
          <p className="text-[13px] opacity-60 mt-3 max-w-2xl mx-auto">Each card has its own booking. Click Book to WhatsApp us directly for that route only. Per vehicle up to 4 pax, not per guest like Africa Holiday Hub $70 pp. Price dynamic shows ${(transferPrice/(paxCount||2)).toFixed(2)} pp for {paxCount} pax.</p>
        </div>
        <div className="flex justify-center gap-2 mt-8 flex-wrap bg-white/80 backdrop-blur py-2 sticky top-2 z-10">
          {["All","Stone Town","North","East","South"].map(t=>(<button key={t} onClick={()=>setTab(t)} className={`px-6 py-2.5 rounded-full text-[12px] border font-bold transition-all ${tab===t?"bg-[#0A2342] text-white scale-105 shadow-[0_8px_20px_rgba(10,35,66,0.2)]":"bg-[#F5F7FA] border-gray-100 hover:bg-gray-100"}`}>{t}</button>))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-8">
          {filteredPricing.map((x,i)=>(
            <div key={i} className="group relative bg-white border border-gray-100 rounded-[20px] overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_30px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all">
              {x.popular && <span className="absolute top-3 left-3 bg-[#0A2342] text-white text-[9px] px-3 py-1 rounded-full font-black z-10">POPULAR</span>}
              <div className="h-[110px] w-full overflow-hidden relative bg-[#F5F7FA]"><img src={x.img} onError={imgFallback} alt={x.route} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" /><div className="absolute bottom-2 left-2 bg-white/90 backdrop-blur text-[9px] font-bold px-2 py-1 rounded-full">{x.time} • {x.pax}</div></div>
              <div className="p-4">
                <p className="font-bold text-[12px] leading-tight">{x.route}</p>
                <p className="text-[10px] opacity-50 mt-1">AC • Water • Child Seat • 60min free wait</p>
                <div className="mt-3">
                  <p className="font-black text-[22px] text-[#0A2342] leading-none">${x.price}<span className="text-[10px] font-medium opacity-60 ml-1">vehicle</span></p>
                  <p className="text-[10px] font-bold text-[#FF8A1A] mt-1">${(x.price/(paxCount||4)).toFixed(2)} pp when {paxCount||4} pax • Save 70%</p>
                </div>
                <a href={getTransferBookingLink(x.route, x.price)} target="_blank" rel="noopener noreferrer" className="mt-3 w-full bg-[#0A2342] group-hover:bg-black text-white text-[11px] font-bold py-2.5 rounded-full flex justify-center transition">Book Transfer Only</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="px-4 md:px-12 py-14 md:py-20 bg-[#FFFBF5] relative overflow-hidden">
      <div className="max-w-6xl mx-auto relative">
        <div className="text-center max-w-3xl mx-auto">
          <span className="bg-[#0A2342] text-white text-[10px] px-4 py-1.5 rounded-full font-bold tracking-widest">WHY HERO • WHY PER VEHICLE</span>
          <h2 className="font-serif font-black text-[28px] md:text-[36px] mt-5 leading-[1.05]">Transport in Zanzibar Should Be Fair, Clear and Human.</h2>
          <p className="text-[13.5px] opacity-70 mt-5 leading-relaxed">Every morning at Abeid Airport, planes land full of tired travelers. At the same time, local drivers wait outside for fair work. HERO Shuttle was created to bridge that gap. One clear price list for every area — Stone Town $15, Chuwini $25, Paje $35, Nungwi $40 per vehicle. You know the price before you land. Driver gets fair pay. No bargaining. That everyday honesty is why we are called HERO. We charge per vehicle, not per guest - so families save 70% vs Africa Holiday Hub who charge $70 per person.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-5 mt-12">
          {[
            {t:"Why you need a HERO when you land", d:"You land, SIM not working, hotel transfer too expensive ($80), taxi bargaining at gate. You need someone already waiting with your name, who knows your hotel gate, who can tell you where to get cash, SIM, and best local food. We monitor flight, we wait 60 min free, we have child seat."},
            {t:"What makes us the right team & what is included", d:"We are Zanzibari drivers and coordinators based in Stone Town. No brokers. Clean Toyota Noah/Alphard with AC, on time, Swahili + English, we keep our word. Included: Fixed price per vehicle up to 4 pax, AC, driver, fuel, meet & greet at arrivals with name sign, bottled water, child seat on request, flight tracking, 60 min free wait."},
            {t:"Why we do this work & how you save", d:"Because the first and last hour of your trip decides your whole feeling about Zanzibar. If that hour is calm and safe, you leave thinking — Zanzibar was easy. Per vehicle: Our $40 to Nungwi = $10 pp when 4 share. Africa Holiday Hub $70 pp x4 = $280. You save $240 same car. That saving is your dinner, tour, souvenir."},
          ].map((c,i)=>(
            <div key={i} className="bg-white p-7 rounded-[20px] border border-black/5 shadow-[0_8px_30px_rgba(0,0,0,0.03)]"><p className="font-black text-[14px]">{c.t}</p><p className="text-[12.5px] opacity-60 mt-3 leading-relaxed">{c.d}</p></div>
          ))}
        </div>
      </div>
    </section>

    <section id="tours" className="bg-[#0A2342] py-14 md:py-20 px-4 md:px-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center">
          <span className="bg-[#FF8A1A] text-white text-[10px] px-4 py-1.5 rounded-full font-black tracking-widest">TOURS + COMBO • SEPARATE BOOKING • BUILD YOUR OWN</span>
          <h2 className="font-serif font-black text-white text-[28px] md:text-[36px] leading-tight mt-4">Add Tours to Your Transfer<br/><span className="text-[#FF8A1A]">Build Your Own Itinerary - Save More</span></h2>
          <p className="text-white/60 text-[13px] mt-3 max-w-2xl mx-auto">This section has its OWN booking button, separate from transfer-only booking above. Select tours, add to transfer, book combo on WhatsApp in 2 minutes. Pay driver after each trip. Free cancellation 24h.</p>
        </div>
        <div className="flex justify-center gap-2 mt-8 flex-wrap">{["Popular","Half Day","Full Day"].map(t=>(<button key={t} onClick={()=>setTourTab(t)} className={`px-6 py-2.5 rounded-full text-[12px] font-bold border transition ${tourTab===t?"bg-white text-black":"bg-white/10 text-white border-white/10 hover:bg-white/20"}`}>{t}</button>))}</div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          {tours.filter(tt=>tourTab==="Popular" || tt.tag===tourTab).map((tour)=>(
            <div key={tour.id} onClick={()=>toggleTour(tour.id)} className={`rounded-[20px] overflow-hidden border-2 cursor-pointer transition-all ${selectedTours.includes(tour.id)?"border-[#FF8A1A] scale-[1.02] shadow-[0_10px_30px_rgba(255,138,26,0.3)]":"border-white hover:border-[#FF8A1A]/50"}`}>
              <div className="h-[120px] relative bg-[#F5F7FA]"><img src={tour.img} onError={imgFallback} alt={tour.name} className="w-full h-full object-cover" /><div className="absolute top-2 left-2 bg-[#0A2342] text-white text-[9px] px-2 py-1 rounded-full font-bold">{tour.tag}</div><div className="absolute bottom-2 left-2 bg-white/90 text-[9px] px-2 py-1 rounded-full font-bold">{tour.duration}</div></div>
              <div className="bg-white p-3"><p className="font-bold text-[12px]">{tour.name}</p><p className="text-[10px] opacity-60 leading-tight mt-1">{tour.desc} • Real boat • Small group • Local guide</p><div className="flex justify-between items-center mt-3"><p className="font-black text-[14px]">${tour.price}</p><div className={`text-[10px] px-3 py-1.5 rounded-full font-black ${selectedTours.includes(tour.id)?"bg-[#FF8A1A] text-white":"bg-[#0A2342] text-white"}`}>{selectedTours.includes(tour.id)?"Added ✓":"Add +"}</div></div></div>
            </div>
          ))}
        </div>
        <div className="mt-12 max-w-4xl mx-auto bg-white rounded-[24px] p-6 md:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.2)]">
          <div className="flex items-center justify-between"><h3 className="font-black text-[18px] md:text-[22px]">Your Combo Itinerary & Final Price</h3><span className="bg-[#FF8A1A]/10 text-[#FF8A1A] border border-[#FF8A1A]/20 text-[11px] px-3 py-1 rounded-full font-bold">Combo Booking - Save 10%</span></div>
          <div className="mt-6 bg-[#F5F7FA] rounded-[16px] p-4 divide-y divide-black/5">
            <div className="flex justify-between py-3 text-[13px]"><span className="font-medium">🚕 Transfer: {from} → {to} ({transferPrice===15?'15min':'60min'}) per vehicle</span><span className="font-black">${transferPrice}</span></div>
            {tours.filter(t=>selectedTours.includes(t.id)).map(t=>(<div key={t.id} className="flex justify-between py-3 text-[13px]"><span>🏝️ {t.name} - {t.duration}</span><span className="font-bold">${t.price}</span></div>))}
            {selectedTours.length===0 && <p className="text-[12px] opacity-50 py-3">Select tours above to build combo. You pay driver after each trip. No advance needed.</p>}
            <div className="flex justify-between pt-4 text-[16px] font-black"><span>COMBO TOTAL (vehicle + tours)</span><span className="text-[#FF8A1A] text-[26px]">${grandTotal}</span></div>
          </div>
          <div className="mt-5 grid md:grid-cols-2 gap-3">
            <input value={name} onChange={e=>setName(e.target.value)} placeholder="Your name *" required className="border border-gray-200 rounded-[12px] px-4 py-3.5 text-[13px] bg-[#F5F7FA] focus:bg-white outline-none" />
            <input type="date" min={todayStr} value={date} onChange={e=>setDate(e.target.value)} className="border border-gray-200 rounded-[12px] px-4 py-3.5 text-[13px] bg-[#F5F7FA] focus:bg-white outline-none" />
          </div>
          <a href={tourWaLink} onClick={(e)=>{ if(!handleComboBooking()) e.preventDefault() }} target="_blank" rel="noopener noreferrer" className="mt-4 w-full bg-[#0A2342] hover:bg-black text-white font-black text-[15px] py-4 rounded-full flex justify-center items-center gap-2 transition">Book Combo Itinerary → ${grandTotal}</a>
          <p className="text-[11px] text-center mt-3 opacity-60">Combo booking separate from transfer-only above - WhatsApp +255773628792 - Pay driver directly after each service - Free cancellation 24h</p>
        </div>
      </div>
    </section>

    <section className="bg-white px-4 md:px-12 py-14 md:py-20 border-t">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto">
          <h3 className="font-serif font-black text-[22px] md:text-[30px] leading-tight">Zanzibar Airport Transfer — Everything You Search,<br/>Answered by HERO (Real Prices)</h3>
          <p className="text-[13px] opacity-60 mt-3">We answer what you google before you land. No hidden fees. Per vehicle prices, not per guest.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6 mt-10 text-[12.5px] leading-relaxed">
          <div className="bg-[#FFFBF5] border border-[#FF8A1A]/10 rounded-[20px] p-6">
            <p className="font-black text-[13px]">✈️ Airport to Stone Town $15 per vehicle?</p><p className="mt-2 opacity-70">Yes fixed $15 per vehicle up to 4 pax = $3.75 pp when 4 share. 15 min drive. Others charge $70 per person. Search: airport to stone town price per vehicle, cheap taxi ZNZ to stone town.</p>
            <p className="font-black text-[13px] mt-6">📍 Airport to Nungwi / Kendwa $40 per vehicle?</p><p className="mt-2 opacity-70">$40 fixed per vehicle = $10 pp. 70 mins north. No night surcharge. Includes meet & greet, water, child seat. Search: nungwi taxi price per vehicle, kendwa transfer cheap.</p>
            <p className="font-black text-[13px] mt-6">🚕 Airport to Chuwini $25?</p><p className="mt-2 opacity-70">Yes $25 per vehicle. 25 min. West coast Bububu area. Search: chuwini transfer.</p>
          </div>
          <div className="bg-[#F5F7FA] border border-black/5 rounded-[20px] p-6">
            <p className="font-black text-[13px]">🏖️ Airport to Paje / Jambiani / Bwejuu?</p><p className="mt-2 opacity-70">$35 Paje / Bwejuu, $40 Jambiani / Makunduchi per vehicle = $8.75-$10 pp. South East 55-60 min. Search: paje taxi price per vehicle, jambiani transfer.</p>
            <p className="font-black text-[13px] mt-6">🌴 East Coast Transfers - Matemwe, Kiwengwa, Pongwe?</p><p className="mt-2 opacity-70">Pwani Mchangani $35, Kiwengwa $35, Pongwe $40, Matemwe $40 per vehicle. 60-70 min. Search: kiwengwa taxi, matemwe transfer, pongwe price, pingwe taxi.</p>
            <p className="font-black text-[13px] mt-6">🐬 Kizimkazi Dolphin Tour + Transfer?</p><p className="mt-2 opacity-70">Transfer $40 per vehicle + tour $40. Book combo above. Early morning boat. Search: kizimkazi transfer and dolphin tour.</p>
          </div>
          <div className="bg-[#0A2342] text-white rounded-[20px] p-6">
            <p className="font-black text-[13px]">💎 Why HERO vs Africa Holiday Hub vs hotel taxi?</p><p className="mt-2 opacity-70">Africa Holiday: $70 per guest x4 = $280 to Nungwi. Hotel: $80-$120. HERO: $40 per vehicle up to 4 pax = $10 pp. Same Toyota Noah AC, same driver quality, local concierge on WhatsApp +255773628792. Pay driver directly after trip. No advance. Free cancellation 24h. Flight tracking. 60 min free wait. Child seat free. Water included.</p>
            <p className="font-black text-[13px] mt-6">🌙 Need HERO at 2AM? Night same price?</p><p className="mt-2 opacity-70">Yes 24/7. Night same price $15-$40 per vehicle. No surge. Driver waits at arrivals with your name even if delayed 3h. Share flight number.</p>
            <p className="font-black text-[13px] mt-6">🏝️ Tours + Transfer combo saves money?</p><p className="mt-2 opacity-70">Yes. Example: Airport → Paje $35 + Mnemba $45 + Prison Island $55 = $135 total per group, not per person. If 4 share = $33 each for all. Book combo above.</p>
          </div>
        </div>
      </div>
    </section>

    <section id="reviews" className="bg-[#FFFBF5] px-4 md:px-12 py-14 md:py-20 border-t">
      <div className="max-w-6xl mx-auto">
        <div className="text-center">
          <span className="bg-white border border-black/10 text-[#0A2342] text-[10px] px-4 py-1.5 rounded-full font-black tracking-widest">REAL GUEST REVIEWS • VERIFIED • NO FAKE</span>
          <h2 className="font-serif font-black text-[28px] md:text-[38px] mt-4 leading-[1.05]">Real Experiences From Real Travelers<br/><span className="text-[#FF8A1A]">We Ask Every Guest After Trip</span></h2>
          <p className="text-[13px] opacity-60 mt-3 max-w-2xl mx-auto">We are collecting real reviews on TripAdvisor and Google. This section will grow as guests share experiences. No fake reviews. Only verified.</p>
        </div>

        {reviews.length === 0? (
          <div className="mt-10 bg-white border border-dashed border-gray-300 rounded-[24px] p-8 md:p-12 text-center">
            <div className="w-16 h-16 bg-[#F5F7FA] rounded-full flex items-center justify-center mx-auto text-[24px]">⭐</div>
            <h3 className="font-bold text-[16px] mt-4">Collecting Real Reviews - Be First to Review</h3>
            <p className="text-[12px] opacity-60 mt-2 max-w-md mx-auto">We just launched with per vehicle pricing. As guests travel with us and leave reviews on TripAdvisor/Google, they will appear here. Be first. Your honest words help next travelers save 70%.</p>
            <div className="mt-6 flex flex-col md:flex-row justify-center gap-3">
              <a href={tripAdvisorWriteUrl} target="_blank" rel="noopener noreferrer" className="bg-[#00AF87] hover:bg-[#00946F] text-white px-8 py-3 rounded-full text-[13px] font-bold transition text-center">✍️ Write a Review on TripAdvisor</a>
              <a href="https://www.google.com/search?q=HERO+Shuttle+Tours+Zanzibar+reviews" target="_blank" rel="noopener noreferrer" className="bg-white border border-black/10 px-8 py-3 rounded-full text-[13px] font-bold hover:bg-gray-50 transition text-center">⭐ Review on Google</a>
            </div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
              {visibleReviews.map((r:any,i:number)=>(
                <div key={i} className="bg-white border border-black/5 rounded-[20px] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3"><div className="w-10 h-10 bg-[#0A2342] text-white rounded-full flex items-center justify-center font-black text-[11px]">{r.avatar}</div><div><p className="font-bold text-[12px]">{r.name}</p><p className="text-[10px] opacity-60">{r.country} • {r.date}</p></div></div>
                    <span className="text-[9px] px-2 py-1 rounded-full font-bold bg-[#00AF87]/10 text-[#00AF87]">{r.source}</span>
                  </div>
                  <div className="flex gap-0.5 mt-3 text-[#FF8A1A] text-[12px]">{"★".repeat(r.rating)}</div>
                  <p className="text-[12.5px] leading-relaxed mt-3 opacity-80">"{r.text}"</p>
                </div>
              ))}
            </div>
            <div className="mt-8 flex flex-col md:flex-row justify-center items-center gap-3">
              {reviews.length > 3 && <button onClick={()=>setShowAllReviews(!showAllReviews)} className="bg-[#0A2342] text-white px-8 py-3 rounded-full text-[13px] font-bold hover:bg-black transition w-full md:w-auto">{showAllReviews?`Show Less`:`View More Reviews (${reviews.length})`}</button>}
              <a href={tripAdvisorWriteUrl} target="_blank" rel="noopener noreferrer" className="bg-white border border-black/10 text-[#0A2342] px-8 py-3 rounded-full text-[13px] font-bold hover:bg-gray-50 transition w-full md:w-auto text-center">✍️ Write a Review on TripAdvisor</a>
            </div>
          </>
        )}
      </div>
    </section>

    <section id="faq" className="bg-[#F5F7FA] px-4 md:px-12 py-12 md:py-16">
      <div className="max-w-3xl mx-auto">
        <h3 className="font-serif font-black text-center text-[26px]">Frequently Asked Questions - Everything You Ask Before Landing</h3>
        <div className="mt-8 space-y-3">{faqs.map((f,i)=>(<div key={i} className="bg-white border border-black/5 rounded-[16px] overflow-hidden"><button onClick={()=>setOpenFaq(openFaq===i?null:i)} className="w-full text-left px-6 py-4 font-bold text-[13px] flex justify-between items-center"><span>{f.q}</span><span className={`w-7 h-7 rounded-full flex items-center justify-center text-[12px] ${openFaq===i?"bg-[#0A2342] text-white":"bg-[#F5F7FA]"}`}>{openFaq===i?"−":"+"}</span></button>{openFaq===i && <div className="px-6 pb-5 text-[12px] opacity-70 leading-relaxed">{f.a}</div>}</div>))}</div>
      </div>
    </section>

    <section className="bg-[#0A2342] px-4 md:px-12 py-14 md:py-20 text-center text-white">
      <h2 className="font-serif font-black text-[32px] md:text-[44px] leading-[0.95]">Need a HERO?<br/><span className="text-[#FF8A1A]">From $15 Per Vehicle = $3.75 pp.</span></h2>
      <p className="text-[13px] opacity-70 mt-4 max-w-xl mx-auto">Per vehicle up to 4 pax. Pay driver directly. No advance. Free cancellation 24h. Flight tracking. 60 min free wait. Child seat free. Local concierge on WhatsApp.</p>
      <div className="mt-8 flex justify-center gap-3 flex-wrap">
        <a href={headerTransferLink} target="_blank" rel="noopener noreferrer" className="bg-[#FF8A1A] hover:bg-[#ff9a33] px-8 py-4 rounded-full font-black text-[14px] shadow-[0_10px_20px_rgba(255,138,26,0.3)] transition">💬 Book Transfer Only ${transferPrice}</a>
        <a href={tourWaLink} onClick={(e)=>{ if(!handleComboBooking()) e.preventDefault() }} target="_blank" rel="noopener noreferrer" className="bg-white text-[#0A2342] hover:bg-gray-100 px-8 py-4 rounded-full font-black text-[14px] transition">🏝️ Book Combo ${grandTotal}</a>
      </div>
      <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto text-[11px] text-left">
        <div className="bg-white/10 border border-white/10 rounded-[12px] p-3">✓ Fixed $15-$40 per vehicle<br/><span className="opacity-60">Same day & night</span></div>
        <div className="bg-white/10 border border-white/10 rounded-[12px] p-3">✓ Flight tracking<br/><span className="opacity-60">We wait if delayed</span></div>
        <div className="bg-white/10 border border-white/10 rounded-[12px] p-3">✓ Pay driver directly<br/><span className="opacity-60">No advance needed</span></div>
        <div className="bg-white/10 border border-white/10 rounded-[12px] p-3">✓ Free cancellation 24h<br/><span className="opacity-60">WhatsApp booking 2 min</span></div>
      </div>
    </section>

    <Footer/>

    <div className="bg-[#0A2342] border-t border-white/10 px-4 md:px-12 py-6">
      <div className="max-w-6xl mx-auto text-center">
        <div className="flex flex-col md:flex-row justify-center items-center gap-2 text-[12px] text-white/90">
          <span>© 2026 HERO Shuttle & Tours</span>
          <span className="hidden md:inline text-white/40">•</span>
          <a href={`https://wa.me/${devNumber}?text=Hi%20T256%20Group%20LTD!%20I%20saw%20HERO%20Shuttle%20website.`} target="_blank" rel="noopener noreferrer" className="font-bold text-white underline decoration-[#FF8A1A] decoration-2 underline-offset-4 hover:text-[#FF8A1A] transition">
            Developed by T256 Group LTD
          </a>
        </div>
        <p className="text-[11px] text-white/50 mt-2">Click above to chat with developer on WhatsApp +256 700 568 634</p>
      </div>
    </div>

    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur border-t px-3 py-3 flex gap-2 z-40">
      <a href={headerTransferLink} target="_blank" rel="noopener noreferrer" className="flex-1 bg-[#0A2342] text-white text-[13px] font-black py-3.5 rounded-full text-center">Transfer ${transferPrice}</a>
      <a href={tourWaLink} onClick={(e)=>{ if(!handleComboBooking()) e.preventDefault() }} target="_blank" rel="noopener noreferrer" className="flex-1 bg-[#FF8A1A] text-white text-[13px] font-black py-3.5 rounded-full text-center">Combo ${grandTotal}</a>
    </div>

    <a href={headerTransferLink} target="_blank" rel="noopener noreferrer" className="fixed bottom-[85px] md:bottom-6 right-4 w-14 h-14 bg-[#25D366] rounded-full shadow-[0_12px_30px_rgba(37,211,102,0.4)] flex items-center justify-center text-[22px] z-50 hover:scale-110 transition">💬</a>

    <style>{`.font-serif { font-family: Georgia, serif; }`}</style>
  </main>
  )
}