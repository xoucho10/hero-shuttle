"use client"
import { useState, useEffect } from "react"
import Header from '@/components/Header'
import Footer from '@/components/Footer'
const DEFAULT_BLOGS = [
  { id:"prison-island-guide", slug:"prison-island-guide", title:"Prison Island & Nakupenda: Complete Guide 2026 - Price per CAR", excerpt:"Complete guide to giant tortoises 100+ years + white sandbank best time. Price per CAR not per person - Save $100.", date:"Jan 12, 2026", cat:"Guide", imageData:"", readTime:"7 min" },
  { id:"mnemba-vs-safari-blue", slug:"mnemba-vs-safari-blue", title:"Mnemba Atoll vs Safari Blue - Which is Better?", excerpt:"Full comparison snorkeling quality, coral, dolphin chance, BBQ vs fruit. Both per CAR same price.", date:"Jan 8, 2026", cat:"Comparison", imageData:"", readTime:"8 min" },
  { id:"zanzibar-transfers", slug:"zanzibar-transfers", title:"Zanzibar Transfers: Airport to Paje, Nungwi Price per CAR 2026", excerpt:"No per person scam explained. Real per vehicle price $25-$50 local.", date:"Jan 3, 2026", cat:"Transfers", imageData:"", readTime:"6 min" },
]
export default function BlogsPage(){
  const [blogs, setBlogs] = useState(DEFAULT_BLOGS)
  useEffect(()=>{ try{ const b=localStorage.getItem("hero_blogs"); if(b){ const p=JSON.parse(b); if(p.length>0) setBlogs(p) } }catch{} },[])
  return (
    <main className="min-h-screen bg-[#F8FAFF]"><Header/>
      <section className="bg-white text-[#0A2342] px-6 md:px-12 py-10 text-center border-b"><h1 className="font-black text-[28px]">Zanzibar Guides & Tips - Per CAR</h1><p className="text-[12px] opacity-60 mt-2">All blogs editable from Admin → Blogs SEO tab</p></section>
      <section className="px-6 md:px-12 py-8"><div className="max-w-[1200px] mx-auto grid md:grid-cols-3 gap-6">
        {blogs.map(b=>(
          <div key={b.id} className="bg-white rounded-[16px] overflow-hidden border shadow-sm"><div className="h-[180px] bg-[#F0F6FF] overflow-hidden">{b.imageData? <img src={b.imageData} alt={b.title} className="w-full h-full object-cover"/> : <div className="w-full h-full flex items-center justify-center text-[10px] opacity-30">{b.slug}</div>}</div><div className="p-5"><span className="text-[9px] font-black bg-[#0A2342] text-white px-2 py-1 rounded-full">{b.cat}</span><h3 className="font-black text-[14px] mt-3 text-[#0A2342]">{b.title}</h3><p className="text-[11px] opacity-60 mt-2 line-clamp-2">{b.excerpt}</p><a href={`/blogs/${b.slug}`} className="inline-block mt-4 bg-[#0A2342] text-white px-4 py-2 rounded-full text-[11px] font-black">Read Full Guide →</a></div></div>
        ))}
      </div></section><Footer/></main>
  )
}
