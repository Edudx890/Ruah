# RUAH - Site Institucional

Site institucional da RUAH Assessoria, Consultoria e Comércio.

## Funcionalidades

### Sistema de Autenticação
- Login e registro de usuários
- Validação de senha (mínimo 8 caracteres, 1 maiúscula, 1 minúscula, 1 número)
- Sessões seguras com cookies HTTP-only

### Tipos de Usuários
- **Usuário comum**: Pode navegar no site e enviar mensagens de contato (requer login)
- **Admin2**: Pode adicionar novos serviços
- **Master**: Pode adicionar e remover serviços

### Gerenciamento de Serviços
- Página principal mostra até 4 serviços mais acessados
- Botão "Ver Todos" aparece quando há mais de 4 serviços
- Painel administrativo para gerenciar serviços
- Contador de acessos para cada serviço

### Formulário de Contato
- Requer autenticação para enviar mensagens
- Salva mensagens no banco de dados vinculadas ao usuário

## Configuração

### Variáveis de Ambiente

Adicione as seguintes variáveis de ambiente no seu projeto:

\`\`\`env
DB_SERVER=seu-servidor-sql
DB_NAME=RUAH_DB
DB_USER=seu-usuario
DB_PASSWORD=sua-senha
\`\`\`

### Banco de Dados

Execute o script SQL em `scripts/01-criar-banco-dados.sql` para criar:
- Banco de dados RUAH_DB
- Tabela de Usuários
- Tabela de Serviços
- Tabela de Contatos
- Tabela de Visitas
- Índices para performance

### Usuário Master Padrão

O script cria um usuário master padrão:
- Email: master@ruah.com
- Senha: Master123

**IMPORTANTE**: Altere a senha após o primeiro login!

## Estrutura do Projeto

\`\`\`
app/
├── api/
│   ├── auth/
│   │   ├── login/route.ts
│   │   ├── registro/route.ts
│   │   └── logout/route.ts
│   ├── servicos/
│   │   ├── route.ts
│   │   └── incrementar-acesso/route.ts
│   ├── contato/route.ts
│   └── usuario-atual/route.ts
├── login/page.tsx
├── registro/page.tsx
├── servicos/page.tsx
├── admin/page.tsx
└── page.tsx

components/
├── cabecalho.tsx
├── heroi.tsx
├── sobre-nos.tsx
├── servicos.tsx
├── todos-servicos.tsx
├── contato.tsx
├── rodape.tsx
├── botao-whatsapp.tsx
├── login-form.tsx
├── registro-form.tsx
└── painel-admin.tsx

lib/
├── auth.ts
└── db.ts
\`\`\`

## Paleta de Cores

- **Verde desidratado**: Fundo principal
- **Creme**: Textos
- **Dourado vibrante**: Detalhes e elementos interativos
- **Dourado envelhecido**: Fundos de cards

## Tecnologias

- Next.js 15
- TypeScript
- Tailwind CSS v4
- SQL Server
- bcryptjs para hash de senhas
- Lucide React para ícones
