# Roadmap - Página de Comunidades (PedagoPass)

## Visão Geral
Plataforma de compartilhamento de experiências educacionais onde professores descobrem comunidades temáticas, participam de discussões, compartilham roteiros e ganham pontos por contribuições.

---

## FASE 1: MVP - Descoberta + Página Básica da Comunidade

### 1.1 Página de Listagem de Comunidades (Grid de Descoberta)

**Componente: `CommunityCard.tsx`** (já existe, melhorar)

Exibir por card:
- [ ] Capa/imagem (ícone temático se não houver imagem)
- [ ] Nome da comunidade
- [ ] Tema (PEDAGOGIA, TECNOLOGIA, INCLUSAO, etc.)
- [ ] Descrição curta (até 2 linhas)
- [ ] Badges: região/UF (se implementado), tipo de saída
- [ ] Contadores: membros, roteiros, posts
- [ ] Status: "Participar" ou "Sair" (se autenticado)

**Página: `comunidades.tsx`** (já existe, funcional)

Manter:
- [x] Grid responsivo (3 cols em desktop, 2 em tablet, 1 em mobile)
- [x] Busca por nome/tema
- [x] Filtro por tópico

Melhorias futures:
- [ ] Filtro múltiplo: nível ensino, disciplina, tipo saída
- [ ] Filtro por região/UF
- [ ] Filtro por duração/custo médio (range slider)
- [ ] Busca por tags (autocomplete)
- [ ] Ordenação: recentes, trending, membros

---

### 1.2 Página de Detalhes da Comunidade

**Arquivo: `comunidades/[id].tsx`** (criar)

**Layout:**

```
┌─────────────────────────────────────────────────┐
│                  HEADER                         │
│ [Capa] | Nome | Descrição | [Botão Participar] │
│ Contadores: Membros | Roteiros | Posts | Pontos│
└─────────────────────────────────────────────────┘

┌─ ABAS ─────────────────────────────────────────┐
│  📝 Feed | 🗺️ Roteiros | 📅 Eventos | 👥 Membros │
└─────────────────────────────────────────────────┘

[Conteúdo da Aba Selecionada]
```

#### Componentes:

**A) Header da Comunidade**
- Capa + ícone temático
- Nome, descrição, regras (modal)
- Botão: "Participar" / "Sair" (se membro)
- Indicadores:
  - 👥 Membros: X
  - 🗺️ Roteiros: Y
  - 📝 Posts: Z
  - ⭐ Pontuação coletiva: A (soma de pontos dos membros)
- Badge de privacidade (se privada)

**B) Sistema de Abas**

**Aba 1: Feed (Posts)**
```
├─ Feed Social
│  ├─ Tipos de Post:
│  │  ├─ Relato de Viagem (texto + fotos/vídeo)
│  │  ├─ Dúvida Logística (pergunta)
│  │  ├─ Dica Rápida (compartilhamento)
│  │  └─ Enquete (votação)
│  │
│  └─ Funcionalidades:
│     ├─ Criar post (se membro)
│     ├─ Curtir
│     ├─ Comentar
│     ├─ Compartilhar
│     └─ Marcar como útil / Melhor resposta

├─ Q&A Section
│  ├─ Filtrar: Sem resposta | Resolvidas | Mais votadas
│  └─ Post tipo "Pergunta" aparece destacado

└─ Timeline
   └─ Posts ordenados por recentes/trending
```

**Aba 2: Roteiros**
```
├─ Lista de Roteiros da Comunidade
│  ├─ Card por roteiro:
│  │  ├─ Título
│  │  ├─ Duração, Custo, Acessibilidade
│  │  ├─ Imagem/preview
│  │  └─ Ações: Ver | Duplicar (Fork) | Salvar
│  │
│  └─ Filtros:
│     ├─ Duração (1 dia, 2-3 dias, semana+)
│     ├─ Custo (R$0-50, R$50-150, 150+)
│     ├─ Acessibilidade (Sim/Não)
│     └─ Turma-alvo (EF1, EF2, EM, superior)
```

**Aba 3: Eventos**
```
├─ Timeline de Eventos
│  ├─ Encontros online
│  ├─ Visitas guiadas
│  ├─ "Desafio do Mês"
│  └─ Webinars / Lives
│
└─ Por evento:
   ├─ Data/hora
   ├─ Descrição
   ├─ Local/link
   ├─ Inscrever / Cancelar inscrição
   └─ Participantes
```

**Aba 4: Membros**
```
├─ Lista de Membros (com avatar, nome, role)
│  ├─ Filtro: Todos | Criador | Admins | Moderadores
│  ├─ Ordenação: Recentes | Contribuições | Pontuação
│  │
│  └─ Por membro:
│     ├─ Avatar, nome, role
│     ├─ Contribuições (posts, roteiros)
│     ├─ Badges / Conquistadas
│     └─ Pontuação
│
└─ "Top Contribuidores" (widget lateral)
```

**Aba 5 (futuro): Arquivos**
```
├─ Documentos compartilhados
├─ Modelos reutilizáveis:
│  ├─ Termo de autorização
│  ├─ Planilha de orçamento
│  ├─ Checklist de viagem
│  └─ Relatório pós-atividade
│
└─ Upload / Download
```

---

## FASE 2: Gamificação e Sistema de Pontos

### 2.1 Integração com Sistema de Pontos

**Backend: `PointsService.ts`** (já existe)

Adicionar lógica de pontuação por ação:
- [ ] +10 pontos: criar post na comunidade
- [ ] +15 pontos: criar roteiro
- [ ] +5 pontos: comentário útil (marcado como "melhor resposta")
- [ ] +20 pontos: responder pergunta (Q&A)
- [ ] +25 pontos: criar evento
- [ ] +30 pontos: feedback pós-viagem (relato completo)

**Frontend: `communidades/[id].tsx`**
- [ ] Mostrar ganho de pontos ao realizar ação (toast/notification)
- [ ] Exibir "Pontuação coletiva" da comunidade (soma de membros)
- [ ] Ranking de membros por pontos

### 2.2 Sistema de Badges

**Tipos de Badges:**
- [ ] "Guia de Museus" (5+ roteiros para museus)
- [ ] "Roteiro Acessível" (criar roteiro com acessibilidade verificada)
- [ ] "Economia Criativa" (roteiros ≤ R$50/aluno)
- [ ] "Educador 5 Estrelas" (receber 10+ feedbacks positivos)
- [ ] "Explorador" (participar de 3+ comunidades)
- [ ] "Facilitador" (responder 20+ perguntas)
- [ ] "Criador de Eventos" (organizar 5+ eventos)

**Exibição:**
- [ ] Avatar com badges
- [ ] Modal de conquistas
- [ ] Histórico de badges desbloqueadas

### 2.3 Missões da Semana

**Feature:**
- [ ] Card destacado na comunidade: "Missão da Semana"
- [ ] Exemplos:
  - "Publicar um roteiro de 1 dia ≤ R$50/aluno" (+50 pontos)
  - "Responder 3 perguntas com qualidade" (+30 pontos)
  - "Compartilhar feedback de uma viagem" (+20 pontos)
  
**Implementação:**
- [ ] Admin define missões (backend)
- [ ] Timer visual (dias/horas restantes)
- [ ] Popup ao completar
- [ ] Progresso visual (quantos fizeram / target)

---

## FASE 3: Melhorias de UX e Filtros Avançados

### 3.1 Página de Listagem (Filtros)

**Filtros a adicionar:**
- [ ] Nível de ensino (EF1, EF2, EM, Superior)
- [ ] Disciplina/Tema (Geografia, História, Ciências, Educação Física, Artes, Interdisciplinar)
- [ ] Tipo de saída (Museu, Trilha, Campus, Centro de Ciência, Biblioteca, Parque, Cultural, Outro)
- [ ] Região/UF (dropdown com estados)
- [ ] Duração média de roteiros (range slider 1-30 dias)
- [ ] Custo médio (range slider R$0-500)
- [ ] Acessibilidade (Sim/Não)
- [ ] Ordenação (Recentes, Trending, Mais membros)

**Busca por Tags:**
- [ ] Autocomplete com tags populares
- [ ] Exemplos: "cidades históricas", "astronomia", "gratuito", "viagem educacional"

### 3.2 Melhorias no Card de Comunidade

- [ ] Mostrar 1-2 tags principais
- [ ] Região/UF em badge
- [ ] Rating/avaliação média (futuro)
- [ ] Botão "Favoritar" comunidade (lista pessoal)

---

## FASE 4: Monetização e Recursos Avançados

### 4.1 Sistema de Roteiros (integração)

- [ ] Roteiros aparecem como sub-recurso em comunidades
- [ ] Fork: duplicar roteiro de comunidade para biblioteca pessoal
- [ ] Coleções de roteiros por tema/região

### 4.2 Eventos e Encontros

- [ ] Criar evento dentro da comunidade
- [ ] Convites por email
- [ ] Calendario integrado
- [ ] Inscrições e checkout (futuro: integrar pagamento)

### 4.3 Marketplace de Modelos/Templates

- [ ] Compartilhar planilhas, checklists, autorizações
- [ ] Sistema de rating para recursos
- [ ] Download de pacotes educacionais

---

## Estrutura de Dados (Backend)

### Schema já existente (Prisma)

```prisma
model Community {
  id            String              @id @default(uuid())
  name          String
  slug          String              @unique
  description   String              @db.Text
  topic         CommunityTopic
  isPrivate     Boolean             @default(false)
  coverImage    String?
  rules         String?             @db.Text
  membersCount  Int                 @default(0)
  postsCount    Int                 @default(0)
  creatorId     String
  createdAt     DateTime            @default(now())
  updatedAt     DateTime            @updatedAt
  
  // Relações
  creator       User                @relation("CommunityCreator", fields: [creatorId], references: [id])
  members       CommunityMember[]
  posts         Post[]
}

model CommunityMember {
  id            String              @id @default(uuid())
  userId        String
  communityId   String
  role          MemberRole          @default(MEMBER)
  joinedAt      DateTime            @default(now())
  
  user          User                @relation(fields: [userId], references: [id])
  community     Community           @relation(fields: [communityId], references: [id])
  
  @@unique([userId, communityId])
}
```

### Novos campos a considerar:

```prisma
// Em Community:
+ region: String?           // UF ou região
+ disciplinesFocus: String[]? // Disciplinas
+ avgCost: Float?           // Custo médio de roteiros
+ accessibility: Boolean    // Tem roteiros acessíveis?
+ collectiveScore: Int      // Soma pontos dos membros
+ pinnedPost: String?       // Post fixado

// Em CommunityMember:
+ badges: String[]          // Lista de badges conquistadas
+ contributions: Int        // Número de posts/roteiros

// Nova tabela: CommunityMission
model CommunityMission {
  id              String    @id @default(uuid())
  communityId     String
  title           String
  description     String    @db.Text
  pointsReward    Int
  startDate       DateTime
  endDate         DateTime
  targetCount     Int?      // Quantas pessoas precisam completar
  type            String    // "post", "roteiro", "feedback", custom
}

// Nova tabela: CommunityBadge
model CommunityBadge {
  id              String    @id @default(uuid())
  userId          String
  communityId     String
  badgeType       String    // "guia_museus", "roteiro_acessivel", etc.
  earnedAt        DateTime  @default(now())
}
```

---

## Roadmap de Implementação (Recomendado)

### Sprint 1 (Semana 1-2): MVP Básico
- [ ] Aba "Feed" funcional (posts CRUD)
- [ ] Aba "Membros" (listagem + top contribuidores)
- [ ] Botão "Participar/Sair"
- [ ] Contador de membros/posts atualizado em tempo real

### Sprint 2 (Semana 3-4): Roteiros + Sistema de Pontos
- [ ] Aba "Roteiros" (listagem, filtros básicos)
- [ ] Integração com PointsService (registrar pontos por ação)
- [ ] Toast de notificação de pontos

### Sprint 3 (Semana 5-6): Gamificação
- [ ] Badges system (banco de dados + exibição)
- [ ] Missões da semana (admin interface)
- [ ] Ranking de membros

### Sprint 4 (Semana 7-8): Filtros Avançados
- [ ] Página de listagem com filtros múltiplos
- [ ] Busca por tags
- [ ] Ordenação (trending, recentes)

### Sprint 5+ : Eventos, Arquivos, Monetização
- [ ] Aba "Eventos"
- [ ] Aba "Arquivos" + marketplace
- [ ] Integração com pagamento (futuro)

---

## Endpoints Backend Necessários

### Já Existentes (manter/completar):
```
GET    /api/communities                    # Listar comunidades
GET    /api/communities/:id                # Detalhes
POST   /api/communities                    # Criar
PUT    /api/communities/:id                # Atualizar
DELETE /api/communities/:id                # Deletar
POST   /api/communities/:id/join           # Entrar
POST   /api/communities/:id/leave          # Sair
GET    /api/communities/:id/members        # Membros
```

### Novos (implementar):
```
GET    /api/communities/:id/posts          # Posts da comunidade
POST   /api/communities/:id/posts          # Criar post
GET    /api/communities/:id/roteiros       # Roteiros
GET    /api/communities/:id/events         # Eventos
GET    /api/communities/:id/missions       # Missões da semana
POST   /api/communities/:id/missions/:missionId/complete  # Completar missão
GET    /api/communities/:id/members/:userId/badges  # Badges do usuário
```

---

## Componentes React a Criar/Atualizar

```
src/components/
├── CommunityCard.tsx              ✅ (existe, melhorar)
├── CommunityHeader.tsx            ⭕ (novo)
├── CommunityTabs.tsx              ⭕ (novo)
├── CommunityFeed.tsx              ⭕ (novo - posts)
├── CommunityRoteiros.tsx          ⭕ (novo)
├── CommunityEvents.tsx            ⭕ (novo)
├── CommunityMembers.tsx           ⭕ (novo)
├── PostCard.tsx                   ✅ (já existe, adaptar)
├── PostForm.tsx                   ⭕ (novo para comunidades)
├── RoteiroCard.tsx                ⭕ (novo)
├── MissionWidget.tsx              ⭕ (novo - missões)
├── BadgeDisplay.tsx               ⭕ (novo)
└── ContributionRanking.tsx        ⭕ (novo)

src/pages/
├── comunidades.tsx                ✅ (existe)
└── comunidades/[id].tsx           ⭕ (novo)

src/hooks/
└── useCommunities.ts              ✅ (existe, expandir)

src/services/
└── api/communitiesApi.ts          ✅ (existe, expandir)
```

---

## Checklist de MVP

- [ ] Página `/comunidades` com grid e filtros básicos
- [ ] Página `/comunidades/[id]` com abas (Feed, Roteiros, Membros)
- [ ] Botão Participar/Sair funcional
- [ ] Posts CRUD na aba Feed
- [ ] Contadores atualizados
- [ ] Integração com sistema de pontos (notificação ao ganhar)
- [ ] Backend endpoints configurados
- [ ] Testes manuais concluídos

---

## Notes

- **Responsividade**: Mobile-first em todas as páginas
- **Performance**: Lazy-loading de posts/membros (pagination)
- **UX**: Loading states, skeleton screens, transições suaves
- **Acessibilidade**: ARIA labels, keyboard navigation
- **Segurança**: Validar permissões (só membro cria post em comunidade privada)
