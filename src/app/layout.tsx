import type { Metadata } from "next";
import "./globals.css";
import { GlobalEffects } from "@/components/effects/GlobalEffects";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "HERO Shuttle & Tours - Private Zanzibar Transfers & Tours",
  description: "Private Zanzibar Airport Transfers and Private Tours - Licensed local team based in Stone Town, Nungwi, Paje. Private vehicle for your group, pay after trip, free cancellation 24h.",
  icons: {
    icon: "/icon.png",
    shortcut: "/favicon.ico",
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="overflow-x-hidden">
      <body className="bg-white text-[#0A2342] overflow-x-hidden min-w-0 antialiased">
        <GlobalEffects />
        {children}
        <FloatingWhatsApp />
      </body>
    </html>
  );
}