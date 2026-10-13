"use client"
import { useState, useEffect } from "react"

export default function FloatingWhatsApp(){
  const [waNumber, setWaNumber] = useState("255773628792")
  const [showTooltip, setShowTooltip] = useState(false)
  const [hasNewMessage, setHasNewMessage] = useState(true)

  useEffect(()=>{
    // Read real number from Admin settings
    try{
      const raw = localStorage.getItem("hero_settings")
      if(raw){ const s=JSON.parse(raw); if(s.whatsapp) setWaNumber(s.whatsapp) }
    }catch{}

    // Show tooltip after 5 sec to attract attention, then hide after 8 sec
    const t1 = setTimeout(()=> setShowTooltip(true), 5000)
    const t2 = setTimeout(()=> setShowTooltip(false), 13000)

    // Pulse dot every 3 sec
    const iv = setInterval(()=> setHasNewMessage(v=>!v), 3000)
    return ()=>{ clearTimeout(t1); clearTimeout(t2); clearInterval(iv) }
  },[])

  const message = "Jambo HERO! I'm on your website and need help with transfer / tour. My hotel is..."

  return (
    <>
      {/* Tooltip - shows once to new visitors */}
      {showTooltip && (
        <div className="fixed bottom-[92px] right-5 md:right-6 z-[999] bg-[#0A2342] text-white px-4 py-3 rounded-[14px] shadow-2xl max-w-[280px] animate-bounce">
          <p className="font-black text-[13px]">Need help? Chat with our Stone Town team 👋</p>
          <p className="text-[11px] opacity-70 mt-1">We reply in 2 minutes • Pay after trip • Real local team</p>
          <button onClick={()=>setShowTooltip(false)} className="absolute -top-2 -right-2 w-6 h-6 bg-white text-[#0A2342] rounded-full text-[12px] font-black">×</button>
          <div className="absolute -bottom-1.5 right-8 w-3 h-3 bg-[#0A2342] rotate-45"></div>
        </div>
      )}

      {/* Floating Button - Big + Visible + Pulse */}
      <a
        href={`https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`}
        target="_blank"
        className="fixed bottom-5 right-5 md:bottom-6 md:right-6 z-[998] group"
        aria-label="Chat on WhatsApp"
      >
        <div className="relative">
          {/* Pulse rings */}
          <div className="absolute inset-0 bg-[#25D366] rounded-full animate-ping opacity-30"></div>
          <div className="absolute inset-0 bg-[#25D366] rounded-full animate-ping opacity-20" style={{ animationDelay:'0.5s' }}></div>

          {/* Main button */}
          <div className="relative w-[62px] h-[62px] md:w-[68px] md:h-[68px] bg-[#25D366] hover:bg-[#128C7E] rounded-full shadow-[0_8px_24px_rgba(37,211,102,0.5)] flex items-center justify-center transition-all hover:scale-105 active:scale-95">
            {/* WhatsApp Icon SVG */}
            <svg className="w-8 h-8 md:w-9 md:h-9 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.117.549 4.107 1.51 5.833L0 24l6.335-1.652A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm5.894 17.558c-.242.684-1.41 1.25-1.962 1.33-.552.08-1.09.054-1.797-.08-.608-.118-1.38-.394-2.38-.77-2.089-.79-3.43-2.64-3.93-3.12-.5-.48-2.04-2.04-2.04-3.89 0-1.85 1.21-2.76 1.64-3.14.43-.38 1.09-.38 1.33-.38h.96c.24 0.54 0.78.6.24.6.88 2.08.96 2.23.08.15.14.32.02.52-.12.2-.18.32-.36.5-.18.18-.38.38-.54.52-.16.14-.33.29-.14.57.19.28.86 1.42 1.84 2.3 1.26 1.13 2.32 1.48 2.65 1.64.33.16.52.14.71-.08.19-.22.82-.96 1.04-1.29.22-.33.44-.28.74-.17.3.11 1.9.9 2.23 1.06.33.16.55.24.63.38.08.14.08.8-.16 1.48z"/>
            </svg>

            {/* Online dot */}
            <span className={`absolute top-1 right-1 w-3.5 h-3.5 bg-green-400 border-2 border-white rounded-full ${hasNewMessage? 'animate-pulse' : ''}`}></span>

            {/* Message count */}
            <span className="absolute -top-1 -left-1 bg-[#FF3B30] text-white text-[11px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">1</span>
          </div>
        </div>

        {/* Label on hover - desktop only */}
        <div className="hidden md:block absolute right-[76px] top-1/2 -translate-y-1/2 bg-[#0A2342] text-white px-4 py-2 rounded-full text-[12px] font-black whitespace-nowrap opacity-0 group-hover:opacity-100 transition shadow-lg">
          Chat on WhatsApp • Reply in 2 min
        </div>
      </a>

      {/* Bottom spacing so cart not hidden on mobile */}
      <style>{`
        @media (max-width: 768px) {
          body { padding-bottom: 20px; }
        }
      `}</style>
    </>
  )
}