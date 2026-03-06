"use client"

import { Phone, Mail, MapPin } from "lucide-react"

export function Contato() {
  return (
    <section id="contato" className="py-24 md:py-32 bg-ruah-cream relative">
      <div className="container mx-auto px-6 max-w-4xl">

        {/* Título */}
        <div className="text-center mb-16">
          <span className="text-ruah-gold text-sm tracking-[0.3em] uppercase mb-4 block">
            Conecte-se
          </span>

          <h2 className="font-serif text-4xl md:text-5xl text-ruah-brown mb-6">
            Fale Conosco
          </h2>

          <p className="text-ruah-brown-light text-lg max-w-2xl mx-auto">
            Para entrar em contato com nossa equipe, utilize os canais abaixo.
            Ao clicar no email seu aplicativo de email será aberto automaticamente.
          </p>

          <div className="w-24 h-0.5 bg-ruah-gold mx-auto mt-8" />
        </div>

        {/* Card de contato */}
        <div className="bg-white p-10 md:p-14 rounded-sm shadow-lg border border-ruah-sand">

          <div className="flex flex-col gap-10">

            {/* Telefones */}
            <div className="flex items-start gap-6 group">
              <div className="w-14 h-14 rounded-full bg-ruah-beige flex items-center justify-center shrink-0 group-hover:bg-ruah-gold/20 transition-colors">
                <Phone className="w-6 h-6 text-ruah-gold" />
              </div>

              <div>
                <p className="text-sm tracking-[0.2em] uppercase text-ruah-brown mb-2">
                  Telefones
                </p>

                <a
                  href="tel:+5579988565263"
                  className="block text-lg text-ruah-brown-light hover:text-ruah-gold transition-colors"
                >
                  +55 (79) 9 8856-5263
                </a>

                <a
                  href="tel:+5531972325289"
                  className="block text-lg text-ruah-brown-light hover:text-ruah-gold transition-colors"
                >
                  +55 (31) 9 7232-5289
                </a>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start gap-6 group">
              <div className="w-14 h-14 rounded-full bg-ruah-beige flex items-center justify-center shrink-0 group-hover:bg-ruah-gold/20 transition-colors">
                <Mail className="w-6 h-6 text-ruah-gold" />
              </div>

              <div>
                <p className="text-sm tracking-[0.2em] uppercase text-ruah-brown mb-2">
                  Email
                </p>

                <a
                  href="mailto:ruah.assconsult@gmail.com?subject=Contato pelo site RUAH"
                  className="text-lg text-ruah-brown-light hover:text-ruah-gold transition-colors underline"
                >
                  ruah.assconsult@gmail.com
                </a>

                <p className="text-sm text-ruah-brown-light mt-2">
                  Clique no email para abrir seu aplicativo de email e enviar sua mensagem.
                </p>
              </div>
            </div>

            {/* Endereço */}
            <div className="flex items-start gap-6 group">
              <div className="w-14 h-14 rounded-full bg-ruah-beige flex items-center justify-center shrink-0 group-hover:bg-ruah-gold/20 transition-colors">
                <MapPin className="w-6 h-6 text-ruah-gold" />
              </div>

              <div>
                <p className="text-sm tracking-[0.2em] uppercase text-ruah-brown mb-2">
                  Escritório
                </p>

                <p className="text-lg text-ruah-brown-light">
                  SAUS Q 5 BL K N 17, Sala 0403
                </p>

                <p className="text-lg text-ruah-brown-light">
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