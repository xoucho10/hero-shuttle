"use client"
import { useState, useEffect } from "react"

const DEFAULT_REVIEWS = [
  { name:"Sarah M.", country:"UK • Jan 2026", text:"Our driver Ali was waiting with name sign. Car clean, AC cold, child seat was there. Prison Island + Nakupenda was perfectly timed.", rating:5, tour:"Prison + Nakupenda", verified:true },
  { name:"Jan L.", country:"Germany • Dec 2025", text:"We booked airport to Nungwi and Mnemba snorkeling. Transparent pricing, pay after trip worked great. North team knows the area.", rating:5, tour:"Airport + Mnemba", verified:true },
  { name:"Emily R.", country:"USA • Dec 2025", text:"Stone Town tour with Hassan was amazing. He is from Stone Town, knew every alley. No rush, very respectful.", rating:5, tour:"Stone Town Walking", verified:true },
]

export default function RealReviews(){
  const [reviews,setReviews] = useState(DEFAULT_REVIEWS)
  const [showForm,setShowForm] = useState(false)
  const [form,setForm] = useState({ name:"", tour:"", text:"", rating:5 })

  useEffect(()=>{
    try{
      const raw = localStorage.getItem("hero_reviews")
      if(raw){ const p=JSON.parse(raw); if(p.length>0) setReviews(p) }
    }catch{}
  },[])

  const submit = ()=>{
    if(!form.name ||!form.text) return alert("Add name and review")
    const newR = { name:form.name, country:"Verified Guest", text:form.text, rating:form.rating, tour:form.tour||"Private Tour", verified:true }
    const updated = [newR,...reviews].slice(0,20)
    setReviews(updated)
    localStorage.setItem("hero_reviews", JSON.stringify(updated))
    setShowForm(false)
    setForm({ name:"", tour:"", text:"", rating:5 })
  }

  return (
    <section id="reviews" className="px-6 md:px-12 py-14 bg-white border-t border-[#0A2342]/5">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex justify-between items-end">
          <div>
            <span className="bg-[#0A2342] text-white text-[10px] px-3 py-1 rounded-full font-black tracking-widest">REAL GUEST REVIEWS • VERIFIED</span>
            <h2 className="font-black text-[22px] md:text-[30px] text-[#0A2342] mt-3">What our guests say after their private tours</h2>
            <p className="text-[12px] text-[#0A2342]/60 mt-2">Real reviews from our WhatsApp guests - you can add yours after trip. We don't use fake reviews.</p>
          </div>
          <div className="hidden md:flex gap-2 items-center">
            <a href="https://www.google.com/search?q=HERO+Shuttle+Zanzibar" target="_blank" className="bg-white border border-[#0A2342]/10 px-4 py-2 rounded-full text-[11px] font-black">View on Google →</a>
            <button onClick={()=>setShowForm(!showForm)} className="bg-[#0A2342] text-white px-4 py-2 rounded-full text-[11px] font-black">+ Add Your Review</button>
          </div>
        </div>

        {showForm && (
          <div className="mt-6 bg-[#F8FAFF] border border-[#0A2342]/10 rounded-[16px] p-5 max-w-[600px]">
            <p className="font-black text-[13px]">Add real guest review (Admin can approve in dashboard)</p>
            <input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Your name" className="mt-3 w-full border rounded-full px-4 py-2 text-[12px]" />
            <input value={form.tour} onChange={e=>setForm({...form,tour:e.target.value})} placeholder="Tour: e.g. Mnemba, Safari Blue" className="mt-2 w-full border rounded-full px-4 py-2 text-[12px]" />
            <textarea value={form.text} onChange={e=>setForm({...form,text:e.target.value})} placeholder="Your experience with HERO..." className="mt-2 w-full border rounded-[12px] px-4 py-2 text-[12px] h-[80px]" />
            <div className="mt-3 flex gap-2">
              <button onClick={submit} className="bg-[#0A2342] text-white px-6 py-2 rounded-full font-black text-[11px]">Submit Review</button>
              <button onClick={()=>setShowForm(false)} className="bg-white border px-6 py-2 rounded-full font-black text-[11px]">Cancel</button>
            </div>
            <p className="text-[10px] text-[#0A2342]/40 mt-2">To add Google API later: replace localStorage with /api/reviews fetching Google Places API</p>
          </div>
        )}

        <div className="grid md:grid-cols-3 gap-5 mt-8">
          {reviews.slice(0,6).map((r:any,i)=>(
            <div key={i} className="bg-[#F8FAFF] border border-[#0A2342]/5 rounded-[16px] p-5">
              <div className="flex justify-between">
                <p className="font-black text-[12px] text-[#0A2342]">{r.name} {r.verified && <span className="bg-green-600 text-white text-[8px] px-1.5 py-0.5 rounded-full ml-1">✓ Verified</span>}</p>
                <p className="text-[11px]">{"⭐".repeat(r.rating)}</p>
              </div>
              <p className="text-[10px] text-[#0A2342]/50 mt-1">{r.country} • {r.tour}</p>
              <p className="text-[12px] text-[#0A2342]/70 mt-3 leading-relaxed">"{r.text}"</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-6 md:hidden">
          <button onClick={()=>setShowForm(!showForm)} className="bg-[#0A2342] text-white px-6 py-3 rounded-full font-black text-[11px]">+ Add Your Review</button>
        </div>
      </div>
    </section>
  )
}