"use client"

import { Phone, Mail, MapPin } from "lucide-react"

export function Contato() {
  return (
    <section id="contato" className="py-20 md:py-32 bg-ruah-cream">
      <div className="container mx-auto px-6 max-w-5xl">

        {/* Título */}
        <div className="text-center mb-16">
          <span className="text-ruah-gold text-xs md:text-sm tracking-[0.3em] uppercase mb-4 block">
            Conecte-se
          </span>

          <h2 className="font-serif text-3xl md:text-5xl text-ruah-brown mb-6">
            Fale Conosco
          </h2>

          <p className="text-ruah-brown-light text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Entre em contato através dos canais abaixo. Ao clicar no email ou telefone,
            seu dispositivo abrirá automaticamente o aplicativo correspondente.
          </p>

          <div className="w-24 h-[2px] bg-ruah-gold mx-auto mt-8" />
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-8">

          {/* Telefone */}
          <div className="bg-white border border-ruah-sand p-8 rounded-sm shadow-md hover:shadow-xl transition-all duration-300 group">

            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-ruah-beige flex items-center justify-center rounded-full group-hover:bg-ruah-gold/20 transition-colors">
                <Phone className="w-4 h-4 text-ruah-gold" />
              </div>

              <p className="text-xs tracking-[0.2em] uppercase text-ruah-brown">
                Telefones
              </p>
            </div>

            <a
              href="tel:+5561998234976"
              className="block text-lg text-ruah-brown-light hover:text-ruah-gold transition-colors"
            >
              +55 (61) 9 9823-4976
            </a>

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

          {/* Email */}
          <div className="bg-white border border-ruah-sand p-8 rounded-sm shadow-md hover:shadow-xl transition-all duration-300 group">

            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-ruah-beige flex items-center justify-center rounded-full group-hover:bg-ruah-gold/20 transition-colors">
                <Mail className="w-4 h-4 text-ruah-gold" />
              </div>

              <p className="text-xs tracking-[0.2em] uppercase text-ruah-brown">
                Email
              </p>
            </div>

            <a
              href="mailto:ruah.assconsult@gmail.com?subject=Contato%20pelo%20site%20Ruah%20Consultoria"
              className="block w-full text-center bg-ruah-brown text-ruah-warm-white py-4 px-6 text-xs md:text-sm tracking-[0.15em] uppercase hover:bg-ruah-gold transition-all duration-300 shadow-md hover:shadow-lg rounded-sm"
            >
              Enviar Email
            </a>

            <p className="text-sm text-ruah-brown-light mt-4 break-all">
              ruah.assconsult@gmail.com
            </p>

          </div>

          {/* Endereço */}
          <div className="bg-white border border-ruah-sand p-8 rounded-sm shadow-md hover:shadow-xl transition-all duration-300 group">

            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-ruah-beige flex items-center justify-center rounded-full group-hover:bg-ruah-gold/20 transition-colors">
                <MapPin className="w-4 h-4 text-ruah-gold" />
              </div>

              <p className="text-xs tracking-[0.2em] uppercase text-ruah-brown">
                Escritório
              </p>
            </div>

            <p className="text-lg text-ruah-brown-light">
              SAUS Q 5 BL K N 17
            </p>

            <p className="text-lg text-ruah-brown-light">
              Sala 0403
            </p>

            <p className="text-lg text-ruah-brown-light">
              Asa Sul, Brasília - DF
            </p>

          </div>

        </div>

      </div>
    </section>
  )
}