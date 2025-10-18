import { Cabecalho } from "@/components/cabecalho"
import { Rodape } from "@/components/rodape"
import { BotaoWhatsApp } from "@/components/botao-whatsapp"
import { TodosServicos } from "@/components/todos-servicos"

export default function PaginaTodosServicos() {
  return (
    <main className="min-h-screen bg-background">
      <Cabecalho />
      <TodosServicos />
      <Rodape />
      <BotaoWhatsApp />
    </main>
  )
}
