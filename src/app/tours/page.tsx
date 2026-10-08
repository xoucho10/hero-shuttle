"use client"
import { useState, useEffect, useMemo } from "react"
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const DEFAULT_TOURS = [
  { id:"prison-nakupenda", name:"Prison Island + Nakupenda", cat:["Popular","Half Day"], price:250, market:350, duration:"5 Hours", pickup:"Stone Town 8:30 AM", desc:"Tortoise sanctuary + sandbank + fruit", includes:"Boat, Guide, Entrance, Fruit, Water", area:"West", active:true, image:"prison-nakupenda.jpg", featured:true, imageData:"" },
  { id:"nakupenda-only", name:"Nakupenda Sandbank Only", cat:["Half Day","Popular"], price:130, market:200, duration:"4 Hours", pickup:"Stone Town 9 AM", desc:"White sandbank in ocean, swimming", includes:"Boat, Fruit, Water", area:"West", active:true, image:"nakupenda-only.jpg", featured:true, imageData:"" },
  { id:"prison-only", name:"Prison Island Tortoises", cat:["Half Day"], price:135, market:210, duration:"3 Hours", pickup:"Stone Town", desc:"Giant tortoises 100+ years", includes:"Boat, Entrance, Guide", area:"West", active:true, image:"prison-only.jpg", featured:false, imageData:"" },
  { id:"stone-town", name:"Stone Town Walking Tour", cat:["Popular","Half Day","Cultural"], price:120, market:180, duration:"3 Hours", pickup:"Stone Town", desc:"UNESCO, Slave Market, House of Wonders", includes:"Guide, Entrances", area:"West", active:true, image:"stone-town.jpg", featured:true, imageData:"" },
  { id:"spice", name:"Spice Farm Tour", cat:["Half Day","Cultural"], price:100, market:150, duration:"3 Hours", pickup:"Stone Town", desc:"30+ spices + fruits tasting", includes:"Guide, Tasting", area:"Central", active:true, image:"spice.jpg", featured:false, imageData:"" },
  { id:"jozani", name:"Jozani Forest Monkeys", cat:["Popular","Half Day"], price:90, market:140, duration:"2.5 Hours", pickup:"Paje / Stone Town", desc:"Red colobus monkeys only in Zanzibar", includes:"Entrance, Guide", area:"South-Central", active:true, image:"jozani.jpg", featured:true, imageData:"" },
  { id:"salaam", name:"Salaam Cave Turtle Swim", cat:["Half Day"], price:100, market:150, duration:"2 Hours", pickup:"Paje / Jambiani", desc:"Swim with turtles in cave", includes:"Entrance, Guide", area:"South-East", active:true, image:"salaam.jpg", featured:false, imageData:"" },
  { id:"kuza", name:"Kuza Cave Sacred Swim", cat:["Half Day","Cultural"], price:130, market:190, duration:"3 Hours", pickup:"Paje / Jambiani", desc:"Sacred limestone cave + culture", includes:"Entrance, Guide", area:"South-East", active:true, image:"kuza.jpg", featured:false, imageData:"" },
  { id:"mnemba", name:"Mnemba Atoll Snorkeling", cat:["Popular","Half Day","North"], price:180, market:260, duration:"4 Hours", pickup:"Matemwe 8 AM", desc:"Best coral reef, colorful fish, dolphins", includes:"Boat, Gear, Guide", area:"North-East", active:true, image:"mnemba.jpg", featured:true, imageData:"" },
  { id:"safari-blue", name:"Sharing Safari Blue Full Day BBQ", cat:["Full Day","Popular","South"], price:190, market:280, duration:"8 Hours", pickup:"Fumba 8 AM", desc:"Sandbank + snorkeling + seafood BBQ +Sharing dhow", includes:"Dhow, BBQ, Drinks, Gear", area:"South-West", active:true, image:"safari-blue.jpg", featured:true, imageData:"" },
  { id:"dhow-stone", name:"Sunset Dhow Stone Town", cat:["Popular","Half Day"], price:80, market:130, duration:"2 Hours", pickup:"Stone Town 4:30 PM", desc:"Traditional dhow sunset cruise", includes:"Dhow, Drinks", area:"West", active:true, image:"dhow-stone.jpg", featured:false, imageData:"" },
  { id:"dolphin", name:"Kizimkazi Dolphin Tour", cat:["Half Day","South"], price:70, market:120, duration:"4 Hours", pickup:"Kizimkazi 6 AM", desc:"Dolphin watching early morning", includes:"Boat, Guide", area:"South", active:true, image:"dolphin.jpg", featured:false, imageData:"" },
  { id:"rock", name:"The Rock Restaurant Tour", cat:["Half Day","East"], price:30, market:60, duration:"4 Hours", pickup:"East coast", desc:"Iconic Rock photo + Pongwe beach", includes:"Guide", area:"East", active:true, image:"rock.jpg", featured:false, imageData:"" },
  { id:"kite-lesson", name:"Paje Kite Surfing Lesson", cat:["Half Day","East","Water"], price:70, market:120, duration:"2 Hours", pickup:"Paje beach", desc:"Beginner kite with instructor + gear", includes:"Instructor, Gear", area:"South-East", active:true, image:"kite-lesson.jpg", featured:false, imageData:"" },
  { id:"quad", name:"Quad Bike + Village", cat:["Half Day","Cultural","East"], price:70, market:110, duration:"3 Hours", pickup:"Paje / Bwejuu", desc:"Village + school + beach", includes:"Quad, Guide, Helmet", area:"South-East", active:true, image:"quad.jpg", featured:false, imageData:"" },
  { id:"chumbe", name:"Chumbe Island Coral Park", cat:["Full Day","South-West"], price:90, market:150, duration:"7 Hours", pickup:"Fumba", desc:"Best coral sanctuary private island", includes:"Boat, Entrance $60, Lunch", area:"South-West", active:true, image:"chumbe.jpg", featured:false, imageData:"" },
  { id:"private-safari-blue", name:"Private Safari Blue Full Day BBQ", cat:["Full Day","Popular","South"], price:220, market:320, duration:"8 Hours", pickup:"8:30 AM", desc:"Sandbank + snorkeling + seafood BBQ + Private dhow", includes:"Dhow, BBQ, Drinks, Gear", area:"West", active:true, image:"private-safari-blue.jpg", featured:true, imageData:"" },
]

export default function ToursPage(){
  const [allTours, setAllTours] = useState<any[]>(DEFAULT_TOURS)
  const [filter, setFilter] = useState("All")
  const [paxCount, setPaxCount] = useState(2)
  const [paxRules, setPaxRules] = useState({ basePax:2, extraPaxPercent:50, maxPax:6 })
  const [waNumber, setWaNumber] = useState("255773628792")
  const [selected, setSelected] = useState<string[]>([])
  const [hotelArea, setHotelArea] = useState("South-East")
  const [hotelOptions, setHotelOptions] = useState<any[]>([
    { label:"Paje / Bwejuu (South-East)", area:"South-East", price:15 },
    { label:"Stone Town (West)", area:"West", price:15 },
    { label:"Nungwi / Kendwa (North)", area:"North", price:40 },
    { label:"Matemwe (North-East)", area:"North-East", price:40 },
  ])
  const [transportMatrix, setTransportMatrix] = useState<any>({})
  const [name, setName] = useState("")
  const [date, setDate] = useState("")

  useEffect(()=>{
    try{
      const t = localStorage.getItem("hero_tours")
      if(t){ const p=JSON.parse(t); if(Array.isArray(p) && p.length>0) setAllTours(p) }
      const px = localStorage.getItem("hero_pax")
      if(px) setPaxRules(JSON.parse(px))
      const w = localStorage.getItem("hero_wa")
      if(w) setWaNumber(w)
      const h = localStorage.getItem("hero_hotels")
      if(h) setHotelOptions(JSON.parse(h))
      const m = localStorage.getItem("hero_matrix")
      if(m) setTransportMatrix(JSON.parse(m))
    }catch{}
  },[])

  const filtered = filter==="All"? allTours.filter(t=>t.active) : allTours.filter(t=>t.active && t.cat.includes(filter))

  const calcPrice = (base:number, pax:number) => {
    if(pax<=paxRules.basePax) return base
    const extra = pax - paxRules.basePax
    return base + (base * paxRules.extraPaxPercent/100 * extra)
  }

  const transportCost = useMemo(()=>{
    if(!selected.length) return 0
    // Get most expensive transport from hotel area to tour areas
    const tourAreas = selected.map(id=> allTours.find(t=>t.id===id)?.area).filter(Boolean)
    let max = 0
    tourAreas.forEach((area:any)=>{
      const cost = transportMatrix[hotelArea]?.[area]?? 15
      if(cost>max) max=cost
    })
    return max
  },[selected, hotelArea, transportMatrix, allTours])

  const toursTotal = selected.reduce((s,id)=>{
    const t=allTours.find(x=>x.id===id)
    return s + calcPrice(t?.price||0, paxCount)
  },0)

  const grandTotal = toursTotal + transportCost

  return (
    <main className="min-h-screen bg-[#F5F7FA]">
      <Header/>
      {/* TOP - SAME AS YOUR SCREENSHOT */}
      <section className="bg-[#0A2342] text-white px-6 md:px-12 py-8 text-center">
        <h1 className="font-black text-[28px] md:text-[30px]">Tours & Excursions - Price for 2 Pax</h1>
        <p className="text-[11px] opacity-60 mt-2">{allTours.filter(t=>t.active).length} Tours • Base for {paxRules.basePax} pax • 3rd & 4th +{paxRules.extraPaxPercent}% • Same data as homepage</p>
        <div className="mt-5 flex justify-center gap-2 flex-wrap max-w-[800px] mx-auto">
          {["All","Popular","Half Day","Full Day","North","South","East","West","Cultural"].map(c=>(
            <button key={c} onClick={()=>setFilter(c)} className={`px-4 py-2 rounded-full text-[11px] font-black border transition ${filter===c? "bg-white text-[#0A2342] border-white" : "bg-white/10 text-white border-white/20 hover:bg-white/20"}`}>{c}</button>
          ))}
        </div>
        <div className="mt-4 inline-flex bg-white/10 rounded-full p-1 gap-1">
          {[2,3,4,5,6].map(n=>(
            <button key={n} onClick={()=>setPaxCount(n)} className={`px-4 py-2 rounded-full text-[11px] font-black transition ${paxCount===n? "bg-white text-[#0A2342]" : "text-white/70 hover:text-white"}`}>{n} pax {n>2?`+${(n-2)*paxRules.extraPaxPercent}%`: ""}</button>
          ))}
        </div>
      </section>

      <section className="px-4 md:px-8 lg:px-12 py-6">
        <div className="max-w-[1600px] mx-auto flex flex-col lg:flex-row gap-6">
          {/* LEFT GRID - SAME LAYOUT AS YOUR SCREENSHOT 3 COLS */}
          <div className="flex-1 grid md:grid-cols-2 xl:grid-cols-3 gap-5 content-start">
            {filtered.map((t:any)=>(
              <div key={t.id} className="bg-white rounded-[16px] overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition flex flex-col">
                <div className="h-[200px] bg-[#F5F7FA] relative overflow-hidden">
                  {t.imageData? <img src={t.imageData} alt={t.name} className="w-full h-full object-cover"/> : <div className="w-full h-full bg-gradient-to-br from-[#1eb3a5] to-[#0A2342] flex items-center justify-center text-white/50 text-[10px]">{t.image}</div>}
                  <span className="absolute top-3 left-3 bg-[#0A2342] text-white text-[9px] px-2.5 py-1 rounded-full font-black">{t.cat[0]}</span>
                  <span className="absolute top-3 right-3 bg-red-600 text-white text-[9px] w-5 h-5 flex items-center justify-center rounded-full font-black">$</span>
                </div>
                <div className="p-4 flex flex-col flex-1">
                  <p className="font-black text-[13px] leading-tight">{t.name}</p>
                  <p className="text-[10px] opacity-50 mt-1 line-clamp-1">{t.desc}</p>
                  <div className="mt-4 flex justify-between items-end mt-auto">
                    <div>
                      <p className="text-[10px] text-red-600 font-black line-through">$-market</p>
                      <p className="font-black text-[15px]">${t.price} <span className="text-[10px] font-medium opacity-60">for 2 pax</span></p>
                      <p className="text-[9px] font-bold text-green-600 mt-0.5">${t.price} for 2 pax base • Save ${t.market - t.price}</p>
                    </div>
                    <button onClick={()=> setSelected(prev=> prev.includes(t.id)? prev.filter(x=>x!==t.id) : [...prev, t.id])} className={`px-4 py-2 rounded-full text-[10px] font-black transition ${selected.includes(t.id)? "bg-green-600 text-white" : "bg-[#0A2342] text-white hover:bg-black"}`}>{selected.includes(t.id)? "✓ Added" : "Add +"}</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT SIDE - RESTORED MAP + SELECTION + CALCULATION */}
          <div className="w-full lg:w-[380px] flex flex-col gap-4 lg:sticky lg:top-6 h-fit">
            {/* MAP */}
            <div className="bg-white rounded-[16px] border overflow-hidden">
              <div className="p-4 flex justify-between items-center border-b">
                <h3 className="font-black text-[12px]">🗺️ Zanzibar Map - Your Hotel</h3>
                <span className="text-[9px] bg-[#0A2342] text-white px-2 py-1 rounded-full">{hotelArea}</span>
              </div>
              <div className="h-[200px] bg-[#E8F4F8] relative">
                <iframe
                  title="Zanzibar Map"
                  width="100%"
                  height="100%"
                  style={{border:0}}
                  loading="lazy"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=39.0%2C-6.5%2C39.8%2C-5.6&layer=mapnik&marker=-6.1659%2C39.2026"
                />
                <div className="absolute bottom-2 left-2 right-2 bg-white/90 backdrop-blur rounded-full px-3 py-2 flex gap-2">
                  <select value={hotelArea} onChange={e=>setHotelArea(e.target.value)} className="flex-1 bg-[#F5F7FA] rounded-full px-3 py-1.5 text-[10px] font-bold border">
                    {hotelOptions.map((h:any,i:number)=><option key={i} value={h.area}>{h.label}</option>)}
                  </select>
                </div>
              </div>
              <div className="p-3 bg-[#FFFBF5] text-[10px]">
                <p className="font-bold">📍 Pickup: {hotelOptions.find(h=>h.area===hotelArea)?.label || hotelArea}</p>
                <p className="opacity-60 mt-1">Transport cost per vehicle, not per person. Calculated from hotel to tour area.</p>
              </div>
            </div>

            {/* SELECTION & CALCULATION */}
            <div className="bg-white rounded-[16px] border p-5">
              <h3 className="font-black text-[13px]">🛒 Your Selection & Calculation</h3>

              <div className="mt-4 space-y-2">
                <div className="flex gap-2">
                  <input type="date" value={date} onChange={e=>setDate(e.target.value)} className="flex-1 bg-[#F5F7FA] rounded-full px-3 py-2.5 text-[11px] font-bold border"/>
                  <select value={paxCount} onChange={e=>setPaxCount(parseInt(e.target.value))} className="w-[110px] bg-[#F5F7FA] rounded-full px-3 py-2.5 text-[11px] font-bold border">
                    {[2,3,4,5,6].map(n=> <option key={n} value={n}>{n} pax {n>2?`+${(n-2)*paxRules.extraPaxPercent}%`: ""}</option>)}
                  </select>
                </div>
                <input value={name} onChange={e=>setName(e.target.value)} placeholder="Your Name" className="w-full bg-[#F5F7FA] rounded-full px-4 py-2.5 text-[11px] font-bold border"/>
              </div>

              <div className="mt-5">
                {selected.length===0? (
                  <div className="bg-[#F5F7FA] rounded-[12px] p-4 text-center">
                    <p className="text-[11px] opacity-60">No tours selected yet</p>
                    <p className="text-[10px] opacity-40 mt-1">Click Add + on cards</p>
                  </div>
                ) : (
                  <div className="space-y-2 max-h-[180px] overflow-y-auto pr-1">
                    {selected.map(id=>{
                      const t = allTours.find(x=>x.id===id)
                      return (
                        <div key={id} className="flex justify-between items-center bg-[#F5F7FA] rounded-full px-3 py-2">
                          <span className="text-[11px] font-bold truncate flex-1">{t?.name}</span>
                          <span className="text-[11px] font-black ml-2">${calcPrice(t?.price||0, paxCount)}</span>
                          <button onClick={()=>setSelected(prev=>prev.filter(x=>x!==id))} className="ml-2 text-red-500 font-black text-[12px]">×</button>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>

              <div className="mt-5 border-t pt-4 space-y-2 text-[11px]">
                <div className="flex justify-between"><span className="opacity-60">Tours ({selected.length}) for {paxCount} pax</span><span className="font-black">${toursTotal}</span></div>
                <div className="flex justify-between"><span className="opacity-60">Transport ({hotelArea} → tours) per vehicle</span><span className="font-black">${transportCost}</span></div>
                <div className="flex justify-between text-[13px] font-black border-t pt-2 mt-2"><span>Grand Total</span><span>${grandTotal} for {paxCount} pax</span></div>
                <p className="text-[9px] opacity-50 mt-1">Base ${selected.reduce((s,id)=> s + (allTours.find(x=>x.id===id)?.price||0),0)} for 2 pax + {paxCount>2? `${paxCount-2}x${paxRules.extraPaxPercent}% extra pax`: "no extra"} + transport per vehicle</p>
              </div>

              <button
                disabled={selected.length===0}
                onClick={()=>{
                  const list = selected.map(id=>{
                    const t=allTours.find(x=>x.id===id)
                    return `• ${t?.name} - $${calcPrice(t?.price||0, paxCount)} for ${paxCount} pax (base $${t?.price} for 2)`
                  }).join("%0A")
                  const msg=`Hi HERO! Tours Booking:%0A%0AName: ${name}%0ADate: ${date}%0AHotel Area: ${hotelArea} - ${hotelOptions.find(h=>h.area===hotelArea)?.label}%0APax: ${paxCount} (Base 2 pax +${paxRules.extraPaxPercent}% per extra)%0A%0ATours:%0A${list}%0A%0ATours Total: $${toursTotal}%0ATransport: $${transportCost} per vehicle%0AGrand Total: $${grandTotal} for ${paxCount} pax%0A%0AFrom Tours Page - Same as homepage data`
                  window.open(`https://wa.me/${waNumber}?text=${msg}`, "_blank")
                }}
                className={`mt-5 w-full py-3.5 rounded-full font-black text-[12px] transition ${selected.length===0? "bg-gray-200 text-gray-400" : "bg-[#25D366] text-white hover:bg-[#128C7E]"}`}
              >
                {selected.length===0? "Select tours first" : `📲 Book on WhatsApp - $${grandTotal} for ${paxCount} pax`}
              </button>
              <p className="text-[9px] opacity-40 text-center mt-2">Same data as homepage - pulled from /admin cockpit</p>
            </div>

            <div className="bg-[#0A2342] text-white rounded-[16px] p-4">
              <p className="font-black text-[11px]">💡 How pricing works</p>
              <p className="text-[10px] opacity-70 mt-2 leading-relaxed">All prices are FOR 2 PAX as shown in your screenshot $250, $130, $135. 3rd person = +{paxRules.extraPaxPercent}% of base, 4th = +{paxRules.extraPaxPercent}% more. Transport is per vehicle, not per person. Map shows hotel to tour distance. This side panel was missing — now restored.</p>
            </div>
          </div>
        </div>
      </section>

      <Footer/>
    </main>
  )
}