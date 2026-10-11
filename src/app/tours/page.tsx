"use client"
import { useState, useEffect, useMemo } from "react"
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const DEFAULT_TOURS = [
  { id:"prison-nakupenda", name:"Prison Island + Nakupenda", cat:["Popular","Half Day"], price:250, market:350, duration:"5 Hours", pickup:"Stone Town 8:30 AM", desc:"Tortoise sanctuary + sandbank + fruit", includes:"Boat, Guide, Entrance, Fruit, Water", area:"West", active:true, images:["prison-nakupenda.jpg"], imageDatas:[""], image:"prison-nakupenda.jpg", featured:true, imageData:"" },
  { id:"nakupenda-only", name:"Nakupenda Sandbank Only", cat:["Half Day","Popular"], price:130, market:200, duration:"4 Hours", pickup:"Stone Town 9 AM", desc:"White sandbank in ocean, swimming", includes:"Boat, Fruit, Water", area:"West", active:true, images:["nakupenda-only.jpg"], imageDatas:[""], image:"nakupenda-only.jpg", featured:true, imageData:"" },
  { id:"prison-only", name:"Prison Island Tortoises", cat:["Half Day"], price:135, market:210, duration:"3 Hours", pickup:"Stone Town", desc:"Giant tortoises 100+ years", includes:"Boat, Entrance, Guide", area:"West", active:true, images:["prison-only.jpg"], imageDatas:[""], image:"prison-only.jpg", featured:false, imageData:"" },
  { id:"stone-town", name:"Stone Town Walking Tour", cat:["Popular","Half Day","Cultural"], price:120, market:180, duration:"3 Hours", pickup:"Stone Town", desc:"UNESCO, Slave Market, House of Wonders", includes:"Guide, Entrances", area:"West", active:true, images:["stone-town.jpg"], imageDatas:[""], image:"stone-town.jpg", featured:true, imageData:"" },
  { id:"spice", name:"Spice Farm Tour", cat:["Half Day","Cultural"], price:100, market:150, duration:"3 Hours", pickup:"Stone Town", desc:"30+ spices + fruits tasting", includes:"Guide, Tasting", area:"Central", active:true, images:["spice.jpg"], imageDatas:[""], image:"spice.jpg", featured:false, imageData:"" },
  { id:"jozani", name:"Jozani Forest Monkeys", cat:["Popular","Half Day"], price:90, market:140, duration:"2.5 Hours", pickup:"Paje / Stone Town", desc:"Red colobus monkeys only in Zanzibar", includes:"Entrance, Guide", area:"South-Central", active:true, images:["jozani.jpg"], imageDatas:[""], image:"jozani.jpg", featured:true, imageData:"" },
  { id:"salaam", name:"Salaam Cave Turtle Swim", cat:["Half Day"], price:100, market:150, duration:"2 Hours", pickup:"Paje / Jambiani", desc:"Swim with turtles in cave", includes:"Entrance, Guide", area:"South-East", active:true, images:["salaam.jpg"], imageDatas:[""], image:"salaam.jpg", featured:false, imageData:"" },
  { id:"kuza", name:"Kuza Cave Sacred Swim", cat:["Half Day","Cultural"], price:130, market:190, duration:"3 Hours", pickup:"Paje / Jambiani", desc:"Sacred limestone cave + culture", includes:"Entrance, Guide", area:"South-East", active:true, images:["kuza.jpg"], imageDatas:[""], image:"kuza.jpg", featured:false, imageData:"" },
  { id:"mnemba", name:"Mnemba Atoll Snorkeling", cat:["Popular","Half Day","North"], price:180, market:260, duration:"4 Hours", pickup:"Matemwe 8 AM", desc:"Best coral reef, colorful fish, dolphins", includes:"Boat, Gear, Guide", area:"North-East", active:true, images:["mnemba.jpg"], imageDatas:[""], image:"mnemba.jpg", featured:true, imageData:"" },
  { id:"safari-blue", name:"Sharing Safari Blue Full Day BBQ", cat:["Full Day","Popular","South"], price:190, market:280, duration:"8 Hours", pickup:"Fumba 8 AM", desc:"Sandbank + snorkeling + seafood BBQ +Sharing dhow", includes:"Dhow, BBQ, Drinks, Gear", area:"South-West", active:true, images:["safari-blue.jpg"], imageDatas:[""], image:"safari-blue.jpg", featured:true, imageData:"" },
  { id:"dhow-stone", name:"Sunset Dhow Stone Town", cat:["Popular","Half Day"], price:80, market:130, duration:"2 Hours", pickup:"Stone Town 4:30 PM", desc:"Traditional dhow sunset cruise", includes:"Dhow, Drinks", area:"West", active:true, images:["dhow-stone.jpg"], imageDatas:[""], image:"dhow-stone.jpg", featured:false, imageData:"" },
  { id:"dolphin", name:"Kizimkazi Dolphin Tour", cat:["Half Day","South"], price:70, market:120, duration:"4 Hours", pickup:"Kizimkazi 6 AM", desc:"Dolphin watching early morning", includes:"Boat, Guide", area:"South", active:true, images:["dolphin.jpg"], imageDatas:[""], image:"dolphin.jpg", featured:false, imageData:"" },
  { id:"rock", name:"The Rock Restaurant Tour", cat:["Half Day","East"], price:30, market:60, duration:"4 Hours", pickup:"East coast", desc:"Iconic Rock photo + Pongwe beach", includes:"Guide", area:"East", active:true, images:["rock.jpg"], imageDatas:[""], image:"rock.jpg", featured:false, imageData:"" },
  { id:"kite-lesson", name:"Paje Kite Surfing Lesson", cat:["Half Day","East","Water"], price:70, market:120, duration:"2 Hours", pickup:"Paje beach", desc:"Beginner kite with instructor + gear", includes:"Instructor, Gear", area:"South-East", active:true, images:["kite-lesson.jpg"], imageDatas:[""], image:"kite-lesson.jpg", featured:false, imageData:"" },
  { id:"quad", name:"Quad Bike + Village", cat:["Half Day","Cultural","East"], price:70, market:110, duration:"3 Hours", pickup:"Paje / Bwejuu", desc:"Village + school + beach", includes:"Quad, Guide, Helmet", area:"South-East", active:true, images:["quad.jpg"], imageDatas:[""], image:"quad.jpg", featured:false, imageData:"" },
  { id:"chumbe", name:"Chumbe Island Coral Park", cat:["Full Day","South-West"], price:90, market:150, duration:"7 Hours", pickup:"Fumba", desc:"Best coral sanctuary private island", includes:"Boat, Entrance $60, Lunch", area:"South-West", active:true, images:["chumbe.jpg"], imageDatas:[""], image:"chumbe.jpg", featured:false, imageData:"" },
  { id:"private-safari-blue", name:"Private Safari Blue Full Day BBQ", cat:["Full Day","Popular","South"], price:220, market:320, duration:"8 Hours", pickup:"8:30 AM", desc:"Sandbank + snorkeling + seafood BBQ + Private dhow", includes:"Dhow, BBQ, Drinks, Gear", area:"West", active:true, images:["private-safari-blue.jpg"], imageDatas:[""], image:"private-safari-blue.jpg", featured:true, imageData:"" },
]

function TourImageSlider({ tour }: { tour: any }) {
  const images = useMemo(() => {
    const datas = (tour.imageDatas || []).filter((b: string) => b && b.length > 20)
    if (datas.length > 0) return datas.slice(0,3)
    if (tour.imageData && tour.imageData.length > 20) return [tour.imageData]
    return []
  }, [tour.imageDatas, tour.imageData])

  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (images.length <= 1) return
    const timer = setInterval(() => setIndex(i => (i + 1) % images.length), 5000)
    return () => clearInterval(timer)
  }, [images.length])

  if (images.length === 0) {
    return <div className="w-full h-full bg-gradient-to-br from-[#1eb3a5] to-[#0A2342] flex items-center justify-center text-white/50 text-[10px]">{tour.id}</div>
  }

  return (
    <div className="w-full h-full relative bg-black">
      {images.map((img: string, i: number) => (
        <img key={i} src={img} alt={`${tour.name} ${i+1}`} className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${i === index? "opacity-100" : "opacity-0"}`} />
      ))}
      {images.length > 1 && (
        <>
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
            {images.map((_: any, i: number) => (
              <div key={i} className={`h-1.5 rounded-full transition-all ${i === index? "bg-white w-4" : "bg-white/60 w-1.5"}`} />
            ))}
          </div>
          <div className="absolute top-3 right-3 bg-black/60 text-white text-[8px] px-2 py-1 rounded-full">{index+1}/{images.length}</div>
        </>
      )}
      <div className="absolute top-3 left-3 bg-[#0A2342] text-white text-[9px] px-2.5 py-1 rounded-full font-black">{tour.cat[0]}</div>
    </div>
  )
}

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
      if(t){
        const p=JSON.parse(t);
        if(Array.isArray(p) && p.length>0) {
          const migrated = p.map((x:any)=> ({
          ...x,
            imageDatas: x.imageDatas || (x.imageData? [x.imageData] : []),
            images: x.images || (x.image? [x.image] : [])
          }))
          setAllTours(migrated)
        }
      }
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
  const calcPrice = (base:number, pax:number) => pax<=paxRules.basePax? base : base + (base * paxRules.extraPaxPercent/100 * (pax-paxRules.basePax))
  const transportCost = useMemo(()=>{
    if(!selected.length) return 0
    const tourAreas = selected.map(id=> allTours.find(t=>t.id===id)?.area).filter(Boolean)
    let max = 0
    tourAreas.forEach((area:any)=>{
      const cost = transportMatrix[hotelArea]?.[area]?? 15
      if(cost>max) max=cost
    })
    return max
  },[selected, hotelArea, transportMatrix, allTours])
  const toursTotal = selected.reduce((s,id)=> s + calcPrice(allTours.find(x=>x.id===id)?.price||0, paxCount),0)
  const grandTotal = toursTotal + transportCost

  return (
    <main className="min-h-screen bg-[#F5F7FA]">
      <Header/>
      <section className="bg-[#0A2342] text-white px-6 md:px-12 py-8 text-center">
        <h1 className="font-black text-[28px]">Tours - {allTours.filter(t=>t.active).length} Tours • 3 Pics Auto-Slide 5s</h1>
        <p className="text-[11px] opacity-60 mt-2">Data from admin localStorage {allTours[0]?.imageDatas?.filter(Boolean).length||0} pics loaded</p>
        <div className="mt-5 flex justify-center gap-2 flex-wrap max-w-[800px] mx-auto">
          {["All","Popular","Half Day","Full Day","North","South","East","West","Cultural"].map(c=>(
            <button key={c} onClick={()=>setFilter(c)} className={`px-4 py-2 rounded-full text-[11px] font-black border ${filter===c? "bg-white text-[#0A2342]" : "bg-white/10 text-white border-white/20"}`}>{c}</button>
          ))}
        </div>
        <div className="mt-4 inline-flex bg-white/10 rounded-full p-1 gap-1">
          {[2,3,4,5,6].map(n=><button key={n} onClick={()=>setPaxCount(n)} className={`px-4 py-2 rounded-full text-[11px] font-black ${paxCount===n? "bg-white text-[#0A2342]" : "text-white/70"}`}>{n} pax</button>)}
        </div>
      </section>
      <section className="px-4 md:px-8 lg:px-12 py-6">
        <div className="max-w-[1600px] mx-auto flex flex-col lg:flex-row gap-6">
          <div className="flex-1 grid md:grid-cols-2 xl:grid-cols-3 gap-5">
            {filtered.map((t:any)=>(
              <div key={t.id} className="bg-white rounded-[16px] overflow-hidden border shadow-sm flex flex-col">
                <div className="h-[200px] relative overflow-hidden"><TourImageSlider tour={t} /></div>
                <div className="p-4 flex flex-col flex-1">
                  <p className="font-black text-[13px]">{t.name}</p>
                  <p className="text-[10px] opacity-50 mt-1">{t.desc}</p>
                  <div className="mt-4 flex justify-between items-end mt-auto">
                    <div><p className="text-[10px] text-red-600 font-black line-through">${t.market}</p><p className="font-black text-[15px]">${t.price}</p></div>
                    <button onClick={()=> setSelected(prev=> prev.includes(t.id)? prev.filter(x=>x!==t.id) : [...prev, t.id])} className={`px-4 py-2 rounded-full text-[10px] font-black ${selected.includes(t.id)? "bg-green-600 text-white" : "bg-[#0A2342] text-white"}`}>{selected.includes(t.id)? "✓ Added" : "Add +"}</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="w-full lg:w-[380px] lg:sticky lg:top-6 h-fit space-y-4">
            <div className="bg-white rounded-[16px] border p-5">
              <h3 className="font-black text-[13px]">🛒 Total: ${grandTotal} ({selected.length} tours)</h3>
              <button onClick={()=>{
                const list = selected.map(id=> allTours.find(x=>x.id===id)?.name).join("%0A")
                window.open(`https://wa.me/${waNumber}?text=Hi HERO!%0A${list}%0ATotal $${grandTotal}`, "_blank")
              }} className="mt-4 w-full py-3.5 rounded-full font-black bg-[#25D366] text-white text-[12px]">📲 Book WhatsApp</button>
            </div>
          </div>
        </div>
      </section>
      <Footer/>
    </main>
  )
}