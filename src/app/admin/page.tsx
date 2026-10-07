"use client"
import { useState, useEffect, useMemo } from "react"
import Header from '@/components/Header'

const ADMIN_PASSWORD = "hero2026"
const DEFAULT_TOURS = [
  { id:"prison-nakupenda", name:"Prison Island + Nakupenda", cat:["Popular","Half Day"], price:55, duration:"5 Hours", pickup:"Stone Town 8:30 AM", desc:"Tortoise sanctuary + sandbank + fruit", includes:"Boat, Guide, Entrance, Fruit, Water", area:"West", seo:"Most popular Zanzibar tour - giant tortoises 100 years + white sandbank", active:true },
  { id:"nakupenda-only", name:"Nakupenda Sandbank Only", cat:["Half Day","Popular"], price:35, duration:"4 Hours", pickup:"Stone Town 9 AM", desc:"White sandbank in ocean, swimming", includes:"Boat, Fruit, Water", area:"West", seo:"Nakupenda sandbank pure white sand - swimming - fruit", active:true },
  { id:"prison-only", name:"Prison Island Tortoises", cat:["Half Day"], price:40, duration:"3 Hours", pickup:"Stone Town", desc:"Giant tortoises 100+ years", includes:"Boat, Entrance, Guide", area:"West", seo:"Prison Island Changuu tortoise sanctuary", active:true },
  { id:"stone-town", name:"Stone Town Walking Tour", cat:["Popular","Half Day","Cultural"], price:25, duration:"3 Hours", pickup:"Stone Town", desc:"UNESCO, Slave Market, House of Wonders", includes:"Guide, Entrances", area:"West", seo:"Stone Town UNESCO walking tour", active:true },
  { id:"spice", name:"Spice Farm Tour", cat:["Half Day","Cultural"], price:22, duration:"3 Hours", pickup:"Stone Town", desc:"30+ spices + fruits tasting", includes:"Guide, Tasting", area:"Central", seo:"Spice farm 30+ spices", active:true },
  { id:"jozani", name:"Jozani Forest Monkeys", cat:["Popular","Half Day"], price:30, duration:"2.5 Hours", pickup:"Paje / Stone Town", desc:"Red colobus monkeys only in Zanzibar", includes:"Entrance, Guide", area:"South-Central", seo:"Jozani red colobus monkeys", active:true },
  { id:"salaam", name:"Salaam Cave Turtle Swim", cat:["Half Day"], price:25, duration:"2 Hours", pickup:"Paje / Jambiani", desc:"Swim with turtles in cave", includes:"Entrance, Guide", area:"South-East", seo:"Salaam Cave turtle swim", active:true },
  { id:"kuza", name:"Kuza Cave Sacred Swim", cat:["Half Day","Cultural"], price:28, duration:"3 Hours", pickup:"Paje / Jambiani", desc:"Sacred limestone cave + culture", includes:"Entrance, Guide", area:"South-East", seo:"Kuza Cave sacred limestone", active:true },
  { id:"mnemba", name:"Mnemba Atoll Snorkeling", cat:["Popular","Half Day","North"], price:45, duration:"4 Hours", pickup:"Matemwe 8 AM", desc:"Best coral reef, colorful fish, dolphins", includes:"Boat, Gear, Guide", area:"North-East", seo:"Mnemba Atoll best coral reef", active:true },
  { id:"safari-blue", name:"Safari Blue Full Day BBQ", cat:["Full Day","Popular","South"], price:85, duration:"8 Hours", pickup:"Fumba 8 AM", desc:"Sandbank + snorkeling + seafood BBQ + dhow", includes:"Dhow, BBQ, Drinks, Gear", area:"South-West", seo:"Safari Blue full day Fumba", active:true },
  { id:"dhow-stone", name:"Sunset Dhow Stone Town", cat:["Popular","Half Day"], price:35, duration:"2 Hours", pickup:"Stone Town 4:30 PM", desc:"Traditional dhow sunset cruise", includes:"Dhow, Drinks", area:"West", seo:"Sunset dhow Stone Town", active:true },
  { id:"dolphin", name:"Kizimkazi Dolphin Tour", cat:["Half Day","South"], price:40, duration:"4 Hours", pickup:"Kizimkazi 6 AM", desc:"Dolphin watching early morning", includes:"Boat, Guide", area:"South", seo:"Kizimkazi dolphin tour", active:true },
  { id:"rock", name:"The Rock Restaurant Tour", cat:["Half Day","East"], price:30, duration:"4 Hours", pickup:"East coast", desc:"Iconic Rock photo + Pongwe beach", includes:"Guide", area:"East", seo:"The Rock Restaurant iconic rock", active:true },
  { id:"kite-lesson", name:"Paje Kite Surfing Lesson", cat:["Half Day","East","Water"], price:70, duration:"2 Hours", pickup:"Paje beach", desc:"Beginner kite with instructor + gear", includes:"Instructor, Gear", area:"South-East", seo:"Paje kite lesson beginner", active:true },
  { id:"quad", name:"Quad Bike + Village", cat:["Half Day","Cultural","East"], price:50, duration:"3 Hours", pickup:"Paje / Bwejuu", desc:"Village + school + beach", includes:"Quad, Guide, Helmet", area:"South-East", seo:"Quad bike Paje village", active:true },
  { id:"chumbe", name:"Chumbe Island Coral Park", cat:["Full Day","South-West"], price:90, duration:"7 Hours", pickup:"Fumba", desc:"Best coral sanctuary private island", includes:"Boat, Entrance $60, Lunch", area:"South-West", seo:"Chumbe Island coral park", active:true },
]

export default function AdminPage(){
 const [auth, setAuth] = useState(false)
 const [pass, setPass] = useState("")
 const [tab, setTab] = useState("overview")
 const [tours, setTours] = useState<any[]>(DEFAULT_TOURS)
 const [waNumber, setWaNumber] = useState("255773628792")
 const [filter, setFilter] = useState("All")
 const [editingTour, setEditingTour] = useState<any>(null)
 const [hotelOptions, setHotelOptions] = useState([
   { label:"Stone Town (West) - $10-$15 local", area:"West", price:15 },
   { label:"Nungwi / Kendwa (North) - $15 local", area:"North", price:40 },
   { label:"Matemwe (North-East) - $20 local", area:"North-East", price:40 },
   { label:"Kiwengwa / Pongwe (East) - $25 local", area:"East", price:35 },
   { label:"Paje / Bwejuu (South-East) - $15 local", area:"South-East", price:35 },
   { label:"Jambiani / Makunduchi (South) - $20 local", area:"South", price:40 },
   { label:"Kizimkazi / Fumba (South-West) - $15 local", area:"South-West", price:40 },
 ])
 const [transportMatrix, setTransportMatrix] = useState<any>({
   "West": { "West": 10, "Central": 20, "South-Central": 35, "South": 40, "South-East": 40, "East": 35, "North-East": 40, "North": 40, "South-West": 35, "All": 15 },
   "North": { "West": 40, "Central": 35, "South-Central": 50, "South": 60, "South-East": 55, "East": 40, "North-East": 20, "North": 15, "South-West": 55, "All": 15 },
   "South-East": { "West": 40, "Central": 30, "South-Central": 20, "South": 25, "South-East": 15, "East": 25, "North-East": 50, "North": 55, "South-West": 35, "All": 15 },
 })

 useEffect(()=>{
   const savedAuth = localStorage.getItem("hero_admin_auth")
   if(savedAuth==="1") setAuth(true)
   const savedTours = localStorage.getItem("hero_tours")
   if(savedTours) try{ setTours(JSON.parse(savedTours)) }catch{}
   const savedWa = localStorage.getItem("hero_wa")
   if(savedWa) setWaNumber(savedWa)
   const savedHotels = localStorage.getItem("hero_hotels")
   if(savedHotels) try{ setHotelOptions(JSON.parse(savedHotels)) }catch{}
   const savedMatrix = localStorage.getItem("hero_matrix")
   if(savedMatrix) try{ setTransportMatrix(JSON.parse(savedMatrix)) }catch{}
 }, [])

 const saveAll = () => {
   localStorage.setItem("hero_tours", JSON.stringify(tours))
   localStorage.setItem("hero_wa", waNumber)
   localStorage.setItem("hero_hotels", JSON.stringify(hotelOptions))
   localStorage.setItem("hero_matrix", JSON.stringify(transportMatrix))
   alert("✅ Saved! Changes live in your browser. Go to Export tab to download file for live deployment.")
 }

 const handleLogin = () => {
   if(pass===ADMIN_PASSWORD){ localStorage.setItem("hero_admin_auth","1"); setAuth(true) } else alert("Wrong password - use hero2026")
 }

 const filtered = filter==="All"? tours : tours.filter(t=>t.cat.includes(filter))
 const totalRevenue = useMemo(()=> tours.reduce((s,t)=> s+t.price,0), [tours])

 if(!auth){
   return (
     <main className="min-h-screen bg-[#0A2342] flex items-center justify-center px-6">
       <div className="bg-white rounded-[24px] p-8 max-w-sm w-full text-center">
         <p className="text-[32px]">🔐</p>
         <h1 className="font-black text-[20px] mt-2">HERO Admin Dashboard</h1>
         <p className="text-[11px] opacity-60 mt-2">Manage tours, prices, transfers, hotels, transport fee without coding</p>
         <input type="password" value={pass} onChange={e=>setPass(e.target.value)} placeholder="Password: hero2026" className="mt-6 w-full bg-[#F5F7FA] border rounded-full px-4 py-3 text-[13px] text-center"/>
         <button onClick={handleLogin} className="mt-3 w-full bg-[#0A2342] text-white py-3 rounded-full font-black">Login</button>
         <p className="text-[10px] opacity-40 mt-4">Password: hero2026 - change ADMIN_PASSWORD variable</p>
       </div>
     </main>
   )
 }

 return (
 <main className="min-h-screen bg-[#F5F7FA]">
 <Header/>
 <section className="bg-[#0A2342] text-white px-6 md:px-12 py-6">
   <div className="max-w-[1400px] mx-auto flex justify-between items-center flex-wrap gap-4">
     <div>
       <h1 className="font-black text-[20px]">HERO Admin Dashboard - No Coding Needed</h1>
       <p className="text-[11px] opacity-70">Edit tours, prices, transfers, hotels, transport fee - Save → Export → Deploy live</p>
     </div>
     <div className="flex gap-2">
       <button onClick={saveAll} className="bg-[#FF8A1A] px-5 py-2.5 rounded-full font-black text-[12px]">💾 Save All</button>
       <button onClick={()=>{localStorage.removeItem("hero_admin_auth"); setAuth(false)}} className="bg-white/10 px-4 py-2.5 rounded-full font-bold text-[11px]">Logout</button>
     </div>
   </div>
 </section>

 <section className="bg-white border-b sticky top-0 z-20">
   <div className="px-6 md:px-12 py-2 flex gap-2 overflow-x-auto">
     {[
       { id:"overview", label:"📊 Overview" },
       { id:"tours", label:"🏝️ Tours 38" },
       { id:"transfers", label:"🚕 Airport Transfers" },
       { id:"matrix", label:"🚚 Transport Matrix" },
       { id:"settings", label:"⚙️ WhatsApp & SEO" },
       { id:"export", label:"📤 Export / Import" },
     ].map(t=>(
       <button key={t.id} onClick={()=>setTab(t.id)} className={`px-5 py-2.5 rounded-full text-[12px] font-bold border whitespace-nowrap ${tab===t.id? "bg-[#0A2342] text-white" : "bg-[#F5F7FA]"}`}>{t.label}</button>
     ))}
   </div>
 </section>

 <section className="px-6 md:px-12 py-8">
   <div className="max-w-[1400px] mx-auto">

     {tab==="overview" && (
       <div className="grid md:grid-cols-4 gap-4">
         <div className="bg-white rounded-[16px] p-5 border"><p className="text-[11px] opacity-60">Total Tours Active</p><p className="font-black text-[28px] mt-1">{tours.filter(t=>t.active).length} / {tours.length}</p></div>
         <div className="bg-white rounded-[16px] p-5 border"><p className="text-[11px] opacity-60">Avg Tour Price</p><p className="font-black text-[28px] mt-1">${(totalRevenue/tours.length).toFixed(0)}</p></div>
         <div className="bg-white rounded-[16px] p-5 border"><p className="text-[11px] opacity-60">WhatsApp Number</p><p className="font-black text-[16px] mt-1">+{waNumber}</p></div>
         <div className="bg-[#FF8A1A] text-white rounded-[16px] p-5"><p className="text-[11px] opacity-80 font-bold">How to use without coding</p><p className="font-bold text-[11px] mt-1 leading-relaxed">1. Edit in tabs<br/>2. Click Save All<br/>3. Export → Download JSON → Send to developer<br/>4. Changes live in your browser immediately for testing</p></div>
       </div>
     )}

     {tab==="tours" && (
       <div>
         <div className="flex justify-between items-center flex-wrap gap-3">
           <h2 className="font-black text-[18px]">Tours Management</h2>
           <div className="flex gap-2">
             <select value={filter} onChange={e=>setFilter(e.target.value)} className="bg-white border rounded-full px-4 py-2 text-[11px] font-bold">
               {["All","Popular","Half Day","Full Day","North","South","East","West","Cultural","Water"].map(c=> <option key={c} value={c}>{c}</option>)}
             </select>
             <button onClick={()=>setEditingTour({ id:"", name:"", cat:["Half Day"], price:25, duration:"3 Hours", pickup:"", desc:"", includes:"", area:"West", seo:"", active:true })} className="bg-[#0A2342] text-white px-5 py-2 rounded-full font-bold text-[11px]">+ Add New Tour</button>
           </div>
         </div>
         <div className="grid md:grid-cols-3 gap-4 mt-6">
           {filtered.map(t=>(
             <div key={t.id} className={`bg-white rounded-[16px] p-4 border-2 ${t.active? "border-gray-100" : "border-red-200 opacity-60"}`}>
               <div className="flex justify-between items-start gap-2">
                 <p className="font-black text-[12px] leading-tight">{t.name}</p>
                 <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold shrink-0 ${t.active? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>{t.active? "Active" : "Hidden"}</span>
               </div>
               <p className="text-[11px] opacity-60 mt-1">{t.area} • ${t.price} pp • {t.duration}</p>
               <p className="text-[10px] opacity-50 mt-1 line-clamp-2">{t.desc}</p>
               <div className="mt-3 flex gap-2">
                 <button onClick={()=>setEditingTour(t)} className="flex-1 bg-[#F5F7FA] py-2 rounded-full text-[11px] font-bold">✏️ Edit</button>
                 <button onClick={()=> setTours(ts=> ts.map(x=> x.id===t.id? {...x, active:!x.active}:x)) } className="px-3 py-2 rounded-full text-[11px] font-bold border">{t.active? "Hide" : "Show"}</button>
                 <button onClick={()=>{ if(confirm(`Delete ${t.name}?`)) setTours(ts=> ts.filter(x=> x.id!==t.id)) }} className="px-3 py-2 rounded-full text-[11px] font-bold bg-red-50 text-red-600">🗑️</button>
               </div>
             </div>
           ))}
         </div>

         {editingTour && (
           <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-6">
             <div className="bg-white rounded-[20px] p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto">
               <h3 className="font-black text-[16px]">{editingTour.id && tours.find(x=>x.id===editingTour.id)? "Edit Tour" : "Add New Tour"}</h3>
               <div className="mt-4 space-y-3">
                 <input value={editingTour.id} onChange={e=>setEditingTour({...editingTour, id:e.target.value.toLowerCase().replace(/[^a-z0-9-]/g,'-')})} placeholder="ID: prison-nakupenda (no spaces, use -)" className="w-full bg-[#F5F7FA] rounded-full px-4 py-2.5 text-[12px]"/>
                 <input value={editingTour.name} onChange={e=>setEditingTour({...editingTour, name:e.target.value})} placeholder="Name: Prison Island + Nakupenda" className="w-full bg-[#F5F7FA] rounded-full px-4 py-2.5 text-[12px] font-bold"/>
                 <div className="grid grid-cols-2 gap-3">
                   <input type="number" value={editingTour.price} onChange={e=>setEditingTour({...editingTour, price:parseInt(e.target.value)||0})} placeholder="Price $ pp" className="w-full bg-[#F5F7FA] rounded-full px-4 py-2.5 text-[12px] font-bold"/>
                   <select value={editingTour.area} onChange={e=>setEditingTour({...editingTour, area:e.target.value})} className="w-full bg-[#F5F7FA] rounded-full px-4 py-2.5 text-[12px] font-bold">
                     {["West","Central","South-Central","South","South-East","East","North-East","North","South-West","All"].map(a=> <option key={a} value={a}>{a}</option>)}
                   </select>
                 </div>
                 <div className="grid grid-cols-2 gap-3">
                   <input value={editingTour.duration} onChange={e=>setEditingTour({...editingTour, duration:e.target.value})} placeholder="Duration: 3 Hours" className="w-full bg-[#F5F7FA] rounded-full px-4 py-2.5 text-[12px]"/>
                   <input value={editingTour.pickup} onChange={e=>setEditingTour({...editingTour, pickup:e.target.value})} placeholder="Pickup: Stone Town 8:30 AM" className="w-full bg-[#F5F7FA] rounded-full px-4 py-2.5 text-[12px]"/>
                 </div>
                 <input value={editingTour.desc} onChange={e=>setEditingTour({...editingTour, desc:e.target.value})} placeholder="Short desc" className="w-full bg-[#F5F7FA] rounded-full px-4 py-2.5 text-[12px]"/>
                 <input value={editingTour.includes} onChange={e=>setEditingTour({...editingTour, includes:e.target.value})} placeholder="Includes: Boat, Guide, Entrance" className="w-full bg-[#F5F7FA] rounded-full px-4 py-2.5 text-[12px]"/>
                 <input value={editingTour.cat.join(",")} onChange={e=>setEditingTour({...editingTour, cat:e.target.value.split(",").map(s=>s.trim())})} placeholder="Categories: Popular,Half Day,North" className="w-full bg-[#F5F7FA] rounded-full px-4 py-2.5 text-[12px]"/>
                 <textarea value={editingTour.seo} onChange={e=>setEditingTour({...editingTour, seo:e.target.value})} placeholder="SEO long description with keywords" rows={3} className="w-full bg-[#F5F7FA] rounded-[16px] px-4 py-3 text-[11px]"></textarea>
                 <div className="flex gap-3 pt-2">
                   <button onClick={()=>{
                     if(!editingTour.id ||!editingTour.name){ alert("ID and Name required"); return }
                     const exists = tours.find(t=>t.id===editingTour.id)
                     if(exists && editingTour.id!== exists.id){ /* handled */ }
                     if(tours.some(t=>t.id===editingTour.id && t!==editingTour &&!tours.find(x=>x.id===editingTour.id && x===editingTour))){
                       // if editing existing, allow
                       const isEditingExisting = tours.find(t=>t.id===editingTour.id)
                       if(isEditingExisting && editingTour.id===isEditingExisting.id){
                         setTours(ts=> ts.map(t=> t.id===editingTour.id? editingTour : t))
                       } else {
                         setTours(ts=> [...ts, editingTour])
                       }
                     } else {
                       if(tours.find(t=>t.id===editingTour.id)){
                         setTours(ts=> ts.map(t=> t.id===editingTour.id? editingTour : t))
                       } else {
                         setTours(ts=> [...ts, editingTour])
                       }
                     }
                     setEditingTour(null)
                   }} className="flex-1 bg-[#0A2342] text-white py-3 rounded-full font-black">💾 Save Tour</button>
                   <button onClick={()=>setEditingTour(null)} className="px-6 py-3 rounded-full font-bold bg-[#F5F7FA]">Cancel</button>
                 </div>
               </div>
             </div>
           </div>
         )}
       </div>
     )}

     {tab==="transfers" && (
       <div>
         <h2 className="font-black text-[18px]">Airport Transfers Price Management - Per Vehicle</h2>
         <p className="text-[11px] opacity-60 mt-1">Edit price per vehicle $15-$40 - affects transfers page + tours transport fee</p>
         <div className="grid md:grid-cols-2 gap-4 mt-6">
           {hotelOptions.map((h,i)=>(
             <div key={i} className="bg-white rounded-[16px] p-4 border flex justify-between items-center gap-3">
               <div className="flex-1">
                 <p className="font-bold text-[12px]">{h.label}</p>
                 <p className="text-[10px] opacity-60">Area: {h.area}</p>
               </div>
               <div className="flex items-center gap-2">
                 <span className="text-[12px] font-bold">$</span>
                 <input type="number" value={h.price} onChange={e=>{
                   const newPrice = parseInt(e.target.value)||0
                   setHotelOptions(opts=> opts.map((o,idx)=> idx===i? {...o, price:newPrice} : o))
                 }} className="w-20 bg-[#F5F7FA] rounded-full px-3 py-2 text-[13px] font-black text-center"/>
                 <button onClick={()=>{ if(confirm(`Delete ${h.label}?`)) setHotelOptions(o=> o.filter((_,idx)=> idx!==i)) }} className="text-[12px] text-red-500">🗑️</button>
               </div>
             </div>
           ))}
         </div>
         <button onClick={()=>{
           const label = prompt("New hotel label: e.g., New Hotel (South) - $30 local")
           const area = prompt("Area: West, North, North-East, East, South-East, South, South-West")||"West"
           const price = parseInt(prompt("Price per vehicle $: 35")||"35")
           if(label) setHotelOptions(o=> [...o, { label, area, price }])
         }} className="mt-4 bg-[#0A2342] text-white px-5 py-2.5 rounded-full font-bold text-[12px]">+ Add Hotel Location</button>
       </div>
     )}

     {tab==="matrix" && (
       <div>
         <h2 className="font-black text-[18px]">Transport Fee Matrix - Hotel Area → Tour Area ($ per vehicle)</h2>
         <p className="text-[11px] opacity-60 mt-1">Same area $15, nearby $20-30, far $40-60. If 2 tours same area, charged once.</p>
         <div className="mt-6 bg-white rounded-[16px] p-4 border overflow-x-auto">
           <table className="text-[11px] w-full min-w-[600px]">
             <thead><tr><th className="text-left p-2">Hotel → Tour</th>{Object.keys(transportMatrix[Object.keys(transportMatrix)[0]]).map(col=> <th key={col} className="p-2 text-center text-[10px]">{col}</th>)}</tr></thead>
             <tbody>
               {Object.keys(transportMatrix).map(rowArea=>(
                 <tr key={rowArea} className="border-t">
                   <td className="font-bold p-2">{rowArea}</td>
                   {Object.keys(transportMatrix[rowArea]).map(colArea=>(
                     <td key={colArea} className="p-1 text-center">
                       <input type="number" value={transportMatrix[rowArea][colArea]} onChange={e=>{
                         const v = parseInt(e.target.value)||0
                         setTransportMatrix((m:any)=> ({...m, [rowArea]: {...m[rowArea], [colArea]: v } }))
                       }} className="w-12 bg-[#F5F7FA] rounded-full px-1 py-1 text-center font-bold text-[11px]"/>
                     </td>
                   ))}
                 </tr>
               ))}
             </tbody>
           </table>
         </div>
       </div>
     )}

     {tab==="settings" && (
       <div className="grid md:grid-cols-2 gap-6">
         <div className="bg-white rounded-[16px] p-6 border">
           <h3 className="font-black text-[14px]">WhatsApp Settings</h3>
           <div className="mt-4 space-y-4">
             <div>
               <label className="text-[11px] font-bold">WhatsApp Number (without +)</label>
               <input value={waNumber} onChange={e=>setWaNumber(e.target.value.replace(/[^0-9]/g,''))} className="mt-1 w-full bg-[#F5F7FA] rounded-full px-4 py-3 text-[13px] font-bold"/>
               <p className="text-[10px] opacity-50 mt-1">Used in all Book on WhatsApp buttons: +{waNumber}</p>
             </div>
             <div className="bg-[#FFFBF5] border border-[#FF8A1A]/20 rounded-[12px] p-3 text-[11px]">
               <p className="font-bold">Booking flow:</p>
               <p className="opacity-70 mt-1">User clicks Book → Opens wa.me/{waNumber}?text=... with tours, hotel, pax, transport breakdown. You reply in 5-10 min with driver photo, plate, total price.</p>
             </div>
           </div>
         </div>
         <div className="bg-[#0A2342] text-white rounded-[16px] p-6">
           <h3 className="font-black text-[14px]">How to use without coding</h3>
           <div className="mt-4 space-y-3 text-[11px] leading-relaxed opacity-80">
             <p><b className="text-[#FF8A1A]">1. Edit Tours:</b> Change price, name, area, SEO keywords, hide/show.</p>
             <p><b className="text-[#FF8A1A]">2. Edit Transfers:</b> Change $ per vehicle for each hotel area.</p>
             <p><b className="text-[#FF8A1A]">3. Edit Matrix:</b> Change transport fee $ per vehicle Hotel Area → Tour Area.</p>
             <p><b className="text-[#FF8A1A]">4. Save All:</b> Top right Save All → saves to browser for testing.</p>
             <p><b className="text-[#FF8A1A]">5. Export:</b> Export tab → Download JSON → Send to developer to deploy live for all visitors.</p>
           </div>
         </div>
       </div>
     )}

     {tab==="export" && (
       <div className="grid md:grid-cols-2 gap-6">
         <div className="bg-white rounded-[16px] p-6 border">
           <h3 className="font-black text-[14px]">Export / Import - Make Live</h3>
           <p className="text-[11px] opacity-60 mt-2">Save All saves only in your browser for testing. To make live for all visitors, export and send to developer.</p>
           <div className="mt-4 space-y-3">
             <button onClick={()=>{
               const data = { tours, hotelOptions, transportMatrix, waNumber, exportedAt: new Date().toISOString() }
               const blob = new Blob([JSON.stringify(data, null, 2)], { type:'application/json' })
               const url = URL.createObjectURL(blob)
               const a = document.createElement('a')
               a.href = url
               a.download = `hero-export-${new Date().toISOString().slice(0,10)}.json`
               a.click()
             }} className="w-full bg-[#0A2342] text-white py-3 rounded-full font-black text-[12px]">📥 Download Full JSON</button>
             <button onClick={()=>{
               const code = `const tours = ${JSON.stringify(tours, null, 2)}`
               navigator.clipboard.writeText(code)
               alert("Copied tours array - paste into /tours/page.tsx")
             }} className="w-full bg-[#F5F7FA] border py-3 rounded-full font-bold text-[11px]">📋 Copy Tours Array Code</button>
             <button onClick={()=>{
               if(confirm("Reset to default? Deletes your edits in this browser.")){
                 localStorage.removeItem("hero_tours")
                 localStorage.removeItem("hero_hotels")
                 localStorage.removeItem("hero_matrix")
                 localStorage.removeItem("hero_wa")
                 location.reload()
               }
             }} className="w-full bg-red-50 text-red-600 py-3 rounded-full font-bold text-[11px]">🗑️ Reset to Default</button>
           </div>
         </div>
         <div className="bg-[#0A2342] text-white rounded-[16px] p-6">
           <h3 className="font-black text-[14px]">Preview (first 2 items)</h3>
           <pre className="mt-4 bg-black/20 rounded-[12px] p-4 text-[10px] overflow-auto max-h-[400px]">{JSON.stringify({ tours: tours.slice(0,2), hotelOptions: hotelOptions.slice(0,2), waNumber }, null, 2)}</pre>
         </div>
       </div>
     )}

   </div>
 </section>

 <footer className="bg-[#0A2342] border-t border-white/10 px-6 py-4 text-center text-[11px] text-white/50">HERO Admin Dashboard • No Coding • Data in browser localStorage • Export to deploy live • © 2026 HERO</footer>
 </main>
 )
}