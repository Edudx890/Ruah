"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"

export function LoginForm() {
  const [carregando, setCarregando] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const manipularEnvio = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setCarregando(true)

    const dadosFormulario = new FormData(e.currentTarget)
    const dados = {
      email: dadosFormulario.get("email"),
      senha: dadosFormulario.get("senha"),
    }

    try {
      const resposta = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados),
      })

      const resultado = await resposta.json()

      if (resposta.ok) {
        toast({
          title: "Login realizado!",
          description: `Bem-vindo, ${resultado.usuario.nome}`,
        })
        router.push("/")
        router.refresh()
      } else {
        toast({
          title: "Erro no login",
          description: resultado.erro || "Credenciais inválidas",
          variant: "destructive",
        })
      }
    } catch (erro) {
      toast({
        title: "Erro",
        description: "Não foi possível fazer login. Tente novamente.",
        variant: "destructive",
      })
    } finally {
      setCarregando(false)
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <Card className="border-border bg-card-aged shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="font-serif text-3xl text-cream">Entrar</CardTitle>
          <CardDescription className="text-cream/70">Faça login para acessar sua conta</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={manipularEnvio} className="space-y-4">
            <div>
              <Input
                type="email"
                name="email"
                placeholder="E-mail"
                required
                className="bg-background border-border text-cream placeholder:text-cream/50 focus:border-gold focus:ring-gold"
              />
            </div>

            <div>
              <Input
                type="password"
                name="senha"
                placeholder="Senha"
                required
                className="bg-background border-border text-cream placeholder:text-cream/50 focus:border-gold focus:ring-gold"
              />
            </div>

            <Button
              type="submit"
              disabled={carregando}
              className="w-full bg-gold hover:bg-gold/90 text-primary-foreground font-medium"
            >
              {carregando ? "Entrando..." : "Entrar"}
            </Button>

            <p className="text-center text-sm text-cream/70">
              Não tem uma conta?{" "}
              <Link href="/registro" className="text-gold hover:underline">
                Criar conta
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
