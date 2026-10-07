"use client"
import { useState, useEffect, useMemo } from "react"
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function Page(){
 const waNumber = "255773628792"
 const devNumber = "256700568634"
 const [filter, setFilter] = useState("All")
 const [selectedTours, setSelectedTours] = useState<string[]>([])
 const [hotelLocation, setHotelLocation] = useState("Paje / Bwejuu (South-East)")
 const [pax, setPax] = useState(2)

 const tours = [
   { id:"prison-nakupenda", name:"Prison Island + Nakupenda", cat:["Popular","Half Day"], price:55, duration:"5 Hours", pickup:"Stone Town 8:30 AM", desc:"Tortoise sanctuary + sandbank + fruit", includes:"Boat, Guide, Entrance, Fruit, Water", area:"West", seo:"Most popular Zanzibar tour - giant tortoises 100 years + white sandbank" },
   { id:"nakupenda-only", name:"Nakupenda Sandbank Only", cat:["Half Day","Popular"], price:35, duration:"4 Hours", pickup:"Stone Town 9 AM", desc:"White sandbank in ocean, swimming", includes:"Boat, Fruit, Water", area:"West", seo:"Nakupenda sandbank pure white sand - swimming - fruit" },
   { id:"prison-only", name:"Prison Island Tortoises", cat:["Half Day"], price:40, duration:"3 Hours", pickup:"Stone Town", desc:"Giant tortoises 100+ years", includes:"Boat, Entrance, Guide", area:"West", seo:"Prison Island Changuu tortoise sanctuary" },
   { id:"stone-town", name:"Stone Town Walking Tour", cat:["Popular","Half Day","Cultural"], price:25, duration:"3 Hours", pickup:"Stone Town", desc:"UNESCO, Slave Market, House of Wonders", includes:"Guide, Entrances", area:"West", seo:"Stone Town UNESCO walking tour" },
   { id:"stone-food", name:"Stone Town Food Tour", cat:["Cultural","Half Day"], price:30, duration:"3 Hours", pickup:"Stone Town 5 PM", desc:"Forodhani night market tasting", includes:"Guide, Tasting", area:"West", seo:"Forodhani night market Zanzibar pizza" },
   { id:"spice", name:"Spice Farm Tour", cat:["Half Day","Cultural"], price:22, duration:"3 Hours", pickup:"Stone Town", desc:"30+ spices + fruits tasting", includes:"Guide, Tasting", area:"Central", seo:"Spice farm 30+ spices cloves cinnamon vanilla" },
   { id:"spice-cook", name:"Spice + Cooking Class", cat:["Half Day","Cultural"], price:45, duration:"5 Hours", pickup:"Stone Town", desc:"Spice tour + Swahili cooking + eat", includes:"Guide, Cooking, Lunch", area:"Central", seo:"Spice + cooking class market + 3 dishes" },
   { id:"jozani", name:"Jozani Forest Monkeys", cat:["Popular","Half Day"], price:30, duration:"2.5 Hours", pickup:"Paje / Stone Town", desc:"Red colobus monkeys only in Zanzibar", includes:"Entrance, Guide", area:"South-Central", seo:"Jozani red colobus monkeys only Zanzibar" },
   { id:"jozani-salaam", name:"Jozani + Salaam Cave Turtles", cat:["Popular","Half Day"], price:38, duration:"4 Hours", pickup:"Paje", desc:"Monkeys + turtle cave swimming", includes:"Entrance both, Guide", area:"South", seo:"Jozani + Salaam Cave turtles combo" },
   { id:"salaam", name:"Salaam Cave Turtle Swim", cat:["Half Day"], price:25, duration:"2 Hours", pickup:"Paje / Jambiani", desc:"Swim with turtles in cave", includes:"Entrance, Guide", area:"South-East", seo:"Salaam Cave turtle swim natural cave" },
   { id:"kuza", name:"Kuza Cave Sacred Swim", cat:["Half Day","Cultural"], price:28, duration:"3 Hours", pickup:"Paje / Jambiani", desc:"Sacred limestone cave + culture", includes:"Entrance, Guide", area:"South-East", seo:"Kuza Cave sacred limestone swimming" },
   { id:"mnemba", name:"Mnemba Atoll Snorkeling", cat:["Popular","Half Day","North"], price:45, duration:"4 Hours", pickup:"Matemwe 8 AM", desc:"Best coral reef, colorful fish, dolphins", includes:"Boat, Gear, Guide", area:"North-East", seo:"Mnemba Atoll best coral reef snorkeling" },
   { id:"mnemba-dolphin", name:"Mnemba + Dolphin Combo", cat:["Half Day","North"], price:55, duration:"5 Hours", pickup:"Matemwe / Nungwi 7:30 AM", desc:"Dolphins + Mnemba snorkeling", includes:"Boat, Guide, Gear", area:"North-East", seo:"Mnemba + dolphin early morning combo" },
   { id:"safari-blue", name:"Safari Blue Full Day BBQ", cat:["Full Day","Popular","South"], price:85, duration:"8 Hours", pickup:"Fumba 8 AM", desc:"Sandbank + snorkeling + seafood BBQ + dhow", includes:"Dhow, BBQ, Drinks, Gear", area:"South-West", seo:"Safari Blue full day Fumba sandbank BBQ" },
   { id:"dhow-stone", name:"Sunset Dhow Stone Town", cat:["Popular","Half Day"], price:35, duration:"2 Hours", pickup:"Stone Town 4:30 PM", desc:"Traditional dhow sunset cruise", includes:"Dhow, Drinks", area:"West", seo:"Sunset dhow Stone Town traditional" },
   { id:"dhow-nungwi", name:"Sunset Dhow Nungwi/Kendwa", cat:["Half Day","North"], price:40, duration:"2.5 Hours", pickup:"Nungwi", desc:"Best sunset north coast", includes:"Dhow, Drinks", area:"North", seo:"Sunset dhow Nungwi Kendwa best sunset" },
   { id:"dolphin", name:"Kizimkazi Dolphin Tour", cat:["Half Day","South"], price:40, duration:"4 Hours", pickup:"Kizimkazi 6 AM", desc:"Dolphin watching early morning", includes:"Boat, Guide", area:"South", seo:"Kizimkazi dolphin tour early morning" },
   { id:"dolphin-jozani", name:"Dolphin + Jozani + Cave Full Day", cat:["Full Day","South"], price:75, duration:"8 Hours", pickup:"Paje 5:30 AM", desc:"Dolphins + monkeys + cave same day", includes:"Boat, Entrances, Guide", area:"South", seo:"Dolphin + Jozani + cave full day combo" },
   { id:"rock", name:"The Rock Restaurant Tour", cat:["Half Day","East"], price:30, duration:"4 Hours", pickup:"East coast", desc:"Iconic Rock photo + Pongwe beach", includes:"Guide", area:"East", seo:"The Rock Restaurant Pingwe iconic rock" },
   { id:"kite-lesson", name:"Paje Kite Surfing Lesson", cat:["Half Day","East","Water"], price:70, duration:"2 Hours", pickup:"Paje beach", desc:"Beginner kite with instructor + gear", includes:"Instructor, Gear", area:"South-East", seo:"Paje kite lesson beginner certified" },
   { id:"kite-rental", name:"Kite Rental", cat:["Half Day","Water"], price:50, duration:"2 Hours", pickup:"Paje", desc:"For independent riders", includes:"Gear", area:"South-East", seo:"Kite rental Paje independent riders" },
   { id:"sup", name:"SUP / Clear Kayak", cat:["Half Day","Water"], price:25, duration:"2 Hours", pickup:"Paje", desc:"Paddle in lagoon", includes:"Board/Kayak, Guide", area:"South-East", seo:"SUP clear kayak Paje lagoon" },
   { id:"jet", name:"Jet Ski Nungwi", cat:["Half Day","Water","North"], price:60, duration:"30 Min", pickup:"Nungwi beach", desc:"Jet ski ride", includes:"Jet ski, Guide", area:"North", seo:"Jet ski Nungwi beach ride" },
   { id:"parasail", name:"Parasailing Kendwa", cat:["Half Day","Water","North"], price:70, duration:"15 Min", pickup:"Kendwa", desc:"Parasailing view", includes:"Gear, Boat", area:"North", seo:"Parasailing Kendwa beach view" },
   { id:"scuba", name:"Scuba Diving Mnemba", cat:["Half Day","Water","North"], price:90, duration:"4 Hours", pickup:"Nungwi / Matemwe", desc:"2 dives certified", includes:"Gear, Boat, Instructor", area:"North-East", seo:"Scuba diving Mnemba 2 dives certified PADI" },
   { id:"fishing-deep", name:"Deep Sea Fishing Private", cat:["Full Day","Water"], price:350, duration:"6 Hours", pickup:"Nungwi 6 AM", desc:"Private boat marlin/barracuda", includes:"Private boat, Gear, Captain", area:"North", seo:"Deep sea fishing private boat Nungwi" },
   { id:"fishing-local", name:"Local Fishing Ngalawa", cat:["Half Day","Cultural","Water"], price:35, duration:"3 Hours", pickup:"Paje / Jambiani", desc:"Traditional canoe fishing", includes:"Canoe, Guide", area:"South-East", seo:"Local fishing Ngalawa canoe traditional" },
   { id:"quad", name:"Quad Bike + Village", cat:["Half Day","Cultural","East"], price:50, duration:"3 Hours", pickup:"Paje / Bwejuu", desc:"Village + school + beach", includes:"Quad, Guide, Helmet", area:"South-East", seo:"Quad bike Paje village school beach" },
   { id:"horse", name:"Horse Riding Nungwi", cat:["Half Day","North"], price:60, duration:"1 Hour", pickup:"Nungwi", desc:"Beach ride sunset/sunrise", includes:"Horse, Guide", area:"North", seo:"Horse riding Nungwi sunset beach" },
   { id:"mnarani", name:"Mnarani Turtle Aquarium", cat:["Half Day","North"], price:15, duration:"1.5 Hours", pickup:"Nungwi", desc:"Turtle conservation feed + swim", includes:"Entrance, Guide", area:"North", seo:"Mnarani turtle aquarium conservation Nungwi" },
   { id:"chumbe", name:"Chumbe Island Coral Park", cat:["Full Day","South-West"], price:90, duration:"7 Hours", pickup:"Fumba", desc:"Best coral sanctuary private island", includes:"Boat, Entrance $60, Lunch", area:"South-West", seo:"Chumbe Island coral park best sanctuary" },
   { id:"private-sandbank", name:"Private Sandbank BBQ", cat:["Half Day"], price:120, duration:"4 Hours", pickup:"Fumba / Stone Town", desc:"Private boat sandbank honeymoon", includes:"Private boat, BBQ, Drinks", area:"South-West", seo:"Private sandbank BBQ honeymoon romantic" },
   { id:"village", name:"Village Tour Jambiani", cat:["Half Day","Cultural"], price:20, duration:"2.5 Hours", pickup:"Paje / Jambiani", desc:"Seaweed farming + school + market", includes:"Guide, Donation", area:"South-East", seo:"Village tour Jambiani seaweed farming authentic" },
   { id:"cooking", name:"Swahili Cooking Class", cat:["Half Day","Cultural"], price:40, duration:"4 Hours", pickup:"Paje / Stone Town", desc:"Market + cook 3 dishes + eat", includes:"Market, Ingredients, Lunch", area:"South-East", seo:"Swahili cooking class market 3 dishes Paje" },
   { id:"henna", name:"Henna Painting", cat:["Half Day","Cultural"], price:15, duration:"1 Hour", pickup:"Paje / Stone Town", desc:"Traditional henna by mama", includes:"Henna", area:"All", seo:"Henna painting traditional mama cultural art" },
   { id:"bike", name:"Bike Tour Nungwi", cat:["Half Day","North"], price:35, duration:"3 Hours", pickup:"Nungwi / Matemwe", desc:"Bike villages + beach", includes:"Bike, Guide", area:"North", seo:"Bike tour Nungwi villages beach local life" },
   { id:"kendwa-sunset", name:"Kendwa Sunset Beach", cat:["Half Day","North"], price:25, duration:"3 Hours", pickup:"Nungwi / Kendwa", desc:"Best sunset beach + dinner", includes:"Guide", area:"North", seo:"Kendwa sunset beach best sunset dinner" },
   { id:"blue-lagoon", name:"Blue Lagoon Michamvi", cat:["Half Day","East"], price:35, duration:"3 Hours", pickup:"Michamvi / Pongwe", desc:"Hidden lagoon starfish snorkeling", includes:"Boat, Gear, Guide", area:"East", seo:"Blue Lagoon Michamvi starfish hidden lagoon" },
 ]

 const hotelOptions = [
   { label:"Stone Town (West) - $10-$15 local", area:"West" },
   { label:"Nungwi / Kendwa (North) - $15 local", area:"North" },
   { label:"Matemwe (North-East) - $20 local", area:"North-East" },
   { label:"Kiwengwa / Pongwe (East) - $25 local", area:"East" },
   { label:"Paje / Bwejuu (South-East) - $15 local", area:"South-East" },
   { label:"Jambiani / Makunduchi (South) - $20 local", area:"South" },
   { label:"Kizimkazi / Fumba (South-West) - $15 local", area:"South-West" },
 ]

 const transportMatrix: any = {
   "West": { "West": 10, "Central": 20, "South-Central": 35, "South": 40, "South-East": 40, "East": 35, "North-East": 40, "North": 40, "South-West": 35, "All": 15 },
   "North": { "West": 40, "Central": 35, "South-Central": 50, "South": 60, "South-East": 55, "East": 40, "North-East": 20, "North": 15, "South-West": 55, "All": 15 },
   "North-East": { "West": 40, "Central": 30, "South-Central": 45, "South": 55, "South-East": 50, "East": 25, "North-East": 15, "North": 20, "South-West": 50, "All": 15 },
   "East": { "West": 35, "Central": 25, "South-Central": 30, "South": 35, "South-East": 30, "East": 15, "North-East": 25, "North": 40, "South-West": 40, "All": 15 },
   "South-East": { "West": 40, "Central": 30, "South-Central": 20, "South": 25, "South-East": 15, "East": 25, "North-East": 50, "North": 55, "South-West": 35, "All": 15 },
   "South": { "West": 40, "Central": 35, "South-Central": 25, "South": 15, "South-East": 20, "East": 30, "North-East": 55, "North": 60, "South-West": 30, "All": 15 },
   "South-West": { "West": 35, "Central": 30, "South-Central": 30, "South": 30, "South-East": 35, "East": 40, "North-East": 50, "North": 55, "South-West": 15, "All": 15 },
   "Central": { "West": 20, "Central": 10, "South-Central": 20, "South": 30, "South-East": 30, "East": 25, "North-East": 30, "North": 35, "South-West": 30, "All": 15 },
   "South-Central": { "West": 35, "Central": 20, "South-Central": 15, "South": 20, "South-East": 20, "East": 25, "North-East": 45, "North": 50, "South-West": 30, "All": 15 },
 }

 const currentHotelArea = hotelOptions.find(h=>h.label===hotelLocation)?.area || "South-East"
 const transportCalc = useMemo(() => {
   if (selectedTours.length===0) return { perVehicle:0, perPerson:0, breakdown:[] as any[] }
   const uniqueAreas = Array.from(new Set(selectedTours.map(id=> tours.find(t=>t.id===id)?.area || "All")))
   const breakdown = uniqueAreas.map(area=>({ area, cost: transportMatrix[currentHotelArea]?.[area]?? 35 }))
   const perVehicle = breakdown.reduce((s,b)=> s + b.cost, 0)
   const perPerson = pax > 0? perVehicle / pax : perVehicle
   return { perVehicle, perPerson, breakdown }
 }, [selectedTours, currentHotelArea, pax])

 const filtered = filter === "All"? tours : tours.filter(t => t.cat.includes(filter))
 const totalTours = selectedTours.reduce((s,id)=> s + (tours.find(x=>x.id===id)?.price || 0), 0)
 const totalWithTransportPP = totalTours + transportCalc.perPerson
 const totalWithTransportVehicle = totalTours * pax + transportCalc.perVehicle
 const toggleTour = (id:string) => setSelectedTours(p => p.includes(id)? p.filter(x=>x!==id) : [...p, id])
 const comboWa = `https://wa.me/${waNumber}?text=${encodeURIComponent(`Hi HERO! Combo: ${selectedTours.map(id=> tours.find(t=>t.id===id)?.name).join(', ')} = $${totalTours} pp.\nHotel: ${hotelLocation}\nPax: ${pax}\nTransport: $${transportCalc.perVehicle} vehicle = $${transportCalc.perPerson.toFixed(2)} pp\nTOTAL: $${totalWithTransportPP.toFixed(2)} pp = $${totalWithTransportVehicle.toFixed(2)} total\nDate: \nConfirm please.`)}`

 useEffect(() => {
  let map:any = null
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
    const el = document.getElementById('tours-map')
    if (!el || (el as any)._leaflet_id) return
    map = L.map(el, { center: [-6.15, 39.35], zoom: 9, zoomControl: true })
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '© OpenStreetMap', maxZoom: 18 }).addTo(map)
    const points = [
      { name:"Prison Island", pos:[-6.118, 39.173] as [number,number], price:"$55", area:"West" },
      { name:"Stone Town", pos:[-6.1659, 39.199] as [number,number], price:"$25", area:"West" },
      { name:"Spice Farm", pos:[-6.08, 39.28] as [number,number], price:"$22", area:"Central" },
      { name:"Jozani", pos:[-6.24, 39.41] as [number,number], price:"$30", area:"South-Central" },
      { name:"Salaam Cave", pos:[-6.26, 39.45] as [number,number], price:"$25", area:"South-East" },
      { name:"Kuza Cave", pos:[-6.28, 39.51] as [number,number], price:"$28", area:"South-East" },
      { name:"Paje Kite", pos:[-6.266, 39.525] as [number,number], price:"$70", area:"South-East" },
      { name:"Mnemba", pos:[-5.81, 39.37] as [number,number], price:"$45", area:"North-East" },
      { name:"Nungwi", pos:[-5.725, 39.294] as [number,number], price:"$40", area:"North" },
      { name:"Safari Blue", pos:[-6.32, 39.25] as [number,number], price:"$85", area:"South-West" },
      { name:"Kizimkazi", pos:[-6.44, 39.46] as [number,number], price:"$40", area:"South" },
      { name:"The Rock", pos:[-6.11, 39.45] as [number,number], price:"$30", area:"East" },
    ]
    points.forEach(p=>{
      const html = `<div style="background:#0A2342; color:white; padding:4px 8px; border-radius:20px; font-weight:900; font-size:10px; border:2px solid white; box-shadow:0 3px 10px rgba(0,0,0,0.3); white-space:nowrap">📍 ${p.name} • ${p.price}</div>`
      const icon = L.divIcon({ html, className:'', iconSize:[140,26], iconAnchor:[70,13] })
      L.marker(p.pos, { icon }).addTo(map).bindPopup(`<div style="font-family:system-ui"><b>${p.name}</b><br/>${p.area} • ${p.price} pp<br/><a href="https://wa.me/${waNumber}?text=Hi HERO! Book ${p.name}" target="_blank" style="color:#FF8A1A; font-weight:800">Book on WhatsApp</a></div>`)
    })
    setTimeout(()=>{ map.invalidateSize() }, 400)
  }
  init()
  return ()=> { if(map){ map.remove() } }
 }, [])

 return (
 <main className="bg-[#F5F7FA] overflow-x-hidden">
 <Header/>
 <section className="bg-[#0A2342] relative overflow-hidden">
   <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#FF8A1A]/10 rounded-full blur-[120px]"></div>
   <div className="relative px-6 md:px-12 py-10 md:py-14 text-center text-white">
     <span className="bg-white/10 border border-white/10 text-[10px] px-4 py-1.5 rounded-full font-black tracking-widest">38 TOURS • MAP IN BOX • CART NEXT TO TOURS • SEO BELOW</span>
     <h1 className="font-serif font-black text-[26px] md:text-[44px] leading-[0.95] mt-4">All Tours & Excursions<br/><span className="text-[#FF8A1A]">38 Activities - From $15 pp + Transport</span></h1>
   </div>
 </section>

 <section className="bg-white border-b sticky top-0 z-30">
   <div className="px-6 md:px-12 py-3 flex gap-2 overflow-x-auto items-center">
     {["All","Popular","Half Day","Full Day","North","South","East","West","Cultural","Water"].map(cat=>(
       <button key={cat} onClick={()=>setFilter(cat)} className={`px-5 py-2 rounded-full text-[12px] font-bold border whitespace-nowrap transition ${filter===cat? "bg-[#0A2342] text-white border-[#0A2342]" : "bg-[#F5F7FA] border-gray-100"}`}>{cat}</button>
     ))}
     <span className="ml-auto flex items-center gap-2">
       <span className="text-[11px] opacity-60 hidden md:inline">{filtered.length} tours • {selectedTours.length} in cart • ${totalWithTransportPP.toFixed(0)} pp total</span>
       <a href="#cart" className="md:hidden bg-[#FF8A1A] text-white text-[11px] font-black px-4 py-2 rounded-full whitespace-nowrap">View Cart ({selectedTours.length}) • ${totalWithTransportPP.toFixed(0)} pp</a>
     </span>
   </div>
 </section>

 {/* MAP IN ITS OWN BOX - NOT STRETCHING */}
 <section className="px-4 md:px-12 py-8 bg-white">
   <div className="max-w-[900px] mx-auto">
     <div className="text-center mb-4">
       <span className="bg-[#0A2342] text-white text-[10px] px-4 py-1.5 rounded-full font-black tracking-widest">TOURS LOCATION MAP • 12 LOCATIONS • REALTIME</span>
       <h2 className="font-black text-[18px] md:text-[24px] mt-3">Where Each Tour Starts - Click Pins</h2>
       <p className="text-[11px] opacity-60 mt-1">Realtime OpenStreetMap - drag, scroll zoom, click pin to book - transport fee based on hotel area distance</p>
     </div>
     <div className="bg-white border border-gray-200 rounded-[24px] overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
       <div className="relative">
         <div id="tours-map" className="w-full h-[360px] md:h-[420px] z-0" style={{ background:'#E8EEF5', minHeight:'360px' }}></div>
         <div className="absolute top-3 left-3 bg-[#0A2342] text-white text-[10px] px-3 py-1.5 rounded-full font-bold shadow">📍 12 tour locations • Fixed box • Not stretching</div>
       </div>
       <div className="px-4 py-2.5 flex justify-between items-center bg-[#0A2342] text-white text-[10px]">
         <span>© OpenStreetMap • Transport fee auto calculated from hotel area to tour area</span>
         <span className="opacity-60 hidden md:inline">Map in its box - max-w-900px centered</span>
       </div>
     </div>
   </div>
 </section>

 {/* TOURS + CART SIDE BY SIDE - EASY NAVIGATION DURING COMBO */}
 <section className="px-4 md:px-8 py-6 bg-[#F5F7FA]">
   <div className="max-w-[1500px] mx-auto grid lg:grid-cols-12 gap-6 items-start">
     {/* TOURS LEFT */}
     <div className="lg:col-span-8">
       <div className="flex justify-between items-center mb-4">
         <h2 className="font-black text-[18px] md:text-[22px]">All {tours.length} Tours - Add to Cart → See Right Side</h2>
         <span className="text-[11px] opacity-50 bg-white border px-3 py-1 rounded-full">{filtered.length} showing • Cart sticks on right</span>
       </div>
       <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
         {filtered.map(tour=>(
           <div key={tour.id} className={`bg-white rounded-[18px] overflow-hidden border-2 shadow-[0_2px_12px_rgba(0,0,0,0.03)] transition-all ${selectedTours.includes(tour.id)? "border-[#FF8A1A] ring-2 ring-[#FF8A1A]/20" : "border-transparent hover:border-gray-200"}`}>
             <div className="h-[86px] bg-[#F5F7FA] flex items-center justify-center text-[10px] font-bold opacity-40">Image: {tour.id}.jpg</div>
             <div className="p-3.5">
               <div className="flex justify-between items-start gap-2">
                 <p className="font-black text-[12.5px] leading-tight">{tour.name}</p>
                 <span className="bg-[#0A2342] text-white text-[10px] px-2 py-0.5 rounded-full font-bold whitespace-nowrap">${tour.price} pp</span>
               </div>
               <p className="text-[11px] opacity-60 mt-1 leading-snug">{tour.desc}</p>
               <p className="text-[10px] mt-1.5 opacity-50">{tour.area} • {tour.duration} • {tour.pickup}</p>
               <div className="mt-3 flex gap-2">
                 <button onClick={()=>toggleTour(tour.id)} className={`flex-1 py-2 rounded-full text-[11px] font-black transition ${selectedTours.includes(tour.id)? "bg-[#FF8A1A] text-white" : "bg-[#0A2342] text-white hover:bg-black"}`}>{selectedTours.includes(tour.id)? "✓ In Cart" : "Add to Cart +"}</button>
                 <span className="text-[10px] opacity-40 py-2 hidden xl:inline">→ Cart right</span>
               </div>
             </div>
           </div>
         ))}
       </div>
     </div>

     {/* CART RIGHT - STICKY NEXT TO TOURS */}
     <div id="cart" className="lg:col-span-4">
       <div className="sticky top-[56px] bg-white rounded-[24px] border border-black/5 shadow-[0_20px_60px_rgba(0,0,0,0.08)] overflow-hidden">
         <div className="bg-[#0A2342] text-white p-4">
           <div className="flex justify-between items-center">
             <h3 className="font-black text-[15px]">🛒 Combo Cart - Live Next to Tours</h3>
             <span className="bg-white/10 text-[10px] px-2.5 py-1 rounded-full font-bold">{selectedTours.length} tours • {pax} pax</span>
           </div>
           <div className="mt-3 grid grid-cols-2 gap-2">
             <select value={hotelLocation} onChange={e=>setHotelLocation(e.target.value)} className="bg-white text-[#0A2342] rounded-full px-3 py-2.5 text-[11px] font-bold border-0">
               {hotelOptions.map(h=> <option key={h.label} value={h.label}>{h.label}</option>)}
             </select>
             <select value={pax} onChange={e=>setPax(parseInt(e.target.value))} className="bg-white text-[#0A2342] rounded-full px-3 py-2.5 text-[11px] font-bold border-0">
               {[1,2,3,4,5,6].map(n=> <option key={n} value={n}>{n} pax</option>)}
             </select>
           </div>
         </div>

         <div className="p-4 max-h-[36vh] md:max-h-[38vh] overflow-y-auto">
           {selectedTours.length===0? (
             <div className="text-center py-6">
               <p className="text-[32px]">🏝️</p>
               <p className="font-bold text-[12px] mt-2">Cart empty - select tours on left</p>
               <p className="text-[11px] opacity-60 mt-1">Cart stays here while you scroll tours on left. Easy navigation during combo selection.</p>
             </div>
           ) : (
             <div className="space-y-2.5">
               {selectedTours.map(id=>{
                 const t = tours.find(x=>x.id===id)
                 if(!t) return null
                 return (
                   <div key={id} className="flex gap-2.5 bg-[#F5F7FA] rounded-[12px] p-2.5">
                     <div className="flex-1 min-w-0">
                       <p className="font-black text-[11.5px] leading-tight truncate">{t.name}</p>
                       <p className="text-[10px] opacity-60">{t.area} • {t.duration}</p>
                     </div>
                     <div className="text-right shrink-0">
                       <p className="font-black text-[12px]">${t.price}</p>
                       <button onClick={()=>toggleTour(t.id)} className="text-[10px] font-bold text-red-500">✕ Remove</button>
                     </div>
                   </div>
                 )
               })}
             </div>
           )}
         </div>

         <div className="p-4 border-t bg-[#FFFBF5]">
           <p className="font-black text-[11px]">Transport Fee (per vehicle) - Auto Calculated</p>
           <div className="mt-2 space-y-1 text-[11px]">
             {transportCalc.breakdown.map((b:any,i:number)=>(
               <div key={i} className="flex justify-between"><span className="opacity-70">Hotel {currentHotelArea} → {b.area}</span><span className="font-bold">${b.cost}</span></div>
             ))}
             {transportCalc.breakdown.length===0 && <p className="opacity-50 text-[11px]">Select tours to see transport fee</p>}
             <div className="flex justify-between pt-2 border-t font-black"><span>Total Vehicle (up to 4 pax)</span><span className="text-[#FF8A1A]">${transportCalc.perVehicle}</span></div>
             <div className="flex justify-between"><span>Per person ({pax} pax share)</span><span className="font-bold">${transportCalc.perPerson.toFixed(2)} pp</span></div>
           </div>
         </div>

         <div className="p-4 bg-[#0A2342] text-white">
           <div className="space-y-1.5 text-[11px]">
             <div className="flex justify-between opacity-80"><span>Tours total</span><span>${totalTours} pp</span></div>
             <div className="flex justify-between opacity-80"><span>Tours x {pax} pax</span><span>${(totalTours * pax).toFixed(2)}</span></div>
             <div className="flex justify-between opacity-80"><span>Transport vehicle</span><span>${transportCalc.perVehicle}</span></div>
             <div className="flex justify-between pt-2 border-t border-white/20 font-black text-[13px]"><span>TOTAL pp with transport</span><span className="text-[#FF8A1A] text-[18px]">${totalWithTransportPP.toFixed(2)}</span></div>
             <div className="flex justify-between font-black"><span>TOTAL for {pax} pax</span><span className="text-[#FF8A1A] text-[16px]">${totalWithTransportVehicle.toFixed(2)}</span></div>
           </div>
           <a href={comboWa} target="_blank" rel="noopener noreferrer" className="mt-4 w-full bg-[#FF8A1A] hover:bg-[#ff9a33] text-white font-black text-[13px] py-3.5 rounded-full flex justify-center shadow-[0_8px_20px_rgba(255,138,26,0.3)]">💬 Book on WhatsApp → ${totalWithTransportPP.toFixed(2)} pp</a>
           <p className="text-[9px] opacity-50 text-center mt-2">Pay driver after tour. Free cancel 24h.</p>
         </div>
       </div>

       <div className="mt-3 bg-white border rounded-[14px] p-3 text-[10.5px] leading-relaxed">
         <p className="font-black">💡 Easy navigation</p>
         <p className="opacity-70 mt-1">Cart is now right next to tours. Scroll tours on left, cart stays sticky on right. Select → see transport → book. Map is in its own box above, not stretching.</p>
       </div>
     </div>
   </div>
 </section>

 {/* PREVIOUS TEXT BELOW ALL TOURS - SEO - FULL WIDTH */}
 <section className="px-6 md:px-12 py-10 bg-white border-t">
   <div className="max-w-6xl mx-auto">
     <div className="bg-[#FFFBF5] border border-[#FF8A1A]/10 rounded-[24px] p-6 md:p-8">
       <h2 className="font-serif font-black text-[20px] md:text-[28px] leading-tight">Zanzibar Tours & Excursions - Full Guide with Transport Fee Per Vehicle + Per Person - Why Transparent Pricing Boosts SEO and Sales</h2>
       <div className="mt-6 grid md:grid-cols-2 gap-8 text-[12.5px] leading-relaxed opacity-80">
         <div className="space-y-4">
           <p><b>Why transparent transport fee boosts SEO and bookings:</b> Many Zanzibar tour websites show only per person tour price $22-$85 but hide transport fee $15-$60 per vehicle. Tourist books, then arrives and pays extra $40. They leave bad review. Google measures bounce rate, dwell time. If user bounces, ranking drops. HERO shows both transparent: tours price per person + transport fee per vehicle based on hotel location + pax division. Same area as hotel = $15 vehicle, nearby = $20-30, far opposite island = $40-60. If you select 2 tours in same area (e.g., Salaam Cave + Kuza Cave both South-East Paje), transport charged once, not twice. Combo saves transport fee. User stays longer on page → dwell time increases → SEO boost.</p>
           <p><b>North Zanzibar tours (Nungwi, Kendwa, Matemwe) - Best for Mnemba, sunset, water sports:</b> Mnemba Atoll snorkeling $45 per person best coral reef in Zanzibar, dolphins on way from Matemwe 8 AM, boat includes snorkel gear guide water fruit. Mnemba + Dolphin combo $55 early morning 7:30 AM. Sunset Dhow Nungwi/Kendwa $40 best sunset north coast, traditional wooden dhow drinks music romantic. Horse riding Nungwi $60 beach ride sunset/sunrise. Mnarani Turtle Aquarium Nungwi $15 turtle conservation natural lagoon feed turtles swim. Jet Ski Nungwi $60 30 min north coast, Parasailing Kendwa $70 15 min beach view from sky, Scuba diving Mnemba $90 4 hours 2 dives certified PADI instructor gear boat, Deep sea fishing private boat Nungwi $350 6 hours marlin barracuda captain gear, Bike tour Nungwi Matemwe $35 villages beach local life, Kendwa sunset beach $25 best sunset beach dinner.</p>
           <p><b>South Zanzibar tours (Paje, Jambiani, Kizimkazi, Fumba) - Best for Safari Blue, dolphins, monkeys, caves:</b> Safari Blue full day BBQ $85 from Fumba 8 AM Menai Bay Conservation sandbank snorkeling 2 stops seafood BBQ dhow sailing best full day tour south. Kizimkazi dolphin tour $40 early morning 6 AM bottlenose dolphins 90% chance snorkeling south village. Jozani Forest red colobus monkeys $30 only found in Zanzibar mangrove boardwalk endemic monkeys guided tour. Salaam Cave turtle swim $25 natural cave swim with turtles crystal clear water Kizimkazi area. Kuza Cave sacred limestone $28 Jambiani sacred cave swimming cultural history Cherehani village hidden gem. Dolphin + Jozani + Cave full day $75 do 3 tours one day same area Paje Jambiani saves transport. Quad bike adventure Paje Bwejuu $50 village local school beach mud, Local fishing Ngalawa canoe traditional $35 Paje Jambiani cultural experience, Village tour Jambiani $20 seaweed farming school market authentic Zanzibar life, Swahili cooking class $40 market visit cook 3 dishes eat together Paje.</p>
         </div>
         <div className="space-y-4">
           <p><b>West Zanzibar tours (Stone Town) - Best for Prison Island, Nakupenda, Stone Town, Spice Farm, sunset dhow:</b> Prison Island + Nakupenda sandbank $55 most popular Zanzibar tour giant Aldabra tortoises 100 years + white sandbank in Indian Ocean fruit water best half day from Stone Town boat includes entrance $12. Nakupenda sandbank only $35 pure white sand in ocean swimming fruit best morning tour boat from Stone Town. Prison Island tortoises only $40 tortoise sanctuary Changuu Island history snorkeling. Stone Town walking tour $25 UNESCO World Heritage slave market cathedral House of Wonders Forodhani Gardens local guide history 3 hours. Stone Town food tour $30 Forodhani night market tasting Zanzibar pizza sugar cane seafood Swahili coffee 3 hours evening. Spice farm tour $22 30+ spices cloves cinnamon vanilla cardamom tropical fruits tasting traditional medicine why Zanzibar called Spice Island central area 3 hours. Spice farm + cooking class $45 5 hours spice tour + Swahili cooking lesson + eat your food. Sunset dhow cruise Stone Town $35 traditional wooden dhow sunset Indian Ocean soft drinks music romantic 2 hours evening.</p>
           <p><b>East Zanzibar tours (Kiwengwa, Pongwe, Michamvi, Pongwe) - Best for The Rock, Blue Lagoon, kite surfing, SUP:</b> The Rock Restaurant tour $30 iconic restaurant on rock Pingwe Pongwe beach photo stop low tide best east coast 4 hours. Blue Lagoon Michamvi hidden lagoon starfish snorkeling $35 low tide morning Michamvi Pongwe boat gear guide. Paje kite surfing lesson $70 beginner certified instructor kite gear included Paje best kite capital Dec-Mar Jun-Sep windy season 2 hours. Kite rental $50 independent riders gear rental beach assistance. SUP stand up paddle clear kayak $25 paddle in lagoon calm morning transparent kayak Paje beach 2 hours. East coast also has quad bike, village tours.</p>
           <p><b>Chumbe Island Coral Park and Private Sandbank - Best for honeymoon, private, eco:</b> Chumbe Island Coral Park $90 full day 7 hours private island best coral sanctuary snorkeling eco lodge lunch boat entrance $60 lunch guide book 2 days before south-west Fumba. Private sandbank BBQ $120 4 hours private boat sandbank honeymoon romantic private boat Pamunda Pungwe seafood BBQ drinks Fumba Stone Town. These are private tours per boat not per person for honeymoon couples. Henna painting traditional Zanzibar $15 1 hour Paje Stone Town traditional henna by mama cultural art. These tours are less frequent but people search for them.</p>
           <p><b>How transport fee per vehicle works and saves money with combo:</b> Transport fee is per vehicle Toyota Noah/Alphard 7-seater but we sell max 4 pax + luggage for comfort. Not per person. Includes driver, fuel, waiting during tour, return to hotel. Example: Hotel Paje + Jozani $30 + Kuza $28 = $58 pp tours + $15 vehicle /2 pax = $7.50 pp transport = $65.50 pp total with transport. If 4 pax, $15/4 = $3.75 pp transport = $61.75 pp total. If you select 2 tours in different areas, e.g., Paje hotel + Mnemba North-East $45 + Safari Blue South-West $85 = $130 pp tours + $50 + $35 = $85 vehicle /2 pax = $42.50 pp transport = $172.50 pp total. Better to group same area tours same day to save transport: e.g., South tours Jozani + Salaam + Kuza same day = $30+$25+$28=$83 pp + $15 vehicle once /2 pax = $7.50 = $90.50 pp for 3 tours same day. This logic is in cart breakdown - unique areas counted once. SEO keywords: Zanzibar tours price per person, excursions with transport fee per vehicle, Mnemba snorkeling price, Prison Island Nakupenda price, Safari Blue price, Jozani Forest price, Salaam Cave price, Kuza Cave price, Stone Town tour price, Spice Farm tour price, sunset dhow cruise price, Kizimkazi dolphin tour price, The Rock Restaurant tour price, Paje kite surfing lesson price, quad bike Zanzibar price, Chumbe Island price, private sandbank Zanzibar price.</p>
         </div>
       </div>
     </div>

     {/* SOCIAL DISPLAY - EMPTY READY - NO FAKE */}
     <div className="mt-8 grid md:grid-cols-3 gap-6">
       <div className="bg-[#F5F7FA] border-2 border-dashed border-gray-300 rounded-[20px] p-6 text-center">
         <p className="text-[24px]">📸</p>
         <p className="font-black text-[12px] mt-2">Instagram @hero.zanzibar - EMPTY READY</p>
         <p className="text-[11px] opacity-60 mt-2">No fake numbers. When guest tags you, embed post here. Real posts will appear.</p>
         <div className="mt-3 bg-white rounded-[10px] p-2.5 text-[10px] text-left border"><b>Display area:</b> Real Instagram posts will appear here</div>
       </div>
       <div className="bg-[#0A2342] text-white rounded-[20px] p-6 text-center">
         <p className="text-[24px]">🎵</p>
         <p className="font-black text-[12px] mt-2">TikTok @herozanzibar - EMPTY READY</p>
         <p className="text-[11px] opacity-70 mt-2">No fake 2M views. When video goes viral, embed here. Real views show automatically.</p>
         <div className="mt-3 bg-white/10 rounded-[10px] p-2.5 text-[10px] text-left"><b>Display area:</b> Real TikTok videos will appear here</div>
       </div>
       <div className="bg-[#FFFBF5] border-2 border-dashed border-[#FF8A1A]/30 rounded-[20px] p-6 text-center">
         <p className="text-[24px]">⭐</p>
         <p className="font-black text-[12px] mt-2">TripAdvisor + Google - EMPTY READY</p>
         <p className="text-[11px] opacity-60 mt-2">No fake 4.8/5 until real 5 reviews. Leave empty now - better than fake.</p>
         <div className="mt-3 bg-white rounded-[10px] p-2.5 text-[10px] text-left border"><b>Display area:</b> Real TripAdvisor widget will appear here</div>
       </div>
     </div>
   </div>
 </section>

 <section className="bg-[#0A2342] px-6 md:px-12 py-10 text-center text-white">
   <h2 className="font-serif font-black text-[28px] md:text-[36px]">Ready? Book Combo + Transport Now<br/><span className="text-[#FF8A1A]">${totalWithTransportPP.toFixed(2)} pp with Transport • ${totalWithTransportVehicle.toFixed(2)} total for {pax} pax</span></h2>
   <div className="mt-5 flex justify-center gap-3 flex-wrap">
     <a href={comboWa} target="_blank" className="bg-[#FF8A1A] px-8 py-4 rounded-full font-black">💬 Book Combo + Transport WhatsApp</a>
     <a href="/airport-transfers" className="bg-white text-[#0A2342] px-8 py-4 rounded-full font-black">🚕 Airport Transfers Map</a>
   </div>
 </section>

 <Footer/>
 <div className="bg-[#0A2342] border-t border-white/10 px-6 py-5 text-center text-[11px] text-white/60">© 2026 HERO • <a href={`https://wa.me/${devNumber}`} className="underline decoration-[#FF8A1A]">Developed by T256 Group LTD</a></div>
 <a href={comboWa} target="_blank" className="fixed bottom-5 right-4 w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center text-[22px] z-50 shadow-[0_12px_30px_rgba(37,211,102,0.4)]">💬</a>
 <style>{`.font-serif{font-family:Georgia,serif}`}</style>
 </main>
 )
}