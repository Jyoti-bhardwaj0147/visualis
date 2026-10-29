import type { Metadata } from "next";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { Header } from "@/components/layout/Header";
import { BackToTop } from "@/components/layout/BackToTop";
import "lenis/dist/lenis.css";
import localFont from "next/font/local";
import "./globals.css";

const focusOrbitVisitScript = `try{if(location.pathname==='/'&&!matchMedia('(prefers-reduced-motion: reduce)').matches&&!sessionStorage.getItem('visualis-focus-orbit-v2-seen')){document.documentElement.classList.add('focus-orbit-intro');setTimeout(function(){document.documentElement.classList.remove('focus-orbit-intro')},4000)}}catch(e){}`;

export const metadata: Metadata = {
  title: {
    default: "Visualis — A little focus. A little calm.",
    template: "%s | Visualis",
  },
  description:
    "Guided visual-focus and eye-movement exercises for mindful screen breaks. Simple sessions, your own pace, and private local progress.",
};

const fraunces = localFont({
  src: "./fonts/Fraunces-VariableFont_SOFT,WONK,opsz,wght.ttf",
  variable: "--font-fraunces",
  weight: "100 900",
  display: "swap",
});
const dmSans = localFont({
  src: "./fonts/DMSans-VariableFont_opsz,wght.ttf",
  variable: "--font-dm-sans",
  weight: "100 900",
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${fraunces.variable} ${dmSans.variable}`} suppressHydrationWarning>
      <head>
        <script
          type={typeof window === "undefined" ? "text/javascript" : "text/plain"}
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: focusOrbitVisitScript }}
        />
      </head>
      <body>
        <SmoothScroll />
        <Header />
        {children}
        <BackToTop />
      </body>
    </html>
  );
}
