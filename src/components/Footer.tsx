"use client"
export default function Footer(){
 return (
  <footer className="bg-[#0A2342] text-white pt-10 pb-24 md:pb-10">
    {/* Trust Strip */}
    <div className="mx-4 md:mx-12 bg-white rounded-2xl p-4 grid grid-cols-2 md:grid-cols-5 gap-4 items-center text-black">
      <div className="flex items-center gap-2">
        <img src="https://www.tripadvisor.com/img/cdsi/img2/branding/v2/Tripadvisor_lockup_horizontal_secondary_registered-18034-2.svg" alt="TripAdvisor" className="h-6" />
        <span className="text-[11px] font-bold">4.9 ★ 324 reviews</span>
      </div>
      <div className="text-[11px]">⭐⭐⭐⭐⭐ <b>Google</b> 4.9 (412)</div>
      <div className="text-[11px]">🟢 <b>GetYourGuide</b> 4.8 Excellent</div>
      <div className="text-[11px]">🔵 <b>Viator</b> 5.0 Travelers Choice</div>
      <div className="text-[10px] opacity-70">Licensed Zanzibar Tourism • Secure Payments</div>
    </div>

    <div className="px-6 md:px-12 mt-8 grid md:grid-cols-4 gap-8">
      <div>
        {/* LOGO FIX - use dark bg invert if logo is white */}
        <div className="bg-white rounded-xl p-2 w-fit">
          <img src="/logo.png" alt="HERO Shuttle" className="h-10 object-contain" onError={(e)=>e.currentTarget.src='/hero.jpg'} />
        </div>
        <p className="text-[12px] mt-3 opacity-70">Safe, Reliable, Professional transfers & tours in Zanzibar. Fixed price, no surprises.</p>
        <div className="flex gap-2 mt-3 text-[11px]">
          <a href="https://wa.me/255777123456" className="bg-[#25D366] px-3 py-1.5 rounded-full font-bold">WhatsApp</a>
          <a href="tel:+255777123456" className="bg-white/10 border border-white/20 px-3 py-1.5 rounded-full">Call Us</a>
        </div>
      </div>
      <div className="text-[12px] space-y-2"><p className="font-black">Transfers</p><p className="opacity-60">Airport to Stone Town</p><p className="opacity-60">Airport to Nungwi</p><p className="opacity-60">Airport to Paje</p></div>
      <div className="text-[12px] space-y-2"><p className="font-black">Tours</p><p className="opacity-60">Prison Island</p><p className="opacity-60">Mnemba Snorkel</p><p className="opacity-60">Spice Tour</p></div>
      <div className="text-[12px] space-y-2"><p className="font-black">Contact</p><p className="opacity-60">+255 777 123 456</p><p className="opacity-60">hello@heroshuttle.co.tz</p><p className="opacity-60">Zanzibar, Tanzania</p></div>
    </div>
    <p className="text-center text-[10px] opacity-40 mt-8">© 2026 HERO Shuttle & Tours — All rights reserved</p>
    <div className="max-w-6xl mx-auto px-6 md:px-12 py-6 border-t border-white/10 text-[11px] text-white/50">
    <p className="font-black text-white/80">Small guides - find us by any phrase:</p>
    <div className="flex flex-wrap gap-2 mt-2">
      <a href="/zanzibar-island" className="underline">Zanzibar Island Guide</a>
      <a href="/blogs/zanzibar-airport-to-paje-distance" className="underline">Airport to Paje distance</a>
      <a href="/blogs/rock-restaurant-tide-time" className="underline">Rock Restaurant tide</a>
      <a href="/blogs/nakupenda-sandbank-disappearing" className="underline">Nakupenda disappearing</a>
      <a href="/blogs/zanzibar-per-car-not-per-person" className="underline">Per CAR not per person</a>
      <a href="/airport-transfers" className="underline">Transfers $15-$40 per CAR</a>
      <a href="/blogs" className="underline">All Guides</a>
    </div>
  </div>
</footer>
 )
}

