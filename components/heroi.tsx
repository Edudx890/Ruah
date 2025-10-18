export function Heroi() {
  return (
    <section id="inicio" className="min-h-screen flex items-center justify-center px-4 pt-20 relative overflow-hidden">
      {/* Padrão de Fundo */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gold rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto max-w-5xl text-center relative z-10">
        <h1 data-aos="zoom-in-up" className="font-serif text-4xl md:text-5xl lg:text-7xl font-bold text-cream mb-8 leading-tight text-balance">
          <span className="text-gold">RUAH:</span> Conectando Setores, Construindo Futuros
        </h1>
        <p data-aos="zoom-in-up" className="text-lg md:text-xl lg:text-2xl text-cream/70 max-w-3xl mx-auto leading-relaxed text-pretty">
          Somos a ponte estratégica entre o setor privado e a esfera governamental. Atuamos em níveis municipal,
          estadual, federal e internacional, transformando complexidade em oportunidade.
        </p>
      </div>
    </section>
  )
}
