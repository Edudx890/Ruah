# Sistema RUAH - Preview v0

## ⚠️ IMPORTANTE - Sistema em Memória

Este preview está usando um **sistema de armazenamento em memória** para demonstração, pois o ambiente v0 não suporta conexões diretas ao SQL Server.

### Usuários Pré-cadastrados

Para testar o sistema, use estas credenciais:

**Usuário Master** (pode adicionar e remover serviços):
- Email: `master@ruah.com.br`
- Senha: `Master123`

**Usuário Admin2** (pode apenas adicionar serviços):
- Email: `admin@ruah.com.br`
- Senha: `Admin123`

### Funcionalidades Disponíveis

✅ Sistema de autenticação completo
✅ Dois tipos de administradores (master e admin2)
✅ Gerenciamento de serviços (CRUD)
✅ Página principal mostra 4 serviços mais acessados
✅ Botão "Ver Todos" quando há mais de 4 serviços
✅ Formulário de contato protegido (requer login)
✅ Validação de senha (8 caracteres, maiúscula, minúscula, número)
✅ Cores personalizadas (verde desidratado, creme, dourado)

### Limitações do Preview

⚠️ **Dados são resetados** quando o preview é reiniciado
⚠️ **Não há persistência real** - os dados existem apenas em memória

### Migração para Produção

Para usar em produção com SQL Server real:

1. Configure as variáveis de ambiente:
   - `DB_SERVER` - Servidor SQL Server
   - `DB_NAME` - Nome do banco (RUAH_DB)
   - `DB_USER` - Usuário do banco
   - `DB_PASSWORD` - Senha do banco

2. Execute o script SQL: `scripts/01-criar-banco-dados.sql`

3. Substitua as importações nas rotas de API:
   \`\`\`typescript
   // Trocar isto:
   import * as db from "@/lib/db-memoria"
   
   // Por isto:
   import { obterConexao } from "@/lib/db"
   \`\`\`

4. Reimplemente as funções de API usando SQL Server (veja comentários no código)

### Estrutura do Projeto

\`\`\`
app/
├── api/
│   ├── auth/          # Autenticação (login, registro, logout)
│   ├── servicos/      # CRUD de serviços
│   └── contato/       # Formulário de contato
├── login/             # Página de login
├── registro/          # Página de registro
├── servicos/          # Página com todos os serviços
└── admin/             # Painel administrativo

components/
├── cabecalho.tsx      # Header com navegação e menu de usuário
├── heroi.tsx          # Seção hero da home
├── sobre-nos.tsx      # Seção sobre nós
├── servicos.tsx       # Lista de serviços (4 principais)
├── contato.tsx        # Formulário de contato
├── rodape.tsx         # Footer
├── painel-admin.tsx   # Interface de administração
└── todos-servicos.tsx # Página com todos os serviços

lib/
├── db-memoria.ts      # Sistema em memória (PREVIEW)
├── db.ts              # Conexão SQL Server (PRODUÇÃO)
└── auth.ts            # Funções de autenticação
\`\`\`

### Testando o Sistema

1. **Criar conta de usuário comum**:
   - Vá para "Registro"
   - Crie uma conta com senha forte (ex: `Teste123`)

2. **Testar formulário de contato**:
   - Faça login
   - Vá para a seção "Contato"
   - Envie uma mensagem

3. **Testar painel administrativo**:
   - Faça login como master ou admin2
   - Acesse `/admin`
   - Adicione novos serviços
   - (Apenas master) Remova serviços

4. **Ver todos os serviços**:
   - Adicione mais de 4 serviços no painel admin
   - Volte para a home
   - Clique em "Ver Todos os Serviços"
