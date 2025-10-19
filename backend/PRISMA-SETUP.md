# Prisma Setup - PedagoPass Backend

## 📦 Instalação

O Prisma já foi instalado e configurado neste projeto. As dependências incluem:

```bash
npm install prisma @prisma/client mysql2
```

## 🔧 Configuração

### 1. Variáveis de Ambiente (`.env`)

```properties
# Database Configuration
DB_HOST=mysql-facerec.alwaysdata.net
DB_PORT=3306
DB_USER=facerec
DB_PASSWORD=iqmi8j55PDpHQ
DB_NAME=facerec_pedagopass

# Prisma Database URL
DATABASE_URL="mysql://facerec:iqmi8j55PDpHQ@mysql-facerec.alwaysdata.net:3306/facerec_pedagopass"

# JWT Configuration
JWT_SECRET=G4n!$k2@rQ9vXyZpL8wH^t3jUeB7m
JWT_EXPIRES_IN=24h

PORT=4000
```

### 2. Schema Prisma (`prisma/schema.prisma`)

O schema já está configurado com todos os models necessários:

- **User** - Usuários (professores, alunos, admins)
- **Community** - Comunidades temáticas
- **CommunityMember** - Membros das comunidades
- **Post** - Publicações
- **Media** - Mídias anexadas aos posts
- **Comment** - Comentários
- **Like** - Curtidas
- **PointsHistory** - Histórico de pontos

### 3. Cliente Prisma (`src/lib/prisma.ts`)

Cliente singleton para ser importado em qualquer lugar:

```typescript
import { prisma } from '../lib/prisma';
```

## 🚀 Comandos Úteis

### Gerar o Prisma Client
```bash
npx prisma generate
```

### Sincronizar o schema com o banco (sem migrations)
```bash
npx prisma db push
```

### Criar uma migration
```bash
npx prisma migrate dev --name nome_da_migration
```

### Visualizar o banco de dados (Prisma Studio)
```bash
npx prisma studio
```

### Formatar o schema
```bash
npx prisma format
```

### Validar o schema
```bash
npx prisma validate
```

## 📖 Exemplos de Uso

### Importar o Prisma Client

```typescript
import { prisma } from '../lib/prisma';
```

### Criar um Usuário

```typescript
const user = await prisma.user.create({
  data: {
    email: 'professor@example.com',
    password: hashedPassword,
    name: 'João Silva',
    role: 'TEACHER',
    escola: 'Escola Exemplo',
    cidade: 'São Paulo',
    estado: 'SP',
  },
});
```

### Buscar Usuário por Email

```typescript
const user = await prisma.user.findUnique({
  where: { email: 'professor@example.com' },
  include: {
    posts: true,
    communityMembers: {
      include: {
        community: true,
      },
    },
  },
});
```

### Criar uma Comunidade

```typescript
const community = await prisma.community.create({
  data: {
    name: 'Professores de Matemática',
    slug: 'professores-matematica',
    description: 'Comunidade para troca de experiências',
    topic: 'DISCIPLINAS',
    creatorId: userId,
  },
});
```

### Buscar Comunidades com Filtros

```typescript
const communities = await prisma.community.findMany({
  where: {
    isPrivate: false,
    topic: 'TECNOLOGIA',
    name: {
      contains: 'digital',
    },
  },
  include: {
    creator: true,
    _count: {
      select: {
        members: true,
        posts: true,
      },
    },
  },
  orderBy: {
    membersCount: 'desc',
  },
  take: 10,
});
```

### Criar um Post com Mídia

```typescript
const post = await prisma.post.create({
  data: {
    content: 'Minha experiência em sala de aula',
    authorId: userId,
    communityId: communityId,
    media: {
      create: [
        {
          type: 'IMAGE',
          url: '/uploads/foto.jpg',
        },
      ],
    },
  },
  include: {
    author: true,
    media: true,
    community: true,
  },
});
```

### Adicionar Membro à Comunidade

```typescript
const member = await prisma.communityMember.create({
  data: {
    userId: userId,
    communityId: communityId,
    role: 'MEMBER',
  },
});

// Atualizar contador
await prisma.community.update({
  where: { id: communityId },
  data: {
    membersCount: {
      increment: 1,
    },
  },
});
```

### Curtir um Post

```typescript
const like = await prisma.like.create({
  data: {
    userId: userId,
    postId: postId,
  },
});

// Atualizar contador
await prisma.post.update({
  where: { id: postId },
  data: {
    likesCount: {
      increment: 1,
    },
  },
});
```

### Adicionar Comentário

```typescript
const comment = await prisma.comment.create({
  data: {
    content: 'Ótimo post!',
    postId: postId,
    authorId: userId,
  },
  include: {
    author: {
      select: {
        id: true,
        name: true,
        avatarUrl: true,
      },
    },
  },
});

// Atualizar contador
await prisma.post.update({
  where: { id: postId },
  data: {
    commentsCount: {
      increment: 1,
    },
  },
});
```

### Transações

```typescript
await prisma.$transaction(async (tx) => {
  // Criar post
  const post = await tx.post.create({
    data: {
      content: 'Novo post',
      authorId: userId,
    },
  });

  // Adicionar pontos ao autor
  await tx.user.update({
    where: { id: userId },
    data: {
      pontos: {
        increment: 10,
      },
    },
  });

  // Registrar histórico de pontos
  await tx.pointsHistory.create({
    data: {
      userId: userId,
      points: 10,
      reason: 'Criação de post',
    },
  });
});
```

## 🎯 Service Exemplo

Veja o arquivo `src/services/CommunityServicePrisma.ts` para um exemplo completo de service usando Prisma com:

- CRUD de comunidades
- Gestão de membros
- Permissões e roles
- Contadores automáticos
- Queries otimizadas

## 📚 Recursos

- [Documentação Prisma](https://www.prisma.io/docs)
- [Prisma Client API](https://www.prisma.io/docs/reference/api-reference/prisma-client-reference)
- [MySQL Connector](https://www.prisma.io/docs/concepts/database-connectors/mysql)

## 🔐 Boas Práticas

1. **Sempre use transações** para operações que modificam múltiplas tabelas
2. **Use select/include** para buscar apenas os dados necessários
3. **Implemente paginação** em queries que retornam muitos registros
4. **Valide dados** antes de inserir no banco
5. **Use enums** do Prisma ao invés de strings hardcoded
6. **Implemente soft deletes** se necessário (adicione campo `deletedAt`)

## ⚠️ Observações

- O banco já está sincronizado com `npx prisma db push`
- Todas as tabelas foram criadas no MySQL remoto
- O Prisma Client foi gerado e está pronto para uso
- Para migrações em produção, use `prisma migrate` ao invés de `db push`
