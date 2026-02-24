"use client"

import { useEffect, useState } from "react"
import { Compass, Landmark, ClipboardList, Globe, ArrowRight } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

const icones: Record<string, any> = {
  Compass,
  Landmark,
  ClipboardList,
  Globe,
  Building2: Compass,
  Users: Landmark,
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
      console.error("Erro ao carregar servicos:", erro)
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
      <section id="servicos" className="py-24 md:py-32 bg-ruah-beige">
        <div className="container mx-auto px-6 text-center">
          <p className="text-ruah-brown-light">Carregando servicos...</p>
        </div>
      </section>
    )
  }

  return (
    <section id="servicos" className="py-24 md:py-32 bg-ruah-beige relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <span className="text-ruah-gold text-sm tracking-[0.3em] uppercase mb-4 block">
            Portfolio
          </span>
          <h2
            onClick={handleTituloClick}
            className="font-serif text-4xl md:text-5xl lg:text-6xl text-ruah-brown mb-6 cursor-default select-none"
          >
            {"SOLU\u00C7\u00D5ES ESTRAT\u00C9GICAS"}
          </h2>
          <p className="text-ruah-brown-light text-lg md:text-xl max-w-2xl mx-auto font-light">
            Oferecemos um portfolio completo de servicos para conectar o setor privado ao publico com excelencia
          </p>
          <div className="w-24 h-0.5 bg-ruah-gold mx-auto mt-8" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {servicos.map((servico) => {
            const Icone = icones[servico.icone] || Compass
            return (
              <div
                key={servico.id}
                onClick={() => incrementarAcesso(servico.id)}
                className="group bg-ruah-cream p-8 rounded-sm shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border border-transparent hover:border-ruah-gold/30 service-card-hover cursor-pointer"
              >
                <div className="w-14 h-14 flex items-center justify-center mb-6 text-ruah-gold group-hover:scale-110 transition-transform duration-300">
                  <Icone className="w-10 h-10" strokeWidth={1} />
                </div>
                <h3 className="font-serif text-2xl text-ruah-brown mb-4">{servico.titulo}</h3>
                <p className="text-ruah-brown-light leading-relaxed text-sm">{servico.descricao}</p>
              </div>
            )
          })}
        </div>

        {totalServicos > 4 && (
          <div className="text-center mt-12">
            <Link
              href="/servicos"
              className="inline-flex items-center border-2 border-ruah-gold text-ruah-gold hover:bg-ruah-gold hover:text-ruah-brown px-8 py-3 text-sm tracking-[0.15em] uppercase transition-all duration-300"
            >
              Ver Todos os Servicos
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
