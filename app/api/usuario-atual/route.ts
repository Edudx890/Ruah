import { NextResponse } from "next/server"
import { obterUsuarioAtual } from "@/lib/auth"

export async function GET() {
  try {
    const usuario = await obterUsuarioAtual()

    if (!usuario) {
      return NextResponse.json({ usuario: null })
    }

    return NextResponse.json({ usuario })
  } catch (erro) {
    console.error("[v0] Erro ao obter usuário atual:", erro)
    return NextResponse.json({ erro: "Erro ao obter usuário" }, { status: 500 })
  }
}
