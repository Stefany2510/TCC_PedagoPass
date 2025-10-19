import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';

import Layout from '@/components/Layout';
import CommunityDetailHeader from '@/components/CommunityDetailHeader';
import CommunitiesTabs from '@/components/CommunitiesTabs';
import { useAuth } from '@/hooks/useAuth';
import { useCommunity, useCommunityMembers, useJoinCommunity, useLeaveCommunity } from '@/hooks/useCommunities';
import { MemberRole } from '@/shared/types/community.types';

export default function CommunityDetail() {
  const router = useRouter();
  const { id } = router.query;
  const { user, isAuthenticated } = useAuth();

  // Queries
  const { data: community, isLoading, error } = useCommunity(id as string);
  const { data: members = [] } = useCommunityMembers(id as string);

  // Mutations
  const joinMutation = useJoinCommunity();
  const leaveMutation = useLeaveCommunity();

  // Verificar se usuário é membro
  const isMember = community && user ? members.some(m => m.userId === user.id) : false;

  const handleJoin = async () => {
    if (id) {
      await joinMutation.mutateAsync(id as string);
    }
  };

  const handleLeave = async () => {
    if (id) {
      await leaveMutation.mutateAsync(id as string);
    }
  };

  // Dados mockados para as abas (serão substituídos por dados reais de APIs)
  const mockPosts = [
    {
      id: '1',
      content: 'Ótima experiência no museu de ciências! Os alunos adoraram a seção de física interativa.',
      author: { name: 'Ana Silva', avatarUrl: undefined },
      likesCount: 12,
      commentsCount: 3,
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      tags: ['museu', 'física'],
      media: [],
      likedByCurrentUser: false,
    },
  ];

  const mockRoteiros = [
    {
      id: '1',
      name: 'Trilha do Pico do Itapeva',
      description: 'Uma trilha desafiadora com vista panorâmica da Serra do Mar',
      duration: 240,
      cost: 45,
      accessibility: ['cadeirante'],
      targetAudience: 'Fundamental II',
      location: 'São Paulo, SP',
      activities: 5,
    },
  ];

  const mockEventos = [
    {
      id: '1',
      title: 'Reunião com Parceiros Locais',
      description: 'Discussão sobre novas oportunidades de colaboração',
      date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      time: '14:00',
      location: 'Virtual',
      type: 'reunion' as const,
      capacity: 50,
      attendees: 23,
    },
  ];

  const mockArquivos = [
    {
      id: '1',
      name: 'Modelo de Autorização de Saída',
      description: 'Modelo pronto para usar em saídas pedagógicas',
      category: 'autorização' as const,
      fileUrl: '#',
      downloadCount: 156,
      uploadedBy: 'Admin',
      uploadedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ];

  if (isLoading) {
    return (
      <Layout>
        <Head>
          <title>Carregando... - PedagoPass</title>
        </Head>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4" />
            <p className="text-gray-600">Carregando comunidade...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (error || !community) {
    return (
      <Layout>
        <Head>
          <title>Comunidade não encontrada - PedagoPass</title>
        </Head>
        <main className="min-h-screen bg-gray-50 py-12 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Comunidade não encontrada</h1>
            <p className="text-gray-600 mb-6">
              Desculpe, a comunidade que você está procurando não existe ou foi removida.
            </p>
            <Link
              href="/comunidades"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-semibold"
            >
              Voltar para Comunidades
            </Link>
          </div>
        </main>
      </Layout>
    );
  }

  return (
    <Layout>
      <Head>
        <title>{community.name} - PedagoPass</title>
        <meta name="description" content={community.description} />
      </Head>

      <main className="min-h-screen bg-gradient-to-br from-slate-50 to-white py-10">
        <div className="mx-auto w-full max-w-6xl space-y-8 px-4">
          {/* Header da Comunidade */}
          <CommunityDetailHeader
            community={community}
            user={user}
            isMember={isMember}
            isLoading={joinMutation.isPending || leaveMutation.isPending}
            onJoin={handleJoin}
            onLeave={handleLeave}
            memberRole={isMember ? MemberRole.MEMBER : undefined}
            collectiveScore={community.postsCount * 10 + community.membersCount * 5}
          />

          {/* Abas de conteúdo */}
          {isAuthenticated && isMember ? (
            <CommunitiesTabs
              posts={mockPosts}
              roteiros={mockRoteiros}
              eventos={mockEventos}
              arquivos={mockArquivos}
              members={members as any[]}
              isLoading={false}
              isMember={isMember}
              onCreatePost={() => router.push(`/comunidades/${id}/novo-post`)}
              onCreateRoteiro={() => router.push(`/comunidades/${id}/novo-roteiro`)}
              onCreateEvento={() => router.push(`/comunidades/${id}/novo-evento`)}
              onUploadArquivo={() => router.push(`/comunidades/${id}/novo-arquivo`)}
            />
          ) : (
            <div className="bg-white rounded-lg shadow-md p-12 text-center">
              <svg
                className="mx-auto h-16 w-16 text-gray-400 mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Conteúdo Restrito</h3>
              <p className="text-gray-600 mb-6">
                {isAuthenticated
                  ? 'Participe da comunidade para ver o feed, roteiros, eventos e arquivos.'
                  : 'Faça login e participe da comunidade para acessar todo o conteúdo.'}
              </p>
              {!isAuthenticated && (
                <Link
                  href="/login"
                  className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-semibold"
                >
                  Fazer Login
                </Link>
              )}
            </div>
          )}
        </div>
      </main>
    </Layout>
  );
}
