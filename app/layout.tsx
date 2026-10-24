import type { Metadata } from "next";
import { BackToTop } from "@/components/layout/BackToTop";
import "./globals.css";
export const metadata: Metadata = {
  title: {
    default: "Visualis — A little focus. A little calm.",
    template: "%s | Visualis",
  },
  description:
    "Guided visual-focus and eye-movement exercises for mindful screen breaks. Simple sessions, your own pace, and private local progress.",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        {children}
        <BackToTop />
      </body>
    </html>
  );
}
