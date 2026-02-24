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
      {/* Imagem de fundo com overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/elegant-professional-business-meeting.jpg"
          alt="Escritorio elegante"
          className="w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to bottom, rgba(62,39,35,0.9), rgba(62,39,35,0.8), rgba(62,39,35,0.9))",
          }}
        />
      </div>

      {/* Conteudo */}
      <div className="relative z-10 container mx-auto px-6 text-center max-w-5xl pt-20 hero-content">
        <div className="mb-6 inline-block">
          <div className="w-24 h-1 bg-ruah-gold mx-auto mb-8" />
        </div>
        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-ruah-warm-white mb-8 leading-tight tracking-wide">
          {"RUAH:"}
          <br />
          <span className="text-ruah-gold italic text-4xl md:text-6xl lg:text-7xl">
            {"Conectando Setores,"}
            <br />
            {"Construindo Futuros"}
          </span>
        </h1>
        <p className="text-lg md:text-2xl font-light leading-relaxed max-w-3xl mx-auto mb-12 text-ruah-beige">
          Somos a ponte estrategica entre o setor privado e a esfera governamental. Atuamos em niveis municipal,
          estadual, federal e internacional, transformando complexidade em oportunidade.
        </p>
        <button
          onClick={rolarParaContato}
          className="inline-block border-2 border-ruah-gold text-ruah-gold hover:bg-ruah-gold hover:text-ruah-brown px-10 py-4 text-sm tracking-[0.15em] uppercase transition-all duration-300"
        >
          Fale Conosco
        </button>
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
