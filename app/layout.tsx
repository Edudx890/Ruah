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
    "Assessoria estratégica de alto padrão conectando setor privado e governamental. Excelência em consultoria, gestão de projetos e comércio internacional.",

  // 🔥 Favicon e ícones
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/apple-icon.png",
  },

  // 🔥 Open Graph (quando compartilha link)
  openGraph: {
    title: "RUAH Assessoria",
    description:
      "Consultoria estratégica de alto padrão conectando setor privado e governamental.",
    url: "https://ruahconsult.com",
    siteName: "RUAH Assessoria",
    images: [
      {
        url: "https://ruahconsult.com/logo.png",
        width: 512,
        height: 512,
        alt: "RUAH Assessoria",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
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
      <head>
        {/* 🔥 SEO - Logo para Google */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "RUAH Assessoria",
              url: "https://ruahconsult.com",
              logo: "https://ruahconsult.com/logo.png",
            }),
          }}
        />
      </head>

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