/**
 * /pages/roteiros/[id].tsx
 * Página de detalhe de um roteiro
 * Mostra: metadados, cronograma dia-a-dia, logística, materiais
 * CTAs: Duplicar, Salvar, PDF, Checklist
 */

import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Layout from '@/components/Layout';
import { obterRoteiroMock } from '@/data/mock/roteiros';
import { Roteiro } from '@/shared/types/roteiro.types';

export default function RoteiroDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const [isSalvo, setIsSalvo] = useState(false);

  const roteiro = typeof id === 'string' ? obterRoteiroMock(id) : null;

  if (router.isFallback) {
    return <div>Carregando...</div>;
  }

  if (!roteiro) {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Roteiro não encontrado</h1>
            <button
              onClick={() => router.push('/roteiros')}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              ← Voltar para Roteiros
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  const handleDuplicar = () => {
    console.log('Duplicar roteiro:', roteiro.id);
    // TODO: Implementar fork/duplicação
  };

  const handleExportarPDF = () => {
    console.log('Exportar PDF:', roteiro.id);
    // TODO: Integrar html2pdf
  };

  const handleImprimirChecklist = () => {
    console.log('Imprimir checklist:', roteiro.id);
    // TODO: Print checklist
  };

  const totalParadas = roteiro.dias
    .flatMap((dia) => dia.blocos.flatMap((bloco) => bloco.paradas))
    .filter((p, idx, arr) => arr.findIndex((x) => x.id === p.id) === idx);

  return (
    <>
      <Head>
        <title>{roteiro.titulo} | PedagoPass</title>
        <meta name="description" content={roteiro.descricao} />
      </Head>

      <Layout>
        <div className="min-h-screen bg-gray-50 py-8">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* HEADER */}
            <div className="mb-6 flex items-start justify-between">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">{roteiro.titulo}</h1>
                <p className="text-gray-600">por {roteiro.autorNome || 'Anônimo'}</p>
              </div>
              <button
                onClick={() => router.push('/roteiros')}
                className="px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
                title="Voltar"
              >
                ✕
              </button>
            </div>

            {/* CTAs PRINCIPAIS */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-6">
              <button
                onClick={handleDuplicar}
                className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 text-white rounded font-medium hover:bg-blue-600 transition-colors"
              >
                📋 Duplicar
              </button>
              <button
                onClick={() => setIsSalvo(!isSalvo)}
                className={`flex items-center justify-center gap-2 px-4 py-2 rounded font-medium transition-colors ${
                  isSalvo
                    ? 'bg-red-50 text-red-600 border border-red-200 hover:bg-red-100'
                    : 'bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200'
                }`}
              >
                {isSalvo ? '❤️' : '🤍'} Salvar
              </button>
              <button
                onClick={handleExportarPDF}
                className="flex items-center justify-center gap-2 px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded font-medium hover:bg-gray-50 transition-colors"
              >
                📄 PDF
              </button>
              <button
                onClick={handleImprimirChecklist}
                className="flex items-center justify-center gap-2 px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded font-medium hover:bg-gray-50 transition-colors"
              >
                ☑️ Checklist
              </button>
            </div>

            {/* GRID 2 COLUNAS */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* COLUNA ESQUERDA - DESCRIÇÃO */}
              <div className="lg:col-span-2">
                {/* CARD - DESCRIÇÃO */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 mb-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-3">📝 Descrição</h2>
                  <p className="text-gray-700 leading-relaxed mb-4">{roteiro.descricao}</p>

                  {/* Objetivos */}
                  <div className="mb-4">
                    <h3 className="font-medium text-gray-900 mb-2">🎯 Objetivos</h3>
                    <ul className="list-disc list-inside space-y-1">
                      {roteiro.objetivos?.map((obj, idx) => (
                        <li key={idx} className="text-gray-700">
                          {obj}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Disciplinas e Temáticas */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h3 className="font-medium text-gray-900 mb-2">📚 Disciplinas</h3>
                      <div className="flex flex-wrap gap-2">
                        {roteiro.disciplinas?.map((d) => (
                          <span
                            key={d}
                            className="inline-block px-3 py-1 bg-blue-50 text-blue-700 rounded text-sm"
                          >
                            {d}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 mb-2">🏷️ Temáticas</h3>
                      <div className="flex flex-wrap gap-2">
                        {roteiro.tematicas?.map((t) => (
                          <span
                            key={t}
                            className="inline-block px-3 py-1 bg-purple-50 text-purple-700 rounded text-sm"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* CARD - CRONOGRAMA */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 mb-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">📅 Cronograma</h2>

                  {roteiro.dias?.map((dia) => (
                    <div key={dia.id} className="mb-6 pb-6 border-b last:border-b-0">
                      {/* Cabeçalho do Dia */}
                      <div className="flex items-center gap-2 mb-3">
                        <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-sm">
                          {dia.numero}
                        </span>
                        <h3 className="text-lg font-semibold text-gray-900">{dia.titulo}</h3>
                        {dia.data && (
                          <span className="text-sm text-gray-500">
                            {new Date(dia.data).toLocaleDateString('pt-BR')}
                          </span>
                        )}
                      </div>

                      {/* Blocos do Dia */}
                      <div className="space-y-3 ml-10">
                        {dia.blocos?.map((bloco) => (
                          <div
                            key={bloco.id}
                            className="bg-gray-50 rounded p-3 border border-gray-200"
                          >
                            {/* Período e Horário */}
                            <div className="flex items-center gap-2 mb-2">
                              <span className="text-sm font-semibold text-gray-900 capitalize">
                                {bloco.periodo === 'manha' && '🌅 Manhã'}
                                {bloco.periodo === 'tarde' && '☀️ Tarde'}
                                {bloco.periodo === 'noite' && '🌙 Noite'}
                              </span>
                              <span className="text-sm text-gray-600">
                                {bloco.horaInicio} - {bloco.horaFim}
                              </span>
                            </div>

                            {/* Paradas */}
                            {bloco.paradas?.length > 0 && (
                              <div className="mb-2">
                                <p className="text-xs font-medium text-gray-600 mb-1">Paradas:</p>
                                {bloco.paradas.map((parada, idx) => (
                                  <div key={parada.id} className="text-sm text-gray-700">
                                    <span className="font-medium">{idx + 1}.</span> {parada.nome}
                                    <span className="text-gray-500 text-xs ml-2">
                                      ({parada.tempoMin} min)
                                    </span>
                                  </div>
                                ))}
                              </div>
                            )}

                            {/* Notas do Bloco */}
                            {bloco.notas && (
                              <p className="text-xs text-gray-600 italic border-t pt-2 mt-2">
                                {bloco.notas}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>

                      {/* Notas do Dia */}
                      {dia.notas && (
                        <p className="text-sm text-gray-600 mt-3 pl-10">💡 {dia.notas}</p>
                      )}
                    </div>
                  ))}
                </div>

                {/* CARD - MATERIAIS */}
                {roteiro.materiais && roteiro.materiais.length > 0 && (
                  <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-3">📦 Materiais Necessários</h2>
                    <ul className="list-disc list-inside space-y-1">
                      {roteiro.materiais.map((mat, idx) => (
                        <li key={idx} className="text-gray-700">
                          {mat}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* COLUNA DIREITA - METADADOS E LOGÍSTICA */}
              <div className="lg:col-span-1">
                {/* CARD - INFORMAÇÕES RÁPIDAS */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 mb-4">
                  <h3 className="font-semibold text-gray-900 mb-3">ℹ️ Informações</h3>

                  <div className="space-y-3 text-sm">
                    <div>
                      <p className="text-gray-600">Turma Alvo</p>
                      <p className="font-medium text-gray-900">{roteiro.turmaAlvo}</p>
                    </div>

                    <div>
                      <p className="text-gray-600">Duração</p>
                      <p className="font-medium text-gray-900">{roteiro.duracao}</p>
                    </div>

                    <div>
                      <p className="text-gray-600">Custo Estimado</p>
                      <p className="font-medium text-gray-900">
                        {roteiro.custoEstimado ? `R$ ${roteiro.custoEstimado}` : 'Gratuito'}
                      </p>
                    </div>

                    <div>
                      <p className="text-gray-600">Acessibilidade</p>
                      <p className="font-medium text-gray-900">
                        {roteiro.acessibilidade === 'totalmente-adaptado' && '♿ Totalmente adaptado'}
                        {roteiro.acessibilidade === 'parcialmente-adaptado' && '♿ Parcialmente adaptado'}
                        {roteiro.acessibilidade === 'nao-adaptado' && 'Não adaptado'}
                      </p>
                    </div>

                    <div>
                      <p className="text-gray-600">Paradas</p>
                      <p className="font-medium text-gray-900">{totalParadas.length}</p>
                    </div>
                  </div>
                </div>

                {/* CARD - LOGÍSTICA */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 mb-4">
                  <h3 className="font-semibold text-gray-900 mb-3">🚌 Logística</h3>

                  <div className="space-y-2 text-sm">
                    {roteiro.logistica?.transporte && (
                      <div>
                        <p className="text-gray-600">Transporte</p>
                        <p className="font-medium text-gray-900">{roteiro.logistica.transporte}</p>
                      </div>
                    )}

                    {roteiro.logistica?.alimentacao && (
                      <div>
                        <p className="text-gray-600">Alimentação</p>
                        <p className="font-medium text-gray-900">{roteiro.logistica.alimentacao}</p>
                      </div>
                    )}

                    {roteiro.logistica?.horarioDeSaida && (
                      <div>
                        <p className="text-gray-600">Saída</p>
                        <p className="font-medium text-gray-900">{roteiro.logistica.horarioDeSaida}</p>
                      </div>
                    )}

                    {roteiro.logistica?.horarioDeLlegada && (
                      <div>
                        <p className="text-gray-600">Retorno</p>
                        <p className="font-medium text-gray-900">{roteiro.logistica.horarioDeLlegada}</p>
                      </div>
                    )}

                    {roteiro.logistica?.pontoDaReuniao && (
                      <div>
                        <p className="text-gray-600">Ponto de Reunião</p>
                        <p className="font-medium text-gray-900">{roteiro.logistica.pontoDaReuniao}</p>
                      </div>
                    )}

                    {roteiro.logistica?.observacoesLogisticas && (
                      <div>
                        <p className="text-gray-600">Observações</p>
                        <p className="text-gray-700 text-xs">{roteiro.logistica.observacoesLogisticas}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* CARD - STATS */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
                  <h3 className="font-semibold text-gray-900 mb-3">📊 Stats</h3>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">❤️ Curtidas</span>
                      <span className="font-medium">{roteiro.curtidas ?? 0}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">📋 Duplicações</span>
                      <span className="font-medium">{roteiro.duplicacoes ?? 0}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">⭐ Avaliações</span>
                      <span className="font-medium">{roteiro.avaliacoes ?? 0}</span>
                    </div>
                    <div className="flex justify-between border-t pt-2">
                      <span className="text-gray-600">⭐ Nota Média</span>
                      <span className="font-bold text-blue-600">{roteiro.notaMedia?.toFixed(1) ?? '—'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
