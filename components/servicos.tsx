"use client"

import { useEffect, useState } from "react"
import { Building2, Globe, Users, ArrowRight } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useRouter } from "next/navigation"

const icones: Record<string, any> = {
  Building2,
  Globe,
  Users,
}

interface Servico {
  id: number
  titulo: string
  descricao: string
  icone: string
  acessos: number
}

export function Servicos() {
  const [servicos, setServicos] = useState<Servico[]>([])
  const [totalServicos, setTotalServicos] = useState(0)
  const [carregando, setCarregando] = useState(true)
  const [cliquesNoTitulo, setCliquesNoTitulo] = useState(0)
  const router = useRouter()

  useEffect(() => {
    carregarServicos()
  }, [])

  useEffect(() => {
    if (cliquesNoTitulo > 0) {
      const timer = setTimeout(() => setCliquesNoTitulo(0), 2000)
      return () => clearTimeout(timer)
    }
  }, [cliquesNoTitulo])

  const carregarServicos = async () => {
    try {
      const resposta = await fetch("/api/servicos?limite=4&ativos=true")
      const dados = await resposta.json()

      if (dados.sucesso) {
        setServicos(dados.servicos)
      }

      const respostaTotal = await fetch("/api/servicos?ativos=true")
      const dadosTotal = await respostaTotal.json()

      if (dadosTotal.sucesso) {
        setTotalServicos(dadosTotal.servicos.length)
      }
    } catch (erro) {
      console.error("Erro ao carregar serviços:", erro)
    } finally {
      setCarregando(false)
    }
  }

  const incrementarAcesso = async (id: number) => {
    try {
      await fetch("/api/servicos/incrementar-acesso", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      })
    } catch (erro) {
      console.error("Erro ao incrementar acesso:", erro)
    }
  }

  const handleTituloClick = () => {
    const novosCliques = cliquesNoTitulo + 1
    setCliquesNoTitulo(novosCliques)

    if (novosCliques === 3) {
      router.push("/login")
    }
  }

  if (carregando) {
    return (
      <section id="servicos" className="py-24 px-4">
        <div className="container mx-auto max-w-6xl text-center">
          <p className="text-cream/70">Carregando serviços...</p>
        </div>
      </section>
    )
  }

  return (
    <section id="servicos" className="py-24 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2
            onClick={handleTituloClick}
           data-aos="zoom-in-up" className="font-serif text-4xl md:text-5xl font-bold text-cream mb-4 cursor-default select-none"
          >
            Soluções <span className="text-gold">Estratégicas</span>
          </h2>
          <p data-aos="zoom-in-up" className="text-lg text-cream/70 max-w-2xl mx-auto">
            Oferecemos um portfólio completo de serviços para conectar o setor privado ao público com excelência
          </p>
          <div data-aos="zoom-in-up" className="mt-6 w-24 h-1 bg-gold rounded-full mx-auto" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {servicos.map((servico) => {
            const Icone = icones[servico.icone] || Building2
            return (
              <Card
                key={servico.id}
                onClick={() => incrementarAcesso(servico.id)}
               data-aos="zoom-in-up" className="border-border bg-card hover:border-gold transition-all duration-300 hover:shadow-lg hover:shadow-gold/50 cursor-pointer"
              >
                <CardHeader>
                  <div className="w-14 h-14 rounded-full bg-gold/20 flex items-center justify-center mb-4 border-2 border-gold/20">
                    <Icone className="w-7 h-7 text-gold" />
                  </div>
                  <CardTitle className="font-serif text-xl text-card-foreground">{servico.titulo}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-card-foreground/70 leading-relaxed">{servico.descricao}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {totalServicos > 4 && (
          <div className="text-center mt-12">
            <Link href="/servicos">
              <Button className="bg-gold hover:bg-gold/90 text-primary-foreground font-medium px-8 py-6 text-base shadow-lg shadow-gold/20">
                Ver Todos os Serviços
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
