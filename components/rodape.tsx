import { Mail, Phone } from "lucide-react"

export function Rodape() {
  return (
    <footer className="bg-card py-12 px-4 border-t border-gold/20">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-3 gap-8 items-center">
          {/* Logo */}
          <div>
            <div className="text-3xl font-serif font-bold text-background mb-2">RUAH</div>
            <p className="text-sm text-background/70">Assessoria, Consultoria e Comércio</p>
          </div>

          {/* Informações de Contato */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-gold" />
              <a
                href="https://wa.me/5579988565263"
                className="text-sm text-card-foreground hover:text-gold transition-colors"
              >
                +55 79 8856-5263
              </a>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-gold" />
              <a
                href="mailto:ruah.assconsult@gmail.com"
                className="text-sm text-card-foreground hover:text-gold transition-colors"
              >
                ruah.assconsult@gmail.com
              </a>
            </div>
          </div>

          {/* Copyright */}
          <div className="text-sm text-card-foreground/70 md:text-right">
            <p>© {new Date().getFullYear()} RUAH</p>
            <p>Todos os direitos reservados</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
