"use client"

import { useEffect, useState } from "react"
import { Building2, Globe, Users, Briefcase, Target, TrendingUp } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const icones: Record<string, any> = {
  Building2,
  Globe,
  Users,
  Briefcase,
  Target,
  TrendingUp,
}

interface Servico {
  id: number
  titulo: string
  descricao: string
  icone: string
  acessos: number
}

export function TodosServicos() {
  const [servicos, setServicos] = useState<Servico[]>([])
  const [carregando, setCarregando] = useState(true)

  useEffect(() => {
    carregarServicos()
  }, [])

  const carregarServicos = async () => {
    try {
      const resposta = await fetch("/api/servicos?ativos=true")
      const dados = await resposta.json()

      if (dados.sucesso) {
        setServicos(dados.servicos)
      }
    } catch (erro) {
      console.error("[v0] Erro ao carregar serviços:", erro)
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
      console.error("[v0] Erro ao incrementar acesso:", erro)
    }
  }

  if (carregando) {
    return (
      <section className="py-24 px-4">
        <div className="container mx-auto max-w-6xl text-center">
          <p className="text-cream/70">Carregando serviços...</p>
        </div>
      </section>
    )
  }

  return (
    <section className="py-24 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-cream mb-4">
            Todas as Nossas <span className="text-gold">Soluções Estratégicas</span>
          </h1>
          <p className="text-lg text-cream/70 max-w-2xl mx-auto">
            Conheça todo o portfólio de serviços que oferecemos para conectar o setor privado ao público
          </p>
          <div className="mt-6 w-24 h-1 bg-gold rounded-full mx-auto" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicos.map((servico) => {
            const Icone = icones[servico.icone] || Building2
            return (
              <Card
                key={servico.id}
                onClick={() => incrementarAcesso(servico.id)}
                className="border-border bg-card hover:border-gold transition-all duration-300 hover:shadow-lg hover:shadow-gold/10 cursor-pointer"
              >
                <CardHeader>
                  <div className="w-14 h-14 rounded-full bg-gold/20 flex items-center justify-center mb-4 border-2 border-gold/20">
                    <Icone className="w-7 h-7 text-gold" />
                  </div>
                  <CardTitle className="font-serif text-xl text-card-foreground">{servico.titulo}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-card-foreground/70 leading-relaxed">{servico.descricao}</p>
                  <div className="mt-4 pt-4 border-t border-border">
                    <p className="text-xs text-card-foreground/50">{servico.acessos} visualizações</p>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {servicos.length === 0 && (
          <div className="text-center py-12">
            <p className="text-card-foreground/70">Nenhum serviço disponível no momento</p>
          </div>
        )}
      </div>
    </section>
  )
}
