import { redirect } from "next/navigation"
import { eAdmin } from "@/lib/auth"
import { Cabecalho } from "@/components/cabecalho"
import { PainelAdmin } from "@/components/painel-admin"

export default async function PaginaAdmin() {
  const isAdmin = await eAdmin()

  if (!isAdmin) {
    redirect("/login")
  }

  return (
    <main className="min-h-screen bg-background">
      <Cabecalho />
      <PainelAdmin />
    </main>
  )
}
