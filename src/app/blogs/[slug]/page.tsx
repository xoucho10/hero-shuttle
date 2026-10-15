"use client"
import { useParams } from "next/navigation"
import { useState, useEffect, useMemo } from "react"
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const BLOG_IMAGES: Record<string,string> = {
  "prison-island-nakupenda-guide": "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80&auto=format&fit=crop",
  "stone-town-walking-guide": "https://images.unsplash.com/photo-1516026672322-bc52d61a55e5?w=800&q=80&auto=format&fit=crop",
  "mnemba-atoll-snorkeling-guide": "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=800&q=80&auto=format&fit=crop",
  "safari-blue-full-guide": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80&auto=format&fit=crop",
  "spice-farm-tour-guide": "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=800&q=80&auto=format&fit=crop",
  "jozani-forest-guide": "https://images.unsplash.com/photo-1504006833117-8886a355efbf?w=800&q=80&auto=format&fit=crop",
  "salaam-cave-turtles": "https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f?w=800&q=80&auto=format&fit=crop",
  "kuza-cave-guide": "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?w=800&q=80&auto=format&fit=crop",
  "nungwi-kendwa-beach-guide": "https://images.unsplash.com/photo-1519046904884-53103b34f59d?w=800&q=80&auto=format&fit=crop",
  "sunset-dhow-cruise-stone-town": "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=800&q=80&auto=format&fit=crop",
  "kizimkazi-dolphin-guide": "https://images.unsplash.com/photo-1607153333879-c174d265f1d2?w=800&q=80&auto=format&fit=crop",
  "the-rock-restaurant-guide": "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80&auto=format&fit=crop",
  "chumbe-island-coral-park": "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=800&q=80&auto=format&fit=crop",
  "quad-bike-village-tour": "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800&q=80&auto=format&fit=crop",
  "paje-kite-surfing-guide": "https://images.unsplash.com/photo-1530549387789-4c1017266635?w=800&q=80&auto=format&fit=crop",
  "paje-jambiani-beach-guide": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80&auto=format&fit=crop",
  "zanzibar-airport-transfers-guide": "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&q=80&auto=format&fit=crop",
  "best-time-to-visit-zanzibar": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80&auto=format&fit=crop",
  "zanzibar-packing-list": "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800&q=80&auto=format&fit=crop",
  "zanzibar-hotel-areas-guide": "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80&auto=format&fit=crop",
  "zanzibar-3-day-itinerary": "https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?w=800&q=80&auto=format&fit=crop",
  "zanzibar-5-day-itinerary": "https://images.unsplash.com/photo-1488085061387-422e29b40080?w=800&q=80&auto=format&fit=crop",
  "zanzibar-7-day-itinerary": "https://images.unsplash.com/photo-1473181488821-2d23949a045a?w=800&q=80&auto=format&fit=crop",
  "zanzibar-honeymoon-guide": "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=800&q=80&auto=format&fit=crop",
  "zanzibar-family-guide": "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&q=80&auto=format&fit=crop",
  "zanzibar-food-guide": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80&auto=format&fit=crop",
  "mnemba-vs-safari-blue": "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=800&q=80&auto=format&fit=crop",
  "private-vs-sharing-tours": "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=80&auto=format&fit=crop",
}

const BLOGS_DATA:any = {
  "prison-island-nakupenda-guide": { title:"Prison Island & Nakupenda Sandbank: Complete Guide 2026", slug:"prison-island-nakupenda-guide", cat:"Guide", date:"Jan 15, 2026", readTime:"8 min", excerpt:"Giant tortoises over 100 years old, historic prison ruins and a pristine white sandbank.", imageData:BLOG_IMAGES["prison-island-nakupenda-guide"], content:`Prison Island is home to Aldabra giant tortoises over 100 years old. Combined with Nakupenda sandbank for swimming and fruit.` },
  "mnemba-atoll-snorkeling-guide": { title:"Mnemba Atoll Snorkeling: Best Reef in Zanzibar", slug:"mnemba-atoll-snorkeling-guide", cat:"Snorkeling", date:"Jan 13, 2026", readTime:"7 min", excerpt:"Why Mnemba is considered the best snorkeling in Zanzibar, coral gardens, tropical fish.", imageData:BLOG_IMAGES["mnemba-atoll-snorkeling-guide"], content:`Mnemba Atoll is a marine conservation area off northeast coast. Best coral preservation, 15-25m visibility, 100+ tropical fish species.` },
  "safari-blue-full-guide": { title:"Safari Blue Experience: Sandbank, Snorkeling & Seafood BBQ", slug:"safari-blue-full-guide", cat:"Guide", date:"Jan 12, 2026", readTime:"9 min", excerpt:"Full day from Fumba to Kwale Island, sandbank, snorkeling, mangrove lagoon and BBQ.", imageData:BLOG_IMAGES["safari-blue-full-guide"], content:`Safari Blue full day from Fumba: sandbank at low tide, snorkeling near Kwale, seafood BBQ on Kwale Island, mangrove lagoon.` },
  "stone-town-walking-guide": { title:"Stone Town Walking Tour: UNESCO Heritage", slug:"stone-town-walking-guide", cat:"Cultural", date:"Jan 14, 2026", readTime:"7 min", excerpt:"Discover Freddie Mercury house, Old Fort, Slave Market Cathedral and Forodhani Gardens.", imageData:BLOG_IMAGES["stone-town-walking-guide"], content:`Stone Town UNESCO World Heritage: Old Fort 1699, Freddie Mercury house, Slave Market Cathedral, Forodhani Gardens, carved doors.` },
  "zanzibar-airport-transfers-guide": { title:"Zanzibar Airport Transfers: Complete Guide to All Areas 2026", slug:"zanzibar-airport-transfers-guide", cat:"Transfers", date:"Dec 27, 2025", readTime:"7 min", excerpt:"How to get from Zanzibar Airport to Stone Town, Nungwi, Kendwa, Paje, Jambiani and Kizimkazi.", imageData:BLOG_IMAGES["zanzibar-airport-transfers-guide"], content:`Airport to hotels: Stone Town 15min, Nungwi 1h15m, Paje 1h, Kizimkazi 1h10m. Private AC vehicle, meet & greet, flight tracking, child seat free.` },
  "best-time-to-visit-zanzibar": { title:"Best Time to Visit Zanzibar: Weather, Seasons & Tours by Month", slug:"best-time-to-visit-zanzibar", cat:"Tips", date:"Dec 26, 2025", readTime:"8 min", excerpt:"Dry season June to October, best months for snorkeling, Safari Blue and Stone Town.", imageData:BLOG_IMAGES["best-time-to-visit-zanzibar"], content:`June-October best overall 26-28C, Dec-Feb hot 30-32C beach, March/April/November rains fewer tourists.` },
  "zanzibar-3-day-itinerary": { title:"Zanzibar 3 Day Itinerary: Best Tours for Short Stay", slug:"zanzibar-3-day-itinerary", cat:"Itineraries", date:"Dec 23, 2025", readTime:"6 min", excerpt:"Perfect 3 day private plan: Stone Town, Prison Island, Nakupenda, Safari Blue, Jozani and Kuza Cave.", imageData:BLOG_IMAGES["zanzibar-3-day-itinerary"], content:`Day 1 Stone Town & Islands, Day 2 Safari Blue, Day 3 Jozani, Salaam Cave, Kuza Cave.` },
  "zanzibar-5-day-itinerary": { title:"Zanzibar 5 Day Itinerary: North & South Highlights", slug:"zanzibar-5-day-itinerary", cat:"Itineraries", date:"Dec 22, 2025", readTime:"7 min", excerpt:"Balanced 5 day itinerary covering Stone Town, Mnemba, Jozani, Paje beaches and Safari Blue.", imageData:BLOG_IMAGES["zanzibar-5-day-itinerary"], content:`Day 1 Stone Town + Prison, Day 2 Mnemba + Nungwi, Day 3 Spice Farm + Jozani, Day 4 Safari Blue, Day 5 Paje beach.` },
  "zanzibar-7-day-itinerary": { title:"Zanzibar 7 Day Itinerary: Full Island Private Experience", slug:"zanzibar-7-day-itinerary", cat:"Itineraries", date:"Dec 21, 2025", readTime:"8 min", excerpt:"Complete week: culture, nature, beach and sailing.", imageData:BLOG_IMAGES["zanzibar-7-day-itinerary"], content:`Full week: culture, nature, beach and sailing - Spice Farm, Prison Island, Nakupenda, Mnemba, Safari Blue, sunset dhow.` },
}

const EXTRA_SLUGS = ["spice-farm-tour-guide","jozani-forest-guide","salaam-cave-turtles","kuza-cave-guide","nungwi-kendwa-beach-guide","sunset-dhow-cruise-stone-town","kizimkazi-dolphin-guide","the-rock-restaurant-guide","chumbe-island-coral-park","quad-bike-village-tour","paje-kite-surfing-guide","paje-jambiani-beach-guide","zanzibar-packing-list","zanzibar-hotel-areas-guide","zanzibar-honeymoon-guide","zanzibar-family-guide","zanzibar-food-guide","mnemba-vs-safari-blue","private-vs-sharing-tours"]
EXTRA_SLUGS.forEach(slug=>{
  if(!BLOGS_DATA[slug]){
    BLOGS_DATA[slug] = {
      title: slug.split("-").map(w=>w.charAt(0).toUpperCase()+w.slice(1)).join(" ") + " - Zanzibar Local Guide",
      slug, cat:"Guide", date:"Dec 2025", readTime:"6 min",
      excerpt:`Local guide for ${slug.replace(/-/g," ")}. What to expect, best time, inclusions and local tips from HERO team.`,
      imageData:BLOG_IMAGES[slug] || BLOG_IMAGES["best-time-to-visit-zanzibar"],
      content:`Guide for ${slug}. Private experience with licensed local team, private vehicle, inclusions listed.`
    }
  }
})

export default function BlogSlugPage(){
  const params = useParams()
  const slug = (params?.slug as string) || ""
  const [blog, setBlog] = useState<any>(null)
  const [loaded, setLoaded] = useState(false)
  const [related, setRelated] = useState<any[]>([])
  const [homeBlogs, setHomeBlogs] = useState<any[]>([])

  useEffect(()=>{
    let found:any = BLOGS_DATA[slug] || null
    try{
      const raw = localStorage.getItem("hero_blogs")
      if(raw){
        const all = JSON.parse(raw)
        const f = all.find((b:any)=> b.slug===slug || b.id===slug)
        if(f) found = {...found,...f, imageData: f.imageData || f.image || found?.imageData}
      }
    }catch{}
    fetch('/api/blogs',{cache:'no-store'}).then(r=>r.json()).then((data:any)=>{
      if(Array.isArray(data)){
        const db = data.find((b:any)=> (b.slug||b.id)===slug)
        if(db){
          const dbImage = db.image_urls?.[0] || db.imageData || ""
          if(found) found = {...found, imageData: dbImage || found.imageData, title: db.title||found.title, excerpt: db.excerpt||found.excerpt}
          setBlog(found)
        }
      }
    }).catch(()=>{})
    setBlog(found)
    setLoaded(true)
    const allBlogs = Object.values(BLOGS_DATA)
    if(found){
      setRelated(allBlogs.filter((b:any)=> b.cat===found.cat && b.slug!==found.slug).slice(0,3))
      setHomeBlogs(allBlogs.filter((b:any)=> ["zanzibar-airport-transfers-guide","prison-island-nakupenda-guide","mnemba-atoll-snorkeling-guide","safari-blue-full-guide","stone-town-walking-guide","best-time-to-visit-zanzibar"].includes(b.slug)).slice(0,6))
    }
  },[slug])

  if(!loaded) return <main className="min-h-screen bg-[#F8FAFF] flex items-center justify-center"><p className="font-black text-[#0A2342] animate-pulse">Loading guide...</p></main>
  if(!blog) return <main className="min-h-screen bg-[#F8FAFF]"><Header/><div className="max-w-[800px] mx-auto px-6 py-20 text-center"><h1 className="font-black text-[24px] text-[#0A2342]">Guide not found: /{slug}</h1><a href="/blogs" className="inline-block mt-6 bg-[#0A2342] text-white px-6 py-3 rounded-full font-black text-[12px]">← Back</a></div><Footer/></main>

  return (
    <main className="min-h-screen bg-white">
      <Header/>
      <section className="bg-[#F8FAFF] border-b border-[#0A2342]/5">
        <div className="max-w-[850px] mx-auto px-6 py-8">
          <a href="/blogs" className="inline-block text-[11px] font-black bg-white border border-[#0A2342]/10 px-4 py-2 rounded-full text-[#0A2342]">← All Guides</a>
          <h1 className="font-black text-[28px] md:text-[42px] leading-[1] mt-5 text-[#0A2342]">{blog.title}</h1>
          <p className="mt-4 text-[14px] text-[#0A2342]/65 leading-[1.7] max-w-[700px]">{blog.excerpt}</p>
        </div>
      </section>
      <section className="max-w-[850px] mx-auto px-6 py-8">
        <div className="h-[340px] bg-[#F0F6FF] rounded-[20px] border border-[#0A2342]/5 overflow-hidden relative">
          <img src={blog.imageData} alt={blog.title} className="w-full h-full object-cover"/>
        </div>
        <article className="mt-8">
          <div className="bg-white rounded-[16px] border border-[#0A2342]/5 p-6 md:p-8">
            <div className="text-[14px] leading-[1.9] text-[#0A2342]/80 whitespace-pre-line">{blog.content}</div>
          </div>
        </article>
        {related.length>0 && (
          <div className="mt-12">
            <h3 className="font-black text-[16px] text-[#0A2342]">Related Guides</h3>
            <div className="mt-4 grid md:grid-cols-3 gap-4">
              {related.map((r:any)=>(
                <a key={r.slug} href={`/blogs/${r.slug}`} className="bg-white border border-[#0A2342]/5 rounded-[14px] overflow-hidden hover:border-[#0A2342]/15 transition group">
                  <div className="h-[120px] overflow-hidden bg-[#F8FAFF]"><img src={r.imageData} alt={r.title} className="w-full h-full object-cover group-hover:scale-105 transition"/></div>
                  <div className="p-4"><p className="font-black text-[12px] text-[#0A2342] line-clamp-2">{r.title}</p></div>
                </a>
              ))}
            </div>
          </div>
        )}
      </section>
      <Footer/>
    </main>
  )
}