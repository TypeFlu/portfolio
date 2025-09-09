import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NODE_ENV === "production" ? "https://saksham.typeflu.me" : "http://localhost:3000"
  ),
  title: "Saksham Singla (TypeFlu) - Full Stack Developer",
  description: "My Portfolio Powered By Vercel And Next.js",
  keywords: [
    "TypeScript",
    "React",
    "Next.js",
    "Vue.js",
    "Rust",
    "Go",
    "Full Stack Developer",
    "Web Development",
    "TypeFlu",
  ],
  authors: [{ name: "Saksham Singla", url: "https://github.com/typeflu" }],
  creator: "Saksham Singla",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://saksham.typeflu.me",
    title: "Saksham Singla (TypeFlu) - Full Stack Web Developer",
    description: "My Portfolio Powered By Vercel And Next.js",
    siteName: "TypeFlu Portfolio",
    images: [
      {
        url: "/avatar.png",
        width: 400,
        height: 400,
        alt: "Saksham Singla - TypeFlu",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Saksham Singla (TypeFlu) - Full Stack Web Developer",
    description: "My Portfolio Powered By Vercel And Next.js",
    images: ["/avatar.png"],
  },
  icons: {
    icon: "/avatar.png",
    shortcut: "/avatar.png",
    apple: "/avatar.png",
  },
  manifest: "/manifest.json",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable}`}
      style={
        {
          "--font-geist-sans": GeistSans.style.fontFamily,
          "--font-geist-mono": GeistMono.style.fontFamily,
        } as React.CSSProperties
      }
      suppressHydrationWarning
    >
      <body className="antialiased geist-text">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
