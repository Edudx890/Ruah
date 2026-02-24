"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { Trash2, Plus, Building2, Globe, Users, Briefcase, Target, TrendingUp } from "lucide-react"

const iconesDisponiveis = [
  { nome: "Building2", icone: Building2, label: "Prédio" },
  { nome: "Globe", icone: Globe, label: "Globo" },
  { nome: "Users", icone: Users, label: "Usuários" },
  { nome: "Briefcase", icone: Briefcase, label: "Maleta" },
  { nome: "Target", icone: Target, label: "Alvo" },
  { nome: "TrendingUp", icone: TrendingUp, label: "Crescimento" },
]

interface Servico {
  id: number
  titulo: string
  descricao: string
  icone: string
  ordem: number
  acessos: number
  ativo: boolean
}

interface Usuario {
  id: number
  nome: string
  email: string
  role: "master" | "admin2" | "usuario"
}

export function PainelAdmin() {
  const [usuario, setUsuario] = useState<Usuario | null>(null)
  const [servicos, setServicos] = useState<Servico[]>([])
  const [carregando, setCarregando] = useState(true)
  const [mostrarFormulario, setMostrarFormulario] = useState(false)
  const [enviando, setEnviando] = useState(false)
  const [iconeSelecionado, setIconeSelecionado] = useState("Building2")
  const { toast } = useToast()
  const router = useRouter()

  useEffect(() => {
    carregarDados()
  }, [])

  const carregarDados = async () => {
    try {
      // Carregar usuário atual
      const respostaUsuario = await fetch("/api/usuario-atual")
      const dadosUsuario = await respostaUsuario.json()

      if (!dadosUsuario.usuario || (dadosUsuario.usuario.role !== "master" && dadosUsuario.usuario.role !== "admin2")) {
        router.push("/")
        return
      }

      setUsuario(dadosUsuario.usuario)

      // Carregar serviços
      const respostaServicos = await fetch("/api/servicos?ativos=false")
      const dadosServicos = await respostaServicos.json()

      if (dadosServicos.sucesso) {
        setServicos(dadosServicos.servicos)
      }
    } catch (erro) {
      console.error("[v0] Erro ao carregar dados:", erro)
      toast({
        title: "Erro",
        description: "Não foi possível carregar os dados",
        variant: "destructive",
      })
    } finally {
      setCarregando(false)
    }
  }

  const adicionarServico = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setEnviando(true)

    const dadosFormulario = new FormData(e.currentTarget)
    const dados = {
      titulo: dadosFormulario.get("titulo"),
      descricao: dadosFormulario.get("descricao"),
      icone: iconeSelecionado,
      ordem: Number.parseInt(dadosFormulario.get("ordem") as string) || 0,
    }

    try {
      const resposta = await fetch("/api/servicos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados),
      })

      const resultado = await resposta.json()

      if (resposta.ok) {
        toast({
          title: "Serviço adicionado!",
          description: "O novo serviço foi criado com sucesso",
        })
        setMostrarFormulario(false)
        e.currentTarget.reset()
        setIconeSelecionado("Building2")
        carregarDados()
      } else {
        throw new Error(resultado.erro)
      }
    } catch (erro) {
      toast({
        title: "Erro",
        description: "Não foi possível adicionar o serviço",
        variant: "destructive",
      })
    } finally {
      setEnviando(false)
    }
  }

  const removerServico = async (id: number) => {
    if (!confirm("Tem certeza que deseja remover este serviço?")) {
      return
    }

    try {
      const resposta = await fetch(`/api/servicos?id=${id}`, {
        method: "DELETE",
      })

      const resultado = await resposta.json()

      if (resposta.ok) {
        toast({
          title: "Serviço removido!",
          description: "O serviço foi removido com sucesso",
        })
        carregarDados()
      } else {
        throw new Error(resultado.erro)
      }
    } catch (erro) {
      toast({
        title: "Erro",
        description: "Não foi possível remover o serviço",
        variant: "destructive",
      })
    }
  }

  const sair = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" })
      router.push("/")
      router.refresh()
    } catch (erro) {
      console.error("[v0] Erro ao fazer logout:", erro)
    }
  }

  if (carregando) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <p className="text-cream/70">Carregando...</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-24">
      <div className="max-w-6xl mx-auto">
        {/* Cabeçalho */}
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="font-serif text-4xl font-bold text-cream mb-2">Painel Administrativo</h1>
            <p className="text-cream/70">
              Bem-vindo, {usuario?.nome} ({usuario?.role === "master" ? "Master" : "Admin"})
            </p>
          </div>
          <Button
            onClick={sair}
            variant="outline"
            className="border-gold text-gold hover:bg-gold hover:text-primary-foreground bg-transparent"
          >
            Sair
          </Button>
        </div>

        {/* Botão adicionar */}
        <div className="mb-8">
          <Button
            onClick={() => setMostrarFormulario(!mostrarFormulario)}
            className="bg-gold hover:bg-gold/90 text-primary-foreground"
          >
            <Plus className="w-5 h-5 mr-2" />
            {mostrarFormulario ? "Cancelar" : "Adicionar Novo Serviço"}
          </Button>
        </div>

        {/* Formulário de adicionar */}
        {mostrarFormulario && (
          <Card className="mb-12 border-gold bg-gold-aged">
            <CardHeader>
              <CardTitle className="font-serif text-2xl text-cream">Novo Serviço</CardTitle>
              <CardDescription className="text-cream/70">Preencha os dados do novo serviço</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={adicionarServico} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-cream mb-2">Título</label>
                  <Input
                    type="text"
                    name="titulo"
                    placeholder="Nome do serviço"
                    required
                    className="bg-background border-border text-cream placeholder:text-cream/50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-cream mb-2">Descrição</label>
                  <Textarea
                    name="descricao"
                    placeholder="Descrição detalhada do serviço"
                    required
                    rows={4}
                    className="bg-background border-border text-cream placeholder:text-cream/50 resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-cream mb-2">Ícone</label>
                  <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
                    {iconesDisponiveis.map((item) => {
                      const IconeComponente = item.icone
                      return (
                        <button
                          key={item.nome}
                          type="button"
                          onClick={() => setIconeSelecionado(item.nome)}
                          className={`p-4 rounded-lg border-2 transition-all ${
                            iconeSelecionado === item.nome
                              ? "border-gold bg-gold/20"
                              : "border-border bg-background hover:border-gold/50"
                          }`}
                        >
                          <IconeComponente className="w-8 h-8 text-gold mx-auto" />
                          <p className="text-xs text-cream/70 mt-2">{item.label}</p>
                        </button>
                      )
                    })}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-cream mb-2">Ordem (opcional)</label>
                  <Input
                    type="number"
                    name="ordem"
                    placeholder="0"
                    defaultValue={0}
                    className="bg-background border-border text-cream placeholder:text-cream/50"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={enviando}
                  className="w-full bg-gold hover:bg-gold/90 text-primary-foreground"
                >
                  {enviando ? "Adicionando..." : "Adicionar Serviço"}
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Lista de serviços */}
        <div>
          <h2 className="font-serif text-2xl font-bold text-cream mb-6">Serviços Cadastrados ({servicos.length})</h2>

          <div className="space-y-4">
            {servicos.map((servico) => {
              const IconeItem = iconesDisponiveis.find((i) => i.nome === servico.icone)?.icone || Building2
              return (
                <Card key={servico.id} className="border-border bg-gold-aged">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4 flex-1">
                        <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center border-2 border-gold/30 flex-shrink-0">
                          <IconeItem className="w-6 h-6 text-gold" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-serif text-xl text-cream mb-2">{servico.titulo}</h3>
                          <p className="text-cream/70 text-sm mb-3">{servico.descricao}</p>
                          <div className="flex gap-4 text-xs text-cream/60">
                            <span>Ordem: {servico.ordem}</span>
                            <span>Acessos: {servico.acessos}</span>
                            <span>Status: {servico.ativo ? "Ativo" : "Inativo"}</span>
                          </div>
                        </div>
                      </div>

                      {usuario?.role === "master" && (
                        <Button
                          onClick={() => removerServico(servico.id)}
                          variant="destructive"
                          size="sm"
                          className="ml-4"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )
            })}

            {servicos.length === 0 && (
              <Card className="border-border bg-gold-aged">
                <CardContent className="p-12 text-center">
                  <p className="text-cream/70">Nenhum serviço cadastrado ainda</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Aviso para admin2 */}
        {usuario?.role === "admin2" && (
          <div className="mt-8 p-4 bg-gold/10 border border-gold/30 rounded-lg">
            <p className="text-sm text-cream/70">
              <strong className="text-gold">Nota:</strong> Como Admin2, você pode adicionar novos serviços mas não pode
              removê-los. Apenas usuários Master têm permissão para remover serviços.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
