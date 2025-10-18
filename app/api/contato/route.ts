import { NextResponse } from "next/server"
import * as db from "@/lib/db-memoria"

export async function POST(requisicao: Request) {
  try {
    const corpo = await requisicao.json()
    const { nome, email, telefone, mensagem } = corpo

    // Validar entrada
    if (!nome || !email || !mensagem) {
      return NextResponse.json({ erro: "Nome, email e mensagem são obrigatórios" }, { status: 400 })
    }

    await db.criarContato({
      nome,
      email,
      telefone: telefone || "",
      mensagem,
      usuario_id: null, // Não requer usuário logado
    })

    return NextResponse.json({ mensagem: "Mensagem enviada com sucesso" }, { status: 200 })
  } catch (erro) {
    console.error("[v0] Erro ao processar formulário de contato:", erro)
    return NextResponse.json({ erro: "Erro ao processar solicitação" }, { status: 500 })
  }
}
