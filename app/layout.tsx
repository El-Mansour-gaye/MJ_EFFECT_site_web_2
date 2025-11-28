import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster as SonnerToaster } from "sonner"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
})

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
})

// <CHANGE> Updated metadata for MJ EFFECT luxury beauty brand
export const metadata: Metadata = {
  title: "MJ Effect : Parfums, Soins & Gommages de Luxe à Dakar",
  description: "Découvrez les meilleurs parfums, brumes, gommages et soins corporels. Qualité premium et prix accessibles en FCFA. Livraison rapide à Dakar.",
  openGraph: {
    site_name: "MJ Effect",
    type: "website",
    locale: "fr_FR",
    images: "/logo-mj-effect.png",
  },
  icons: {
    icon: "/favicon.ico",
  },
}

export const viewport: Viewport = {
  themeColor: "#C9A050",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={`${inter.variable} ${playfairDisplay.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="light">
          <Header />
          <main className="pt-16 lg:pt-20">{children}</main>
          <Footer />
          <SonnerToaster />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
