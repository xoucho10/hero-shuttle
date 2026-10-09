import type { Metadata } from "next";
import "./globals.css";
import { GlobalEffects } from "@/components/effects/GlobalEffects";

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "HERO Shuttle & Tours - Zanzibar Transfers per CAR",
  description: "Zanzibar Airport Transfers and Tours - Price per CAR up to 6 pax same price - Pay after trip",
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
      </body>
    </html>
  );
}



