import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata = {
  title: "Zanzibar Island Guide 2026 - Airport, Tides, Areas, Prices per CAR | HERO",
  description: "Zanzibar is 85km long. Airport (ZNZ) 6km from Stone Town, 48km to Nungwi, 52km to Paje. Low tide matters for The Rock, Nakupenda. Transfers $15-$40 per CAR up to 6 pax, not per person. Full guide by local team.",
}

export default function ZanzibarIslandPage(){
 return (
 <main className="bg-[#F8FAFF]">
 <Header/>
 <section className="bg-white px-6 md:px-12 py-10">
   <div className="max-w-4xl mx-auto">
     <span className="bg-[#0A2342] text-white text-[10px] px-4 py-1.5 rounded-full font-black">ZANZIBAR ISLAND GUIDE • WRITTEN BY LOCAL DRIVERS • 2026</span>
     <h1 className="font-black text-[32px] md:text-[44px] leading-[0.95] mt-5 text-[#0A2342]">Zanzibar Island is small, but distances matter. Here is how it really is.</h1>
     <p className="text-[13.5px] text-[#0A2342]/70 mt-4 leading-[1.8]">Zanzibar main island is Unguja, 85km long, 30km wide. Abeid Amani Karume Airport (ZNZ) is in the middle-west, 6km from Stone Town. Most hotels are north, east, or south-east. That is why transfer price changes — same car, same fuel, but different distance. We charge per car, not per person, so you understand.</p>

     <div className="mt-8 grid md:grid-cols-2 gap-4">
       <div className="bg-[#F8FAFF] border border-black/5 rounded-[14px] p-4"><p className="font-black text-[13px] text-[#0A2342]">How far is Airport to...</p><ul className="mt-2 text-[12px] text-[#0A2342]/70 leading-relaxed space-y-1"><li>Stone Town: 6km, 12 min, $15 per CAR</li><li>Paje / Jambiani: 52km, 1h05m, $40 per CAR</li><li>Nungwi / Kendwa: 58km, 1h15m, $40 per CAR</li><li>Kiwengwa: 38km, 50 min, $35 per CAR</li><li>Fumba (Safari Blue): 28km, 40 min, $30 per CAR</li></ul></div>
       <div className="bg-[#FFF7ED] border border-[#FF8A1A]/20 rounded-[14px] p-4"><p className="font-black text-[13px] text-[#0A2342]">Tide matters in Zanzibar</p><p className="text-[12px] text-[#0A2342]/70 mt-2 leading-relaxed">East coast tide goes out 2-3km. At low tide you can walk to sandbanks. Nakupenda sandbank disappears at high tide — best time 9am-1pm low tide. The Rock Restaurant in Pingwe — you can walk at low tide, need boat at high tide. We check tide for you when you book.</p></div>
     </div>

     <h2 className="font-black text-[22px] mt-10 text-[#0A2342]">North vs South-East vs South — where to stay?</h2>
     <p className="text-[13px] text-[#0A2342]/70 mt-3 leading-[1.8]"><b>North (Nungwi, Kendwa):</b> No big tide, swimming anytime, sunset, more party. Best for swimming, horse riding, turtle aquarium, Mnemba boat leaves from here. <br/><br/><b>South-East (Paje, Jambiani, Bwejuu):</b> Kite surfing, wide white beach, but big low tide — swimming only high tide. Best for Salaam Cave, Kuza Cave, quad bike, village tour. <br/><br/><b>South-West (Fumba, Kizimkazi):</b> Quiet, dolphin tour morning, Safari Blue leaves from Fumba. <br/><br/><b>East (Kiwengwa, Pongwe):</b> The Rock Restaurant, Blue Lagoon snorkeling, spice farms near.</p>

     <h2 className="font-black text-[22px] mt-10 text-[#0A2342]">Why per CAR, not per person, makes sense on an island</h2>
     <p className="text-[13px] text-[#0A2342]/70 mt-3 leading-[1.8]">In Zanzibar you rent a car or a boat, not a seat. Airport to Nungwi is one car driving 58km whether you are 2 or 5. So we say $40 per CAR up to 6 pax same price. Same for tours: Prison Island + Nakupenda needs one boat — $250 per CAR includes boat, captain, guide, entrance $4 pp, fruit, water. Up to 6 people share same boat. You save $100 vs per person price.</p>

     <div className="mt-8 bg-[#0A2342] rounded-[16px] p-6 text-white">
       <p className="font-black text-[14px]">Small phrases we answer on this site</p>
       <div className="mt-3 flex flex-wrap gap-2">
         {["airport to paje distance","nungwi how far","rock restaurant tide time","nakupenda disappearing sandbank","mnemba snorkeling best time","salaam cave entrance fee","jozani forest monkeys time","zanzibar pay after trip","child seat taxi zanzibar","zanzibar transfer per car"].map(t=> <span key={t} className="bg-white/10 border border-white/10 px-3 py-1.5 rounded-full text-[11px]">{t}</span>)}
       </div>
       <p className="text-[11px] opacity-60 mt-3">Each phrase has its own blog in /blogs — click below.</p>
       <a href="/blogs" className="inline-block mt-4 bg-[#FF8A1A] text-white px-5 py-2.5 rounded-full font-black text-[12px]">See all guides per CAR →</a>
     </div>
   </div>
 </section>
 <Footer/>
 </main>
 )
}
