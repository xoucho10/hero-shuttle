"use client"
import { useParams } from "next/navigation"
import { useState, useEffect } from "react"
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const FALLBACK:any = {
  "prison-island-guide": {
    title:"Prison Island & Nakupenda: Complete Guide 2026 - Price per CAR",
    slug:"prison-island-guide", cat:"Guide", date:"Jan 12, 2026", readTime:"7 min",
    excerpt:"Complete guide to giant tortoises 100+ years + white sandbank best time. Price per CAR not per person - Save $100.",
    content:`Prison Island + Nakupenda #1 tour per CAR $250 up to 6 pax same price. Includes private boat, guide, entrance $4, fruit, water, snorkeling gear. Market $350 save $100. Giant tortoises 150+ years old 150kg. Nakupenda white sandbank appears at low tide best 9am-1pm. Itinerary 5 Hours: 8:30 pickup Stone Town per CAR $25, 9am boat, 9:30-11am tortoises, 11am-1:30pm sandbank. Combo Airport→Stone $25 + Tour $250 = $275 per CAR for up to 6 pax. Pay after trip. Free cancellation 24h. Local owner 8 years direct boat no middleman.`,
    imageData:"", seoTitle:"Prison Island + Nakupenda Guide 2026 - $250 per CAR", metaDescription:"Prison Island $250 per CAR up to 6 pax", keywords:"prison island nakupenda per car"
  },
  "mnemba-vs-safari-blue": {
    title:"Mnemba Atoll vs Safari Blue - Which is Better?",
    slug:"mnemba-vs-safari-blue", cat:"Comparison", date:"Jan 8, 2026", readTime:"8 min",
    excerpt:"Full comparison per CAR same price up to 6 pax.",
    content:`MNEMBA $180 per CAR 4h best coral reef visibility 20m 100+ fish dolphin 70% vs SAFARI BLUE $190 per CAR 8h sandbank + 2 snorkeling + Kwale lagoon + seafood BBQ lobster + dhow. Mnemba wins snorkeling 9/10, Safari Blue wins full day food. Best do both Day1 Mnemba Day2 Safari Blue $370 per CAR for up to 6 pax vs agencies $960.`,
    imageData:"", seoTitle:"Mnemba vs Safari Blue per CAR", metaDescription:"Mnemba vs Safari Blue per CAR", keywords:"mnemba vs safari blue"
  },
  "zanzibar-transfers": {
    title:"Zanzibar Transfers: Airport to Paje, Nungwi Price per CAR 2026",
    slug:"zanzibar-transfers", cat:"Transfers", date:"Jan 3, 2026", readTime:"6 min",
    excerpt:"No per person scam explained. Real per vehicle price $25-$50 local.",
    content:`Transfers per CAR not per person. SCAM: $60 per person x4=$240 OUR PRICE $40 per CAR up to 6 pax same price Save $200. Matrix: Airport→Stone $25 15min, Airport→Nungwi $40 1h15m 60km, Airport→Paje $40 1h, Airport→Matemwe $40 1h20m, Paje→Nungwi $50. Per vehicle Alphard driver+fuel luggage included pay after trip free cancellation.`,
    imageData:"", seoTitle:"Zanzibar Transfers $25-$50 per CAR", metaDescription:"Transfers per CAR", keywords:"zanzibar transfer per car"
  }
}

export default function BlogSlugPage(){
  const params = useParams()
  const slug = (params?.slug as string) || ""
  const [blog, setBlog] = useState<any>(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(()=>{
    let found:any = null
    try{
      const raw = localStorage.getItem("hero_blogs")
      if(raw){
        const all = JSON.parse(raw)
        found = all.find((b:any)=> b.slug===slug || b.id===slug)
      }
    }catch{}
    if(!found) found = FALLBACK[slug]
    setBlog(found || null)
    setLoaded(true)
  },[slug])

  if(!loaded) return <main className="min-h-screen bg-[#F8FAFF] flex items-center justify-center"><p className="font-black text-[#0A2342]">Loading {slug}...</p></main>
  if(!blog) return (
    <main className="min-h-screen bg-[#F8FAFF]">
      <Header/>
      <div className="max-w-[800px] mx-auto px-6 py-20 text-center">
        <h1 className="font-black text-[24px] text-[#0A2342]">Blog not found: /{slug}</h1>
        <p className="text-[12px] mt-2 opacity-60">Go to Admin → Blogs SEO tab → create blog with slug = {slug} → Save All → Refresh</p>
        <a href="/blogs" className="inline-block mt-6 bg-[#0A2342] text-white px-6 py-3 rounded-full font-black text-[12px]">← Back to Blogs</a>
      </div>
      <Footer/>
    </main>
  )

  return (
    <main className="min-h-screen bg-white">
      <Header/>
      <section className="max-w-[800px] mx-auto px-6 py-8">
        <a href="/blogs" className="inline-block text-[11px] font-black bg-[#F0F6FF] px-3 py-1.5 rounded-full text-[#0A2342]">← Back to Blogs</a>
        <div className="mt-6 flex gap-2 items-center"><span className="bg-[#0A2342] text-white text-[10px] font-black px-3 py-1 rounded-full">{blog.cat}</span><span className="text-[11px] opacity-50">{blog.date} • {blog.readTime}</span></div>
        <h1 className="font-black text-[28px] md:text-[36px] leading-tight mt-4 text-[#0A2342]">{blog.title}</h1>
        <p className="mt-3 text-[13px] text-[#0A2342]/60">{blog.excerpt}</p>
        <div className="mt-6 h-[300px] bg-[#F0F6FF] rounded-[16px] border overflow-hidden flex items-center justify-center">{blog.imageData? <img src={blog.imageData} className="w-full h-full object-cover"/> : <span className="text-[11px] opacity-40">Upload image in Admin → Blogs</span>}</div>
        <article className="mt-8 text-[14px] leading-[1.9] text-[#0A2342]/80 whitespace-pre-line">{blog.content}</article>
        <div className="mt-10 p-5 bg-[#F8FAFF] rounded-[16px] border"><p className="font-black text-[13px] text-[#0A2342]">Book per CAR - up to 6 pax same price</p><a href={`https://wa.me/255773628792?text=Hi HERO! Read blog ${slug}`} target="_blank" className="inline-block mt-3 bg-[#0A2342] text-white px-6 py-3 rounded-full font-black text-[12px]">Book on WhatsApp per CAR</a></div>
      </section>
      <Footer/>
    </main>
  )
}