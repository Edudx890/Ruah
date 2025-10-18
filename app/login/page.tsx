import { LoginForm } from "@/components/login-form"
import { Cabecalho } from "@/components/cabecalho"

export default function PaginaLogin() {
  return (
    <main className="min-h-screen bg-background">
      <Cabecalho />
      <div className="container mx-auto px-4 py-24">
        <LoginForm />
      </div>
    </main>
  )
}
