"use client"
import { useState, useEffect, useMemo } from "react"
import Header from '@/components/Header'

const ADMIN_PASSWORD = "hero2026"

// DEFAULT CONTENT FOR ALL PAGES - EDITABLE WITHOUT CODING
const DEFAULT_CMS = {
  site: { waNumber:"255773628792", siteName:"HERO Shuttle & Tours", tagline:"Zanzibar No.1 Transfers & Tours" },
  home: {
    heroBadge:"ZANZIBAR'S MOST TRUSTED - FIXED PRICE - NO BARGAINING - 24/7",
    heroTitle:"Zanzibar Airport Transfers & Tours",
    heroTitleOrange:"Fixed $15-$40 Per Vehicle",
    heroDesc:"Stone Town based local team. Airport transfers $15 Stone Town $35 Paje $40 Nungwi per vehicle up to 4 pax = $3.75 pp when 4 share. 38 tours $15-$90 pp + transparent transport fee $10-$60 per vehicle. Pay driver after trip.",
    heroBtn1:"🚕 Airport Transfers $15-$40 Map",
    heroBtn2:"🏝️ 38 Tours + Transport Fee",
    stats: [
      { num:"$15-$40", label:"Per Vehicle Transfers" },
      { num:"38", label:"Tours & Excursions" },
      { num:"24/7", label:"WhatsApp Reply" },
      { num:"$10-$60", label:"Transport Fee Per Vehicle" },
    ]
  },
  about: {
    title:"About HERO Shuttle & Tours - Stone Town Based Local Team",
    story:"We are local drivers from Stone Town, Nungwi, Paje, Kizimkazi, Kiwengwa. We know every hotel gate, every bumpy last 5km, every Jozani monkey crossing time, every tide time for The Rock Restaurant. Not Arusha based, not broker.",
    mission:"Fixed price $15-$40 per vehicle, transparent transport fee $10-$60 per vehicle, licensed, insured, pay after trip, no advance, free cancel 24h."
  },
  contact: {
    base:"Stone Town, Zanzibar - Local team, licensed operator",
    hours:"24/7 same price day & night, 60 min free wait, flight tracking",
    payInfo:"Pay driver directly after trip USD, TZS, Euro, M-Pesa, Tigo Pesa, Airtel Money"
  },
  travelGuide: {
    intro:"Complete Zanzibar travel guide 2026 - best time to visit, where to stay, costs, safety, SIM, money, food, packing list, 38 tours, map, FAQ - SEO booster page"
  }
}

const DEFAULT_TOURS = [
  { id:"prison-nakupenda", name:"Prison Island + Nakupenda", cat:["Popular","Half Day"], price:55, duration:"5 Hours", pickup:"Stone Town 8:30 AM", desc:"Tortoise sanctuary + sandbank + fruit", includes:"Boat, Guide, Entrance, Fruit, Water", area:"West", seo:"Most popular - giant tortoises 100 years + white sandbank", active:true, image:"" },
  { id:"mnemba", name:"Mnemba Atoll Snorkeling", cat:["Popular","Half Day","North"], price:45, duration:"4 Hours", pickup:"Matemwe 8 AM", desc:"Best coral reef, colorful fish, dolphins", includes:"Boat, Gear, Guide", area:"North-East", seo:"Mnemba Atoll best coral reef snorkeling", active:true, image:"" },
  { id:"safari-blue", name:"Safari Blue Full Day BBQ", cat:["Full Day","Popular","South"], price:85, duration:"8 Hours", pickup:"Fumba 8 AM", desc:"Sandbank + snorkeling + seafood BBQ + dhow", includes:"Dhow, BBQ, Drinks, Gear", area:"South-West", seo:"Safari Blue full day Fumba BBQ", active:true, image:"" },
  { id:"jozani", name:"Jozani Forest Monkeys", cat:["Popular","Half Day"], price:30, duration:"2.5 Hours", pickup:"Paje / Stone Town", desc:"Red colobus monkeys only in Zanzibar", includes:"Entrance, Guide", area:"South-Central", seo:"Jozani red colobus monkeys", active:true, image:"" },
  { id:"salaam", name:"Salaam Cave Turtle Swim", cat:["Half Day"], price:25, duration:"2 Hours", pickup:"Paje / Jambiani", desc:"Swim with turtles in cave", includes:"Entrance, Guide", area:"South-East", seo:"Salaam Cave turtle swim", active:true, image:"" },
  { id:"kuza", name:"Kuza Cave Sacred Swim", cat:["Half Day","Cultural"], price:28, duration:"3 Hours", pickup:"Paje / Jambiani", desc:"Sacred limestone cave + culture", includes:"Entrance, Guide", area:"South-East", seo:"Kuza Cave sacred limestone", active:true, image:"" },
  { id:"stone-town", name:"Stone Town Walking Tour", cat:["Popular","Half Day","Cultural"], price:25, duration:"3 Hours", pickup:"Stone Town", desc:"UNESCO, Slave Market, House of Wonders", includes:"Guide, Entrances", area:"West", seo:"Stone Town UNESCO walking tour", active:true, image:"" },
  { id:"spice", name:"Spice Farm Tour", cat:["Half Day","Cultural"], price:22, duration:"3 Hours", pickup:"Stone Town", desc:"30+ spices + fruits tasting", includes:"Guide, Tasting", area:"Central", seo:"Spice farm 30+ spices", active:true, image:"" },
]

export default function AdminPage(){
 const [auth, setAuth] = useState(false)
 const [pass, setPass] = useState("")
 const [tab, setTab] = useState("overview")
 const [cms, setCms] = useState<any>(DEFAULT_CMS)
 const [tours, setTours] = useState<any[]>(DEFAULT_TOURS)
 const [editingTour, setEditingTour] = useState<any>(null)
 const [hotelOptions, setHotelOptions] = useState([
   { label:"Stone Town (West)", area:"West", price:15 },
   { label:"Nungwi / Kendwa (North)", area:"North", price:40 },
   { label:"Matemwe (North-East)", area:"North-East", price:40 },
   { label:"Kiwengwa / Pongwe (East)", area:"East", price:35 },
   { label:"Paje / Bwejuu (South-East)", area:"South-East", price:35 },
   { label:"Jambiani / Makunduchi (South)", area:"South", price:40 },
   { label:"Kizimkazi / Fumba (South-West)", area:"South-West", price:40 },
 ])

 useEffect(()=>{
   if(localStorage.getItem("hero_admin_auth")==="1") setAuth(true)
   const savedCMS = localStorage.getItem("hero_cms")
   if(savedCMS) setCms(JSON.parse(savedCMS))
   const savedTours = localStorage.getItem("hero_tours")
   if(savedTours) setTours(JSON.parse(savedTours))
   const savedHotels = localStorage.getItem("hero_hotels")
   if(savedHotels) setHotelOptions(JSON.parse(savedHotels))
 }, [])

 const saveAll = () => {
   localStorage.setItem("hero_cms", JSON.stringify(cms))
   localStorage.setItem("hero_tours", JSON.stringify(tours))
   localStorage.setItem("hero_hotels", JSON.stringify(hotelOptions))
   localStorage.setItem("hero_wa", cms.site.waNumber)
   alert("✅ Saved! Changes live in your browser for testing. Go to Export tab to download file for live deployment.")
 }

 if(!auth){
   return (
     <main className="min-h-screen bg-[#0A2342] flex items-center justify-center px-6">
       <div className="bg-white rounded-[24px] p-8 max-w-sm w-full text-center">
         <p className="text-[32px]">🔐</p>
         <h1 className="font-black text-[20px] mt-2">HERO Admin - Edit All Pages</h1>
         <p className="text-[11px] opacity-60 mt-2">Home, Transfers, Tours, Car Rentals, About, Blog, Contact, Travel Guide - No coding</p>
         <input type="password" value={pass} onChange={e=>setPass(e.target.value)} placeholder="Password: hero2026" className="mt-6 w-full bg-[#F5F7FA] border rounded-full px-4 py-3 text-[13px] text-center"/>
         <button onClick={()=>{ if(pass===ADMIN_PASSWORD){ localStorage.setItem("hero_admin_auth","1"); setAuth(true)} else alert("Wrong")}} className="mt-3 w-full bg-[#0A2342] text-white py-3 rounded-full font-black">Login</button>
       </div>
     </main>
   )
 }

 const TABS = [
   { id:"overview", label:"📊 Overview" },
   { id:"home", label:"🏠 Home Page" },
   { id:"tours", label:"🏝️ Tours 38" },
   { id:"transfers", label:"🚕 Transfers & Hotels" },
   { id:"car", label:"🚗 Car Rentals" },
   { id:"about", label:"👨‍✈️ About" },
   { id:"guide", label:"📖 Travel Guide" },
   { id:"contact", label:"📩 Contact" },
   { id:"settings", label:"⚙️ Settings" },
   { id:"export", label:"📤 Export" },
 ]

 return (
 <main className="min-h-screen bg-[#F5F7FA]">
 <Header/>
 <section className="bg-[#0A2342] text-white px-6 md:px-12 py-5">
   <div className="max-w-[1400px] mx-auto flex justify-between items-center gap-4">
     <div>
       <h1 className="font-black text-[18px]">HERO Admin Dashboard v2 - Edit All Pages Without Coding</h1>
       <p className="text-[11px] opacity-70">Edit Home, Tours, Transfers, Hotels, Car Rentals, About, Travel Guide, Contact, WhatsApp - Save → Export</p>
     </div>
     <div className="flex gap-2">
       <button onClick={saveAll} className="bg-[#FF8A1A] px-6 py-2.5 rounded-full font-black text-[12px]">💾 Save All</button>
       <button onClick={()=>{localStorage.removeItem("hero_admin_auth"); setAuth(false)}} className="bg-white/10 px-4 py-2.5 rounded-full font-bold text-[11px]">Logout</button>
     </div>
   </div>
 </section>

 <section className="bg-white border-b sticky top-0 z-20">
   <div className="px-6 md:px-12 py-2 flex gap-2 overflow-x-auto">
     {TABS.map(t=>(
       <button key={t.id} onClick={()=>setTab(t.id)} className={`px-4 py-2.5 rounded-full text-[11px] font-bold border whitespace-nowrap ${tab===t.id? "bg-[#0A2342] text-white" : "bg-[#F5F7FA]"}`}>{t.label}</button>
     ))}
   </div>
 </section>

 <section className="px-6 md:px-12 py-6">
   <div className="max-w-[1400px] mx-auto">

     {tab==="overview" && (
       <div className="grid md:grid-cols-4 gap-4">
         <div className="bg-white rounded-[16px] p-5 border"><p className="text-[11px] opacity-60">Tours Active</p><p className="font-black text-[28px]">{tours.filter(t=>t.active).length} / {tours.length}</p><p className="text-[10px] opacity-50 mt-2">Edit in Tours tab - Add, Hide, Delete, Change price</p></div>
         <div className="bg-white rounded-[16px] p-5 border"><p className="text-[11px] opacity-60">Avg Tour Price</p><p className="font-black text-[28px]">${(tours.reduce((s,t)=>s+t.price,0)/tours.length).toFixed(0)}</p><p className="text-[10px] opacity-50 mt-2">Change price in Tours tab - no coding</p></div>
         <div className="bg-white rounded-[16px] p-5 border"><p className="text-[11px] opacity-60">WhatsApp Number</p><p className="font-black text-[15px]">+{cms.site.waNumber}</p><p className="text-[10px] opacity-50 mt-2">Change in Settings tab</p></div>
         <div className="bg-[#FF8A1A] text-white rounded-[16px] p-5"><p className="font-bold text-[11px]">How to edit Home Page without coding:</p><p className="text-[10px] mt-2 leading-relaxed">1. Click Home Page tab<br/>2. Change hero title, subtitle, buttons, stats numbers<br/>3. Click Save All<br/>4. Go to Export tab → Download JSON → Send to developer OR I will make Home page auto-read from admin</p></div>
       </div>
     )}

     {tab==="home" && (
       <div className="bg-white rounded-[20px] p-6 border">
         <h2 className="font-black text-[18px]">🏠 Home Page Editor - No Coding</h2>
         <p className="text-[11px] opacity-60 mt-1">Edit hero section, buttons, stats - changes reflect on homepage after export + deploy</p>
         <div className="grid md:grid-cols-2 gap-6 mt-6">
           <div className="space-y-4">
             <div><label className="text-[11px] font-bold">Hero Badge (top small text)</label><input value={cms.home.heroBadge} onChange={e=>setCms({...cms, home:{...cms.home, heroBadge:e.target.value}})} className="mt-1 w-full bg-[#F5F7FA] rounded-full px-4 py-3 text-[12px]"/></div>
             <div><label className="text-[11px] font-bold">Hero Title Line 1</label><input value={cms.home.heroTitle} onChange={e=>setCms({...cms, home:{...cms.home, heroTitle:e.target.value}})} className="mt-1 w-full bg-[#F5F7FA] rounded-full px-4 py-3 text-[12px] font-bold"/></div>
             <div><label className="text-[11px] font-bold">Hero Title Orange Line 2</label><input value={cms.home.heroTitleOrange} onChange={e=>setCms({...cms, home:{...cms.home, heroTitleOrange:e.target.value}})} className="mt-1 w-full bg-[#F5F7FA] rounded-full px-4 py-3 text-[12px] font-bold text-[#FF8A1A]"/></div>
             <div><label className="text-[11px] font-bold">Hero Description</label><textarea value={cms.home.heroDesc} onChange={e=>setCms({...cms, home:{...cms.home, heroDesc:e.target.value}})} rows={4} className="mt-1 w-full bg-[#F5F7FA] rounded-[16px] px-4 py-3 text-[11px]"></textarea></div>
           </div>
           <div className="space-y-4">
             <div><label className="text-[11px] font-bold">Button 1 Text</label><input value={cms.home.heroBtn1} onChange={e=>setCms({...cms, home:{...cms.home, heroBtn1:e.target.value}})} className="mt-1 w-full bg-[#F5F7FA] rounded-full px-4 py-3 text-[12px]"/></div>
             <div><label className="text-[11px] font-bold">Button 2 Text</label><input value={cms.home.heroBtn2} onChange={e=>setCms({...cms, home:{...cms.home, heroBtn2:e.target.value}})} className="mt-1 w-full bg-[#F5F7FA] rounded-full px-4 py-3 text-[12px]"/></div>
             <div className="bg-[#F5F7FA] rounded-[16px] p-4">
               <p className="font-bold text-[11px]">Stats Boxes (4 numbers)</p>
               {cms.home.stats.map((s:any,i:number)=>(
                 <div key={i} className="grid grid-cols-2 gap-2 mt-2">
                   <input value={s.num} onChange={e=>{ const newStats=[...cms.home.stats]; newStats[i].num=e.target.value; setCms({...cms, home:{...cms.home, stats:newStats}})}} className="bg-white rounded-full px-3 py-2 text-[11px] font-black" placeholder="Number like $15-$40"/>
                   <input value={s.label} onChange={e=>{ const newStats=[...cms.home.stats]; newStats[i].label=e.target.value; setCms({...cms, home:{...cms.home, stats:newStats}})}} className="bg-white rounded-full px-3 py-2 text-[11px]" placeholder="Label"/>
                 </div>
               ))}
             </div>
             <div className="bg-[#0A2342] text-white rounded-[12px] p-3 text-[10px]">💡 Tip: After Save All, your homepage data is saved in browser. To make live, Export → send JSON to developer, or tell me to make homepage auto-read from admin storage so changes are live instantly without deploy.</div>
           </div>
         </div>
       </div>
     )}

     {tab==="tours" && (
       <div>
         <div className="flex justify-between items-center flex-wrap gap-3">
           <h2 className="font-black text-[18px]">Tours Management - Add / Edit / Hide / Delete - No Coding</h2>
           <button onClick={()=>setEditingTour({ id:"", name:"", cat:["Half Day"], price:25, duration:"3 Hours", pickup:"", desc:"", includes:"", area:"West", seo:"", active:true, image:"" })} className="bg-[#0A2342] text-white px-5 py-2 rounded-full font-bold text-[11px]">+ Add New Tour</button>
         </div>
         <div className="grid md:grid-cols-3 gap-4 mt-6">
           {tours.map(t=>(
             <div key={t.id} className={`bg-white rounded-[16px] p-4 border-2 ${t.active? "border-gray-100" : "border-red-200 opacity-60"}`}>
               <div className="flex justify-between"><p className="font-black text-[12px]">{t.name}</p><span className={`text-[9px] px-2 py-0.5 rounded-full font-bold ${t.active? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>{t.active? "Active" : "Hidden"}</span></div>
               <p className="text-[11px] opacity-60 mt-1">{t.area} • ${t.price} • {t.duration}</p>
               <div className="mt-3 flex gap-2">
                 <button onClick={()=>setEditingTour(t)} className="flex-1 bg-[#F5F7FA] py-2 rounded-full text-[11px] font-bold">✏️ Edit</button>
                 <button onClick={()=> setTours(ts=> ts.map(x=> x.id===t.id? {...x, active:!x.active}:x)) } className="px-3 py-2 rounded-full text-[11px] font-bold border">{t.active? "Hide" : "Show"}</button>
                 <button onClick={()=>{ if(confirm(`Delete ${t.name}?`)) setTours(ts=> ts.filter(x=> x.id!==t.id)) }} className="px-3 py-2 rounded-full text-[11px] bg-red-50 text-red-600">🗑️</button>
               </div>
             </div>
           ))}
         </div>
         {editingTour && (
           <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
             <div className="bg-white rounded-[20px] p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto">
               <h3 className="font-black">Edit Tour - Simple Form</h3>
               <div className="mt-4 space-y-3">
                 <input value={editingTour.id} onChange={e=>setEditingTour({...editingTour, id:e.target.value.toLowerCase().replace(/[^a-z0-9-]/g,'-')})} placeholder="ID no spaces e.g. prison-nakupenda" className="w-full bg-[#F5F7FA] rounded-full px-4 py-2.5 text-[12px]"/>
                 <input value={editingTour.name} onChange={e=>setEditingTour({...editingTour, name:e.target.value})} placeholder="Tour Name" className="w-full bg-[#F5F7FA] rounded-full px-4 py-2.5 text-[12px] font-bold"/>
                 <div className="grid grid-cols-2 gap-3">
                   <input type="number" value={editingTour.price} onChange={e=>setEditingTour({...editingTour, price:parseInt(e.target.value)||0})} className="w-full bg-[#F5F7FA] rounded-full px-4 py-2.5 text-[12px] font-bold"/>
                   <select value={editingTour.area} onChange={e=>setEditingTour({...editingTour, area:e.target.value})} className="w-full bg-[#F5F7FA] rounded-full px-4 py-2.5 text-[12px] font-bold">{["West","Central","South-Central","South","South-East","East","North-East","North","South-West"].map(a=> <option key={a} value={a}>{a}</option>)}</select>
                 </div>
                 <input value={editingTour.duration} onChange={e=>setEditingTour({...editingTour, duration:e.target.value})} placeholder="Duration" className="w-full bg-[#F5F7FA] rounded-full px-4 py-2.5 text-[12px]"/>
                 <input value={editingTour.pickup} onChange={e=>setEditingTour({...editingTour, pickup:e.target.value})} placeholder="Pickup" className="w-full bg-[#F5F7FA] rounded-full px-4 py-2.5 text-[12px]"/>
                 <input value={editingTour.desc} onChange={e=>setEditingTour({...editingTour, desc:e.target.value})} placeholder="Short desc" className="w-full bg-[#F5F7FA] rounded-full px-4 py-2.5 text-[12px]"/>
                 <input value={editingTour.includes} onChange={e=>setEditingTour({...editingTour, includes:e.target.value})} placeholder="Includes" className="w-full bg-[#F5F7FA] rounded-full px-4 py-2.5 text-[12px]"/>
                 <input value={editingTour.cat.join(",")} onChange={e=>setEditingTour({...editingTour, cat:e.target.value.split(",").map(s=>s.trim())})} placeholder="Categories comma: Popular,Half Day" className="w-full bg-[#F5F7FA] rounded-full px-4 py-2.5 text-[12px]"/>
                 <div className="flex gap-3 pt-2">
                   <button onClick={()=>{ if(!editingTour.id||!editingTour.name){alert("ID+Name required"); return} const exists=tours.find(t=>t.id===editingTour.id); if(exists){ setTours(ts=> ts.map(t=> t.id===editingTour.id? editingTour : t)) } else { setTours(ts=> [...ts, editingTour]) } setEditingTour(null)}} className="flex-1 bg-[#0A2342] text-white py-3 rounded-full font-black">💾 Save</button>
                   <button onClick={()=>setEditingTour(null)} className="px-6 py-3 rounded-full bg-[#F5F7FA] font-bold">Cancel</button>
                 </div>
               </div>
             </div>
           </div>
         )}
       </div>
     )}

     {tab==="transfers" && (
       <div className="bg-white rounded-[20px] p-6 border">
         <h2 className="font-black text-[18px]">🚕 Airport Transfers & Hotel Locations - No Coding</h2>
         <p className="text-[11px] opacity-60 mt-1">Edit price per vehicle $15-$40 - this changes Transfers page + Tours transport fee</p>
         <div className="grid md:grid-cols-2 gap-4 mt-6">
           {hotelOptions.map((h,i)=>(
             <div key={i} className="bg-[#F5F7FA] rounded-[16px] p-4 flex justify-between items-center">
               <div><p className="font-bold text-[12px]">{h.label}</p><p className="text-[10px] opacity-60">Area: {h.area}</p></div>
               <div className="flex items-center gap-2">
                 <span className="font-bold">$</span><input type="number" value={h.price} onChange={e=>{ const v=parseInt(e.target.value)||0; setHotelOptions(opts=> opts.map((o,idx)=> idx===i? {...o, price:v}:o))}} className="w-16 bg-white rounded-full px-2 py-2 text-center font-black text-[12px]"/>
                 <button onClick={()=>{ if(confirm("Delete?")) setHotelOptions(o=> o.filter((_,idx)=> idx!==i))}} className="text-red-500">🗑️</button>
               </div>
             </div>
           ))}
         </div>
         <button onClick={()=>{ const l=prompt("Hotel label e.g. New Hotel (South)"); const a=prompt("Area: West,North,East,South-East etc")||"West"; const p=parseInt(prompt("Price $")||"35"); if(l) setHotelOptions(o=>[...o,{label:l, area:a, price:p}])}} className="mt-4 bg-[#0A2342] text-white px-5 py-2.5 rounded-full font-bold text-[12px]">+ Add Hotel Location</button>
       </div>
     )}

     {tab==="about" && (
       <div className="bg-white rounded-[20px] p-6 border">
         <h2 className="font-black text-[18px]">👨‍✈️ About Page Editor</h2>
         <div className="mt-4 space-y-4">
           <div><label className="text-[11px] font-bold">About Title</label><input value={cms.about.title} onChange={e=>setCms({...cms, about:{...cms.about, title:e.target.value}})} className="mt-1 w-full bg-[#F5F7FA] rounded-full px-4 py-3 text-[12px] font-bold"/></div>
           <div><label className="text-[11px] font-bold">Our Story</label><textarea value={cms.about.story} onChange={e=>setCms({...cms, about:{...cms.about, story:e.target.value}})} rows={4} className="mt-1 w-full bg-[#F5F7FA] rounded-[16px] px-4 py-3 text-[11px]"></textarea></div>
           <div><label className="text-[11px] font-bold">Our Mission</label><textarea value={cms.about.mission} onChange={e=>setCms({...cms, about:{...cms.about, mission:e.target.value}})} rows={3} className="mt-1 w-full bg-[#F5F7FA] rounded-[16px] px-4 py-3 text-[11px]"></textarea></div>
         </div>
       </div>
     )}

     {tab==="guide" && (
       <div className="bg-white rounded-[20px] p-6 border">
         <h2 className="font-black text-[18px]">📖 Travel Guide Page Editor - SEO Booster</h2>
         <div className="mt-4"><label className="text-[11px] font-bold">Travel Guide Intro (SEO long text)</label><textarea value={cms.travelGuide.intro} onChange={e=>setCms({...cms, travelGuide:{...cms.travelGuide, intro:e.target.value}})} rows={6} className="mt-1 w-full bg-[#F5F7FA] rounded-[16px] px-4 py-3 text-[11px]"></textarea></div>
         <p className="text-[10px] opacity-50 mt-3">This page boosts SEO - edit keywords: best time to visit Zanzibar, where to stay, costs, safety, SIM, money, food, packing list, tours price, transfers price</p>
       </div>
     )}

     {tab==="contact" && (
       <div className="bg-white rounded-[20px] p-6 border">
         <h2 className="font-black text-[18px]">📩 Contact Page Editor</h2>
         <div className="mt-4 space-y-4">
           <div><label className="text-[11px] font-bold">Base Location Text</label><input value={cms.contact.base} onChange={e=>setCms({...cms, contact:{...cms.contact, base:e.target.value}})} className="mt-1 w-full bg-[#F5F7FA] rounded-full px-4 py-3 text-[12px]"/></div>
           <div><label className="text-[11px] font-bold">Hours Text</label><input value={cms.contact.hours} onChange={e=>setCms({...cms, contact:{...cms.contact, hours:e.target.value}})} className="mt-1 w-full bg-[#F5F7FA] rounded-full px-4 py-3 text-[12px]"/></div>
           <div><label className="text-[11px] font-bold">Pay Info Text</label><input value={cms.contact.payInfo} onChange={e=>setCms({...cms, contact:{...cms.contact, payInfo:e.target.value}})} className="mt-1 w-full bg-[#F5F7FA] rounded-full px-4 py-3 text-[12px]"/></div>
         </div>
       </div>
     )}

     {tab==="settings" && (
       <div className="grid md:grid-cols-2 gap-6">
         <div className="bg-white rounded-[20px] p-6 border">
           <h3 className="font-black">⚙️ WhatsApp & Site Settings - No Coding</h3>
           <div className="mt-4 space-y-4">
             <div><label className="text-[11px] font-bold">WhatsApp Number HERO (without +) - Main booking number</label><input value={cms.site.waNumber} onChange={e=>setCms({...cms, site:{...cms.site, waNumber:e.target.value.replace(/[^0-9]/g,'')}})} className="mt-1 w-full bg-[#F5F7FA] rounded-full px-4 py-3 text-[13px] font-bold"/><p className="text-[10px] opacity-50 mt-1">Current: +{cms.site.waNumber} - All WhatsApp buttons use this</p></div>
             <div><label className="text-[11px] font-bold">Site Name</label><input value={cms.site.siteName} onChange={e=>setCms({...cms, site:{...cms.site, siteName:e.target.value}})} className="mt-1 w-full bg-[#F5F7FA] rounded-full px-4 py-3 text-[12px]"/></div>
             <div><label className="text-[11px] font-bold">Tagline</label><input value={cms.site.tagline} onChange={e=>setCms({...cms, site:{...cms.site, tagline:e.target.value}})} className="mt-1 w-full bg-[#F5F7FA] rounded-full px-4 py-3 text-[12px]"/></div>
           </div>
         </div>
         <div className="bg-[#0A2342] text-white rounded-[20px] p-6">
           <h3 className="font-black">How to edit all pages without coding - Guide</h3>
           <div className="mt-4 text-[11px] leading-relaxed opacity-80 space-y-2">
             <p><b className="text-[#FF8A1A]">🏠 Home Page:</b> Click Home Page tab → Change hero title, orange title, description, buttons, 4 stats numbers → Save All</p>
             <p><b className="text-[#FF8A1A]">🏝️ Tours:</b> Tours tab → Add new tour, Edit price, Hide tour, Delete tour, Change area, duration, pickup → Save All</p>
             <p><b className="text-[#FF8A1A]">🚕 Transfers:</b> Transfers & Hotels tab → Edit price per vehicle $15-$40, Add new hotel location, Delete location → Save All</p>
             <p><b className="text-[#FF8A1A]">👨‍✈️ About:</b> About tab → Change title, story, mission → Save All</p>
             <p><b className="text-[#FF8A1A]">📖 Travel Guide:</b> Travel Guide tab → Edit SEO intro text with keywords → Save All → Boosts SEO traffic</p>
             <p><b className="text-[#FF8A1A]">📩 Contact:</b> Contact tab → Change base, hours, pay info → Save All</p>
             <p><b className="text-[#FF8A1A]">⚙️ WhatsApp:</b> Settings tab → Change WhatsApp number → All buttons update</p>
             <p><b className="text-[#FF8A1A]">📤 Live:</b> After Save All, changes live in your browser. Go to Export → Download JSON → Send to developer to deploy for all visitors. Or ask me to make pages auto-read from admin so no deploy needed.</p>
           </div>
         </div>
       </div>
     )}

     {tab==="export" && (
       <div className="grid md:grid-cols-2 gap-6">
         <div className="bg-white rounded-[20px] p-6 border">
           <h3 className="font-black">📤 Export - Make Changes Live For All Visitors</h3>
           <p className="text-[11px] opacity-60 mt-2">Save All = only your browser. To make live for everyone, export and send to developer to deploy.</p>
           <div className="mt-4 space-y-3">
             <button onClick={()=>{ const data={cms, tours, hotelOptions, exportedAt:new Date().toISOString()}; const blob=new Blob([JSON.stringify(data,null,2)],{type:'application/json'}); const url=URL.createObjectURL(blob); const a=document.createElement('a'); a.href=url; a.download=`hero-cms-${new Date().toISOString().slice(0,10)}.json`; a.click(); }} className="w-full bg-[#0A2342] text-white py-3 rounded-full font-black text-[12px]">📥 Download Full CMS JSON (All Pages)</button>
             <button onClick={()=>{ navigator.clipboard.writeText(JSON.stringify(cms.home, null, 2)); alert("Home page JSON copied - paste into home page file") }} className="w-full bg-[#F5F7FA] border py-3 rounded-full font-bold text-[11px]">📋 Copy Home Page Data</button>
             <button onClick={()=>{ navigator.clipboard.writeText(JSON.stringify(tours, null, 2)); alert("Tours array copied") }} className="w-full bg-[#F5F7FA] border py-3 rounded-full font-bold text-[11px]">📋 Copy Tours Array</button>
             <button onClick={()=>{ if(confirm("Reset all to default? Deletes your edits in this browser")){ localStorage.removeItem("hero_cms"); localStorage.removeItem("hero_tours"); localStorage.removeItem("hero_hotels"); setCms(DEFAULT_CMS); setTours(DEFAULT_TOURS); } }} className="w-full bg-red-50 text-red-600 py-3 rounded-full font-bold text-[11px]">🗑️ Reset All To Default</button>
           </div>
         </div>
         <div className="bg-[#0A2342] text-white rounded-[20px] p-6">
           <h3 className="font-black">Want Instant Live Without Developer Deploy?</h3>
           <p className="text-[11px] opacity-70 mt-2">I can update your Home, Tours, Transfers, About, Contact, Travel Guide pages to auto-read from this admin storage. Then when you Save All here, changes are live for ALL visitors instantly, no developer needed. Like WordPress.</p>
           <div className="mt-4 bg-white/10 rounded-[12px] p-4 text-[11px] leading-relaxed">
             <p className="font-bold text-[#FF8A1A]">How auto-read works:</p>
             <p className="opacity-80 mt-1">Home page code will do: const saved = localStorage.getItem('hero_cms'); if saved, use saved data, else use default. Same for tours. So admin edits → Save All → visitors see new data instantly. No coding needed after I add the 5 lines to each page.</p>
             <p className="mt-3 font-bold">Reply: "Make all pages auto-read from admin" and I will update all your page files to read from admin storage automatically.</p>
           </div>
           <pre className="mt-4 bg-black/30 rounded-[12px] p-3 text-[9px] overflow-auto max-h-[200px]">{JSON.stringify({ home: cms.home, toursCount: tours.length, wa: cms.site.waNumber }, null, 2)}</pre>
         </div>
       </div>
     )}

     {tab==="car" && (
       <div className="bg-white rounded-[20px] p-6 border text-center py-20">
         <p className="text-[40px]">🚗</p>
         <h3 className="font-black text-[18px] mt-3">Car Rentals Page Editor - Coming Next</h3>
         <p className="text-[11px] opacity-60 mt-2">Tell me what fields Car Rentals needs: car types, price per day $30-$80, with driver, self-drive, includes, etc. I will add editor like Tours tab - Add/Edit/Delete cars, prices, no coding.</p>
         <p className="text-[10px] opacity-40 mt-4">For now, Car Rentals data can be managed in Tours tab - add category "Car Rental" - or create separate tab.</p>
       </div>
     )}

   </div>
 </section>
 <footer className="bg-[#0A2342] text-center py-4 text-[11px] text-white/50">HERO Admin v2 • Edit All Pages Without Coding • Data in browser localStorage • Export JSON to deploy live • © 2026 HERO</footer>
 </main>
 )
}