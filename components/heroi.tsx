"use client"

import { ChevronDown } from "lucide-react"

export function Heroi() {
  const rolarParaContato = () => {
    const elemento = document.getElementById("contato")
    if (elemento) {
      const deslocamento = 80
      const posicao = elemento.getBoundingClientRect().top + window.pageYOffset - deslocamento
      window.scrollTo({ top: posicao, behavior: "smooth" })
    }
  }

  const rolarParaSobre = () => {
    const elemento = document.getElementById("sobre")
    if (elemento) {
      const deslocamento = 80
      const posicao = elemento.getBoundingClientRect().top + window.pageYOffset - deslocamento
      window.scrollTo({ top: posicao, behavior: "smooth" })
    }
  }

  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Imagem de fundo de Brasilia com blur sutil e overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/brasilia-noturna.jpg"
          alt="Vista noturna de Brasilia"
          className="w-full h-full object-cover"
          style={{ filter: "blur(1.5px)" }}
          crossOrigin="anonymous"
        />
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to bottom, rgba(62,39,35,0.85), rgba(62,39,35,0.7), rgba(62,39,35,0.9))",
          }}
        />
      </div>

      {/* Conteudo */}
      <div className="relative z-10 container mx-auto px-6 text-center max-w-5xl pt-20">
        <div className="mb-6 inline-block">
          <div className="w-24 h-1 bg-ruah-gold mx-auto mb-8" />
        </div>
        <p className="text-ruah-gold text-sm md:text-base tracking-[0.3em] uppercase mb-6">
          Assessoria, Consultoria e Comercio
        </p>
        <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl text-ruah-warm-white mb-4 leading-tight tracking-wide">
          Conectamos
          <br />
          <span className="text-ruah-gold italic">Estrategia e Resultado</span>
        </h1>
        <p className="text-lg md:text-xl font-light leading-relaxed max-w-3xl mx-auto mb-12 text-ruah-beige">
          Solucoes estrategicas que transformam desafios em oportunidades,
          com a excelencia e a confianca que o seu projeto merece.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={rolarParaContato}
            className="inline-block border-2 border-ruah-gold text-ruah-gold hover:bg-ruah-gold hover:text-ruah-brown px-10 py-4 text-sm tracking-[0.15em] uppercase transition-all duration-300"
          >
            Fale Conosco
          </button>
          <button
            onClick={rolarParaSobre}
            className="inline-block border-2 border-ruah-warm-white/40 text-ruah-warm-white/80 hover:border-ruah-warm-white hover:text-ruah-warm-white px-10 py-4 text-sm tracking-[0.15em] uppercase transition-all duration-300"
          >
            Conheca a RUAH
          </button>
        </div>
      </div>

      {/* Indicador de scroll */}
      <button
        onClick={rolarParaSobre}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce"
        aria-label="Rolar para baixo"
      >
        <ChevronDown className="w-8 h-8 text-ruah-gold/60" />
      </button>
    </section>
  )
}
