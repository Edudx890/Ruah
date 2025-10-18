import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function POST() {
  try {
    const cookieStore = await cookies()
    cookieStore.delete("sessao_ruah")

    return NextResponse.json({ sucesso: true })
  } catch (erro) {
    console.error("[v0] Erro no logout:", erro)
    return NextResponse.json({ erro: "Erro ao fazer logout" }, { status: 500 })
  }
}
