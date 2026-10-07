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
    const el = document.getElementById('guide-map')
    if (!el || (el as any)._leaflet_id) return
    const map = L.map(el, { center: [-6.15, 39.35], zoom: 9, zoomControl: true })
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '© OSM', maxZoom: 18 }).addTo(map)
    const zones = [
      { name:"Stone Town (West) - History, Food, Base", pos:[-6.1659, 39.199] as [number,number], color:"#0A2342" },
      { name:"Nungwi/Kendwa (North) - Best Sunset, Swimming", pos:[-5.725, 39.294] as [number,number], color:"#FF8A1A" },
      { name:"Matemwe/Kiwengwa (North-East) - Mnemba, Quiet", pos:[-5.85, 39.37] as [number,number], color:"#00AF87" },
      { name:"Pongwe/Uroa (East) - White Sand, The Rock", pos:[-6.11, 39.45] as [number,number], color:"#0A2342" },
      { name:"Paje/Jambiani (South-East) - Kite Capital, Backpacker", pos:[-6.266, 39.525] as [number,number], color:"#FF8A1A" },
      { name:"Kizimkazi/Fumba (South-West) - Dolphins, Safari Blue", pos:[-6.35, 39.30] as [number,number], color:"#00AF87" },
      { name:"Airport ZNZ", pos:[-6.1285, 39.2242] as [number,number], color:"#000" },
    ]
    zones.forEach(z=>{
      const html = `<div style="background:${z.color}; color:white; padding:4px 8px; border-radius:20px; font-weight:900; font-size:10px; border:2px solid white; box-shadow:0 3px 10px rgba(0,0,0,0.3); white-space:nowrap">📍 ${z.name}</div>`
      const icon = L.divIcon({ html, className:'', iconSize:[200,24], iconAnchor:[100,12] })
      L.marker(z.pos, { icon }).addTo(map)
    })
    setTimeout(()=>{ map.invalidateSize() }, 400)
  }
  init()
 }, [])

 return (
 <main className="bg-[#F5F7FA] overflow-x-hidden">
 <Header/>

 {/* HERO SEO */}
 <section className="bg-[#0A2342] relative overflow-hidden">
   <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-[#FF8A1A]/10 rounded-full blur-[120px]"></div>
   <div className="relative px-6 md:px-12 py-12 md:py-20">
     <div className="max-w-6xl mx-auto">
       <div className="text-center max-w-3xl mx-auto text-white">
         <span className="bg-white/10 border border-white/10 text-[10px] px-4 py-1.5 rounded-full font-black tracking-widest">ZANZIBAR TRAVEL GUIDE 2026 • SEO BOOSTER PAGE • 100+ KEYWORDS • REAL PRICES • NO FAKE</span>
         <h1 className="font-serif font-black text-[32px] md:text-[56px] leading-[0.9] mt-6">Zanzibar Travel Guide 2026<br/><span className="text-[#FF8A1A]">Everything You Need to Know Before You Go</span></h1>
         <p className="text-[14px] opacity-80 mt-5 leading-relaxed">Complete Zanzibar travel guide by local Stone Town team HERO Shuttle & Tours. Real prices: airport transfers $15-$40 per vehicle, tours $15-$90 per person + transparent transport fee $10-$60 per vehicle based on hotel area. Best time to visit, where to stay, how to get around, what to do, costs, safety, SIM, money, food, packing list, 38 tours, map, FAQ. This page boosts SEO causing traffic to your Transfers and Tours pages.</p>
       </div>
       <div className="mt-10 grid md:grid-cols-4 gap-3 text-[11px]">
         <a href="#best-time" className="bg-white text-[#0A2342] rounded-full px-5 py-3 font-bold text-center hover:bg-gray-100">📅 Best Time to Visit</a>
         <a href="#where-to-stay" className="bg-white/10 border border-white/20 text-white rounded-full px-5 py-3 font-bold text-center hover:bg-white/20">🏨 Where to Stay - Map</a>
         <a href="#airport-transfers" className="bg-[#FF8A1A] text-white rounded-full px-5 py-3 font-bold text-center hover:bg-[#ff9a33]">🚕 Airport Transfers $15-$40</a>
         <a href="#tours" className="bg-white text-[#0A2342] rounded-full px-5 py-3 font-bold text-center hover:bg-gray-100">🏝️ 38 Tours + Transport Fee</a>
       </div>
     </div>
   </div>
 </section>

 {/* TABLE OF CONTENTS FOR SEO */}
 <section className="bg-white border-b sticky top-0 z-30">
   <div className="px-6 md:px-12 py-3 overflow-x-auto">
     <div className="max-w-6xl mx-auto flex gap-2 text-[11px] whitespace-nowrap">
       <span className="font-black opacity-50 py-2">GUIDE:</span>
       {["Best Time","Where to Stay","Map","Airport Transfers","38 Tours","Costs","Getting Around","SIM & Money","Safety","Food","Packing","FAQ"].map(t=>(
         <a key={t} href={`#${t.toLowerCase().replace(/ & | /g,'-')}`} className="bg-[#F5F7FA] border border-gray-100 px-4 py-2 rounded-full font-bold hover:bg-gray-100">{t}</a>
       ))}
       <a href={`https://wa.me/${waNumber}?text=Hi HERO! I read Travel Guide - need advice`} target="_blank" className="ml-auto bg-[#25D366] text-white px-4 py-2 rounded-full font-black">💬 Ask HERO on WhatsApp</a>
     </div>
   </div>
 </section>

 {/* MAP IN BOX - WHERE TO STAY */}
 <section id="where-to-stay" className="px-6 md:px-12 py-10 bg-white">
   <div className="max-w-[900px] mx-auto">
     <div className="text-center mb-6">
       <span className="bg-[#0A2342] text-white text-[10px] px-4 py-1.5 rounded-full font-black tracking-widest">ZANZIBAR MAP - WHERE TO STAY - SEO KEYWORDS: BEST BEACH IN ZANZIBAR, WHERE TO STAY IN ZANZIBAR</span>
       <h2 className="font-serif font-black text-[26px] md:text-[36px] mt-4 leading-tight">Where to Stay in Zanzibar - North, East, South, West Guide</h2>
       <p className="text-[12px] opacity-60 mt-2 max-w-3xl mx-auto">Map in its box - max-w-900px centered - shows 6 zones: Stone Town West history, Nungwi Kendwa North best sunset swimming, Matemwe Kiwengwa North-East Mnemba quiet, Pongwe Uroa East white sand The Rock, Paje Jambiani South-East kite capital backpacker, Kizimkazi Fumba South-West dolphins Safari Blue. Each zone has different airport transfer price $15-$40 per vehicle and tour transport fee $10-$60 per vehicle.</p>
     </div>
     <div className="bg-white border border-gray-200 rounded-[24px] overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
       <div id="guide-map" className="w-full h-[400px] md:h-[460px] z-0" style={{ background:'#E8EEF5', minHeight:'400px' }}></div>
       <div className="px-4 py-2.5 flex justify-between items-center bg-[#0A2342] text-white text-[10px]">
         <span>© OpenStreetMap • Zanzibar 85km long • Airport central west • Stone Town 6km $15 vehicle • Nungwi 58km $40 vehicle • Paje 48km $35 vehicle</span>
         <span className="opacity-60 hidden md:inline">Map in its box - not stretching</span>
       </div>
     </div>
     <div className="mt-6 grid md:grid-cols-3 gap-4 text-[11.5px] leading-relaxed">
       <div className="bg-[#F5F7FA] rounded-[14px] p-4"><p className="font-black">🌅 North: Nungwi / Kendwa - Best Sunset & Swimming</p><p className="opacity-70 mt-2">Best for sunset, swimming at high tide, hotels, backpacker + luxury. Airport transfer $40 per vehicle up to 4 pax = $10 pp when 4 share. Tours: Sunset Dhow $40, Mnemba $45, Horse $60, Mnarani Turtle Aquarium $15. Transport fee from north hotels to north tours $15 vehicle, to south tours $60 vehicle. Best to do north tours if staying north saves transport.</p></div>
       <div className="bg-[#FFFBF5] border border-[#FF8A1A]/10 rounded-[14px] p-4"><p className="font-black">🪁 South-East: Paje / Jambiani - Kite Capital, Lively</p><p className="opacity-70 mt-2">Best for kite surfing Dec-Mar Jun-Sep windy, backpacker + boutique, lively. Airport $35 per vehicle. Tours: Kite lesson $70, SUP $25, Kuza Cave $28, Salaam Cave $25, Jozani $30, Quad $50, Village tour $20. Transport fee from Paje to south-east tours $15 vehicle, to north $55 vehicle. Best to do south-east + south tours same day saves transport.</p></div>
       <div className="bg-[#F5F7FA] rounded-[14px] p-4"><p className="font-black">🏛️ West: Stone Town - History, Food, Base, Airport Near</p><p className="opacity-70 mt-2">Best for first/last night, UNESCO, Forodhani food, shopping. Airport $15 per vehicle = $3.75 pp when 4 share. Tours: Prison Island + Nakupenda $55 most popular, Stone Town walking $25, Food tour $30, Spice Farm $22, Sunset Dhow $35. Transport fee from Stone Town to west tours $10 vehicle, to north $40 vehicle. HERO base Stone Town local team.</p></div>
     </div>
   </div>
 </section>

 {/* BEST TIME + COSTS + AIRPORT TRANSFERS + TOURS - LONG FORM SEO */}
 <section className="px-6 md:px-12 py-12 bg-[#F5F7FA]">
   <div className="max-w-6xl mx-auto grid lg:grid-cols-12 gap-8 items-start">
     <div className="lg:col-span-8 space-y-8">

       <div id="best-time" className="bg-white rounded-[20px] p-6 md:p-8 border border-black/5">
         <span className="bg-[#FF8A1A]/10 border border-[#FF8A1A]/20 text-[#FF8A1A] text-[10px] px-3 py-1 rounded-full font-black">BEST TIME TO VISIT ZANZIBAR - SEO KEYWORD</span>
         <h2 className="font-serif font-black text-[22px] md:text-[30px] mt-4">Best Time to Visit Zanzibar - Weather, Seasons, Prices</h2>
         <div className="mt-4 text-[12.5px] leading-relaxed opacity-80 space-y-3">
           <p><b>Dry season high season Jun-Oct and Dec-Feb best time:</b> Jun-Oct dry, not too hot 26-28°C, little rain, best for tours Mnemba snorkeling, Safari Blue, Prison Island, Nakupenda, spice farm, Stone Town, sunset dhow, Kizimkazi dolphin, Jozani monkeys, Salaam Cave, Kuza Cave. Dec-Feb hot 28-32°C, best for beach swimming north Nungwi Kendwa high tide, kite surfing Paje windy Dec-Mar. Prices higher, hotels $100-$300, transfers $15-$40 per vehicle same price 24/7, tours $15-$90 pp + transport $10-$60 per vehicle.</p>
           <p><b>Shoulder Mar-May and Nov light rain lower prices:</b> Mar-May long rains, some tours still run but sea choppy, Mnemba snorkeling less clear, Safari Blue still runs but BBQ wet, spice farm good (rain makes spices grow), Stone Town walking tour good morning, Jozani forest monkeys good (monkeys stay dry under trees), Salaam Cave Kuza Cave good (caves sheltered). Prices lower hotels $50-$150, tours same price but less crowded, transport same $15-$40 per vehicle. Best for budget travelers, kite surfing Jun-Sep windy too.</p>
           <p><b>Monthly breakdown:</b> Jan-Feb hot dry best beach, Mar start rains, Apr-May heavy rains many hotels closed south-east, Jun dry start high season, Jul-Aug peak dry best tours, Sep-Oct dry good, Nov short rains, Dec hot dry start. For airport transfers, same price all year $15 Stone Town, $35 Paje, $40 Nungwi per vehicle. For tours, Mnemba snorkeling best Jun-Oct Dec-Mar calm sea morning, Safari Blue best Jun-Oct Dec-Feb, Kizimkazi dolphin best early morning 6 AM all year, Jozani monkeys best morning all year, Spice farm best morning all year, Stone Town walking best morning or evening avoid midday heat.</p>
         </div>
       </div>

       <div id="airport-transfers" className="bg-[#0A2342] text-white rounded-[20px] p-6 md:p-8">
         <span className="bg-white/10 border border-white/10 text-[10px] px-3 py-1 rounded-full font-black tracking-widest">ZANZIBAR AIRPORT TRANSFERS - FIXED PRICE PER VEHICLE - SEO BOOSTER</span>
         <h2 className="font-serif font-black text-[22px] md:text-[30px] mt-4 leading-tight">Zanzibar Airport Transfers - Fixed $15-$40 Per Vehicle - No Bargaining - From Abeid Amani Karume Airport (ZNZ)</h2>
         <div className="mt-4 text-[12.5px] leading-relaxed opacity-80 space-y-3">
           <p><b>Airport to Stone Town $15 per vehicle up to 4 pax = $3.75 pp when 4 share:</b> Abeid Amani Karume International Airport ZNZ is 6km from Stone Town 12-15 min via Airport Road Maisara tarmac perfect no traffic except 5-6 PM near Darajani market. Hotel taxis charge $70-$90 per car, brokers at arrivals charge $50+ after bargaining. HERO fixed $15 per vehicle Toyota Noah/Alphard up to 4 pax + luggage AC child seat free bottled water 500ml per person flight tracking via FlightRadar 60 min free wait meet & greet with name sign driver photo name phone plate shared on WhatsApp before landing pay driver directly after trip USD TZS Euro M-Pesa Tigo Pesa Airtel Money receipt via WhatsApp no advance free cancellation 24h same price 24/7 no night surcharge.</p>
           <p><b>Airport to Nungwi/Kendwa $40 per vehicle 58km 65-75 min north:</b> Route Airport Mwana Kwerekwe Kiboje Mahonda Nungwi last 5km bumpy we drive slow. Best sunset beach best swimming at high tide. Same $40 per vehicle up to 4 pax = $10 pp when 4 share. <b>Airport to Paje/Bwejuu $35 per vehicle 48km 50-60 min south-east:</b> Via Jozani Forest tarmac all way monkeys crossing good road kite capital lively backpacker boutique. <b>Airport to Kizimkazi $40 56km 60-70 min south-west:</b> Dolphin village + Jozani near sea view road. <b>Airport to Matemwe $40 52km 60-70 min north-east:</b> Mnemba snorkeling departure point. <b>Airport to Kiwengwa/Pongwe/Pingwe $35 36km 50-55 min east:</b> The Rock Restaurant white sand. <b>Airport to Uroa/Marumbi/Michamvi $35 32km 45-50 min east-south:</b> Family beaches shallow water. Full price list on <a href="/airport-transfers" className="text-[#FF8A1A] underline font-bold">Airport Transfers page with realtime map distance from airport</a> - boosts SEO for "Zanzibar airport transfer price map".</p>
           <p><b>Why fixed per vehicle not per person:</b> Price is per vehicle up to 4 pax + 4 bags + hand luggage Toyota Noah/Alphard 7-seater we use 4 for comfort. Not per person. Includes driver fuel AC Zanzibar insurance vehicle licensed for tourism meet & greet at arrivals with printed name sign flight tracking bottled water child seat 0-4 years booster free mention when booking same price 24/7 no bargaining. Pay driver directly after trip. This transparency boosts SEO, trust, conversion. Hotel taxis charge per car $70-$90, we charge $15-$40 per vehicle.</p>
         </div>
         <a href="/airport-transfers" className="mt-6 inline-block bg-[#FF8A1A] px-6 py-3 rounded-full font-black text-[12px]">🚕 See Airport Transfers Price List + Realtime Map</a>
       </div>

       <div id="tours" className="bg-white rounded-[20px] p-6 md:p-8 border border-black/5">
         <span className="bg-[#FFFBF5] border border-[#FF8A1A]/20 text-[#FF8A1A] text-[10px] px-3 py-1 rounded-full font-black">38 TOURS & EXCURSIONS - PRICE PER PERSON + TRANSPORT FEE PER VEHICLE - SEO BOOSTER</span>
         <h2 className="font-serif font-black text-[22px] md:text-[30px] mt-4 leading-tight">Zanzibar Tours & Excursions - 38 Things to Do - From $15 pp + Transport Fee Per Vehicle</h2>
         <div className="mt-4 text-[12.5px] leading-relaxed opacity-80 space-y-3">
           <p><b>Why tours price per person + transport fee per vehicle transparent:</b> Many Zanzibar tour sites show only per person tour price $22-$85 but hide transport fee $15-$60 per vehicle. Tourist books tour $30, then operator says transport from Nungwi to Jozani $40 extra total becomes $70 not $30 tourist leaves bad review bounce rate increases ranking drops. HERO shows both transparent: tours $15-$90 pp + transport fee $10-$60 per vehicle based on hotel area + pax division. Same area as hotel = $15 vehicle nearby = $20-30 far opposite island = $40-60. If you select 2 tours in same area e.g., Salaam Cave + Kuza Cave both South-East Paje transport charged once not twice combo saves transport fee. User stays longer on page dwell time increases SEO boost trust increases bookings increase. Full list on <a href="/tours" className="text-[#FF8A1A] underline font-bold">All Tours page with map + cart + transport calculator</a> - boosts SEO for "Zanzibar tours price per person with transport".</p>
           <p><b>Top 10 most popular Zanzibar tours:</b> 1. Prison Island + Nakupenda Sandbank $55 5 hours Stone Town 8:30 AM tortoise sanctuary + sandbank + fruit boat guide entrance $12 fruit water snorkel gear - most popular half day west. 2. Stone Town Walking Tour $25 3 hours UNESCO slave market House of Wonders Forodhani - popular cultural west. 3. Spice Farm Tour $22 3 hours Stone Town 30+ spices tropical fruits tasting - half day cultural central. 4. Mnemba Atoll Snorkeling $45 4 hours Matemwe 8 AM best coral reef colorful fish dolphins boat gear guide - popular half day north-east. 5. Safari Blue Full Day BBQ $85 8 hours Fumba 8 AM sandbank snorkeling 2 stops seafood BBQ dhow sailing - popular full day south-west. 6. Jozani Forest Red Colobus Monkeys $30 2.5 hours Paje Stone Town red colobus only Zanzibar mangrove boardwalk - popular half day south-central. 7. Salaam Cave Turtle Swim $25 2 hours Paje Jambiani swim with turtles natural cave - half day south-east. 8. Kuza Cave Sacred Swim $28 3 hours Paje Jambiani sacred limestone cave culture Cherehani - half day cultural south-east. 9. Sunset Dhow Cruise Stone Town $35 2 hours Stone Town beach 4:30 PM traditional dhow sunset soft drinks music - popular half day west. 10. Kizimkazi Dolphin Tour $40 4 hours Kizimkazi 6 AM early morning dolphin watching snorkeling - half day south.</p>
           <p><b>All 38 tours list for SEO:</b> Prison Island + Nakupenda $55, Nakupenda Only $35, Prison Island Only $40, Stone Town Walking $25, Stone Town Food $30, Spice Farm $22, Spice + Cooking Class $45, Jozani Forest $30, Jozani + Salaam $38, Salaam Cave $25, Kuza Cave $28, Mnemba Snorkeling $45, Mnemba + Dolphin $55, Safari Blue $85, Sunset Dhow Stone Town $35, Sunset Dhow Nungwi $40, Kizimkazi Dolphin $40, Dolphin + Jozani + Cave Full Day $75, The Rock Restaurant $30, Paje Kite Lesson $70, Kite Rental $50, SUP Clear Kayak $25, Jet Ski Nungwi $60, Parasailing Kendwa $70, Scuba Diving Mnemba $90, Deep Sea Fishing Private $350, Local Fishing Ngalawa $35, Quad Bike + Village $50, Horse Riding Nungwi $60, Mnarani Turtle Aquarium $15, Chumbe Island Coral Park $90, Private Sandbank BBQ $120, Village Tour Jambiani $20, Swahili Cooking Class $40, Henna Painting $15, Bike Tour Nungwi $35, Kendwa Sunset Beach $25, Blue Lagoon Michamvi $35. Each tour includes boat guide entrance water fruit gear as listed, transfer extra per vehicle $10-$60 based on hotel area. Combo same area saves transport - do 2 tours same area same day pay transport once.</p>
         </div>
         <a href="/tours" className="mt-6 inline-block bg-[#0A2342] text-white px-6 py-3 rounded-full font-black text-[12px]">🏝️ See All 38 Tours + Map + Cart + Transport Fee Calculator</a>
       </div>

       <div id="costs" className="bg-[#FFFBF5] border border-[#FF8A1A]/10 rounded-[20px] p-6 md:p-8">
         <span className="bg-[#0A2342] text-white text-[10px] px-3 py-1 rounded-full font-black">ZANZIBAR COSTS - HOW MUCH MONEY TO BRING - SEO KEYWORD</span>
         <h2 className="font-serif font-black text-[22px] md:text-[28px] mt-4">How Much Does Zanzibar Cost - Real Prices 2026</h2>
         <div className="mt-4 grid md:grid-cols-2 gap-6 text-[12px] leading-relaxed">
           <div className="space-y-2 opacity-80">
             <p><b>Airport transfers:</b> Stone Town $15 per vehicle up to 4 pax = $3.75 pp when 4 share, Bububu $25, Paje Bwejuu $35, Kiwengwa Pongwe $35, Uroa Marumbi $35, Jambiani $40, Kizimkazi $40, Nungwi Kendwa $40, Matemwe $40 per vehicle. Same price 24/7, pay driver after trip USD TZS Euro M-Pesa, no advance, free cancel 24h.</p>
             <p><b>Tours:</b> $15-$90 per person + transport $10-$60 per vehicle based on hotel area. Example: Paje hotel + Jozani $30 + Kuza $28 = $58 pp tours + $15 vehicle /2 pax = $7.50 pp transport = $65.50 pp total with transport. If 4 pax, $15/4 = $3.75 pp transport = $61.75 pp total. Same area tours = 1 transport fee only saves money.</p>
             <p><b>Hotels:</b> Budget $20-$50 dorm/budget room Paje Jambiani, mid $80-$150 Nungwi Kiwengwa boutique, luxury $200-$500+ Kendwa Rocks, Zuri, Baraza, Mnemba Island $1000+. Stone Town $40-$120 Forodhani area.</p>
           </div>
           <div className="space-y-2 opacity-80">
             <p><b>Food:</b> Local food $2-$5 rice beans, Forodhani night market Zanzibar pizza $3-$5, seafood $8-$15, restaurant $10-$25. Tours include fruit water, Safari Blue includes BBQ lunch, Spice Farm includes tasting, Cooking Class includes lunch.</p>
             <p><b>Other:</b> SIM card Zantel/Vodacom $2 + data $10 10GB, entrance fees Prison Island $12, Jozani $12, Salaam Cave $15, Kuza $10, Mnarani $10, Chumbe $60. Tips $5-$10 per tour guide driver appreciated but not required. Pay driver directly after trip.</p>
             <p><b>Daily budget example 2 pax sharing vehicle:</b> Hotel $60 + transfers $40/4=$10 pp + tours $50 pp + food $15 pp = $85 pp per day mid-range. Budget $40 pp per day dorm + local food + 1 tour every 2 days.</p>
           </div>
         </div>
       </div>

       <div id="getting-around" className="bg-white rounded-[20px] p-6 md:p-8 border border-black/5">
         <h2 className="font-serif font-black text-[20px] md:text-[26px]">Getting Around Zanzibar - Transport Options</h2>
         <div className="mt-4 text-[12px] leading-relaxed opacity-80 space-y-3">
           <p><b>Private transfers per vehicle $15-$40 HERO fixed:</b> Best for airport transfers and tour transfers. Toyota Noah/Alphard AC up to 4 pax comfort child seat free water flight tracking meet & greet. Same price 24/7. Book on WhatsApp 2 min: date flight number hotel name location pin number of pax luggage. We reply 5-10 min confirmation driver name photo vehicle plate pickup time. Pay driver after trip.</p>
           <p><b>Dala dala local minibus $0.50-$2:</b> Crowded, no AC, slow, but cheapest. Stone Town to Paje $2 2 hours, to Nungwi $2 2 hours. Not for luggage, not for airport with bags. For backpacker adventure.</p>
           <p><b>Scooter rental $25-$40 per day:</b> Need international license, police checks, bumpy roads last 5km Nungwi, Jozani monkeys crossing, driving at night risky. Insurance often not included. For experienced riders only.</p>
           <p><b>Taxi brokers at arrivals:</b> Charge $50+ after bargaining, no fixed, no license, no insurance, no child seat, no flight tracking. HERO fixed $15-$40 per vehicle licensed insured.</p>
         </div>
       </div>

       <div id="safety" className="bg-white rounded-[20px] p-6 md:p-8 border border-black/5">
         <h2 className="font-serif font-black text-[20px] md:text-[26px]">Is Zanzibar Safe - Safety Tips - SEO Keyword</h2>
         <div className="mt-4 text-[12px] leading-relaxed opacity-80 space-y-2">
           <p><b>General safe:</b> Zanzibar is safe for tourists, low violent crime, but petty theft, scams at airport, overpriced taxis exist. Use fixed price transfers $15-$40 per vehicle licensed insured, not brokers. Use licensed tours with boat guide entrance included. Don't walk alone midnight Stone Town dark alleys, use taxi $10. Beach boys selling tours on beach - check license, fixed price, no advance.</p>
           <p><b>Health:</b> Malaria exists low risk Stone Town, higher risk rural, use repellent, long sleeves evening. No yellow fever required from Europe, required from endemic. Tap water not drinkable, drink bottled water 500ml included in transfers. Sun strong 11 AM - 3 PM use sunscreen.</p>
           <p><b>Sea:</b> Sea urchins north low tide wear shoes, currents east coast Paje strong at low tide, swim at high tide north Nungwi Kendwa best swimming, ask hotel tide times, follow guide for snorkeling Mnemba, Safari Blue, Blue Lagoon. Jellyfish rare.</p>
         </div>
       </div>
     </div>

     {/* RIGHT SIDEBAR - QUICK LINKS - STICKY */}
     <div className="lg:col-span-4">
       <div className="sticky top-[56px] space-y-4">
         <div className="bg-[#0A2342] text-white rounded-[20px] p-5">
           <p className="font-black text-[14px]">Quick Links - Boost SEO Internal Linking</p>
           <div className="mt-4 space-y-2 text-[11px]">
             <a href="/airport-transfers" className="block bg-white/10 hover:bg-white/20 rounded-full px-4 py-2.5 font-bold">🚕 Airport Transfers - $15-$40 per vehicle - Realtime Map</a>
             <a href="/tours" className="block bg-[#FF8A1A] hover:bg-[#ff9a33] rounded-full px-4 py-2.5 font-bold">🏝️ All 38 Tours - Map + Cart + Transport Fee</a>
             <a href="/about" className="block bg-white/10 hover:bg-white/20 rounded-full px-4 py-2.5 font-bold">👨‍✈️ About HERO - Local Team - Licensed</a>
             <a href={`https://wa.me/${waNumber}?text=Hi HERO! I read Travel Guide - need advice for my trip`} target="_blank" className="block bg-[#25D366] hover:bg-[#20bd5a] rounded-full px-4 py-2.5 font-black">💬 Chat HERO on WhatsApp - Free Advice</a>
           </div>
           <p className="text-[10px] opacity-60 mt-3">Internal linking boosts SEO - Google crawls Transfers and Tours pages from Travel Guide page.</p>
         </div>

         <div id="sim-money" className="bg-white border border-black/5 rounded-[20px] p-5">
           <p className="font-black text-[13px]">SIM Card, Money, Language - Quick Tips</p>
           <div className="mt-3 text-[11px] leading-relaxed opacity-70 space-y-2">
             <p><b>SIM:</b> Zantel, Vodacom, Airtel, Tigo at airport $2 SIM + $10 10GB data 7 days. Need passport. Works for WhatsApp booking HERO +255773628792. Hotels have WiFi but slow.</p>
             <p><b>Money:</b> Tanzanian Shilling TZS, $1 = ~2600 TZS, Euro ~2800 TZS, pay driver directly after trip USD TZS Euro M-Pesa Tigo Pesa Airtel Money receipt via WhatsApp. No advance. ATMs Stone Town, Nungwi, Paje, but often empty, bring USD cash new bills 2009+.</p>
             <p><b>Language:</b> Swahili, English spoken in hotels tours, HERO drivers English + Swahili local knowledge. Learn Jambo hello, Asante thank you, Pole sorry, Karibu welcome.</p>
             <p><b>Power:</b> Type G British 3-pin 230V, bring adapter, power cuts sometimes.</p>
           </div>
         </div>

         <div id="food" className="bg-[#FFFBF5] border border-[#FF8A1A]/10 rounded-[20px] p-5">
           <p className="font-black text-[13px]">Zanzibar Food - What to Eat</p>
           <div className="mt-3 text-[11px] leading-relaxed opacity-70 space-y-2">
             <p><b>Forodhani night market Stone Town:</b> Zanzibar pizza $3-$5, sugar cane juice $1, seafood skewers $3-$8, Urojo soup $2. Best evening food tour $30 includes tasting.</p>
             <p><b>Spice Farm:</b> 30+ spices cloves cinnamon vanilla, tropical fruits tasting, why Zanzibar called Spice Island. Tour $22 includes tasting, cooking class $45 includes lunch cook 3 dishes eat.</p>
             <p><b>Seafood:</b> Grilled octopus, lobster, calamari $8-$15 restaurant, Safari Blue BBQ includes seafood BBQ lunch seafood, The Rock Restaurant iconic but pricey $30+.</p>
             <p><b>Local:</b> Pilau rice, Biryani, Octopus curry, Banana, Mango, Pineapple. Hotels include breakfast.</p>
           </div>
         </div>

         <div id="packing" className="bg-white border border-black/5 rounded-[20px] p-5">
           <p className="font-black text-[13px]">Packing List for Zanzibar</p>
           <div className="mt-3 text-[11px] leading-relaxed opacity-70">
             <ul className="list-disc list-inside space-y-1">
               <li>Sunscreen strong 50+, hat, sunglasses</li>
               <li>Swimwear, light clothes, modest clothes Stone Town shoulders knees covered</li>
               <li>Reef shoes for sea urchins low tide north</li>
               <li>Snorkel gear provided tours Mnemba Safari Blue Blue Lagoon but bring your own if want</li>
               <li>Adapter Type G British 3-pin 230V</li>
               <li>USD cash new bills 2009+ for driver pay after trip</li>
               <li>Copy passport, travel insurance</li>
               <li>Mosquito repellent evening</li>
             </ul>
           </div>
         </div>
       </div>
     </div>
   </div>
 </section>

 {/* FAQ - SEO BOOSTER - FAQ SCHEMA */}
 <section id="faq" className="px-6 md:px-12 py-12 bg-white border-t">
   <div className="max-w-6xl mx-auto">
     <div className="text-center max-w-3xl mx-auto">
       <span className="bg-[#FF8A1A]/10 border border-[#FF8A1A]/20 text-[#FF8A1A] text-[10px] px-4 py-1.5 rounded-full font-black tracking-widest">FAQ - ZANZIBAR TRAVEL GUIDE - SEO SCHEMA - GOOGLE RICH SNIPPET</span>
       <h2 className="font-serif font-black text-[26px] md:text-[36px] mt-4 leading-tight">Zanzibar Travel Guide FAQ - Real Prices, Real Answers</h2>
       <p className="text-[12px] opacity-60 mt-3">FAQ boosts SEO - Google shows rich snippet - causes traffic - no fake - real answers - keywords included.</p>
     </div>
     <div className="grid md:grid-cols-2 gap-6 mt-10 text-[12.5px] leading-relaxed">
       <div className="space-y-4">
         <div className="bg-[#F5F7FA] rounded-[16px] p-5"><p className="font-black">✈️ How much is airport transfer from Zanzibar airport to Stone Town?</p><p className="opacity-70 mt-2">$15 per vehicle up to 4 pax = $3.75 pp when 4 share. 6km 12-15 min via Airport Road. Same price 24/7 day and night. Includes driver, fuel, AC Toyota Noah/Alphard, child seat free, water, flight tracking, 60 min free wait, meet & greet name sign, pay driver after trip USD/TZS/Euro/M-Pesa no advance free cancel 24h. Hotel taxis charge $70-$90 per car, brokers $50+ after bargaining. HERO fixed $15.</p></div>
         <div className="bg-[#F5F7FA] rounded-[16px] p-5"><p className="font-black">🏖️ Airport to Nungwi/Kendwa $40 per vehicle?</p><p className="opacity-70 mt-2">Yes 58km 65-75 min via Mwana Kwerekwe Kiboje Mahonda Nungwi last 5km bumpy. $40 per vehicle up to 4 pax = $10 pp when 4 share. Same price day and night. Includes driver fuel AC water child seat flight tracking meet & greet pay driver after trip. See Airport Transfers page realtime map distance from airport.</p></div>
         <div className="bg-[#F5F7FA] rounded-[16px] p-5"><p className="font-black">🏝️ How much are Zanzibar tours price per person + transport fee?</p><p className="opacity-70 mt-2">Tours $15-$90 per person + transport fee $10-$60 per vehicle based on hotel area + pax division. Same area as hotel $15 vehicle nearby $20-30 far opposite island $40-60. If you select 2 tours in same area e.g., Salaam Cave + Kuza Cave both South-East Paje transport charged once not twice combo saves. Example: Paje hotel + Jozani $30 + Kuza $28 = $58 pp tours + $15 vehicle /2 pax = $7.50 pp transport = $65.50 pp total with transport. Full list 38 tours on Tours page with map + cart + transport calculator.</p></div>
         <div className="bg-[#F5F7FA] rounded-[16px] p-5"><p className="font-black">📅 Best time to visit Zanzibar?</p><p className="opacity-70 mt-2">Jun-Oct dry not too hot 26-28°C best for tours Mnemba Safari Blue Prison Island Nakupenda spice farm Stone Town sunset dhow dolphin Jozani Salaam Kuza. Dec-Feb hot 28-32°C best for beach swimming north Nungwi Kendwa high tide kite surfing Paje windy Dec-Mar. Mar-May long rains lower prices hotels $50-$150 tours same price less crowded. Nov short rains. Transfers same price all year $15-$40 per vehicle same price 24/7.</p></div>
       </div>
       <div className="space-y-4">
         <div className="bg-[#0A2342] text-white rounded-[16px] p-5"><p className="font-black">🏨 Where to stay in Zanzibar - best beach?</p><p className="opacity-70 mt-2">North Nungwi Kendwa best sunset swimming high tide hotels luxury backpacker airport transfer $40 per vehicle. South-East Paje Jambiani kite capital lively backpacker boutique airport $35 per vehicle kite lesson $70 SUP $25 Kuza $28 Salaam $25 Jozani $30. East Kiwengwa Pongwe white sand The Rock Restaurant $30 Blue Lagoon $35 airport $35 per vehicle. West Stone Town history food Forodhani base airport $15 per vehicle Prison + Nakupenda $55 Stone Town walking $25 spice farm $22 sunset dhow $35. South-West Kizimkazi Fumba dolphins Safari Blue $85 dolphin $40 airport $40 per vehicle. Map in its box above shows 6 zones.</p></div>
         <div className="bg-[#0A2342] text-white rounded-[16px] p-5"><p className="font-black">💰 How much money to bring to Zanzibar?</p><p className="opacity-70 mt-2">Airport transfers $15-$40 per vehicle up to 4 pax. Tours $15-$90 pp + transport $10-$60 per vehicle based on hotel area. Hotels budget $20-$50 dorm Paje Jambiani mid $80-$150 Nungwi Kiwengwa boutique luxury $200-$500+ Kendwa Rocks Zuri Baraza. Food local $2-$5 Forodhani pizza $3-$5 seafood $8-$15 restaurant $10-$25. SIM $2 + data $10 10GB. Daily budget example 2 pax sharing vehicle: Hotel $60 + transfers $10 pp + tours $50 pp + food $15 pp = $85 pp per day mid-range. Budget $40 pp dorm local food 1 tour every 2 days.</p></div>
         <div className="bg-[#0A2342] text-white rounded-[16px] p-5"><p className="font-black">🛡️ Is Zanzibar safe?</p><p className="opacity-70 mt-2">Safe for tourists low violent crime but petty theft scams at airport overpriced taxis exist. Use fixed price transfers $15-$40 per vehicle licensed insured not brokers. Use licensed tours with boat guide entrance included. Don't walk alone midnight Stone Town dark alleys use taxi $10. Beach boys selling tours check license fixed price no advance. Health: malaria low risk Stone Town higher rural use repellent long sleeves evening tap water not drinkable drink bottled water 500ml included transfers. Sea: sea urchins north low tide wear shoes currents east coast Paje strong low tide swim high tide north Nungwi Kendwa best swimming ask hotel tide times follow guide snorkeling.</p></div>
         <div className="bg-[#FFFBF5] border border-[#FF8A1A]/20 rounded-[16px] p-5"><p className="font-black">💬 Why HERO Shuttle & Tours different?</p><p className="opacity-70 mt-2">Stone Town based local team drivers live here Zanzibar not Arusha. Know every hotel gate every bumpy last 5km Nungwi every Jozani monkey crossing time every low tide time for The Rock Restaurant every boat captain Fumba Safari Blue every spice farm mama. Licensed Zanzibar tourism operator insured vehicles Toyota Noah/Alphard AC child seat free water flight tracking meet & greet name sign driver photo name phone plate shared on WhatsApp before landing pay driver directly after trip USD TZS Euro M-Pesa Tigo Pesa Airtel Money receipt via WhatsApp no advance free cancellation 24h same price 24/7 no night surcharge no weekend surcharge no bargaining. No fake reviews no fake numbers social display empty ready until real guests come better empty than fake.</p><a href="/about" className="mt-3 inline-block bg-[#0A2342] text-white px-4 py-2 rounded-full font-bold text-[11px]">👨‍✈️ Read About HERO Team</a></div>
       </div>
     </div>
   </div>
 </section>

 {/* FINAL CTA */}
 <section className="bg-[#0A2342] px-6 md:px-12 py-12 text-center text-white">
   <h2 className="font-serif font-black text-[28px] md:text-[44px] leading-[0.95]">Read Travel Guide?<br/><span className="text-[#FF8A1A]">Now Book Transfers + Tours with Transport Fee Transparent</span></h2>
   <p className="text-[12px] opacity-60 mt-3">This travel guide page boosts SEO causing traffic to your main selling pages - airport transfers + tours - internal linking - map in box - FAQ schema - real prices</p>
   <div className="mt-8 flex justify-center gap-3 flex-wrap">
     <a href="/airport-transfers" className="bg-[#FF8A1A] px-8 py-4 rounded-full font-black">🚕 Airport Transfers $15-$40 Map</a>
     <a href="/tours" className="bg-white text-[#0A2342] px-8 py-4 rounded-full font-black">🏝️ 38 Tours + Cart + Transport Fee</a>
     <a href={`https://wa.me/${waNumber}?text=Hi HERO! I read Travel Guide - need advice for my trip from ${new Date().toDateString()}`} target="_blank" className="bg-white/10 border border-white/20 px-8 py-4 rounded-full font-black">💬 Ask HERO Free Advice WhatsApp</a>
   </div>
 </section>

 <Footer/>
 <div className="bg-[#0A2342] border-t border-white/10 px-6 py-5 text-center text-[11px] text-white/60">© 2026 HERO Shuttle & Tours • Zanzibar Travel Guide 2026 • SEO Booster Page • Real Prices • No Fake • <a href={`https://wa.me/${devNumber}?text=Hi T256 Group LTD! I saw Travel Guide page.`} className="underline decoration-[#FF8A1A]">Developed by T256 Group LTD +256 700 568 634</a></div>
 <a href={`https://wa.me/${waNumber}?text=Hi HERO! I read Travel Guide - need help`} target="_blank" className="fixed bottom-5 right-4 w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center text-[22px] z-50 shadow-[0_12px_30px_rgba(37,211,102,0.4)]">💬</a>
 <style>{`.font-serif{font-family:Georgia,serif}`}</style>
 </main>
 )
}