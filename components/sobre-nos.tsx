export function SobreNos() {
  return (
    <section id="sobre" className="py-24 md:py-32 bg-ruah-cream relative overflow-hidden">
      {/* Circulos decorativos sutis */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-ruah-gold/5 rounded-full -mr-32 -mt-32" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-ruah-gold/5 rounded-full -ml-48 -mb-48" />

      <div className="container mx-auto px-6 max-w-4xl relative z-10">
        <div className="text-center mb-16">
          <span className="text-ruah-gold text-sm tracking-[0.3em] uppercase mb-4 block">
            Quem Somos
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-ruah-brown mb-6">
            Nossa Expertise
          </h2>
          <div className="w-24 h-0.5 bg-ruah-gold mx-auto" />
        </div>

        <div className="mx-auto text-ruah-brown-light leading-relaxed text-center">
          <p className="mb-6 text-lg md:text-xl">
            A <strong className="text-ruah-brown font-semibold">RUAH Assessoria, Consultoria e Comercio</strong> e uma
            empresa de excelencia que atua como elo estrategico entre o setor privado e a administracao publica.
          </p>
          <p className="mb-6 text-lg md:text-xl">
            Com presenca nacional e internacional, oferecemos solucoes personalizadas que navegam pela complexidade das
            relacoes institucionais em todos os niveis governamentais.
          </p>
          <p className="text-lg md:text-xl">
            Nossa missao e transformar desafios regulatorios e burocraticos em oportunidades de crescimento, conectando
            empresas privadas aos recursos e parcerias do setor publico de forma etica, transparente e eficiente.
          </p>
        </div>
      </div>
    </section>
  )
}
