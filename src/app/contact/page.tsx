"use client"
import { useState } from "react"
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function ContactPage(){
 const waNumber = "255773628792"
 const [hotel, setHotel] = useState("")
 const [date, setDate] = useState("")
 const [people, setPeople] = useState("2")
 const [need, setNeed] = useState("Airport to hotel - per CAR")
 const [note, setNote] = useState("")

 const waLink = `https://wa.me/${waNumber}?text=${encodeURIComponent(
`Hi HERO! 👋

Hotel/Area: ${hotel || "-"}
Date: ${date || "-"}
People: ${people}
Need: ${need}
Note: ${note || "-"}

Can you give me fixed price per CAR (up to 6 pax same price)?`
 )}`

 return (
 <main className="bg-[#FFF9F2] overflow-x-hidden">
 <Header/>

 {/* HERO */}
 <section className="bg-white border-b border-black/5">
   <div className="max-w-6xl mx-auto px-6 md:px-12 py-10 md:py-14 grid md:grid-cols-2 gap-10 items-start">
     <div>
       <span className="bg-[#0A2342] text-white text-[10px] px-4 py-1.5 rounded-full font-black tracking-widest">CONTACT HERO • REPLIES IN 5-10 MIN • 6AM - 11PM EAT</span>
       <h1 className="font-black text-[34px] md:text-[44px] leading-[0.95] mt-5 text-[#0A2342]">Message us on WhatsApp.<br/><span className="text-[#FF8A1A]">We keep it simple.</span></h1>
       <p className="text-[13.5px] text-[#0A2342]/65 mt-4 leading-[1.7]">
         No call center. When you write to <b className="text-[#0A2342]">+255 773 628 792</b>, you talk to someone in Stone Town who can actually call the driver and check the car. We give you a fixed price per car — not per person — up to 6 people, same car, same price.
       </p>

       <div className="mt-6 space-y-3">
         <a href={`https://wa.me/${waNumber}?text=Hi HERO! I want to book`} target="_blank" className="flex items-center justify-between bg-[#25D366] hover:bg-[#20bd5a] transition text-white rounded-[14px] px-5 py-4 font-black text-[13px]">
           <span>💬 WhatsApp — fastest way</span><span className="bg-white/20 px-3 py-1 rounded-full text-[11px]">+255 773 628 792</span>
         </a>
         <div className="grid grid-cols-2 gap-3">
           <div className="bg-[#F8FAFF] border border-black/5 rounded-[14px] px-4 py-3.5">
             <p className="text-[10px] font-black tracking-widest text-[#0A2342]/40">CALL / SMS</p>
             <p className="font-black text-[13px] text-[#0A2342] mt-1">+255 773 628 792</p>
             <p className="text-[11px] text-[#0A2342]/50 mt-1">6am - 11pm, same number</p>
           </div>
           <div className="bg-[#F8FAFF] border border-black/5 rounded-[14px] px-4 py-3.5">
             <p className="text-[10px] font-black tracking-widest text-[#0A2342]/40">EMAIL</p>
             <p className="font-black text-[13px] text-[#0A2342] mt-1">info@herozanzibar.com</p>
             <p className="text-[11px] text-[#0A2342]/50 mt-1">Reply within few hours</p>
           </div>
         </div>
       </div>

       <div className="mt-6 bg-[#FFF2E0] border border-[#FF8A1A]/20 rounded-[14px] p-4">
         <p className="font-black text-[12px] text-[#0A2342]">Send this and we reply with price, not more questions:</p>
         <ul className="mt-2 text-[12px] text-[#0A2342]/70 list-disc list-inside leading-relaxed space-y-1">
           <li>Hotel name + area: e.g. Z Hotel - Nungwi, or Mahi Mahi - Paje</li>
           <li>Date + landing time if transfer, people + luggage</li>
           <li>What you need: transfer, tour, or both</li>
         </ul>
         <p className="text-[11px] text-[#0A2342]/50 mt-2 italic">Example: "4 pax, landing Jan 20 at 14:30 ZNZ, Mahi Mahi Paje, need Airport to Paje + Mnemba next day"</p>
       </div>
     </div>

     {/* FORM -> WHATSAPP */}
     <div className="bg-white rounded-[20px] border border-black/10 shadow-[0_16px_40px_rgba(10,35,66,0.06)] p-6">
       <p className="font-black text-[15px] text-[#0A2342]">Quick contact — opens WhatsApp pre-filled</p>
       <p className="text-[11px] text-[#0A2342]/50 mt-1">No form that disappears. This opens your WhatsApp ready to send.</p>

       <div className="mt-5 space-y-3.5">
         <div>
           <label className="text-[11px] font-bold text-[#0A2342]/70">Hotel / Area *</label>
           <input value={hotel} onChange={e=>setHotel(e.target.value)} placeholder="e.g. Nungwi Beach Resort - Nungwi" className="w-full mt-1 bg-[#F8FAFF] border border-black/10 rounded-full px-4 py-3 text-[13px] outline-none focus:border-[#0A2342]"/>
         </div>
         <div className="grid grid-cols-2 gap-3">
           <div>
             <label className="text-[11px] font-bold text-[#0A2342]/70">Date</label>
             <input type="date" value={date} onChange={e=>setDate(e.target.value)} className="w-full mt-1 bg-[#F8FAFF] border border-black/10 rounded-full px-4 py-3 text-[13px] outline-none"/>
           </div>
           <div>
             <label className="text-[11px] font-bold text-[#0A2342]/70">People</label>
             <select value={people} onChange={e=>setPeople(e.target.value)} className="w-full mt-1 bg-[#F8FAFF] border border-black/10 rounded-full px-4 py-3 text-[13px] outline-none">
               {[1,2,3,4,5,6].map(n=> <option key={n} value={n}>{n} {n===1?'person':'people'} — same car price</option>)}
             </select>
           </div>
         </div>
         <div>
           <label className="text-[11px] font-bold text-[#0A2342]/70">What do you need?</label>
           <select value={need} onChange={e=>setNeed(e.target.value)} className="w-full mt-1 bg-[#F8FAFF] border border-black/10 rounded-full px-4 py-3 text-[13px] outline-none">
             <option>Airport to hotel - per CAR</option>
             <option>Hotel to Airport - per CAR</option>
             <option>Hotel to hotel - per CAR</option>
             <option>Prison Island + Nakupenda - $250 per CAR</option>
             <option>Mnemba Atoll snorkeling - $180 per CAR</option>
             <option>Safari Blue BBQ - $190 per CAR</option>
             <option>Stone Town + Spice + Jozani - per CAR</option>
             <option>Other - write in note</option>
           </select>
         </div>
         <div>
           <label className="text-[11px] font-bold text-[#0A2342]/70">Note</label>
           <textarea value={note} onChange={e=>setNote(e.target.value)} placeholder="Flight number, child seat, luggage..." className="w-full mt-1 bg-[#F8FAFF] border border-black/10 rounded-[16px] px-4 py-3 text-[13px] h-[78px] outline-none resize-none"/>
         </div>
         <a href={waLink} target="_blank" className="flex w-full bg-[#0A2342] hover:bg-black transition text-white justify-center rounded-full py-3.5 font-black text-[13px]">Send on WhatsApp →</a>
         <p className="text-[10px] text-center text-[#0A2342]/40">Pay after trip. No advance link. Free cancel 24h.</p>
       </div>
     </div>
   </div>
 </section>

 {/* HOW IT WORKS */}
 <section className="max-w-6xl mx-auto px-6 md:px-12 py-12">
   <h2 className="font-black text-[24px] md:text-[28px] text-[#0A2342] leading-tight">How booking works</h2>
   <div className="mt-6 grid md:grid-cols-4 gap-4">
     <div className="bg-white rounded-[16px] border border-black/5 p-5">
       <p className="w-7 h-7 rounded-full bg-[#0A2342] text-white flex items-center justify-center text-[11px] font-black">1</p>
       <p className="font-black text-[13px] text-[#0A2342] mt-3">You message</p>
       <p className="text-[12px] text-[#0A2342]/60 mt-2 leading-relaxed">Hotel, date, people. We reply with fixed price per car. Example: Airport to Paje $40 per car for up to 6 pax.</p>
     </div>
     <div className="bg-white rounded-[16px] border border-black/5 p-5">
       <p className="w-7 h-7 rounded-full bg-[#0A2342] text-white flex items-center justify-center text-[11px] font-black">2</p>
       <p className="font-black text-[13px] text-[#0A2342] mt-3">We confirm driver</p>
       <p className="text-[12px] text-[#0A2342]/60 mt-2 leading-relaxed">Driver name, photo, phone, plate sent on WhatsApp. Flight tracked, 60 min free wait after landing.</p>
     </div>
     <div className="bg-white rounded-[16px] border border-black/5 p-5">
       <p className="w-7 h-7 rounded-full bg-[#0A2342] text-white flex items-center justify-center text-[11px] font-black">3</p>
       <p className="font-black text-[13px] text-[#0A2342] mt-3">You ride</p>
       <p className="text-[12px] text-[#0A2342]/60 mt-2 leading-relaxed">Name sign at arrivals, AC Alphard/Noah, water, child seat if requested. No night surcharge.</p>
     </div>
     <div className="bg-[#0A2342] rounded-[16px] p-5 text-white">
       <p className="w-7 h-7 rounded-full bg-[#FF8A1A] text-white flex items-center justify-center text-[11px] font-black">4</p>
       <p className="font-black text-[13px] mt-3">Pay after</p>
       <p className="text-[12px] opacity-75 mt-2 leading-relaxed">Pay driver after each trip — USD, TZS, Euro, M-Pesa. Receipt on WhatsApp. Free cancel 24h.</p>
     </div>
   </div>
 </section>

 {/* FAQ */}
 <section className="bg-white border-t border-black/5">
   <div className="max-w-6xl mx-auto px-6 md:px-12 py-12 grid md:grid-cols-2 gap-10">
     <div>
       <h3 className="font-black text-[20px] text-[#0A2342]">Common questions — straight answers</h3>
       <div className="mt-6 space-y-5">
         <div><p className="font-black text-[13px] text-[#0A2342]">Per person or per car?</p><p className="text-[12px] text-[#0A2342]/65 mt-1 leading-relaxed">Per car. Up to 6 people, same car, same price. Airport to Nungwi $40 per car = $40 total, not $40 × 4. Prison + Nakupenda $250 per car = boat for up to 6.</p></div>
         <div><p className="font-black text-[13px] text-[#0A2342]">Do you take advance?</p><p className="text-[12px] text-[#0A2342]/65 mt-1 leading-relaxed">No. Pay driver after trip. Only exception is Private Safari Blue when boat owner asks for deposit — we tell you upfront.</p></div>
         <div><p className="font-black text-[13px] text-[#0A2342]">Flight delayed?</p><p className="text-[12px] text-[#0A2342]/65 mt-1 leading-relaxed">We track your flight. We adjust. 60 min free waiting after landing, no extra charge.</p></div>
       </div>
     </div>
     <div className="bg-[#F8FAFF] rounded-[18px] border border-black/5 p-6">
       <p className="font-black text-[13px] text-[#0A2342]">Fixed per car — 24/7, same price day & night</p>
       <div className="mt-4 grid grid-cols-2 gap-2 text-[11px]">
         <div className="bg-white rounded-full px-3 py-2 border">Stone Town — $15 /car</div>
         <div className="bg-white rounded-full px-3 py-2 border">Paje / Jambiani — $40 /car</div>
         <div className="bg-white rounded-full px-3 py-2 border">Nungwi / Kendwa — $40 /car</div>
         <div className="bg-white rounded-full px-3 py-2 border">Matemwe — $40 /car</div>
         <div className="bg-white rounded-full px-3 py-2 border">Kiwengwa — $35 /car</div>
         <div className="bg-white rounded-full px-3 py-2 border">Fumba / Kizimkazi — $40 /car</div>
       </div>
       <p className="text-[11px] text-[#0A2342]/50 mt-4 leading-relaxed">Licensed, insured, AC, child seat free if requested. Water per person. Based in Stone Town, teams in Nungwi, Paje, Kizimkazi.</p>
     </div>
   </div>
 </section>

 <Footer/>
 </main>
 )
}