import type { Metadata } from "next";
import { BackToTop } from "@/components/layout/BackToTop";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import "lenis/dist/lenis.css";
import localFont from "next/font/local";
import "./globals.css";

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
    <html lang="en" data-scroll-behavior="smooth" className={`${fraunces.variable} ${dmSans.variable}`}>
      <body>
        <SmoothScroll />
        {children}
        <BackToTop />
      </body>
    </html>
  );
}
