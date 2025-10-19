import React, { useState } from 'react';
import Link from 'next/link';
import { Community, CommunityTopic, MemberRole } from '@/shared/types/community.types';

interface CommunityDetailHeaderProps {
  community: Community;
  user?: any;
  isMember: boolean;
  isLoading: boolean;
  onJoin: () => void;
  onLeave: () => void;
  memberRole?: MemberRole;
  collectiveScore?: number;
}

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
  [CommunityTopic.PEDAGOGIA]: 'from-blue-600 to-blue-700',
  [CommunityTopic.TECNOLOGIA]: 'from-purple-600 to-purple-700',
  [CommunityTopic.INCLUSAO]: 'from-green-600 to-green-700',
  [CommunityTopic.GESTAO]: 'from-orange-600 to-orange-700',
  [CommunityTopic.METODOLOGIAS]: 'from-pink-600 to-pink-700',
  [CommunityTopic.AVALIACAO]: 'from-teal-600 to-teal-700',
  [CommunityTopic.FORMACAO]: 'from-indigo-600 to-indigo-700',
  [CommunityTopic.DISCIPLINAS]: 'from-yellow-600 to-yellow-700',
  [CommunityTopic.INTERCAMBIO]: 'from-cyan-600 to-cyan-700',
  [CommunityTopic.PROJETOS]: 'from-red-600 to-red-700',
  [CommunityTopic.OUTROS]: 'from-gray-600 to-gray-700',
};

export const CommunityDetailHeader: React.FC<CommunityDetailHeaderProps> = ({
  community,
  user,
  isMember,
  isLoading,
  onJoin,
  onLeave,
  memberRole,
  collectiveScore = 0,
}) => {
  const [showRules, setShowRules] = useState(false);

  return (
    <div className="mb-8">
      {/* Capa da comunidade */}
      <div
        className={`relative h-48 md:h-64 bg-gradient-to-r ${topicColors[community.topic]} rounded-xl overflow-hidden shadow-lg`}
      >
        {community.coverImage ? (
          <img
            src={community.coverImage}
            alt={community.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-8xl opacity-40">
            {topicIcons[community.topic]}
          </div>
        )}

        {/* Overlay escuro */}
        <div className="absolute inset-0 bg-black/20" />

        {/* Badge privada */}
        {community.isPrivate && (
          <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm px-3 py-1 rounded-full text-xs text-white flex items-center gap-1">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
            Privada
          </div>
        )}
      </div>

      {/* Informações da comunidade */}
      <div className="bg-white rounded-xl shadow-md p-6 md:p-8 -mt-12 relative z-10 mx-4">
        <div className="grid md:grid-cols-3 gap-6">
          {/* Coluna esquerda: Nome e descrição */}
          <div className="md:col-span-2 space-y-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                {community.name}
              </h1>
              <span
                className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r ${topicColors[community.topic]} text-white`}
              >
                {topicIcons[community.topic]} {community.topic}
              </span>
            </div>

            <p className="text-gray-700 text-base leading-relaxed">{community.description}</p>

            {/* Regras */}
            {community.rules && (
              <div className="mt-4">
                <button
                  onClick={() => setShowRules(!showRules)}
                  className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d={showRules ? 'M19 9l-7 7-7-7' : 'M9 19l7-7-7-7'}
                    />
                  </svg>
                  {showRules ? 'Ocultar regras' : 'Ver regras da comunidade'}
                </button>

                {showRules && (
                  <div className="mt-3 p-4 bg-blue-50 border border-blue-200 rounded-lg text-sm text-gray-700 whitespace-pre-wrap">
                    {community.rules}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Coluna direita: Stats e botões */}
          <div className="space-y-4">
            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200">
                <p className="text-xs font-semibold text-blue-700 uppercase tracking-wide">
                  Membros
                </p>
                <p className="text-2xl font-bold text-blue-900">
                  {community.membersCount.toLocaleString('pt-BR')}
                </p>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg border border-green-200">
                <p className="text-xs font-semibold text-green-700 uppercase tracking-wide">
                  Posts
                </p>
                <p className="text-2xl font-bold text-green-900">
                  {community.postsCount.toLocaleString('pt-BR')}
                </p>
              </div>
            </div>

            {/* Pontuação coletiva */}
            <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-4 rounded-lg border border-amber-200">
              <p className="text-xs font-semibold text-amber-700 uppercase tracking-wide">
                Pontuação Coletiva
              </p>
              <p className="text-2xl font-bold text-amber-900">
                <span className="text-lg">✨</span> {collectiveScore.toLocaleString('pt-BR')}
              </p>
            </div>

            {/* Botão Participar/Sair */}
            {user && (
              <button
                onClick={isMember ? onLeave : onJoin}
                disabled={isLoading}
                className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-all duration-200 flex items-center justify-center gap-2 ${
                  isMember
                    ? 'bg-red-600 hover:bg-red-700 disabled:bg-red-400'
                    : 'bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400'
                }`}
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Processando...
                  </>
                ) : isMember ? (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                    Sair da Comunidade
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                    Participar da Comunidade
                  </>
                )}
              </button>
            )}

            {/* Role do membro */}
            {isMember && memberRole && (
              <div className="text-center text-sm">
                <p className="text-gray-600">Seu papel:</p>
                <p className="font-semibold text-gray-900 capitalize">
                  {memberRole === 'creator' ? 'Criador' : 
                   memberRole === 'admin' ? 'Administrador' :
                   memberRole === 'moderator' ? 'Moderador' : 'Membro'}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityDetailHeader;
