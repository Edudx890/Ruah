"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"

export function RegistroForm() {
  const [carregando, setCarregando] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const manipularEnvio = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setCarregando(true)

    const dadosFormulario = new FormData(e.currentTarget)
    const dados = {
      nome: dadosFormulario.get("nome"),
      email: dadosFormulario.get("email"),
      senha: dadosFormulario.get("senha"),
    }

    try {
      const resposta = await fetch("/api/auth/registro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados),
      })

      const resultado = await resposta.json()

      if (resposta.ok) {
        toast({
          title: "Conta criada!",
          description: "Agora você pode fazer login",
        })
        router.push("/login")
      } else {
        toast({
          title: "Erro ao criar conta",
          description: resultado.erro || "Tente novamente",
          variant: "destructive",
        })
      }
    } catch (erro) {
      toast({
        title: "Erro",
        description: "Não foi possível criar conta. Tente novamente.",
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
          <CardTitle className="font-serif text-3xl text-cream">Criar Conta</CardTitle>
          <CardDescription className="text-cream/70">Preencha os dados para se cadastrar</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={manipularEnvio} className="space-y-4">
            <div>
              <Input
                type="text"
                name="nome"
                placeholder="Nome completo"
                required
                className="bg-background border-border text-cream placeholder:text-cream/50 focus:border-gold focus:ring-gold"
              />
            </div>

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
                placeholder="Senha (mín. 8 caracteres)"
                required
                minLength={8}
                className="bg-background border-border text-cream placeholder:text-cream/50 focus:border-gold focus:ring-gold"
              />
              <p className="text-xs text-cream/60 mt-1">Deve conter: 1 maiúscula, 1 minúscula e 1 número</p>
            </div>

            <Button
              type="submit"
              disabled={carregando}
              className="w-full bg-gold hover:bg-gold/90 text-primary-foreground font-medium"
            >
              {carregando ? "Criando conta..." : "Criar conta"}
            </Button>

            <p className="text-center text-sm text-cream/70">
              Já tem uma conta?{" "}
              <Link href="/login" className="text-gold hover:underline">
                Fazer login
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
