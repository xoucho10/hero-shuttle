"use client"
import { useState, useEffect, useMemo } from "react"
import Header from '@/components/Header'

const ADMIN_PASSWORD = "hero2026"

const DEFAULT_TOURS = [
  { id:"prison-nakupenda", name:"Prison Island + Nakupenda", cat:["Popular","Half Day"], price:250, market:350, duration:"5 Hours", pickup:"Stone Town 8:30 AM", desc:"Tortoise sanctuary + sandbank + fruit", includes:"Boat, Guide, Entrance, Fruit, Water", area:"West", seo:"Most popular Zanzibar tour per car", active:true, image:"prison-nakupenda.jpg", featured:true, imageData:"" },
  { id:"nakupenda-only", name:"Nakupenda Sandbank Only", cat:["Half Day","Popular"], price:130, market:200, duration:"4 Hours", pickup:"Stone Town 9 AM", desc:"White sandbank in ocean, swimming", includes:"Boat, Fruit, Water", area:"West", seo:"Nakupenda", active:true, image:"nakupenda-only.jpg", featured:true, imageData:"" },
  { id:"prison-only", name:"Prison Island Tortoises", cat:["Half Day"], price:135, market:210, duration:"3 Hours", pickup:"Stone Town", desc:"Giant tortoises 100+ years", includes:"Boat, Entrance, Guide", area:"West", seo:"Prison Island", active:true, image:"prison-only.jpg", featured:false, imageData:"" },
  { id:"stone-town", name:"Stone Town Walking Tour", cat:["Popular","Half Day","Cultural"], price:120, market:180, duration:"3 Hours", pickup:"Stone Town", desc:"UNESCO, Slave Market, House of Wonders", includes:"Guide, Entrances", area:"West", seo:"Stone Town", active:true, image:"stone-town.jpg", featured:true, imageData:"" },
  { id:"spice", name:"Spice Farm Tour", cat:["Half Day","Cultural"], price:100, market:150, duration:"3 Hours", pickup:"Stone Town", desc:"30+ spices + fruits tasting", includes:"Guide, Tasting", area:"Central", seo:"Spice farm", active:true, image:"spice.jpg", featured:false, imageData:"" },
  { id:"jozani", name:"Jozani Forest Monkeys", cat:["Popular","Half Day"], price:90, market:140, duration:"2.5 Hours", pickup:"Paje / Stone Town", desc:"Red colobus monkeys only in Zanzibar", includes:"Entrance, Guide", area:"South-Central", seo:"Jozani", active:true, image:"jozani.jpg", featured:true, imageData:"" },
  { id:"salaam", name:"Salaam Cave Turtle Swim", cat:["Half Day"], price:100, market:150, duration:"2 Hours", pickup:"Paje / Jambiani", desc:"Swim with turtles in cave", includes:"Entrance, Guide", area:"South-East", seo:"Salaam Cave", active:true, image:"salaam.jpg", featured:false, imageData:"" },
  { id:"kuza", name:"Kuza Cave Sacred Swim", cat:["Half Day","Cultural"], price:130, market:190, duration:"3 Hours", pickup:"Paje / Jambiani", desc:"Sacred limestone cave + culture", includes:"Entrance, Guide", area:"South-East", seo:"Kuza Cave", active:true, image:"kuza.jpg", featured:false, imageData:"" },
  { id:"mnemba", name:"Mnemba Atoll Snorkeling", cat:["Popular","Half Day","North"], price:180, market:260, duration:"4 Hours", pickup:"Matemwe 8 AM", desc:"Best coral reef, colorful fish, dolphins", includes:"Boat, Gear, Guide", area:"North-East", seo:"Mnemba Atoll", active:true, image:"mnemba.jpg", featured:true, imageData:"" },
  { id:"safari-blue", name:"Sharing Safari Blue Full Day BBQ", cat:["Full Day","Popular","South"], price:190, market:280, duration:"8 Hours", pickup:"Fumba 8 AM", desc:"Sandbank + snorkeling + seafood BBQ +Sharing dhow", includes:"Dhow, BBQ, Drinks, Gear", area:"South-West", seo:"Safari Blue", active:true, image:"safari-blue.jpg", featured:true, imageData:"" },
  { id:"dhow-stone", name:"Sunset Dhow Stone Town", cat:["Popular","Half Day"], price:80, market:130, duration:"2 Hours", pickup:"Stone Town 4:30 PM", desc:"Traditional dhow sunset cruise", includes:"Dhow, Drinks", area:"West", seo:"Sunset dhow", active:true, image:"dhow-stone.jpg", featured:false, imageData:"" },
  { id:"dolphin", name:"Kizimkazi Dolphin Tour", cat:["Half Day","South"], price:70, market:120, duration:"4 Hours", pickup:"Kizimkazi 6 AM", desc:"Dolphin watching early morning", includes:"Boat, Guide", area:"South", seo:"Kizimkazi dolphin", active:true, image:"dolphin.jpg", featured:false, imageData:"" },
  { id:"rock", name:"The Rock Restaurant Tour", cat:["Half Day","East"], price:30, market:60, duration:"4 Hours", pickup:"East coast", desc:"Iconic Rock photo + Pongwe beach", includes:"Guide", area:"East", seo:"The Rock", active:true, image:"rock.jpg", featured:false, imageData:"" },
  { id:"kite-lesson", name:"Paje Kite Surfing Lesson", cat:["Half Day","East","Water"], price:70, market:120, duration:"2 Hours", pickup:"Paje beach", desc:"Beginner kite with instructor + gear", includes:"Instructor, Gear", area:"South-East", seo:"Paje kite", active:true, image:"kite-lesson.jpg", featured:false, imageData:"" },
  { id:"quad", name:"Quad Bike + Village", cat:["Half Day","Cultural","East"], price:70, market:110, duration:"3 Hours", pickup:"Paje / Bwejuu", desc:"Village + school + beach", includes:"Quad, Guide, Helmet", area:"South-East", seo:"Quad bike", active:true, image:"quad.jpg", featured:false, imageData:"" },
  { id:"chumbe", name:"Chumbe Island Coral Park", cat:["Full Day","South-West"], price:90, market:150, duration:"7 Hours", pickup:"Fumba", desc:"Best coral sanctuary private island", includes:"Boat, Entrance $60, Lunch", area:"South-West", seo:"Chumbe Island", active:true, image:"chumbe.jpg", featured:false, imageData:"" },
  { id:"private-safari-blue", name:"Private Safari Blue Full Day BBQ", cat:["Full Day","Popular","South"], price:220, market:320, duration:"8 Hours", pickup:"8:30 AM", desc:"Sandbank + snorkeling + seafood BBQ + Private dhow", includes:"Dhow, BBQ, Drinks, Gear", area:"West", seo:"Private Safari Blue", active:true, image:"private-safari-blue.jpg", featured:true, imageData:"" },
]

const DEFAULT_TRANSFERS = [
  { id:"airport-stone", name:"Airport → Stone Town", price:25, market:40, duration:"15 min", area:"West", desc:"Per CAR up to 6 pax - Pay after trip", cat:["Popular"], active:true, image:"airport-stone.jpg", imageData:"" },
  { id:"airport-nungwi", name:"Airport → Nungwi / Kendwa", price:40, market:60, duration:"1h 15m", area:"North", desc:"Per CAR up to 6 pax - North beach", cat:["Popular","North"], active:true, image:"airport-nungwi.jpg", imageData:"" },
  { id:"airport-paje", name:"Airport → Paje / Jambiani", price:40, market:60, duration:"1h", area:"South-East", desc:"Per CAR up to 6 pax - Kitesurf area", cat:["Popular","South"], active:true, image:"airport-paje.jpg", imageData:"" },
  { id:"airport-matemwe", name:"Airport → Matemwe / Mnemba", price:40, market:60, duration:"1h 20m", area:"North-East", desc:"Per CAR up to 6 pax - Mnemba area", cat:["North"], active:true, image:"airport-matemwe.jpg", imageData:"" },
  { id:"airport-kiwengwa", name:"Airport → Kiwengwa / Pongwe", price:35, market:55, duration:"1h", area:"East", desc:"Per CAR - East coast", cat:["East"], active:true, image:"airport-kiwengwa.jpg", imageData:"" },
  { id:"paje-nungwi", name:"Paje → Nungwi", price:50, market:70, duration:"1h 30m", area:"North", desc:"Per CAR - East to North crossing", cat:["Popular"], active:true, image:"paje-nungwi.jpg", imageData:"" },
]

const DEFAULT_ANNOUNCEMENTS = [
  { id:"1", badge:"🔥 NEW PROMOTION", title:"Book Direct & Save $100 per Car", subtitle:"Prison + Nakupenda $250 per CAR (not per person) - 5 Hours - Boat + Entrance + Fruit included", cta:"View Transfers", link:"#transfers", imageData:"", active:true },
  { id:"2", badge:"⚡ LIMITED JANUARY", title:"Safari Blue Sharing - $190 per CAR Full Day BBQ", subtitle:"Sandbank + Snorkeling + Seafood BBQ + Dhow - Same car up to 6 pax same price", cta:"View Tours", link:"#tours", imageData:"", active:true },
  { id:"3", badge:"📢 ANNOUNCEMENT", title:"Free Cancellation 24h - Pay Driver After Each Trip", subtitle:"No prepayment. Pay after each trip. Local owner - 8 years in Zanzibar - WhatsApp 2 minutes", cta:"Why Per CAR?", link:"#why", imageData:"", active:true },
]

const DEFAULT_BLOGS = [
  { id:"prison-island-guide", slug:"prison-island-guide", title:"Prison Island & Nakupenda: Complete Guide 2026 - Price per CAR", cat:"Guide", date:"Jan 12, 2026", readTime:"7 min", excerpt:"Complete guide to giant tortoises 100+ years + white sandbank best time. Price per CAR not per person - Save $100.", content:"Prison Island + Nakupenda is #1 tour in Zanzibar.\n\nPRICE PER CAR: $250 per CAR up to 6 pax same price. Includes: Private boat, Guide, Entrance $4, Fruit, Water, Snorkeling gear. Market $350 per CAR. Save $100.\n\nPrison Island: Giant Aldabra tortoises 100+ years, 150kg. Feed, photo.\nNakupenda: White sandbank in ocean appears at low tide. Best 9am-1pm.\n\nItinerary 5 Hours: 8:30 pickup Stone Town per CAR $25, 9am boat 25min, 9:30-11am tortoises, 11am-1:30pm sandbank fruit swimming, 1:30 return.\n\nCombo: Airport→Stone $25 per CAR + Tour $250 = $275 per CAR for up to 6 pax. Pay after trip. Free cancellation 24h.\n\nWhy HERO? Local owner 8 years, direct boat, no middleman.", imageData:"", seoTitle:"Prison Island + Nakupenda Guide 2026 - $250 per CAR | HERO Zanzibar", metaDescription:"Prison Island tortoises + Nakupenda sandbank $250 per CAR up to 6 pax same price. Market $350 save $100. Includes boat, entrance, guide, fruit.", keywords:"prison island nakupenda price per car, zanzibar prison island tour, nakupenda sandbank", active:true },
  { id:"mnemba-vs-safari-blue", slug:"mnemba-vs-safari-blue", title:"Mnemba Atoll vs Safari Blue - Which is Better?", cat:"Comparison", date:"Jan 8, 2026", readTime:"8 min", excerpt:"Full comparison snorkeling quality, coral, dolphin chance, BBQ vs fruit. Both per CAR same price up to 6 pax.", content:"Mnemba vs Safari Blue both per CAR not per person.\n\nMNEMBA $180 per CAR 4h - Best coral reef, visibility 20m, 100+ fish, dolphin 70%, boat gear guide.\nSAFARI BLUE $190 per CAR 8h - Sandbank + 2 snorkeling + Kwale lagoon + seafood BBQ lobster fish calamari + drinks + dhow. All inclusive.\n\nWhich better? Snorkeling: Mnemba wins 9/10 vs 6/10. Full day + food: Safari Blue wins. Dolphins: Mnemba 70% vs 30%. Best do both Day1 Mnemba Day2 Safari Blue $370 per CAR for up to 6 pax vs agencies $960.", imageData:"", seoTitle:"Mnemba vs Safari Blue Comparison 2026 - Which is Better per CAR?", metaDescription:"Mnemba $180 per CAR vs Safari Blue $190 per CAR comparison. Coral, dolphins, BBQ. Up to 6 pax same price.", keywords:"mnemba vs safari blue, mnemba atoll snorkeling price per car", active:true },
  { id:"zanzibar-transfers", slug:"zanzibar-transfers", title:"Zanzibar Transfers: Airport to Paje, Nungwi Price per CAR 2026", cat:"Transfers", date:"Jan 3, 2026", readTime:"6 min", excerpt:"No per person scam explained. Real per vehicle price $25-$50 local. Map distance + matrix.", content:"Transfers per CAR not per person - #1 SEO keyword.\n\nSCAM: Other sites $60 per person x4=$240. OUR PRICE $40 per CAR up to 6 pax same price. Save $200.\n\nMatrix per CAR: Airport→Stone Town $25 15min 8km, Airport→Nungwi $40 1h15m 60km, Airport→Paje $40 1h 50km, Airport→Matemwe $40 1h20m, Kiwengwa $35 1h, Paje→Nungwi $50.\n\nPrice per vehicle Alphard/minivan driver+fuel. Luggage included. Pay after trip. Free cancellation.\n\nIf stay in Paje (South-East) and want Mnemba (North-East) = $50 transport per CAR + $180 tour per CAR = $230 total.", imageData:"", seoTitle:"Zanzibar Transfers Price per CAR 2026 - Airport to Nungwi Paje $25-$50", metaDescription:"Zanzibar Airport transfers $25-$50 per CAR up to 6 pax same price. No per person scam. Stone Town $25, Nungwi $40, Paje $40.", keywords:"zanzibar airport transfer price per car, airport to paje price per car", active:true },
]

export default function AdminPage(){
 const [auth, setAuth] = useState(false)
 const [pass, setPass] = useState("")
 const [tab, setTab] = useState("overview")
 const [tours, setTours] = useState<any[]>(DEFAULT_TOURS)
 const [transfers, setTransfers] = useState<any[]>(DEFAULT_TRANSFERS)
 const [announcements, setAnnouncements] = useState<any[]>(DEFAULT_ANNOUNCEMENTS)
 const [blogs, setBlogs] = useState<any[]>(DEFAULT_BLOGS)
 const [waNumber, setWaNumber] = useState("255773628792")
 const [filter, setFilter] = useState("All")
 const [editingTour, setEditingTour] = useState<any>(null)
 const [editingTransfer, setEditingTransfer] = useState<any>(null)
 const [editingBlog, setEditingBlog] = useState<any>(null)
 const [editingAnn, setEditingAnn] = useState<any>(null)
 const [siteContent, setSiteContent] = useState({
   heroTitle:"Zanzibar Tours - Best Price Direct", heroSubtitle:"17 Tours • Price per CAR • No Middleman", heroBadge:"BOOK DIRECT • SAVE UP TO $100",
   heroImage:"", heroImageData:"", aboutTitle:"Local Owner - 8 Years in Zanzibar", aboutText:"We are local, not agency. Best price per CAR guaranteed.", aboutImage:"", aboutImageData:"",
   footerText:"HERO Zanzibar Tours - Price per CAR - Book Direct", contactEmail:"info@herozanzibar.com", contactAddress:"Paje, Zanzibar - Tanzania", currency:"USD", language:"EN",
 })
 const [seoSettings, setSeoSettings] = useState({
   siteTitle:"HERO Zanzibar Tours - Best Price per CAR - 17 Tours + Transfers", metaDescription:"Best Zanzibar tours & transfers - Price per CAR not per person from $25. Prison Island $250 per CAR, Mnemba, Safari Blue. Local owner 8 years.", keywords:"zanzibar tours price per car, zanzibar transfers per car, prison island, nakupenda, mnemba, safari blue", ogImage:"/og-image.jpg", ogImageData:"",
   googleReviewsEmbed:"", tripadvisorEmbed:""
 })
 const [paxRules, setPaxRules] = useState({ basePax:6, extraPaxPercent:0, maxPax:6, note:"Price is PER CAR per vehicle up to 6 pax same price - not per person. No extra for 3rd/4th. Transport per vehicle." })
 const [socials, setSocials] = useState({ instagram:"https://instagram.com/herozanzibar", facebook:"https://facebook.com/herozanzibar", tiktok:"https://tiktok.com/@herozanzibar", tripadvisor:"https://tripadvisor.com/herozanzibar" })
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
   "South": { "West": 40, "Central": 35, "South-Central": 25, "South": 15, "South-East": 20, "East": 30, "North-East": 55, "North": 60, "South-West": 30, "All": 15 },
   "East": { "West": 35, "Central": 25, "South-Central": 30, "South": 35, "South-East": 30, "East": 15, "North-East": 25, "North": 40, "South-West": 40, "All": 15 },
   "North-East": { "West": 40, "Central": 30, "South-Central": 45, "South": 55, "South-East": 50, "East": 25, "North-East": 15, "North": 20, "South-West": 50, "All": 15 },
   "Central": { "West": 20, "Central": 10, "South-Central": 20, "South": 30, "South-East": 30, "East": 25, "North-East": 30, "North": 35, "South-West": 30, "All": 15 },
   "South-Central": { "West": 35, "Central": 20, "South-Central": 15, "South": 20, "South-East": 20, "East": 25, "North-East": 45, "North": 50, "South-West": 30, "All": 15 },
   "South-West": { "West": 35, "Central": 30, "South-Central": 30, "South": 30, "South-East": 35, "East": 40, "North-East": 50, "North": 55, "South-West": 15, "All": 15 },
 })

 const fileToBase64 = (file: File, cb:(b64:string)=>void) => {
   const reader = new FileReader()
   reader.onload = () => cb(reader.result as string)
   reader.readAsDataURL(file)
 }

 const onTourFile = (id: string, file: File) => {
   fileToBase64(file, (b64) => {
     setTours(prev => prev.map(x => x.id === id? {...x, imageData:b64, image:file.name} : x))
   })
 }

 const onTransferFile = (id: string, file: File) => {
   fileToBase64(file, (b64) => {
     setTransfers(prev => prev.map(x => x.id === id? {...x, imageData:b64, image:file.name} : x))
   })
 }

 useEffect(()=>{
   const savedAuth = localStorage.getItem("hero_admin_auth")
   if(savedAuth==="1") setAuth(true)
   const load = (k:string,s:any)=>{ const v=localStorage.getItem(k); if(v) try{ s(JSON.parse(v)) }catch{} }
   load("hero_tours", setTours); load("hero_transfers", setTransfers); load("hero_announcements", setAnnouncements); load("hero_blogs", setBlogs); load("hero_hotels", setHotelOptions); load("hero_matrix", setTransportMatrix); load("hero_content", setSiteContent); load("hero_seo", setSeoSettings); load("hero_pax", setPaxRules); load("hero_socials", setSocials)
   const wa=localStorage.getItem("hero_wa"); if(wa) setWaNumber(wa)
 }, [])

 const saveAll = () => {
   localStorage.setItem("hero_tours", JSON.stringify(tours))
   localStorage.setItem("hero_transfers", JSON.stringify(transfers))
   localStorage.setItem("hero_announcements", JSON.stringify(announcements))
   localStorage.setItem("hero_blogs", JSON.stringify(blogs))
   localStorage.setItem("hero_wa", waNumber)
   localStorage.setItem("hero_hotels", JSON.stringify(hotelOptions))
   localStorage.setItem("hero_matrix", JSON.stringify(transportMatrix))
   localStorage.setItem("hero_content", JSON.stringify(siteContent))
   localStorage.setItem("hero_seo", JSON.stringify(seoSettings))
   localStorage.setItem("hero_pax", JSON.stringify(paxRules))
   localStorage.setItem("hero_socials", JSON.stringify(socials))
   alert("✅ SAVED! Tours per CAR + Transfers + Announcements + Blogs + SEO + Images saved. Homepage and /blogs updated.")
 }

 const handleLogin = () => {
   if(pass===ADMIN_PASSWORD){ localStorage.setItem("hero_admin_auth","1"); setAuth(true) } else alert("Wrong password")
 }

 const filtered = filter==="All"? tours : tours.filter(t=>t.cat.includes(filter))
 const totalRevenue = useMemo(()=> tours.reduce((s,t)=> s+t.price,0), [tours])

 if(!auth){
   return (
     <main className="min-h-screen bg-[#0A2342] flex items-center justify-center px-6">
       <div className="bg-white rounded-[24px] p-8 max-w-sm w-full text-center">
         <p className="text-[36px]">🔐</p>
         <h1 className="font-black text-[22px] mt-2">HERO Full Cockpit - Per CAR</h1>
         <input type="password" value={pass} onChange={e=>setPass(e.target.value)} placeholder="hero2026" className="mt-6 w-full bg-[#F5F7FA] border rounded-full px-4 py-3 text-[13px] text-center"/>
         <button onClick={handleLogin} className="mt-3 w-full bg-[#0A2342] text-white py-3 rounded-full font-black">Login</button>
       </div>
     </main>
   )
 }

 return (
 <main className="min-h-screen bg-[#F8FAFF]">
 <Header/>
 <section className="bg-[#0A2342] text-white px-6 md:px-12 py-5">
   <div className="max-w-[1600px] mx-auto flex justify-between items-center flex-wrap gap-3">
     <div>
       <h1 className="font-black text-[20px]">HERO Cockpit - Per CAR • {tours.length} Tours • {transfers.length} Transfers • {blogs.length} Blogs</h1>
       <p className="text-[11px] opacity-60">12 tabs: Dashboard, Announcements, Tours per CAR, Transfers per CAR, Blogs SEO, Hotels, Matrix, Pax Per CAR, Content + Images, SEO + Reviews, Settings, Export</p>
     </div>
     <button onClick={saveAll} className="bg-[#FF8A1A] px-6 py-2.5 rounded-full font-black text-[12px]">💾 Save All - Per CAR</button>
   </div>
 </section>

 <section className="bg-white border-b sticky top-0 z-30 shadow-sm">
   <div className="px-6 md:px-12 py-2.5 flex gap-2 overflow-x-auto">
     {[
       { id:"overview", label:"📊 Dashboard" },
       { id:"announcements", label:`📢 Hero Promos (${announcements.length})` },
       { id:"tours", label:`🏝️ Tours per CAR (${tours.length}) 📸` },
       { id:"transfers", label:`🚕 Transfers per CAR (${transfers.length})` },
       { id:"blogs", label:`📝 Blogs SEO (${blogs.length})` },
       { id:"hotels", label:"🏨 Hotels" },
       { id:"matrix", label:"🚚 Matrix" },
       { id:"pax", label:"👥 Per CAR Rules" },
       { id:"content", label:"📝 Content + Images 📸" },
       { id:"seo", label:"🔍 SEO + Reviews" },
       { id:"settings", label:"⚙️ Settings" },
       { id:"export", label:"📤 Export Live" },
     ].map(t=>(
       <button key={t.id} onClick={()=>setTab(t.id)} className={`px-3 py-2 rounded-full text-[10px] font-black border whitespace-nowrap ${tab===t.id? "bg-[#0A2342] text-white border-[#0A2342]" : "bg-[#F5F7FA] border-gray-100"}`}>{t.label}</button>
     ))}
   </div>
 </section>

 <section className="px-6 md:px-12 py-8">
   <div className="max-w-[1600px] mx-auto">

     {tab==="overview" && (
       <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
         <div className="bg-white rounded-[18px] p-5 border"><p className="text-[10px] font-black opacity-50">TOURS PER CAR</p><p className="font-black text-[28px]">{tours.length}</p><p className="text-[10px] opacity-50 mt-1">Avg ${ (totalRevenue/tours.length).toFixed(0)} per CAR</p></div>
         <div className="bg-white rounded-[18px] p-5 border"><p className="text-[10px] font-black opacity-50">TRANSFERS PER CAR</p><p className="font-black text-[28px]">{transfers.length}</p><p className="text-[10px] opacity-50 mt-1">$25-$50 per CAR</p></div>
         <div className="bg-white rounded-[18px] p-5 border"><p className="text-[10px] font-black opacity-50">BLOGS SEO</p><p className="font-black text-[28px]">{blogs.length}</p><p className="text-[10px] opacity-50 mt-1">Full info for SEO</p></div>
         <div className="bg-[#0A2342] text-white rounded-[18px] p-5"><p className="text-[10px] font-black opacity-60">WHATSAPP</p><p className="font-black text-[13px] mt-1">+{waNumber}</p><p className="text-[9px] opacity-60 mt-1">Price per CAR rule active</p></div>
       </div>
     )}

     {tab==="announcements" && (
       <div className="bg-white rounded-[20px] p-6 border">
         <div className="flex justify-between items-center"><h2 className="font-black">📢 Hero - Announcements & Promotions - Where new promos placed</h2><button onClick={()=>setEditingAnn({ id:"", badge:"🔥 NEW", title:"", subtitle:"", cta:"View", link:"#transfers", imageData:"", active:true })} className="bg-[#0A2342] text-white px-4 py-2 rounded-full text-[11px] font-bold">+ Add Promo</button></div>
         <p className="text-[11px] opacity-60 mt-2">These show in homepage hero slider. Rotate every 6 sec. Upload image for each promo. This is face of website.</p>
         <div className="mt-6 grid md:grid-cols-2 gap-4">
           {announcements.map((a:any)=>(
             <div key={a.id} className="bg-[#F8FAFF] rounded-[14px] p-4 border">
               <span className="bg-[#FF8A1A] text-white text-[9px] px-2 py-1 rounded-full font-black">{a.badge}</span>
               <p className="font-black text-[13px] mt-2">{a.title}</p>
               <p className="text-[11px] opacity-60 mt-1">{a.subtitle}</p>
               <div className="mt-3 flex gap-2"><button onClick={()=>setEditingAnn(a)} className="bg-[#0A2342] text-white px-3 py-1.5 rounded-full text-[10px] font-bold">Edit</button><button onClick={()=>setAnnouncements(announcements.filter(x=>x.id!==a.id))} className="bg-red-50 text-red-600 px-3 py-1.5 rounded-full text-[10px] font-bold">Delete</button></div>
             </div>
           ))}
         </div>
         {editingAnn && (
           <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
             <div className="bg-white rounded-[20px] p-6 max-w-xl w-full">
               <h3 className="font-black">Edit Hero Promo</h3>
               <div className="mt-4 space-y-3">
                 <input value={editingAnn.badge?? ""} onChange={e=>setEditingAnn({...editingAnn, badge:e.target.value})} placeholder="Badge e.g. 🔥 NEW PROMOTION" className="w-full bg-[#F5F7FA] rounded-full px-4 py-2.5 text-[11px] border"/>
                 <input value={editingAnn.title?? ""} onChange={e=>setEditingAnn({...editingAnn, title:e.target.value})} placeholder="Title" className="w-full bg-[#F5F7FA] rounded-full px-4 py-3 text-[13px] font-black border"/>
                 <textarea value={editingAnn.subtitle?? ""} onChange={e=>setEditingAnn({...editingAnn, subtitle:e.target.value})} placeholder="Subtitle - Price per CAR included" className="w-full bg-[#F5F7FA] rounded-[12px] px-4 py-3 text-[11px] border h-[70px]"/>
                 <div className="grid grid-cols-2 gap-3"><input value={editingAnn.cta?? ""} onChange={e=>setEditingAnn({...editingAnn, cta:e.target.value})} placeholder="Button text" className="w-full bg-[#F5F7FA] rounded-full px-4 py-2.5 text-[11px] border"/><input value={editingAnn.link?? ""} onChange={e=>setEditingAnn({...editingAnn, link:e.target.value})} placeholder="Link e.g. #transfers" className="w-full bg-[#F5F7FA] rounded-full px-4 py-2.5 text-[11px] border"/></div>
                 <input type="file" accept="image/*" onChange={e=>{ const f=e.target.files?.[0]; if(f){ const r=new FileReader(); r.onload=()=> setEditingAnn({...editingAnn, imageData:r.result as string}); r.readAsDataURL(f) } }} className="w-full text-[11px]"/>
                 {editingAnn.imageData && <img src={editingAnn.imageData} className="w-full h-[120px] object-cover rounded-[10px] border"/>}
               </div>
               <div className="flex gap-3 mt-5"><button onClick={()=>{ if(!editingAnn.title){ alert("Title required"); return } if(announcements.find((x:any)=>x.id===editingAnn.id)){ setAnnouncements(announcements.map((x:any)=> x.id===editingAnn.id? editingAnn : x)) } else { setAnnouncements([...announcements, {...editingAnn, id:Date.now().toString()}]) } setEditingAnn(null) }} className="flex-1 bg-[#0A2342] text-white py-3 rounded-full font-black">Save Promo</button><button onClick={()=>setEditingAnn(null)} className="px-6 bg-[#F5F7FA] rounded-full font-bold">Cancel</button></div>
             </div>
           </div>
         )}
       </div>
     )}

     {tab==="tours" && (
       <div>
         <div className="flex justify-between items-center bg-white p-4 rounded-[16px] border flex-wrap gap-3">
           <h2 className="font-black text-[16px]">Tours - Per CAR - BIG 220px + Upload</h2>
           <div className="flex gap-2">
             <select value={filter} onChange={e=>setFilter(e.target.value)} className="bg-[#F5F7FA] border rounded-full px-4 py-2 text-[11px] font-bold">
               {["All","Popular","Half Day","Full Day","North","South","East","West","Cultural","Water"].map(c=> <option key={c} value={c}>{c}</option>)}
             </select>
             <button onClick={()=>setEditingTour({ id:"", name:"", cat:["Half Day"], price:100, market:150, duration:"3 Hours", pickup:"", desc:"", includes:"", area:"West", seo:"", active:true, image:"", featured:false, imageData:"" })} className="bg-[#0A2342] text-white px-5 py-2 rounded-full font-bold text-[11px]">+ Add Tour per CAR</button>
           </div>
         </div>

         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
           {filtered.map((t:any)=>(
             <div key={t.id} className="bg-white rounded-[20px] overflow-hidden border-2 border-gray-100 shadow-sm">
               <div className="h-[220px] bg-[#F5F7FA] relative overflow-hidden">
                 {t.imageData? <img src={t.imageData} alt={t.name} className="w-full h-full object-cover" /> : <div className="w-full h-full bg-gradient-to-br from-[#0A2342] to-[#1a4a7a] flex flex-col items-center justify-center text-white"><span className="text-[11px] font-black bg-white/20 px-3 py-1 rounded-full">{t.area}</span><span className="font-black text-[12px] mt-2">{t.image || t.id+".jpg"}</span><span className="text-[10px] opacity-70 mt-1">No picture - Upload</span></div>}
                 <span className="absolute top-3 left-3 bg-white text-[#0A2342] text-[9px] px-2.5 py-1 rounded-full font-black">{t.area} per CAR</span>
                 <span className="absolute top-3 right-3 bg-[#0A2342] text-white text-[10px] px-3 py-1 rounded-full font-black">${t.price} per car</span>
               </div>
               <div className="p-4">
                 <p className="font-black text-[13px]">{t.name}</p>
                 <p className="text-[11px] opacity-60 mt-1">{t.desc}</p>
                 <div className="mt-3 flex gap-2">
                   <button onClick={()=>setEditingTour(t)} className="flex-1 bg-[#0A2342] text-white py-2.5 rounded-full text-[11px] font-black">✏️ Edit per CAR + Upload</button>
                   <label className="px-3 py-2.5 rounded-full text-[11px] font-bold border bg-[#FFFBF5] cursor-pointer">📸<input type="file" accept="image/*" className="hidden" onChange={(e)=>{ const file=e.target.files?.[0]; if(file) onTourFile(t.id, file) }} /></label>
                 </div>
               </div>
             </div>
           ))}
         </div>

         {editingTour && (
           <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
             <div className="bg-white rounded-[24px] p-6 max-w-2xl w-full max-h-[95vh] overflow-y-auto">
               <h3 className="font-black text-[18px]">Edit Tour - Per CAR - Upload</h3>
               <div className="mt-5 bg-[#F5F7FA] rounded-[16px] p-4 border-2 border-dashed">
                 <p className="text-[11px] font-black">📸 TOUR PICTURE - BIG 220px</p>
                 <div className="mt-3 grid md:grid-cols-2 gap-4">
                   <div className="w-full h-[160px] bg-white rounded-[12px] border overflow-hidden flex items-center justify-center">{editingTour.imageData? <img src={editingTour.imageData} className="w-full h-full object-cover" /> : <span className="text-[11px] opacity-50">No image</span>}</div>
                   <div><input type="file" accept="image/*" id="tour-up" className="hidden" onChange={(e)=>{ const f=e.target.files?.[0]; if(!f) return; fileToBase64(f, (b64)=> setEditingTour({...editingTour, imageData:b64, image:f.name})) }} /><label htmlFor="tour-up" className="w-full bg-[#0A2342] text-white py-3 rounded-full font-black text-[11px] flex justify-center cursor-pointer">📤 Upload Picture</label><input value={editingTour.image?? ""} onChange={e=>setEditingTour({...editingTour, image:e.target.value})} placeholder="File name" className="mt-3 w-full bg-white rounded-full px-4 py-2 text-[11px] border"/></div>
                 </div>
               </div>
               <div className="mt-5 grid md:grid-cols-2 gap-3">
                 <input value={editingTour.id?? ""} onChange={e=>setEditingTour({...editingTour, id:e.target.value.toLowerCase().replace(/[^a-z0-9-]/g,'-')})} placeholder="ID" className="w-full bg-[#F5F7FA] rounded-full px-4 py-3 text-[12px] border"/>
                 <input value={editingTour.name?? ""} onChange={e=>setEditingTour({...editingTour, name:e.target.value})} placeholder="Tour Name" className="w-full bg-[#F5F7FA] rounded-full px-4 py-3 text-[12px] font-bold border"/>
                 <input type="number" value={editingTour.price?? ""} onChange={e=>setEditingTour({...editingTour, price:parseInt(e.target.value)||0})} placeholder="Price PER CAR" className="w-full bg-[#F5F7FA] rounded-full px-4 py-3 text-[12px] font-black border-2 border-[#0A2342]"/>
                 <input type="number" value={editingTour.market?? ""} onChange={e=>setEditingTour({...editingTour, market:parseInt(e.target.value)||0})} placeholder="Market PER CAR" className="w-full bg-[#F5F7FA] rounded-full px-4 py-3 text-[12px] font-bold border text-red-600"/>
                 <input value={editingTour.desc?? ""} onChange={e=>setEditingTour({...editingTour, desc:e.target.value})} placeholder="Short desc" className="md:col-span-2 w-full bg-[#F5F7FA] rounded-full px-4 py-3 text-[12px] border"/>
                 <input value={editingTour.duration?? ""} onChange={e=>setEditingTour({...editingTour, duration:e.target.value})} placeholder="Duration" className="w-full bg-[#F5F7FA] rounded-full px-4 py-3 text-[12px] border"/>
                 <input value={editingTour.pickup?? ""} onChange={e=>setEditingTour({...editingTour, pickup:e.target.value})} placeholder="Pickup" className="w-full bg-[#F5F7FA] rounded-full px-4 py-3 text-[12px] border"/>
                 <input value={editingTour.includes?? ""} onChange={e=>setEditingTour({...editingTour, includes:e.target.value})} placeholder="Includes" className="md:col-span-2 w-full bg-[#F5F7FA] rounded-full px-4 py-3 text-[12px] border"/>
                 <input value={editingTour.area?? ""} onChange={e=>setEditingTour({...editingTour, area:e.target.value})} placeholder="Area e.g. West" className="w-full bg-[#F5F7FA] rounded-full px-4 py-3 text-[12px] border"/>
                 <input value={editingTour.seo?? ""} onChange={e=>setEditingTour({...editingTour, seo:e.target.value})} placeholder="SEO keyword per CAR" className="w-full bg-[#F5F7FA] rounded-full px-4 py-3 text-[12px] border"/>
               </div>
               <div className="flex gap-3 pt-5">
                 <button onClick={()=>{ if(!editingTour.id||!editingTour.name){ alert("ID and Name required"); return } if(tours.find((t:any)=>t.id===editingTour.id)){ setTours(ts=> ts.map((t:any)=> t.id===editingTour.id? editingTour : t)) } else { setTours(ts=> [...ts, editingTour]) } setEditingTour(null) }} className="flex-1 bg-[#0A2342] text-white py-3.5 rounded-full font-black">💾 Save Tour per CAR + Picture</button>
                 <button onClick={()=>setEditingTour(null)} className="px-8 py-3.5 rounded-full font-bold bg-[#F5F7FA]">Cancel</button>
               </div>
             </div>
           </div>
         )}
       </div>
     )}

     {tab==="transfers" && (
       <div className="bg-white rounded-[20px] p-6 border">
         <div className="flex justify-between items-center"><h2 className="font-black text-[16px]">🚕 Transfers - Per CAR - Pictures</h2><button onClick={()=>setEditingTransfer({ id:"", name:"", price:25, market:40, duration:"15 min", area:"West", desc:"Per CAR up to 6 pax", cat:["Popular"], active:true, image:"", imageData:"" })} className="bg-[#0A2342] text-white px-4 py-2 rounded-full text-[11px] font-bold">+ Add Transfer per CAR</button></div>
         <div className="mt-6 grid md:grid-cols-2 gap-3">
           {transfers.map((tr:any)=>(
             <div key={tr.id} className="bg-[#F5F7FA] rounded-[14px] p-3 flex gap-3 items-center">
               <div className="w-[60px] h-[60px] bg-white rounded-[10px] overflow-hidden border flex items-center justify-center">{tr.imageData? <img src={tr.imageData} className="w-full h-full object-cover" /> : <span className="text-[9px] opacity-40">No img</span>}</div>
               <div className="flex-1"><p className="font-black text-[12px]">{tr.name}</p><p className="text-[11px] opacity-60">${tr.price} per CAR vehicle</p></div>
               <button onClick={()=>setEditingTransfer(tr)} className="bg-[#0A2342] text-white px-3 py-1.5 rounded-full text-[10px] font-bold">Edit</button>
               <label className="bg-white px-3 py-2 rounded-full text-[10px] font-bold border cursor-pointer">📸<input type="file" accept="image/*" className="hidden" onChange={(e)=>{ const f=e.target.files?.[0]; if(f) onTransferFile(tr.id, f) }} /></label>
             </div>
           ))}
         </div>
         {editingTransfer && (
           <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
             <div className="bg-white rounded-[20px] p-6 max-w-lg w-full">
               <h3 className="font-black">Edit Transfer per CAR</h3>
               <div className="mt-4 space-y-3">
                 <input value={editingTransfer.id?? ""} onChange={e=>setEditingTransfer({...editingTransfer, id:e.target.value.toLowerCase().replace(/[^a-z0-9-]/g,'-')})} placeholder="ID" className="w-full bg-[#F5F7FA] rounded-full px-4 py-2.5 text-[11px] border"/>
                 <input value={editingTransfer.name?? ""} onChange={e=>setEditingTransfer({...editingTransfer, name:e.target.value})} placeholder="Name e.g. Airport → Paje" className="w-full bg-[#F5F7FA] rounded-full px-4 py-2.5 text-[12px] font-bold border"/>
                 <div className="grid grid-cols-2 gap-3"><input type="number" value={editingTransfer.price?? ""} onChange={e=>setEditingTransfer({...editingTransfer, price:parseInt(e.target.value)||0})} placeholder="Price per CAR" className="w-full bg-[#F5F7FA] rounded-full px-4 py-2.5 text-[11px] font-black border-2 border-[#0A2342]"/><input type="number" value={editingTransfer.market?? ""} onChange={e=>setEditingTransfer({...editingTransfer, market:parseInt(e.target.value)||0})} placeholder="Market per CAR" className="w-full bg-[#F5F7FA] rounded-full px-4 py-2.5 text-[11px] border text-red-600"/></div>
                 <div className="grid grid-cols-2 gap-3"><input value={editingTransfer.area?? ""} onChange={e=>setEditingTransfer({...editingTransfer, area:e.target.value})} placeholder="Area" className="w-full bg-[#F5F7FA] rounded-full px-4 py-2.5 text-[11px] border"/><input value={editingTransfer.duration?? ""} onChange={e=>setEditingTransfer({...editingTransfer, duration:e.target.value})} placeholder="Duration" className="w-full bg-[#F5F7FA] rounded-full px-4 py-2.5 text-[11px] border"/></div>
                 <input value={editingTransfer.desc?? ""} onChange={e=>setEditingTransfer({...editingTransfer, desc:e.target.value})} placeholder="Desc per CAR" className="w-full bg-[#F5F7FA] rounded-full px-4 py-2.5 text-[11px] border"/>
                 <input type="file" accept="image/*" onChange={e=>{ const f=e.target.files?.[0]; if(f){ fileToBase64(f, b64=> setEditingTransfer({...editingTransfer, imageData:b64, image:f.name})) } }} className="w-full text-[11px]"/>
                 {editingTransfer.imageData && <img src={editingTransfer.imageData} className="w-full h-[100px] object-cover rounded-[10px]"/>}
               </div>
               <div className="flex gap-3 mt-5"><button onClick={()=>{ if(!editingTransfer.id||!editingTransfer.name){ alert("ID and Name required"); return } if(transfers.find((t:any)=>t.id===editingTransfer.id)){ setTransfers(transfers.map((t:any)=> t.id===editingTransfer.id? editingTransfer : t)) } else { setTransfers([...transfers, editingTransfer]) } setEditingTransfer(null) }} className="flex-1 bg-[#0A2342] text-white py-3 rounded-full font-black">Save per CAR</button><button onClick={()=>setEditingTransfer(null)} className="px-6 bg-[#F5F7FA] rounded-full font-bold">Cancel</button></div>
             </div>
           </div>
         )}
       </div>
     )}

     {tab==="blogs" && (
       <div className="bg-white rounded-[20px] p-6 border">
         <div className="flex justify-between items-center"><h2 className="font-black">📝 Blogs SEO - Full Information - Increases SEO</h2><button onClick={()=>setEditingBlog({ id:"", slug:"", title:"", cat:"Guide", date:new Date().toLocaleDateString(), readTime:"5 min", excerpt:"", content:"", imageData:"", seoTitle:"", metaDescription:"", keywords:"", active:true })} className="bg-[#0A2342] text-white px-4 py-2 rounded-full text-[11px] font-bold">+ Add Blog SEO</button></div>
         <p className="text-[11px] opacity-60 mt-2">These blogs are what increase SEO. Need 500+ words content per CAR, keywords, meta description. Fixes 404.</p>
         <div className="mt-6 grid md:grid-cols-2 gap-4">
           {blogs.map((b:any)=>(
             <div key={b.id} className="bg-[#F8FAFF] rounded-[14px] p-4 border">
               <p className="font-black text-[13px]">{b.title}</p>
               <p className="text-[10px] opacity-60 mt-1">/{b.slug} • {b.cat} • {b.readTime}</p>
               <p className="text-[11px] opacity-70 mt-2 line-clamp-2">{b.excerpt}</p>
               <p className="text-[9px] opacity-50 mt-2">SEO: {b.seoTitle?.slice(0,60)}</p>
               <div className="mt-3 flex gap-2"><button onClick={()=>setEditingBlog(b)} className="bg-[#0A2342] text-white px-3 py-1.5 rounded-full text-[10px] font-bold">Edit SEO Full</button><a href={`/blogs/${b.slug}`} target="_blank" className="bg-white border px-3 py-1.5 rounded-full text-[10px] font-bold">View → Fix 404</a><button onClick={()=>setBlogs(blogs.filter((x:any)=>x.id!==b.id))} className="text-red-500 text-[10px] font-bold">Delete</button></div>
             </div>
           ))}
         </div>
         {editingBlog && (
           <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
             <div className="bg-white rounded-[20px] p-6 max-w-2xl w-full max-h-[95vh] overflow-y-auto">
               <h3 className="font-black">Edit Blog - Full SEO - 500+ Words</h3>
               <div className="mt-4 space-y-3">
                 <input value={editingBlog.slug?? ""} onChange={e=>setEditingBlog({...editingBlog, slug:e.target.value.toLowerCase().replace(/[^a-z0-9-]/g,'-'), id:e.target.value.toLowerCase().replace(/[^a-z0-9-]/g,'-')})} placeholder="slug e.g. mnemba-vs-safari-blue - used in URL" className="w-full bg-[#F5F7FA] rounded-full px-4 py-2.5 text-[11px] border font-bold"/>
                 <input value={editingBlog.title?? ""} onChange={e=>setEditingBlog({...editingBlog, title:e.target.value})} placeholder="Title H1 - e.g. Prison Island Guide per CAR" className="w-full bg-[#F5F7FA] rounded-full px-4 py-3 text-[13px] font-black border"/>
                 <div className="grid grid-cols-2 gap-3"><input value={editingBlog.cat?? ""} onChange={e=>setEditingBlog({...editingBlog, cat:e.target.value})} placeholder="Category" className="w-full bg-[#F5F7FA] rounded-full px-4 py-2.5 text-[11px] border"/><input value={editingBlog.readTime?? ""} onChange={e=>setEditingBlog({...editingBlog, readTime:e.target.value})} placeholder="Read time e.g. 7 min" className="w-full bg-[#F5F7FA] rounded-full px-4 py-2.5 text-[11px] border"/></div>
                 <textarea value={editingBlog.excerpt?? ""} onChange={e=>setEditingBlog({...editingBlog, excerpt:e.target.value})} placeholder="Excerpt 150 chars - shows on list" className="w-full bg-[#F5F7FA] rounded-[12px] px-4 py-3 text-[11px] border h-[60px]"/>
                 <textarea value={editingBlog.content?? ""} onChange={e=>setEditingBlog({...editingBlog, content:e.target.value})} placeholder="Full Content 500+ words for SEO - price per CAR, matrix, itinerary, FAQ - This increases SEO" className="w-full bg-[#F5F7FA] rounded-[12px] px-4 py-3 text-[12px] border h-[220px]"/>
                 <input value={editingBlog.seoTitle?? ""} onChange={e=>setEditingBlog({...editingBlog, seoTitle:e.target.value})} placeholder="SEO Title 60 chars" className="w-full bg-[#FFF8ED] rounded-full px-4 py-2.5 text-[11px] border border-[#FF8A1A]/30 font-bold"/>
                 <textarea value={editingBlog.metaDescription?? ""} onChange={e=>setEditingBlog({...editingBlog, metaDescription:e.target.value})} placeholder="Meta Description 155 chars - Google snippet" className="w-full bg-[#FFF8ED] rounded-[12px] px-4 py-2.5 text-[11px] border border-[#FF8A1A]/30 h-[60px]"/>
                 <input value={editingBlog.keywords?? ""} onChange={e=>setEditingBlog({...editingBlog, keywords:e.target.value})} placeholder="Keywords comma - e.g. prison island price per car, nakupenda tour" className="w-full bg-[#F5F7FA] rounded-full px-4 py-2.5 text-[10px] border"/>
                 <input type="file" accept="image/*" onChange={e=>{ const f=e.target.files?.[0]; if(f){ fileToBase64(f, b64=> setEditingBlog({...editingBlog, imageData:b64})) } }} className="w-full text-[11px]"/>
                 {editingBlog.imageData && <img src={editingBlog.imageData} className="w-full h-[120px] object-cover rounded-[10px] border"/>}
               </div>
               <div className="flex gap-3 mt-5"><button onClick={()=>{ if(!editingBlog.slug||!editingBlog.title){ alert("slug and title required"); return } const exists=blogs.find((x:any)=>x.slug===editingBlog.slug); if(exists){ setBlogs(blogs.map((x:any)=> x.slug===editingBlog.slug? editingBlog : x)) } else { setBlogs([...blogs, editingBlog]) } setEditingBlog(null) }} className="flex-1 bg-[#0A2342] text-white py-3 rounded-full font-black text-[12px]">💾 Save Blog - Fix 404 + SEO</button><button onClick={()=>setEditingBlog(null)} className="px-6 py-3 bg-[#F5F7FA] rounded-full font-bold">Cancel</button></div>
             </div>
           </div>
         )}
       </div>
     )}

     {tab==="hotels" && <div className="bg-white rounded-[20px] p-6 border"><h2 className="font-black">🏨 Hotels per CAR</h2><div className="mt-4 grid md:grid-cols-2 gap-3">{hotelOptions.map((h,i)=>(<div key={i} className="bg-[#F5F7FA] rounded-[12px] p-3 flex gap-2"><input value={h.label?? ""} onChange={e=>{ const nh=[...hotelOptions]; nh[i].label=e.target.value; setHotelOptions(nh)}} className="flex-1 bg-white rounded-full px-3 py-2 text-[11px] border"/><input type="number" value={h.price?? ""} onChange={e=>{ const nh=[...hotelOptions]; nh[i].price=parseInt(e.target.value)||0; setHotelOptions(nh)}} className="w-[70px] bg-white rounded-full px-3 py-2 text-[11px] border"/><button onClick={()=>setHotelOptions(hotelOptions.filter((_,j)=>j!==i))} className="text-red-500 text-[11px] font-bold">✕</button></div>))}<button onClick={()=>setHotelOptions([...hotelOptions, {label:"New Hotel", area:"West", price:15}])} className="mt-3 bg-[#0A2342] text-white px-4 py-2 rounded-full text-[11px] font-bold">+ Add Hotel per CAR</button></div></div>}

     {tab==="matrix" && <div className="bg-white rounded-[20px] p-6 border"><h2 className="font-black">🚚 Matrix - Per Vehicle per CAR</h2><div className="mt-4 grid grid-cols-10 gap-2 text-[10px] font-black"><div>From/To</div>{["West","Central","S-Central","South","S-East","East","N-East","North","S-West","All"].map(a=><div key={a} className="bg-[#0A2342] text-white rounded-full px-2 py-1 text-center">{a}</div>)}{Object.keys(transportMatrix).map(from=><div key={from} className="contents"><div className="bg-[#F5F7FA] rounded-full px-3 py-2 text-[11px] font-black">{from}</div>{["West","Central","South-Central","South","South-East","East","North-East","North","South-West","All"].map(to=><input key={to} type="number" value={transportMatrix[from]?.[to]??0} onChange={e=>{ const nm={...transportMatrix}; if(!nm[from]) nm[from]={}; nm[from][to]=parseInt(e.target.value)||0; setTransportMatrix(nm)}} className="w-full bg-[#F5F7FA] rounded-full px-2 py-2 text-[11px] font-bold border text-center"/>)}</div>)}</div></div>}

     {tab==="pax" && <div className="bg-white rounded-[20px] p-6 border max-w-xl"><h3 className="font-black">👥 Per CAR Rules - No extra pax fee</h3><p className="text-[11px] opacity-60 mt-2">Price is PER CAR up to 6 pax same price. No +50% for 3rd. This is your unique selling point.</p><div className="mt-4 space-y-3"><div className="bg-[#F0F6FF] rounded-[12px] p-4"><p className="text-[11px] font-black">Current: {paxRules.basePax} pax per CAR - ${paxRules.extraPaxPercent}% extra</p><p className="text-[10px] opacity-60 mt-1">Change to: Base 6 pax, extra 0% = Same price up to 6 pax</p></div><select value={paxRules.basePax?? 6} onChange={e=>setPaxRules({...paxRules, basePax:parseInt(e.target.value)})} className="w-full bg-[#F5F7FA] rounded-full px-4 py-3 text-[12px] font-bold border"><option value={6}>6 pax per CAR same price - Recommended</option><option value={4}>4 pax per CAR</option><option value={2}>2 pax per CAR (old)</option></select><select value={paxRules.extraPaxPercent?? 0} onChange={e=>setPaxRules({...paxRules, extraPaxPercent:parseInt(e.target.value)})} className="w-full bg-[#F5F7FA] rounded-full px-4 py-3 text-[12px] font-bold border"><option value={0}>0% extra - Same price up to max - Per CAR</option><option value={50}>50% per extra (old per person)</option></select><textarea value={paxRules.note?? ""} onChange={e=>setPaxRules({...paxRules, note:e.target.value})} className="w-full bg-[#F5F7FA] rounded-[12px] px-4 py-3 text-[11px] border h-[80px]"/></div></div>}

     {tab==="content" && <div className="grid md:grid-cols-2 gap-6"><div className="bg-white rounded-[20px] p-6 border"><h3 className="font-black">📝 Content + Images - Hero is now Announcements tab</h3><div className="mt-4 space-y-3"><div className="bg-[#F5F7FA] rounded-[14px] p-4 border-dashed border-2"><p className="text-[11px] font-black">Hero Image (fallback if no announcement image)</p><div className="mt-2 h-[120px] bg-white rounded-[10px] overflow-hidden border flex items-center justify-center">{siteContent.heroImageData? <img src={siteContent.heroImageData} className="w-full h-full object-cover"/> : <span className="text-[10px] opacity-50">No image</span>}</div><input type="file" accept="image/*" className="mt-3 block text-[11px]" onChange={e=>{ const f=e.target.files?.[0]; if(f) fileToBase64(f, b64=> setSiteContent({...siteContent, heroImageData:b64, heroImage:f.name})) }}/></div></div></div><div className="bg-white rounded-[20px] p-6 border"><h3 className="font-black">Texts per CAR</h3><input value={siteContent.heroTitle?? ""} onChange={e=>setSiteContent({...siteContent, heroTitle:e.target.value})} className="w-full mt-3 bg-[#F5F7FA] rounded-full px-4 py-2.5 text-[12px] border font-bold"/><input value={siteContent.heroBadge?? ""} onChange={e=>setSiteContent({...siteContent, heroBadge:e.target.value})} className="w-full mt-3 bg-[#F5F7FA] rounded-full px-4 py-2.5 text-[12px] border"/><textarea value={siteContent.aboutText?? ""} onChange={e=>setSiteContent({...siteContent, aboutText:e.target.value})} className="w-full mt-3 bg-[#F5F7FA] rounded-[12px] px-4 py-2.5 text-[11px] border h-[80px]"/></div></div>}

     {tab==="seo" && <div className="grid md:grid-cols-2 gap-6"><div className="bg-white rounded-[20px] p-6 border"><h3 className="font-black">🔍 SEO + OG Image per CAR</h3><div className="mt-4 space-y-3"><input value={seoSettings.siteTitle?? ""} onChange={e=>setSeoSettings({...seoSettings, siteTitle:e.target.value})} placeholder="Site Title per CAR" className="w-full bg-[#F5F7FA] rounded-full px-4 py-2.5 text-[12px] border font-bold"/><textarea value={seoSettings.metaDescription?? ""} onChange={e=>setSeoSettings({...seoSettings, metaDescription:e.target.value})} placeholder="Meta Description per CAR" className="w-full bg-[#F5F7FA] rounded-[12px] px-4 py-2.5 text-[11px] border h-[80px]"/><input value={seoSettings.keywords?? ""} onChange={e=>setSeoSettings({...seoSettings, keywords:e.target.value})} placeholder="Keywords per CAR" className="w-full bg-[#F5F7FA] rounded-full px-4 py-2.5 text-[11px] border"/><div className="bg-[#F5F7FA] rounded-[14px] p-4 border-dashed border-2"><p className="text-[11px] font-black">OG Image 1200x630</p><div className="mt-2 h-[160px] bg-white rounded-[10px] overflow-hidden border flex items-center justify-center">{seoSettings.ogImageData? <img src={seoSettings.ogImageData} className="w-full h-full object-cover"/> : <span className="text-[10px] opacity-50">No OG image</span>}</div><input type="file" accept="image/*" className="mt-3 block text-[11px]" onChange={e=>{ const f=e.target.files?.[0]; if(f) fileToBase64(f, b64=> setSeoSettings({...seoSettings, ogImageData:b64, ogImage:f.name})) }}/></div></div></div><div className="bg-white rounded-[20px] p-6 border"><h3 className="font-black">⭐ Google & TripAdvisor Reviews - Real widgets</h3><p className="text-[11px] opacity-60 mt-2">Paste embed codes from Elfsight / Google. These show live reviews on homepage, not fake.</p><div className="mt-4 space-y-3"><label className="text-[11px] font-bold">Google Reviews Embed Code</label><textarea value={seoSettings.googleReviewsEmbed?? ""} onChange={e=>setSeoSettings({...seoSettings, googleReviewsEmbed:e.target.value})} placeholder='<script src="https://static.elfsight.com/platform/platform.js"></script><div class="elfsight-app-..."></div>' className="w-full bg-[#F5F7FA] rounded-[12px] px-4 py-3 text-[10px] font-mono border h-[100px]"/><label className="text-[11px] font-bold">TripAdvisor Embed Code</label><textarea value={seoSettings.tripadvisorEmbed?? ""} onChange={e=>setSeoSettings({...seoSettings, tripadvisorEmbed:e.target.value})} placeholder='TripAdvisor widget code' className="w-full bg-[#F5F7FA] rounded-[12px] px-4 py-3 text-[10px] font-mono border h-[100px]"/></div></div></div>}

     {tab==="settings" && <div className="bg-white rounded-[20px] p-6 border max-w-xl"><h3 className="font-black">⚙️ Settings per CAR</h3><div className="mt-4 space-y-3"><label className="text-[11px] font-bold">WhatsApp Number (without +)</label><input value={waNumber?? ""} onChange={e=>setWaNumber(e.target.value)} className="w-full bg-[#F5F7FA] rounded-full px-4 py-3 text-[12px] font-bold border" placeholder="255773628792"/><label className="text-[11px] font-bold">Instagram</label><input value={socials.instagram?? ""} onChange={e=>setSocials({...socials, instagram:e.target.value})} className="w-full bg-[#F5F7FA] rounded-full px-4 py-3 text-[11px] border"/><label className="text-[11px] font-bold">Facebook</label><input value={socials.facebook?? ""} onChange={e=>setSocials({...socials, facebook:e.target.value})} className="w-full bg-[#F5F7FA] rounded-full px-4 py-3 text-[11px] border"/></div></div>}

     {tab==="export" && <div className="bg-white rounded-[20px] p-6 border max-w-xl"><h3 className="font-black">📤 Export Live - Per CAR + Blogs + Announcements</h3><button onClick={()=>{ const data={tours, transfers, announcements, blogs, hotelOptions, transportMatrix, waNumber, siteContent, seoSettings, paxRules, exportedAt:new Date().toISOString(), pricingModel:"PER_CAR_NOT_PER_PERSON"}; const blob=new Blob([JSON.stringify(data, null, 2)], {type:'application/json'}); const url=URL.createObjectURL(blob); const a=document.createElement('a'); a.href=url; a.download=`hero-per-car-${new Date().toISOString().slice(0,10)}.json`; a.click()}} className="mt-5 w-full bg-[#0A2342] text-white py-4 rounded-full font-black">📥 Download FULL JSON per CAR + Blogs + Announcements</button><button onClick={()=>{ if(confirm("Clear all saved? Reset to $250 per CAR defaults?")){ localStorage.removeItem("hero_tours"); localStorage.removeItem("hero_transfers"); localStorage.removeItem("hero_blogs"); localStorage.removeItem("hero_announcements"); location.reload() }}} className="mt-3 w-full bg-red-50 text-red-600 py-3 rounded-full font-bold text-[11px] border">🗑️ Clear old localStorage - Fix 404 + Reset per CAR</button><p className="text-[10px] opacity-50 mt-3">After clear, refresh homepage - new per CAR prices $25-$50 transfers, $130-$250 tours per CAR, blogs SEO, hero promos will show.</p></div>}

   </div>
 </section>
 </main>
 )
}