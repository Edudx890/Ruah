"use client"

import { Phone, Mail, MapPin } from "lucide-react"

export function Contato() {
  return (
    <section id="contato" className="py-20 md:py-32 bg-ruah-cream">
      <div className="container mx-auto px-6 max-w-4xl">

        {/* Título */}
        <div className="text-center mb-14 md:mb-16">
          <span className="text-ruah-gold text-xs md:text-sm tracking-[0.3em] uppercase mb-4 block">
            Conecte-se
          </span>

          <h2 className="font-serif text-3xl md:text-5xl text-ruah-brown mb-6">
            Fale Conosco
          </h2>

          <p className="text-ruah-brown-light text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Para entrar em contato com nossa equipe utilize os canais abaixo.
            Ao clicar no email seu aplicativo de email será aberto automaticamente.
          </p>

          <div className="w-20 md:w-24 h-0.5 bg-ruah-gold mx-auto mt-8" />
        </div>

        {/* Card */}
        <div className="bg-white p-8 md:p-14 rounded-sm shadow-lg border border-ruah-sand">

          <div className="flex flex-col gap-10">

            {/* Telefones */}
            <div className="flex items-start gap-5 md:gap-6 group">

              <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-ruah-beige flex items-center justify-center shrink-0 group-hover:bg-ruah-gold/20 transition-colors">
                <Phone className="w-5 h-5 md:w-6 md:h-6 text-ruah-gold" />
              </div>

              <div className="flex-1">
                <p className="text-xs md:text-sm tracking-[0.2em] uppercase text-ruah-brown mb-2">
                  Telefones
                </p>

                <a
                  href="tel:+5579988565263"
                  className="block text-base md:text-lg text-ruah-brown-light hover:text-ruah-gold transition-colors"
                >
                  +55 (79) 9 8856-5263
                </a>

                <a
                  href="tel:+5531972325289"
                  className="block text-base md:text-lg text-ruah-brown-light hover:text-ruah-gold transition-colors"
                >
                  +55 (31) 9 7232-5289
                </a>
              </div>

            </div>

            {/* Email */}
            <div className="flex flex-col md:flex-row items-start md:items-center gap-5 md:gap-6 group">

              <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-ruah-beige flex items-center justify-center shrink-0 group-hover:bg-ruah-gold/20 transition-colors">
                <Mail className="w-5 h-5 md:w-6 md:h-6 text-ruah-gold" />
              </div>

              <div className="flex-1 w-full">
                <p className="text-xs md:text-sm tracking-[0.2em] uppercase text-ruah-brown mb-3">
                  Email
                </p>

                <a
                  href="mailto:seuemail@dominio.com"
                  className="block w-full text-center bg-ruah-brown text-ruah-warm-white py-4 px-6 text-xs md:text-sm tracking-[0.15em] uppercase hover:bg-ruah-gold transition-all duration-300 shadow-md hover:shadow-lg rounded-sm"
                >
                  Entrar em contato por email
                </a>

                <p className="text-xs md:text-sm text-ruah-brown-light mt-3 leading-relaxed">
                  Ao clicar, seu aplicativo de email será aberto para enviar sua mensagem.
                </p>
              </div>

            </div>

            {/* Endereço */}
            <div className="flex items-start gap-5 md:gap-6 group">

              <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-ruah-beige flex items-center justify-center shrink-0 group-hover:bg-ruah-gold/20 transition-colors">
                <MapPin className="w-5 h-5 md:w-6 md:h-6 text-ruah-gold" />
              </div>

              <div>
                <p className="text-xs md:text-sm tracking-[0.2em] uppercase text-ruah-brown mb-2">
                  Escritório
                </p>

                <p className="text-base md:text-lg text-ruah-brown-light">
                  SAUS Q 5 BL K N 17, Sala 0403
                </p>

                <p className="text-base md:text-lg text-ruah-brown-light">
                  Asa Sul, Brasília - DF
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  )
}