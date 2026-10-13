"use client"
import { useState, useEffect } from "react"

const HOME_BLOGS = [
  { slug:"prison-island-nakupenda-guide", cat:"Guide", title:"Prison Island & Nakupenda: Complete Guide 2026", excerpt:"Tortoises 100+ years + white sandbank - best time and private boat inclusions from Stone Town." },
  { slug:"mnemba-atoll-snorkeling-guide", cat:"Snorkeling", title:"Mnemba Atoll Snorkeling: Best Reef in Zanzibar", excerpt:"Why Mnemba is the best snorkeling spot, visibility, fish and private boat from Matemwe." },
  { slug:"safari-blue-full-guide", cat:"Guide", title:"Safari Blue: Sandbank, Snorkeling & Seafood BBQ", excerpt:"Full day from Fumba - sandbank, snorkeling, Kwale Island BBQ and mangrove lagoon." },
  { slug:"zanzibar-airport-transfers-guide", cat:"Transfers", title:"Zanzibar Airport Transfers: Guide to All Areas", excerpt:"How to get from ZNZ to Stone Town, Nungwi, Paje, Jambiani - private vehicle and meet & greet." },
  { slug:"stone-town-walking-guide", cat:"Cultural", title:"Stone Town Walking Tour: UNESCO Heritage", excerpt:"Freddie Mercury house, Old Fort, Slave Market and Forodhani with local licensed guide." },
  { slug:"best-time-to-visit-zanzibar", cat:"Tips", title:"Best Time to Visit Zanzibar: Weather by Month", excerpt:"Dry seasons, best months for Mnemba, Safari Blue and beach holidays - month by month." },
]

export default function HomeBlogs(){
  const [blogs,setBlogs] = useState(HOME_BLOGS)
  useEffect(()=>{
    try{
      const raw = localStorage.getItem("hero_blogs")
      if(raw){
        const parsed = JSON.parse(raw)
        if(parsed.length>0){
          const custom = parsed.slice(0,6).map((b:any)=>({ slug:b.slug, cat:b.cat, title:b.title, excerpt:b.excerpt||b.desc||"" }))
          setBlogs([...custom,...HOME_BLOGS].slice(0,6))
        }
      }
    }catch{}
  },[])
  return (
    <section className="px-6 md:px-12 py-14 bg-[#F8FAFF] border-t border-[#0A2342]/5">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex justify-between items-end">
          <div>
            <span className="bg-[#0A2342] text-white text-[10px] px-3 py-1 rounded-full font-black tracking-widest">ZANZIBAR GUIDES • LOCAL TIPS</span>
            <h2 className="font-black text-[22px] md:text-[30px] text-[#0A2342] mt-3 leading-tight">Zanzibar travel guides from our local team</h2>
            <p className="text-[12.5px] text-[#0A2342]/60 mt-2 max-w-[600px]">Private tour insights for tours and transfers you see on our home page - best time, what is included and local recommendations.</p>
          </div>
          <a href="/blogs" className="hidden md:inline-block bg-white border border-[#0A2342]/10 text-[#0A2342] px-5 py-2.5 rounded-full font-black text-[11px]">View All Guides →</a>
        </div>
        <div className="grid md:grid-cols-3 gap-5 mt-8">
          {blogs.map(b=>(
            <a key={b.slug} href={`/blogs/${b.slug}`} className="bg-white rounded-[16px] border border-[#0A2342]/5 p-5 hover:border-[#0A2342]/15 hover:shadow-sm transition group">
              <span className="text-[9px] font-black bg-[#F8FAFF] border border-[#0A2342]/5 px-2.5 py-1 rounded-full">{b.cat}</span>
              <h3 className="font-black text-[13.5px] text-[#0A2342] mt-3 line-clamp-2 group-hover:text-black">{b.title}</h3>
              <p className="text-[11.5px] text-[#0A2342]/60 mt-2 line-clamp-2 leading-relaxed">{b.excerpt}</p>
              <span className="inline-block mt-3 text-[11px] font-black text-[#0A2342]">Read Guide →</span>
            </a>
          ))}
        </div>
        <div className="text-center mt-8 md:hidden">
          <a href="/blogs" className="inline-block bg-[#0A2342] text-white px-6 py-3 rounded-full font-black text-[11px]">View All Zanzibar Guides →</a>
        </div>
      </div>
    </section>
  )
}