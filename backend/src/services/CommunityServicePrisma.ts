import { prisma } from '../lib/prisma';
import { CommunityTopic, MemberRole } from '@prisma/client';

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

export class CommunityService {
  /**
   * Criar uma nova comunidade
   */
  async createCommunity(data: CreateCommunityDTO, creatorId: string) {
    const community = await prisma.community.create({
      data: {
        ...data,
        creatorId,
        membersCount: 1,
      },
      include: {
        creator: {
          select: {
            id: true,
            name: true,
            email: true,
            avatarUrl: true,
          },
        },
      },
    });

    // Adicionar o criador como membro com role CREATOR
    await prisma.communityMember.create({
      data: {
        userId: creatorId,
        communityId: community.id,
        role: MemberRole.CREATOR,
      },
    });

    return community;
  }

  /**
   * Buscar comunidades com filtros
   */
  async getCommunities(params?: {
    search?: string;
    topic?: CommunityTopic;
    onlyPublic?: boolean;
  }) {
    const where: any = {};

    if (params?.search) {
      where.OR = [
        { name: { contains: params.search } },
        { description: { contains: params.search } },
      ];
    }

    if (params?.topic) {
      where.topic = params.topic;
    }

    if (params?.onlyPublic) {
      where.isPrivate = false;
    }

    const communities = await prisma.community.findMany({
      where,
      include: {
        creator: {
          select: {
            id: true,
            name: true,
            avatarUrl: true,
          },
        },
        _count: {
          select: {
            members: true,
            posts: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return communities;
  }

  /**
   * Buscar uma comunidade por ID
   */
  async getCommunityById(id: string) {
    const community = await prisma.community.findUnique({
      where: { id },
      include: {
        creator: {
          select: {
            id: true,
            name: true,
            email: true,
            avatarUrl: true,
          },
        },
        _count: {
          select: {
            members: true,
            posts: true,
          },
        },
      },
    });

    if (!community) {
      throw new Error('Comunidade não encontrada');
    }

    return community;
  }

  /**
   * Atualizar uma comunidade
   */
  async updateCommunity(id: string, data: UpdateCommunityDTO, userId: string) {
    // Verificar se o usuário é o criador ou admin
    const member = await prisma.communityMember.findFirst({
      where: {
        communityId: id,
        userId,
        role: {
          in: [MemberRole.CREATOR, MemberRole.ADMIN],
        },
      },
    });

    if (!member) {
      throw new Error('Sem permissão para atualizar esta comunidade');
    }

    const community = await prisma.community.update({
      where: { id },
      data,
      include: {
        creator: {
          select: {
            id: true,
            name: true,
            avatarUrl: true,
          },
        },
      },
    });

    return community;
  }

  /**
   * Deletar uma comunidade
   */
  async deleteCommunity(id: string, userId: string) {
    // Verificar se o usuário é o criador
    const community = await prisma.community.findUnique({
      where: { id },
    });

    if (!community) {
      throw new Error('Comunidade não encontrada');
    }

    if (community.creatorId !== userId) {
      throw new Error('Apenas o criador pode deletar a comunidade');
    }

    await prisma.community.delete({
      where: { id },
    });
  }

  /**
   * Entrar em uma comunidade
   */
  async joinCommunity(communityId: string, userId: string) {
    // Verificar se já é membro
    const existingMember = await prisma.communityMember.findUnique({
      where: {
        userId_communityId: {
          userId,
          communityId,
        },
      },
    });

    if (existingMember) {
      throw new Error('Você já é membro desta comunidade');
    }

    const member = await prisma.communityMember.create({
      data: {
        userId,
        communityId,
        role: MemberRole.MEMBER,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            avatarUrl: true,
          },
        },
      },
    });

    // Incrementar contador de membros
    await prisma.community.update({
      where: { id: communityId },
      data: {
        membersCount: {
          increment: 1,
        },
      },
    });

    return member;
  }

  /**
   * Sair de uma comunidade
   */
  async leaveCommunity(communityId: string, userId: string) {
    const member = await prisma.communityMember.findUnique({
      where: {
        userId_communityId: {
          userId,
          communityId,
        },
      },
    });

    if (!member) {
      throw new Error('Você não é membro desta comunidade');
    }

    if (member.role === MemberRole.CREATOR) {
      throw new Error('O criador não pode sair da comunidade');
    }

    await prisma.communityMember.delete({
      where: {
        userId_communityId: {
          userId,
          communityId,
        },
      },
    });

    // Decrementar contador de membros
    await prisma.community.update({
      where: { id: communityId },
      data: {
        membersCount: {
          decrement: 1,
        },
      },
    });
  }

  /**
   * Buscar membros de uma comunidade
   */
  async getCommunityMembers(communityId: string) {
    const members = await prisma.communityMember.findMany({
      where: { communityId },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            avatarUrl: true,
            escola: true,
            cidade: true,
            estado: true,
          },
        },
      },
      orderBy: {
        joinedAt: 'asc',
      },
    });

    return members;
  }

  /**
   * Atualizar role de um membro
   */
  async updateMemberRole(
    communityId: string,
    targetUserId: string,
    newRole: MemberRole,
    requestingUserId: string
  ) {
    // Verificar se quem está fazendo a requisição é criador ou admin
    const requestingMember = await prisma.communityMember.findFirst({
      where: {
        communityId,
        userId: requestingUserId,
        role: {
          in: [MemberRole.CREATOR, MemberRole.ADMIN],
        },
      },
    });

    if (!requestingMember) {
      throw new Error('Sem permissão para alterar roles');
    }

    // Não pode alterar o role do criador
    const targetMember = await prisma.communityMember.findUnique({
      where: {
        userId_communityId: {
          userId: targetUserId,
          communityId,
        },
      },
    });

    if (targetMember?.role === MemberRole.CREATOR) {
      throw new Error('Não é possível alterar o role do criador');
    }

    await prisma.communityMember.update({
      where: {
        userId_communityId: {
          userId: targetUserId,
          communityId,
        },
      },
      data: {
        role: newRole,
      },
    });
  }

  /**
   * Buscar comunidades de um usuário
   */
  async getUserCommunities(userId: string) {
    const memberships = await prisma.communityMember.findMany({
      where: { userId },
      include: {
        community: {
          include: {
            creator: {
              select: {
                id: true,
                name: true,
                avatarUrl: true,
              },
            },
            _count: {
              select: {
                members: true,
                posts: true,
              },
            },
          },
        },
      },
      orderBy: {
        joinedAt: 'desc',
      },
    });

    return memberships.map((m) => m.community);
  }
}

export default new CommunityService();
