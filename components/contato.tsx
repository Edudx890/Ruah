"use client"

import type React from "react"
import { useState } from "react"
import { Phone, Mail, MapPin } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function Contato() {
  const [enviando, setEnviando] = useState(false)
  const { toast } = useToast()

  const manipularEnvio = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setEnviando(true)

    const dadosFormulario = new FormData(e.currentTarget)
    const dados = {
      nome: dadosFormulario.get("nome"),
      email: dadosFormulario.get("email"),
      telefone: dadosFormulario.get("telefone"),
      mensagem: dadosFormulario.get("mensagem"),
    }

    try {
      const resposta = await fetch("/api/contato", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados),
      })

      const resultado = await resposta.json()

      if (resposta.ok) {
        toast({
          title: "Mensagem enviada!",
          description: "Entraremos em contato em breve.",
        })
        e.currentTarget.reset()
      } else {
        throw new Error(resultado.erro)
      }
    } catch (erro) {
      toast({
        title: "Erro",
        description: "Nao foi possivel enviar sua mensagem. Tente novamente.",
        variant: "destructive",
      })
    } finally {
      setEnviando(false)
    }
  }

  return (
    <section id="contato" className="py-24 md:py-32 bg-ruah-cream relative">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-16">
          <span className="text-ruah-gold text-sm tracking-[0.3em] uppercase mb-4 block">
            Conecte-se
          </span>
          <h2 className="font-serif text-4xl md:text-5xl text-ruah-brown mb-6">Fale Conosco</h2>
          <p className="text-ruah-brown-light text-lg">
            Entre em contato para discutir como podemos ajudar sua organizacao
          </p>
          <div className="w-24 h-0.5 bg-ruah-gold mx-auto mt-8" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Formulario */}
          <div className="bg-white p-8 md:p-12 rounded-sm shadow-lg border border-ruah-sand">
            <form onSubmit={manipularEnvio} className="space-y-6">
              <div>
                <label htmlFor="nome" className="block text-sm tracking-[0.15em] uppercase text-ruah-brown mb-2">
                  Nome
                </label>
                <input
                  type="text"
                  id="nome"
                  name="nome"
                  required
                  className="w-full px-4 py-3 border border-ruah-sand focus:border-ruah-gold focus:outline-none transition-colors bg-ruah-cream/50 text-ruah-brown placeholder-ruah-brown-light/50"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm tracking-[0.15em] uppercase text-ruah-brown mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 border border-ruah-sand focus:border-ruah-gold focus:outline-none transition-colors bg-ruah-cream/50 text-ruah-brown placeholder-ruah-brown-light/50"
                />
              </div>
              <div>
                <label htmlFor="telefone" className="block text-sm tracking-[0.15em] uppercase text-ruah-brown mb-2">
                  Telefone
                </label>
                <input
                  type="tel"
                  id="telefone"
                  name="telefone"
                  className="w-full px-4 py-3 border border-ruah-sand focus:border-ruah-gold focus:outline-none transition-colors bg-ruah-cream/50 text-ruah-brown placeholder-ruah-brown-light/50"
                />
              </div>
              <div>
                <label htmlFor="mensagem" className="block text-sm tracking-[0.15em] uppercase text-ruah-brown mb-2">
                  Mensagem
                </label>
                <textarea
                  id="mensagem"
                  name="mensagem"
                  rows={4}
                  required
                  className="w-full px-4 py-3 border border-ruah-sand focus:border-ruah-gold focus:outline-none transition-colors bg-ruah-cream/50 text-ruah-brown placeholder-ruah-brown-light/50 resize-none"
                />
              </div>
              <button
                type="submit"
                disabled={enviando}
                className="w-full bg-ruah-brown text-ruah-warm-white py-4 text-sm tracking-[0.15em] uppercase hover:bg-ruah-gold transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-50"
              >
                {enviando ? "Enviando..." : "Enviar Mensagem"}
              </button>
            </form>
          </div>

          {/* Informacoes de contato */}
          <div className="flex flex-col justify-center gap-8 lg:pl-8">
            <div>
              <h3 className="font-serif text-3xl text-ruah-brown mb-6">
                {"RUAH Assessoria,"}
                <br />
                {"Consultoria e Com\u00E9rcio"}
              </h3>
              <p className="text-ruah-brown-light leading-relaxed mb-8">
                Estamos prontos para entender suas necessidades e desenvolver soluções sob medida para seu negócio.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4 group">
                <div className="w-12 h-12 rounded-full bg-ruah-beige flex items-center justify-center shrink-0 group-hover:bg-ruah-gold/20 transition-colors">
                  <Phone className="w-5 h-5 text-ruah-gold" />
                </div>
                <div>
                  <p className="text-sm tracking-[0.15em] uppercase text-ruah-brown mb-1">Telefones</p>
                  <a href="tel:+557998856-5263" className="block text-ruah-brown-light hover:text-ruah-gold transition-colors">
                    +55 (79) 9 8856-5263
                  </a>
                  <a href="tel:+553197232-5289" className="block text-ruah-brown-light hover:text-ruah-gold transition-colors">
                    +55 (31) 9 7232-5289
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="w-12 h-12 rounded-full bg-ruah-beige flex items-center justify-center shrink-0 group-hover:bg-ruah-gold/20 transition-colors">
                  <Mail className="w-5 h-5 text-ruah-gold" />
                </div>
                <div>
                  <p className="text-sm tracking-[0.15em] uppercase text-ruah-brown mb-1">Email</p>
                  <a href="mailto:ruah.assconsult@gmail.com" className="text-ruah-brown-light hover:text-ruah-gold transition-colors">
                    ruah.assconsult@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="w-12 h-12 rounded-full bg-ruah-beige flex items-center justify-center shrink-0 group-hover:bg-ruah-gold/20 transition-colors">
                  <MapPin className="w-5 h-5 text-ruah-gold" />
                </div>
                <div>
                  <p className="text-sm tracking-[0.15em] uppercase text-ruah-brown mb-1">Escritorio</p>
                  <p className="text-ruah-brown-light">SAUS Q 5 BL K N 17, Sala 0403</p>
                  <p className="text-ruah-brown-light">Asa Sul, Brasilia - DF</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
