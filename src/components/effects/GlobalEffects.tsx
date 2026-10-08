"use client"
import { motion } from "framer-motion"

export function GlobalEffects(){
 return (
  <>
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <motion.div animate={{ x:[0,100,0], y:[0,60,0] }} transition={{ duration:18, repeat:Infinity, ease:"easeInOut" }} className="absolute -top-[20%] -left-[10%] w-[600px] h-[600px] bg-[#FF8A1A]/12 rounded-full blur-[90px]" />
      <motion.div animate={{ x:[0,-80,0], y:[0,100,0] }} transition={{ duration:22, repeat:Infinity, ease:"easeInOut" }} className="absolute top-[30%] -right-[10%] w-[700px] h-[700px] bg-[#0A2342]/8 rounded-full blur-[100px]" />
      <motion.div animate={{ x:[0,60,0], y:[0,-80,0] }} transition={{ duration:20, repeat:Infinity, ease:"easeInOut" }} className="absolute -bottom-[20%] left-[20%] w-[600px] h-[600px] bg-[#EAF2FF] rounded-full blur-[90px]" />
    </div>
    <style>{`
      * { scroll-behavior: smooth; }
      button, a { transition: all 0.25s ease; }
      button:hover { transform: translateY(-1px); }
      .card-mesmerize { transition: all 0.4s cubic-bezier(0.175,0.885,0.32,1.275); }
      .card-mesmerize:hover { transform: translateY(-6px) scale(1.01); box-shadow: 0 20px 40px rgba(10,35,66,0.12); }
      .shimmer { position:relative; overflow:hidden; }
      .shimmer:after { content:''; position:absolute; top:0; left:-100%; width:100%; height:100%; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent); animation: shimmer 2.5s infinite; }
      @keyframes shimmer { 100% { left:100% } }
      ::-webkit-scrollbar { width:8px; } ::-webkit-scrollbar-thumb { background:#0A2342; border-radius:10px; }
    `}</style>
  </>
 )
}
