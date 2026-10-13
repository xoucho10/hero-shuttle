"use client"
import { useState, useEffect } from "react"
import Header from '@/components/Header'

const ADMIN_PASSWORD = "hero2026"
const MAX_IMAGES = 3

const DEFAULT_TOURS = [
  { id:"prison-nakupenda", name:"Prison Island + Nakupenda", cat:["Popular","Half Day"], price:250, market:350, duration:"5 Hours", pickup:"Stone Town 8:30 AM", desc:"Tortoise sanctuary + sandbank + fruit • Boat, Guide, Entrance", includes:"Boat, Guide, Entrance, Fruit", area:"West", active:true, featured:true, imageDatas:[""], images:[] },
  { id:"nakupenda-only", name:"Nakupenda Sandbank Only", cat:["Half Day","Popular"], price:130, market:200, duration:"4 Hours", pickup:"Stone Town 9 AM", desc:"White sandbank in ocean, swimming • Boat, Fruit, Water", includes:"Boat, Fruit, Water", area:"West", active:true, featured:true, imageDatas:[""], images:[] },
  { id:"stone-town", name:"Stone Town Walking Tour", cat:["Popular","Half Day","Cultural"], price:120, market:180, duration:"3 Hours", pickup:"Stone Town", desc:"UNESCO, Slave Market, House of Wonders • Guide, Entrances", includes:"Guide, Entrances", area:"West", active:true, featured:true, imageDatas:[""], images:[] },
  { id:"jozani", name:"Jozani Forest Monkeys", cat:["Popular","Half Day"], price:90, market:140, duration:"2.5 Hours", pickup:"Paje / Stone Town", desc:"Red colobus monkeys only in Zanzibar • Entrance, Guide", includes:"Entrance, Guide", area:"South-Central", active:true, featured:true, imageDatas:[""], images:[] },
  { id:"mnemba", name:"Mnemba Atoll Snorkeling", cat:["Popular","Half Day","North"], price:180, market:260, duration:"4 Hours", pickup:"Matemwe 8 AM", desc:"Best coral reef, colorful fish, dolphins • Boat, Gear", includes:"Boat, Gear, Guide", area:"North-East", active:true, featured:true, imageDatas:[""], images:[] },
  { id:"safari-blue", name:"Sharing Safari Blue Full Day BBQ", cat:["Full Day","Popular","South"], price:190, market:280, duration:"8 Hours", pickup:"Fumba 8 AM", desc:"Sandbank + snorkeling + seafood BBQ • Dhow, BBQ, Drinks", includes:"Dhow, BBQ, Drinks, Gear", area:"South-West", active:true, featured:true, imageDatas:[""], images:[] },
  { id:"dhow-stone", name:"Sunset Dhow Stone Town", cat:["Popular","Half Day"], price:80, market:130, duration:"2 Hours", pickup:"Stone Town 4:30 PM", desc:"Traditional dhow sunset cruise • Dhow, Drinks", includes:"Dhow, Drinks", area:"West", active:true, featured:true, imageDatas:[""], images:[] },
  { id:"private-safari-blue", name:"Private Safari Blue Full Day BBQ", cat:["Full Day","Popular","South"], price:220, market:320, duration:"8 Hours", pickup:"8:30 AM", desc:"Sandbank + snorkeling + seafood BBQ • Private dhow", includes:"Private Dhow, BBQ, Drinks", area:"West", active:true, featured:true, imageDatas:[""], images:[] },
]

const DEFAULT_TRANSFERS = [
  { id:"airport-stone", name:"Airport → Stone Town", price:15, market:25, duration:"12-15 min", area:"West", desc:"Private vehicle for your group - Stone Town hotels", cat:["Popular"], active:true, imageDatas:[""], images:[] },
  { id:"airport-nungwi", name:"Airport → Nungwi / Kendwa", price:40, market:60, duration:"1h 15m", area:"North", desc:"Private vehicle - North beach, best sunset and swimming", cat:["Popular","North"], active:true, imageDatas:[""], images:[] },
  { id:"airport-matemwe", name:"Airport → Matemwe / Mnemba", price:40, market:60, duration:"1h 20m", area:"North-East", desc:"Private vehicle - Mnemba snorkeling area", cat:["Popular","North"], active:true, imageDatas:[""], images:[] },
  { id:"airport-pwani", name:"Airport → Pwani Mchangani", price:35, market:50, duration:"50-60 min", area:"North-East", desc:"Private vehicle - Pwani Mchangani", cat:["East"], active:true, imageDatas:[""], images:[] },
  { id:"airport-kiwengwa", name:"Airport → Kiwengwa / Pongwe", price:35, market:55, duration:"50-55 min", area:"East", desc:"Private vehicle - East coast", cat:["East"], active:true, imageDatas:[""], images:[] },
  { id:"airport-uroa", name:"Airport → Uroa / Michamvi", price:35, market:50, duration:"45-50 min", area:"East", desc:"Private vehicle - Uroa", cat:["East"], active:true, imageDatas:[""], images:[] },
  { id:"airport-paje", name:"Airport → Paje / Bwejuu", price:35, market:50, duration:"50-60 min", area:"South-East", desc:"Private vehicle - Kitesurf and beach area", cat:["Popular","South"], active:true, imageDatas:[""], images:[] },
  { id:"airport-jambiani", name:"Airport → Jambiani / Makunduchi", price:40, market:60, duration:"55-65 min", area:"South-East", desc:"Private vehicle - Jambiani", cat:["South"], active:true, imageDatas:[""], images:[] },
  { id:"airport-kizimkazi", name:"Airport → Kizimkazi / Fumba", price:40, market:60, duration:"60-70 min", area:"South", desc:"Private vehicle - Safari Blue departure", cat:["South"], active:true, imageDatas:[""], images:[] },
  { id:"airport-chuwini", name:"Airport → Chuwini / Bububu", price:25, market:35, duration:"20-25 min", area:"West", desc:"Private vehicle - Bububu beach resorts", cat:["West"], active:true, imageDatas:[""], images:[] },
]

const DEFAULT_ANNOUNCEMENTS = [
  { id:"1", badge:"🔥 POPULAR", title:"Prison Island & Nakupenda Private Tour", subtitle:"Tortoise sanctuary + white sandbank + fruit & snorkeling - Private boat and guide included", cta:"View Tours", link:"#tours", active:true, imageData:"" },
  { id:"2", badge:"⚡ FULL DAY", title:"Safari Blue - Sandbank, Snorkeling & Seafood BBQ", subtitle:"Full day from Fumba to Kwale Island - Dhow sailing, BBQ and mangrove lagoon", cta:"Build Itinerary", link:"#tours", active:true, imageData:"" },
  { id:"3", badge:"TRUSTED", title:"Licensed Local Team • Pay After Trip • Free Cancellation", subtitle:"Stone Town based team, drivers live in Nungwi, Paje and Kizimkazi - WhatsApp support 24/7", cta:"Why Choose Us", link:"#reviews", active:true, imageData:"" },
]

const DEFAULT_BLOGS = [
  { id:"prison-island-nakupenda-guide", slug:"prison-island-nakupenda-guide", title:"Prison Island & Nakupenda: Complete Guide 2026", cat:"Guide", excerpt:"Giant tortoises 100+ years + white sandbank - best time, itinerary and private boat inclusions.", content:"Full guide...", imageData:"", active:true },
  { id:"mnemba-atoll-snorkeling-guide", slug:"mnemba-atoll-snorkeling-guide", title:"Mnemba Atoll Snorkeling: Best Reef in Zanzibar", cat:"Snorkeling", excerpt:"Why Mnemba is considered the best snorkeling spot, visibility, tropical fish and private boat.", content:"Full guide...", imageData:"", active:true },
  { id:"safari-blue-full-guide", slug:"safari-blue-full-guide", title:"Safari Blue: Sandbank, Snorkeling & Seafood BBQ", cat:"Guide", excerpt:"Full day from Fumba to Kwale Island - sandbank, snorkeling, BBQ and mangrove lagoon.", content:"Full guide...", imageData:"", active:true },
]

const DEFAULT_REVIEWS = [
  { id:"1", name:"Sarah M.", country:"UK • Jan 2026", text:"Our driver Ali was waiting with name sign. Car clean, AC cold, child seat was there.", rating:5, tour:"Prison + Nakupenda", verified:true, active:true },
  { id:"2", name:"Jan L.", country:"Germany • Dec 2025", text:"We booked airport to Nungwi and Mnemba snorkeling. Transparent pricing, pay after trip.", rating:5, tour:"Airport + Mnemba", verified:true, active:true },
  { id:"3", name:"Emily R.", country:"USA • Dec 2025", text:"Stone Town tour with Hassan was amazing. He is from Stone Town, knew every alley.", rating:5, tour:"Stone Town", verified:true, active:true },
]

export default function AdminPage(){
  const [auth, setAuth] = useState(false)
  const [pass, setPass] = useState("")
  const [tab, setTab] = useState("overview")
  const [tours, setTours] = useState<any[]>(DEFAULT_TOURS)
  const [transfers, setTransfers] = useState<any[]>(DEFAULT_TRANSFERS)
  const [announcements, setAnnouncements] = useState<any[]>(DEFAULT_ANNOUNCEMENTS)
  const [blogs, setBlogs] = useState<any[]>(DEFAULT_BLOGS)
  const [reviews, setReviews] = useState<any[]>(DEFAULT_REVIEWS)
  const [settings, setSettings] = useState({ whatsapp:"255773628792", email:"info@herozanzibar.com", address:"Stone Town, Zanzibar", instagram:"", facebook:"", tiktok:"", aboutTitle:"Local Owner - 8 Years in Zanzibar", aboutText:"We are local, not agency. Stone Town team with drivers in Nungwi, Paje, Kizimkazi.", footerText:"HERO Zanzibar Tours - Private Transfers & Tours - Pay After Trip", seoTitle:"HERO Shuttle Zanzibar - Private Transfers & Tours", seoDesc:"Private Zanzibar Airport Transfers and Private Tours - Licensed local team, pay after trip." })
  const [editingTour, setEditingTour] = useState<any>(null)
  const [editingTransfer, setEditingTransfer] = useState<any>(null)
  const [editingAnn, setEditingAnn] = useState<any>(null)
  const [editingBlog, setEditingBlog] = useState<any>(null)
  const [editingReview, setEditingReview] = useState<any>(null)
  const [saving, setSaving] = useState(false)

  // COMPRESS 800px 0.6 - REQUIRED FOR 3 PICS
  const toBase64 = (file: File, cb:(b64:string)=>void)=>{
    const r=new FileReader(); r.onload=(e)=>{
      const img=new Image(); img.onload=()=>{
        const c=document.createElement('canvas'); let w=img.width,h=img.height; const max=800;
        if(w>max){ h=(max/w)*h; w=max } c.width=w; c.height=h; c.getContext('2d')!.drawImage(img,0,0,w,h); cb(c.toDataURL('image/jpeg',0.6))
      }; img.src=e.target?.result as string
    }; r.readAsDataURL(file)
  }

  const addImagesToList = (list:string[], newB64:string[])=>{
    const filtered = list.filter(Boolean)
    const merged = [...filtered,...newB64].slice(0, MAX_IMAGES)
    while(merged.length < MAX_IMAGES) merged.push("")
    // keep empty slot as "" but filter later for DB
    return merged
  }

  // TOUR IMAGES - 3 PICS ADD + DELETE
  const handleTourFiles = (tourId:string, files: FileList)=>{
    const fileArr = Array.from(files).slice(0, MAX_IMAGES)
    fileArr.forEach(file=>{
      toBase64(file, (b64)=>{
        setTours(prev=>prev.map(t=>{
          if(t.id!==tourId) return t
          const cur = (t.imageDatas||[]).filter(Boolean)
          if(cur.length >= MAX_IMAGES){ alert(`Max ${MAX_IMAGES} pictures allowed - delete one first`); return t }
          return {...t, imageDatas:[...cur, b64], images:[...cur, b64]}
        }))
      })
    })
  }
  const removeTourImage = (tourId:string, index:number)=>{
    setTours(prev=>prev.map(t=>{
      if(t.id!==tourId) return t
      const datas = [...(t.imageDatas||[])].filter(Boolean)
      datas.splice(index,1)
      return {...t, imageDatas:datas, images:datas}
    }))
  }
  const handleTourEditFiles = (files: FileList)=>{
    if(!editingTour) return
    const fileArr = Array.from(files).slice(0, MAX_IMAGES)
    fileArr.forEach(file=>{
      toBase64(file,(b64)=>{
        const cur = (editingTour.imageDatas||[]).filter(Boolean)
        if(cur.length >= MAX_IMAGES){ alert(`Max ${MAX_IMAGES} pictures - delete one first`); return }
        setEditingTour({...editingTour, imageDatas:[...cur, b64], images:[...cur, b64]})
      })
    })
  }
  const removeTourEditImage = (index:number)=>{
    const datas=[...(editingTour.imageDatas||[])].filter(Boolean)
    datas.splice(index,1)
    setEditingTour({...editingTour, imageDatas:datas, images:datas})
  }

  // AIRPORT-TRANSFER IMAGES - 3 PICS ADD + DELETE
  const handleTransferFiles = (transferId:string, files: FileList)=>{
    const fileArr = Array.from(files).slice(0, MAX_IMAGES)
    fileArr.forEach(file=>{
      toBase64(file,(b64)=>{
        setTransfers(prev=>prev.map(t=>{
          if(t.id!==transferId) return t
          const cur=(t.imageDatas||[]).filter(Boolean)
          if(cur.length >= MAX_IMAGES){ alert(`Max ${MAX_IMAGES} pictures allowed`); return t }
          return {...t, imageDatas:[...cur,b64], images:[...cur,b64]}
        }))
      })
    })
  }
  const removeTransferImage = (transferId:string, index:number)=>{
    setTransfers(prev=>prev.map(t=>{
      if(t.id!==transferId) return t
      const datas=[...(t.imageDatas||[])].filter(Boolean)
      datas.splice(index,1)
      return {...t, imageDatas:datas, images:datas}
    }))
  }
  const handleTransferEditFiles = (files: FileList)=>{
    if(!editingTransfer) return
    const fileArr=Array.from(files).slice(0,MAX_IMAGES)
    fileArr.forEach(file=>{
      toBase64(file,(b64)=>{
        const cur=(editingTransfer.imageDatas||[]).filter(Boolean)
        if(cur.length>=MAX_IMAGES){ alert(`Max ${MAX_IMAGES} pictures`); return }
        setEditingTransfer({...editingTransfer, imageDatas:[...cur,b64], images:[...cur,b64]})
      })
    })
  }
  const removeTransferEditImage = (index:number)=>{
    const datas=[...(editingTransfer.imageDatas||[])].filter(Boolean)
    datas.splice(index,1)
    setEditingTransfer({...editingTransfer, imageDatas:datas, images:datas})
  }

  useEffect(()=>{
    if(localStorage.getItem("hero_admin_auth")==="1") setAuth(true)
    const tryLoad=(key:string, setter:any)=>{
      try{ const v=localStorage.getItem(key); if(v){ const p=JSON.parse(v); if(Array.isArray(p)&&p.length>0||!Array.isArray(p)) setter(p) } }catch{}
    }
    tryLoad("hero_tours", setTours)
    tryLoad("hero_transfers", setTransfers)
    tryLoad("hero_announcements", setAnnouncements)
    tryLoad("hero_blogs", setBlogs)
    tryLoad("hero_reviews", setReviews)
    tryLoad("hero_settings", setSettings)

    const loadDB=async()=>{
      try{ const r=await fetch('/api/tours',{cache:'no-store'}); const d=await r.json(); if(Array.isArray(d)&&d.length>0){ const m=new Map(d.map((x:any)=>[x.id,x])); setTours(prev=>prev.map(t=>{ const db:any=m.get(t.id); if(!db) return t; return {...t, name:db.name||t.name, price:db.price??t.price, market:db.market_price??db.market??t.market, duration:db.duration||t.duration, desc:db.description||t.desc, area:db.area||t.area, imageDatas:db.image_urls?.length? db.image_urls : t.imageDatas } })) } }catch{}
      try{ const r=await fetch('/api/transfers',{cache:'no-store'}); const d=await r.json(); if(Array.isArray(d)&&d.length>0){ const m=new Map(d.map((x:any)=>[x.id,x])); setTransfers(prev=>prev.map(t=>{ const db:any=m.get(t.id); if(!db) return t; return {...t, name:db.name||t.name, price:db.price??t.price, market:db.market_price??db.market??t.market, imageDatas:db.image_urls?.length? db.image_urls : t.imageDatas } })) } }catch{}
      try{ const r=await fetch('/api/announcements',{cache:'no-store'}); const d=await r.json(); if(Array.isArray(d)&&d.length>0) setAnnouncements(d) }catch{}
      try{ const r=await fetch('/api/blogs',{cache:'no-store'}); const d=await r.json(); if(Array.isArray(d)&&d.length>0) setBlogs(d) }catch{}
      try{ const r=await fetch('/api/reviews',{cache:'no-store'}); const d=await r.json(); if(Array.isArray(d)&&d.length>0) setReviews(d) }catch{}
      try{ const r=await fetch('/api/settings',{cache:'no-store'}); const d=await r.json(); if(d&&d.whatsapp) setSettings((s:any)=>({...s,...d})) }catch{}
    }
    loadDB()
  },[])

  const saveAll=async()=>{
    setSaving(true)
    try{
      localStorage.setItem("hero_tours", JSON.stringify(tours))
      localStorage.setItem("hero_transfers", JSON.stringify(transfers))
      localStorage.setItem("hero_announcements", JSON.stringify(announcements))
      localStorage.setItem("hero_blogs", JSON.stringify(blogs))
      localStorage.setItem("hero_reviews", JSON.stringify(reviews))
      localStorage.setItem("hero_settings", JSON.stringify(settings))

      await Promise.all([
        fetch('/api/tours',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(tours.map(t=>({id:t.id,name:t.name,price:t.price,market_price:t.market,market:t.market,duration:t.duration,description:t.desc,area:t.area,cat:t.cat,featured:t.featured,image_urls:(t.imageDatas||[]).filter(Boolean)})))}),
        fetch('/api/transfers',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(transfers.map(t=>({id:t.id,name:t.name,price:t.price,market_price:t.market,duration:t.duration,description:t.desc,area:t.area,image_urls:(t.imageDatas||[]).filter(Boolean)})))}),
        fetch('/api/announcements',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(announcements)}),
        fetch('/api/blogs',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(blogs)}),
        fetch('/api/reviews',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(reviews)}),
        fetch('/api/settings',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(settings)}),
      ])
      alert(`✅ SAVED - Tours:${tours.length} (${tours.reduce((s,t)=>s+(t.imageDatas?.filter(Boolean).length||0),0)} pics) Airport-Transfers:${transfers.length} (${transfers.reduce((s,t)=>s+(t.imageDatas?.filter(Boolean).length||0),0)} pics) - Live on /airport-transfers now!`)
    }catch(e:any){ alert("Error: "+e.message) }
    setSaving(false)
  }

  const saveOne=async(type:string, data:any)=>{
    try{
      if(type==="tour") await fetch('/api/tours',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({id:data.id,name:data.name,price:data.price,market_price:data.market,description:data.desc,duration:data.duration,area:data.area,image_urls:(data.imageDatas||[]).filter(Boolean)})})
      if(type==="transfer") await fetch('/api/transfers',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({id:data.id,name:data.name,price:data.price,market_price:data.market,description:data.desc,image_urls:(data.imageDatas||[]).filter(Boolean)})})
    }catch{}
  }

  if(!auth){
    return <main className="min-h-screen bg-[#0A2342] flex items-center justify-center px-6">
      <div className="bg-white rounded-[24px] p-8 max-w-sm w-full text-center"><p className="text-[36px]">🔐</p><h1 className="font-black text-[22px] mt-2">HERO COCKPIT - 3 PICS</h1><p className="text-[11px] opacity-60 mt-1">Add 3 pics + delete - Tours & Airport-Transfers</p><input type="password" value={pass} onChange={e=>setPass(e.target.value)} placeholder="hero2026" className="mt-6 w-full bg-[#F5F7FA] border rounded-full px-4 py-3 text-[13px] text-center"/><button onClick={()=>{ if(pass===ADMIN_PASSWORD){ localStorage.setItem("hero_admin_auth","1"); setAuth(true)} else alert("Wrong")}} className="mt-3 w-full bg-[#FF8A00] text-black py-3 rounded-full font-black">Login → Cockpit</button></div>
    </main>
  }

  const TABS=[
    {id:"overview",label:"📊 Overview"},
    {id:"hero",label:`📢 Hero ${announcements.length}`},
    {id:"transfers",label:`🚕 Airport-Transfers ${transfers.length} 📸3`},
    {id:"tours",label:`🏝️ Tours ${tours.length} 📸3`},
    {id:"blogs",label:`📝 Blogs ${blogs.length}`},
    {id:"reviews",label:`⭐ Reviews ${reviews.length}`},
    {id:"content",label:"📄 Pages"},
    {id:"settings",label:"⚙️ Settings"},
  ]

  return (
    <main className="min-h-screen bg-[#F8FAFF]">
      <Header/>
      <section className="bg-[#0A2342] text-white px-6 md:px-12 py-4 flex justify-between items-center flex-wrap gap-3">
        <div><h1 className="font-black text-[18px]">COCKPIT 3 PICS • {tours.length} Tours • {transfers.length} Airport-Transfers • {tours.reduce((s,t)=>s+(t.imageDatas?.filter(Boolean).length||0),0)+transfers.reduce((s,t)=>s+(t.imageDatas?.filter(Boolean).length||0),0)} Total Pics</h1><p className="text-[11px] opacity-60">Add up to 3 pics per item - compressed 800px 0.6 - delete anytime - Controls /airport-transfers + /tours</p></div>
        <div className="flex gap-2"><button onClick={()=>{ localStorage.clear(); location.reload()}} className="bg-white/10 px-4 py-2 rounded-full text-[11px] font-bold">Reset Local</button><button onClick={saveAll} disabled={saving} className="bg-[#FF8A00] text-black px-6 py-2.5 rounded-full font-black text-[12px] disabled:opacity-50">{saving?"Saving...":"💾 SAVE ALL 3 PICS TO DB"}</button></div>
      </section>
      <section className="bg-white border-b sticky top-0 z-30 shadow-sm px-6 md:px-12 py-2.5 flex gap-2 overflow-x-auto">
        {TABS.map(t=><button key={t.id} onClick={()=>setTab(t.id)} className={`px-4 py-2 rounded-full text-[11px] font-black border whitespace-nowrap ${tab===t.id?"bg-[#0A2342] text-white":"bg-[#F5F7FA]"}`}>{t.label}</button>)}
      </section>

      <section className="px-6 md:px-12 py-8 max-w-[1600px] mx-auto">
        {tab==="overview" && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-[18px] border"><p className="text-[10px] font-black opacity-50">AIRPORT-TRANSFERS</p><p className="font-black text-[26px]">{transfers.length}</p><p className="text-[11px] opacity-60 mt-1">{transfers.reduce((s,t)=>s+(t.imageDatas?.filter(Boolean).length||0),0)} pics / {transfers.length*3} slots</p></div>
            <div className="bg-white p-5 rounded-[18px] border"><p className="text-[10px] font-black opacity-50">TOURS</p><p className="font-black text-[26px]">{tours.length}</p><p className="text-[11px] opacity-60 mt-1">{tours.reduce((s,t)=>s+(t.imageDatas?.filter(Boolean).length||0),0)} pics / {tours.length*3} slots</p></div>
            <div className="bg-white p-5 rounded-[18px] border"><p className="text-[10px] font-black opacity-50">BLOGS / GUIDES</p><p className="font-black text-[26px]">{blogs.length}</p></div>
            <div className="bg-[#FF8A00] p-5 rounded-[18px] border"><p className="text-[10px] font-black text-black/60">WHATSAPP</p><p className="font-black text-[14px] text-black">+{settings.whatsapp}</p></div>
            <div className="md:col-span-4 bg-white p-6 rounded-[18px] border mt-2">
              <p className="font-black text-[14px]">3 PICS SYSTEM - How it works:</p>
              <div className="grid md:grid-cols-3 gap-3 mt-4 text-[12px]">
                <div className="bg-[#F8FAFF] p-3 rounded-xl border-2 border-[#FF8A00]"><b>✅ Add 3 Pics</b><br/>Click 📸 on card or in Edit modal → select up to 3 images → auto compressed 800px 0.6 → saves instantly to local + DB on Save All</div>
                <div className="bg-[#F8FAFF] p-3 rounded-xl"><b>🗑️ Delete Pics</b><br/>Card view: Del 1/2/3 buttons under image. Edit modal: X on top right of each slot. Deletes instantly, then Save All to DB to remove from live site.</div>
                <div className="bg-[#F8FAFF] p-3 rounded-xl"><b>/airport-transfers + /tours</b><br/>Both pages read local first (so pics show instantly) then DB. Max 3 per item = fast load on mobile. Total {tours.length+transfers.length} items x 3 = {(tours.length+transfers.length)*3} slots.</div>
              </div>
            </div>
          </div>
        )}

        {tab==="transfers" && (
          <div>
            <div className="bg-white p-4 rounded-xl border flex justify-between items-center flex-wrap gap-3"><h2 className="font-black">Airport-Transfers - 3 Pics Each - Add/Delete - Controls /airport-transfers</h2><button onClick={()=>setEditingTransfer({id:"",name:"",price:30,market:50,duration:"",area:"",desc:"",cat:["Popular"],active:true,imageDatas:[],images:[]})} className="bg-[#0A2342] text-white px-4 py-2 rounded-full text-[11px] font-bold">+ Add Airport-Transfer 3 pics</button></div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mt-5">
              {transfers.map(t=>{
                const pics = (t.imageDatas||[]).filter(Boolean)
                return (
                <div key={t.id} className="bg-white rounded-[18px] border-2 overflow-hidden">
                  <div className="h-[160px] bg-[#F5F7FA] relative">
                    {pics[0]? <img src={pics[0]} className="w-full h-full object-cover"/> : <div className="w-full h-full bg-gradient-to-br from-[#0A2342] to-[#2a5a8a] flex items-center justify-center text-white text-[11px]">No pic - Add 3</div>}
                    <span className="absolute top-2 left-2 bg-black/70 text-white text-[9px] px-2 py-1 rounded-full font-black">{t.area}</span>
                    <span className="absolute top-2 right-2 bg-green-600 text-white text-[9px] px-2 py-1 rounded-full font-black">${t.price}</span>
                    {pics.length>0 && <div className="absolute bottom-2 left-2 flex gap-1">{pics.map((img:string,i:number)=><div key={i} className="w-[32px] h-[24px] rounded-[6px] border-2 border-white overflow-hidden bg-white"><img src={img} className="w-full h-full object-cover"/></div>)}<span className="bg-black/70 text-white text-[9px] px-2 py-1 rounded-full self-center">{pics.length}/3</span></div>}
                  </div>
                  <div className="p-4">
                    <p className="font-black text-[13px]">{t.name}</p><p className="text-[11px] opacity-60 mt-1 line-clamp-2">{t.desc}</p>
                    <div className="mt-3 flex gap-2"><p className="text-[11px] font-black text-red-600 line-through">${t.market}</p><p className="font-black text-[20px] text-green-600">${t.price}</p></div>
                    {/* 3 PICS ADD + DELETE CONTROLS */}
                    <div className="flex gap-2 mt-3">
                      <button onClick={()=>setEditingTransfer(t)} className="flex-1 bg-[#0A2342] text-white py-2 rounded-full text-[11px] font-black">✏️ Edit 3 pics</button>
                      <label className={`px-3 py-2 rounded-full text-[11px] font-bold border cursor-pointer ${pics.length>=3? "bg-gray-100 opacity-50" : "bg-[#FFFBF5]"}`}>📸x3<input type="file" accept="image/*" multiple className="hidden" disabled={pics.length>=3} onChange={e=>{ if(e.target.files) handleTransferFiles(t.id, e.target.files)}}/></label>
                    </div>
                    {pics.length>0 && (
                      <div className="flex gap-1 mt-2 flex-wrap">
                        {pics.map((_:string, idx:number)=><button key={idx} onClick={()=>removeTransferImage(t.id, idx)} className="text-[9px] bg-red-50 text-red-600 px-2 py-1 rounded-full border border-red-100">Del {idx+1} ✕</button>)}
                      </div>
                    )}
                  </div>
                </div>
                )
              })}
            </div>
          </div>
        )}

        {tab==="tours" && (
          <div>
            <div className="bg-white p-4 rounded-xl border flex justify-between items-center flex-wrap gap-3"><h2 className="font-black">Tours - 3 Pics Each - Add/Delete - Controls /tours + Home</h2><button onClick={()=>setEditingTour({id:"",name:"",cat:["Popular"],price:100,market:150,duration:"3 Hours",pickup:"",desc:"",includes:"",area:"West",active:true,featured:true,imageDatas:[],images:[]})} className="bg-[#0A2342] text-white px-4 py-2 rounded-full text-[11px] font-bold">+ Add Tour 3 pics</button></div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mt-5">
              {tours.map(t=>{
                const pics=(t.imageDatas||[]).filter(Boolean)
                return (
                <div key={t.id} className="bg-white rounded-[18px] border-2 overflow-hidden">
                  <div className="h-[180px] bg-[#F5F7FA] relative">
                    {pics[0]? <img src={pics[0]} className="w-full h-full object-cover"/> : <div className="w-full h-full bg-gradient-to-br from-[#1eb3a5] to-[#0A2342] flex items-center justify-center text-white text-[11px]">No pic - Add 3</div>}
                    <span className="absolute top-2 left-2 bg-[#0A2342] text-white text-[9px] px-2 py-1 rounded-full font-black">{t.cat?.[0]}</span>
                    <span className="absolute bottom-2 left-2 bg-white text-black text-[9px] px-2 py-1 rounded-full font-bold">{t.area}</span>
                    {pics.length>0 && <div className="absolute bottom-2 right-2 flex gap-1">{pics.slice(0,3).map((img:string,i:number)=><div key={i} className="w-[28px] h-[20px] rounded-[4px] border border-white overflow-hidden bg-white"><img src={img} className="w-full h-full object-cover"/></div>)}</div>}
                  </div>
                  <div className="p-4"><p className="font-black text-[13px]">{t.name}</p><p className="text-[11px] opacity-60 mt-1 line-clamp-2">{t.desc}</p><div className="mt-3"><p className="text-[12px] font-black text-[#DC2626] line-through decoration-2">${t.market}</p><p className="font-black text-[22px] text-[#16A34A]">${t.price}</p></div>
                    <div className="flex gap-2 mt-3">
                      <button onClick={()=>setEditingTour(t)} className="flex-1 bg-[#0A2342] text-white py-2 rounded-full text-[11px] font-black">✏️ Edit 3 pics</button>
                      <label className={`px-3 py-2 rounded-full text-[11px] font-bold border cursor-pointer ${pics.length>=3? "bg-gray-100 opacity-50" : "bg-[#FFFBF5]"}`}>📸x3<input type="file" accept="image/*" multiple className="hidden" disabled={pics.length>=3} onChange={e=>{ if(e.target.files) handleTourFiles(t.id, e.target.files)}}/></label>
                    </div>
                    {pics.length>0 && (
                      <div className="flex gap-1 mt-2 flex-wrap">
                        {pics.map((_:string, idx:number)=><button key={idx} onClick={()=>removeTourImage(t.id, idx)} className="text-[9px] bg-red-50 text-red-600 px-2 py-1 rounded-full border border-red-100">Del {idx+1} ✕</button>)}
                        <span className="text-[9px] bg-black/5 px-2 py-1 rounded-full">{pics.length}/3</span>
                      </div>
                    )}
                  </div>
                </div>
                )
              })}
            </div>
          </div>
        )}

        {tab==="hero" && (
          <div className="space-y-4">
            <div className="flex justify-between bg-white p-4 rounded-xl border"><h2 className="font-black">Hero Slider - Home Top</h2><button onClick={()=>setEditingAnn({id:Date.now().toString(),badge:"🔥 NEW",title:"",subtitle:"",cta:"View Tours",link:"#tours",active:true,imageData:""})} className="bg-[#0A2342] text-white px-4 py-2 rounded-full text-[11px] font-bold">+ Add Slide</button></div>
            <div className="grid md:grid-cols-3 gap-4">
              {announcements.map(a=>(
                <div key={a.id} className="bg-white rounded-xl border overflow-hidden">
                  <div className="h-[140px] bg-[#F5F7FA]">{a.imageData? <img src={a.imageData} className="w-full h-full object-cover"/> : <div className="w-full h-full flex items-center justify-center text-[11px] opacity-40">No image</div>}</div>
                  <div className="p-4"><span className="bg-[#0A2342] text-white text-[9px] px-2 py-1 rounded-full font-black">{a.badge}</span><p className="font-black text-[13px] mt-2">{a.title}</p><p className="text-[11px] opacity-60 mt-1">{a.subtitle}</p><div className="flex gap-2 mt-3"><button onClick={()=>setEditingAnn(a)} className="flex-1 bg-[#F5F7FA] py-2 rounded-full text-[11px] font-bold">Edit</button><button onClick={()=>setAnnouncements(prev=>prev.filter(x=>x.id!==a.id))} className="px-3 py-2 bg-red-50 text-red-600 rounded-full text-[11px] font-bold">Del</button></div></div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab==="blogs" && (
          <div>
            <div className="bg-white p-4 rounded-xl border flex justify-between"><h2 className="font-black">Blogs / Guides</h2><button onClick={()=>setEditingBlog({id:"",slug:"",title:"",cat:"Guide",excerpt:"",content:"",imageData:"",active:true})} className="bg-[#0A2342] text-white px-4 py-2 rounded-full text-[11px] font-bold">+ Add Blog</button></div>
            <div className="grid md:grid-cols-3 gap-4 mt-5">
              {blogs.map(b=>(
                <div key={b.id} className="bg-white p-5 rounded-xl border"><span className="bg-[#0A2342] text-white text-[9px] px-2 py-1 rounded-full font-black">{b.cat}</span><p className="font-black text-[13px] mt-2">{b.title}</p><p className="text-[11px] opacity-60 mt-1 line-clamp-2">{b.excerpt}</p><div className="flex gap-2 mt-3"><button onClick={()=>setEditingBlog(b)} className="flex-1 bg-[#F5F7FA] py-2 rounded-full text-[11px] font-bold">Edit</button><button onClick={()=>setBlogs(prev=>prev.filter(x=>x.id!==b.id))} className="px-3 py-2 bg-red-50 text-red-600 rounded-full text-[11px] font-bold">Del</button></div></div>
              ))}
            </div>
          </div>
        )}

        {tab==="reviews" && (
          <div>
            <div className="bg-white p-4 rounded-xl border flex justify-between"><h2 className="font-black">Reviews - Home Section</h2><button onClick={()=>setEditingReview({id:Date.now().toString(),name:"",country:"",text:"",rating:5,tour:"",verified:true,active:true})} className="bg-[#0A2342] text-white px-4 py-2 rounded-full text-[11px] font-bold">+ Add Review</button></div>
            <div className="grid md:grid-cols-3 gap-4 mt-5">
              {reviews.map(r=>(
                <div key={r.id} className="bg-white p-5 rounded-xl border"><div className="flex justify-between"><p className="font-black text-[12px]">{r.name} {r.verified&&<span className="bg-green-600 text-white text-[7px] px-1 py-0.5 rounded-full">VERIFIED</span>}</p><p className="text-[12px]">{"⭐".repeat(r.rating)}</p></div><p className="text-[10px] opacity-50 mt-1">{r.country} • {r.tour}</p><p className="text-[12px] opacity-70 mt-3">"{r.text}"</p><div className="flex gap-2 mt-3"><button onClick={()=>setEditingReview(r)} className="flex-1 bg-[#F5F7FA] py-2 rounded-full text-[11px] font-bold">Edit</button><button onClick={()=>setReviews(prev=>prev.filter(x=>x.id!==r.id))} className="px-3 py-2 bg-red-50 text-red-600 rounded-full text-[11px]">Del</button></div></div>
              ))}
            </div>
          </div>
        )}

        {tab==="content" && (
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl border"><h3 className="font-black">About Page</h3><input value={settings.aboutTitle} onChange={e=>setSettings({...settings,aboutTitle:e.target.value})} placeholder="About Title" className="mt-3 w-full bg-[#F5F7FA] rounded-full px-4 py-3 text-[12px] border"/><textarea value={settings.aboutText} onChange={e=>setSettings({...settings,aboutText:e.target.value})} placeholder="About Text" className="mt-3 w-full bg-[#F5F7FA] rounded-2xl px-4 py-3 text-[12px] border h-28"/><input value={settings.footerText} onChange={e=>setSettings({...settings,footerText:e.target.value})} placeholder="Footer Text" className="mt-3 w-full bg-[#F5F7FA] rounded-full px-4 py-3 text-[12px] border"/></div>
            <div className="bg-white p-6 rounded-xl border"><h3 className="font-black">Contact + Footer</h3><input value={settings.email} onChange={e=>setSettings({...settings,email:e.target.value})} placeholder="Email" className="mt-3 w-full bg-[#F5F7FA] rounded-full px-4 py-3 text-[12px] border"/><input value={settings.address} onChange={e=>setSettings({...settings,address:e.target.value})} placeholder="Address" className="mt-3 w-full bg-[#F5F7FA] rounded-full px-4 py-3 text-[12px] border"/></div>
          </div>
        )}

        {tab==="settings" && (
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl border"><h3 className="font-black">WhatsApp & Socials</h3><input value={settings.whatsapp} onChange={e=>setSettings({...settings,whatsapp:e.target.value})} placeholder="255773628792" className="mt-3 w-full bg-[#F5F7FA] rounded-full px-4 py-3 text-[12px] font-black border-2 border-green-500"/><input value={settings.instagram} onChange={e=>setSettings({...settings,instagram:e.target.value})} placeholder="Instagram URL" className="mt-3 w-full bg-[#F5F7FA] rounded-full px-4 py-3 text-[12px] border"/><input value={settings.facebook} onChange={e=>setSettings({...settings,facebook:e.target.value})} placeholder="Facebook URL" className="mt-3 w-full bg-[#F5F7FA] rounded-full px-4 py-3 text-[12px] border"/><input value={settings.tiktok} onChange={e=>setSettings({...settings,tiktok:e.target.value})} placeholder="TikTok URL" className="mt-3 w-full bg-[#F5F7FA] rounded-full px-4 py-3 text-[12px] border"/></div>
            <div className="bg-white p-6 rounded-xl border"><h3 className="font-black">SEO</h3><input value={settings.seoTitle} onChange={e=>setSettings({...settings,seoTitle:e.target.value})} placeholder="Site Title" className="mt-3 w-full bg-[#F5F7FA] rounded-full px-4 py-3 text-[12px] border"/><textarea value={settings.seoDesc} onChange={e=>setSettings({...settings,seoDesc:e.target.value})} placeholder="Meta Description" className="mt-3 w-full bg-[#F5F7FA] rounded-2xl px-4 py-3 text-[12px] border h-24"/></div>
          </div>
        )}
      </section>

      {/* TOUR EDIT MODAL - 3 PICS WITH DELETE */}
      {editingTour && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"><div className="bg-white rounded-[24px] p-6 max-w-2xl w-full max-h-[95vh] overflow-y-auto">
          <h3 className="font-black text-[16px]">Edit Tour - 3 Pics - Add/Delete - { (editingTour.imageDatas||[]).filter(Boolean).length }/3</h3>
          <div className="mt-4 grid grid-cols-3 gap-3">
            {[0,1,2].map(i=>{
              const img = (editingTour.imageDatas||[]).filter(Boolean)[i]
              return (
                <div key={i} className="h-[130px] bg-[#F5F7FA] rounded-xl border-2 overflow-hidden flex items-center justify-center relative">
                  {img? <><img src={img} className="w-full h-full object-cover"/><button onClick={()=>removeTourEditImage(i)} className="absolute top-1 right-1 bg-red-600 text-white w-6 h-6 rounded-full text-[12px] font-black shadow">✕</button><span className="absolute bottom-1 left-1 bg-black/70 text-white text-[9px] px-2 py-0.5 rounded-full">Pic {i+1}</span></> : <div className="text-center"><p className="text-[10px] opacity-40">Slot {i+1}</p><p className="text-[9px] opacity-30 mt-1">Empty</p></div>}
                </div>
              )
            })}
          </div>
          <div className="mt-3 flex gap-2">
            <label className={`flex-1 text-center py-3 rounded-full font-black text-[12px] border-2 cursor-pointer ${(editingTour.imageDatas||[]).filter(Boolean).length>=3? "bg-gray-100 opacity-40" : "bg-[#FF8A00] text-black border-[#FF8A00]"}`}>📸 Add Pictures ({MAX_IMAGES - (editingTour.imageDatas||[]).filter(Boolean).length} slots left)<input type="file" accept="image/*" multiple className="hidden" disabled={(editingTour.imageDatas||[]).filter(Boolean).length>=3} onChange={e=>{ if(e.target.files) handleTourEditFiles(e.target.files)}}/></label>
          </div>
          <p className="text-[10px] opacity-50 mt-2">Compressed 800px JPEG 0.6 - Max 3 pics - Click ✕ to delete</p>
          <div className="mt-4 grid md:grid-cols-2 gap-3"><input value={editingTour.id} onChange={e=>setEditingTour({...editingTour,id:e.target.value.toLowerCase().replace(/[^a-z0-9-]/g,'-')})} placeholder="ID" className="bg-[#F5F7FA] rounded-full px-4 py-3 text-[12px] border"/><input value={editingTour.name} onChange={e=>setEditingTour({...editingTour,name:e.target.value})} placeholder="Name" className="bg-[#F5F7FA] rounded-full px-4 py-3 text-[12px] font-bold border"/><input type="number" value={editingTour.price} onChange={e=>setEditingTour({...editingTour,price:parseInt(e.target.value)||0})} placeholder="Price" className="bg-[#F5F7FA] rounded-full px-4 py-3 text-[12px] font-black border-2 border-green-500"/><input type="number" value={editingTour.market} onChange={e=>setEditingTour({...editingTour,market:parseInt(e.target.value)||0})} placeholder="Market" className="bg-[#F5F7FA] rounded-full px-4 py-3 text-[12px] font-black border-2 border-red-500"/><input value={editingTour.desc} onChange={e=>setEditingTour({...editingTour,desc:e.target.value})} placeholder="Desc" className="md:col-span-2 bg-[#F5F7FA] rounded-full px-4 py-3 text-[12px] border"/><input value={editingTour.duration} onChange={e=>setEditingTour({...editingTour,duration:e.target.value})} placeholder="Duration" className="bg-[#F5F7FA] rounded-full px-4 py-3 text-[12px] border"/><input value={editingTour.area} onChange={e=>setEditingTour({...editingTour,area:e.target.value})} placeholder="Area" className="bg-[#F5F7FA] rounded-full px-4 py-3 text-[12px] border"/></div>
          <div className="flex gap-2 mt-5"><button onClick={()=>{ if(tours.find(t=>t.id===editingTour.id)) setTours(prev=>prev.map(t=>t.id===editingTour.id? editingTour:t)); else setTours(prev=>[...prev,editingTour]); saveOne("tour",editingTour); setEditingTour(null)}} className="flex-1 bg-[#0A2342] text-white py-3 rounded-full font-black text-[12px]">💾 Save { (editingTour.imageDatas||[]).filter(Boolean).length } Pics to DB</button><button onClick={()=>setEditingTour(null)} className="px-6 py-3 bg-[#F5F7FA] rounded-full font-bold text-[12px]">Cancel</button></div>
        </div></div>
      )}

      {/* AIRPORT-TRANSFER EDIT MODAL - 3 PICS WITH DELETE */}
      {editingTransfer && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"><div className="bg-white rounded-[24px] p-6 max-w-xl w-full max-h-[95vh] overflow-y-auto">
          <h3 className="font-black">Edit Airport-Transfer - 3 Pics - { (editingTransfer.imageDatas||[]).filter(Boolean).length }/3 - Shows on /airport-transfers</h3>
          <div className="mt-4 grid grid-cols-3 gap-3">
            {[0,1,2].map(i=>{
              const img=(editingTransfer.imageDatas||[]).filter(Boolean)[i]
              return <div key={i} className="h-[110px] bg-[#F5F7FA] rounded-xl border-2 overflow-hidden flex items-center justify-center relative">{img? <><img src={img} className="w-full h-full object-cover"/><button onClick={()=>removeTransferEditImage(i)} className="absolute top-1 right-1 bg-red-600 text-white w-6 h-6 rounded-full text-[12px] font-black">✕</button><span className="absolute bottom-1 left-1 bg-black/70 text-white text-[9px] px-2 py-0.5 rounded-full">Pic {i+1}</span></> : <span className="text-[10px] opacity-40">Slot {i+1}</span>}</div>
            })}
          </div>
          <label className={`mt-3 block text-center py-3 rounded-full font-black text-[12px] border-2 cursor-pointer ${(editingTransfer.imageDatas||[]).filter(Boolean).length>=3? "bg-gray-100 opacity-40" : "bg-[#FF8A00] text-black border-[#FF8A00]"}`}>📸 Add Pictures ({MAX_IMAGES - (editingTransfer.imageDatas||[]).filter(Boolean).length} left)<input type="file" accept="image/*" multiple className="hidden" disabled={(editingTransfer.imageDatas||[]).filter(Boolean).length>=3} onChange={e=>{ if(e.target.files) handleTransferEditFiles(e.target.files)}}/></label>
          <div className="mt-4 grid gap-3"><input value={editingTransfer.id} onChange={e=>setEditingTransfer({...editingTransfer,id:e.target.value})} placeholder="ID airport-stone" className="bg-[#F5F7FA] rounded-full px-4 py-3 text-[12px] border"/><input value={editingTransfer.name} onChange={e=>setEditingTransfer({...editingTransfer,name:e.target.value})} placeholder="Name Airport → X" className="bg-[#F5F7FA] rounded-full px-4 py-3 text-[12px] font-bold border"/><div className="grid grid-cols-2 gap-3"><input type="number" value={editingTransfer.price} onChange={e=>setEditingTransfer({...editingTransfer,price:parseInt(e.target.value)||0})} placeholder="Price" className="bg-[#F5F7FA] rounded-full px-4 py-3 text-[12px] font-black border-2 border-green-500"/><input type="number" value={editingTransfer.market} onChange={e=>setEditingTransfer({...editingTransfer,market:parseInt(e.target.value)||0})} placeholder="Market" className="bg-[#F5F7FA] rounded-full px-4 py-3 text-[12px] font-black border-2 border-red-500"/></div><input value={editingTransfer.desc} onChange={e=>setEditingTransfer({...editingTransfer,desc:e.target.value})} placeholder="Desc" className="bg-[#F5F7FA] rounded-full px-4 py-3 text-[12px] border"/><input value={editingTransfer.area} onChange={e=>setEditingTransfer({...editingTransfer,area:e.target.value})} placeholder="Area" className="bg-[#F5F7FA] rounded-full px-4 py-3 text-[12px] border"/></div>
          <div className="flex gap-2 mt-5"><button onClick={()=>{ if(transfers.find(t=>t.id===editingTransfer.id)) setTransfers(prev=>prev.map(t=>t.id===editingTransfer.id? editingTransfer:t)); else setTransfers(prev=>[...prev,editingTransfer]); saveOne("transfer",editingTransfer); setEditingTransfer(null)}} className="flex-1 bg-[#0A2342] text-white py-3 rounded-full font-black text-[12px]">💾 Save { (editingTransfer.imageDatas||[]).filter(Boolean).length } Pics to /airport-transfers DB</button><button onClick={()=>setEditingTransfer(null)} className="px-6 py-3 bg-[#F5F7FA] rounded-full font-bold text-[12px]">Cancel</button></div>
        </div></div>
      )}

      {editingAnn && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"><div className="bg-white rounded-[24px] p-6 max-w-lg w-full">
          <h3 className="font-black">Edit Hero Slide</h3><div className="mt-4 grid gap-3"><input value={editingAnn.badge} onChange={e=>setEditingAnn({...editingAnn,badge:e.target.value})} placeholder="Badge" className="bg-[#F5F7FA] rounded-full px-4 py-3 text-[12px] border"/><input value={editingAnn.title} onChange={e=>setEditingAnn({...editingAnn,title:e.target.value})} placeholder="Title" className="bg-[#F5F7FA] rounded-full px-4 py-3 text-[12px] font-bold border"/><input value={editingAnn.subtitle} onChange={e=>setEditingAnn({...editingAnn,subtitle:e.target.value})} placeholder="Subtitle" className="bg-[#F5F7FA] rounded-full px-4 py-3 text-[12px] border"/><div className="grid grid-cols-2 gap-3"><input value={editingAnn.cta} onChange={e=>setEditingAnn({...editingAnn,cta:e.target.value})} placeholder="CTA" className="bg-[#F5F7FA] rounded-full px-4 py-3 text-[12px] border"/><input value={editingAnn.link} onChange={e=>setEditingAnn({...editingAnn,link:e.target.value})} placeholder="Link" className="bg-[#F5F7FA] rounded-full px-4 py-3 text-[12px] border"/></div><input type="file" accept="image/*" className="text-[11px]" onChange={e=>{ const f=e.target.files?.[0]; if(!f) return; toBase64(f,b64=>setEditingAnn({...editingAnn,imageData:b64}))}}/><div className="h-[120px] bg-[#F5F7FA] rounded-xl overflow-hidden">{editingAnn.imageData&&<img src={editingAnn.imageData} className="w-full h-full object-cover"/>}</div></div><div className="flex gap-2 mt-5"><button onClick={()=>{ if(announcements.find(a=>a.id===editingAnn.id)) setAnnouncements(prev=>prev.map(a=>a.id===editingAnn.id? editingAnn:a)); else setAnnouncements(prev=>[...prev,editingAnn]); setEditingAnn(null)}} className="flex-1 bg-[#0A2342] text-white py-3 rounded-full font-black text-[12px]">Save Slide</button><button onClick={()=>setEditingAnn(null)} className="px-6 py-3 bg-[#F5F7FA] rounded-full font-bold">Cancel</button></div>
        </div></div>
      )}
      {editingBlog && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"><div className="bg-white rounded-[24px] p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto">
          <h3 className="font-black">Edit Blog</h3><div className="mt-4 grid gap-3"><input value={editingBlog.slug} onChange={e=>setEditingBlog({...editingBlog,slug:e.target.value.toLowerCase().replace(/[^a-z0-9-]/g,'-'),id:e.target.value})} placeholder="slug" className="bg-[#F5F7FA] rounded-full px-4 py-3 text-[12px] border"/><input value={editingBlog.title} onChange={e=>setEditingBlog({...editingBlog,title:e.target.value})} placeholder="Title" className="bg-[#F5F7FA] rounded-full px-4 py-3 text-[12px] font-bold border"/><input value={editingBlog.cat} onChange={e=>setEditingBlog({...editingBlog,cat:e.target.value})} placeholder="Category" className="bg-[#F5F7FA] rounded-full px-4 py-3 text-[12px] border"/><input value={editingBlog.excerpt} onChange={e=>setEditingBlog({...editingBlog,excerpt:e.target.value})} placeholder="Excerpt" className="bg-[#F5F7FA] rounded-full px-4 py-3 text-[12px] border"/><textarea value={editingBlog.content} onChange={e=>setEditingBlog({...editingBlog,content:e.target.value})} placeholder="Full content" className="bg-[#F5F7FA] rounded-2xl px-4 py-3 text-[12px] border h-32"/><input type="file" accept="image/*" className="text-[11px]" onChange={e=>{ const f=e.target.files?.[0]; if(!f) return; toBase64(f,b64=>setEditingBlog({...editingBlog,imageData:b64}))}}/></div><div className="flex gap-2 mt-5"><button onClick={()=>{ if(blogs.find(b=>b.id===editingBlog.id)) setBlogs(prev=>prev.map(b=>b.id===editingBlog.id? editingBlog:b)); else setBlogs(prev=>[...prev,editingBlog]); setEditingBlog(null)}} className="flex-1 bg-[#0A2342] text-white py-3 rounded-full font-black">Save Blog</button><button onClick={()=>setEditingBlog(null)} className="px-6 py-3 bg-[#F5F7FA] rounded-full font-bold">Cancel</button></div>
        </div></div>
      )}
      {editingReview && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"><div className="bg-white rounded-[24px] p-6 max-w-lg w-full">
          <h3 className="font-black">Edit Review</h3><div className="mt-4 grid gap-3"><input value={editingReview.name} onChange={e=>setEditingReview({...editingReview,name:e.target.value})} placeholder="Name" className="bg-[#F5F7FA] rounded-full px-4 py-3 text-[12px] border"/><input value={editingReview.country} onChange={e=>setEditingReview({...editingReview,country:e.target.value})} placeholder="Country" className="bg-[#F5F7FA] rounded-full px-4 py-3 text-[12px] border"/><input value={editingReview.tour} onChange={e=>setEditingReview({...editingReview,tour:e.target.value})} placeholder="Tour" className="bg-[#F5F7FA] rounded-full px-4 py-3 text-[12px] border"/><textarea value={editingReview.text} onChange={e=>setEditingReview({...editingReview,text:e.target.value})} placeholder="Review" className="bg-[#F5F7FA] rounded-2xl px-4 py-3 text-[12px] border h-24"/><input type="number" min={1} max={5} value={editingReview.rating} onChange={e=>setEditingReview({...editingReview,rating:parseInt(e.target.value)||5})} className="bg-[#F5F7FA] rounded-full px-4 py-3 text-[12px] border"/></div><div className="flex gap-2 mt-5"><button onClick={()=>{ if(reviews.find(r=>r.id===editingReview.id)) setReviews(prev=>prev.map(r=>r.id===editingReview.id? editingReview:r)); else setReviews(prev=>[...prev,editingReview]); setEditingReview(null)}} className="flex-1 bg-[#0A2342] text-white py-3 rounded-full font-black">Save Review</button><button onClick={()=>setEditingReview(null)} className="px-6 py-3 bg-[#F5F7FA] rounded-full font-bold">Cancel</button></div>
        </div></div>
      )}
    </main>
  )
}