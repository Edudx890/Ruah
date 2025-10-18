import { type NextRequest, NextResponse } from "next/server"
import * as db from "@/lib/db-memoria"

export async function POST(request: NextRequest) {
  try {
    const { id } = await request.json()

    if (!id) {
      return NextResponse.json({ erro: "ID do serviço é obrigatório" }, { status: 400 })
    }

    await db.incrementarAcessosServico(Number.parseInt(id))

    return NextResponse.json({ sucesso: true })
  } catch (erro) {
    console.error("[v0] Erro ao incrementar acesso:", erro)
    return NextResponse.json({ erro: "Erro ao incrementar acesso" }, { status: 500 })
  }
}
