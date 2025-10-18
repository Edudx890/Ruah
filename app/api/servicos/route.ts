import { type NextRequest, NextResponse } from "next/server"
import * as db from "@/lib/db-memoria"
import { obterUsuarioAtual, eAdmin, eMaster } from "@/lib/auth"

// GET - Listar serviços
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const limite = searchParams.get("limite")
    const apenasAtivos = searchParams.get("ativos") !== "false"

    const servicos = await db.listarServicos({
      limite: limite ? Number.parseInt(limite) : undefined,
      apenasAtivos,
    })

    return NextResponse.json({
      sucesso: true,
      servicos,
    })
  } catch (erro) {
    console.error("[v0] Erro ao listar serviços:", erro)
    return NextResponse.json({ erro: "Erro ao listar serviços" }, { status: 500 })
  }
}

// POST - Criar novo serviço (requer admin)
export async function POST(request: NextRequest) {
  try {
    const usuario = await obterUsuarioAtual()

    if (!usuario || !(await eAdmin())) {
      return NextResponse.json({ erro: "Acesso negado" }, { status: 403 })
    }

    const { titulo, descricao, icone, ordem } = await request.json()

    if (!titulo || !descricao || !icone) {
      return NextResponse.json({ erro: "Título, descrição e ícone são obrigatórios" }, { status: 400 })
    }

    const servico = await db.criarServico({
      titulo,
      descricao,
      icone,
      ordem: ordem || 0,
      criado_por: usuario.id,
    })

    return NextResponse.json({
      sucesso: true,
      servico,
    })
  } catch (erro) {
    console.error("[v0] Erro ao criar serviço:", erro)
    return NextResponse.json({ erro: "Erro ao criar serviço" }, { status: 500 })
  }
}

// DELETE - Remover serviço (requer master)
export async function DELETE(request: NextRequest) {
  try {
    if (!(await eMaster())) {
      return NextResponse.json({ erro: "Apenas usuários master podem remover serviços" }, { status: 403 })
    }

    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json({ erro: "ID do serviço é obrigatório" }, { status: 400 })
    }

    const sucesso = await db.removerServico(Number.parseInt(id))

    if (!sucesso) {
      return NextResponse.json({ erro: "Serviço não encontrado" }, { status: 404 })
    }

    return NextResponse.json({ sucesso: true })
  } catch (erro) {
    console.error("[v0] Erro ao remover serviço:", erro)
    return NextResponse.json({ erro: "Erro ao remover serviço" }, { status: 500 })
  }
}
