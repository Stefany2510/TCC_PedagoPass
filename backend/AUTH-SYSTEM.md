# 🔐 Sistema de Autenticação - PedagoPass

## ✅ Implementações Concluídas

### 1. Integração com Prisma + MySQL

O sistema de autenticação foi completamente refatorado para usar **Prisma ORM** com banco de dados **MySQL** real ao invés de mock em memória.

#### Configuração do Banco de Dados

**Arquivo `.env`:**
```properties
DATABASE_URL="mysql://facerec:iqmi8j55PDpHQ@mysql-facerec.alwaysdata.net:3306/facerec_pedagopass"
JWT_SECRET=G4n!$k2@rQ9vXyZpL8wH^t3jUeB7m
JWT_EXPIRES_IN=24h
PORT=4000
```

### 2. Estrutura de Dados (Schema Prisma)

**Modelo User:**
```prisma
model User {
  id           String   @id @default(uuid())
  email        String   @unique
  password     String   // Hash bcrypt
  name         String
  role         UserRole @default(TEACHER)
  avatarUrl    String?
  bio          String?
  escola       String?
  cidade       String?
  estado       String?
  pontos       Int      @default(0)
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
}
```

**Roles disponíveis:**
- `STUDENT` - Aluno
- `TEACHER` - Professor (padrão)
- `ADMIN` - Administrador

### 3. AuthService - Métodos Disponíveis

#### 📝 Cadastro de Usuário
```typescript
async register(data: RegisterDTO): Promise<{ user, token }>
```

**Validações:**
- E-mail único
- Formato válido de e-mail
- Senha mínima de 6 caracteres
- Hash bcrypt automático

**Exemplo de uso:**
```typescript
const { user, token } = await AuthService.register({
  email: 'professor@escola.com',
  password: 'senha123',
  name: 'João Silva',
  role: UserRole.TEACHER, // opcional
  escola: 'Escola Exemplo',
  cidade: 'São Paulo',
  estado: 'SP',
  bio: 'Professor de Matemática'
});
```

#### 🔑 Login
```typescript
async login(data: LoginDTO): Promise<{ user, token }>
```

**Validações:**
- Verifica se usuário existe
- Compara hash da senha com bcrypt
- Retorna JWT token com validade de 7 dias

**Exemplo de uso:**
```typescript
const { user, token } = await AuthService.login({
  email: 'professor@escola.com',
  password: 'senha123'
});
```

#### 👤 Buscar Usuário por ID
```typescript
async getUserById(userId: string)
```

#### 📧 Buscar Usuário por E-mail
```typescript
async getUserByEmail(email: string)
```

#### 📝 Atualizar Perfil
```typescript
async updateProfile(userId: string, data: UpdateProfileDTO)
```

**Campos atualizáveis:**
- `name` - Nome
- `avatarUrl` - URL do avatar
- `bio` - Biografia
- `escola` - Escola
- `cidade` - Cidade
- `estado` - Estado

#### 🔒 Alterar Senha
```typescript
async changePassword(userId: string, oldPassword: string, newPassword: string)
```

**Validações:**
- Verifica senha antiga
- Valida nova senha (mínimo 6 caracteres)
- Gera novo hash

#### 📋 Listar Todos os Usuários
```typescript
async getAllUsers()
```

### 4. AuthController - Endpoints REST

#### POST `/api/auth/register`
Cadastra novo usuário e retorna token em cookie HttpOnly.

**Body:**
```json
{
  "email": "professor@exemplo.com",
  "password": "senha123",
  "name": "João Silva",
  "role": "TEACHER",
  "escola": "Escola Exemplo",
  "cidade": "São Paulo",
  "estado": "SP",
  "bio": "Professor apaixonado por educação"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Usuário registrado com sucesso",
  "user": {
    "id": "uuid",
    "email": "professor@exemplo.com",
    "name": "João Silva",
    "role": "TEACHER",
    "escola": "Escola Exemplo",
    "cidade": "São Paulo",
    "estado": "SP",
    "pontos": 0,
    "createdAt": "2025-01-15T..."
  }
}
```

#### POST `/api/auth/login`
Faz login e retorna token em cookie HttpOnly.

**Body:**
```json
{
  "email": "professor@exemplo.com",
  "password": "senha123"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Login realizado com sucesso",
  "user": { ... }
}
```

#### POST `/api/auth/logout`
Remove cookie de autenticação.

**Response (200):**
```json
{
  "success": true,
  "message": "Logout realizado com sucesso"
}
```

#### GET `/api/auth/me` 🔒
Retorna dados do usuário autenticado (requer token).

**Headers:**
```
Cookie: auth_token=jwt_token_aqui
```

**Response (200):**
```json
{
  "success": true,
  "user": { ... }
}
```

#### GET `/api/auth/validate`
Valida se o token do cookie é válido.

**Response (200):**
```json
{
  "success": true,
  "message": "Token válido",
  "user": { ... }
}
```

#### PUT `/api/auth/profile` 🔒
Atualiza perfil do usuário autenticado.

**Body:**
```json
{
  "name": "João Silva Santos",
  "avatarUrl": "https://exemplo.com/avatar.jpg",
  "bio": "Professor com 10 anos de experiência",
  "escola": "Colégio São José",
  "cidade": "Rio de Janeiro",
  "estado": "RJ"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Perfil atualizado com sucesso",
  "user": { ... }
}
```

#### PUT `/api/auth/change-password` 🔒
Altera senha do usuário autenticado.

**Body:**
```json
{
  "oldPassword": "senha123",
  "newPassword": "novaSenha456"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Senha alterada com sucesso"
}
```

### 5. Middleware de Autenticação

#### `authMiddleware`
Middleware **obrigatório** que verifica token JWT no cookie.

**Uso:**
```typescript
router.get('/perfil', authMiddleware, UserController.getProfile);
```

**Comportamento:**
- Busca token no cookie `auth_token`
- Valida token JWT
- Adiciona `req.user` com payload do token
- Retorna 401 se não autenticado

#### `optionalAuthMiddleware`
Middleware **opcional** que adiciona usuário se autenticado, mas continua sem erro.

**Uso:**
```typescript
router.get('/posts', optionalAuthMiddleware, PostController.list);
```

### 6. Segurança Implementada

✅ **Senhas:**
- Hash bcrypt com 10 salt rounds
- Senhas nunca são retornadas nas respostas
- Validação de tamanho mínimo (6 caracteres)

✅ **JWT Tokens:**
- Assinados com secret forte (configurable via `.env`)
- Expiração configurável (padrão: 7 dias)
- Armazenados em cookies HttpOnly

✅ **Cookies HttpOnly:**
- Não acessíveis via JavaScript
- `secure: true` em produção (HTTPS)
- `sameSite: 'strict'` para CSRF protection
- Expiração de 7 dias

✅ **Validações:**
- Formato de e-mail
- E-mail único no banco
- Tamanho mínimo de senha
- Verificação de senha na alteração

## 🧪 Dados de Teste (Seed)

O banco foi populado com dados de exemplo:

### Usuários de Teste

| Email | Senha | Role | Nome |
|-------|-------|------|------|
| admin@pedagopass.com | 123456 | ADMIN | Admin PedagoPass |
| professor@exemplo.com | 123456 | TEACHER | Maria Silva |
| joao@exemplo.com | 123456 | TEACHER | João Santos |

### Comunidades Criadas

1. **Professores de Tecnologia** (2 membros)
2. **Intercâmbio Cultural** (1 membro)
3. **Metodologias Ativas** (1 membro)

### Posts e Comentários

3 posts de exemplo com comentários já criados.

## 🚀 Como Testar

### 1. Iniciar o servidor
```bash
cd backend
npm run dev
```

### 2. Testar com cURL

**Cadastro:**
```bash
curl -X POST http://localhost:4000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "teste@exemplo.com",
    "password": "senha123",
    "name": "Teste Silva",
    "escola": "Escola Teste",
    "cidade": "São Paulo",
    "estado": "SP"
  }'
```

**Login:**
```bash
curl -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -c cookies.txt \
  -d '{
    "email": "admin@pedagopass.com",
    "password": "123456"
  }'
```

**Buscar perfil (autenticado):**
```bash
curl http://localhost:4000/api/auth/me \
  -b cookies.txt
```

**Logout:**
```bash
curl -X POST http://localhost:4000/api/auth/logout \
  -b cookies.txt
```

### 3. Testar com Postman/Insomnia

1. Importe a collection (ou crie manualmente)
2. Configure base URL: `http://localhost:4000`
3. Ative "Send cookies" nas configurações
4. Faça login primeiro para obter o cookie
5. Endpoints protegidos usarão automaticamente o cookie

## 📚 Próximos Passos Sugeridos

1. ✅ **Implementado:** Cadastro e Login com Prisma
2. ✅ **Implementado:** Hash de senhas com bcrypt
3. ✅ **Implementado:** JWT tokens em cookies HttpOnly
4. ✅ **Implementado:** Middleware de autenticação
5. ✅ **Implementado:** Atualização de perfil
6. ✅ **Implementado:** Alteração de senha
7. 🔲 **Pendente:** Recuperação de senha por e-mail
8. 🔲 **Pendente:** Verificação de e-mail
9. 🔲 **Pendente:** Refresh tokens
10. 🔲 **Pendente:** Rate limiting (limitar tentativas de login)
11. 🔲 **Pendente:** Log de atividades de autenticação
12. 🔲 **Pendente:** 2FA (autenticação de dois fatores)

## 🔧 Comandos Úteis

```bash
# Executar seed (popular banco)
npm run seed

# Visualizar banco de dados
npx prisma studio

# Resetar banco de dados
npx prisma db push --force-reset

# Gerar Prisma Client após mudanças no schema
npx prisma generate
```

## 🐛 Troubleshooting

**Erro: "E-mail já cadastrado"**
- Verifique se já existe usuário com esse e-mail
- Use `npx prisma studio` para visualizar dados

**Erro: "Token inválido"**
- Faça login novamente
- Verifique se o cookie está sendo enviado

**Erro: "Credenciais inválidas"**
- Confirme email e senha
- Senha padrão dos usuários seed: `123456`

**Erro de conexão com banco**
- Verifique arquivo `.env`
- Teste conexão: `npx prisma db pull`
