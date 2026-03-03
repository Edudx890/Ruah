import type React from "react"
import type { Metadata, Viewport } from "next"
import { Lato } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Toaster } from "@/components/ui/toaster"
import { Suspense } from "react"
import "./globals.css"

const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "RUAH Assessoria | Conectando Setores, Construindo Futuros",
  description:
    "Assessoria estratégica de alto padrão conectando setor privado e governamental.",
  generator: "v0.app",
}

export const viewport: Viewport = {
  themeColor: "#3E2723",
  width: "device-width",
  initialScale: 1,
}

export default function LayoutRaiz({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      {/* Fonte aplicada globalmente aqui */}
      <body className={.className}>
        <Suspense fallback={null}>
          {children}
          <Toaster />
        </Suspense>
        <Analytics />
      </body>
    </html>
  )
}