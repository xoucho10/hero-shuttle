export default function ServicesSection(){
 return (
  <>
    <section className="bg-[#FFEBD1] py-6 px-4 md:px-12 text-center">
      <h3 className="font-black text-sm">Our Services</h3>
      <div className="grid grid-cols-3 md:grid-cols-6 gap-4 text-[11px] font-medium mt-4">
        {["Airport Transfers","Private Tours","Group Excursions","Boat Tours","Car Rentals","Meet & Greet"].map((s,i)=>(
          <div key={i} className="flex flex-col items-center gap-2"><div className="w-10 h-10 rounded-full bg-[#FF8A1A] text-white flex items-center justify-center">?</div>{s}</div>
        ))}
      </div>
    </section>
    <section className="bg-white py-4 px-4 md:px-12">
      <h3 className="font-black text-center text-sm mb-3">Plan Your Trip</h3>
      <div className="flex flex-col md:flex-row gap-2 bg-gray-50 p-2 rounded-lg border">
        <div className="flex-1 bg-white border rounded px-3 py-2 text-xs">?? Select Date</div>
        <div className="flex-1 bg-white border rounded px-3 py-2 text-xs">?? 2 Guests</div>
        <button className="bg-[#FF8A1A] text-white px-6 py-2 rounded text-xs font-bold">Search Now</button>
      </div>
    </section>
  </>
 )
}
