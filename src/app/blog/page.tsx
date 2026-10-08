"use client"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
export default function BlogRedirect(){
  const router = useRouter()
  useEffect(()=>{ router.replace("/blogs") },[router])
  return <main className="min-h-screen bg-[#F8FAFF] flex items-center justify-center"><p className="font-black text-[#0A2342]">Redirecting to /blogs...</p></main>
}
