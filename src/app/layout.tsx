import type { Metadata } from "next";
import "./globals.css";
import { GlobalEffects } from "@/components/effects/GlobalEffects";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Hero Shuttle & Tours Zanzibar - Private Transfers & Tours",
  description: "Private Zanzibar Airport Transfers and Private Tours - Licensed local team based in Stone Town, Nungwi, Paje. Private vehicle for your group, pay after trip, free cancellation 24h.",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon.png", sizes: "512x512", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
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