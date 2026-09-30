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
  {name:"Tours & Excursions", href:"/tours"},
  {name:"Car Rentals", href:"/car-rentals"},
  {name:"About", href:"/about"},
  {name:"Blog", href:"/blog"},
  {name:"Contact", href:"/contact"},
 ]
 return (
  <nav className="bg-[#FF8A00] shadow-sm sticky top-0 z-[100] px-4 md:px-6 py-2 flex justify-between items-center">
    {/* LEFT - Logo only */}
    <Link href="/" className="flex items-center gap-2">
      <img src="/logo.png" alt="HERO SHUTTLE TOURS ZANZIBAR" className="w-[72px] h-[72px] md:w-[96px] md:h-[96px] rounded-full object-cover bg-white p-1 shadow-sm" />
    </Link>

    {/* RIGHT - Navbar + CTA */}
    <div className="flex items-center gap-5 md:gap-6">
      <div className="hidden lg:flex items-center gap-5 text-[12.5px] font-medium">
        {links.map(l=>(
          <Link key={l.href} href={l.href} className={path===l.href? "text-black font-bold" : "text-white hover:text-black transition"}>{l.name}</Link>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <a href="https://wa.me/255777123456" target="_blank" className="hidden lg:inline-flex bg-[#25D366] hover:bg-[#128C7E] text-white px-5 py-2 rounded-full text-[12px] font-semibold shadow-sm transition">Book on WhatsApp</a>
        <button onClick={()=>setOpen(!open)} className="lg:hidden p-2">
          <div className="w-5 h-0.5 bg-black mb-1"></div><div className="w-5 h-0.5 bg-black mb-1"></div><div className="w-5 h-0.5 bg-black"></div>
        </button>
      </div>
    </div>

    {open && (
      <div className="lg:hidden fixed top-[88px] left-0 w-full bg-[#FF8A00] border-t border-white/20 shadow-lg z-[99] p-4 flex flex-col">
        {links.map(l=>(
          <Link key={l.href} href={l.href} onClick={()=>setOpen(false)} className={`py-2.5 text-[13px] border-b border-white/20 ${path===l.href? 'font-bold text-black' : 'text-white'}`}>{l.name}</Link>
        ))}
        <a href="https://wa.me/255777123456" className="mt-3 bg-[#25D366] text-white text-center py-2.5 rounded-full font-semibold text-[13px]">Book on WhatsApp</a>
      </div>
    )}
  </nav>
 )
}