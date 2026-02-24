"use client"

import { useEffect, useState } from "react"
import { Phone } from "lucide-react"

export function BotaoWhatsApp() {
  const [visivel, setVisivel] = useState(false)

  useEffect(() => {
    const aoRolar = () => {
      setVisivel(window.pageYOffset > 300)
    }
    window.addEventListener("scroll", aoRolar)
    return () => window.removeEventListener("scroll", aoRolar)
  }, [])

  return (
    <a
      href="https://wa.me/5579988565263"
      target="_blank"
      rel="noopener noreferrer"
      className={`fixed bottom-6 right-6 bg-ruah-gold hover:bg-ruah-gold-light text-ruah-warm-white p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 z-50 group flex items-center justify-center w-14 h-14 ${
        visivel ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
      aria-label="Contato via WhatsApp"
    >
      <Phone className="w-6 h-6" />
      <span className="absolute right-16 bg-ruah-brown text-white text-xs px-3 py-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
        Fale conosco
      </span>
    </a>
  )
}
