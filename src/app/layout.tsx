import type { Metadata } from "next";
import "./globals.css";
import { GlobalEffects } from "@/components/effects/GlobalEffects";

export const metadata: Metadata = {
  title: "HERO Shuttle & Tours - Zanzibar Transfers per CAR",
  description: "Zanzibar Airport Transfers and Tours - Price per CAR up to 6 pax same price - Pay after trip",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white antialiased">
        <GlobalEffects />
        {children}
      </body>
    </html>
  );
}
