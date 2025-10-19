import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';

import Layout from '@/components/Layout';
import { useAuth } from '@/hooks/useAuth';
import { useCommunity, useCommunityMembers, useJoinCommunity, useLeaveCommunity } from '@/hooks/useCommunities';
import { CommunityTopic } from '@/shared/types/community.types';

// Mapa de ícones para cada tópico
const topicIcons: Record<CommunityTopic, string> = {
  [CommunityTopic.PEDAGOGIA]: '👨‍🏫',
  [CommunityTopic.TECNOLOGIA]: '💻',
  [CommunityTopic.INCLUSAO]: '🤝',
  [CommunityTopic.GESTAO]: '📊',
  [CommunityTopic.METODOLOGIAS]: '📚',
  [CommunityTopic.AVALIACAO]: '✅',
  [CommunityTopic.FORMACAO]: '🎓',
  [CommunityTopic.DISCIPLINAS]: '📖',
  [CommunityTopic.INTERCAMBIO]: '🌍',
  [CommunityTopic.PROJETOS]: '🚀',
  [CommunityTopic.OUTROS]: '💡',
};

const topicColors: Record<CommunityTopic, string> = {
  [CommunityTopic.PEDAGOGIA]: 'bg-blue-100 text-blue-700',
  [CommunityTopic.TECNOLOGIA]: 'bg-purple-100 text-purple-700',
  [CommunityTopic.INCLUSAO]: 'bg-green-100 text-green-700',
  [CommunityTopic.GESTAO]: 'bg-orange-100 text-orange-700',
  [CommunityTopic.METODOLOGIAS]: 'bg-pink-100 text-pink-700',
  [CommunityTopic.AVALIACAO]: 'bg-teal-100 text-teal-700',
  [CommunityTopic.FORMACAO]: 'bg-indigo-100 text-indigo-700',
  [CommunityTopic.DISCIPLINAS]: 'bg-yellow-100 text-yellow-700',
  [CommunityTopic.INTERCAMBIO]: 'bg-cyan-100 text-cyan-700',
  [CommunityTopic.PROJETOS]: 'bg-red-100 text-red-700',
  [CommunityTopic.OUTROS]: 'bg-gray-100 text-gray-700',
};

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

  if (isLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
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
        <div className="min-h-screen bg-gray-50 py-12 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Comunidade não encontrada</h1>
            <p className="text-gray-600 mb-6">Desculpe, a comunidade que você está procurando não existe ou foi removida.</p>
            <Link href="/comunidades" className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
              Voltar para Comunidades
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Head>
        <title>{community.name} - PedagoPass</title>
        <meta name="description" content={community.description} />
      </Head>

      <main className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-6xl mx-auto px-4">
          {/* Header com cover */}
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-8">
            {/* Cover Image */}
            <div className="relative h-64 bg-gradient-to-r from-blue-500 to-purple-600 overflow-hidden">
              {community.coverImage ? (
                <img
                  src={community.coverImage}
                  alt={community.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-8xl opacity-80">
                  {topicIcons[community.topic]}
                </div>
              )}
            </div>

            {/* Info */}
            <div className="px-8 py-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`px-4 py-2 rounded-full text-sm font-medium ${topicColors[community.topic]}`}>
                      {topicIcons[community.topic]} {community.topic}
                    </span>
                    {community.isPrivate && (
                      <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                        Privada
                      </span>
                    )}
                  </div>
                  <h1 className="text-4xl font-bold text-gray-900 mb-2">{community.name}</h1>
                  <p className="text-gray-600 text-lg">{community.description}</p>
                </div>

                {isAuthenticated && (
                  <div>
                    {isMember ? (
                      <button
                        onClick={handleLeave}
                        disabled={leaveMutation.isPending}
                        className="px-6 py-3 rounded-lg border border-red-300 text-red-600 font-semibold hover:bg-red-50 disabled:opacity-60 disabled:cursor-not-allowed transition"
                      >
                        {leaveMutation.isPending ? 'Saindo...' : 'Sair da comunidade'}
                      </button>
                    ) : (
                      <button
                        onClick={handleJoin}
                        disabled={joinMutation.isPending}
                        className="px-6 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed transition"
                      >
                        {joinMutation.isPending ? 'Entrando...' : 'Entrar na comunidade'}
                      </button>
                    )}
                  </div>
                )}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 pt-6 border-t border-gray-200">
                <div>
                  <p className="text-gray-600 text-sm">Membros</p>
                  <p className="text-3xl font-bold text-gray-900">{community.membersCount}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Posts</p>
                  <p className="text-3xl font-bold text-gray-900">{community.postsCount}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Criada em</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {new Date(community.createdAt).toLocaleDateString('pt-BR')}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Regras e Conteúdo */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {/* Seção de Posts */}
              <div className="bg-white rounded-2xl shadow-sm p-8 mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Posts da Comunidade</h2>

                {isMember && isAuthenticated && (
                  <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm text-blue-700">
                      Você é membro dessa comunidade. Compartilhe suas experiências e aprendizados!
                    </p>
                  </div>
                )}

                {!isAuthenticated && (
                  <div className="mb-6 p-4 bg-gray-50 border border-gray-200 rounded-lg text-center">
                    <p className="text-sm text-gray-600">
                      <Link href="/login" className="text-blue-600 hover:underline font-semibold">
                        Faça login
                      </Link>
                      {' '}para participar dessa comunidade
                    </p>
                  </div>
                )}

                <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                  <p className="text-gray-600">Nenhum post ainda nessa comunidade.</p>
                  <p className="text-sm text-gray-500 mt-2">Seja o primeiro a compartilhar uma experiência!</p>
                </div>
              </div>
            </div>

            {/* Sidebar com membros e regras */}
            <div>
              {/* Membros */}
              <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Membros ({members.length})</h3>
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {members.slice(0, 10).map(member => (
                    <div key={member.id} className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">
                        {member.user?.name?.[0]?.toUpperCase() || '?'}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{member.user?.name}</p>
                        <p className="text-xs text-gray-500">{member.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Regras */}
              {community.rules && (
                <div className="bg-white rounded-2xl shadow-sm p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Regras da Comunidade</h3>
                  <div className="text-sm text-gray-600 whitespace-pre-wrap">
                    {community.rules}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}
