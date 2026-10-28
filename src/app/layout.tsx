import type { Metadata } from "next";
import "./globals.css";
import { GlobalEffects } from "@/components/effects/GlobalEffects";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import Script from "next/script";

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
        {/* Google Analytics - Hero Shuttle G-4EQ4SW354T */}
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-4EQ4SW354T" strategy="afterInteractive" />
        <Script id="ga-hero-shuttle" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-4EQ4SW354T');
          `}
        </Script>

        {/* Meta Pixel Code - Hero Shuttle Tours 29302252172745643 */}
        <Script id="fb-pixel-hero" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '29302252172745643');
            fbq('track', 'PageView');
          `}
        </Script>
        <noscript>
          <img height="1" width="1" style={{display:'none'}}
            src="https://www.facebook.com/tr?id=29302252172745643&ev=PageView&noscript=1"
          />
        </noscript>

        <GlobalEffects />
        {children}
        <FloatingWhatsApp />
      </body>
    </html>
  );
}