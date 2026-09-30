export default function PricingSection(){
 return (
  <section className="px-4 md:px-12 py-8 bg-white">
    <h2 className="text-center font-black text-[18px]">Transparent Pricing - Airport Transfers</h2>
    <p className="text-center text-[11px] opacity-60 mb-5">Fixed prices. No surprises.</p>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {[
        {t:"Airport to Stone Town",p:"$25 - 15-20 min",d:"Sedan/SUV - Up to 4 pax"},
        {t:"Airport to Stone Town (Van)",p:"$35 - 15-20 min",d:"Van - Up to 7 pax"},
        {t:"Airport to Nungwi",p:"$50 - 60-75 min",d:"Sedan/SUV - Up to 4 pax"},
        {t:"Airport to Nungwi (Van)",p:"$70 - 60-75 min",d:"Van - Up to 7 pax"},
        {t:"Airport to Paje",p:"$35 - 45-55 min",d:"Sedan/SUV - Up to 4 pax"},
        {t:"Airport to Paje (Van)",p:"$50 - 45-55 min",d:"Van - Up to 7 pax"},
        {t:"Airport to Kendwa",p:"$50 - 60-70 min",d:"Sedan/SUV - Up to 4 pax"},
        {t:"Airport to Kendwa (Van)",p:"$70 - 60-70 min",d:"Van - Up to 7 pax"},
      ].map((x)=>(
        <div key={x.t} className="bg-white border shadow-sm rounded-lg p-3 text-[11px]">
          <p className="text-[#FF7A00]">??</p><p className="font-bold mt-1">{x.t}</p><p className="text-[#FF7A00] font-bold mt-1">{x.p}</p><p className="opacity-60 text-[10px] mt-1">{x.d}</p>
        </div>
      ))}
    </div>
  </section>
 )
}
