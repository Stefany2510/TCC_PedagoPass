import React, { useState } from 'react';

interface Roteiro {
  id: string;
  name: string;
  description: string;
  duration: number; // em minutos
  cost: number; // por aluno
  accessibility: string[];
  targetAudience: string;
  location: string;
  activities: number;
}

interface CommunityRoteirosTabProps {
  roteiros?: Roteiro[];
  isLoading: boolean;
  isMember: boolean;
  onCreateRoteiro?: () => void;
}

export const CommunityRoteirosTab: React.FC<CommunityRoteirosTabProps> = ({
  roteiros = [],
  isLoading,
  isMember,
  onCreateRoteiro,
}) => {
  const [selectedFilters, setSelectedFilters] = useState({
    duration: '',
    maxCost: '',
    accessibility: '',
    audience: '',
  });

  const filteredRoteiros = roteiros.filter((r) => {
    if (selectedFilters.duration) {
      const maxDuration = parseInt(selectedFilters.duration);
      if (r.duration > maxDuration) return false;
    }
    if (selectedFilters.maxCost) {
      const maxCost = parseFloat(selectedFilters.maxCost);
      if (r.cost > maxCost) return false;
    }
    if (selectedFilters.accessibility) {
      if (!r.accessibility.includes(selectedFilters.accessibility)) return false;
    }
    if (selectedFilters.audience) {
      if (r.targetAudience !== selectedFilters.audience) return false;
    }
    return true;
  });

  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-lg p-4 shadow-sm animate-pulse"
          >
            <div className="h-6 bg-gray-200 rounded-lg mb-4 w-1/3" />
            <div className="h-20 bg-gray-200 rounded-lg" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* CTA Criar Roteiro */}
      {isMember && (
        <div className="bg-green-50 rounded-lg p-4 border-2 border-green-200">
          <button
            onClick={onCreateRoteiro}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-200"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            Criar novo roteiro
          </button>
        </div>
      )}

      {/* Filtros */}
      <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 space-y-4">
        <h3 className="font-semibold text-gray-900">Filtros</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Duração máxima (min)
            </label>
            <input
              type="number"
              value={selectedFilters.duration}
              onChange={(e) =>
                setSelectedFilters({ ...selectedFilters, duration: e.target.value })
              }
              placeholder="Ex: 120"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Custo máximo (R$)
            </label>
            <input
              type="number"
              value={selectedFilters.maxCost}
              onChange={(e) =>
                setSelectedFilters({ ...selectedFilters, maxCost: e.target.value })
              }
              placeholder="Ex: 50"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Acessibilidade
            </label>
            <select
              value={selectedFilters.accessibility}
              onChange={(e) =>
                setSelectedFilters({ ...selectedFilters, accessibility: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">Todas</option>
              <option value="cadeirante">Cadeirante</option>
              <option value="deficiencia-visual">Deficiência Visual</option>
              <option value="deficiencia-auditiva">Deficiência Auditiva</option>
              <option value="mobilidade-reduzida">Mobilidade Reduzida</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Turma-alvo
            </label>
            <select
              value={selectedFilters.audience}
              onChange={(e) =>
                setSelectedFilters({ ...selectedFilters, audience: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">Todas</option>
              <option value="infantil">Educação Infantil</option>
              <option value="fund1">Fundamental I</option>
              <option value="fund2">Fundamental II</option>
              <option value="medio">Ensino Médio</option>
              <option value="superior">Ensino Superior</option>
            </select>
          </div>
        </div>
      </div>

      {/* Lista de Roteiros */}
      {filteredRoteiros.length === 0 ? (
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
          <p className="mt-4 text-gray-600 font-medium">Nenhum roteiro encontrado</p>
          <p className="text-sm text-gray-500">Tente ajustar os filtros ou criar um novo</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {filteredRoteiros.map((roteiro) => (
            <div
              key={roteiro.id}
              className="bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 overflow-hidden cursor-pointer group"
            >
              <div className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-semibold text-gray-900 group-hover:text-green-600 transition-colors">
                    {roteiro.name}
                  </h3>
                  <span className="text-2xl">🎯</span>
                </div>

                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {roteiro.description}
                </p>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-2 mb-4">
                  <div className="bg-blue-50 p-2 rounded text-sm">
                    <p className="text-xs text-blue-700 font-medium">Duração</p>
                    <p className="font-semibold text-blue-900">
                      {Math.floor(roteiro.duration / 60)}h{roteiro.duration % 60}min
                    </p>
                  </div>
                  <div className="bg-orange-50 p-2 rounded text-sm">
                    <p className="text-xs text-orange-700 font-medium">Custo/aluno</p>
                    <p className="font-semibold text-orange-900">
                      R$ {roteiro.cost.toFixed(2)}
                    </p>
                  </div>
                </div>

                {/* Acessibilidade */}
                {roteiro.accessibility.length > 0 && (
                  <div className="mb-3">
                    <p className="text-xs font-medium text-gray-700 mb-1">Acessibilidade:</p>
                    <div className="flex flex-wrap gap-1">
                      {roteiro.accessibility.map((a) => (
                        <span
                          key={a}
                          className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full"
                        >
                          ♿ {a}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Footer */}
                <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                  <p className="text-xs text-gray-500">{roteiro.activities} atividades</p>
                  <button className="text-green-600 hover:text-green-700 font-medium text-sm">
                    Ver detalhes →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CommunityRoteirosTab;
