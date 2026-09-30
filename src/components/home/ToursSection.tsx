export default function ToursSection(){
 return (
  <>
    <section className="bg-[#0A2342] py-6 px-4 md:px-12">
      <p className="text-white text-center text-[12px] mb-4 opacity-80">Search transfers & tours in seconds</p>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {[
          {n:"Prison Island",r:"4.8 (120)",pr:"$30 /person"},
          {n:"Stone Town",r:"4.9 (210)",pr:"$25 /person"},
          {n:"Spice Tour",r:"4.7 (98)",pr:"$22 /person"},
          {n:"Mnemba",r:"4.9 (156)",pr:"$45 /person"},
          {n:"Nakupenda",r:"4.8 (134)",pr:"$40 /person"},
          {n:"Jozani",r:"4.6 (89)",pr:"$38 /person"},
          {n:"Sunset Dhow",r:"4.9 (203)",pr:"$35 /person"},
          {n:"Kizimkazi Dolphin",r:"4.7 (92)",pr:"$32 /person"},
          {n:"Kuza Cave",r:"4.6 (67)",pr:"$22 /person"},
          {n:"Salaam Cave",r:"4.6 (54)",pr:"Book Now"},
        ].map((x)=>(
          <div key={x.n} className="bg-white rounded-lg p-1.5">
            <div className="w-full h-20 bg-gray-200 rounded-md"></div>
            <p className="font-bold text-[11px] mt-1.5 px-1">{x.n}</p>
            <p className="text-[10px] px-1">? {x.r}</p>
            <p className="text-[#FF7A00] font-bold text-[11px] px-1 pb-1">{x.pr}</p>
          </div>
        ))}
      </div>
    </section>
    <section className="bg-[#F5F7FA] py-6 px-4 md:px-12">
      <h3 className="font-black text-center text-sm">Frequently Asked Questions</h3>
      <div className="grid md:grid-cols-4 gap-3 mt-4">
        {[1,2,3,4].map((i)=>(
          <div key={i} className="bg-white rounded-lg shadow-sm p-3 text-[11px]">
            <div className="h-16 bg-gray-200 rounded mb-2"></div>
            <p className="font-bold">Best Time to Visit Zanzibar</p>
            <p className="opacity-60 mt-1 text-[10px]">Tips for transfers.</p>
          </div>
        ))}
      </div>
    </section>
  </>
 )
}
