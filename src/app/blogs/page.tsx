"use client"
import { useState, useEffect, useMemo } from "react"
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const BLOG_IMAGES: Record<string,string> = {
  "prison-island-nakupenda-guide": "/blogs/prison-nakupenda.jpg",
  "stone-town-walking-guide": "/blogs/stone-town.jpg",
  "mnemba-atoll-snorkeling-guide": "/blogs/mnemba.jpg",
  "safari-blue-full-guide": "/blogs/safari-blue.jpg",
  "spice-farm-tour-guide": "/blogs/spice-farm.jpg",
  "jozani-forest-guide": "/blogs/jozani.jpg",
  "salaam-cave-turtles": "/blogs/salaam-turtle.jpg",
  "kuza-cave-guide": "/blogs/kuza-cave.jpg",
  "nungwi-kendwa-beach-guide": "/blogs/nungwi-kendwa.jpg",
  "sunset-dhow-cruise-stone-town": "/blogs/sunset-dhow.jpg",
  "kizimkazi-dolphin-guide": "/blogs/dolphin.jpg",
  "the-rock-restaurant-guide": "/blogs/rock-restaurant.jpg",
  "chumbe-island-coral-park": "/blogs/chumbe.jpg",
  "quad-bike-village-tour": "/blogs/quad-bike-paje.jpg",
  "paje-kite-surfing-guide": "/blogs/kite-paje.jpg",
  "paje-jambiani-beach-guide": "/blogs/paje-beach.jpg",
  "zanzibar-airport-transfers-guide": "/blogs/transfers-paje-nungwi.jpg",
  "best-time-to-visit-zanzibar": "/blogs/best-time.jpg",
  "zanzibar-packing-list": "/blogs/packing.jpg",
  "zanzibar-hotel-areas-guide": "/blogs/hotel-areas.jpg",
  "zanzibar-3-day-itinerary": "/blogs/3-day-itinerary.jpg",
  "zanzibar-5-day-itinerary": "/blogs/5-day.jpg",
  "zanzibar-7-day-itinerary": "/blogs/7-day.jpg",
  "zanzibar-honeymoon-guide": "/blogs/honeymoon.jpg",
  "zanzibar-family-guide": "/blogs/family.jpg",
  "zanzibar-food-guide": "/blogs/food.jpg",
  "mnemba-vs-safari-blue": "/blogs/mnemba-vs-safari.jpg",
  "private-vs-sharing-tours": "/blogs/private-vs-shared.jpg",
}

const ZANZIBAR_HERO = "/blogs/zanzibar-hero.jpg"

const DEFAULT_BLOGS = [
  { id:"prison-island-nakupenda-guide", slug:"prison-island-nakupenda-guide", title:"Prison Island & Nakupenda Sandbank: Complete Guide 2026", excerpt:"Giant tortoises over 100 years old, historic prison ruins and a white sandbank in the Indian Ocean. Best time to visit, what to bring, boat timings and private tour inclusions.", date:"Jan 15, 2026", cat:"Guide", imageData:BLOG_IMAGES["prison-island-nakupenda-guide"], readTime:"8 min", keywords:"Prison Island Zanzibar, Nakupenda Sandbank" },
  { id:"stone-town-walking-guide", slug:"stone-town-walking-guide", title:"Stone Town Walking Tour: UNESCO Heritage, Markets & History", excerpt:"Discover Freddie Mercury house, Old Fort, Slave Market Cathedral and Forodhani Gardens with a licensed local guide. Route, duration and cultural tips.", date:"Jan 14, 2026", cat:"Cultural", imageData:BLOG_IMAGES["stone-town-walking-guide"], readTime:"7 min", keywords:"Stone Town tour Zanzibar" },
  { id:"mnemba-atoll-snorkeling-guide", slug:"mnemba-atoll-snorkeling-guide", title:"Mnemba Atoll Snorkeling: Best Reef in Zanzibar", excerpt:"Why Mnemba is considered the best snorkeling in Zanzibar, coral gardens, tropical fish, dolphin sightings, best months, departure from Matemwe and private boat experience.", date:"Jan 13, 2026", cat:"Snorkeling", imageData:BLOG_IMAGES["mnemba-atoll-snorkeling-guide"], readTime:"7 min", keywords:"Mnemba snorkeling Zanzibar" },
  { id:"safari-blue-full-guide", slug:"safari-blue-full-guide", title:"Safari Blue Experience: Sandbank, Snorkeling & Seafood BBQ", excerpt:"Full day from Fumba to Kwale Island, sandbank at low tide, snorkeling, mangrove lagoon and Swahili seafood BBQ. Sharing vs private dhow explained.", date:"Jan 12, 2026", cat:"Guide", imageData:BLOG_IMAGES["safari-blue-full-guide"], readTime:"9 min", keywords:"Safari Blue Zanzibar" },
  { id:"spice-farm-tour-guide", slug:"spice-farm-tour-guide", title:"Spice Farm Tour Zanzibar: 30 Spices, Fruits & Traditions", excerpt:"What to expect on a Zanzibar Spice Farm, cloves, vanilla, cinnamon tasting, coconut climbing and Swahili lunch. Best farms near Stone Town.", date:"Jan 11, 2026", cat:"Cultural", imageData:BLOG_IMAGES["spice-farm-tour-guide"], readTime:"6 min", keywords:"Spice Farm Zanzibar" },
  { id:"jozani-forest-guide", slug:"jozani-forest-guide", title:"Jozani Forest: Red Colobus Monkeys & Mangrove Boardwalk", excerpt:"Meet the endemic Zanzibar Red Colobus monkeys, mangrove forest walk, best time to visit Jozani Chwaka Bay and private guide experience.", date:"Jan 10, 2026", cat:"Nature", imageData:BLOG_IMAGES["jozani-forest-guide"], readTime:"5 min", keywords:"Jozani Forest Zanzibar" },
  { id:"salaam-cave-turtles", slug:"salaam-cave-turtles", title:"Salaam Cave: Swim with Turtles in Kizimkazi", excerpt:"Natural lagoon turtle sanctuary in Kizimkazi, conservation work, swimming rules, best time to avoid crowds and how to combine with Jozani Forest.", date:"Jan 9, 2026", cat:"Nature", imageData:BLOG_IMAGES["salaam-cave-turtles"], readTime:"5 min", keywords:"Salaam Cave Zanzibar" },
  { id:"kuza-cave-guide", slug:"kuza-cave-guide", title:"Kuza Cave: Sacred Cave & Cultural History in Jambiani", excerpt:"Limestone cave with crystal clear water, Swahili spiritual history, local stories and why Kuza is more than a swim. Combined with Paje beach day.", date:"Jan 8, 2026", cat:"Cultural", imageData:BLOG_IMAGES["kuza-cave-guide"], readTime:"6 min", keywords:"Kuza Cave Zanzibar" },
  { id:"nungwi-kendwa-beach-guide", slug:"nungwi-kendwa-beach-guide", title:"Nungwi & Kendwa Beach: Best Sunset & Swimming in the North", excerpt:"Why the north of Zanzibar has the best swimming at all tides, sunset dhow cruise, horse riding on the beach, and best hotels in Nungwi and Kendwa.", date:"Jan 7, 2026", cat:"Beaches", imageData:BLOG_IMAGES["nungwi-kendwa-beach-guide"], readTime:"6 min", keywords:"Nungwi beach Zanzibar" },
  { id:"sunset-dhow-cruise", slug:"sunset-dhow-cruise-stone-town", title:"Sunset Dhow Cruise in Stone Town: Traditional Sailing", excerpt:"Sail on a traditional wooden dhow at sunset, drinks on board, views of Stone Town skyline and best photography spots. Private charter option.", date:"Jan 6, 2026", cat:"Beaches", imageData:BLOG_IMAGES["sunset-dhow-cruise-stone-town"], readTime:"4 min", keywords:"Sunset Dhow Zanzibar" },
  { id:"kizimkazi-dolphin-guide", slug:"kizimkazi-dolphin-guide", title:"Kizimkazi Dolphin Tour: Ethical Guide & Best Time", excerpt:"Early morning dolphin watching in Kizimkazi, ethical guidelines, how to avoid chasing, best months and combining with Salaam Cave and Jozani.", date:"Jan 5, 2026", cat:"Nature", imageData:BLOG_IMAGES["kizimkazi-dolphin-guide"], readTime:"6 min", keywords:"Kizimkazi dolphins Zanzibar" },
  { id:"rock-restaurant-guide", slug:"the-rock-restaurant-guide", title:"The Rock Restaurant Zanzibar: Tide Times, Photos & Tips", excerpt:"Iconic restaurant on a rock in Pingwe, how tide affects access, best time for photos, reservation tips and combining with Blue Lagoon snorkeling.", date:"Jan 4, 2026", cat:"Guide", imageData:BLOG_IMAGES["the-rock-restaurant-guide"], readTime:"5 min", keywords:"The Rock Restaurant Zanzibar" },
  { id:"chumbe-island-guide", slug:"chumbe-island-coral-park", title:"Chumbe Island Coral Park: Private Conservation Island", excerpt:"Best preserved coral sanctuary in Zanzibar, eco-lodge, snorkeling trail, forest reserve and why Chumbe limits visitors daily.", date:"Jan 3, 2026", cat:"Snorkeling", imageData:BLOG_IMAGES["chumbe-island-coral-park"], readTime:"7 min", keywords:"Chumbe Island Zanzibar" },
  { id:"quad-bike-village-tour", slug:"quad-bike-village-tour", title:"Quad Bike Tour in Paje: Village, Beach & Local Life", excerpt:"Ride through villages, meet locals, visit a local school and finish at the beach. Route, safety, what to wear and cultural respect tips.", date:"Jan 2, 2026", cat:"Cultural", imageData:BLOG_IMAGES["quad-bike-village-tour"], readTime:"5 min", keywords:"Quad bike Zanzibar" },
  { id:"paje-kite-surfing-guide", slug:"paje-kite-surfing-guide", title:"Kite Surfing in Paje: Best Spot in Zanzibar for Beginners", excerpt:"Why Paje is world famous for kite surfing, wind seasons, beginner lessons, equipment and safety with certified instructors.", date:"Jan 1, 2026", cat:"Beaches", imageData:BLOG_IMAGES["paje-kite-surfing-guide"], readTime:"6 min", keywords:"Kite surfing Paje Zanzibar" },
  { id:"paje-jambiani-beach-guide", slug:"paje-jambiani-beach-guide", title:"Paje & Jambiani: Best Beach for Kite, Swimming & Restaurants", excerpt:"South-east Zanzibar beach guide, best restaurants, tide chart, kite schools and how to enjoy Paje and Jambiani like a local.", date:"Dec 28, 2025", cat:"Beaches", imageData:BLOG_IMAGES["paje-jambiani-beach-guide"], readTime:"6 min", keywords:"Paje beach Zanzibar" },
  { id:"zanzibar-airport-transfers-guide", slug:"zanzibar-airport-transfers-guide", title:"Zanzibar Transfers: Airport to Paje, Nungwi Price per CAR 2026", excerpt:"How to get from Zanzibar Airport to Stone Town, Nungwi, Kendwa, Paje, Jambiani and Kizimkazi. Private vehicle options, meet and greet, flight tracking and luggage tips.", date:"Dec 27, 2025", cat:"Transfers", imageData:BLOG_IMAGES["zanzibar-airport-transfers-guide"], readTime:"7 min", keywords:"Zanzibar Airport transfer" },
  { id:"best-time-to-visit-zanzibar", slug:"best-time-to-visit-zanzibar", title:"Best Time to Visit Zanzibar: Weather, Seasons & Tours by Month", excerpt:"Dry season June to October, short rains, best months for Mnemba snorkeling, Safari Blue and Stone Town. Month by month guide for planning your trip.", date:"Dec 26, 2025", cat:"Tips", imageData:BLOG_IMAGES["best-time-to-visit-zanzibar"], readTime:"8 min", keywords:"Best time to visit Zanzibar" },
  { id:"zanzibar-packing-list", slug:"zanzibar-packing-list", title:"What to Pack for Zanzibar: Checklist for Beach & Tours", excerpt:"Essentials for Stone Town, beach, snorkeling and spice farm, reef-safe sunscreen, modest clothing for cultural sites and what not to bring.", date:"Dec 25, 2025", cat:"Tips", imageData:BLOG_IMAGES["zanzibar-packing-list"], readTime:"5 min", keywords:"Zanzibar packing list" },
  { id:"zanzibar-hotel-areas-guide", slug:"zanzibar-hotel-areas-guide", title:"Where to Stay in Zanzibar: North vs East vs South Guide", excerpt:"Nungwi and Kendwa for sunset and swimming, Paje and Jambiani for kite and restaurants, Stone Town for culture, Kizimkazi for dolphins and quiet stays.", date:"Dec 24, 2025", cat:"Tips", imageData:BLOG_IMAGES["zanzibar-hotel-areas-guide"], readTime:"7 min", keywords:"Where to stay Zanzibar" },
  { id:"zanzibar-3-day-itinerary", slug:"zanzibar-3-day-itinerary", title:"Zanzibar 3 Day Itinerary: Best Tours for Short Stay", excerpt:"Perfect 3 day plan: Day 1 Stone Town and Prison Island, Day 2 Safari Blue, Day 3 Jozani and Kuza Cave. Private itinerary with pickup times.", date:"Dec 23, 2025", cat:"Itineraries", imageData:BLOG_IMAGES["zanzibar-3-day-itinerary"], readTime:"6 min", keywords:"Zanzibar itinerary 3 days" },
  { id:"zanzibar-5-day-itinerary", slug:"zanzibar-5-day-itinerary", title:"Zanzibar 5 Day Itinerary: North & South Highlights", excerpt:"Balanced 5 day itinerary covering Stone Town, Mnemba snorkeling, Jozani Forest, Paje beaches and Safari Blue with rest time and local restaurants.", date:"Dec 22, 2025", cat:"Itineraries", imageData:BLOG_IMAGES["zanzibar-5-day-itinerary"], readTime:"7 min", keywords:"Zanzibar itinerary 5 days" },
  { id:"zanzibar-7-day-itinerary", slug:"zanzibar-7-day-itinerary", title:"Zanzibar 7 Day Itinerary: Full Island Private Experience", excerpt:"Complete week in Zanzibar: culture, nature, beach and sailing. Includes Spice Farm, Prison Island, Nakupenda, Mnemba, Safari Blue and sunset dhow.", date:"Dec 21, 2025", cat:"Itineraries", imageData:BLOG_IMAGES["zanzibar-7-day-itinerary"], readTime:"8 min", keywords:"Zanzibar itinerary 7 days" },
  { id:"zanzibar-honeymoon-guide", slug:"zanzibar-honeymoon-guide", title:"Honeymoon in Zanzibar: Most Romantic Tours & Beaches", excerpt:"Best private experiences for honeymoon couples: sunset dhow, Nakupenda sandbank picnic, Mnemba atoll and The Rock Restaurant dinner.", date:"Dec 20, 2025", cat:"Itineraries", imageData:BLOG_IMAGES["zanzibar-honeymoon-guide"], readTime:"6 min", keywords:"Zanzibar honeymoon" },
  { id:"zanzibar-family-guide", slug:"zanzibar-family-guide", title:"Zanzibar with Kids: Family Friendly Tours & Tips", excerpt:"Best tours with children: Prison Island tortoises, Jozani monkeys, Salaam Cave turtles, spice farm tasting and safe swimming beaches in the north.", date:"Dec 19, 2025", cat:"Itineraries", imageData:BLOG_IMAGES["zanzibar-family-guide"], readTime:"6 min", keywords:"Zanzibar family tours" },
  { id:"zanzibar-food-guide", slug:"zanzibar-food-guide", title:"Zanzibar Food Guide: What to Eat in Stone Town & Forodhani", excerpt:"Urojo soup, Zanzibar pizza, seafood BBQ, Swahili biryani, Forodhani night market guide and best local restaurants with hygiene tips.", date:"Dec 18, 2025", cat:"Food", imageData:BLOG_IMAGES["zanzibar-food-guide"], readTime:"5 min", keywords:"Zanzibar food guide" },
  { id:"mnemba-vs-safari-blue", slug:"mnemba-vs-safari-blue", title:"Mnemba Atoll vs Safari Blue: Which Snorkeling Tour to Choose?", excerpt:"Detailed comparison of coral quality, sandbank experience, BBQ lunch, dolphin chances and which tour suits your hotel location and travel style.", date:"Dec 17, 2025", cat:"Comparison", imageData:BLOG_IMAGES["mnemba-vs-safari-blue"], readTime:"8 min", keywords:"Mnemba vs Safari Blue" },
  { id:"private-vs-sharing-tours", slug:"private-vs-sharing-tours", title:"Private Tours vs Shared Tours in Zanzibar: What to Expect", excerpt:"Difference between private vehicle with dedicated guide and shared group trips, comfort, timing flexibility and when each option makes sense for your holiday.", date:"Dec 16, 2025", cat:"Tips", imageData:BLOG_IMAGES["private-vs-sharing-tours"], readTime:"5 min", keywords:"Private tours Zanzibar" },
]

const CATS = ["All","Guide","Cultural","Snorkeling","Beaches","Nature","Transfers","Itineraries","Tips","Food","Comparison"]

export default function BlogsPage(){
  const [blogs, setBlogs] = useState(DEFAULT_BLOGS)
  const [filter, setFilter] = useState("All")
  const [q, setQ] = useState("")

  useEffect(()=>{
    try{
      const b=localStorage.getItem("hero_blogs")
      if(b){
        const p=JSON.parse(b)
        if(p.length>0){
          const mapped = p.map((x:any)=>({
            id:x.id, slug:x.slug||x.id, title:x.title, excerpt:x.excerpt||x.desc||"",
            date:x.date||"", cat:x.cat||"Guide",
            imageData:x.imageData||x.image||BLOG_IMAGES[x.slug||x.id]||"",
            readTime:x.readTime||"5 min", keywords:x.keywords||""
          }))
          setBlogs([...mapped,...DEFAULT_BLOGS.filter(d=>!mapped.find((m:any)=>m.slug===d.slug))])
        }
      }
    }catch{}
    fetch('/api/blogs',{cache:'no-store'}).then(r=>r.json()).then((data:any)=>{
      if(Array.isArray(data)&&data.length>0){
        const mapped = data.map((x:any)=>({
          id:x.id, slug:x.slug||x.id, title:x.title, excerpt:x.excerpt||x.desc||"",
          date:x.date||"", cat:x.cat||"Guide",
          imageData:(x.image_urls?.[0]||x.imageData||x.image||BLOG_IMAGES[x.slug||x.id]||""),
          readTime:x.readTime||"5 min", keywords:x.keywords||""
        }))
        setBlogs([...mapped,...DEFAULT_BLOGS.filter(d=>!mapped.find((m:any)=>m.slug===d.slug))])
      }
    }).catch(()=>{})
  },[])

  const filtered = useMemo(()=>{
    return blogs.filter(b=>{
      const matchCat = filter==="All" || b.cat===filter
      const matchQ =!q || b.title.toLowerCase().includes(q.toLowerCase()) || b.excerpt.toLowerCase().includes(q.toLowerCase())
      return matchCat && matchQ
    })
  },[blogs,filter,q])

  const featured = filtered[0]

  return (
    <main className="min-h-screen bg-[#F8FAFF]">
      <Header/>
      <section className="bg-white border-b border-[#0A2342]/5 relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={ZANZIBAR_HERO} alt="Beauty of Zanzibar" className="w-full h-full object-cover opacity-[0.18]"/>
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-white/60"/>
        </div>
        <div className="relative max-w-[1200px] mx-auto px-6 md:px-12 py-12">
          <span className="bg-[#0A2342] text-white text-[10px] px-4 py-1.5 rounded-full font-black tracking-widest">ZANZIBAR TRAVEL GUIDES • LOCAL INSIGHTS • 2026</span>
          <h1 className="font-black text-[30px] md:text-[44px] leading-[0.95] mt-5 text-[#0A2342] max-w-[700px]">Zanzibar travel guides, local tips and private tour insights from our Stone Town team.</h1>
          <p className="text-[13.5px] text-[#0A2342]/60 mt-4 max-w-[700px] leading-[1.7]">Planning your Zanzibar holiday? Our local guides share practical guides for Stone Town tours, Prison Island, Nakupenda Sandbank, Mnemba Atoll snorkeling, Safari Blue, Jozani Forest, Spice Farm, Salaam Cave, Kuza Cave, Nungwi Beach and Zanzibar Airport transfers. Private experiences, transparent pricing and authentic recommendations.</p>
          <div className="mt-8 flex flex-wrap gap-3 items-center">
            <div className="flex items-center bg-[#F8FAFF] border border-[#0A2342]/10 rounded-full px-5 py-2.5 w-full md:w-[340px]">
              <span className="text-[14px] mr-2">🔍</span>
              <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search guides: Mnemba, Safari Blue, Stone Town..." className="bg-transparent outline-none text-[12px] w-full placeholder:text-[#0A2342]/40" />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-1">
              {CATS.map(c=>(
                <button key={c} onClick={()=>setFilter(c)} className={`px-4 py-2.5 rounded-full text-[11px] font-black border whitespace-nowrap ${filter===c? "bg-[#0A2342] text-white border-[#0A2342]" : "bg-white text-[#0A2342] border-[#0A2342]/10 hover:border-[#0A2342]/30"}`}>{c}</button>
              ))}
            </div>
          </div>
          <p className="text-[11px] text-[#0A2342]/40 mt-4">{filtered.length} guides • Updated for 2026 season • Beauty of Zanzibar</p>
        </div>
      </section>
      {featured && (
        <section className="px-6 md:px-12 py-8">
          <div className="max-w-[1200px] mx-auto">
            <div className="bg-[#0A2342] rounded-[20px] overflow-hidden grid md:grid-cols-2 gap-0">
              <div className="h-[280px] md:h-auto bg-[#122d5a] overflow-hidden">
                <img src={featured.imageData} alt={featured.title} className="w-full h-full object-cover"/>
              </div>
              <div className="p-8 text-white flex flex-col justify-center">
                <span className="bg-[#FF8A1A] text-white text-[9px] px-3 py-1 rounded-full font-black tracking-widest w-fit">FEATURED GUIDE</span>
                <h2 className="font-black text-[22px] md:text-[28px] leading-tight mt-4">{featured.title}</h2>
                <p className="text-[13px] opacity-70 mt-3 leading-relaxed">{featured.excerpt}</p>
                <div className="flex gap-3 mt-5 text-[11px] opacity-60"><span>{featured.cat}</span><span>•</span><span>{featured.readTime}</span><span>•</span><span>{featured.date}</span></div>
                <a href={`/blogs/${featured.slug}`} className="mt-6 bg-white text-[#0A2342] px-6 py-3 rounded-full font-black text-[12px] w-fit">Read Full Guide →</a>
              </div>
            </div>
          </div>
        </section>
      )}
      <section className="px-6 md:px-12 py-8">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            {filtered.slice(featured?1:0).map(b=>(
              <div key={b.id} className="bg-white rounded-[16px] overflow-hidden border border-[#0A2342]/5 shadow-sm hover:shadow-md transition group">
                <div className="h-[190px] bg-[#F0F6FF] overflow-hidden relative">
                  <img src={b.imageData} alt={b.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500"/>
                  <div className="absolute top-3 left-3 bg-[#0A2342] text-white text-[9px] font-black px-2.5 py-1 rounded-full">{b.cat}</div>
                  <div className="absolute top-3 right-3 bg-white text-[#0A2342] text-[9px] font-black px-2.5 py-1 rounded-full">{b.readTime}</div>
                </div>
                <div className="p-5">
                  <h3 className="font-black text-[14px] leading-tight text-[#0A2342] line-clamp-2">{b.title}</h3>
                  <p className="text-[11.5px] text-[#0A2342]/60 mt-2 line-clamp-3 leading-relaxed">{b.excerpt}</p>
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-[10px] text-[#0A2342]/40">{b.date}</span>
                    <a href={`/blogs/${b.slug}`} className="bg-[#0A2342] text-white px-4 py-2 rounded-full text-[11px] font-black hover:bg-black transition">Read Guide →</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer/>
    </main>
  )
}