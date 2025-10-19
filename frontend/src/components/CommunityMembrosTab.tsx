import React from 'react';

interface Member {
  id: string;
  name: string;
  avatarUrl?: string;
  role: 'creator' | 'admin' | 'moderator' | 'member';
  joinedAt: string;
  postsCount: number;
  pointsContribution: number;
  badges: string[];
}

interface CommunityMembrosTabProps {
  members?: Member[];
  isLoading: boolean;
}

const roleLabels: Record<string, string> = {
  creator: 'Criador',
  admin: 'Administrador',
  moderator: 'Moderador',
  member: 'Membro',
};

const roleBadgeColors: Record<string, string> = {
  creator: 'bg-purple-100 text-purple-700 border border-purple-300',
  admin: 'bg-red-100 text-red-700 border border-red-300',
  moderator: 'bg-blue-100 text-blue-700 border border-blue-300',
  member: 'bg-gray-100 text-gray-700 border border-gray-300',
};

const badgeEmojis: Record<string, string> = {
  star: '⭐',
  helper: '🤝',
  expert: '🏆',
  newbie: '👋',
  active: '🔥',
  contributor: '💡',
};

export const CommunityMembrosTab: React.FC<CommunityMembrosTabProps> = ({
  members = [],
  isLoading,
}) => {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-lg p-4 shadow-sm animate-pulse flex items-center gap-4"
          >
            <div className="w-12 h-12 bg-gray-200 rounded-full" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-200 rounded w-1/3" />
              <div className="h-3 bg-gray-200 rounded w-1/4" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Separar membros por role e ordenar por contribuição
  const sortedMembers = [...members].sort(
    (a, b) => b.pointsContribution - a.pointsContribution
  );

  const creators = sortedMembers.filter((m) => m.role === 'creator');
  const admins = sortedMembers.filter((m) => m.role === 'admin');
  const moderators = sortedMembers.filter((m) => m.role === 'moderator');
  const regularMembers = sortedMembers.filter((m) => m.role === 'member');

  const renderMember = (member: Member) => (
    <div
      key={member.id}
      className="bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 p-4"
    >
      <div className="flex items-start gap-4">
        {/* Avatar */}
        <div className="flex-shrink-0">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold text-lg">
            {member.avatarUrl ? (
              <img
                src={member.avatarUrl}
                alt={member.name}
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              member.name.charAt(0).toUpperCase()
            )}
          </div>
        </div>

        {/* Informações */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-gray-900">{member.name}</h3>
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium ${roleBadgeColors[member.role]}`}
            >
              {roleLabels[member.role]}
            </span>
          </div>

          {/* Badges */}
          {member.badges && member.badges.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-2">
              {member.badges.map((badge) => (
                <span
                  key={badge}
                  title={badge}
                  className="text-lg cursor-pointer hover:scale-125 transition-transform"
                >
                  {badgeEmojis[badge] || '🎖️'}
                </span>
              ))}
            </div>
          )}

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 text-sm">
            <div className="bg-blue-50 p-2 rounded">
              <p className="text-xs text-blue-700 font-medium">Posts</p>
              <p className="font-semibold text-blue-900">{member.postsCount}</p>
            </div>
            <div className="bg-green-50 p-2 rounded">
              <p className="text-xs text-green-700 font-medium">Pontos</p>
              <p className="font-semibold text-green-900">
                {member.pointsContribution}
              </p>
            </div>
            <div className="bg-purple-50 p-2 rounded">
              <p className="text-xs text-purple-700 font-medium">Membro há</p>
              <p className="font-semibold text-purple-900">
                {Math.floor(
                  (Date.now() - new Date(member.joinedAt).getTime()) /
                    (1000 * 60 * 60 * 24)
                )}
                d
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Criadores */}
      {creators.length > 0 && (
        <section>
          <div className="flex items-center gap-2 mb-4">
            <h3 className="text-lg font-bold text-gray-900">👑 Criador</h3>
            <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs font-semibold rounded">
              {creators.length}
            </span>
          </div>
          <div className="space-y-3">{creators.map(renderMember)}</div>
        </section>
      )}

      {/* Administradores */}
      {admins.length > 0 && (
        <section>
          <div className="flex items-center gap-2 mb-4">
            <h3 className="text-lg font-bold text-gray-900">🔴 Administradores</h3>
            <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-semibold rounded">
              {admins.length}
            </span>
          </div>
          <div className="space-y-3">{admins.map(renderMember)}</div>
        </section>
      )}

      {/* Moderadores */}
      {moderators.length > 0 && (
        <section>
          <div className="flex items-center gap-2 mb-4">
            <h3 className="text-lg font-bold text-gray-900">🔵 Moderadores</h3>
            <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded">
              {moderators.length}
            </span>
          </div>
          <div className="space-y-3">{moderators.map(renderMember)}</div>
        </section>
      )}

      {/* Membros regulares - Top contribuidores */}
      {regularMembers.length > 0 && (
        <section>
          <div className="flex items-center gap-2 mb-4">
            <h3 className="text-lg font-bold text-gray-900">
              ⭐ Top Contribuidores
            </h3>
            <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-semibold rounded">
              {regularMembers.length}
            </span>
          </div>
          <div className="space-y-3">
            {regularMembers.slice(0, 10).map((member, index) => (
              <div key={member.id} className="relative">
                {index < 3 && (
                  <div className="absolute -left-3 top-2 text-2xl">
                    {index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉'}
                  </div>
                )}
                <div className={index < 3 ? 'ml-4' : ''}>
                  {renderMember(member)}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {members.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg border border-gray-100">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4.354a4 4 0 110 5.292M15 21H3.634a1 1 0 01-.894-1.447l2.894-5.776a4 4 0 018.32 0l2.894 5.776a1 1 0 01-.894 1.447z"
            />
          </svg>
          <p className="mt-4 text-gray-600 font-medium">
            Nenhum membro nesta comunidade
          </p>
          <p className="text-sm text-gray-500">Seja o primeiro a participar!</p>
        </div>
      )}
    </div>
  );
};

export default CommunityMembrosTab;
