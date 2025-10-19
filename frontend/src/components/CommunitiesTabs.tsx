import React, { useState } from 'react';
import { CommunityFeedTab } from './CommunityFeedTab';
import { CommunityRoteirosTab } from './CommunityRoteirosTab';
import { CommunityEventosTab } from './CommunityEventosTab';
import { CommunityArquivosTab } from './CommunityArquivosTab';
import { CommunityMembrosTab } from './CommunityMembrosTab';

interface CommunitiesTabs {
  posts?: any[];
  roteiros?: any[];
  eventos?: any[];
  arquivos?: any[];
  members?: any[];
  isLoading: boolean;
  isMember: boolean;
  onCreatePost?: () => void;
  onCreateRoteiro?: () => void;
  onCreateEvento?: () => void;
  onUploadArquivo?: () => void;
}

type TabType = 'feed' | 'roteiros' | 'eventos' | 'arquivos' | 'membros';

const TAB_ICONS: Record<TabType, string> = {
  feed: '📰',
  roteiros: '🗺️',
  eventos: '📅',
  arquivos: '📁',
  membros: '👥',
};

const TAB_LABELS: Record<TabType, string> = {
  feed: 'Feed',
  roteiros: 'Roteiros',
  eventos: 'Eventos',
  arquivos: 'Arquivos',
  membros: 'Membros',
};

export const CommunitiesTabs: React.FC<CommunitiesTabs> = ({
  posts,
  roteiros,
  eventos,
  arquivos,
  members,
  isLoading,
  isMember,
  onCreatePost,
  onCreateRoteiro,
  onCreateEvento,
  onUploadArquivo,
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('feed');

  const tabs: TabType[] = ['feed', 'roteiros', 'eventos', 'arquivos', 'membros'];

  return (
    <div className="space-y-6">
      {/* Tab Buttons */}
      <div className="flex overflow-x-auto gap-2 pb-2 border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-3 rounded-t-lg font-semibold text-sm transition-all duration-200 whitespace-nowrap flex items-center gap-2 ${
              activeTab === tab
                ? 'bg-white text-blue-600 border-b-2 border-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900 border-b-2 border-transparent'
            }`}
          >
            <span className="text-lg">{TAB_ICONS[tab]}</span>
            {TAB_LABELS[tab]}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-lg">
        {activeTab === 'feed' && (
          <CommunityFeedTab
            posts={posts}
            isLoading={isLoading}
            isMember={isMember}
            onCreatePost={onCreatePost}
          />
        )}

        {activeTab === 'roteiros' && (
          <CommunityRoteirosTab
            roteiros={roteiros}
            isLoading={isLoading}
            isMember={isMember}
            onCreateRoteiro={onCreateRoteiro}
          />
        )}

        {activeTab === 'eventos' && (
          <CommunityEventosTab
            eventos={eventos}
            isLoading={isLoading}
            isMember={isMember}
            onCreateEvento={onCreateEvento}
          />
        )}

        {activeTab === 'arquivos' && (
          <CommunityArquivosTab
            arquivos={arquivos}
            isLoading={isLoading}
            isMember={isMember}
            onUploadArquivo={onUploadArquivo}
          />
        )}

        {activeTab === 'membros' && (
          <CommunityMembrosTab members={members} isLoading={isLoading} />
        )}
      </div>
    </div>
  );
};

export default CommunitiesTabs;
