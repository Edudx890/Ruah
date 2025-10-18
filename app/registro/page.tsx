import { RegistroForm } from "@/components/registro-form"
import { Cabecalho } from "@/components/cabecalho"

export default function PaginaRegistro() {
  return (
    <main className="min-h-screen bg-background">
      <Cabecalho />
      <div className="container mx-auto px-4 py-24">
        <RegistroForm />
      </div>
    </main>
  )
}
