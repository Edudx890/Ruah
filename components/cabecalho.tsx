"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, Settings, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Usuario {
  id: number
  nome: string
  email: string
  role: "master" | "admin2" | "usuario"
}

export function Cabecalho() {
  const [menuAberto, setMenuAberto] = useState(false)
  const [usuario, setUsuario] = useState<Usuario | null>(null)

  useEffect(() => {
    verificarUsuario()
  }, [])

  const verificarUsuario = async () => {
    try {
      const resposta = await fetch("/api/usuario-atual")
      const dados = await resposta.json()
      if (dados.usuario) {
        setUsuario(dados.usuario)
      }
    } catch (erro) {
      console.error("[v0] Erro ao verificar usuário:", erro)
    }
  }

  const sair = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" })
      setUsuario(null)
      window.location.href = "/"
    } catch (erro) {
      console.error("[v0] Erro ao fazer logout:", erro)
    }
  }

  const rolarParaSecao = (id: string) => {
    if (window.location.pathname !== "/") {
      window.location.href = `/#${id}`
      return
    }

    const elemento = document.getElementById(id)
    if (elemento) {
      elemento.scrollIntoView({ behavior: "smooth" })
      setMenuAberto(false)
    }
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/images/logo-ruah-transparente.png"
              alt="RUAH Assessoria, Consultoria e Comércio"
              width={200}
              height={50}
              className="h-16 w-40"
              priority
            />
          </Link>

          {/* Navegação Desktop */}
          <nav className="hidden md:flex items-center gap-8">
            <button
              onClick={() => rolarParaSecao("inicio")}
              className="text-sm font-medium text-cream hover:text-gold transition-colors"
            >
              Início
            </button>
            <button
              onClick={() => rolarParaSecao("sobre")}
              className="text-sm font-medium text-cream hover:text-gold transition-colors"
            >
              Sobre Nós
            </button>
            <Link href="/servicos" className="text-sm font-medium text-cream hover:text-gold transition-colors">
              Serviços
            </Link>
            <button
              onClick={() => rolarParaSecao("contato")}
              className="text-sm font-medium text-cream hover:text-gold transition-colors"
            >
              Contato
            </button>

            {usuario && (usuario.role === "master" || usuario.role === "admin2") && (
              <div className="flex items-center gap-3 ml-4 pl-4 border-l border-border">
                <span className="text-sm text-cream/70">{usuario.nome}</span>
                <Link href="/admin">
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-gold text-gold hover:bg-gold hover:text-primary-foreground bg-transparent"
                  >
                    <Settings className="w-4 h-4 mr-1" />
                    Admin
                  </Button>
                </Link>
                <Button size="sm" variant="g" onClick={sair} className="text-cream hover:text-gold">
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            )}
          </nav>

          {/* Botão Menu Mobile */}
          <button
            onClick={() => setMenuAberto(!menuAberto)}
            className="md:hidden p-2 text-cream hover:text-gold transition-colors"
            aria-label="Alternar menu"
          >
            {menuAberto ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Navegação Mobile */}
        {menuAberto && (
          <nav className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-4">
              <button
                onClick={() => rolarParaSecao("inicio")}
                className="text-left text-sm font-medium text-cream hover:text-gold transition-colors py-2"
              >
                Início
              </button>
              <button
                onClick={() => rolarParaSecao("sobre")}
                className="text-left text-sm font-medium text-cream hover:text-gold transition-colors py-2"
              >
                Sobre Nós
              </button>
              <Link
                href="/servicos"
                className="text-left text-sm font-medium text-cream hover:text-gold transition-colors py-2"
              >
                Serviços
              </Link>
              <button
                onClick={() => rolarParaSecao("contato")}
                className="text-left text-sm font-medium text-cream hover:text-gold transition-colors py-2"
              >
                Contato
              </button>

              {usuario && (usuario.role === "master" || usuario.role === "admin2") && (
                <div className="pt-4 border-t border-border">
                  <p className="text-sm text-cream mb-2">Admin: {usuario.nome}</p>
                  <Link href="/admin" className="block py-2">
                    <Button size="sm" className="w-full bg-gold hover:bg-gold/90 text-primary-foreground">
                      <Settings className="w-4 h-4 mr-2" />
                      Painel Admin
                    </Button>
                  </Link>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={sair}
                    className="w-full mt-2 border-gold text-gold hover:bg-gold hover:text-primary-foreground bg-transparent"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sair
                  </Button>
                </div>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
