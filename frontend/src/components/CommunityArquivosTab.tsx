import React, { useState } from 'react';

interface Arquivo {
  id: string;
  name: string;
  description: string;
  category: 'autorização' | 'checklist' | 'orçamento' | 'roteiro' | 'outro';
  fileUrl: string;
  downloadCount: number;
  uploadedBy: string;
  uploadedAt: string;
}

interface CommunityArquivosTabProps {
  arquivos?: Arquivo[];
  isLoading: boolean;
  isMember: boolean;
  onUploadArquivo?: () => void;
}

const categoryLabels: Record<string, string> = {
  autorização: 'Modelo de Autorização',
  checklist: 'Checklist',
  orçamento: 'Planilha de Orçamento',
  roteiro: 'Roteiro',
  outro: 'Outro',
};

const categoryEmojis: Record<string, string> = {
  autorização: '📋',
  checklist: '✅',
  orçamento: '💰',
  roteiro: '🗺️',
  outro: '📄',
};

export const CommunityArquivosTab: React.FC<CommunityArquivosTabProps> = ({
  arquivos = [],
  isLoading,
  isMember,
  onUploadArquivo,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const filteredArquivos = arquivos.filter((a) =>
    selectedCategory ? a.category === selectedCategory : true
  );

  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-lg p-4 shadow-sm animate-pulse"
          >
            <div className="h-6 bg-gray-200 rounded-lg mb-4 w-1/3" />
            <div className="h-12 bg-gray-200 rounded-lg" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* CTA Upload */}
      {isMember && (
        <div className="bg-blue-50 rounded-lg p-4 border-2 border-blue-200">
          <button
            onClick={onUploadArquivo}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-200"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            Enviar arquivo
          </button>
        </div>
      )}

      {/* Filtros de categoria */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setSelectedCategory('')}
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
            selectedCategory === ''
              ? 'bg-blue-600 text-white shadow-md'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Todos ({arquivos.length})
        </button>
        {['autorização', 'checklist', 'orçamento', 'roteiro', 'outro'].map(
          (cat) => {
            const count = arquivos.filter((a) => a.category === cat).length;
            return count > 0 ? (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span>{categoryEmojis[cat]}</span>
                <span>{categoryLabels[cat]}</span>
                <span className="text-sm">({count})</span>
              </button>
            ) : null;
          }
        )}
      </div>

      {/* Lista de arquivos */}
      {filteredArquivos.length === 0 ? (
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
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <p className="mt-4 text-gray-600 font-medium">Nenhum arquivo encontrado</p>
          <p className="text-sm text-gray-500">Comece compartilhando kits e recursos!</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {filteredArquivos.map((arquivo) => (
            <div
              key={arquivo.id}
              className="bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 overflow-hidden group"
            >
              <div className="p-5">
                <div className="flex items-start gap-4 mb-3">
                  <div className="text-4xl">{categoryEmojis[arquivo.category]}</div>
                  <div className="flex-1">
                    <span className="inline-block px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded mb-2">
                      {categoryLabels[arquivo.category]}
                    </span>
                    <h3 className="font-semibold text-gray-900 line-clamp-1 group-hover:text-blue-600 transition-colors">
                      {arquivo.name}
                    </h3>
                  </div>
                </div>

                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {arquivo.description}
                </p>

                {/* Metadados */}
                <div className="text-xs text-gray-500 space-y-1 mb-4">
                  <p>
                    <span className="font-medium">Enviado por:</span> {arquivo.uploadedBy}
                  </p>
                  <p>
                    <span className="font-medium">Data:</span>{' '}
                    {new Date(arquivo.uploadedAt).toLocaleDateString('pt-BR')}
                  </p>
                  <p>
                    <span className="font-medium">Downloads:</span> {arquivo.downloadCount}
                  </p>
                </div>

                {/* Botão de download */}
                <a
                  href={arquivo.fileUrl}
                  download
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-all"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    />
                  </svg>
                  Download
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CommunityArquivosTab;
