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
    const map = L.map(el, { center: [-6.165, 39.20], zoom: 10, zoomControl: true })
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '© OSM', maxZoom: 18 }).addTo(map)
    const points = [
      { name:"HERO Base - Stone Town", pos:[-6.1659, 39.199] as [number,number], label:"Base" },
      { name:"Airport ZNZ", pos:[-6.1285, 39.2242] as [number,number], label:"Airport" },
      { name:"Nungwi Team", pos:[-5.725, 39.294] as [number,number], label:"North" },
      { name:"Paje Team", pos:[-6.266, 39.525] as [number,number], label:"South-East" },
    ]
    points.forEach(p=>{
      const html = `<div style="background:#0A2342; color:white; padding:4px 8px; border-radius:20px; font-weight:900; font-size:10px; border:2px solid white; box-shadow:0 3px 10px rgba(0,0,0,0.3)">${p.label} • ${p.name}</div>`
      const icon = L.divIcon({ html, className:'', iconSize:[150,24], iconAnchor:[75,12] })
      L.marker(p.pos, { icon }).addTo(map)
    })
    setTimeout(()=>{ map.invalidateSize() }, 400)
  }
  init()
 }, [])

 return (
 <main className="bg-[#F5F7FA] overflow-x-hidden">
 <Header/>

 {/* HERO */}
 <section className="bg-[#0A2342] relative overflow-hidden">
   <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#FF8A1A]/10 rounded-full blur-[120px]"></div>
   <div className="relative px-6 md:px-12 py-12 md:py-20">
     <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
       <div className="text-white">
         <span className="bg-white/10 border border-white/10 text-[10px] px-4 py-1.5 rounded-full font-black tracking-widest">ABOUT HERO SHUTTLE & TOURS • STONE TOWN BASED • LOCAL TEAM • LICENSED</span>
         <h1 className="font-serif font-black text-[32px] md:text-[52px] leading-[0.9] mt-6">We Are HERO<br/><span className="text-[#FF8A1A]">Local Team From Stone Town, Not Arusha</span></h1>
         <p className="text-[14px] opacity-80 mt-5 leading-relaxed">
           HERO Shuttle & Tours is Stone Town based local team. Drivers live here in Zanzibar, not Arusha or Dar es Salaam. We know every hotel gate, every bumpy last 5km to Nungwi, every Jozani monkey crossing time, every low tide time for The Rock Restaurant, every boat captain at Fumba for Safari Blue, every spice farm mama.
           <br/><br/>
           We started because hotel taxis charge $70-$90 per vehicle Airport to Nungwi, brokers at arrivals charge $50+ after bargaining, and tours hide transport fee $15-$60. We made fixed per vehicle transfers $15-$40 and per person tours $15-$90 + transparent transport fee per vehicle based on hotel area. Pay driver directly after trip, no advance, free cancellation 24h.
         </p>
         <div className="mt-8 flex gap-3 flex-wrap">
           <a href={`https://wa.me/${waNumber}?text=Hi HERO! I want to know more about your team`} target="_blank" className="bg-[#FF8A1A] px-7 py-3.5 rounded-full font-black text-[13px]">💬 Chat with HERO on WhatsApp</a>
           <a href="/airport-transfers" className="bg-white text-[#0A2342] px-7 py-3.5 rounded-full font-black text-[13px]">🚕 See Airport Transfers Map</a>
         </div>
       </div>
       <div className="bg-white rounded-[24px] p-4 shadow-[0_20px_60px_rgba(0,0,0,0.2)]">
         <div className="bg-[#F5F7FA] rounded-[16px] h-[320px] flex items-center justify-center text-center p-6">
           <div>
             <p className="text-[48px]">👨‍✈️</p>
             <p className="font-black text-[14px] mt-2">HERO Team Photo Placeholder</p>
             <p className="text-[11px] opacity-60 mt-2">Add team photo at /public/team.jpg<br/>Drivers: Ali, Juma, Hassan, etc.<br/>Base: Stone Town, living in Zanzibar<br/>Not stock - real team when guests come</p>
             <div className="mt-4 grid grid-cols-2 gap-2 text-[10px] text-left">
               <div className="bg-white rounded-[10px] p-2.5"><p className="font-black">Licensed</p><p className="opacity-60">Zanzibar Tourism licensed operator, insured vehicles</p></div>
               <div className="bg-white rounded-[10px] p-2.5"><p className="font-black">Local</p><p className="opacity-60">Drivers live in Zanzibar, know every hotel gate</p></div>
               <div className="bg-white rounded-[10px] p-2.5"><p className="font-black">Fixed Price</p><p className="opacity-60">$15-$40 per vehicle transfers, $15-$90 tours + transport transparent</p></div>
               <div className="bg-white rounded-[10px] p-2.5"><p className="font-black">Pay After</p><p className="opacity-60">Pay driver directly after trip USD/TZS/Euro/M-Pesa, no advance</p></div>
             </div>
           </div>
         </div>
         <p className="text-[10px] opacity-50 mt-3 text-center">Add real team photo later - no stock, no fake - real drivers when you have team photos</p>
       </div>
     </div>
   </div>
 </section>

 {/* STATS - NO FAKE */}
 <section className="bg-white border-b">
   <div className="max-w-6xl mx-auto px-6 md:px-12 py-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
     <div><p className="font-black text-[28px] text-[#0A2342]">38</p><p className="text-[11px] opacity-60">Tours & Excursions - Everything people do in Zanzibar</p></div>
     <div><p className="font-black text-[28px] text-[#0A2342]">$15-$40</p><p className="text-[11px] opacity-60">Airport transfers per vehicle up to 4 pax - fixed 24/7</p></div>
     <div><p className="font-black text-[28px] text-[#0A2342]">4 Areas</p><p className="text-[11px] opacity-60">North, South, East, West teams - local drivers live here</p></div>
     <div><p className="font-black text-[28px] text-[#0A2342]">Pay After</p><p className="text-[11px] opacity-60">Pay driver directly after trip - no advance - free cancel 24h</p></div>
   </div>
 </section>

 {/* STORY + MISSION */}
 <section className="px-6 md:px-12 py-12 md:py-16 bg-white">
   <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">
     <div>
       <span className="bg-[#FFFBF5] border border-[#FF8A1A]/20 text-[#FF8A1A] text-[10px] px-4 py-1.5 rounded-full font-black tracking-widest">OUR STORY • WHY HERO • REAL PROBLEM WE SOLVED</span>
       <h2 className="font-serif font-black text-[26px] md:text-[32px] mt-4 leading-[1.05]">Why We Started HERO - Real Problem in Zanzibar</h2>
       <div className="mt-5 space-y-4 text-[12.5px] leading-relaxed opacity-80">
         <p><b>Problem 1: Airport transfers overpriced.</b> Abeid Amani Karume Airport is 6km from Stone Town and 48-58km from beach hotels. Hotel taxis charge $70-$90 per car. Brokers at arrivals hall charge $50+ after 10 min bargaining. Tourist tired after long flight, no data, pays. We are Stone Town based, fixed per vehicle: Stone Town $15, East Coast Paje $35, North Nungwi $40 per vehicle up to 4 pax = $3.75 pp when 4 share. Same price day & night, flight tracked, 60 min free wait, meet & greet with name sign, AC Toyota Noah/Alphard, child seat free, pay driver directly after trip in USD/TZS/Euro/M-Pesa. No advance.</p>
         <p><b>Problem 2: Tours hide transport fee.</b> Many Zanzibar tour websites show only per person tour price $22-$85 but hide transport fee $15-$60 per vehicle. Tourist books tour $30, then operator says transport from Nungwi to Jozani $40 extra. Total becomes $70, not $30. Tourist leaves bad review. We show both transparent: tours $15-$90 pp + transport fee per vehicle based on hotel area + pax division. Same area as hotel = $15 vehicle, nearby = $20-30, far opposite island = $40-60. If you select 2 tours in same area (e.g., Salaam Cave + Kuza Cave both South-East Paje), transport charged once, not twice. Combo saves transport fee. User stays longer on page, dwell time increases, SEO boost, trust increases, bookings increase.</p>
         <p><b>Problem 3: Drivers not local, don't know hotel gates.</b> Many operators are Arusha based, driver comes from mainland, doesn't know Zanzibar hotel gates, last 5km bumpy to Nungwi, Jozani monkey crossing time, low tide time for The Rock Restaurant, boat captain at Fumba for Safari Blue, spice farm mama. Our drivers live here in Stone Town, Bububu, Nungwi, Paje. They know every gate, every shortcut, every police check, every best time.</p>
       </div>
     </div>
     <div className="space-y-4">
       <div className="bg-[#F5F7FA] rounded-[20px] p-6 border border-black/5">
         <p className="font-black text-[14px]">Our Fleet - Real Vehicles, Not Fake Stock</p>
         <ul className="mt-3 space-y-2 text-[12px] opacity-70 list-disc list-inside">
           <li>Toyota Noah / Alphard 7-seater, we sell max 4 pax + luggage for comfort, AC, Zanzibar tourism licensed, insured</li>
           <li>Child seat 0-4 years and booster on request free (mention when booking)</li>
           <li>Bottled water 500ml per person included in transfers</li>
           <li>Same price 24/7, no night surcharge, no weekend surcharge, no bargaining</li>
           <li>Pay driver directly after trip: USD, TZS current rate, Euro, M-Pesa, Tigo Pesa, Airtel Money - receipt via WhatsApp</li>
           <li>Flight tracking via FlightRadar - we adjust if delayed, no extra charge, 60 min free wait after landing time</li>
           <li>Meet & greet at Abeid Airport arrivals with printed name sign, we share driver photo, name, phone, plate on WhatsApp before landing</li>
         </ul>
       </div>
       <div className="bg-[#0A2342] text-white rounded-[20px] p-6">
         <p className="font-black text-[14px]">Our Values - What We Believe</p>
         <div className="mt-4 space-y-3 text-[12px] opacity-80">
           <p><b className="text-[#FF8A1A]">1. Fixed price, no bargaining:</b> Same $15-$40 per vehicle transfers, $15-$90 tours + transparent transport fee per vehicle. No surge, no bargaining, no hidden.</p>
           <p><b className="text-[#FF8A1A]">2. Local team, local knowledge:</b> Drivers live in Zanzibar, not Arusha. They know every hotel gate, every bumpy road, every tide time.</p>
           <p><b className="text-[#FF8A1A]">3. Pay after, no advance:</b> Pay driver directly after trip, no advance payment, free cancellation 24h before. Trust.</p>
           <p><b className="text-[#FF8A1A]">4. No fake reviews, no fake numbers:</b> We don't show 4.8/5 until real 5 reviews, no fake 2M views. Social display empty ready until real guests come. Better empty than fake.</p>
         </div>
       </div>
     </div>
   </div>
 </section>

 {/* MAP IN BOX - BASE + TEAMS */}
 <section className="px-6 md:px-12 py-10 bg-[#F5F7FA] border-y">
   <div className="max-w-[900px] mx-auto">
     <div className="text-center mb-4">
       <span className="bg-[#0A2342] text-white text-[10px] px-4 py-1.5 rounded-full font-black tracking-widest">HERO BASE + TEAMS LOCATION MAP • STONE TOWN BASED • LOCAL</span>
       <h2 className="font-black text-[20px] md:text-[28px] mt-3">We Are Based in Stone Town - Teams in North, South-East, South-West</h2>
       <p className="text-[11px] opacity-60 mt-2">Map in its box - max-w-900px centered - shows HERO base Stone Town + Airport + Nungwi team north + Paje team south-east - local drivers live here</p>
     </div>
     <div className="bg-white border border-gray-200 rounded-[24px] overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
       <div id="about-map" className="w-full h-[380px] md:h-[420px] z-0" style={{ background:'#E8EEF5', minHeight:'380px' }}></div>
       <div className="px-4 py-2.5 flex justify-between items-center bg-[#0A2342] text-white text-[10px]">
         <span>© OpenStreetMap • HERO base Stone Town + teams around island - local drivers</span>
         <span className="opacity-60 hidden md:inline">Map in its box - not stretching</span>
       </div>
     </div>
   </div>
 </section>

 {/* TEAM - NO FAKE PHOTOS */}
 <section className="px-6 md:px-12 py-12 md:py-16 bg-white">
   <div className="max-w-6xl mx-auto">
     <div className="text-center max-w-3xl mx-auto">
       <span className="bg-[#FFFBF5] border border-[#FF8A1A]/20 text-[#FF8A1A] text-[10px] px-4 py-1.5 rounded-full font-black tracking-widest">OUR TEAM • REAL DRIVERS • NO STOCK PHOTOS • ADD REAL LATER</span>
       <h2 className="font-serif font-black text-[26px] md:text-[36px] mt-4">Meet HERO Team - Local Drivers Who Live in Zanzibar</h2>
       <p className="text-[12px] opacity-60 mt-3">No fake stock photos. Add real team photos when you have them. Better empty than fake. Each driver has photo, name, phone, license, languages.</p>
     </div>
     <div className="grid md:grid-cols-3 gap-6 mt-10">
       {[
         { role:"Founder / Stone Town Base", name:"HERO Team Lead", lang:"English, Swahili", area:"Stone Town", exp:"Zanzibar local, knows every hotel gate" },
         { role:"North Team - Nungwi / Kendwa", name:"Driver - North", lang:"English, Swahili", area:"Nungwi / Kendwa - $15 local transfers", exp:"Lives in Nungwi, best sunset dhow captain contact, horse riding, turtle aquarium" },
         { role:"South-East Team - Paje / Jambiani", name:"Driver - South-East", lang:"English, Swahili", area:"Paje / Bwejuu - $15 local transfers", exp:"Lives in Paje, kite surfing instructor contact, Salaam Cave, Kuza Cave, quad bike, village tour" },
         { role:"South Team - Kizimkazi / Fumba", name:"Driver - South", lang:"English, Swahili", area:"Kizimkazi / Fumba - $15 local transfers", exp:"Lives in Kizimkazi, dolphin tour boat captain, Safari Blue Fumba boat captain, Jozani" },
         { role:"East Team - Kiwengwa / Pongwe", name:"Driver - East", lang:"English, Swahili", area:"Kiwengwa / Pongwe - $25 local transfers", exp:"Lives in Kiwengwa, The Rock Restaurant tide time, Blue Lagoon, spice farm" },
         { role:"Support - WhatsApp 24/7", name:"HERO Support", lang:"English, Swahili", area:"Stone Town - WhatsApp +255773628792", exp:"Replies in 5-10 min, flight tracking, driver photo name plate before landing, receipt via WhatsApp" },
       ].map((m,i)=>(
         <div key={i} className="bg-[#F5F7FA] border border-dashed border-gray-300 rounded-[20px] p-5 text-center">
           <div className="w-16 h-16 bg-white rounded-full mx-auto flex items-center justify-center text-[24px]">👨‍✈️</div>
           <p className="font-black text-[12px] mt-3">{m.role}</p>
           <p className="text-[11px] font-bold mt-1">{m.name} - Photo Add Later</p>
           <p className="text-[10px] opacity-60 mt-1">{m.lang} • {m.area}</p>
           <p className="text-[10px] opacity-50 mt-2 leading-relaxed">{m.exp}</p>
           <div className="mt-3 bg-white rounded-[10px] p-2 text-[9px] text-left border"><b>Display:</b> Real driver photo, name, phone, license will appear here</div>
         </div>
       ))}
     </div>
   </div>
 </section>

 {/* SOCIAL DISPLAY EMPTY READY */}
 <section className="px-6 md:px-12 py-12 bg-[#F5F7FA] border-t">
   <div className="max-w-6xl mx-auto">
     <div className="text-center max-w-3xl mx-auto">
       <span className="bg-[#FFFBF5] border border-dashed border-[#FF8A1A]/30 text-[#FF8A1A] text-[10px] px-4 py-1.5 rounded-full font-black">SOCIAL DISPLAY - EMPTY READY - NO FAKE - ADD REAL WHEN GUESTS COME</span>
       <h3 className="font-serif font-black text-[24px] md:text-[32px] mt-4">Follow HERO - Real Content When Guests Come</h3>
       <p className="text-[11px] opacity-60 mt-2">No fake 4.8/5, no fake 2M views. Empty ready until real.</p>
     </div>
     <div className="grid md:grid-cols-3 gap-6 mt-8">
       <div className="bg-white border-2 border-dashed border-gray-300 rounded-[20px] p-6 text-center">
         <p className="text-[24px]">📸</p>
         <p className="font-black text-[12px] mt-2">Instagram @hero.zanzibar - EMPTY READY</p>
         <p className="text-[11px] opacity-60 mt-2">No fake numbers. When guest tags you, embed post here.</p>
       </div>
       <div className="bg-[#0A2342] text-white rounded-[20px] p-6 text-center">
         <p className="text-[24px]">🎵</p>
         <p className="font-black text-[12px] mt-2">TikTok @herozanzibar - EMPTY READY</p>
         <p className="text-[11px] opacity-70 mt-2">No fake 2M views. When video goes viral, embed here.</p>
       </div>
       <div className="bg-[#FFFBF5] border-2 border-dashed border-[#FF8A1A]/30 rounded-[20px] p-6 text-center">
         <p className="text-[24px]">⭐</p>
         <p className="font-black text-[12px] mt-2">TripAdvisor + Google - EMPTY READY</p>
         <p className="text-[11px] opacity-60 mt-2">No fake 4.8/5 until real 5 reviews. Leave empty now.</p>
       </div>
     </div>
   </div>
 </section>

 {/* FINAL CTA */}
 <section className="bg-[#0A2342] px-6 md:px-12 py-12 text-center text-white">
   <h2 className="font-serif font-black text-[28px] md:text-[40px] leading-[0.95]">Want to Meet HERO Team?<br/><span className="text-[#FF8A1A]">Chat on WhatsApp +255 773 628 792</span></h2>
   <p className="text-[12px] opacity-60 mt-3">Stone Town based • Local drivers • Fixed $15-$40 per vehicle • $15-$90 tours + transport transparent • Pay driver after trip</p>
   <div className="mt-6 flex justify-center gap-3 flex-wrap">
     <a href={`https://wa.me/${waNumber}?text=Hi HERO! I read About page - I want to book`} target="_blank" className="bg-[#FF8A1A] px-8 py-4 rounded-full font-black">💬 Chat with HERO on WhatsApp</a>
     <a href="/tours" className="bg-white text-[#0A2342] px-8 py-4 rounded-full font-black">🏝️ See 38 Tours + Transport Fee</a>
     <a href="/airport-transfers" className="bg-white/10 border border-white/20 text-white px-8 py-4 rounded-full font-black">🚕 See Airport Transfers Map</a>
   </div>
 </section>

 <Footer/>
 <div className="bg-[#0A2342] border-t border-white/10 px-6 py-5 text-center text-[11px] text-white/60">
   © 2026 HERO Shuttle & Tours • Stone Town based • Local team • Licensed • Fixed price • Pay after trip • <a href={`https://wa.me/${devNumber}?text=Hi T256 Group LTD! I saw About HERO page.`} className="underline decoration-[#FF8A1A]">Developed by T256 Group LTD +256 700 568 634</a>
 </div>
 <a href={`https://wa.me/${waNumber}?text=Hi HERO! I read About page`} target="_blank" className="fixed bottom-5 right-4 w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center text-[22px] z-50 shadow-[0_12px_30px_rgba(37,211,102,0.4)]">💬</a>
 <style>{`.font-serif{font-family:Georgia,serif}`}</style>
 </main>
 )
}