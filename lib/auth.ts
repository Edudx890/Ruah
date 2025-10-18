// Biblioteca de autenticação customizada
import { cookies } from "next/headers"

export interface Usuario {
  id: number
  nome: string
  email: string
  role: "master" | "admin2" | "usuario"
}

// Validar formato de senha (8 caracteres, 1 maiúscula, 1 minúscula, 1 número)
export function validarSenha(senha: string): { valida: boolean; mensagem?: string } {
  if (senha.length < 8) {
    return { valida: false, mensagem: "A senha deve ter no mínimo 8 caracteres" }
  }

  if (!/[A-Z]/.test(senha)) {
    return { valida: false, mensagem: "A senha deve conter pelo menos uma letra maiúscula" }
  }

  if (!/[a-z]/.test(senha)) {
    return { valida: false, mensagem: "A senha deve conter pelo menos uma letra minúscula" }
  }

  if (!/[0-9]/.test(senha)) {
    return { valida: false, mensagem: "A senha deve conter pelo menos um número" }
  }

  return { valida: true }
}

// Obter usuário atual da sessão
export async function obterUsuarioAtual(): Promise<Usuario | null> {
  const cookieStore = await cookies()
  const sessao = cookieStore.get("sessao_ruah")

  if (!sessao) {
    return null
  }

  try {
    const usuario = JSON.parse(sessao.value)
    return usuario
  } catch {
    return null
  }
}

// Verificar se usuário está autenticado
export async function estaAutenticado(): Promise<boolean> {
  const usuario = await obterUsuarioAtual()
  return usuario !== null
}

// Verificar se usuário é master
export async function eMaster(): Promise<boolean> {
  const usuario = await obterUsuarioAtual()
  return usuario?.role === "master"
}

// Verificar se usuário é admin (master ou admin2)
export async function eAdmin(): Promise<boolean> {
  const usuario = await obterUsuarioAtual()
  return usuario?.role === "master" || usuario?.role === "admin2"
}
