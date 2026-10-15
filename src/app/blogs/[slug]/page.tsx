"use client"
import { useParams } from "next/navigation"
import { useState, useEffect, useMemo } from "react"
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const BLOG_IMAGES: Record<string,string> = {
  "prison-island-nakupenda-guide": "https://images.unsplash.com/photo-1573551089778-46a7abc39d9f?w=800&q=80",
  "stone-town-walking-guide": "https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?w=800&q=80",
  "mnemba-atoll-snorkeling-guide": "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",
  "safari-blue-full-guide": "https://images.unsplash.com/photo-1500930540495-e92875696a16?w=800&q=80",
  "spice-farm-tour-guide": "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=800&q=80",
  "jozani-forest-guide": "https://images.unsplash.com/photo-1540573133985-87b6da6d54a9?w=800&q=80",
  "salaam-cave-turtles": "https://images.unsplash.com/photo-1591025207163-35b43d22d68e?w=800&q=80",
  "kuza-cave-guide": "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
  "nungwi-kendwa-beach-guide": "https://images.unsplash.com/photo-1519046904884-53103b34f59d?w=800&q=80",
  "sunset-dhow-cruise-stone-town": "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=800&q=80",
  "kizimkazi-dolphin-guide": "https://images.unsplash.com/photo-1607153333879-c174d265f1d2?w=800&q=80",
  "the-rock-restaurant-guide": "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80",
  "chumbe-island-coral-park": "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=800&q=80",
  "quad-bike-village-tour": "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800&q=80",
  "paje-kite-surfing-guide": "https://images.unsplash.com/photo-1530549387789-4c1017266635?w=800&q=80",
  "paje-jambiani-beach-guide": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
  "zanzibar-airport-transfers-guide": "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&q=80",
  "best-time-to-visit-zanzibar": "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?w=800&q=80",
  "zanzibar-packing-list": "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800&q=80",
  "zanzibar-hotel-areas-guide": "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80",
  "zanzibar-3-day-itinerary": "https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?w=800&q=80",
  "zanzibar-5-day-itinerary": "https://images.unsplash.com/photo-1488085061387-422e29b40080?w=800&q=80",
  "zanzibar-7-day-itinerary": "https://images.unsplash.com/photo-1473181488821-2d23949a045a?w=800&q=80",
  "zanzibar-honeymoon-guide": "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=800&q=80",
  "zanzibar-family-guide": "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&q=80",
  "zanzibar-food-guide": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80",
  "mnemba-vs-safari-blue": "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",
  "private-vs-sharing-tours": "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=80",
}

const BLOGS_DATA:any = {
  "prison-island-nakupenda-guide": {
    title:"Prison Island & Nakupenda Sandbank: Complete Guide 2026",
    slug:"prison-island-nakupenda-guide", cat:"Guide", date:"Jan 15, 2026", readTime:"8 min",
    excerpt:"Giant tortoises over 100 years old, historic prison ruins and a pristine white sandbank in the middle of the Indian Ocean.",
    imageData:BLOG_IMAGES["prison-island-nakupenda-guide"],
    seoTitle:"Prison Island & Nakupenda Guide Zanzibar 2026 | HERO Tours",
    metaDescription:"Complete guide to Prison Island tortoises and Nakupenda sandbank in Zanzibar.",
    keywords:"Prison Island Zanzibar, Nakupenda Sandbank",
    content:`Prison Island, also known as Changuu Island, is one of the most booked private tours in Zanzibar, especially when combined with Nakupenda Sandbank.

**What you will see on Prison Island**
The island is home to Aldabra giant tortoises, some over 100 years old. Sanctuary to protect endangered species. Historic former prison built in 1893.

**Nakupenda Sandbank - why it is special**
Nakupenda in Swahili means I Love You. White sandbank that appears at low tide in the middle of the Indian Ocean. Best time is 9am to 1:30pm.

**Private tour itinerary (5 hours)**
8:30 AM pickup, 9:00 AM private boat, 9:30 AM to 11:00 AM Prison Island, 11:00 AM to 1:30 PM Nakupenda with fruit.

**Local tip**
Book early morning for calm sea and fewer boats.`
  },
  "mnemba-atoll-snorkeling-guide": {
    title:"Mnemba Atoll Snorkeling: Best Reef in Zanzibar",
    slug:"mnemba-atoll-snorkeling-guide", cat:"Snorkeling", date:"Jan 13, 2026", readTime:"7 min",
    excerpt:"Why Mnemba is considered the best snorkeling in Zanzibar, coral gardens, tropical fish, dolphin sightings.",
    imageData:BLOG_IMAGES["mnemba-atoll-snorkeling-guide"],
    seoTitle:"Mnemba Atoll Snorkeling Zanzibar - Best Reef Guide | HERO",
    metaDescription:"Mnemba Atoll snorkeling guide - best coral reef in Zanzibar.",
    keywords:"Mnemba snorkeling Zanzibar",
    content:`Mnemba Atoll is a marine conservation area off the northeast coast and is widely regarded as the best snorkeling spot.

**Why Mnemba Atoll is different**
Protected atoll with excellent coral preservation. Visibility 15 to 25 meters. 100+ species of tropical fish.

**Private boat experience from Matemwe**
Departure 8:00 AM, 20 min boat ride, 90 min snorkeling.

**Best time**
June to October and December to March offer calmest sea.`
  },
  "safari-blue-full-guide": {
    title:"Safari Blue Experience: Sandbank, Snorkeling & Seafood BBQ",
    slug:"safari-blue-full-guide", cat:"Guide", date:"Jan 12, 2026", readTime:"9 min",
    excerpt:"Full day from Fumba to Kwale Island, sandbank at low tide, snorkeling, mangrove lagoon and Swahili seafood BBQ.",
    imageData:BLOG_IMAGES["safari-blue-full-guide"],
    seoTitle:"Safari Blue Zanzibar - Full Day Guide | HERO",
    metaDescription:"Safari Blue full day tour from Fumba.",
    keywords:"Safari Blue Zanzibar",
    content:`Safari Blue is the most famous full day tour in the south-west, departing from Fumba.

**Itinerary**
8:00 AM pickup, 9:00 AM dhow, sandbank, snorkeling near Kwale, Kwale Island BBQ, mangrove lagoon, 4:00 PM return.

**Sharing vs Private dhow**
Sharing social and affordable, private fully private with flexible timing.`
  },
  "stone-town-walking-guide": {
    title:"Stone Town Walking Tour: UNESCO Heritage, Markets & History",
    slug:"stone-town-walking-guide", cat:"Cultural", date:"Jan 14, 2026", readTime:"7 min",
    excerpt:"Discover Freddie Mercury house, Old Fort, Slave Market Cathedral and Forodhani Gardens.",
    imageData:BLOG_IMAGES["stone-town-walking-guide"],
    seoTitle:"Stone Town Walking Tour Zanzibar - UNESCO Guide | HERO",
    metaDescription:"Stone Town walking tour guide - UNESCO heritage.",
    keywords:"Stone Town tour Zanzibar",
    content:`Stone Town is a UNESCO World Heritage site and cultural heart of Zanzibar.

**What you will see**
Old Fort 1699, House of Wonders, Freddie Mercury house, Slave Market Cathedral, Darajani spice market, Forodhani Gardens and carved doors.`
  },
  "zanzibar-airport-transfers-guide": {
    title:"Zanzibar Airport Transfers: Complete Guide to All Areas 2026",
    slug:"zanzibar-airport-transfers-guide", cat:"Transfers", date:"Dec 27, 2025", readTime:"7 min",
    excerpt:"How to get from Zanzibar Airport to Stone Town, Nungwi, Kendwa, Paje, Jambiani and Kizimkazi.",
    imageData:BLOG_IMAGES["zanzibar-airport-transfers-guide"],
    seoTitle:"Zanzibar Airport Transfers Guide 2026 - All Areas | HERO",
    metaDescription:"Complete guide to Zanzibar Airport transfers to all hotels.",
    keywords:"Zanzibar Airport transfer",
    content:`Zanzibar Airport (ZNZ) to hotels is 15 minutes to 1 hour 20 minutes.

**Transfer times**
Stone Town 15 min, Nungwi north 1h15m, Paje south-east 1h, Kizimkazi south 1h10m, Matemwe north-east 1h20m.

**What a good private transfer includes**
Meet and greet, flight tracking, 60 min free wait, private AC vehicle, child seat free.`
  },
  "best-time-to-visit-zanzibar": {
    title:"Best Time to Visit Zanzibar: Weather, Seasons & Tours by Month",
    slug:"best-time-to-visit-zanzibar", cat:"Tips", date:"Dec 26, 2025", readTime:"8 min",
    excerpt:"Dry season June to October, best months for snorkeling, Safari Blue and Stone Town.",
    imageData:BLOG_IMAGES["best-time-to-visit-zanzibar"],
    seoTitle:"Best Time to Visit Zanzibar - Weather by Month | HERO",
    metaDescription:"Best time to visit Zanzibar - weather, seasons, tour calendar.",
    keywords:"Best time to visit Zanzibar",
    content:`Zanzibar has two dry seasons and two rainy seasons.

**June to October - Best overall**
Cool dry, 26-28C, calm sea, best for Mnemba, Safari Blue.

**December to February - Hot and dry**
Hot 30-32C, excellent for beach.

**March, April, November - Rains**
Still warm but occasional heavy rain. Fewer tourists.`
  },
  "zanzibar-3-day-itinerary": {
    title:"Zanzibar 3 Day Itinerary: Best Tours for Short Stay",
    slug:"zanzibar-3-day-itinerary", cat:"Itineraries", date:"Dec 23, 2025", readTime:"6 min",
    excerpt:"Perfect 3 day private plan: Stone Town, Prison Island, Nakupenda, Safari Blue, Jozani and Kuza Cave.",
    imageData:BLOG_IMAGES["zanzibar-3-day-itinerary"],
    seoTitle:"Zanzibar 3 Day Itinerary - Best Private Tours | HERO",
    metaDescription:"3 day Zanzibar itinerary - best private tours for short stay.",
    keywords:"Zanzibar itinerary 3 days",
    content:`Short stay but want highlights?

Day 1 - Stone Town & Islands
Day 2 - Safari Blue from Fumba
Day 3 - Jozani, Salaam Cave and Kuza Cave`
  },
  "zanzibar-5-day-itinerary": {
    title:"Zanzibar 5 Day Itinerary: North & South Highlights",
    slug:"zanzibar-5-day-itinerary", cat:"Itineraries", date:"Dec 22, 2025", readTime:"7 min",
    excerpt:"Balanced 5 day private itinerary covering Stone Town, Mnemba, Jozani, Paje beaches and Safari Blue.",
    imageData:BLOG_IMAGES["zanzibar-5-day-itinerary"],
    seoTitle:"Zanzibar 5 Day Itinerary - Private Tours | HERO",
    metaDescription:"5 day Zanzibar itinerary - north and south highlights.",
    keywords:"Zanzibar itinerary 5 days",
    content:`5 days allows north and south without rush.

Day 1 Stone Town and Prison Island
Day 2 Mnemba snorkeling + Nungwi beach
Day 3 Spice Farm and Jozani
Day 4 Safari Blue
Day 5 Paje beach + caves`
  },
  "zanzibar-7-day-itinerary": {
    title:"Zanzibar 7 Day Itinerary: Full Island Private Experience",
    slug:"zanzibar-7-day-itinerary", cat:"Itineraries", date:"Dec 21, 2025", readTime:"8 min",
    excerpt:"Complete week: culture, nature, beach and sailing including Spice Farm, Prison Island, Nakupenda, Mnemba and Safari Blue.",
    imageData:BLOG_IMAGES["zanzibar-7-day-itinerary"],
    seoTitle:"Zanzibar 7 Day Itinerary - Full Island | HERO",
    metaDescription:"7 day Zanzibar itinerary - full island private experience.",
    keywords:"Zanzibar itinerary 7 days",
    content:`Full week lets you experience Zanzibar slowly.

Day 1 Arrival and Stone Town sunset dhow
Day 2 Prison Island and Nakupenda
Day 3 Spice Farm
Day 4 Mnemba and Nungwi
Day 5 Jozani, Salaam and Kuza
Day 6 Safari Blue
Day 7 The Rock Restaurant + departure`
  },
}

const EXTRA_SLUGS = ["spice-farm-tour-guide","jozani-forest-guide","salaam-cave-turtles","kuza-cave-guide","nungwi-kendwa-beach-guide","sunset-dhow-cruise-stone-town","kizimkazi-dolphin-guide","the-rock-restaurant-guide","chumbe-island-coral-park","quad-bike-village-tour","paje-kite-surfing-guide","paje-jambiani-beach-guide","zanzibar-packing-list","zanzibar-hotel-areas-guide","zanzibar-honeymoon-guide","zanzibar-family-guide","zanzibar-food-guide","mnemba-vs-safari-blue","private-vs-sharing-tours"]

EXTRA_SLUGS.forEach(slug=>{
  if(!BLOGS_DATA[slug]){
    const title = slug.split("-").map(w=>w.charAt(0).toUpperCase()+w.slice(1)).join(" ") + " - Zanzibar Local Guide"
    BLOGS_DATA[slug] = {
      title, slug, cat:"Guide", date:"Dec 2025", readTime:"6 min",
      excerpt:`Local guide for ${title}. What to expect, best time, what is included and local tips from HERO team based in Stone Town, Nungwi and Paje.`,
      imageData:BLOG_IMAGES[slug] || "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?w=800&q=80",
      seoTitle:`${title} | HERO Zanzibar Tours`,
      metaDescription:`Local guide for ${title} - best time, inclusions and private tour tips by HERO Zanzibar team.`,
      keywords:`${slug.replace(/-/g," ")} Zanzibar`,
      content:`This guide covers everything you need to know about ${title}.

**What to expect**
Our local team based in Stone Town, Nungwi and Paje operates this experience privately for your group. Licensed guide, private vehicle and inclusions listed clearly.

**Best time to visit**
Morning departures recommended for snorkeling tours like Mnemba and Safari Blue.

**What is included**
Private AC vehicle, licensed guide, entrance fees, boat and gear where applicable, bottled water and WhatsApp support.

**Why choose HERO**
Licensed Zanzibar tour operator, local team, transparent fixed pricing, pay after trip and free cancellation 24h.

**Local tip**
Combine with nearby tours in same area to save time. For example Jozani Forest, Salaam Cave and Kuza Cave are all south-east and can be done in one private day trip.`
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
    let found:any = null
    try{
      const raw = localStorage.getItem("hero_blogs")
      if(raw){
        const all = JSON.parse(raw)
        found = all.find((b:any)=> b.slug===slug || b.id===slug)
        if(found &&!found.imageData) found.imageData = BLOG_IMAGES[found.slug||found.id] || ""
      }
    }catch{}
    if(!found) found = BLOGS_DATA[slug]
    // DB override for image
    fetch('/api/blogs',{cache:'no-store'}).then(r=>r.json()).then((data:any)=>{
      if(Array.isArray(data)){
        const db = data.find((b:any)=> (b.slug||b.id)===slug)
        if(db){
          const dbImage = db.image_urls?.[0] || db.imageData || ""
          if(dbImage) found = {...found, imageData: dbImage, title: db.title||found.title, excerpt: db.excerpt||found.excerpt}
          setBlog(found)
        }
      }
    }).catch(()=>{})
    setBlog(found || null)
    setLoaded(true)
    const allBlogs = Object.values(BLOGS_DATA)
    if(found){
      const rel = allBlogs.filter((b:any)=> b.cat===found.cat && b.slug!==found.slug).slice(0,3)
      setRelated(rel)
      const homeRelated = allBlogs.filter((b:any)=> ["zanzibar-airport-transfers-guide","prison-island-nakupenda-guide","mnemba-atoll-snorkeling-guide","safari-blue-full-guide","stone-town-walking-guide","best-time-to-visit-zanzibar"].includes(b.slug)).slice(0,6)
      setHomeBlogs(homeRelated)
    }
  },[slug])

  const shareText = useMemo(()=> blog? `Check this Zanzibar guide: ${blog.title} - ${blog.excerpt}` : "", [blog])

  if(!loaded) return <main className="min-h-screen bg-[#F8FAFF] flex items-center justify-center"><p className="font-black text-[#0A2342] animate-pulse">Loading guide...</p></main>
  if(!blog) return (
    <main className="min-h-screen bg-[#F8FAFF]">
      <Header/>
      <div className="max-w-[800px] mx-auto px-6 py-20 text-center">
        <h1 className="font-black text-[24px] text-[#0A2342]">Guide not found: /{slug}</h1>
        <p className="text-[12px] mt-3 opacity-60 max-w-[500px] mx-auto">This guide is being updated by our local team. Browse our other Zanzibar guides.</p>
        <a href="/blogs" className="inline-block mt-6 bg-[#0A2342] text-white px-6 py-3 rounded-full font-black text-[12px]">← Back to All Guides</a>
      </div>
      <Footer/>
    </main>
  )

  return (
    <main className="min-h-screen bg-white">
      <Header/>
      <section className="bg-[#F8FAFF] border-b border-[#0A2342]/5">
        <div className="max-w-[850px] mx-auto px-6 py-8">
          <a href="/blogs" className="inline-block text-[11px] font-black bg-white border border-[#0A2342]/10 px-4 py-2 rounded-full text-[#0A2342] hover:border-[#0A2342]/30 transition">← All Zanzibar Guides</a>
          <div className="mt-6 flex gap-2 items-center flex-wrap">
            <span className="bg-[#0A2342] text-white text-[10px] font-black px-3 py-1 rounded-full">{blog.cat}</span>
            <span className="text-[11px] text-[#0A2342]/50">{blog.date} • {blog.readTime} • By HERO Local Team</span>
            <span className="bg-[#EAF2FF] text-[#0A2342] text-[9px] font-black px-2 py-1 rounded-full">Updated for 2026</span>
          </div>
          <h1 className="font-black text-[28px] md:text-[42px] leading-[1] mt-5 text-[#0A2342]">{blog.title}</h1>
          <p className="mt-4 text-[14px] text-[#0A2342]/65 leading-[1.7] max-w-[700px]">{blog.excerpt}</p>
          <div className="mt-6 flex gap-2">
            <a href={`https://wa.me/255773628792?text=Hi HERO! I read your guide: ${blog.slug}. My hotel is...`} target="_blank" className="bg-[#0A2342] text-white px-5 py-2.5 rounded-full font-black text-[11px]">Ask Local Team on WhatsApp</a>
            <button onClick={()=>{ if(navigator.share){ navigator.share({title:blog.title, text:shareText, url:window.location.href})} else { navigator.clipboard.writeText(window.location.href); alert("Link copied")}} } className="bg-white border border-[#0A2342]/10 text-[#0A2342] px-5 py-2.5 rounded-full font-black text-[11px]">Share Guide</button>
          </div>
        </div>
      </section>
      <section className="max-w-[850px] mx-auto px-6 py-8">
        <div className="h-[340px] bg-[#F0F6FF] rounded-[20px] border border-[#0A2342]/5 overflow-hidden flex items-center justify-center relative">
          {blog.imageData? <img src={blog.imageData} alt={blog.title} className="w-full h-full object-cover"/> : <div className="text-center p-8"><p className="text-[32px]">🏝️</p><p className="text-[11px] text-[#0A2342]/40 mt-2 font-bold">Add image in Admin → Blogs SEO → {blog.slug}</p></div>}
          <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur px-3 py-1.5 rounded-full text-[10px] font-black text-[#0A2342] shadow">📍 Zanzibar • Private Tour Guide</div>
        </div>
        <article className="mt-8 prose prose-sm max-w-none">
          <div className="bg-white rounded-[16px] border border-[#0A2342]/5 p-6 md:p-8">
            <div className="text-[14px] leading-[1.9] text-[#0A2342]/80 whitespace-pre-line">
              {blog.content}
            </div>
            <div className="mt-8 p-5 bg-[#F8FAFF] rounded-[14px] border border-[#0A2342]/5">
              <p className="font-black text-[12px] text-[#0A2342]">What is included in your private experience with HERO</p>
              <ul className="mt-3 text-[12px] text-[#0A2342]/70 leading-relaxed space-y-1.5">
                <li>• Private AC vehicle for your group, licensed tourism plates, insured and serviced</li>
                <li>• Professional local driver and guide from Stone Town, Nungwi or Paje team</li>
                <li>• Boat, entrance fees, snorkeling gear where listed, bottled water and fruit</li>
                <li>• Hotel pickup and drop off, WhatsApp support, driver details shared before arrival</li>
                <li>• Pay after trip, free cancellation 24 hours before, receipt on WhatsApp</li>
              </ul>
            </div>
          </div>
        </article>
        <div className="mt-10 bg-[#0A2342] rounded-[20px] p-7 text-white flex flex-col md:flex-row justify-between items-start md:items-center gap-5">
          <div>
            <p className="font-black text-[18px] leading-tight">Want a private itinerary for this experience?</p>
            <p className="text-[12px] opacity-70 mt-2 leading-relaxed max-w-[400px]">Tell us your hotel and dates, we send you a clear plan with pickup time, inclusions and fixed price for your group.</p>
          </div>
          <div className="flex gap-2">
            <a href={`https://wa.me/255773628792?text=Hi HERO! I read your guide: ${blog.title}. My hotel is...`} target="_blank" className="bg-[#FF8A1A] text-white px-6 py-3 rounded-full font-black text-[12px] whitespace-nowrap">Chat on WhatsApp</a>
            <a href="/tours" className="bg-white text-[#0A2342] px-6 py-3 rounded-full font-black text-[12px] whitespace-nowrap">View Private Tours</a>
          </div>
        </div>
        {related.length>0 && (
          <div className="mt-12">
            <h3 className="font-black text-[16px] text-[#0A2342]">Related Zanzibar Guides</h3>
            <div className="mt-4 grid md:grid-cols-3 gap-4">
              {related.map((r:any)=>(
                <a key={r.slug} href={`/blogs/${r.slug}`} className="bg-white border border-[#0A2342]/5 rounded-[14px] overflow-hidden hover:border-[#0A2342]/15 transition group">
                  <div className="h-[120px] overflow-hidden bg-[#F8FAFF]">
                    <img src={r.imageData} alt={r.title} className="w-full h-full object-cover group-hover:scale-105 transition"/>
                  </div>
                  <div className="p-4">
                    <span className="text-[9px] font-black bg-[#F8FAFF] px-2 py-1 rounded-full">{r.cat}</span>
                    <p className="font-black text-[12px] mt-2 text-[#0A2342] line-clamp-2">{r.title}</p>
                    <p className="text-[11px] text-[#0A2342]/50 mt-1 line-clamp-2">{r.excerpt}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}
        <div className="mt-14 pt-8 border-t border-[#0A2342]/5">
          <div className="flex justify-between items-end">
            <div>
              <span className="bg-[#0A2342] text-white text-[9px] px-3 py-1 rounded-full font-black tracking-widest">ON OUR HOME PAGE</span>
              <h3 className="font-black text-[18px] text-[#0A2342] mt-3">More guides related to our tours & transfers</h3>
            </div>
            <a href="/blogs" className="hidden md:inline-block bg-white border border-[#0A2342]/10 text-[#0A2342] px-4 py-2 rounded-full font-black text-[11px]">View More Guides →</a>
          </div>
          <div className="grid md:grid-cols-3 gap-4 mt-6">
            {homeBlogs.map((b:any)=>(
              <a key={b.slug} href={`/blogs/${b.slug}`} className="bg-[#F8FAFF] rounded-[14px] overflow-hidden border border-[#0A2342]/5 hover:bg-white hover:shadow-sm transition group">
                <div className="h-[120px] overflow-hidden"><img src={b.imageData} alt={b.title} className="w-full h-full object-cover group-hover:scale-105 transition"/></div>
                <div className="p-4">
                  <span className="text-[9px] font-black bg-[#0A2342] text-white px-2 py-1 rounded-full">{b.cat}</span>
                  <p className="font-black text-[12px] mt-2 text-[#0A2342] line-clamp-2">{b.title}</p>
                  <p className="text-[11px] text-[#0A2342]/60 mt-1 line-clamp-2">{b.excerpt}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
      <Footer/>
    </main>
  )
}