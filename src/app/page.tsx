"use client"
import { useState, useEffect } from "react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"

export default function Home(){
  const [from, setFrom] = useState("Abeid Airport (ZNZ)")
  const [to, setTo] = useState("Stone Town")
  const [date, setDate] = useState("")
  const [pax, setPax] = useState("2 Guests")
  const [tab, setTab] = useState("All")
  const [tourTab, setTourTab] = useState("Popular")
  const [openFaq, setOpenFaq] = useState<number | null>(0)
  const [liveMsg, setLiveMsg] = useState("Sarah from UK just booked Airport → Paje 3 mins ago")
  const [timer, setTimer] = useState(15*60)
  const [reviewIndex, setReviewIndex] = useState(0)

  const pricing = [
    { route:"Airport to Stone Town", time:"15-20 min", pax:"Sedan - 4 pax", price:25, oldPrice:60, type:"Stone Town", best:true, img:"/sedan.png" },
    { route:"Airport to Stone Town (Van)", time:"15-20 min", pax:"Van - 7 pax", price:35, oldPrice:75, type:"Stone Town", best:false, img:"/van.png" },
    { route:"Airport to Nungwi", time:"60-75 min", pax:"Sedan - 4 pax", price:50, oldPrice:85, type:"North", best:true, img:"/sedan.png" },
    { route:"Airport to Nungwi (Van)", time:"60-75 min", pax:"Van - 7 pax", price:70, oldPrice:110, type:"North", best:false, img:"/van.png" },
    { route:"Airport to Paje", time:"45-55 min", pax:"Sedan - 4 pax", price:35, oldPrice:65, type:"South", best:false, img:"/sedan.png" },
    { route:"Airport to Paje (Van)", time:"45-55 min", pax:"Van - 7 pax", price:50, oldPrice:80, type:"South", best:false, img:"/van.png" },
    { route:"Airport to Kendwa", time:"60-70 min", pax:"Sedan - 4 pax", price:50, oldPrice:85, type:"North", best:false, img:"/sedan.png" },
    { route:"Airport to Kendwa (Van)", time:"60-70 min", pax:"Van - 7 pax", price:70, oldPrice:110, type:"North", best:false, img:"/van.png" },
  ]

  const tours = [
    { name:"Prison Island", rating:"4.8 (120)", price:"$30", old:"$45", combo:"Save $15 with transfer", tag:"Popular" },
    { name:"Stone Town Tour", rating:"4.9 (210)", price:"$25", old:"$40", combo:"Combo Save", tag:"Popular" },
    { name:"Spice Tour", rating:"4.7 (98)", price:"$22", old:"$35", combo:"Popular", tag:"Half Day" },
    { name:"Mnemba Snorkel", rating:"4.9 (156)", price:"$45", old:"$65", combo:"Save $20", tag:"Popular" },
    { name:"Nakupenda Sandbank", rating:"4.8 (134)", price:"$40", old:"$60", combo:"Most Booked", tag:"Full Day" },
    { name:"Jozani Forest", rating:"4.6 (89)", price:"$38", old:"$50", combo:"Family", tag:"Half Day" },
    { name:"Sunset Dhow", rating:"4.9 (203)", price:"$35", old:"$50", combo:"Romantic", tag:"Popular" },
    { name:"Kizimkazi Dolphin", rating:"4.7 (92)", price:"$32", old:"$45", combo:"Early Bird", tag:"Full Day" },
  ]

  const happyGuests = [
    { name:"Sarah & Tom", country:"UK", text:"Airport to Nungwi was flawless. Driver waiting with name board, free water. 10/10", img:"/guests/guest1.jpg", platform:"TripAdvisor", rating:"5.0" },
    { name:"Markus", country:"Germany", text:"Tracked our delayed flight. No extra charge. Hotel wanted $80, HERO $50.", img:"/guests/guest2.jpg", platform:"Google", rating:"5.0" },
    { name:"Aisha Family", country:"UAE", text:"Booked van + Prison Island combo. Saved $15. Kids loved it, super safe.", img:"/guests/guest3.jpg", platform:"Viator", rating:"5.0" },
    { name:"Jessica", country:"USA", text:"Best transfer in Zanzibar! WhatsApp reply in 2 mins, driver photo sent.", img:"/guests/guest4.jpg", platform:"Google", rating:"5.0" },
    { name:"David & Lisa", country:"France", text:"Paje transfer + Mnemba snorkel. Everything on time, AC van, professional.", img:"/guests/guest5.jpg", platform:"TripAdvisor", rating:"5.0" },
    { name:"Omar", country:"Italy", text:"Book now pay later is real. Paid driver cash, no stress. Highly recommend.", img:"/guests/guest6.jpg", platform:"GetYourGuide", rating:"4.9" },
  ]

  const faqs = [
    { q:"What if my flight is delayed?", a:"We track your flight live. Driver waits 2 hours FREE. No extra charge. Hotel taxis charge $20/hour — we don't." },
    { q:"Can I pay driver in cash?", a:"Yes! Pay in USD, TZS, or online. No prepayment needed. Free cancellation 24h before." },
    { q:"Is car AC and safe?", a:"All cars are AC, licensed, insured. Professional licensed drivers. Water + child seat free on request." },
    { q:"How fast is WhatsApp reply?", a:"Average 2 mins. Real human 24/7. Try now — we are online." },
    { q:"Hotel taxi vs HERO?", a:"Hotel taxi $60-80 + night charges. HERO $25 fixed, flight tracking, 2h free wait, WhatsApp support." },
  ]

  useEffect(()=>{
    const msgs = ["James from Germany booked Nungwi 1 min ago","Amina from UAE booked Stone Town 2 mins ago","Sarah from UK booked Paje 3 mins ago","David from USA booked Kendwa + Mnemba Combo 4 mins ago"]
    let i=0; const id=setInterval(()=>{ setLiveMsg(msgs[i%msgs.length]); i++ }, 3000)
    const t=setInterval(()=>setTimer(s=>s>0?s-1:900),1000)
    const r=setInterval(()=>setReviewIndex(s=>(s+1)%happyGuests.length),4000)
    return ()=>{ clearInterval(id); clearInterval(t); clearInterval(r) }
  },[])

  const totalPrice = to.includes("Stone")? 25 : to.includes("Nungwi") || to.includes("Kendwa")? 50 : 35
  const waLink = `https://wa.me/255777123456?text=Hi%20HERO!%20I%20want%20${encodeURIComponent(from)}%20→%20${encodeURIComponent(to)}%20on%20${date||'Sep 30'}%20for%20${encodeURIComponent(pax)}.%20Is%20$${totalPrice}%20available?`
  const filteredPricing = tab==="All"? pricing : tab==="Popular"? pricing.filter(p=>p.best) : pricing.filter(p=>p.type===tab)

  return (
  <main className="bg-[#F5F7FA] overflow-x-hidden">
    <Header/>

    {/* TRUST BAR 1 - GLOBAL - Under Header */}
    <div className="bg-white border-b px-4 md:px-12 py-2 flex flex-wrap gap-3 md:gap-6 text-[10px] md:text-[11px] font-medium items-center justify-center md:justify-start">
      <span className="flex items-center gap-1.5">🟢 <b>TripAdvisor</b> 4.9 (324) Travelers' Choice</span>
      <span className="flex items-center gap-1.5">⭐ <b>Google</b> 4.9 (412) Excellent</span>
      <span className="hidden md:flex items-center gap-1.5">🔵 <b>Viator</b> 5.0 • <b>GetYourGuide</b> 4.8</span>
      <span className="hidden md:flex items-center gap-1.5 text-green-600">● 1,200+ travelers last month • Licensed & Insured</span>
      <a href="#reviews" className="ml-auto hidden md:inline-flex bg-[#0A2342] text-white px-3 py-1 rounded-full text-[10px]">See Reviews →</a>
    </div>

    {/* SECTION 1 HERO - TRUST BAR 2 INSIDE */}
    <section className="bg-[#0A2342] relative">
      <div className="px-4 md:px-12 pt-3 flex flex-wrap gap-2 text-[10px] text-white/80">
        <span className="bg-white/10 px-3 py-1 rounded-full border border-white/10">⭐ 4.9/5 Google (324 reviews)</span>
        <span className="bg-white/10 px-3 py-1 rounded-full border border-white/10">✓ Licensed Drivers</span>
        <span className="bg-white/10 px-3 py-1 rounded-full border border-white/10">✓ Flight Tracking</span>
        <span className="bg-white/10 px-3 py-1 rounded-full border border-white/10">✓ Free Cancellation 24h</span>
      </div>
      <div className="grid md:grid-cols-2 px-4 md:px-12 py-6 md:py-10 items-center gap-6">
        <div className="text-white">
          <h1 className="text-[28px] md:text-[40px] leading-[1.05] font-black">Zanzibar Airport Transfers From <span className="text-[#FF8A1A] animate-pulse">$25</span><br/>Fixed Price. No Surprises.</h1>
          <p className="text-[13px] mt-3 opacity-80">Driver waiting at arrivals with your name — 24/7 WhatsApp support — Pay later.</p>
          <div className="mt-5 bg-white rounded-xl p-2 grid grid-cols-1 md:grid-cols-5 gap-2 shadow-2xl">
            <select value={from} onChange={e=>setFrom(e.target.value)} className="col-span-1 text-black text-xs border rounded-lg px-2 py-2.5"><option>Abeid Airport (ZNZ)</option></select>
            <select value={to} onChange={e=>setTo(e.target.value)} className="col-span-1 text-black text-xs border rounded-lg px-2 py-2.5"><option>Stone Town</option><option>Nungwi</option><option>Kendwa</option><option>Paje</option><option>Jambiani</option></select>
            <input type="date" value={date} onChange={e=>setDate(e.target.value)} className="text-black text-xs border rounded-lg px-2 py-2.5" />
            <select value={pax} onChange={e=>setPax(e.target.value)} className="text-black text-xs border rounded-lg px-2 py-2.5"><option>2 Guests</option><option>1 Guest</option><option>3 Guests</option><option>4 Guests</option><option>5-7 Guests</option></select>
            <a href={waLink} className="bg-[#FF8A1A] text-white text-xs font-bold rounded-lg px-3 py-2.5 text-center hover:scale-105 transition">Check Price →</a>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2">
            {[{l:"Airport - Stone Town", p:"$25"},{l:"Airport - Nungwi", p:"$50"},{l:"Airport - Paje", p:"$35"},{l:"Airport - Kendwa", p:"$50"}].map(c=>(
              <button key={c.l} onClick={()=>setTo(c.l.split(" - ")[1])} className="text-left bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-[11px] hover:bg-white/20">📍 {c.l} <b className="text-[#FFB86A] ml-1">{c.p}</b></button>
            ))}
          </div>
          <div className="mt-4 flex items-center gap-3">
            <a href={waLink} className="bg-[#FF8A1A] px-6 py-3 rounded-full text-sm font-black shadow-lg">Book on WhatsApp</a>
            <div className="text-[11px] leading-tight"><p className="font-bold">👥 1,200+ travelers last month</p><p className="opacity-70">🕒 Avg response 2 mins • Online now</p></div>
          </div>
        </div>
        <div className="relative group">
          <img src="/hero.jpg" alt="Alphard" className="w-full max-w-[620px] mx-auto rounded-[20px] shadow-[0_20px_60px_rgba(0,0,0,0.5)] object-cover" />
          <div className="absolute top-4 left-2 md:left-0 bg-white text-black text-[11px] px-3 py-2 rounded-xl shadow-xl flex items-center gap-2 animate-bounce"><span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span> Driver Juma is on the way ✓</div>
          <div className="absolute bottom-6 right-2 md:right-10 bg-white text-black text-[11px] px-3 py-2 rounded-xl shadow-xl">💧 Free Water + AC + Child Seat</div>
        </div>
      </div>
    </section>

    {/* SECTION 2 PRICING + TRUST BAR 3 */}
    <section id="pricing" className="px-4 md:px-12 py-10 bg-white">
      <h2 className="text-center font-black text-[22px]">Transparent Fixed Prices — No Hidden Fees</h2>
      <p className="text-center text-[12px] opacity-60">Same price day/night. Driver waits even if flight delayed.</p>
      <div className="flex justify-center gap-2 mt-5 flex-wrap">
        {["All","Popular","Stone Town","North","South"].map(t=>(
          <button key={t} onClick={()=>setTab(t)} className={`px-5 py-2 rounded-full text-xs border font-bold transition-all ${tab===t?"bg-[#0A2342] text-white scale-105 shadow-lg":"bg-gray-100 hover:bg-gray-200"}`}>{t}</button>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
        {filteredPricing.map((x,i)=>(
          <div key={i} className="relative bg-white border rounded-xl p-4 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all">
            {x.best && <span className="absolute -top-2 left-3 bg-[#FF8A1A] text-white text-[10px] px-2 py-0.5 rounded-full font-bold animate-pulse">Most Booked</span>}
            <img src={x.img} alt="car" className="w-full h-20 object-contain bg-gray-50 rounded-lg" onError={e=>{(e.currentTarget as HTMLImageElement).style.display='none'}} />
            <p className="font-bold text-[13px] mt-3">{x.route}</p>
            <p className="text-[11px] opacity-60">{x.time} • {x.pax}</p>
            <div className="text-[11px] mt-2 space-y-1"><p className="text-green-600">✓ Flight tracking ✓ Meet & Greet</p><p className="text-green-600">✓ Free cancellation ✓ Water + AC</p></div>
            <div className="mt-3 flex items-end justify-between"><div><p className="text-[11px] line-through opacity-50">Hotel taxi ${x.oldPrice}</p><p className="text-[#FF7A00] font-black text-[18px]">${x.price} <span className="text-[11px] font-normal text-black/60">Save ${x.oldPrice-x.price}</span></p></div><a href={waLink} className="bg-[#0A2342] text-white text-[11px] px-3 py-2 rounded-full font-bold">Check →</a></div>
          </div>
        ))}
      </div>
      {/* TRUST BAR 3 - After Pricing Cards */}
      <div className="mt-6 bg-[#F5F7FA] border rounded-xl px-4 py-3 flex flex-wrap justify-center gap-6 text-[11px] font-medium">
        <span>🛡️ All prices fixed — no extra charge even if flight delayed</span>
        <span>💬 Instant WhatsApp confirmation in 2 mins</span>
        <span>⭐ 4.9 Google • 🟢 TripAdvisor Travelers' Choice • 1200+ reviews</span>
      </div>
    </section>

    {/* SECTION 3 - WHY HERO */}
    <section className="px-4 md:px-12 py-10 bg-[#FFFBF5]">
      <h2 className="text-center font-black text-[22px]">Why Smart Travelers Never Take Hotel Taxis</h2>
      <div className="grid md:grid-cols-3 gap-4 mt-6">
        <div className="bg-white p-4 rounded-xl border"><p className="font-bold text-sm">🛬 Never Stranded</p><p className="text-xs opacity-70 mt-2">We track your flight. Driver waits 2h FREE even if delayed.</p></div>
        <div className="bg-white p-4 rounded-xl border"><p className="font-bold text-sm">💰 Fixed Price Guarantee</p><p className="text-xs opacity-70 mt-2">What you see is what you pay. No night charge.</p></div>
        <div className="bg-white p-4 rounded-xl border"><p className="font-bold text-sm">💬 Real Human on WhatsApp 2 Mins</p><p className="text-xs opacity-70 mt-2">Live support 24/7. Driver photo + plate sent before arrival.</p></div>
      </div>
      <div className="mt-6 bg-white border rounded-xl overflow-hidden"><div className="grid md:grid-cols-3 text-xs"><div className="p-3 bg-gray-50 font-bold border-b">Feature</div><div className="p-3 bg-gray-50 font-bold border-b">Hotel Taxi</div><div className="p-3 bg-[#0A2342] text-white font-bold border-b">HERO Shuttle</div><div className="p-3 border-b">Price</div><div className="p-3 border-b">$60-80 + extras</div><div className="p-3 border-b font-bold text-[#FF7A00]">$25 fixed</div><div className="p-3 border-b">Flight tracking</div><div className="p-3 border-b">❌ No</div><div className="p-3 border-b">✅ Yes</div><div className="p-3 border-b">Wait if delayed</div><div className="p-3 border-b">❌ $20/hour</div><div className="p-3 border-b">✅ 2h free</div><div className="p-3">Support</div><div className="p-3">❌ Reception</div><div className="p-3">✅ WhatsApp 24/7</div></div></div>

      {/* TRUST BAR 4 - After Comparison Table + Live Ticker */}
      <div className="mt-6">
        <div className="flex flex-wrap justify-center gap-2">
          <p className="text-[11px] bg-black text-white inline-flex px-3 py-1 rounded-full animate-pulse">🔴 Live: {liveMsg}</p>
          <span className="text-[11px] bg-white border px-3 py-1 rounded-full">✅ Book Now, Pay Later</span>
          <span className="text-[11px] bg-white border px-3 py-1 rounded-full">🔒 Free cancellation 24h</span>
          <span className="text-[11px] bg-white border px-3 py-1 rounded-full">💳 Pay driver or online</span>
          <span className="text-[11px] bg-white border px-3 py-1 rounded-full">🟢 TripAdvisor Verified</span>
        </div>
        <div className="mt-3 bg-white border-2 border-[#FF8A1A]/30 rounded-2xl p-3 md:p-4 flex flex-col md:flex-row gap-3 items-center shadow-lg">
          <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-2 w-full">
            <select value={to} onChange={e=>setTo(e.target.value)} className="border rounded-lg px-3 py-3 text-xs"><option>Stone Town</option><option>Nungwi</option><option>Paje</option><option>Kendwa</option></select>
            <input type="date" value={date} onChange={e=>setDate(e.target.value)} className="border rounded-lg px-3 py-3 text-xs" />
            <select value={pax} onChange={e=>setPax(e.target.value)} className="border rounded-lg px-3 py-3 text-xs"><option>2 Guests</option><option>4 Guests</option><option>7 Guests</option></select>
            <div className="border rounded-lg px-3 py-3 text-xs bg-[#F5F7FA] font-bold animate-pulse">TOTAL: ${totalPrice} Fixed</div>
          </div>
          <a href={waLink} className="w-full md:w-auto bg-[#FF8A1A] text-white px-8 py-3 rounded-xl text-sm font-black text-center hover:scale-105 transition">Book on WhatsApp — 2 Mins Confirm →</a>
        </div>
      </div>
    </section>

    {/* NEW SECTION 3.5 - HAPPY GUESTS + TRIPADVISOR FOCUS */}
    <section id="reviews" className="bg-white px-4 md:px-12 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
        <div><h2 className="font-black text-[22px] leading-tight">Real Guests, Real Moments 📸</h2><p className="text-[12px] opacity-60">Join 1,200+ travelers who skipped the taxi queue last month</p></div>
        <div className="flex gap-2 text-[10px] font-bold flex-wrap">
          <span className="bg-[#00AF87]/10 text-[#00AF87] border border-[#00AF87]/20 px-3 py-1.5 rounded-full">🟢 TripAdvisor 4.9 Travelers' Choice</span>
          <span className="bg-blue-50 text-blue-700 border px-3 py-1.5 rounded-full">⭐ Google 4.9 (412)</span>
          <span className="bg-orange-50 text-orange-700 border px-3 py-1.5 rounded-full">🔵 Viator 5.0</span>
        </div>
      </div>
      <div className="grid md:grid-cols-12 gap-5 mt-6">
        <div className="md:col-span-5 bg-[#0A2342] text-white rounded-2xl p-5 relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-[#FF8A1A] text-[10px] px-3 py-1 rounded-bl-xl font-bold">{happyGuests[reviewIndex].platform} Verified</div>
          <p className="text-[11px] opacity-60 mt-2">⭐⭐⭐⭐⭐ {happyGuests[reviewIndex].rating} • {happyGuests[reviewIndex].platform}</p>
          <p className="text-[14px] leading-relaxed mt-3 font-medium">"{happyGuests[reviewIndex].text}"</p>
          <div className="mt-4 flex items-center gap-3"><img src={happyGuests[reviewIndex].img} alt="guest" className="w-10 h-10 rounded-full object-cover bg-white/20" onError={e=>{(e.currentTarget as HTMLImageElement).src='/hero.jpg'}} /><div><p className="font-bold text-[12px]">{happyGuests[reviewIndex].name}</p><p className="text-[11px] opacity-60">📍 {happyGuests[reviewIndex].country} • 2 days ago</p></div></div>
          <div className="mt-5 flex gap-1.5">{happyGuests.map((_,i)=><div key={i} className={`h-1 rounded-full transition-all ${i===reviewIndex?'w-6 bg-[#FF8A1A]':'w-3 bg-white/30'}`}></div>)}</div>
          <a href="https://tripadvisor.com" target="_blank" className="mt-5 inline-flex text-[11px] bg-white text-black px-4 py-2 rounded-full font-bold">See all 324 reviews on TripAdvisor →</a>
        </div>
        <div className="md:col-span-7 grid grid-cols-3 gap-3">
          {happyGuests.map((g,i)=>(
            <div key={i} className="group relative h-[140px] md:h-[160px] rounded-2xl overflow-hidden bg-gray-100 border">
              <img src={g.img} alt={g.name} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" onError={e=>{(e.currentTarget as HTMLImageElement).src='/hero.jpg'}} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent"></div>
              <div className="absolute bottom-0 p-2 text-white"><p className="text-[11px] font-bold leading-tight">{g.name}</p><p className="text-[9px] opacity-80">{g.country} • {g.platform} {g.rating}</p></div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-6 bg-[#FFFBF5] border border-dashed border-[#FF8A1A]/30 rounded-xl px-4 py-3 flex flex-wrap justify-center md:justify-between items-center gap-3 text-[11px]">
        <span>📸 Have you traveled with us? Tag <b>@heroshuttle.zanzibar</b> — we feature best photos + you get $5 off next ride</span>
        <a href={waLink} className="bg-[#0A2342] text-white px-4 py-2 rounded-full font-bold text-[11px]">Share Your Photo →</a>
      </div>
    </section>

    {/* SECTION 4 TOURS */}
    <section id="tours" className="bg-[#0A2342] py-10 px-4 md:px-12">
      <h2 className="text-center font-black text-white text-[22px]">Complete Your Zanzibar Experience</h2>
      <p className="text-center text-white/60 text-xs">Tours our guests love — Combo & Save 20%</p>
      <div className="flex justify-center gap-2 mt-4 flex-wrap">
        {["Popular","Half Day","Full Day"].map(t=>(
          <button key={t} onClick={()=>setTourTab(t)} className={`px-4 py-1.5 rounded-full text-xs border transition-all ${tourTab===t?"bg-white text-black scale-105":"bg-white/10 text-white hover:bg-white/20"}`}>{t}</button>
        ))}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
        {tours.filter(tt=>tourTab==="Popular" || tt.tag===tourTab).map((tour,i)=>(
          <div key={i} className="bg-white rounded-xl overflow-hidden p-1.5 hover:-translate-y-1 hover:shadow-xl transition-all">
            <div className="h-28 bg-gray-200 rounded-lg relative"><span className="absolute top-1 left-1 bg-[#FF8A1A] text-white text-[9px] px-2 py-0.5 rounded-full">{tour.combo}</span><span className="absolute bottom-1 left-1 bg-black/70 text-white text-[9px] px-2 py-0.5 rounded-full animate-pulse">● 12 booked today</span></div>
            <p className="font-bold text-[12px] mt-2 px-1">{tour.name}</p>
            <p className="text-[10px] px-1">⭐ {tour.rating}</p>
            <div className="flex justify-between items-center px-1 pb-1 mt-1"><p className="text-[#FF7A00] font-black text-[13px]">{tour.price} <span className="line-through text-[10px] text-black/40">{tour.old}</span></p><a href={waLink} className="text-[10px] bg-[#0A2342] text-white px-2 py-1 rounded-full">Book Combo</a></div>
          </div>
        ))}
      </div>
    </section>

    <section id="faq" className="bg-[#F5F7FA] px-4 md:px-12 py-8">
      <h3 className="font-black text-center">Frequently Asked Questions</h3>
      <div className="max-w-3xl mx-auto mt-5 space-y-2">
        {faqs.map((f,i)=>(
          <div key={i} className="bg-white border rounded-xl"><button onClick={()=>setOpenFaq(openFaq===i?null:i)} className="w-full text-left px-4 py-3 font-bold text-xs flex justify-between"><span>{f.q}</span><span>{openFaq===i?"-":"+"}</span></button>{openFaq===i && <div className="px-4 pb-3 text-[11px] opacity-70 flex justify-between gap-4"><span>{f.a}</span><a href={waLink} className="text-[#FF8A1A] font-bold shrink-0">Book Now →</a></div>}</div>
        ))}
      </div>
    </section>

    {/* FINAL CTA + TRUST BAR 5 */}
    <section className="bg-[#FF8A1A] px-4 md:px-12 py-10 text-center text-white relative">
      <h2 className="font-black text-[24px] leading-tight">Your Driver Is Ready — Are You?</h2>
      <p className="text-[12px] mt-2 opacity-90">Join 1,200+ travelers who skipped the airport taxi queue last month</p>
      <div className="mt-4 flex flex-col md:flex-row justify-center gap-3">
        <a href={waLink} className="bg-white text-[#FF8A1A] px-8 py-3 rounded-full font-black text-sm hover:scale-105 transition">Book on WhatsApp Now — 2 Mins Confirm</a>
        <a href="tel:+255777123456" className="bg-black text-white px-8 py-3 rounded-full font-bold text-sm">Call +255 777 123 456</a>
      </div>
      <p className="mt-4 text-[11px] bg-black/20 inline-flex px-4 py-1 rounded-full animate-pulse">⏳ Price locked for next {Math.floor(timer/60)}:{String(timer%60).padStart(2,'0')} — Book now to keep ${totalPrice} price</p>
      {/* TRUST BAR 5 */}
      <div className="mt-6 bg-white text-black rounded-xl py-3 px-4 flex flex-wrap justify-center gap-4 md:gap-6 text-[10px] max-w-3xl mx-auto font-bold">
        <span>💳 Visa</span><span>Mastercard</span><span>PayPal</span><span>⭐ Google 4.9</span><span>🟢 TripAdvisor Travelers' Choice</span><span>🔵 Viator 5.0</span><span>🔒 Secure Payment</span>
      </div>
    </section>

    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t px-3 py-2 flex gap-2 z-50">
      <a href={waLink} className="flex-1 bg-[#25D366] text-white text-xs font-bold py-3 rounded-full text-center">💬 WhatsApp Us</a>
      <a href={waLink} className="flex-1 bg-[#FF8A1A] text-white text-xs font-bold py-3 rounded-full text-center">Book Now ${totalPrice}</a>
    </div>

    <Footer/>
    <style>{`@keyframes fadeIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}`}</style>
  </main>
  )
}