"use client"
import { useParams } from "next/navigation"
import { useState, useEffect, useMemo } from "react"
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const BLOGS_DATA:any = {
  "prison-island-nakupenda-guide": {
    title:"Prison Island & Nakupenda Sandbank: Complete Guide 2026",
    slug:"prison-island-nakupenda-guide", cat:"Guide", date:"Jan 15, 2026", readTime:"8 min",
    excerpt:"Giant tortoises over 100 years old, historic prison ruins and a pristine white sandbank in the middle of the Indian Ocean. Best time, itinerary and private boat inclusions.",
    imageData:"", seoTitle:"Prison Island & Nakupenda Guide Zanzibar 2026 | HERO Tours",
    metaDescription:"Complete guide to Prison Island tortoises and Nakupenda sandbank in Zanzibar. Private boat, guide, entrance, best time and itinerary by local team.",
    keywords:"Prison Island Zanzibar, Nakupenda Sandbank, Zanzibar private tours",
    content:`Prison Island, also known as Changuu Island, is one of the most booked private tours in Zanzibar, especially when combined with Nakupenda Sandbank.

**What you will see on Prison Island**
The island is home to Aldabra giant tortoises, some over 100 years old and weighing over 150kg. The sanctuary was established to protect these endangered species. You will also see the historic former prison built in 1893, originally intended for rebellious slaves and later used as a quarantine hospital. Your licensed guide will explain the history of Stone Town and the island.

**Nakupenda Sandbank - why it is special**
Nakupenda in Swahili means I Love You. It is a white sandbank that appears at low tide in the middle of the Indian Ocean. Crystal clear water, perfect for swimming, snorkeling and photos. Best time is 9am to 1:30pm when the tide is low and the sandbank is fully visible.

**Private tour itinerary (5 hours)**
8:30 AM pickup from Stone Town area in your private AC vehicle, 9:00 AM private boat departure, 9:30 AM to 11:00 AM Prison Island with tortoise feeding and guided history, 11:00 AM to 1:30 PM Nakupenda Sandbank with fresh fruit, water and snorkeling time, 2:00 PM return to Stone Town.

**What is included in a private tour**
Private boat and captain, licensed guide, entrance fee to Prison Island $4 per person, fresh seasonal fruit, bottled water, snorkeling gear. Hotel pickup and drop off can be arranged.

**Local tip from our Stone Town team**
Book early morning departure for calm sea and fewer boats. Combine with a Stone Town walking tour in the afternoon for a full cultural day. The sandbank is best enjoyed with reef-safe sunscreen and a hat.

**Who is this tour for**
Families with children love the tortoises, couples love Nakupenda for photos, and honeymooners love the private boat experience. Suitable for all ages.`
  },
  "mnemba-atoll-snorkeling-guide": {
    title:"Mnemba Atoll Snorkeling: Best Reef in Zanzibar",
    slug:"mnemba-atoll-snorkeling-guide", cat:"Snorkeling", date:"Jan 13, 2026", readTime:"7 min",
    excerpt:"Why Mnemba is considered the best snorkeling in Zanzibar, coral gardens, tropical fish, dolphin sightings and private boat experience from Matemwe.",
    imageData:"", seoTitle:"Mnemba Atoll Snorkeling Zanzibar - Best Reef Guide | HERO",
    metaDescription:"Mnemba Atoll snorkeling guide - best coral reef in Zanzibar, fish, visibility, best time and private boat from Matemwe.",
    keywords:"Mnemba snorkeling Zanzibar, Mnemba Atoll",
    content:`Mnemba Atoll is a marine conservation area off the northeast coast of Zanzibar and is widely regarded as the best snorkeling spot on the island.

**Why Mnemba Atoll is different**
Mnemba is a protected atoll with excellent coral preservation. Visibility is often 15 to 25 meters. You will see over 100 species of tropical fish, brain coral, table coral and sometimes dolphins on the way. The island itself is private, but snorkeling around the atoll is allowed with licensed boats.

**Private boat experience from Matemwe**
Departure is from Matemwe beach early morning at 8:00 AM to avoid wind. The boat ride is 20 minutes to the atoll. You have about 90 minutes of snorkeling time across two spots, with a guide in the water pointing out marine life. All snorkeling gear is included.

**Best time to visit**
June to October and December to March offer the calmest sea and best visibility. Early morning departure is essential as wind picks up after 11 AM in the north.

**What is included**
Private boat and captain from Matemwe, licensed snorkeling guide, snorkeling gear, life jackets, bottled water, fresh fruit. Hotel transfer from Nungwi, Kendwa or Stone Town can be arranged.

**Combine with**
Many guests combine Mnemba morning snorkeling with Nungwi beach sunset and Kendwa in the afternoon. Our north team based in Nungwi handles logistics smoothly.

**Conservation note**
Mnemba is a protected area. We use licensed boats, respect coral by not touching or standing, and use reef-safe sunscreen.`
  },
  "safari-blue-full-guide": {
    title:"Safari Blue Experience: Sandbank, Snorkeling & Seafood BBQ",
    slug:"safari-blue-full-guide", cat:"Guide", date:"Jan 12, 2026", readTime:"9 min",
    excerpt:"Full day from Fumba to Kwale Island, sandbank at low tide, snorkeling, mangrove lagoon and Swahili seafood BBQ with traditional dhow sailing.",
    imageData:"", seoTitle:"Safari Blue Zanzibar - Full Day Guide & Itinerary | HERO",
    metaDescription:"Safari Blue full day tour from Fumba - sandbank, snorkeling, Kwale Island, mangrove lagoon and seafood BBQ. Sharing vs private dhow.",
    keywords:"Safari Blue Zanzibar",
    content:`Safari Blue is the most famous full day tour in the south-west of Zanzibar, departing from Fumba village.

**Itinerary of Safari Blue**
8:00 AM pickup from your hotel, 9:00 AM dhow departure from Fumba, first stop sandbank at low tide for swimming and photos, second stop snorkeling near Kwale Island reef, third stop Kwale Island for Swahili seafood BBQ with grilled fish, lobster, calamari, rice, salads and tropical fruit, final stop natural mangrove lagoon for swimming, 4:00 PM return to Fumba.

**Sharing vs Private dhow**
Sharing dhow is social and more affordable, private dhow is fully private for your group with flexible timing. Both include BBQ, drinks and snorkeling gear. Our south team based near Fumba knows which boats maintain safety standards.

**What to bring**
Swimwear, towel, reef-safe sunscreen, hat, waterproof bag for phone. The BBQ is on the island with shaded areas.

**Best for**
Families, friends, honeymoon couples who want a full day on the water. Not recommended for guests who get severe seasickness, sea can be choppy in afternoon.

**Local tip**
Sit on the right side of the dhow on return for best light for photos of Stone Town coastline.`
  },
  "stone-town-walking-guide": {
    title:"Stone Town Walking Tour: UNESCO Heritage, Markets & History",
    slug:"stone-town-walking-guide", cat:"Cultural", date:"Jan 14, 2026", readTime:"7 min",
    excerpt:"Discover Freddie Mercury house, Old Fort, Slave Market Cathedral and Forodhani Gardens with a licensed local guide.",
    imageData:"", seoTitle:"Stone Town Walking Tour Zanzibar - UNESCO Guide | HERO",
    metaDescription:"Stone Town walking tour guide - UNESCO heritage, history, markets and hidden alleys with licensed local guide.",
    keywords:"Stone Town tour Zanzibar",
    content:`Stone Town is a UNESCO World Heritage site and the cultural heart of Zanzibar.

**What you will see**
Old Fort built in 1699, House of Wonders, Freddie Mercury house, Sultan Palace Museum, Slave Market Cathedral with memorial, Darajani spice market, Forodhani Gardens and narrow alleys with carved Zanzibari doors.

**Why a local guide matters**
Stone Town has over 1,700 alleys. A licensed local guide knows the history behind each door, the best time to visit markets, and hidden rooftop views. Our guides are born in Stone Town.

**Best time**
Morning 9 AM or late afternoon 4 PM to avoid midday heat. Evening tour can finish at Forodhani night market for Zanzibar pizza and seafood.

**Combine with**
Many travelers combine Stone Town walking tour in the morning with Prison Island and Nakupenda in the afternoon for a full Stone Town day.`
  },
  "zanzibar-airport-transfers-guide": {
    title:"Zanzibar Airport Transfers: Complete Guide to All Areas 2026",
    slug:"zanzibar-airport-transfers-guide", cat:"Transfers", date:"Dec 27, 2025", readTime:"7 min",
    excerpt:"How to get from Zanzibar Airport to Stone Town, Nungwi, Kendwa, Paje, Jambiani and Kizimkazi with private vehicle options and local logistics.",
    imageData:"", seoTitle:"Zanzibar Airport Transfers Guide 2026 - All Areas | HERO",
    metaDescription:"Complete guide to Zanzibar Airport transfers to all hotels, private vehicle, meet and greet, flight tracking and tips.",
    keywords:"Zanzibar Airport transfer",
    content:`Zanzibar Airport (ZNZ) to hotels is 15 minutes to 1 hour 20 minutes depending on location.

**Transfer times**
Stone Town 15 min, Airport to Nungwi and Kendwa north 1h15m, Airport to Paje and Jambiani south-east 1h, Airport to Kizimkazi south 1h10m, Airport to Matemwe north-east 1h20m.

**What a good private transfer includes**
Meet and greet with name sign at arrivals, flight tracking so driver waits if flight delays, 60 minutes free wait after landing, private AC vehicle for your group only, child seat free on request, bottled water, help with luggage, driver photo and plate shared on WhatsApp before arrival.

**Vehicle types**
Toyota Alphard and Noah 7-seater limited to 4 adults plus luggage for comfort, AC, licensed tourism plates, insured and serviced.

**Booking tip**
Share your flight number, hotel name and drop pin from Google Maps. Our Stone Town operations team tracks your flight and assigns a driver who lives near your hotel area.

**Payment**
Pay after your trip in USD, TZS, Euro or M-Pesa. Free cancellation 24 hours before. Receipt sent on WhatsApp.`
  },
  "best-time-to-visit-zanzibar": {
    title:"Best Time to Visit Zanzibar: Weather, Seasons & Tours by Month",
    slug:"best-time-to-visit-zanzibar", cat:"Tips", date:"Dec 26, 2025", readTime:"8 min",
    excerpt:"Dry season June to October, best months for snorkeling, Safari Blue and Stone Town. Month by month planning guide.",
    imageData:"", seoTitle:"Best Time to Visit Zanzibar - Weather by Month | HERO",
    metaDescription:"Best time to visit Zanzibar - weather, seasons, snorkeling and tour calendar month by month.",
    keywords:"Best time to visit Zanzibar",
    content:`Zanzibar has two dry seasons and two rainy seasons.

**June to October - Best overall**
Cool dry season, 26-28C, calm sea, best for Mnemba snorkeling, Safari Blue and Stone Town tours. Peak season, book private tours early.

**December to February - Hot and dry**
Hot 30-32C, excellent for beach, Nungwi swimming, Paje kite season starts. Good visibility for snorkeling.

**March, April, November - Short and long rains**
Still warm but occasional heavy rain. Fewer tourists, green landscape, spice farms at best. Some boat tours depend on sea conditions.

**Tour calendar**
Mnemba best June to October and December to March, Safari Blue year round but calmest morning, Jozani Forest year round, Stone Town and Spice Farm year round.

**Local tip**
For The Rock Restaurant photos, check tide chart. Low tide you walk, high tide you need boat. Our team shares tide times on WhatsApp.`
  },
  "zanzibar-3-day-itinerary": {
    title:"Zanzibar 3 Day Itinerary: Best Tours for Short Stay",
    slug:"zanzibar-3-day-itinerary", cat:"Itineraries", date:"Dec 23, 2025", readTime:"6 min",
    excerpt:"Perfect 3 day private plan: Stone Town, Prison Island, Nakupenda, Safari Blue, Jozani Forest and Kuza Cave with pickup times.",
    imageData:"", seoTitle:"Zanzibar 3 Day Itinerary - Best Private Tours | HERO",
    metaDescription:"3 day Zanzibar itinerary - best private tours for short stay with timing and hotel logistics.",
    keywords:"Zanzibar itinerary 3 days",
    content:`Short stay but want highlights?

**Day 1 - Stone Town & Islands**
Morning Stone Town walking tour, mid-morning private boat to Prison Island, midday Nakupenda sandbank with fruit and swimming.

**Day 2 - South West**
Full day Safari Blue from Fumba - sandbank, snorkeling, seafood BBQ, mangrove lagoon.

**Day 3 - South East Culture**
Morning Jozani Forest red colobus monkeys, Salaam Cave turtle sanctuary and Kuza Cave sacred swim, afternoon Paje beach.

All tours private for your group with driver who knows your hotel area.`
  },
  "zanzibar-5-day-itinerary": {
    title:"Zanzibar 5 Day Itinerary: North & South Highlights",
    slug:"zanzibar-5-day-itinerary", cat:"Itineraries", date:"Dec 22, 2025", readTime:"7 min",
    excerpt:"Balanced 5 day private itinerary covering Stone Town, Mnemba, Jozani, Paje beaches and Safari Blue with rest time.",
    imageData:"", seoTitle:"Zanzibar 5 Day Itinerary - Private Tours | HERO",
    metaDescription:"5 day Zanzibar itinerary - north and south highlights with private tours and beach time.",
    keywords:"Zanzibar itinerary 5 days",
    content:`5 days allows north and south without rush.

Day 1 Stone Town and Prison Island
Day 2 Mnemba Atoll snorkeling morning and Nungwi beach sunset
Day 3 Spice Farm and Jozani Forest
Day 4 Safari Blue full day
Day 5 Paje beach, Salaam Cave and Kuza Cave with quad bike village tour option

Private vehicle throughout with same driver where possible for comfort.`
  },
  "zanzibar-7-day-itinerary": {
    title:"Zanzibar 7 Day Itinerary: Full Island Private Experience",
    slug:"zanzibar-7-day-itinerary", cat:"Itineraries", date:"Dec 21, 2025", readTime:"8 min",
    excerpt:"Complete week: culture, nature, beach and sailing including Spice Farm, Prison Island, Nakupenda, Mnemba and Safari Blue.",
    imageData:"", seoTitle:"Zanzibar 7 Day Itinerary - Full Island | HERO",
    metaDescription:"7 day Zanzibar itinerary - full island private experience with culture, nature and beach.",
    keywords:"Zanzibar itinerary 7 days",
    content:`A full week lets you experience Zanzibar slowly.

Day 1 Arrival and Stone Town sunset dhow
Day 2 Prison Island and Nakupenda sandbank
Day 3 Spice Farm and Stone Town markets
Day 4 Mnemba snorkeling and Nungwi beach
Day 5 Jozani Forest, Salaam Cave and Kuza Cave
Day 6 Safari Blue full day
Day 7 The Rock Restaurant, Paje kite watching and departure

Our Stone Town operations team plans tide times for The Rock and sandbanks for best experience.`
  },
}

const EXTRA_SLUGS = ["spice-farm-tour-guide","jozani-forest-guide","salaam-cave-turtles","kuza-cave-guide","nungwi-kendwa-beach-guide","sunset-dhow-cruise-stone-town","kizimkazi-dolphin-guide","the-rock-restaurant-guide","chumbe-island-coral-park","quad-bike-village-tour","paje-kite-surfing-guide","paje-jambiani-beach-guide","zanzibar-packing-list","zanzibar-hotel-areas-guide","zanzibar-honeymoon-guide","zanzibar-family-guide","zanzibar-food-guide","mnemba-vs-safari-blue","private-vs-sharing-tours"]

EXTRA_SLUGS.forEach(slug=>{
  if(!BLOGS_DATA[slug]){
    const title = slug.split("-").map(w=>w.charAt(0).toUpperCase()+w.slice(1)).join(" ") + " - Zanzibar Local Guide"
    BLOGS_DATA[slug] = {
      title, slug, cat:"Guide", date:"Dec 2025", readTime:"6 min",
      excerpt:`Local guide for ${title}. What to expect, best time, what is included and local tips from HERO team based in Stone Town, Nungwi and Paje. Private tour experience.`,
      imageData:"", seoTitle:`${title} | HERO Zanzibar Tours`,
      metaDescription:`Local guide for ${title} - best time, inclusions and private tour tips by HERO Zanzibar team.`,
      keywords:`${slug.replace(/-/g," ")} Zanzibar`,
      content:`This guide covers everything you need to know about ${title}.

**What to expect**
Our local team based in Stone Town, Nungwi and Paje operates this experience privately for your group. You will have a licensed guide, private vehicle and inclusions listed clearly.

**Best time to visit**
Our operations team checks tide times, sea conditions and market days to plan your tour at the best time. Morning departures are recommended for snorkeling tours like Mnemba and Safari Blue.

**What is included**
Private transport in AC vehicle, licensed guide, entrance fees where listed, boat and gear where applicable, bottled water and local support on WhatsApp.

**Why choose HERO**
We are a licensed Zanzibar tour operator, local team, transparent fixed pricing for your group, pay after trip and free cancellation 24 hours before. Driver details shared before arrival.

**Local tip**
Combine this with nearby tours in the same area to save time on the road. For example, Jozani Forest, Salaam Cave and Kuza Cave are all in the south-east and can be done in one private day trip.

**Book with confidence**
Message our Stone Town team on WhatsApp for a clear itinerary with pickup time, inclusions and total price for your private group.`
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
      }
    }catch{}
    if(!found) found = BLOGS_DATA[slug]
    setBlog(found || null)
    setLoaded(true)

    const allBlogs = Object.values(BLOGS_DATA)
    if(found){
      const rel = allBlogs.filter((b:any)=> b.cat===found.cat && b.slug!==found.slug).slice(0,3)
      setRelated(rel)
      // Home page related - what is on home page: transfers + popular tours
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
        <p className="text-[12px] mt-3 opacity-60 max-w-[500px] mx-auto">This guide is being updated by our local team. Browse our other Zanzibar guides for Stone Town, Mnemba, Safari Blue, Prison Island and more.</p>
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
          {blog.imageData? <img src={blog.imageData} alt={blog.title} className="w-full h-full object-cover"/> : <div className="text-center p-8"><p className="text-[32px]">🏝️</p><p className="text-[11px] text-[#0A2342]/40 mt-2 font-bold">Add image in Admin → Blogs SEO → {blog.slug}</p><p className="text-[10px] text-[#0A2342]/30 mt-1">{blog.cat} • {blog.slug}</p></div>}
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
            <p className="text-[12px] opacity-70 mt-2 leading-relaxed max-w-[400px]">Tell us your hotel and dates, we send you a clear plan with pickup time, inclusions and fixed price for your group. No advance payment needed.</p>
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
                <a key={r.slug} href={`/blogs/${r.slug}`} className="bg-white border border-[#0A2342]/5 rounded-[14px] p-4 hover:border-[#0A2342]/15 transition">
                  <span className="text-[9px] font-black bg-[#F8FAFF] px-2 py-1 rounded-full">{r.cat}</span>
                  <p className="font-black text-[12px] mt-2 text-[#0A2342] line-clamp-2">{r.title}</p>
                  <p className="text-[11px] text-[#0A2342]/50 mt-1 line-clamp-2">{r.excerpt}</p>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* LIMITED BLOGS SECTION - HOME PAGE RELATED - NEW */}
        <div className="mt-14 pt-8 border-t border-[#0A2342]/5">
          <div className="flex justify-between items-end">
            <div>
              <span className="bg-[#0A2342] text-white text-[9px] px-3 py-1 rounded-full font-black tracking-widest">ON OUR HOME PAGE</span>
              <h3 className="font-black text-[18px] text-[#0A2342] mt-3">More guides related to our tours & transfers</h3>
              <p className="text-[11px] text-[#0A2342]/50 mt-1">Limited selection from what you see on home page - private tours, airport transfers and best time guides.</p>
            </div>
            <a href="/blogs" className="hidden md:inline-block bg-white border border-[#0A2342]/10 text-[#0A2342] px-4 py-2 rounded-full font-black text-[11px]">View More Guides →</a>
          </div>
          <div className="grid md:grid-cols-3 gap-4 mt-6">
            {homeBlogs.map((b:any)=>(
              <a key={b.slug} href={`/blogs/${b.slug}`} className="bg-[#F8FAFF] rounded-[14px] p-4 border border-[#0A2342]/5 hover:bg-white hover:shadow-sm transition">
                <span className="text-[9px] font-black bg-[#0A2342] text-white px-2 py-1 rounded-full">{b.cat}</span>
                <p className="font-black text-[12px] mt-2 text-[#0A2342] line-clamp-2">{b.title}</p>
                <p className="text-[11px] text-[#0A2342]/60 mt-1 line-clamp-2">{b.excerpt}</p>
              </a>
            ))}
          </div>
          <div className="text-center mt-6">
            <a href="/blogs" className="inline-block bg-[#0A2342] text-white px-6 py-3 rounded-full font-black text-[11px] md:hidden">View More Guides →</a>
            <a href="/blogs" className="hidden md:inline-block bg-[#0A2342] text-white px-6 py-3 rounded-full font-black text-[11px]">View All {Object.keys(BLOGS_DATA).length} Zanzibar Guides →</a>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-[#0A2342]/5">
          <p className="text-[11px] font-black text-[#0A2342]/40 tracking-widest">POPULAR SEARCHES</p>
          <div className="flex flex-wrap gap-2 mt-3">
            {["Zanzibar private tours","Zanzibar Airport transfer","Prison Island Zanzibar","Nakupenda Sandbank","Stone Town tour","Mnemba snorkeling","Safari Blue Zanzibar","Spice Farm Zanzibar","Jozani Forest","Nungwi beach Zanzibar"].map(k=>(
              <span key={k} className="bg-[#F8FAFF] border border-[#0A2342]/5 text-[10px] px-3 py-1.5 rounded-full text-[#0A2342]/50">{k}</span>
            ))}
          </div>
        </div>
      </section>

      <Footer/>
    </main>
  )
}