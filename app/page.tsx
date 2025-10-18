import { Cabecalho } from "@/components/cabecalho"
import { Heroi } from "@/components/heroi"
import { SobreNos } from "@/components/sobre-nos"
import { Servicos } from "@/components/servicos"
import { Contato } from "@/components/contato"
import { Rodape } from "@/components/rodape"
import { BotaoWhatsApp } from "@/components/botao-whatsapp"

export default function PaginaInicial() {
  return (
    <main className="min-h-screen">
      <Cabecalho />
      <Heroi />
      <SobreNos />
      <Servicos />
      <Contato />
      <Rodape />
      <BotaoWhatsApp />
    </main>
  )
}
