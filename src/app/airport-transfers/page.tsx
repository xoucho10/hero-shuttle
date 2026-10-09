"use client"
import { useEffect } from "react"
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function Page(){
 const waNumber = "255773628792"
 const devNumber = "256700568634"

 const pricing = [
   { route:"Airport to Stone Town", area:"West", distance:"6 km", time:"12-15 min", price:15, market:30, popular:true, note:"Historic UNESCO town, all hotels" },
   { route:"Airport to Chuwini / Bububu", area:"West", distance:"14 km", time:"20-25 min", price:25, market:45, popular:false, note:"West coast lodges, quiet" },
   { route:"Airport to Nungwi / Kendwa", area:"North", distance:"58 km", time:"65-75 min", price:40, market:80, popular:true, note:"Sunset beach, best swimming, resorts" },
   { route:"Airport to Matemwe", area:"North-East", distance:"52 km", time:"60-70 min", price:40, market:80, popular:true, note:"Mnemba snorkeling departure point" },
   { route:"Airport to Pwani Mchangani", area:"East", distance:"38 km", time:"50-60 min", price:35, market:70, popular:false, note:"East coast kite surfing area" },
   { route:"Airport to Kiwengwa / Pongwe / Pingwe", area:"East", distance:"36 km", time:"50-55 min", price:35, market:70, popular:false, note:"The Rock Restaurant, white sand" },
   { route:"Airport to Uroa / Marumbi / Michamvi", area:"East-South", distance:"32 km", time:"45-50 min", price:35, market:70, popular:false, note:"Family beaches, shallow water" },
   { route:"Airport to Paje / Bwejuu", area:"South-East", distance:"48 km", time:"50-60 min", price:35, market:70, popular:true, note:"Kite capital, lively backpacker + boutique" },
   { route:"Airport to Jambiani / Makunduchi", area:"South", distance:"55 km", time:"55-65 min", price:40, market:80, popular:false, note:"Local fishing village, authentic" },
   { route:"Airport to Kizimkazi", area:"South-West", distance:"56 km", time:"60-70 min", price:40, market:80, popular:false, note:"Dolphin tour village + Jozani near" },
 ]

 const getWaLink = (route:string, price:number) => {
   const msg = `Hi HERO! I want to book Airport Transfer: ${route} - $${price} per vehicle up to 4 pax. Please confirm pickup with driver name, vehicle plate and meet & greet at Abeid Airport arrivals.`
   return `https://wa.me/${waNumber}?text=${encodeURIComponent(msg)}`
 }

 useEffect(() => {
  const initMap = async () => {
    const L = await import('leaflet')
    // @ts-ignore - leaflet css has no types
    await import('leaflet/dist/leaflet.css')
    // @ts-ignore
    delete (L.Icon.Default.prototype as any)._getIconUrl
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
    })

    const el = document.getElementById('zanzibar-realtime-map')
    if (!el || (el as any)._leaflet_id) return

    const map = L.map('zanzibar-realtime-map', {
      center: [-6.15, 39.35],
      zoom: 9,
      zoomControl: false
    })

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map)
    L.control.zoom({ position: 'bottomright' }).addTo(map)

    const points = [
      { name: "ZNZ Airport ✈️", pos: [-6.1285, 39.2242] as [number, number], price: "FROM", dist: "Abeid Karume Airport", color: "#0A2342", isAirport: true },
      { name: "Stone Town", pos: [-6.1659, 39.1990] as [number, number], price: "$15", dist: "6km • 12-15min", color: "#00AF87" },
      { name: "Nungwi / Kendwa", pos: [-5.725, 39.294] as [number, number], price: "$40", dist: "58km • 65-75min", color: "#FF8A1A" },
      { name: "Matemwe", pos: [-5.85, 39.352] as [number, number], price: "$40", dist: "52km • 60-70min", color: "#FF8A1A" },
      { name: "Pwani Mchangani", pos: [-5.93, 39.385] as [number, number], price: "$35", dist: "38km • 50-60min", color: "#0A2342" },
      { name: "Kiwengwa / Pongwe", pos: [-5.96, 39.40] as [number, number], price: "$35", dist: "36km • 50-55min", color: "#0A2342" },
      { name: "Paje / Bwejuu", pos: [-6.266, 39.525] as [number, number], price: "$35", dist: "48km • 50-60min", color: "#00AF87" },
      { name: "Jambiani", pos: [-6.316, 39.543] as [number, number], price: "$40", dist: "55km • 55-65min", color: "#FF8A1A" },
      { name: "Kizimkazi", pos: [-6.446, 39.465] as [number, number], price: "$40", dist: "56km • 60-70min", color: "#0A2342" },
    ]

    const airportPos: [number, number] = [-6.1285, 39.2242]

    points.forEach(p => {
      if (!p.isAirport) {
        L.polyline([airportPos, p.pos], { color: '#0A2342', weight: 1, opacity: 0.18, dashArray: '5, 10' }).addTo(map)
      }
      const html = `<div style="background:${p.color}; color:white; padding:${p.isAirport? '7px 12px' : '5px 9px'}; border-radius:20px; font-weight:900; font-size:${p.isAirport? '12px' : '11px'}; box-shadow:0 4px 14px rgba(0,0,0,0.3); border:2px solid white; white-space:nowrap;">${p.isAirport? '✈️' : '📍'} ${p.name} ${p.price!== 'FROM'? `• ${p.price}` : ''}</div>`
      const icon = L.divIcon({ html, className: 'price-pin', iconSize: [150, 32], iconAnchor: [75, 16] })
      const marker = L.marker(p.pos, { icon }).addTo(map)
      const wa = `https://wa.me/${waNumber}?text=${encodeURIComponent(`Hi HERO! I saw map - I want ${p.name} transfer ${p.price} ${p.dist} per vehicle. Please confirm driver.`)}`
      marker.bindPopup(`<div style="font-family:system-ui; min-width:170px"><b style="font-size:13px">${p.name}</b><br/><span style="font-size:11px; opacity:0.7">${p.dist}</span><br/><span style="font-weight:900; color:${p.color}; font-size:18px">${p.price}</span><span style="font-size:11px; opacity:0.7"> per vehicle</span><br/><a href="${wa}" target="_blank" style="display:inline-block; margin-top:8px; background:#0A2342; color:white; padding:7px 14px; border-radius:20px; text-decoration:none; font-size:11px; font-weight:800">Book on WhatsApp</a></div>`)
    })
  }
  initMap()
 }, [])

 return (
 <main className="bg-[#F5F7FA] overflow-x-hidden">
 <Header/>

 {/* HERO */}
 <section className="bg-[#0A2342] relative overflow-hidden">
   <div className="absolute inset-0 bg-gradient-to-br from-[#0A2342] via-[#0A2342] to-[#132F5A]"></div>
   <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#FF8A1A]/10 rounded-full blur-[120px]"></div>
   <div className="relative px-6 md:px-12 py-12 md:py-20 text-center text-white">
     <span className="bg-white/10 border border-white/10 text-[10px] px-4 py-1.5 rounded-full font-black tracking-widest">ABEID AMANI KARUME AIRPORT (ZNZ) • FIXED PER VEHICLE • LICENSED DRIVER • 24/7</span>
     <h1 className="font-serif font-black text-[32px] md:text-[52px] leading-[0.95] mt-6">Zanzibar Airport Transfers — Fixed Prices<br/><span className="text-[#FF8A1A]">From $15 Per Vehicle</span></h1>
     <p className="text-[14px] opacity-80 mt-5 max-w-2xl mx-auto leading-relaxed">
       Abeid Amani Karume International Airport is 6 km from Stone Town and 48-58 km from beach hotels. Hotel taxis charge $70-$90 per car. Brokers at arrivals charge $50+ after bargaining.
       HERO is local Stone Town team with fixed per vehicle pricing: <b>Stone Town $15, East Coast Paje $35, North Nungwi $40 per vehicle up to 4 pax</b>. Same price day & night, flight tracked, 60 min free wait, meet & greet with name sign, AC Toyota Noah/Alphard, child seat free, pay driver directly after trip in USD/TZS/Euro/M-Pesa. No advance.
     </p>
     <div className="mt-8 flex justify-center gap-3 flex-wrap">
       <a href={getWaLink("Airport to Stone Town", 15)} target="_blank" rel="noopener noreferrer" className="bg-[#FF8A1A] hover:bg-[#ff9a33] px-8 py-4 rounded-full font-black text-[14px] shadow-[0_10px_20px_rgba(255,138,26,0.3)] transition">💬 Book $15 Stone Town</a>
       <a href={`https://wa.me/${waNumber}?text=Hi%20HERO!%20Send%20me%20full%20airport%20transfer%20price%20list%20per%20vehicle.`} target="_blank" rel="noopener noreferrer" className="bg-white text-[#0A2342] px-8 py-4 rounded-full font-black text-[14px]">📋 Get Full Price List</a>
     </div>
   </div>
 </section>

 {/* TRUST */}
 <section className="bg-white border-y border-gray-100 px-6 md:px-12 py-3">
   <div className="max-w-6xl mx-auto flex flex-wrap md:flex-nowrap justify-between items-center gap-3 text-[11px] font-medium">
     <div className="flex items-center gap-2"><span className="w-6 h-6 bg-[#00AF87] rounded-full flex items-center justify-center text-white text-[10px] font-black">T</span><span className="font-bold">Tripadvisor</span><span className="opacity-60 hidden md:inline">• Verified Business</span></div>
     <div className="flex items-center gap-1"><span>⭐</span><span className="font-bold">Google Business</span><span className="opacity-60 hidden md:inline">• Zanzibar Local</span></div>
     <div className="hidden md:flex items-center gap-1">🛡️<span className="font-bold">Licensed Zanzibar Tourism Operator</span></div>
     <div className="text-[10px] opacity-60 ml-auto">AC Vehicles • Insured • Child Seat • Water • Secure Payments • Free Cancellation 24h</div>
   </div>
 </section>

 {/* REALTIME ZANZIBAR MAP */}
 <section className="px-6 md:px-12 py-12 md:py-16 bg-white border-b">
   <div className="max-w-6xl mx-auto">
     <div className="grid md:grid-cols-5 gap-8 items-start">
       <div className="md:col-span-2">
         <span className="bg-[#FFFBF5] border border-[#FF8A1A]/20 text-[#FF8A1A] text-[10px] px-4 py-1.5 rounded-full font-black tracking-widest">LIVE INTERACTIVE MAP • CLICK PINS TO BOOK • REAL DISTANCES</span>
         <h2 className="font-serif font-black text-[28px] md:text-[36px] mt-4 leading-[1.05]">Where is Your Hotel? See Distance From Airport</h2>
         <p className="text-[13px] opacity-70 mt-4 leading-relaxed">
           Zanzibar is 85 km long. Airport is central west. Stone Town is 6 km (15 min). East coast Paje is 48 km (55 min) via Jozani Forest road - tarmac all way. North Nungwi 58 km (70 min) via Mwana Kwerekwe and Kiboje village - last 5 km bumpy. South Kizimkazi 56 km (65 min) via Jozani and sea view road.
           Traffic: Stone Town 4-6 PM slow. Road works sometimes near airport. We use real time, not Google estimate. This map is realtime OpenStreetMap - drag, zoom, click price pins to book directly.
         </p>
         <div className="mt-6 grid grid-cols-2 gap-3 text-[11px]">
           <div className="bg-[#F5F7FA] rounded-[12px] p-3"><p className="font-black">West - Stone Town</p><p className="opacity-60">6 km • 15 min • $15 • Tarmac perfect</p></div>
           <div className="bg-[#F5F7FA] rounded-[12px] p-3"><p className="font-black">South-East - Paje / Jambiani</p><p className="opacity-60">48-55 km • 55-65 min • $35-40 • Tarmac + village</p></div>
           <div className="bg-[#F5F7FA] rounded-[12px] p-3"><p className="font-black">North - Nungwi / Kendwa</p><p className="opacity-60">58 km • 70 min • $40 • Best sunset beach</p></div>
           <div className="bg-[#F5F7FA] rounded-[12px] p-3"><p className="font-black">South - Kizimkazi</p><p className="opacity-60">56 km • 65 min • $40 • Dolphin village</p></div>
         </div>
       </div>
       <div className="md:col-span-3">
         <div className="bg-white border border-gray-200 rounded-[24px] overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.08)]">
           <div id="zanzibar-realtime-map" className="w-full h-[440px] md:h-[500px] z-0" style={{ background: '#eef2f7' }}></div>
           <div className="px-4 py-3 flex justify-between items-center bg-[#0A2342] text-white text-[10px]">
             <span>📍 Click pin → See price per vehicle → Book on WhatsApp</span>
             <span className="opacity-60 hidden md:inline">Drag • Scroll to zoom • Mobile: pinch</span>
           </div>
         </div>
         <div className="mt-3 grid grid-cols-3 gap-2 text-[10px]">
           <div className="bg-[#00AF87]/10 border border-[#00AF87]/20 rounded-full px-3 py-1.5 text-center font-bold text-[#00AF87]">● West $15-$25</div>
           <div className="bg-[#FF8A1A]/10 border border-[#FF8A1A]/20 rounded-full px-3 py-1.5 text-center font-bold text-[#FF8A1A]">● North $40</div>
           <div className="bg-[#0A2342]/10 border border-[#0A2342]/20 rounded-full px-3 py-1.5 text-center font-bold text-[#0A2342]">● South/East $35-$40</div>
         </div>
       </div>
     </div>
   </div>
 </section>

 {/* PRICING */}
 <section className="px-6 md:px-12 py-12 md:py-20 bg-white">
   <div className="max-w-6xl mx-auto">
     <div className="text-center max-w-3xl mx-auto">
       <span className="bg-[#FFFBF5] border border-[#FF8A1A]/20 text-[#FF8A1A] text-[10px] px-4 py-1.5 rounded-full font-black tracking-widest">ALL FIXED PRICES PER VEHICLE UP TO 4 PAX • SAME DAY & NIGHT</span>
       <h2 className="font-serif font-black text-[28px] md:text-[40px] mt-4 leading-[1.05]">Complete Airport Transfer Price List - Per Vehicle</h2>
       <p className="text-[13px] opacity-60 mt-3">Price is per vehicle Toyota Noah/Alphard up to 4 passengers + luggage. Not per person. Market price crossed out so you see real saving. Includes driver, fuel, meet & greet at arrivals with name sign, 60 min free waiting, flight tracking, bottled water, child seat on request. Pay driver directly after trip. No advance, free cancellation 24h.</p>
     </div>

     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mt-10">
       {pricing.map((x,i)=>(
         <div key={i} className="group relative bg-white border border-gray-100 rounded-[20px] p-4 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_30px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all">
           {x.popular && <span className="absolute -top-2 left-4 bg-[#0A2342] text-white text-[9px] px-3 py-1 rounded-full font-black">POPULAR</span>}
           <p className="font-bold text-[12px] leading-tight mt-2">{x.route}</p>
           <p className="text-[10px] opacity-60 mt-1">{x.area} • {x.distance} • {x.time}</p>
           <p className="text-[10px] opacity-50 mt-1 italic">{x.note}</p>
           <div className="mt-4">
             <p className="text-[11px] opacity-50 line-through">${x.market} market</p>
             <p className="font-black text-[26px] leading-none text-[#0A2342]">${x.price}<span className="text-[11px] font-medium opacity-60 ml-1">vehicle</span></p>
             <p className="text-[10px] font-bold text-[#00AF87] mt-1">Save ${x.market - x.price} • Best Price</p>
           </div>
           <a href={getWaLink(x.route, x.price)} target="_blank" rel="noopener noreferrer" className="mt-4 w-full bg-[#0A2342] group-hover:bg-black text-white text-[11px] font-bold py-2.5 rounded-full flex justify-center transition">Book on WhatsApp</a>
           <p className="text-[9px] opacity-40 mt-2 text-center">Pay driver directly • Free cancellation 24h</p>
         </div>
       ))}
     </div>
   </div>
 </section>

 {/* TRANSFERS VS TOURS */}
 <section className="px-6 md:px-12 py-12 md:py-16 bg-[#FFFBF5]">
   <div className="max-w-6xl mx-auto">
     <div className="grid md:grid-cols-2 gap-8">
       <div className="bg-white rounded-[20px] p-7 border border-black/5 shadow-[0_8px_30px_rgba(0,0,0,0.03)]">
         <h3 className="font-black text-[18px]">Transfers vs Tours & Excursions - Pricing Difference</h3>
         <p className="text-[12px] opacity-70 mt-2 leading-relaxed">We keep pricing simple and realistic for Zanzibar.</p>
         <div className="mt-6 space-y-3 text-[12.5px]">
           <div className="bg-[#F5F7FA] rounded-[12px] p-4">
             <p className="font-black">🚕 Transfers: $15-$40 per vehicle (this page)</p>
             <p className="opacity-70 mt-1">Airport to any beach is transport only. Price based on distance, fuel (1 liter $1.3), driver time, return empty. Toyota Noah 7-seater but we sell max 4 pax + luggage for comfort. 6 km Stone Town $15 market $30, 58 km Nungwi $40 market $80. Same day & night. No luggage surcharge for normal 1 bag per person + hand luggage. Extra luggage +$5. Surfboard +$10.</p>
           </div>
           <div className="bg-[#FFFBF5] border border-[#FF8A1A]/20 rounded-[12px] p-4">
             <p className="font-black">🏝️ Tours & Excursions: $22-$85 per tour (separate page)</p>
             <p className="opacity-70 mt-1">Tours are boat + guide + park fees + lunch + transfers. Example: Mnemba snorkeling $45 includes boat from Matemwe, guide, snorkel gear, water, beach time - transfer from hotel extra $20-30. Prison Island + Nakupenda $55 includes boat from Stone Town, tortoise sanctuary fee $10, sandbank, fruit. Safari Blue $85 includes dhow, seafood BBQ, snorkeling 2 stops, sandbank, guide. Tours price per person, transfer price per vehicle. Combine both for combo - we give 10% off.</p>
           </div>
         </div>
       </div>
       <div className="space-y-4">
         <div className="bg-white rounded-[20px] p-7 border border-black/5">
           <p className="font-black text-[14px]">What is included in transfer (realistic)</p>
           <ul className="mt-3 space-y-2 text-[12px] opacity-70 list-disc list-inside leading-relaxed">
             <li>Fixed per vehicle up to 4 pax + 4 bags + hand luggage (Toyota Noah/Alphard 7-seater, we use 4 for comfort)</li>
             <li>Licensed Zanzibar driver, English + Swahili, local knowledge</li>
             <li>AC, fuel, Zanzibar insurance, vehicle licensed for tourism</li>
             <li>Meet & greet at Abeid Airport arrivals with printed name sign (we share driver photo, name, phone, plate on WhatsApp before landing)</li>
             <li>Flight tracking via FlightRadar - we adjust if delayed, no extra charge, 60 min free wait after landing time</li>
             <li>Bottled water 500ml per person, child seat 0-4 years and booster on request free (mention when booking)</li>
             <li>Same price 24/7, no night surcharge, no weekend surcharge, no bargaining</li>
             <li>Pay driver directly after trip: USD, TZS (current rate), Euro, M-Pesa, Tigo Pesa, Airtel Money - receipt via WhatsApp</li>
           </ul>
         </div>
         <div className="bg-[#0A2342] text-white rounded-[20px] p-7">
           <p className="font-black text-[14px]">How booking works (2 min on WhatsApp)</p>
           <div className="mt-3 space-y-2 text-[12px] opacity-80 leading-relaxed">
             <p><b className="text-[#FF8A1A]">1. Click Book</b> on route card or map pin → WhatsApp opens with pre-filled message including price per vehicle</p>
             <p><b className="text-[#FF8A1A]">2. Send:</b> Date, flight number (e.g., ET812), hotel name + location pin, number of pax + luggage. We reply in 5-10 min with confirmation, driver name, photo, vehicle plate, exact pickup time</p>
             <p><b className="text-[#FF8A1A]">3. At airport:</b> Driver waits at arrivals hall after customs with your name. If you don't see, call WhatsApp +255773628792. Pay driver after arrival at hotel. Free cancellation 24h before.</p>
           </div>
           <a href={getWaLink("Airport Transfer - All Routes", 40)} target="_blank" rel="noopener noreferrer" className="mt-5 inline-block bg-[#FF8A1A] px-6 py-3 rounded-full font-bold text-[13px]">💬 Book Now on WhatsApp</a>
         </div>
       </div>
     </div>
   </div>
 </section>

 {/* SEO */}
 <section className="bg-white px-6 md:px-12 py-12 md:py-16 border-t">
   <div className="max-w-6xl mx-auto">
     <h3 className="font-serif font-black text-[22px] md:text-[30px] text-center leading-tight">Zanzibar Airport Taxi - Real Prices, Real Distances, Real Times</h3>
     <div className="grid md:grid-cols-3 gap-6 mt-8 text-[12.5px] leading-relaxed">
       <div className="bg-[#FFFBF5] border border-[#FF8A1A]/10 rounded-[20px] p-6">
         <p className="font-black">✈️ Airport to Stone Town $15 per vehicle?</p><p className="mt-2 opacity-70">Yes. Abeid Airport to Stone Town Forodhani 6 km, 12-15 min via Airport Road and Maisara. Tarmac perfect. No traffic except 5-6 PM near Darajani market. Price $15 per vehicle up to 4 pax market $30 save $15.</p>
         <p className="font-black mt-6">📍 Airport to Nungwi / Kendwa $40?</p><p className="mt-2 opacity-70">Yes 58 km, 65-75 min. Route: Airport - Mwana Kwerekwe - Kiboje - Mahonda - Nungwi. Last 5 km bumpy, we drive slow. Market $80 you save $40.</p>
       </div>
       <div className="bg-[#F5F7FA] border border-black/5 rounded-[20px] p-6">
         <p className="font-black">🏖️ Paje / Bwejuu / Jambiani?</p><p className="mt-2 opacity-70">Paje 48 km 55 min via Jozani Forest (good tarmac, monkeys crossing). Price $35 per vehicle market $70 save $35.</p>
         <p className="font-black mt-6">🌴 East Coast Kiwengwa / Matemwe?</p><p className="mt-2 opacity-70">Kiwengwa 36 km 55 min, home of The Rock Restaurant. Matemwe 52 km 65 min - departure for Mnemba. $35-$40 market $70-$80 save 50%.</p>
       </div>
       <div className="bg-[#0A2342] text-white rounded-[20px] p-6">
         <p className="font-black">💎 What makes HERO different?</p><p className="mt-2 opacity-70">We are based in Stone Town, not Arusha. Drivers live here, know every hotel gate. Licensed, insured. Pay driver directly after trip. Free cancellation 24h. Market $30-$80, HERO $15-$40.</p>
         <p className="font-black mt-6">🌙 2 AM same price? Luggage?</p><p className="mt-2 opacity-70">Yes same $15-$40 per vehicle 24/7. Normal luggage included. Extra large bag +$5, surfboard +$10.</p>
         <a href="/" className="mt-5 inline-block bg-white text-[#0A2342] px-5 py-2.5 rounded-full font-bold text-[12px]">🏝️ See Tours & Excursions</a>
       </div>
     </div>
   </div>
 </section>

 {/* FINAL CTA */}
 <section className="bg-[#0A2342] px-6 md:px-12 py-14 text-center text-white">
   <h2 className="font-serif font-black text-[32px] md:text-[44px] leading-[0.95]">Need a HERO From ZNZ Airport?<br/><span className="text-[#FF8A1A]">From $15 Per Vehicle</span></h2>
   <p className="text-[12px] opacity-60 mt-3">Per vehicle up to 4 pax • Pay driver directly • No advance • Free cancellation 24h • Market price crossed out - Best price guaranteed</p>
   <div className="mt-8 flex justify-center gap-3 flex-wrap">
     <a href={getWaLink("Airport Transfer - Any Beach", 40)} target="_blank" rel="noopener noreferrer" className="bg-[#FF8A1A] px-8 py-4 rounded-full font-black">💬 Book on WhatsApp +255 773 628 792</a>
     <a href="/" className="bg-white text-[#0A2342] px-8 py-4 rounded-full font-black">🏝️ Add Tours + Transfer Combo</a>
   </div>
 </section>

 <Footer/>

 <div className="bg-[#0A2342] border-t border-white/10 px-6 md:px-12 py-6">
   <div className="max-w-6xl mx-auto text-center">
     <div className="flex flex-col md:flex-row justify-center items-center gap-2 text-[12px] text-white/90">
       <span>© 2026 HERO Shuttle & Tours</span>
       <span className="hidden md:inline text-white/40">•</span>
       <a href={`https://wa.me/${devNumber}?text=Hi%20T256%20Group%20LTD!%20I%20saw%20HERO%20Transfers%20page.`} target="_blank" rel="noopener noreferrer" className="font-bold text-white underline decoration-[#FF8A1A] decoration-2 underline-offset-4 hover:text-[#FF8A1A] transition">
         Developed by T256 Group LTD
       </a>
     </div>
     <p className="text-[11px] text-white/50 mt-2">Click above to chat with developer on WhatsApp +256 700 568 634</p>
   </div>
 </div>

 <a href={getWaLink("Airport Transfer", 35)} target="_blank" rel="noopener noreferrer" className="fixed bottom-6 right-4 w-14 h-14 bg-[#25D366] rounded-full shadow-[0_12px_30px_rgba(37,211,102,0.4)] flex items-center justify-center text-[22px] z-50 hover:scale-110 transition">💬</a>
 <style>{`.font-serif{font-family:Georgia,serif}.price-pin{background:transparent!important; border:none!important;}`}</style>
 </main>
 )
}