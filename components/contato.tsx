"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
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
      mensagem: dadosFormulario.get("mensagem"),
    }

    try {
      const resposta = await fetch("/api/contato", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
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
        description: "Não foi possível enviar sua mensagem. Tente novamente.",
        variant: "destructive",
      })
    } finally {
      setEnviando(false)
    }
  }

  return (
    <section id="contato" className="py-24 px-4 bg-green-light">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h2 data-aos="zoom-in-up" className="font-serif text-4xl md:text-5xl font-bold text-cream mb-4">
            Fale <span className="text-gold">Conosco</span>
          </h2>
          <p data-aos="zoom-in-up" className="text-lg text-cream/80">Entre em contato para discutir como podemos ajudar sua organização</p>
          <div data-aos="zoom-in-up" className="mt-6 w-24 h-1 bg-gold rounded-full mx-auto" />
        </div>

        <form onSubmit={manipularEnvio} className="space-y-6">
          <div data-aos="zoom-in-up">
            <Input
              type="text"
              name="nome"
              placeholder="Nome completo"
              required
              className="bg-background border-border text-cream placeholder:text-cream/50 focus:border-gold focus:ring-gold"
            />
          </div>

          <div data-aos="zoom-in-up">
            <Input
              type="email"
              name="email"
              placeholder="E-mail"
              required
              className="bg-background border-border text-cream placeholder:text-cream/50 focus:border-gold focus:ring-gold"
            />
          </div>

          <div data-aos="zoom-in-up">
            <Textarea
              name="mensagem"
              placeholder="Sua mensagem"
              required
              rows={6}
              className="bg-background border-border text-cream placeholder:text-cream/50 focus:border-gold focus:ring-gold resize-none"
            />
          </div>

          <Button
            type="submit"
            disabled={enviando}
            data-aos="zoom-in-up"
            className="w-full bg-gold hover:bg-gold/90 text-primary-foreground font-medium text-base py-6 shadow-lg shadow-gold/20 hover:shadow-xl hover:shadow-gold/30 transition-all"
          >
            {enviando ? "Enviando..." : "Enviar Mensagem"}
          </Button>
        </form>
      </div>
    </section>
  )
}
