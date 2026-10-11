"use client"
import { useState, useEffect, useMemo } from "react"
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const DEFAULT_TRANSFERS = [
  { id:"airport-stone", name:"Airport → Stone Town", price:25, market:40, duration:"15 min", area:"West", desc:"Per CAR up to 6 pax", cat:["Popular"], active:true, images:[], imageDatas:[], image:"", imageData:"" },
  { id:"airport-nungwi", name:"Airport → Nungwi / Kendwa", price:40, market:60, duration:"1h 15m", area:"North", desc:"Per CAR up to 6 pax", cat:["Popular","North"], active:true, images:[], imageDatas:[], image:"", imageData:"" },
  { id:"airport-paje", name:"Airport → Paje / Jambiani", price:40, market:60, duration:"1h", area:"South-East", desc:"Per CAR up to 6 pax", cat:["Popular","South"], active:true, images:[], imageDatas:[], image:"", imageData:"" },
  { id:"airport-matemwe", name:"Airport → Matemwe / Mnemba", price:40, market:60, duration:"1h 20m", area:"North-East", desc:"Per CAR up to 6 pax", cat:["North"], active:true, images:[], imageDatas:[], image:"", imageData:"" },
  { id:"airport-kiwengwa", name:"Airport → Kiwengwa / Pongwe", price:35, market:55, duration:"1h", area:"East", desc:"Per CAR", cat:["East"], active:true, images:[], imageDatas:[], image:"", imageData:"" },
  { id:"paje-nungwi", name:"Paje → Nungwi", price:50, market:70, duration:"1h 30m", area:"North", desc:"Per CAR", cat:["Popular"], active:true, images:[], imageDatas:[], image:"", imageData:"" },
]

function TransferSlider({ transfer }: { transfer: any }) {
  const images = useMemo(() => {
    const datas = (transfer.imageDatas || []).filter((b:string)=> b && b.length > 20)
    if (datas.length > 0) return datas.slice(0,3)
    if (transfer.imageData && transfer.imageData.length > 20) return [transfer.imageData]
    return []
  }, [transfer.imageDatas, transfer.imageData])

  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (images.length <= 1) return
    const timer = setInterval(() => setIndex(i => (i + 1) % images.length), 5000)
    return () => clearInterval(timer)
  }, [images.length])

  if (images.length === 0) {
    return <div className="w-full h-full bg-gradient-to-br from-[#0A2342] to-[#132F5A] flex items-center justify-center text-white/60 text-[10px] font-black">{transfer.area} • {transfer.duration}</div>
  }

  return (
    <div className="w-full h-full relative bg-black">
      {images.map((img:string,i:number)=>(
        <img key={i} src={img} alt={transfer.name} className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${i===index? "opacity-100" : "opacity-0"}`} />
      ))}
      {images.length > 1 && (
        <>
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
            {images.map((_:any,i:number)=><div key={i} className={`h-1.5 rounded-full transition-all ${i===index? "bg-white w-4" : "bg-white/60 w-1.5"}`} />)}
          </div>
          <div className="absolute top-2 right-2 bg-black/60 text-white text-[8px] px-2 py-1 rounded-full">{index+1}/{images.length}</div>
        </>
      )}
    </div>
  )
}

export default function Page(){
  const [transfers, setTransfers] = useState<any[]>(DEFAULT_TRANSFERS)
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
    try {
      const t = localStorage.getItem("hero_transfers")
      if(t){
        const p = JSON.parse(t)
        if(Array.isArray(p) && p.length>0){
          const migrated = p.map((x:any)=> ({...x, imageDatas: x.imageDatas || (x.imageData? [x.imageData] : []), images: x.images || (x.image? [x.image] : []) }))
          setTransfers(migrated)
        }
      }
    } catch {}

    const initMap = async () => {
      const L = await import('leaflet')
      // @ts-ignore
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
      const map = L.map('zanzibar-realtime-map', { center: [-6.15, 39.35], zoom: 9, zoomControl: false })
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '© OpenStreetMap' }).addTo(map)
      L.control.zoom({ position: 'bottomright' }).addTo(map)
      const points = [
        { name: "ZNZ Airport ✈️", pos: [-6.1285, 39.2242] as [number, number], price: "FROM", dist: "Abeid Karume Airport", color: "#0A2342", isAirport: true },
        { name: "Stone Town", pos: [-6.1659, 39.1990] as [number, number], price: "$15", dist: "6km • 12-15min", color: "#00AF87" },
        { name: "Nungwi / Kendwa", pos: [-5.725, 39.294] as [number, number], price: "$40", dist: "58km • 65-75min", color: "#FF8A1A" },
        { name: "Matemwe", pos: [-5.85, 39.352] as [number, number], price: "$40", dist: "52km • 60-70min", color: "#FF8A1A" },
        { name: "Paje / Bwejuu", pos: [-6.266, 39.525] as [number, number], price: "$35", dist: "48km • 50-60min", color: "#00AF87" },
        { name: "Jambiani", pos: [-6.316, 39.543] as [number, number], price: "$40", dist: "55km • 55-65min", color: "#FF8A1A" },
        { name: "Kizimkazi", pos: [-6.446, 39.465] as [number, number], price: "$40", dist: "56km • 60-70min", color: "#0A2342" },
      ]
      const airportPos: [number, number] = [-6.1285, 39.2242]
      points.forEach(p => {
        if (!p.isAirport) L.polyline([airportPos, p.pos], { color: '#0A2342', weight: 1, opacity: 0.18, dashArray: '5, 10' }).addTo(map)
        const html = `<div style="background:${p.color}; color:white; padding:${p.isAirport? '7px 12px' : '5px 9px'}; border-radius:20px; font-weight:900; font-size:${p.isAirport? '12px' : '11px'}; box-shadow:0 4px 14px rgba(0,0,0,0.3); border:2px solid white; white-space:nowrap;">${p.isAirport? '✈️' : '📍'} ${p.name} ${p.price!== 'FROM'? `• ${p.price}` : ''}</div>`
        const icon = L.divIcon({ html, className: 'price-pin', iconSize: [150, 32], iconAnchor: [75, 16] })
        const marker = L.marker(p.pos, { icon }).addTo(map)
        const wa = `https://wa.me/${waNumber}?text=${encodeURIComponent(`Hi HERO! I saw map - I want ${p.name} transfer ${p.price} ${p.dist} per vehicle.`)}`
        marker.bindPopup(`<div style="font-family:system-ui; min-width:170px"><b>${p.name}</b><br/><span style="font-size:11px; opacity:0.7">${p.dist}</span><br/><span style="font-weight:900; color:${p.color}; font-size:18px">${p.price}</span><br/><a href="${wa}" target="_blank" style="display:inline-block; margin-top:8px; background:#0A2342; color:white; padding:7px 14px; border-radius:20px; text-decoration:none; font-size:11px; font-weight:800">Book on WhatsApp</a></div>`)
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
          <span className="bg-white/10 border border-white/10 text-[10px] px-4 py-1.5 rounded-full font-black tracking-widest">ABEID AMANI KARUME AIRPORT (ZNZ) • FIXED PER VEHICLE • 3 PICS SLIDER • 24/7</span>
          <h1 className="font-serif font-black text-[32px] md:text-[52px] leading-[0.95] mt-6">Zanzibar Airport Transfers — Fixed Prices<br/><span className="text-[#FF8A1A]">From $15 Per Vehicle • 3 Pics</span></h1>
          <p className="text-[14px] opacity-80 mt-5 max-w-2xl mx-auto">HERO local team • Fixed per vehicle • Stone Town $15, Paje $35, Nungwi $40 • 3 pics per transfer auto-slide every 5 sec • Flight tracked</p>
        </div>
      </section>

      {/* NEW: TRANSFERS FROM ADMIN WITH 3 PICS SLIDER */}
      <section className="px-6 md:px-12 py-10 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-black text-[20px]">Transfers from Admin - {transfers.length} • 3 Pics per Card • 5s Auto-Slide • {transfers[0]?.imageDatas?.filter((b:string)=>b).length||0} pics loaded</h2>
          <div className="grid md:grid-cols-3 gap-5 mt-6">
            {transfers.filter(t=>t.active).map((tr:any)=>(
              <div key={tr.id} className="bg-[#F5F7FA] rounded-[20px] overflow-hidden border">
                <div className="h-[180px]"><TransferSlider transfer={tr} /></div>
                <div className="p-4">
                  <p className="font-black text-[13px]">{tr.name}</p>
                  <p className="text-[11px] opacity-60">{tr.desc} • {tr.duration}</p>
                  <div className="mt-3 flex justify-between items-center">
                    <p className="font-black text-[18px]">${tr.price}<span className="text-[11px] font-medium opacity-60"> /vehicle</span></p>
                    <a href={getWaLink(tr.name, tr.price)} target="_blank" className="bg-[#0A2342] text-white px-4 py-2 rounded-full text-[11px] font-bold">Book</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REALTIME MAP */}
      <section className="px-6 md:px-12 py-12 md:py-16 bg-white border-y">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white border rounded-[24px] overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.08)]">
            <div id="zanzibar-realtime-map" className="w-full h-[440px] md:h-[500px]" style={{ background: '#eef2f7' }}></div>
            <div className="px-4 py-3 flex justify-between items-center bg-[#0A2342] text-white text-[10px]">
              <span>📍 Click pin → Book</span><span className="opacity-60">Drag • Scroll to zoom</span>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="px-6 md:px-12 py-12 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mt-10">
            {pricing.map((x,i)=>(
              <div key={i} className="bg-white border rounded-[20px] p-4 shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
                {x.popular && <span className="bg-[#0A2342] text-white text-[9px] px-3 py-1 rounded-full font-black">POPULAR</span>}
                <p className="font-bold text-[12px] mt-2">{x.route}</p>
                <p className="text-[10px] opacity-60">{x.distance} • {x.time}</p>
                <p className="font-black text-[26px] mt-3 text-[#0A2342]">${x.price}<span className="text-[11px] font-medium opacity-60 ml-1">vehicle</span></p>
                <a href={getWaLink(x.route, x.price)} target="_blank" className="mt-4 w-full bg-[#0A2342] text-white text-[11px] font-bold py-2.5 rounded-full flex justify-center">Book on WhatsApp</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer/>
      <div className="bg-[#0A2342] border-t border-white/10 px-6 md:px-12 py-6 text-center">
        <p className="text-[11px] text-white/50">© 2026 HERO Shuttle & Tours • Developed by T256 Group LTD</p>
      </div>
      <a href={getWaLink("Airport Transfer", 35)} target="_blank" className="fixed bottom-6 right-4 w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center text-[22px] z-50">💬</a>
      <style>{`.font-serif{font-family:Georgia,serif}.price-pin{background:transparent!important; border:none!important;}`}</style>
    </main>
  )
}