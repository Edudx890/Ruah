// NOTA: Este é um sistema temporário para demonstração no preview do v0
// Em produção, substitua por conexão real ao SQL Server usando lib/db.ts

import bcrypt from "bcryptjs"

// Tipos de dados
export interface Usuario {
  id: number
  nome: string
  email: string
  senha_hash: string
  role: "master" | "admin2" | "usuario"
  ativo: boolean
  criado_em: Date
}

export interface Servico {
  id: number
  titulo: string
  descricao: string
  icone: string
  ordem: number
  acessos: number
  ativo: boolean
  criado_por: number
  criado_em: Date
}

export interface Contato {
  id: number
  nome: string
  email: string
  telefone: string
  mensagem: string
  usuario_id: number | null
  criado_em: Date
}

// Armazenamento em memória
const usuarios: Usuario[] = []
const servicos: Servico[] = []
const contatos: Contato[] = []

// Contadores de ID
let proximoIdUsuario = 1
let proximoIdServico = 1
let proximoIdContato = 1

// Inicializar dados padrão
async function inicializarDados() {
  if (usuarios.length === 0) {
    // Criar usuário master padrão
    const senhaHashMaster = await bcrypt.hash("Master123", 10)
    usuarios.push({
      id: proximoIdUsuario++,
      nome: "Administrador Master",
      email: "master@ruah.com.br",
      senha_hash: senhaHashMaster,
      role: "master",
      ativo: true,
      criado_em: new Date(),
    })

    // Criar usuário admin2 padrão
    const senhaHashAdmin2 = await bcrypt.hash("Admin123", 10)
    usuarios.push({
      id: proximoIdUsuario++,
      nome: "Administrador",
      email: "admin@ruah.com.br",
      senha_hash: senhaHashAdmin2,
      role: "admin2",
      ativo: true,
      criado_em: new Date(),
    })

    // Criar servicos padrao baseados nos pilares da proposta comercial
    servicos.push(
      {
        id: proximoIdServico++,
        titulo: "Gestao Publica",
        descricao:
          "Consultoria estrategica, assessoria em licitacoes, gestao de projetos, compliance e reengenharia administrativa para municipios.",
        icone: "Landmark",
        ordem: 1,
        acessos: 150,
        ativo: true,
        criado_por: 1,
        criado_em: new Date(),
      },
      {
        id: proximoIdServico++,
        titulo: "Educacao",
        descricao:
          "Apoio tecnico ao PAR/FNDE, formacao continuada de professores, curriculo alinhado a BNCC e captacao de recursos federais.",
        icone: "GraduationCap",
        ordem: 2,
        acessos: 120,
        ativo: true,
        criado_por: 1,
        criado_em: new Date(),
      },
      {
        id: proximoIdServico++,
        titulo: "Saude e Assistencia Social",
        descricao:
          "Assessoria tecnica na gestao do SUS, fortalecimento do SUAS, monitoramento de indicadores e captacao de repasses federais.",
        icone: "HeartPulse",
        ordem: 3,
        acessos: 95,
        ativo: true,
        criado_por: 1,
        criado_em: new Date(),
      },
      {
        id: proximoIdServico++,
        titulo: "Relacoes Internacionais",
        descricao:
          "Suporte a embaixadas e organismos internacionais, gestao de eventos diplomaticos e cerimonial de Estado.",
        icone: "Globe",
        ordem: 4,
        acessos: 80,
        ativo: true,
        criado_por: 1,
        criado_em: new Date(),
      },
      {
        id: proximoIdServico++,
        titulo: "Controladoria",
        descricao:
          "Programas de integridade, auditoria interna, transparencia publica e saneamento de pendencias junto ao CAUC.",
        icone: "ShieldCheck",
        ordem: 5,
        acessos: 70,
        ativo: true,
        criado_por: 1,
        criado_em: new Date(),
      },
      {
        id: proximoIdServico++,
        titulo: "Treinamento e Capacitacao",
        descricao:
          "Formacao de servidores em licitacoes, sistemas federais, gestao de pessoas e metodologias de ensino.",
        icone: "BookOpen",
        ordem: 6,
        acessos: 60,
        ativo: true,
        criado_por: 1,
        criado_em: new Date(),
      },
    )
  }
}

// Funções de usuários
export async function buscarUsuarioPorEmail(email: string): Promise<Usuario | null> {
  await inicializarDados()
  return usuarios.find((u) => u.email === email) || null
}

export async function buscarUsuarioPorId(id: number): Promise<Usuario | null> {
  await inicializarDados()
  return usuarios.find((u) => u.id === id) || null
}

export async function criarUsuario(dados: {
  nome: string
  email: string
  senha: string
  role?: "master" | "admin2" | "usuario"
}): Promise<Usuario> {
  await inicializarDados()

  const senhaHash = await bcrypt.hash(dados.senha, 10)

  const novoUsuario: Usuario = {
    id: proximoIdUsuario++,
    nome: dados.nome,
    email: dados.email,
    senha_hash: senhaHash,
    role: dados.role || "usuario",
    ativo: true,
    criado_em: new Date(),
  }

  usuarios.push(novoUsuario)
  return novoUsuario
}

// Funções de serviços
export async function listarServicos(opcoes?: {
  limite?: number
  apenasAtivos?: boolean
}): Promise<Servico[]> {
  await inicializarDados()

  let resultado = [...servicos]

  if (opcoes?.apenasAtivos !== false) {
    resultado = resultado.filter((s) => s.ativo)
  }

  // Ordenar por acessos (decrescente) e depois por ordem
  resultado.sort((a, b) => {
    if (b.acessos !== a.acessos) {
      return b.acessos - a.acessos
    }
    return a.ordem - b.ordem
  })

  if (opcoes?.limite) {
    resultado = resultado.slice(0, opcoes.limite)
  }

  return resultado
}

export async function buscarServicoPorId(id: number): Promise<Servico | null> {
  await inicializarDados()
  return servicos.find((s) => s.id === id) || null
}

export async function criarServico(dados: {
  titulo: string
  descricao: string
  icone: string
  ordem?: number
  criado_por: number
}): Promise<Servico> {
  await inicializarDados()

  const novoServico: Servico = {
    id: proximoIdServico++,
    titulo: dados.titulo,
    descricao: dados.descricao,
    icone: dados.icone,
    ordem: dados.ordem || 0,
    acessos: 0,
    ativo: true,
    criado_por: dados.criado_por,
    criado_em: new Date(),
  }

  servicos.push(novoServico)
  return novoServico
}

export async function atualizarServico(
  id: number,
  dados: Partial<Omit<Servico, "id" | "criado_em" | "criado_por">>,
): Promise<Servico | null> {
  await inicializarDados()

  const indice = servicos.findIndex((s) => s.id === id)
  if (indice === -1) return null

  servicos[indice] = { ...servicos[indice], ...dados }
  return servicos[indice]
}

export async function removerServico(id: number): Promise<boolean> {
  await inicializarDados()

  const indice = servicos.findIndex((s) => s.id === id)
  if (indice === -1) return false

  servicos.splice(indice, 1)
  return true
}

export async function incrementarAcessosServico(id: number): Promise<void> {
  await inicializarDados()

  const servico = servicos.find((s) => s.id === id)
  if (servico) {
    servico.acessos++
  }
}

// Funções de contatos
export async function criarContato(dados: {
  nome: string
  email: string
  telefone: string
  mensagem: string
  usuario_id?: number
}): Promise<Contato> {
  await inicializarDados()

  const novoContato: Contato = {
    id: proximoIdContato++,
    nome: dados.nome,
    email: dados.email,
    telefone: dados.telefone,
    mensagem: dados.mensagem,
    usuario_id: dados.usuario_id || null,
    criado_em: new Date(),
  }

  contatos.push(novoContato)
  return novoContato
}

export async function listarContatos(): Promise<Contato[]> {
  await inicializarDados()
  return [...contatos].sort((a, b) => b.criado_em.getTime() - a.criado_em.getTime())
}
