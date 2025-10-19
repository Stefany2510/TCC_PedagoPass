/**
 * /pages/roteiros.tsx
 * Página com lista de todos os roteiros públicos da plataforma
 * Com busca, filtros, e cards em grid
 */

import React, { useState, useMemo } from 'react';
import Head from 'next/head';
import Layout from '@/components/Layout';
import RoteiroCard from '@/components/RoteiroCard';
import { ROTEIROS_MOCK, buscarRoteirosMock } from '@/data/mock/roteiros';
import { FiltrosRoteiro } from '@/shared/types/roteiro.types';

export default function RoteirosPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filtros, setFiltros] = useState<FiltrosRoteiro>({});
  const [roteirosSalvos, setRoteirosSalvos] = useState<Set<string>>(new Set());

  // Filtrar roteiros
  const roteirosExibicao = useMemo(() => {
    // Usar ROTEIROS_MOCK diretamente (sem filtro por community no mock)
    let resultados = ROTEIROS_MOCK.filter((r) => r.ativo);

    // Busca textual
    if (searchTerm.trim()) {
      const termo = searchTerm.toLowerCase();
      resultados = resultados.filter(
        (r) =>
          r.titulo.toLowerCase().includes(termo) ||
          (r.descricao?.toLowerCase().includes(termo) ?? false) ||
          (r.autorNome?.toLowerCase().includes(termo) ?? false)
      );
    }

    // Aplicar filtros
    if (filtros.turmaAlvo) {
      resultados = resultados.filter((r) => r.turmaAlvo === filtros.turmaAlvo);
    }

    if (filtros.custoMax !== undefined) {
      resultados = resultados.filter((r) => (r.custoEstimado ?? 0) <= filtros.custoMax!);
    }

    if (filtros.duracao) {
      resultados = resultados.filter((r) => r.duracao === filtros.duracao);
    }

    if (filtros.acessibilidade) {
      resultados = resultados.filter((r) => r.acessibilidade === filtros.acessibilidade);
    }

    // Ordenação
    if (filtros.ordenarPor === 'novo') {
      resultados.sort((a, b) => new Date(b.criadoEm).getTime() - new Date(a.criadoEm).getTime());
    } else if (filtros.ordenarPor === 'popular') {
      resultados.sort((a, b) => (b.curtidas ?? 0) - (a.curtidas ?? 0));
    } else if (filtros.ordenarPor === 'custo-asc') {
      resultados.sort((a, b) => (a.custoEstimado ?? 0) - (b.custoEstimado ?? 0));
    } else if (filtros.ordenarPor === 'rating') {
      resultados.sort((a, b) => (b.notaMedia ?? 0) - (a.notaMedia ?? 0));
    }

    return resultados;
  }, [searchTerm, filtros]);

  const handleDuplicar = (roteiroId: string) => {
    // TODO: Implementar duplicação (fork com versionamento)
    console.log('Duplicar roteiro:', roteiroId);
  };

  const handleSalvar = (roteiroId: string) => {
    setRoteirosSalvos((prev) => {
      const novo = new Set(prev);
      if (novo.has(roteiroId)) {
        novo.delete(roteiroId);
      } else {
        novo.add(roteiroId);
      }
      return novo;
    });
  };

  return (
    <>
      <Head>
        <title>Roteiros | PedagoPass</title>
        <meta name="description" content="Explore roteiros educacionais para suas aulas" />
      </Head>

      <Layout>
        <div className="min-h-screen bg-gray-50 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* HEADER */}
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                🗺️ Roteiros Educacionais
              </h1>
              <p className="text-gray-600">
                Explore roteiros compartilhados por educadores. Customize, duplique e adapte para
                suas turmas.
              </p>
            </div>

            {/* BUSCA */}
            <div className="mb-6">
              <input
                type="text"
                placeholder="Buscar roteiros por título, descrição ou autor..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* FILTROS E RESULTADOS */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* SIDEBAR FILTROS */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 sticky top-4">
                  <h3 className="font-semibold text-gray-900 mb-4">🔎 Filtros</h3>

                  {/* Turma Alvo */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Turma Alvo
                    </label>
                    <select
                      value={filtros.turmaAlvo || ''}
                      onChange={(e) =>
                        setFiltros((prev) => ({
                          ...prev,
                          turmaAlvo: e.target.value || undefined,
                        }))
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Todas</option>
                      <option value="Fundamental I">Fundamental I</option>
                      <option value="Fundamental II">Fundamental II</option>
                      <option value="Ensino Médio">Ensino Médio</option>
                    </select>
                  </div>

                  {/* Duração */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Duração
                    </label>
                    <select
                      value={filtros.duracao || ''}
                      onChange={(e) =>
                        setFiltros((prev) => ({
                          ...prev,
                          duracao: e.target.value || undefined,
                        }))
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Qualquer uma</option>
                      <option value="1 dia">1 dia</option>
                      <option value="2 dias">2 dias</option>
                      <option value="3+ dias">3+ dias</option>
                    </select>
                  </div>

                  {/* Custo Máximo */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Custo Máximo: R$ {filtros.custoMax ?? 500}
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="500"
                      step="10"
                      value={filtros.custoMax ?? 500}
                      onChange={(e) =>
                        setFiltros((prev) => ({
                          ...prev,
                          custoMax: parseInt(e.target.value),
                        }))
                      }
                      className="w-full"
                    />
                  </div>

                  {/* Acessibilidade */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Acessibilidade
                    </label>
                    <select
                      value={filtros.acessibilidade || ''}
                      onChange={(e) =>
                        setFiltros((prev) => ({
                          ...prev,
                          acessibilidade: e.target.value as any,
                        }))
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Qualquer uma</option>
                      <option value="totalmente-adaptado">Totalmente adaptado</option>
                      <option value="parcialmente-adaptado">Parcialmente adaptado</option>
                      <option value="nao-adaptado">Não adaptado</option>
                    </select>
                  </div>

                  {/* Ordenação */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Ordenar por
                    </label>
                    <select
                      value={filtros.ordenarPor || 'novo'}
                      onChange={(e) =>
                        setFiltros((prev) => ({
                          ...prev,
                          ordenarPor: e.target.value as any,
                        }))
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="novo">Mais novos</option>
                      <option value="popular">Mais populares</option>
                      <option value="rating">Melhor avaliação</option>
                      <option value="custo-asc">Menor custo</option>
                    </select>
                  </div>

                  {/* Botão Limpar Filtros */}
                  <button
                    onClick={() => {
                      setFiltros({});
                      setSearchTerm('');
                    }}
                    className="w-full px-3 py-2 bg-gray-100 text-gray-700 rounded text-sm font-medium hover:bg-gray-200 transition-colors"
                  >
                    🔄 Limpar Filtros
                  </button>
                </div>
              </div>

              {/* GRID DE ROTEIROS */}
              <div className="lg:col-span-3">
                {roteirosExibicao.length === 0 ? (
                  <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-8 text-center">
                    <p className="text-gray-600 mb-2">📭 Nenhum roteiro encontrado</p>
                    <p className="text-sm text-gray-500">Tente ajustar seus filtros ou busca</p>
                  </div>
                ) : (
                  <>
                    <div className="mb-4 text-sm text-gray-600">
                      Mostrando <span className="font-semibold">{roteirosExibicao.length}</span>{' '}
                      roteiros
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {roteirosExibicao.map((roteiro) => (
                        <RoteiroCard
                          key={roteiro.id}
                          roteiro={roteiro}
                          onDuplicar={handleDuplicar}
                          onSalvar={handleSalvar}
                          isSalvo={roteirosSalvos.has(roteiro.id)}
                          showStats
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
