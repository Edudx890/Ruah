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
  const [rolou, setRolou] = useState(false)
  const [usuario, setUsuario] = useState<Usuario | null>(null)

  useEffect(() => {
    verificarUsuario()

    const aoRolar = () => {
      setRolou(window.scrollY > 50)
    }
    window.addEventListener("scroll", aoRolar)
    return () => window.removeEventListener("scroll", aoRolar)
  }, [])

  const verificarUsuario = async () => {
    try {
      const resposta = await fetch("/api/usuario-atual")
      const dados = await resposta.json()
      if (dados.usuario) {
        setUsuario(dados.usuario)
      }
    } catch (erro) {
      console.error("Erro ao verificar usuario:", erro)
    }
  }

  const sair = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" })
      setUsuario(null)
      window.location.href = "/"
    } catch (erro) {
      console.error("Erro ao fazer logout:", erro)
    }
  }

  const rolarParaSecao = (id: string) => {
    if (window.location.pathname !== "/") {
      window.location.href = `/#${id}`
      return
    }
    const elemento = document.getElementById(id)
    if (elemento) {
      const deslocamento = 80
      const posicao = elemento.getBoundingClientRect().top + window.pageYOffset - deslocamento
      window.scrollTo({ top: posicao, behavior: "smooth" })
      setMenuAberto(false)
    }
  }

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${rolou ? "nav-scrolled" : "bg-transparent"}`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="relative block">
            <Image
              src="/images/logo-ruah.png"
              alt="RUAH Assessoria, Consultoria e Comercio"
              width={140}
              height={70}
              className="h-11 md:h-16 w-auto object-contain transition-all duration-300"
              style={{
                filter: rolou ? "none" : "brightness(1.6) saturate(0.8)",
              }}
              priority
            />
          </Link>

          {/* Menu Desktop */}
          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => rolarParaSecao("inicio")}
              className="text-sm tracking-[0.15em] uppercase transition-colors duration-300 hover:text-ruah-gold"
              style={{ color: rolou ? "#5D4037" : "#FAF7F0" }}
            >
              Sobre
            </button>
            <button
              onClick={() => rolarParaSecao("servicos")}
              className="text-sm tracking-[0.15em] uppercase transition-colors duration-300 hover:text-ruah-gold"
              style={{ color: rolou ? "#5D4037" : "#FAF7F0" }}
            >
              Servicos
            </button>
            <button
              onClick={() => rolarParaSecao("contato")}
              className="text-sm tracking-[0.15em] uppercase transition-colors duration-300 hover:text-ruah-gold"
              style={{ color: rolou ? "#5D4037" : "#FAF7F0" }}
            >
              Contato
            </button>

            {/* Botoes Admin */}
            {usuario && (usuario.role === "master" || usuario.role === "admin2") && (
              <div className="flex items-center gap-3 ml-4 pl-4 border-l border-ruah-sand">
                <span className="text-sm" style={{ color: rolou ? "#5D4037" : "#FAF7F0" }}>
                  {usuario.nome}
                </span>
                <Link href="/admin">
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-ruah-gold text-ruah-gold hover:bg-ruah-gold hover:text-ruah-brown bg-transparent"
                  >
                    <Settings className="w-4 h-4 mr-1" />
                    Admin
                  </Button>
                </Link>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={sair}
                  className="hover:text-ruah-gold"
                  style={{ color: rolou ? "#5D4037" : "#FAF7F0" }}
                >
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>

          {/* Botao Menu Mobile */}
          <button
            onClick={() => setMenuAberto(!menuAberto)}
            className="md:hidden"
            style={{ color: rolou ? "#3E2723" : "#FAF7F0" }}
            aria-label="Menu"
          >
            {menuAberto ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Menu Mobile */}
      {menuAberto && (
        <div className="md:hidden bg-ruah-cream border-t border-ruah-sand absolute w-full shadow-lg">
          <div className="container mx-auto px-6 py-4 flex flex-col gap-4">
            <button
              onClick={() => rolarParaSecao("inicio")}
              className="text-left text-ruah-brown hover:text-ruah-gold transition-colors py-2 border-b border-ruah-sand"
            >
              Sobre
            </button>
            <button
              onClick={() => rolarParaSecao("servicos")}
              className="text-left text-ruah-brown hover:text-ruah-gold transition-colors py-2 border-b border-ruah-sand"
            >
              Servicos
            </button>
            <button
              onClick={() => rolarParaSecao("contato")}
              className="text-left text-ruah-brown hover:text-ruah-gold transition-colors py-2"
            >
              Contato
            </button>

            {usuario && (usuario.role === "master" || usuario.role === "admin2") && (
              <div className="pt-4 border-t border-ruah-sand">
                <p className="text-sm text-ruah-brown-light mb-2">Admin: {usuario.nome}</p>
                <Link href="/admin" className="block py-2">
                  <Button size="sm" className="w-full bg-ruah-gold hover:bg-ruah-gold-light text-ruah-brown">
                    <Settings className="w-4 h-4 mr-2" />
                    Painel Admin
                  </Button>
                </Link>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={sair}
                  className="w-full mt-2 border-ruah-gold text-ruah-gold hover:bg-ruah-gold hover:text-ruah-brown bg-transparent"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sair
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
