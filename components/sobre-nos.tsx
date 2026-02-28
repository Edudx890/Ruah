import { Download } from "lucide-react"

export function SobreNos() {
  return (
    <section id="sobre" className="py-24 md:py-32 bg-ruah-cream relative overflow-hidden">
      {/* Circulos decorativos sutis */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-ruah-gold/5 rounded-full -mr-32 -mt-32" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-ruah-gold/5 rounded-full -ml-48 -mb-48" />

      <div className="container mx-auto px-6 max-w-5xl relative z-10">
        <div className="text-center mb-16">
          <span className="text-ruah-gold text-sm tracking-[0.3em] uppercase mb-4 block">
            A Essencia da RUAH
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-ruah-brown mb-6">
            Quem Somos
          </h2>
          <div className="w-24 h-0.5 bg-ruah-gold mx-auto" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Imagem institucional */}
          <div className="overflow-hidden rounded-sm shadow-lg">
            <img
              src="/images/consultoria-governo.jpg"
              alt="Sala de reunioes executiva - consultoria estrategica"
              className="w-full h-80 lg:h-[28rem] object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>

          {/* Texto institucional */}
          <div className="text-ruah-brown-light leading-relaxed">
            <p className="mb-6 text-lg">
              A <strong className="text-ruah-brown font-semibold">RUAH Assessoria, Consultoria e comércio</strong> e
              uma organizacao de vanguarda dedicada a excelencia e ao fortalecimento da gestao publica em suas diversas
              esferas.
            </p>
            <p className="mb-6 text-lg">
              Com representacao estrategica em Brasilia, atuamos como um braco tecnico indispensavel para os municipios,
              especializando-nos na resolucao de gargalos junto aos orgaos federais e na viabilizacao de fluxos
              administrativos complexos.
            </p>
            <p className="mb-8 text-lg">
              Nossa missao e oxigenar a administracao publica por meio de metodologias eticas e soluções inteligentes
              que assegurem o crescimento sustentavel e a eficiencia no trato do bem comum.
            </p>

            {/* Botao download portfolio */}
            <a
              href="/portfolio-ruah.pdf"
              download="Portfolio-RUAH.pdf"
              className="inline-flex items-center gap-3 border-2 border-ruah-gold text-ruah-gold hover:bg-ruah-gold hover:text-ruah-brown px-8 py-3 text-sm tracking-[0.15em] uppercase transition-all duration-300"
            >
              <Download className="w-4 h-4" />
              Baixar Portfolio
            </a>

            <div className="mt-10 flex gap-8">
              <div className="text-center">
                <p className="font-serif text-3xl text-ruah-gold">5+</p>
                <p className="text-sm text-ruah-brown-light uppercase tracking-wider mt-1">Pilares de Atuacao</p>
              </div>
              <div className="text-center">
                <p className="font-serif text-3xl text-ruah-gold">DF</p>
                <p className="text-sm text-ruah-brown-light uppercase tracking-wider mt-1">Sede em Brasilia</p>
              </div>
              <div className="text-center">
                <p className="font-serif text-3xl text-ruah-gold">360</p>
                <p className="text-sm text-ruah-brown-light uppercase tracking-wider mt-1">Visao Completa</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
