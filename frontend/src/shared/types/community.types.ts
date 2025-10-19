export enum CommunityTopic {
  PEDAGOGIA = 'PEDAGOGIA',
  TECNOLOGIA = 'TECNOLOGIA',
  INCLUSAO = 'INCLUSAO',
  GESTAO = 'GESTAO',
  METODOLOGIAS = 'METODOLOGIAS',
  AVALIACAO = 'AVALIACAO',
  FORMACAO = 'FORMACAO',
  DISCIPLINAS = 'DISCIPLINAS',
  INTERCAMBIO = 'INTERCAMBIO',
  PROJETOS = 'PROJETOS',
  OUTROS = 'OUTROS',
}

export enum MemberRole {
  CREATOR = 'creator',
  ADMIN = 'admin',
  MODERATOR = 'moderator',
  MEMBER = 'member',
}

export interface Community {
  id: string;
  name: string;
  slug: string;
  description: string;
  topic: CommunityTopic;
  isPrivate: boolean;
  creatorId: string;
  coverImage?: string;
  rules?: string;
  membersCount: number;
  postsCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface CommunityMember {
  userId: string;
  communityId: string;
  role: MemberRole;
  joinedAt: string;
}

export interface CreateCommunityDTO {
  name: string;
  slug: string;
  description: string;
  topic: CommunityTopic;
  isPrivate?: boolean;
  rules?: string;
  coverImage?: string;
}

export interface UpdateCommunityDTO {
  name?: string;
  slug?: string;
  description?: string;
  topic?: CommunityTopic;
  isPrivate?: boolean;
  rules?: string;
  coverImage?: string;
}
