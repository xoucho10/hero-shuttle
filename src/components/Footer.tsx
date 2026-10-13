"use client"
import Link from 'next/link'

export default function Footer(){
 const waHero = "255773628792"
 const waDev = "256700568634"

 return (
  <footer className="bg-[#0A2342] text-white">
    {/* Trust Bar - Real, no fake numbers */}
    <div className="border-b border-white/10 bg-[#081c36]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-4 flex flex-wrap gap-4 md:gap-8 items-center text-[11px]">
        <span className="font-black tracking-widest opacity-60">TRUSTED BY TRAVELERS:</span>
        <span className="flex items-center gap-1.5"><span className="w-2 h-2 bg-green-500 rounded-full"></span> Licensed Zanzibar Tourism Operator</span>
        <span className="flex items-center gap-1.5"><span className="w-2 h-2 bg-green-500 rounded-full"></span> Insured Vehicles • AC • Child Seat Free</span>
        <span className="flex items-center gap-1.5"><span className="w-2 h-2 bg-green-500 rounded-full"></span> Pay After Trip • Free Cancel 24h</span>
        <span className="opacity-60 hidden md:inline">Stone Town Based • Teams in Nungwi, Paje, Kizimkazi, Fumba</span>
        <a href="#reviews" className="ml-auto bg-white text-[#0A2342] px-4 py-1.5 rounded-full font-black text-[10px]">★ Read Verified Reviews</a>
      </div>
    </div>

    <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-12 grid md:grid-cols-12 gap-10">
      <div className="md:col-span-4">
        <div className="bg-white rounded-[12px] p-2.5 w-fit">
          <img src="/logo.png" alt="HERO Shuttle & Tours Zanzibar" className="h-9 object-contain" onError={(e)=>{ (e.target as any).src='/hero.jpg' }} />
        </div>
        <p className="text-[12.5px] mt-4 opacity-70 leading-relaxed max-w-[340px]">Local team of drivers and guides based in Stone Town, Nungwi and Paje. We operate private Zanzibar airport transfers and private tours including Prison Island, Nakupenda, Mnemba, Safari Blue, Stone Town, Jozani Forest and Spice Farm. Transparent fixed pricing for your group.</p>
        <div className="flex gap-2 mt-5">
          <a href={`https://wa.me/${waHero}?text=Hi HERO! I have a question`} target="_blank" className="bg-[#25D366] text-white px-5 py-2.5 rounded-full font-black text-[11px]">WhatsApp HERO</a>
          <a href="tel:+255773628792" className="bg-white/10 border border-white/20 px-5 py-2.5 rounded-full font-black text-[11px]">Call +255 773 628 792</a>
        </div>
        <div className="mt-5 text-[11px] opacity-50 space-y-1">
          <p>📍 Stone Town, Zanzibar • Operations: Nungwi, Paje, Jambiani, Kizimkazi, Fumba</p>
          <p>📧 hello@heroshuttle.co.tz • 🕘 24/7 WhatsApp Support</p>
        </div>
      </div>

      <div className="md:col-span-2">
        <p className="font-black text-[12px] tracking-widest">PRIVATE TRANSFERS</p>
        <div className="mt-4 space-y-2.5 text-[12px] opacity-70">
          <Link href="/transfers" className="block hover:opacity-100 hover:underline">Airport to Stone Town</Link>
          <Link href="/transfers" className="block hover:opacity-100 hover:underline">Airport to Nungwi / Kendwa</Link>
          <Link href="/transfers" className="block hover:opacity-100 hover:underline">Airport to Paje / Jambiani</Link>
          <Link href="/transfers" className="block hover:opacity-100 hover:underline">Airport to Kizimkazi / Fumba</Link>
          <Link href="/transfers" className="block hover:opacity-100 hover:underline">Inter-hotel Transfers</Link>
          <Link href="/about" className="block hover:opacity-100 hover:underline mt-3 text-white/90 font-bold">Fixed Price for Group →</Link>
        </div>
      </div>

      <div className="md:col-span-3">
        <p className="font-black text-[12px] tracking-widest">PRIVATE TOURS</p>
        <div className="mt-4 grid grid-cols-2 gap-2.5 text-[12px] opacity-70">
          <Link href="/tours" className="hover:opacity-100 hover:underline">Prison Island + Nakupenda</Link>
          <Link href="/tours" className="hover:opacity-100 hover:underline">Mnemba Atoll Snorkeling</Link>
          <Link href="/tours" className="hover:opacity-100 hover:underline">Safari Blue Full Day BBQ</Link>
          <Link href="/tours" className="hover:opacity-100 hover:underline">Stone Town Walking Tour</Link>
          <Link href="/tours" className="hover:opacity-100 hover:underline">Spice Farm Tour</Link>
          <Link href="/tours" className="hover:opacity-100 hover:underline">Jozani Forest Monkeys</Link>
          <Link href="/tours" className="hover:opacity-100 hover:underline">Salaam Cave Turtles</Link>
          <Link href="/tours" className="hover:opacity-100 hover:underline">Kuza Cave Sacred Swim</Link>
          <Link href="/tours" className="hover:opacity-100 hover:underline">Nungwi Sunset & Dhow</Link>
          <Link href="/tours" className="hover:opacity-100 hover:underline">The Rock Restaurant</Link>
          <Link href="/tours" className="block col-span-2 mt-2 text-white/90 font-bold hover:underline">View All Private Tours →</Link>
        </div>
      </div>

      <div className="md:col-span-3">
        <p className="font-black text-[12px] tracking-widest">TRAVEL GUIDES & INFO</p>
        <div className="mt-4 space-y-2.5 text-[12px] opacity-70">
          <Link href="/blogs" className="block hover:opacity-100 hover:underline">All Zanzibar Travel Guides</Link>
          <Link href="/blogs/prison-island-nakupenda-guide" className="block hover:opacity-100 hover:underline">Prison Island Guide</Link>
          <Link href="/blogs/best-time-to-visit-zanzibar" className="block hover:opacity-100 hover:underline">Best Time to Visit Zanzibar</Link>
          <Link href="/blogs/zanzibar-airport-transfers-guide" className="block hover:opacity-100 hover:underline">Airport Transfers Guide</Link>
          <Link href="/about" className="block hover:opacity-100 hover:underline">About HERO Team</Link>
          <Link href="#reviews" className="block hover:opacity-100 hover:underline">Verified Guest Reviews</Link>
          <div className="mt-4 pt-4 border-t border-white/10">
            <p className="font-black text-white/80 text-[11px]">PAYMENT</p>
            <p className="text-[11px] mt-1">USD • TZS • Euro • M-Pesa • Pay After Trip • Receipt on WhatsApp</p>
            <p className="font-black text-white/80 text-[11px] mt-3">LICENSE</p>
            <p className="text-[11px] mt-1">Licensed Zanzibar Tour Operator • Tourism Plates • Insured</p>
          </div>
        </div>
      </div>
    </div>

    <div className="border-t border-white/10">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-5 flex flex-col md:flex-row justify-between items-center gap-3 text-[11px]">
        <div className="flex flex-wrap gap-2 items-center text-white/50">
          <span>© 2026 HERO Shuttle & Tours • Stone Town, Zanzibar • Private Tours & Airport Transfers</span>
          <span className="hidden md:inline">•</span>
          <Link href="/about" className="underline hover:text-white">About</Link>
          <Link href="/blogs" className="underline hover:text-white">Guides</Link>
          <Link href="/tours" className="underline hover:text-white">Tours</Link>
        </div>

        {/* TALENT256 - Using tdev.png logo */}
        <a href={`https://wa.me/${waDev}?text=Hi T256 Group LTD, I saw your work on HERO Shuttle site`} target="_blank" className="flex items-center gap-2.5 bg-white hover:bg-gray-100 border border-white/10 pl-1.5 pr-3 py-1 rounded-full transition group shadow-sm">
          <img src="/tdev.png" alt="Talent256" className="w-7 h-7 rounded-full object-contain bg-white" onError={(e)=>{ (e.target as any).style.display='none' }} />
          <span className="text-[11px] font-bold text-[#0A2342]/70 group-hover:text-[#0A2342]">Developed by <span className="text-[#0A2342] font-black">TALENT256 GROUP LTD</span></span>
          <span className="text-[9px] bg-[#25D366] text-white px-2 py-0.5 rounded-full font-black">WhatsApp</span>
        </a>
      </div>
    </div>
  </footer>
 )
}