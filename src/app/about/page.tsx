"use client"
import { useEffect } from "react"
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function Page(){
 const waNumber = "255773628792"

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
      { name:"Stone Town - HERO Base", pos:[-6.1659, 39.199] as [number,number], label:"Stone Town" },
      { name:"Airport ZNZ", pos:[-6.1285, 39.2242] as [number,number], label:"Airport" },
      { name:"Nungwi / Kendwa", pos:[-5.725, 39.294] as [number,number], label:"North" },
      { name:"Paje / Jambiani", pos:[-6.266, 39.525] as [number,number], label:"South-East" },
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

 {/* HERO */}
 <section className="bg-white relative overflow-hidden border-b border-[#0A2342]/5">
   <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#FF8A1A]/8 rounded-full blur-[100px]"></div>
   <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#EAF2FF] rounded-full blur-[80px]"></div>
   <div className="relative px-6 md:px-12 py-12 md:py-20">
     <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
       <div>
         <span className="bg-[#0A2342] text-white text-[10px] px-4 py-1.5 rounded-full font-black tracking-widest">LICENSED ZANZIBAR TOUR OPERATOR • STONE TOWN BASED • EST. 2018</span>
         <h1 className="font-black text-[32px] md:text-[46px] leading-[0.95] mt-6 text-[#0A2342]">We live here.<br/>We drive here.<br/><span className="text-[#FF8A1A]">We guide here.</span></h1>
         <p className="text-[14px] text-[#0A2342]/70 mt-5 leading-[1.8]">
           HERO is a local team of drivers and guides based in Stone Town, Nungwi and Paje. We were born and raised in Zanzibar, and we have been operating airport transfers, private tours and island excursions for over 8 years. From Stone Town heritage walks to Mnemba snorkeling, Safari Blue and Jozani Forest, we operate where we live.
         </p>
         <p className="text-[14px] text-[#0A2342]/70 mt-4 leading-[1.8]">
           We created HERO to make Zanzibar travel simpler and more transparent. One private vehicle for your group, one fixed price agreed before you travel, with boat fees, entrance fees and guiding included where listed. No complicated per-person calculations for your private trip.
         </p>
         <div className="mt-8 flex gap-3 flex-wrap">
           <a href={`https://wa.me/${waNumber}?text=Hi HERO! I have a question about Zanzibar tours and transfers`} target="_blank" className="bg-[#0A2342] text-white px-7 py-3.5 rounded-full font-black text-[13px] hover:bg-black transition">Chat on WhatsApp</a>
           <a href="/tours" className="bg-white border border-[#0A2342]/10 text-[#0A2342] px-7 py-3.5 rounded-full font-black text-[13px]">Explore Private Tours</a>
         </div>
         <div className="mt-6 flex items-center gap-3 text-[11px] text-[#0A2342]/60">
           <span>⭐ Google 4.9 (412 reviews)</span><span>•</span><span>TripAdvisor 5.0</span><span>•</span><span>GetYourGuide 4.8</span>
         </div>
       </div>
       <div className="bg-white rounded-[24px] p-3 shadow-[0_20px_60px_rgba(10,35,66,0.08)] border border-[#0A2342]/5">
         <div className="bg-[#F8FAFF] rounded-[16px] h-[420px] overflow-hidden relative">
           <div className="absolute inset-0 p-6 flex flex-col justify-end bg-gradient-to-t from-[#0A2342]/90 via-[#0A2342]/20 to-transparent">
             <div className="bg-white rounded-[14px] p-5 shadow-sm">
               <p className="font-black text-[12px] text-[#0A2342]">Our commitment to you</p>
               <p className="text-[12px] text-[#0A2342]/70 mt-1.5 leading-relaxed">Licensed vehicles with Zanzibar tourism plates, experienced local drivers, fixed pricing confirmed in advance, pay after your trip, and free cancellation 24 hours before. Your driver details are shared on WhatsApp before arrival.</p>
             </div>
           </div>
           <div className="p-10 text-center pt-24">
             <p className="text-[48px]">🌊</p>
             <p className="font-black text-[13px] mt-3 text-[#0A2342]">Authentic Local Experience</p>
             <p className="text-[11px] text-[#0A2342]/60 mt-3 leading-relaxed max-w-[280px] mx-auto">We know the best time to visit The Rock Restaurant at low tide, the quiet entrance to Stone Town market, and which Fumba boat leaves on time for Safari Blue. This local knowledge is what we share with our guests.</p>
           </div>
         </div>
       </div>
     </div>
   </div>
 </section>

 {/* WHY CHOOSE US - SEO & SALES */}
 <section className="px-6 md:px-12 py-16 bg-white">
   <div className="max-w-6xl mx-auto">
     <div className="max-w-[700px]">
       <span className="bg-[#EAF2FF] text-[#0A2342] text-[10px] px-4 py-1.5 rounded-full font-black tracking-widest">WHY TRAVELERS CHOOSE HERO</span>
       <h2 className="font-black text-[28px] md:text-[36px] mt-4 leading-[1.1] text-[#0A2342]">A local operator focused on comfort, transparency and authentic experiences.</h2>
       <p className="text-[13.5px] text-[#0A2342]/60 mt-4 leading-[1.7]">Whether you need a Zanzibar airport transfer to Nungwi, Paje, Jambiani or Stone Town, or you are looking for private Zanzibar tours like Prison Island, Nakupenda Sandbank, Mnemba Atoll snorkeling or Safari Blue, our team handles your entire trip locally without outsourcing.</p>
     </div>
     <div className="grid md:grid-cols-3 gap-5 mt-10">
       {[
         { title:"Local Expertise, Real Time", desc:"Our drivers live in the areas they serve. They know hotel gates in Nungwi, tide times for The Rock, and the best snorkeling spots at Mnemba. This means smoother logistics and better timing for your private tours in Zanzibar." },
         { title:"Transparent Fixed Pricing", desc:"One fixed price for your private vehicle and group up to 6 guests. Boat, guide, entrance fees and inclusions are listed clearly on each tour. No hidden transport fees added on arrival. What you see is what you pay." },
         { title:"Licensed, Safe & Comfortable", desc:"Toyota Alphard and Noah, 7-seater, AC, licensed Zanzibar tourism plates, insured, regularly serviced. Child seat and booster free on request. 500ml water per guest, flight tracking and 60 minutes free wait at Zanzibar Airport." },
         { title:"Flexibility You Can Trust", desc:"Pay after each trip in USD, TZS, Euro or M-Pesa. Free cancellation up to 24 hours before. Need to change your hotel in Zanzibar last minute? We adjust without extra charges where possible. Receipt sent on WhatsApp." },
         { title:"Private & Personal Service", desc:"All tours and transfers are private for your group only. No sharing with strangers. When you message our WhatsApp, you speak directly with our Stone Town operations team, not a call center. Driver photo, name and plate sent before landing." },
         { title:"Community & Sustainability", desc:"We are a Zanzibar owned business. We work with local boat captains in Fumba and Matemwe, local guides in Stone Town and Jozani Forest, and we support village schools on our quad and cultural tours. Your booking supports the local economy." },
       ].map((item,i)=>(
         <div key={i} className="bg-[#F8FAFF] rounded-[18px] p-6 border border-[#0A2342]/5 hover:border-[#0A2342]/15 transition">
           <p className="font-black text-[13px] text-[#0A2342]">{item.title}</p>
           <p className="text-[12.5px] text-[#0A2342]/65 mt-3 leading-[1.7]">{item.desc}</p>
         </div>
       ))}
     </div>
   </div>
 </section>

 {/* STATS */}
 <section className="bg-[#0A2342] text-white">
   <div className="max-w-6xl mx-auto px-6 md:px-12 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
     <div><p className="font-black text-[26px]">$25 - $50</p><p className="text-[11px] opacity-60 leading-tight mt-1">Zanzibar Airport transfers, private vehicle for your group, 24/7 service</p></div>
     <div><p className="font-black text-[26px]">$30 - $250</p><p className="text-[11px] opacity-60 leading-tight mt-1">Private Zanzibar tours including boat, guide and entrance fees</p></div>
     <div><p className="font-black text-[26px]">8+ Years</p><p className="text-[11px] opacity-60 leading-tight mt-1">Operating in Stone Town, Nungwi, Paje, Jambiani and Kizimkazi</p></div>
     <div><p className="font-black text-[26px]">412+ Reviews</p><p className="text-[11px] opacity-60 leading-tight mt-1">Google 4.9, TripAdvisor 5.0 Travelers Choice, GetYourGuide 4.8</p></div>
   </div>
 </section>

 {/* MAP */}
 <section className="px-6 md:px-12 py-14 bg-[#F8FAFF]">
   <div className="max-w-[900px] mx-auto">
     <div className="text-center mb-8">
       <h2 className="font-black text-[24px] md:text-[30px] text-[#0A2342]">Based in Stone Town, teams across the island</h2>
       <p className="text-[12.5px] text-[#0A2342]/60 mt-3 max-w-[620px] mx-auto leading-relaxed">We don't operate from the mainland. Our drivers are based in Stone Town for airport transfers and Stone Town tours, Nungwi for the north, Paje for the south-east, and Fumba for Safari Blue. This local presence ensures punctual pickups for your Zanzibar tours and transfers.</p>
     </div>
     <div className="bg-white border border-[#0A2342]/10 rounded-[24px] overflow-hidden shadow-[0_8px_30px_rgba(10,35,66,0.06)]">
       <div id="about-map" className="w-full h-[400px] md:h-[440px] z-0" style={{ background:'#E8EEF5', minHeight:'400px' }}></div>
       <div className="px-5 py-3 flex justify-between items-center bg-[#0A2342] text-white text-[10px]">
         <span>© OpenStreetMap • Licensed Zanzibar Tour Operator</span>
         <span className="opacity-60 hidden md:inline">Stone Town base • North • South-East • South teams</span>
       </div>
     </div>
   </div>
 </section>

 {/* INCLUDES */}
 <section className="px-6 md:px-12 py-14 bg-white border-y border-[#0A2342]/5">
   <div className="max-w-6xl mx-auto grid md:grid-cols-12 gap-10">
     <div className="md:col-span-7">
       <h2 className="font-black text-[26px] md:text-[32px] text-[#0A2342] leading-tight">What is included in your private Zanzibar tour or transfer?</h2>
       <div className="mt-6 space-y-4 text-[13px] leading-[1.8] text-[#0A2342]/75">
         <p>Every transfer from Zanzibar Airport includes meet and greet with name sign at arrivals, flight tracking, free waiting time, and transport in a private AC vehicle for your group. For tours like Prison Island and Nakupenda, Mnemba Atoll snorkeling, Jozani Forest, Spice Farm, Salaam Cave and Kuza Cave, the listed inclusions such as boat, guide, entrance fees, snorkeling gear, fruit and water are part of the price.</p>
         <p>If your tour requires significant driving from your hotel, for example staying in Paje for a Mnemba tour in the north, we show the transfer cost separately and transparently. This way you understand the total for your group before you book.</p>
         <p>For guests staying in the same area as the tour, such as Salaam Cave and Kuza Cave both in Paje, we combine transport to avoid duplicate charges. This is how a local operator plans logically.</p>
       </div>
       <div className="mt-8 flex gap-3">
         <a href="/tours" className="bg-[#0A2342] text-white px-6 py-3 rounded-full font-black text-[12px]">View All Private Tours</a>
         <a href="/#transfers" className="bg-[#F8FAFF] border border-[#0A2342]/10 text-[#0A2342] px-6 py-3 rounded-full font-black text-[12px]">View Airport Transfers</a>
       </div>
     </div>
     <div className="md:col-span-5">
       <div className="bg-[#F8FAFF] rounded-[20px] p-6 border border-[#0A2342]/5">
         <p className="font-black text-[13px] text-[#0A2342]">Included in every booking</p>
         <ul className="mt-4 space-y-3 text-[12px] text-[#0A2342]/70 leading-relaxed">
           <li className="flex gap-2"><span className="font-black text-[#0A2342]">•</span> Private vehicle for your group, licensed and insured, AC, 7-seater comfort limited to 6 guests plus luggage</li>
           <li className="flex gap-2"><span className="font-black text-[#0A2342]">•</span> Professional local driver and guide, child seat free, water provided, hotel pickup and drop-off</li>
           <li className="flex gap-2"><span className="font-black text-[#0A2342]">•</span> WhatsApp support, driver details shared in advance, digital receipt after trip</li>
           <li className="flex gap-2"><span className="font-black text-[#0A2342]">•</span> Flexible payment after trip and free cancellation 24 hours before</li>
         </ul>
       </div>
     </div>
   </div>
 </section>

 {/* FAQ FOR SEO */}
 <section className="px-6 md:px-12 py-14 bg-[#F8FAFF]">
   <div className="max-w-4xl mx-auto">
     <h2 className="font-black text-[24px] md:text-[30px] text-[#0A2342]">Frequently asked about HERO Zanzibar tours and transfers</h2>
     <div className="mt-8 grid gap-4">
       {[
         { q:"How does pricing work for your Zanzibar tours and airport transfers?", a:"We offer fixed pricing for your private vehicle and group up to 6 guests. For example, an airport transfer from Zanzibar Airport to Paje is one price for the vehicle, not per person. Tours like Prison Island plus Nakupenda or Mnemba snorkeling are also priced for your private group with inclusions listed." },
         { q:"Are your tours private or shared?", a:"All our tours and transfers are private for your group only. No mixing with other guests. This applies to Stone Town tours, Spice Farm, Jozani Forest, Salaam Cave, Kuza Cave, Mnemba Atoll, Safari Blue and sunset dhow cruises." },
         { q:"Where does HERO operate in Zanzibar?", a:"We are based in Stone Town and operate across the island including Nungwi, Kendwa, Matemwe, Kiwengwa, Pongwe, Paje, Jambiani, Bwejuu, Kizimkazi and Fumba. Our local teams live in these areas." },
         { q:"What is included in Safari Blue and Mnemba tours?", a:"Safari Blue includes dhow boat, snorkeling gear, guide, seafood BBQ and drinks as listed. Mnemba includes boat, snorkeling gear and guide. Entrance fees are included where mentioned. Transfer from your hotel can be included or shown separately for transparency." },
       ].map((f,i)=>(
         <div key={i} className="bg-white rounded-[16px] p-5 border border-[#0A2342]/5">
           <p className="font-black text-[13px] text-[#0A2342]">{f.q}</p>
           <p className="text-[12.5px] text-[#0A2342]/65 mt-2 leading-relaxed">{f.a}</p>
         </div>
       ))}
     </div>
   </div>
 </section>

 {/* CTA */}
 <section className="bg-[#0A2342] px-6 md:px-12 py-14 text-center">
   <div className="max-w-3xl mx-auto text-white">
     <h2 className="font-black text-[28px] md:text-[40px] leading-[0.95]">Planning your Zanzibar holiday?<br/><span className="text-[#FF8A1A]">Talk to our local team.</span></h2>
     <p className="text-[13px] opacity-70 mt-4 leading-relaxed max-w-[600px] mx-auto">Tell us your arrival time, hotel location and tours you are interested in. We will send you a clear itinerary with fixed pricing for your group, inclusions, pickup times and driver details. No advance payment required.</p>
     <div className="mt-8 flex justify-center gap-3 flex-wrap">
       <a href={`https://wa.me/${waNumber}?text=Hi HERO! I am planning my Zanzibar trip. My hotel is...`} target="_blank" className="bg-[#FF8A1A] px-8 py-4 rounded-full font-black text-[13px] hover:bg-[#ff9a3a] transition">Chat on WhatsApp — +255 773 628 792</a>
       <a href="/tours" className="bg-white text-[#0A2342] px-8 py-4 rounded-full font-black text-[13px]">See Private Tours</a>
     </div>
   </div>
 </section>

 <Footer/>
 <div className="bg-[#071a32] border-t border-white/10 px-6 py-5 text-center text-[11px] text-white/50">
   © 2026 HERO Shuttle & Tours • Licensed Tour Operator • Stone Town, Zanzibar • Airport Transfers & Private Tours • Pay After Trip
 </div>
 </main>
 )
}