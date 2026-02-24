import type React from "react"
import type { Metadata, Viewport } from "next"
import { Playfair_Display, Lato } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Toaster } from "@/components/ui/toaster"
import { Suspense } from "react"
import "./globals.css"

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair-display",
  display: "swap",
})

const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-lato",
  display: "swap",
})

export const metadata: Metadata = {
  title: "RUAH Assessoria | Conectando Setores, Construindo Futuros",
  description:
    "Assessoria estrategica de alto padrao conectando setor privado e governamental. Excelencia em consultoria, gestao de projetos e comercio internacional.",
}

export const viewport: Viewport = {
  themeColor: "#3E2723",
  width: "device-width",
  initialScale: 1,
}

export default function LayoutRaiz({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className={`font-sans ${playfairDisplay.variable} ${lato.variable}`}>
        <Suspense fallback={null}>
          {children}
          <Toaster />
        </Suspense>
        <Analytics />
      </body>
    </html>
  )
}
