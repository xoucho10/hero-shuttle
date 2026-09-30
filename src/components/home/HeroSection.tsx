export default function HeroSection(){
 return (
  <section className="bg-[#0A2342] relative overflow-hidden">
    <div className="grid md:grid-cols-2 px-6 md:px-12 py-8 md:py-10 items-center relative z-10">
      <div className="text-white">
        <h1 className="text-[32px] leading-[1.1] font-black">Luxury Shuttle & Tours<br/>in Zanzibar</h1>
        <p className="text-[13px] mt-2 opacity-80">Safe - Reliable - Professional Transfers & Tours</p>
        <div className="mt-5 grid grid-cols-2 gap-2 bg-black/30 backdrop-blur p-3 rounded-lg border border-white/10 text-[11px]">
          <span>?? Airport - Stone Town <b className="text-[#FFB86A]">$25</b></span>
          <span>?? Airport - Nungwi <b className="text-[#FFB86A]">$50</b></span>
          <span>?? Airport - Paje <b className="text-[#FFB86A]">$35</b></span>
          <span>?? Airport - Kendwa <b className="text-[#FFB86A]">$50</b></span>
        </div>
        <a href="https://wa.me/255777123456" className="inline-flex mt-4 bg-[#FF8A1A] text-white px-5 py-2 rounded-full text-xs font-bold">Book on WhatsApp</a>
      </div>
      <div className="mt-6 md:mt-0">
        <img src="/hero.jpg" alt="Hero" className="w-full max-w-[560px] mx-auto rounded-xl object-cover shadow-2xl" />
      </div>
    </div>
  </section>
 )
}
