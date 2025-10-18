export function SobreNos() {
  return (
    <section id="sobre" className="py-24 px-4 bg-gold-aged/12">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          
          {/* TEXTO */}
          <div>
            <h2 
              data-aos="zoom-in-up" 
              className="font-serif text-4xl md:text-5xl font-bold text-cream mb-6"
            >
              Nossa <span className="text-gold">Expertise</span>
            </h2>

            <div 
data-aos="zoom-in-up" className="text-lg md:text-xl lg:text-2xl text-cream/70 max-w-3xl mx-auto leading-relaxed text-pretty">
              <p>
                A RUAH Assessoria, Consultoria e Comércio é uma empresa de excelência que atua como elo estratégico
                entre o setor privado e a administração pública.
              </p>
              <p>
                Com presença nacional e internacional, oferecemos soluções personalizadas que navegam pela complexidade
                das relações institucionais em todos os níveis governamentais.
              </p>
              <p>
                Nossa missão é transformar desafios regulatórios e burocráticos em oportunidades de crescimento,
                conectando empresas privadas aos recursos e parcerias do setor público de forma ética, transparente e
                eficiente.
              </p>
            </div>

            <div 
              data-aos="zoom-in-up" 
              className="mt-8 w-24 h-1 bg-gold rounded-full" 
            />
          </div>

          {/* IMAGEM COM EFEITO AOS */}
          <div 
            data-aos="zoom-in-left"
            className="relative h-[400px] md:h-[500px] rounded-lg overflow-hidden shadow-lg shadow-gold/10 hover:shadow-gold/20 transition-all duration-500"
          >
            <img
              src="/elegant-professional-business-meeting.jpg"
              alt="Expertise RUAH"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 border-2 border-gold/20 rounded-lg" />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  )
}
