import { type NextRequest, NextResponse } from "next/server"
import * as db from "@/lib/db-memoria"
import bcrypt from "bcryptjs"
import { cookies } from "next/headers"

export async function POST(request: NextRequest) {
  try {
    const { email, senha } = await request.json()

    // Validar campos obrigatórios
    if (!email || !senha) {
      return NextResponse.json({ erro: "Email e senha são obrigatórios" }, { status: 400 })
    }

    // Buscar usuário no banco
    const usuario = await db.buscarUsuarioPorEmail(email)

    if (!usuario) {
      return NextResponse.json({ erro: "Email ou senha incorretos" }, { status: 401 })
    }

    // Verificar se usuário está ativo
    if (!usuario.ativo) {
      return NextResponse.json({ erro: "Usuário inativo" }, { status: 401 })
    }

    // Verificar senha
    const senhaValida = await bcrypt.compare(senha, usuario.senha_hash)
    if (!senhaValida) {
      return NextResponse.json({ erro: "Email ou senha incorretos" }, { status: 401 })
    }

    // Criar sessão
    const dadosSessao = {
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email,
      role: usuario.role,
    }

    const cookieStore = await cookies()
    cookieStore.set("sessao_ruah", JSON.stringify(dadosSessao), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 dias
    })

    return NextResponse.json({
      sucesso: true,
      usuario: dadosSessao,
    })
  } catch (erro) {
    console.error("[v0] Erro no login:", erro)
    return NextResponse.json({ erro: "Erro ao fazer login" }, { status: 500 })
  }
}
