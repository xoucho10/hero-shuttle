"use client"
import { useEffect } from "react"
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function Page(){
 const waNumber = "255773628792"
 const devNumber = "256700568634"

 useEffect(() => {
  const init = async () => {
    if (typeof window === 'undefined') return
    const L = await import('leaflet')
    if (!document.getElementById('leaflet-css')) {
      const link = document.createElement('link')
      link.id = 'leaflet-css'
      link.rel = 'stylesheet'
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'
      document.head.appendChild(link)
    }
    // @ts-ignore
    delete (L.Icon.Default.prototype as any)._getIconUrl
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
    })
    const el = document.getElementById('about-map')
    if (!el || (el as any)._leaflet_id) return
    const map = L.map(el, { center: [-6.165, 39.20], zoom: 10, zoomControl: false })
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '© OSM', maxZoom: 18 }).addTo(map)
    const points = [
      { name:"Stone Town - HERO Base", pos:[-6.1659, 39.199] as [number,number], label:"Base" },
      { name:"Airport ZNZ", pos:[-6.1285, 39.2242] as [number,number], label:"Airport" },
      { name:"Nungwi / Kendwa Team", pos:[-5.725, 39.294] as [number,number], label:"North" },
      { name:"Paje / Jambiani Team", pos:[-6.266, 39.525] as [number,number], label:"South-East" },
    ]
    points.forEach(p=>{
      const html = `<div style="background:#0A2342; color:white; padding:5px 10px; border-radius:20px; font-weight:800; font-size:10px; border:2px solid white; box-shadow:0 4px 12px rgba(0,0,0,0.2); white-space:nowrap">${p.label} • ${p.name}</div>`
      const icon = L.divIcon({ html, className:'', iconSize:[160,28], iconAnchor:[80,14] })
      L.marker(p.pos, { icon }).addTo(map)
    })
    setTimeout(()=>{ map.invalidateSize() }, 400)
  }
  init()
 }, [])

 return (
 <main className="bg-[#F8FAFF] overflow-x-hidden">
 <Header/>

 {/* HERO - BRIGHTER */}
 <section className="bg-white relative overflow-hidden border-b border-[#0A2342]/5">
   <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#FF8A1A]/8 rounded-full blur-[100px]"></div>
   <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#EAF2FF] rounded-full blur-[80px]"></div>
   <div className="relative px-6 md:px-12 py-12 md:py-20">
     <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
       <div>
         <span className="bg-[#0A2342] text-white text-[10px] px-4 py-1.5 rounded-full font-black tracking-widest">STONE TOWN BASED • LOCAL TEAM • LICENSED • 8 YEARS</span>
         <h1 className="font-black text-[32px] md:text-[46px] leading-[1] mt-6 text-[#0A2342]">We live here.<br/>We drive here.<br/><span className="text-[#FF8A1A]">We are HERO.</span></h1>
         <p className="text-[14px] text-[#0A2342]/70 mt-5 leading-[1.7]">
           HERO is not an Arusha agency forwarding your booking. We are a small team of drivers who live in Zanzibar — Stone Town, Nungwi, Paje. We know which hotel gate is behind the market, what time the tide covers the road to The Rock, and which boat at Fumba actually leaves on time for Safari Blue.
         </p>
         <p className="text-[14px] text-[#0A2342]/70 mt-4 leading-[1.7]">
           We started HERO for one simple reason: transfers and tours were priced per person when they should be per car. A family of four was being charged $240 for a taxi that costs us $40 to run. So we fixed it. <b className="text-[#0A2342]">One price per car, up to 6 people, same car, same price.</b>
         </p>
         <div className="mt-8 flex gap-3 flex-wrap">
           <a href={`https://wa.me/${waNumber}?text=Hi HERO! I read your About page, I have a question about my trip`} target="_blank" className="bg-[#0A2342] text-white px-7 py-3.5 rounded-full font-black text-[13px] hover:bg-black transition">Chat on WhatsApp</a>
           <a href="/#transfers" className="bg-white border border-[#0A2342]/10 text-[#0A2342] px-7 py-3.5 rounded-full font-black text-[13px]">See Transfers per CAR</a>
         </div>
       </div>
       <div className="bg-white rounded-[24px] p-3 shadow-[0_20px_60px_rgba(10,35,66,0.08)] border border-[#0A2342]/5">
         <div className="bg-[#F8FAFF] rounded-[16px] h-[380px] overflow-hidden relative">
           <img src="/team.jpg" alt="HERO Team Zanzibar" className="w-full h-full object-cover hidden" onError={(e)=>{ (e.target as any).style.display='none' }} />
           <div className="absolute inset-0 p-6 flex flex-col justify-end bg-gradient-to-t from-[#0A2342]/90 via-[#0A2342]/20 to-transparent">
             <div className="bg-white rounded-[14px] p-4">
               <p className="font-black text-[12px] text-[#0A2342]">Our promise, in one line</p>
               <p className="text-[12px] text-[#0A2342]/70 mt-1 leading-relaxed">Fixed price per car. Pay after the trip. No advance. No surprise transport fees. If we say $40 per car Airport to Paje, it's $40 for the car — 1 to 6 people, same price.</p>
             </div>
           </div>
           <div className="p-8 text-center">
             <p className="text-[40px]">🚐</p>
             <p className="font-black text-[13px] mt-2 text-[#0A2342]">Real team, not stock</p>
             <p className="text-[11px] text-[#0A2342]/50 mt-2 leading-relaxed">We are adding our real driver photos here — Ali, Juma, Hassan — all based in Zanzibar. If you don't see a photo yet, it's because we prefer to show our actual team, not a downloaded image.</p>
           </div>
         </div>
       </div>
     </div>
   </div>
 </section>

 {/* STATS - CLEAN */}
 <section className="bg-white border-b border-[#0A2342]/5">
   <div className="max-w-6xl mx-auto px-6 md:px-12 py-6 grid grid-cols-2 md:grid-cols-4 gap-6">
     <div><p className="font-black text-[26px] text-[#0A2342]">$25 - $50</p><p className="text-[11px] text-[#0A2342]/60 leading-tight mt-1">Airport transfers per car, up to 6 pax, same price, 24/7</p></div>
     <div><p className="font-black text-[26px] text-[#0A2342]">$130 - $250</p><p className="text-[11px] text-[#0A2342]/60 leading-tight mt-1">Tours per car, not per person — boat, guide, entrance included</p></div>
     <div><p className="font-black text-[26px] text-[#0A2342]">Pay After</p><p className="text-[11px] text-[#0A2342]/60 leading-tight mt-1">No advance. You pay the driver after each trip. Free cancel 24h</p></div>
     <div><p className="font-black text-[26px] text-[#0A2342]">Local</p><p className="text-[11px] text-[#0A2342]/60 leading-tight mt-1">Drivers live here. Licensed vehicles, insured, AC, child seat free</p></div>
   </div>
 </section>

 {/* WHY PER CAR - EDUCATIVE */}
 <section className="px-6 md:px-12 py-14 bg-[#F8FAFF]">
   <div className="max-w-6xl mx-auto grid md:grid-cols-12 gap-10">
     <div className="md:col-span-7">
       <span className="bg-[#FFF3E0] border border-[#FF8A1A]/20 text-[#FF8A1A] text-[10px] px-4 py-1.5 rounded-full font-black tracking-widest">WHY WE PRICE PER CAR</span>
       <h2 className="font-black text-[28px] md:text-[34px] mt-4 leading-[1.1] text-[#0A2342]">Most Zanzibar prices are per person. Ours are per car. Here is why that matters.</h2>
       <div className="mt-6 space-y-5 text-[13.5px] leading-[1.8] text-[#0A2342]/75">
         <p>At the airport, you need a car, not a seat. Whether you are 2 or 5, the car still drives once from ZNZ to Nungwi. Fuel is the same. Driver is the same. So we charge for the car.</p>
         <p><b className="text-[#0A2342]">Example:</b> Airport to Nungwi. Other sites: $45 per person x 4 = $180. HERO: $40 per car for up to 6 people. Same Alphard, same AC, same 1h15m drive. You save $140 on that one transfer alone.</p>
         <p>For tours it's the same. Prison Island + Nakupenda needs one boat. The boat doesn't get bigger if you are 4. Our price is $250 per car — up to 6 people can share that boat. That includes boat, captain, guide, entrance fees, fruit and water. No extra transport fee added later.</p>
         <p>We show transport separately because it is honest. If you stay in Paje and you book Mnemba in the north, there is a real distance — 1h20m. We show that as $40 per car transfer + $180 per car tour = $220 total per car. Not $30 per person hidden plus $40 extra when you arrive.</p>
         <p className="text-[12px] bg-white border border-[#0A2342]/5 rounded-[12px] p-4">If you book two tours in the same area — say Salaam Cave + Kuza Cave, both in Paje — we charge transport once, not twice. That's how a local would do it.</p>
       </div>
     </div>
     <div className="md:col-span-5 space-y-4">
       <div className="bg-white rounded-[20px] p-6 border border-[#0A2342]/5 shadow-sm">
         <p className="font-black text-[13px] text-[#0A2342]">What you actually get</p>
         <ul className="mt-4 space-y-3 text-[12px] text-[#0A2342]/70 leading-relaxed">
           <li className="flex gap-2"><span className="text-[#0A2342] font-black">•</span> Toyota Noah / Alphard, 7-seater, we limit to 4 + luggage for comfort, AC, licensed Zanzibar tourism plates</li>
           <li className="flex gap-2"><span className="text-[#0A2342] font-black">•</span> Child seat 0-4 years + booster free — just tell us when you book</li>
           <li className="flex gap-2"><span className="text-[#0A2342] font-black">•</span> 500ml water per person, flight tracking, 60 min free wait after landing</li>
           <li className="flex gap-2"><span className="text-[#0A2342] font-black">•</span> Meet & greet with name sign at arrivals, driver photo + phone + plate sent on WhatsApp before you land</li>
           <li className="flex gap-2"><span className="text-[#0A2342] font-black">•</span> Pay after in USD, TZS, Euro, M-Pesa — receipt on WhatsApp</li>
         </ul>
       </div>
       <div className="bg-[#0A2342] rounded-[20px] p-6 text-white">
         <p className="font-black text-[13px]">We don't do these things</p>
         <ul className="mt-4 space-y-2.5 text-[12px] opacity-80 leading-relaxed">
           <li>✕ Night surcharge, weekend surcharge, bargaining at arrivals</li>
           <li>✕ Per person price when it's a car or a boat</li>
           <li>✕ Taking advance payment before you have even landed</li>
           <li>✕ Showing fake reviews or fake prices to rank</li>
         </ul>
       </div>
     </div>
   </div>
 </section>

 {/* MAP */}
 <section className="px-6 md:px-12 py-12 bg-white border-y border-[#0A2342]/5">
   <div className="max-w-[900px] mx-auto">
     <div className="text-center mb-6">
       <h2 className="font-black text-[22px] md:text-[28px] text-[#0A2342]">Based in Stone Town, teams where you stay</h2>
       <p className="text-[12px] text-[#0A2342]/60 mt-2 max-w-[600px] mx-auto">We don't drive from Arusha. Our drivers live in the areas they serve. That is why we know the last bumpy 5km to Nungwi, the low tide time for The Rock, and the gate number at your hotel in Paje without calling.</p>
     </div>
     <div className="bg-white border border-[#0A2342]/10 rounded-[24px] overflow-hidden shadow-[0_8px_30px_rgba(10,35,66,0.06)]">
       <div id="about-map" className="w-full h-[380px] md:h-[420px] z-0" style={{ background:'#E8EEF5', minHeight:'380px' }}></div>
       <div className="px-4 py-2.5 flex justify-between items-center bg-[#0A2342] text-white text-[10px]">
         <span>© OpenStreetMap • Local drivers, not mainland</span>
         <span className="opacity-60 hidden md:inline">Stone Town base + North + South-East teams</span>
       </div>
     </div>
   </div>
 </section>

 {/* TEAM - SIMPLE & HONEST */}
 <section className="px-6 md:px-12 py-14 bg-[#F8FAFF]">
   <div className="max-w-6xl mx-auto">
     <div className="max-w-[700px]">
       <h2 className="font-black text-[26px] md:text-[32px] text-[#0A2342] leading-tight">A small team. That's the point.</h2>
       <p className="text-[13px] text-[#0A2342]/60 mt-3 leading-relaxed">We are not a big call center. When you message +255 773 628 792, you talk to someone in Stone Town who can actually call the driver. We know our drivers by name, and you will too.</p>
     </div>
     <div className="grid md:grid-cols-3 gap-5 mt-8">
       {[
         { role:"Operations — Stone Town", name:"HERO Lead", detail:"Based in Stone Town. Manages bookings, flight tracking, driver assignment. Replies on WhatsApp usually in 5-10 minutes." },
         { role:"North — Nungwi / Kendwa", name:"North Team", detail:"Lives in Nungwi. Knows every hotel gate in the north, sunset dhow captains, horse riding beach, turtle aquarium." },
         { role:"South-East — Paje / Jambiani", name:"South-East Team", detail:"Lives in Paje. Kite instructors, Salaam Cave, Kuza Cave, quad bike routes, village tour." },
         { role:"South — Kizimkazi / Fumba", name:"South Team", detail:"Lives near Kizimkazi. Dolphin morning boats, Safari Blue boats from Fumba, Jozani forest." },
         { role:"East — Kiwengwa / Pongwe", name:"East Team", detail:"Lives in Kiwengwa. The Rock Restaurant tide times, Blue Lagoon, spice farms in the area." },
         { role:"Support — WhatsApp 24/7", name:"On chat", detail:"Driver photo, name, plate sent before landing. Receipt after trip. Free cancellation 24h." },
       ].map((m,i)=>(
         <div key={i} className="bg-white rounded-[18px] p-5 border border-[#0A2342]/5">
           <p className="text-[10px] font-black tracking-widest text-[#FF8A1A]">{m.role}</p>
           <p className="font-black text-[13px] mt-2 text-[#0A2342]">{m.name}</p>
           <p className="text-[12px] text-[#0A2342]/60 mt-2 leading-relaxed">{m.detail}</p>
         </div>
       ))}
     </div>
     <p className="text-[11px] text-[#0A2342]/40 mt-6 text-center">We are adding real photos of our drivers as we get proper portraits — we prefer real over stock.</p>
   </div>
 </section>

 {/* CTA */}
 <section className="bg-[#0A2342] px-6 md:px-12 py-14 text-center">
   <div className="max-w-3xl mx-auto text-white">
     <h2 className="font-black text-[30px] md:text-[40px] leading-[1]">If you want a fixed price per car, <br/><span className="text-[#FF8A1A]">not per person, talk to us.</span></h2>
     <p className="text-[13px] opacity-70 mt-4 leading-relaxed">Tell us where you land, where you stay, and what you want to do. We will give you one total per car — no hidden transport later — and you pay after each trip.</p>
     <div className="mt-8 flex justify-center gap-3 flex-wrap">
       <a href={`https://wa.me/${waNumber}?text=Hi HERO! I read your About page - my hotel is...`} target="_blank" className="bg-[#FF8A1A] px-8 py-4 rounded-full font-black text-[13px]">Chat on WhatsApp — +255 773 628 792</a>
       <a href="/#transfers" className="bg-white text-[#0A2342] px-8 py-4 rounded-full font-black text-[13px]">See Transfers per CAR</a>
     </div>
   </div>
 </section>

 <Footer/>
 <div className="bg-[#0A2342] border-t border-white/10 px-6 py-5 text-center text-[11px] text-white/50">
   © 2026 HERO Shuttle & Tours • Stone Town, Zanzibar • Fixed per car pricing • Pay after trip • <a href={`https://wa.me/${devNumber}?text=Hi T256 Group LTD!`} className="underline decoration-[#FF8A1A]">Developed by T256 Group LTD</a>
 </div>
 </main>
 )
}