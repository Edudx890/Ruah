import { MessageCircle } from "lucide-react"

export function BotaoWhatsApp() {
  return (
    <a
      href="https://wa.me/5579988565263"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#20BA5A] text-white p-4 rounded-full shadow-lg shadow-gold/20 transition-all duration-300 hover:scale-110 border-2 border-gold/30"
      aria-label="Contato via WhatsApp"
    >
      <MessageCircle className="w-6 h-6" />
    </a>
  )
}
