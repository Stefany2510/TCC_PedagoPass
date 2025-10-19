import React, { useState } from 'react';
import { Post } from '@/shared/types';

interface CommunityFeedTabProps {
  posts?: Post[];
  isLoading: boolean;
  isMember: boolean;
  onCreatePost?: () => void;
  onDeletePost?: (postId: string) => void;
  onLikePost?: (postId: string) => void;
}

export const CommunityFeedTab: React.FC<CommunityFeedTabProps> = ({
  posts = [],
  isLoading,
  isMember,
  onCreatePost,
  onDeletePost,
  onLikePost,
}) => {
  const [expandedPost, setExpandedPost] = useState<string | null>(null);

  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-lg p-4 shadow-sm animate-pulse"
          >
            <div className="h-12 bg-gray-200 rounded-lg mb-4" />
            <div className="h-20 bg-gray-200 rounded-lg mb-4" />
            <div className="h-10 bg-gray-200 rounded-lg w-1/3" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* CTA Criar Post - Fixo no topo */}
      {isMember && (
        <div className="sticky top-0 z-10 bg-white rounded-lg shadow-md p-4 border-2 border-blue-200">
          <button
            onClick={onCreatePost}
            className="w-full flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-200"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            Criar um novo post
          </button>
        </div>
      )}

      {/* Posts */}
      {posts.length === 0 ? (
        <div className="text-center py-12">
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
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <p className="mt-4 text-gray-600 font-medium">Nenhum post ainda</p>
          <p className="text-sm text-gray-500">Seja o primeiro a compartilhar uma experiência!</p>
        </div>
      ) : (
        posts.map((post) => (
          <div key={post.id} className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-200">
            {/* Header do post */}
            <div className="p-4 border-b border-gray-100">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold">
                    {post.author?.name?.charAt(0).toUpperCase() || 'A'}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">
                      {post.author?.name || 'Anônimo'}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(post.createdAt).toLocaleDateString('pt-BR', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                </div>

                {/* Menu de opções */}
                <button className="text-gray-400 hover:text-gray-600 p-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Conteúdo do post */}
            <div className="p-4">
              <p className="text-gray-800 text-sm leading-relaxed whitespace-pre-wrap">
                {expandedPost === post.id
                  ? post.content
                  : post.content.length > 200
                  ? `${post.content.substring(0, 200)}...`
                  : post.content}
              </p>

              {post.content.length > 200 && (
                <button
                  onClick={() =>
                    setExpandedPost(
                      expandedPost === post.id ? null : post.id
                    )
                  }
                  className="text-blue-600 text-sm font-medium hover:text-blue-700 mt-2"
                >
                  {expandedPost === post.id ? 'Mostrar menos' : 'Mostrar mais'}
                </button>
              )}

              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Mídia */}
              {post.media && post.media.length > 0 && (
                <div className="grid grid-cols-2 gap-2 mt-4">
                  {post.media.map((media) => (
                    <div
                      key={media.id}
                      className="bg-gray-100 rounded-lg overflow-hidden aspect-square"
                    >
                      {media.type === 'image' ? (
                        <img
                          src={media.url}
                          alt="Post media"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <svg
                            className="w-8 h-8 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Ações */}
            <div className="px-4 py-3 bg-gray-50 border-t border-gray-100 flex items-center gap-4">
              <button
                onClick={() => onLikePost?.(post.id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                  post.likedByCurrentUser
                    ? 'text-red-600 bg-red-50'
                    : 'text-gray-600 hover:bg-gray-200'
                }`}
              >
                <svg
                  className={`w-4 h-4 ${post.likedByCurrentUser ? 'fill-current' : ''}`}
                  fill={post.likedByCurrentUser ? 'currentColor' : 'none'}
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
                <span className="text-sm font-medium">{post.likesCount}</span>
              </button>

              <button className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-200 transition-all duration-200">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v12a2 2 0 01-2 2h-3l-4 4z"
                  />
                </svg>
                <span className="text-sm font-medium">{post.commentsCount}</span>
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default CommunityFeedTab;
