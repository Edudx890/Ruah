import { type NextRequest, NextResponse } from "next/server"
import * as db from "@/lib/db-memoria"
import { validarSenha } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    const { nome, email, senha } = await request.json()

    // Validar campos obrigatórios
    if (!nome || !email || !senha) {
      return NextResponse.json({ erro: "Todos os campos são obrigatórios" }, { status: 400 })
    }

    // Validar formato da senha
    const validacao = validarSenha(senha)
    if (!validacao.valida) {
      return NextResponse.json({ erro: validacao.mensagem }, { status: 400 })
    }

    // Verificar se email já existe
    const usuarioExistente = await db.buscarUsuarioPorEmail(email)
    if (usuarioExistente) {
      return NextResponse.json({ erro: "Email já cadastrado" }, { status: 400 })
    }

    // Criar usuário (role padrão: usuario)
    const novoUsuario = await db.criarUsuario({
      nome,
      email,
      senha,
      role: "usuario",
    })

    return NextResponse.json({
      sucesso: true,
      usuario: {
        id: novoUsuario.id,
        nome: novoUsuario.nome,
        email: novoUsuario.email,
        role: novoUsuario.role,
      },
    })
  } catch (erro) {
    console.error("[v0] Erro no registro:", erro)
    return NextResponse.json({ erro: "Erro ao criar conta" }, { status: 500 })
  }
}
