# Teste de Autenticação Frontend

## ✅ Implementações Concluídas

### 1. Backend (Express + Prisma + MySQL)
- ✅ Prisma configurado com banco MySQL remoto
- ✅ AuthService refatorado para usar Prisma (bcrypt + JWT)
- ✅ AuthController com endpoints completos
- ✅ Middleware de autenticação com cookies HttpOnly
- ✅ Seed data criado (3 usuários de teste)
- ✅ Backend rodando na porta 4000

### 2. Frontend (Next.js + React Query)
- ✅ API Service criada (`frontend/src/services/api/authApi.ts`)
- ✅ Hooks customizados criados (`frontend/src/hooks/useAuth.ts`)
- ✅ httpClient configurado com `withCredentials: true`
- ✅ Páginas login.tsx e cadastro.tsx atualizadas
- ✅ Configuração de porta corrigida (.env.local)

---

## 🧪 Como Testar

### Passo 1: Verificar Backend
O backend já está rodando na porta 4000 (PID 8220).

Teste a API diretamente:
```bash
curl http://localhost:4000/api/auth/validate
```

### Passo 2: Reiniciar Frontend
**IMPORTANTE**: O frontend precisa ser reiniciado para carregar as mudanças no `.env.local`:

```bash
cd frontend
npm run dev
```

### Passo 3: Testar Login
1. Acesse: http://localhost:3000/login
2. Use as credenciais de teste:
   - **Email**: `admin@pedagopass.com`
   - **Senha**: `123456`

3. O que deve acontecer:
   - ✅ Mensagem de sucesso "Login realizado com sucesso! Redirecionando..."
   - ✅ Cookie `auth_token` criado no navegador
   - ✅ Redirecionamento para página inicial
   - ✅ Usuário autenticado no sistema

### Passo 4: Testar Cadastro
1. Acesse: http://localhost:3000/cadastro
2. Preencha o formulário:
   - Nome: Seu nome
   - Email: seuemail@teste.com
   - Senha: 123456 (mínimo 6 caracteres)
   - Tipo de conta: Aluno ou Professor

3. O que deve acontecer:
   - ✅ Mensagem de sucesso "Cadastro realizado com sucesso! Redirecionando..."
   - ✅ Cookie `auth_token` criado
   - ✅ Redirecionamento para página inicial
   - ✅ Usuário autenticado automaticamente

---

## 🔍 Debug no Navegador

### Verificar Cookie
1. Abra DevTools (F12)
2. Vá em **Application** → **Cookies** → `http://localhost:3000`
3. Procure pelo cookie `auth_token`
4. Deve ter:
   - **HttpOnly**: true
   - **SameSite**: Strict
   - **Path**: /

### Verificar Requisições
1. Abra DevTools (F12) → **Network**
2. Faça login
3. Procure pela requisição POST para `http://localhost:4000/api/auth/login`
4. Verifique:
   - **Status**: 200 OK
   - **Response**: `{ user: {...}, token: "..." }`
   - **Set-Cookie** no header da resposta

### Verificar Estado do React Query
```javascript
// No console do navegador
queryClient.getQueryData(['auth', 'me'])
// Deve retornar os dados do usuário autenticado
```

---

## 🔐 Credenciais de Teste

### Usuários criados no seed:
1. **Admin**
   - Email: `admin@pedagopass.com`
   - Senha: `123456`
   - Role: ADMIN

2. **Professor**
   - Email: `professor@exemplo.com`
   - Senha: `123456`
   - Role: TEACHER

3. **Aluno**
   - Email: `joao@exemplo.com`
   - Senha: `123456`
   - Role: STUDENT

---

## 📁 Arquivos Criados/Modificados

### Novos Arquivos:
- ✅ `frontend/src/services/api/authApi.ts` - Service de autenticação
- ✅ `backend/src/lib/prisma.ts` - Cliente Prisma singleton
- ✅ `backend/prisma/schema.prisma` - Schema do banco
- ✅ `backend/prisma/seed.ts` - Dados de teste

### Arquivos Atualizados:
- ✅ `frontend/src/hooks/useAuth.ts` - Hooks com React Query
- ✅ `frontend/src/pages/login.tsx` - Usa useLogin hook
- ✅ `frontend/src/pages/cadastro.tsx` - Usa useRegister hook
- ✅ `frontend/src/lib/httpClient.ts` - withCredentials + 401 handler
- ✅ `frontend/.env.local` - Porta corrigida para 4000
- ✅ `backend/src/services/AuthService.ts` - Usa Prisma
- ✅ `backend/src/controllers/AuthController.ts` - Endpoints atualizados
- ✅ `backend/.env` - Credenciais MySQL

---

## 🚀 Próximos Passos

1. **Testar fluxo completo de autenticação**
2. **Atualizar outros services (PostService, etc) para usar Prisma**
3. **Implementar proteção de rotas com `useRequireAuth`**
4. **Adicionar recuperação de senha**
5. **Implementar verificação de email**

---

## ⚠️ Troubleshooting

### Erro: ERR_CONNECTION_REFUSED
- ✅ **Resolvido**: Port mismatch corrigido (4001 → 4000)
- Certifique-se que backend está rodando: `netstat -ano | findstr :4000`

### Cookie não está sendo criado
- Verifique que `withCredentials: true` está em `httpClient.ts`
- Verifique que o backend retorna `Set-Cookie` header
- Certifique-se que está usando `http://localhost` (não `127.0.0.1`)

### Login não redireciona
- Abra console do navegador e procure erros
- Verifique que o hook `useLogin` está usando `router.push`

### TypeScript errors
- Execute: `cd frontend && npm run build`
- Todos os arquivos devem compilar sem erros

---

## 📞 Suporte

Se encontrar problemas:
1. Verifique o console do navegador (F12)
2. Verifique logs do backend no terminal
3. Teste endpoints diretamente com curl/Postman
4. Verifique que o banco MySQL está acessível
