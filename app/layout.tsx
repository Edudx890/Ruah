import type React from "react"
import type { Metadata } from "next"
import { Playfair_Display, Open_Sans } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Toaster } from "@/components/ui/toaster"
import { Suspense } from "react"
import AOSInitializer from "./AOSInitializer"
import "./globals.css"

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair-display",
  display: "swap",
})

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
  display: "swap",
})

export const metadata: Metadata = {
  title: "RUAH - Assessoria, Consultoria e Comércio",
  description:
    "Conectando setores, construindo futuros. Ponte estratégica entre o setor privado e a esfera governamental.",
  generator: "v0.app",
}

export default function LayoutRaiz({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
<body
  className={`font-sans ${playfairDisplay.variable} ${openSans.variable} bg-green-light relative overflow-x-hidden shadow-lateral`}
>

        <Suspense fallback={null}>
          <AOSInitializer />
          {children}
          <Toaster />
        </Suspense>
        <Analytics />
      </body>
    </html>
  )
}
