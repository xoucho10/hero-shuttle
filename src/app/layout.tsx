import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'HERO SHUTTLE & TOURS ZANZIBAR | Luxury Transfers',
  description: 'Safe Reliable Professional Transfers & Tours in Zanzibar',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white antialiased">{children}</body>
    </html>
  )
}
