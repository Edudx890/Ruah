import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function POST(req: Request) {
  try {
  const { nome, email, telefone, mensagem } = await req.json()
    if (!nome || !email || !mensagem) {
      return NextResponse.json(
        { erro: "Preencha todos os campos." },
        { status: 400 }
      )
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    })

    await transporter.sendMail({
      from: `"Site RUAH" <${process.env.EMAIL_USER}>`,
      to: "ruah.assconsult@gmail.com",
      subject: "Nova mensagem recebida pelo site RUAH",
      html: `
        <h2>Nova mensagem enviada pelo site</h2>
        <p><strong>Nome:</strong> ${nome}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Mensagem:</strong></p>
        <p>${mensagem}</p>
      `,
    })

    return NextResponse.json({ sucesso: true })
  } catch (erro) {
    console.error("Erro ao enviar email:", erro)
    return NextResponse.json(
      { erro: "Erro ao enviar mensagem." },
      { status: 500 }
    )
  }
}