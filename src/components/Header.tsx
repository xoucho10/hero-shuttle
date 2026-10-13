"use client"
import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Header(){
 const [open,setOpen]=useState(false)
 const path=usePathname()
 const links=[
  {name:"Home", href:"/"},
  {name:"Transfers", href:"/airport-transfers"},
  {name:"Tours", href:"/tours"},
  {name:"About", href:"/about"},
  {name:"Guides", href:"/blogs"},
  {name:"Contact", href:"/contact"},
 ]
 return (
  <nav className="bg-[#FF8A00] shadow-md sticky top-0 z-[100] px-4 md:px-8 py-2 flex justify-between items-center">
    {/* LEFT - Big Logo - Company color restored */}
    <Link href="/" className="flex items-center gap-3">
      <img src="/logo.png" alt="HERO SHUTTLE TOURS ZANZIBAR" className="w-[64px] h-[64px] md:w-[84px] md:h-[84px] rounded-full object-cover bg-white p-1.5 shadow-md border-2 border-white" onError={(e)=>{(e.target as any).src='/hero.jpg'}} />
      <div className="hidden md:block leading-tight">
        <p className="font-black text-[16px] text-black tracking-tight">HERO SHUTTLE</p>
        <p className="font-bold text-[11px] text-black/70 tracking-widest -mt-0.5">ZANZIBAR TOURS</p>
      </div>
    </Link>

    {/* RIGHT - Nav + Big Button - No WhatsApp/Call (floating covers it) */}
    <div className="flex items-center gap-6 md:gap-8">
      <div className="hidden lg:flex items-center gap-6 text-[13.5px] font-bold">
        {links.map(l=>(
          <Link key={l.href} href={l.href} className={`transition ${path===l.href? "text-black font-black border-b-2 border-black pb-1" : "text-white hover:text-black"}`}>{l.name}</Link>
        ))}
      </div>

      <div className="flex items-center gap-3">
        <Link href="/tours" className="hidden md:inline-flex bg-black hover:bg-[#0A2342] text-white px-7 py-3.5 rounded-full text-[13px] font-black shadow-md transition">
          Build Itinerary →
        </Link>
        <button onClick={()=>setOpen(!open)} className="lg:hidden w-12 h-12 bg-black rounded-full flex flex-col items-center justify-center gap-1 shadow-md">
          <div className="w-5 h-0.5 bg-white mb-0.5"></div><div className="w-5 h-0.5 bg-white mb-0.5"></div><div className="w-5 h-0.5 bg-white"></div>
        </button>
      </div>
    </div>

    {open && (
      <div className="lg:hidden fixed top-[80px] md:top-[100px] left-0 w-full bg-[#FF8A00] border-t border-white/20 shadow-xl z-[99] p-5 flex flex-col">
        {links.map(l=>(
          <Link key={l.href} href={l.href} onClick={()=>setOpen(false)} className={`py-4 text-[15px] font-black border-b border-white/20 ${path===l.href? 'text-black' : 'text-white'}`}>{l.name}</Link>
        ))}
        <Link href="/tours" onClick={()=>setOpen(false)} className="mt-5 bg-black text-white text-center py-4 rounded-full font-black text-[15px] shadow-md">Build Itinerary →</Link>
        <p className="text-[11px] text-center text-white/80 mt-4 font-bold">Licensed Operator • Pay After Trip • Floating WhatsApp 24/7</p>
      </div>
    )}
  </nav>
 )
}