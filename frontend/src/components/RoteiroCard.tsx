/**
 * RoteiroCard - Card reutilizável para exibir um Roteiro
 *
 * Características:
 * - Layout limpo com sombra suave (1px)
 * - Chips: turmaAlvo, duração, custo
 * - 2-3 paradas em destaque
 * - Ações: Ver, Duplicar, Salvar
 * - Visual: branco-azul com emojis
 */

import React, { useState } from 'react';
import Link from 'next/link';
import { Roteiro } from '@/shared/types/roteiro.types';

interface RoteiroCardProps {
  roteiro: Roteiro;
  onDuplicar?: (roteiroId: string) => void;
  onSalvar?: (roteiroId: string) => void;
  isSalvo?: boolean;
  showStats?: boolean; // Mostrar curtidas, duplicações, nota
}

export const RoteiroCard: React.FC<RoteiroCardProps> = ({
  roteiro,
  onDuplicar,
  onSalvar,
  isSalvo = false,
  showStats = true,
}) => {
  const [localIsSalvo, setLocalIsSalvo] = useState(isSalvo);

  // Pegar primeiras 2-3 paradas
  const paradasDestaque = roteiro.dias
    .flatMap((dia) => dia.blocos.flatMap((bloco) => bloco.paradas))
    .slice(0, 3);

  const handleSalvar = (e: React.MouseEvent) => {
    e.preventDefault();
    setLocalIsSalvo(!localIsSalvo);
    onSalvar?.(roteiro.id);
  };

  const handleDuplicar = (e: React.MouseEvent) => {
    e.preventDefault();
    onDuplicar?.(roteiro.id);
  };

  return (
    <Link href={`/roteiros/${roteiro.id}`}>
      <div className="group cursor-pointer bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-4 border border-gray-100 hover:border-blue-200">
        {/* HEADER - Título + Autor */}
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
              {roteiro.titulo}
            </h3>
            <p className="text-sm text-gray-600">por {roteiro.autorNome || 'Anônimo'}</p>
          </div>
        </div>

        {/* DESCRIÇÃO */}
        <p className="text-sm text-gray-700 mb-3 line-clamp-2">{roteiro.descricao}</p>

        {/* CHIPS - Turma, Duração, Custo */}
        <div className="flex flex-wrap gap-2 mb-3">
          {/* Turma Alvo */}
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
            👥 {roteiro.turmaAlvo}
          </span>

          {/* Duração */}
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-purple-50 text-purple-700">
            ⏱️ {roteiro.duracao}
          </span>

          {/* Custo */}
          {roteiro.custoEstimado && (
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700">
              💵 R$ {roteiro.custoEstimado}
            </span>
          )}

          {/* Acessibilidade */}
          {roteiro.acessibilidade !== 'nao-adaptado' && (
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-700">
              ♿ {roteiro.acessibilidade === 'totalmente-adaptado' ? 'Totalmente' : 'Parcialmente'} adaptado
            </span>
          )}
        </div>

        {/* PARADAS DESTAQUE */}
        {paradasDestaque.length > 0 && (
          <div className="bg-gray-50 rounded p-3 mb-3">
            <p className="text-xs font-semibold text-gray-600 mb-2">📍 Paradas:</p>
            <div className="space-y-1">
              {paradasDestaque.map((parada, idx) => (
                <div key={parada.id} className="text-xs text-gray-700">
                  <span className="font-medium">{idx + 1}.</span> {parada.nome}
                  {idx < paradasDestaque.length - 1 && <span className="text-gray-400"> → </span>}
                </div>
              ))}
              {roteiro.dias.flatMap((d) => d.blocos.flatMap((b) => b.paradas)).length >
                3 && (
                <div className="text-xs text-blue-600 font-medium">
                  +{roteiro.dias.flatMap((d) => d.blocos.flatMap((b) => b.paradas)).length - 3} mais
                </div>
              )}
            </div>
          </div>
        )}

        {/* STATS */}
        {showStats && (
          <div className="flex items-center justify-between text-xs text-gray-500 mb-3 border-t pt-2">
            <div className="flex gap-3">
              <span>❤️ {roteiro.curtidas ?? 0}</span>
              <span>📋 {roteiro.duplicacoes ?? 0} duplicados</span>
              <span>⭐ {roteiro.notaMedia?.toFixed(1) ?? '—'}</span>
            </div>
          </div>
        )}

        {/* AÇÕES */}
        <div className="flex gap-2">
          <button
            onClick={handleDuplicar}
            className="flex-1 px-3 py-2 bg-blue-500 text-white text-sm font-medium rounded hover:bg-blue-600 transition-colors"
            title="Duplicar este roteiro"
          >
            📋 Duplicar
          </button>
          <button
            onClick={handleSalvar}
            className={`px-3 py-2 text-sm font-medium rounded transition-colors ${
              localIsSalvo
                ? 'bg-red-50 text-red-600 border border-red-200 hover:bg-red-100'
                : 'bg-gray-100 text-gray-600 border border-gray-200 hover:bg-gray-200'
            }`}
            title={localIsSalvo ? 'Remover favorito' : 'Adicionar aos favoritos'}
          >
            {localIsSalvo ? '❤️' : '🤍'} Salvar
          </button>
        </div>
      </div>
    </Link>
  );
};

export default RoteiroCard;
