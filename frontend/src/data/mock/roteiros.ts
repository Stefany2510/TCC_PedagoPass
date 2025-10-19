/**
 * Mock data para Roteiros
 * Usado durante desenvolvimento do frontend
 * Será substituído por chamadas ao backend
 */

import { Roteiro, Dia, Bloco, Parada } from '@/shared/types/roteiro.types';

// ============================================================================
// DADOS MOCKADOS DE PARADAS
// ============================================================================

const PARADAS_MOCK: Record<string, Parada> = {
  museuArte: {
    id: 'parada-1',
    nome: 'Museu de Arte Moderna',
    endereco: 'Av. Paulista, 1578 - São Paulo, SP',
    lat: -23.5615,
    lng: -46.656,
    tempoMin: 120,
    contato: '(11) 3251-5644',
    nomeContatoResponsavel: 'Maria Silva',
    observacoes: 'Entrada gratuita para grupos de 10+. Estacionar no pátio interno.',
  },
  parqueIbirapuera: {
    id: 'parada-2',
    nome: 'Parque Ibirapuera',
    endereco: 'Av. Pedro Álvares Cabral, s/n - São Paulo, SP',
    lat: -23.5889,
    lng: -46.658,
    tempoMin: 150,
    contato: '(11) 5574-5000',
    observacoes: 'Ótimo para piquenique. Trajeto possível: museus → marquês → trilha.',
  },
  centroHistorico: {
    id: 'parada-3',
    nome: 'Centro Histórico',
    endereco: 'Rua do Carmo - São Paulo, SP',
    lat: -23.5505,
    lng: -46.6361,
    tempoMin: 180,
    contato: '(11) 3313-3051',
    observacoes: 'Caminhada guiada ou autoguiada. Visita à Igreja do Carmo.',
  },
  fazendaEducativa: {
    id: 'parada-4',
    nome: 'Fazenda Educativa Viva Vida',
    endereco: 'Rod. SP-95, km 52 - Mairinque, SP',
    lat: -23.5431,
    lng: -47.4662,
    tempoMin: 240,
    contato: '(11) 4377-8787',
    nomeContatoResponsavel: 'João Santos',
    observacoes: 'Atividades: ordenharia, horta, alimentação animal. Leve protetor solar.',
  },
  trilhaSerraMarBotanica: {
    id: 'parada-5',
    nome: 'Trilha Botânica - Serra da Mantiqueira',
    endereco: 'Estrada para a Serra - Atibaia, SP',
    lat: -23.1063,
    lng: -46.5511,
    tempoMin: 180,
    contato: '(11) 4411-1100',
    observacoes: 'Nível: moderado. Levar água, repelente. Melhor nos meses secos (maio-setembro).',
  },
};

// ============================================================================
// ROTEIROS MOCKADOS
// ============================================================================

export const ROTEIROS_MOCK: Roteiro[] = [
  {
    id: 'roteiro-1',
    communityId: 'community-1',
    autorId: 'user-1',
    autorNome: 'Profa. Ana Silva',
    titulo: 'Arte e Natureza em SP - 2 dias',
    descricao:
      'Um roteiro que combina exploração de arte moderna com contato com a natureza no Parque Ibirapuera e visita ao museu de arte.',
    turmaAlvo: 'Fundamental II',
    duracao: '2 dias',
    custoEstimado: 85,
    acessibilidade: 'parcialmente-adaptado',
    notasAcessibilidade:
      'Museu tem elevador. Parque com caminhos pavimentados mas com alguns degraus. Banheiros adaptados disponíveis.',
    objetivos: [
      'Compreender história da arte moderna',
      'Conectar arte com natureza',
      'Desenvolver senso crítico',
    ],
    disciplinas: ['Arte', 'História', 'Ciências'],
    tematicas: ['Patrimônio', 'Natureza', 'Cultura'],
    materiais: ['Caderno de anotações', 'Câmera/celular', 'Protetor solar', 'Lancheira'],
    dias: [
      {
        id: 'dia-1',
        numero: 1,
        titulo: 'Arte Moderna',
        data: '2025-10-20',
        blocos: [
          {
            id: 'bloco-1-1',
            periodo: 'manha',
            horaInicio: '08:00',
            horaFim: '12:00',
            paradas: [PARADAS_MOCK.museuArte],
            notas: 'Concentrar-se na mostra de artistas brasileiros do século XX.',
          },
          {
            id: 'bloco-1-2',
            periodo: 'tarde',
            horaInicio: '14:00',
            horaFim: '18:00',
            paradas: [PARADAS_MOCK.parqueIbirapuera],
            notas: 'Piquenique no parque. Tempo livre para reflexão e sketches.',
          },
        ],
        notas: 'Dia 1 foca em observação e criatividade. Retorno às 19h.',
      },
      {
        id: 'dia-2',
        numero: 2,
        titulo: 'Contexto Histórico',
        data: '2025-10-21',
        blocos: [
          {
            id: 'bloco-2-1',
            periodo: 'manha',
            horaInicio: '09:00',
            horaFim: '12:30',
            paradas: [PARADAS_MOCK.centroHistorico],
            notas: 'Caminhada guiada pelo centro histórico. Registro em fotos.',
          },
        ],
        notas: 'Dia 2 encerra com reflexão coletiva.',
      },
    ],
    logistica: {
      transporte: 'Ônibus com ar-condicionado (capacidade 45 alunos)',
      alimentacao: 'Piquenique caseiro (pode ser fornecido pela escola ou trazido)',
      pontoDaReuniao: 'Portaria principal da escola',
      horarioDeSaida: '07:30',
      horarioDeLlegada: '19:00',
      observacoesLogisticas: 'Levar lista de alunos, kit de primeiros socorros e autorização dos pais.',
    },
    privacidade: 'publico',
    versao: 1,
    criadoEm: '2025-09-15T10:00:00Z',
    atualizadoEm: '2025-10-01T14:30:00Z',
    ativo: true,
    curtidas: 24,
    duplicacoes: 5,
    avaliacoes: 12,
    notaMedia: 4.7,
  },

  {
    id: 'roteiro-2',
    communityId: 'community-1',
    autorId: 'user-2',
    autorNome: 'Prof. Carlos Mendes',
    titulo: 'Contato com Natureza - 1 dia',
    descricao: 'Dia de campo focado em sustentabilidade e biodiversidade na Fazenda Educativa.',
    turmaAlvo: 'Fundamental I',
    duracao: '1 dia',
    custoEstimado: 65,
    acessibilidade: 'parcialmente-adaptado',
    notasAcessibilidade: 'Instalações da fazenda adaptadas. Caminhos irregulares em algumas áreas.',
    objetivos: ['Aprender sobre sustentabilidade', 'Contato com animais', 'Plantio e colheita'],
    disciplinas: ['Ciências', 'Educação Ambiental'],
    tematicas: ['Natureza', 'Sustentabilidade'],
    materiais: ['Roupas confortáveis', 'Boné', 'Calçado fechado', 'Repelente'],
    dias: [
      {
        id: 'dia-2-1',
        numero: 1,
        titulo: 'Dia de Campo',
        data: '2025-10-25',
        blocos: [
          {
            id: 'bloco-3-1',
            periodo: 'manha',
            horaInicio: '08:00',
            horaFim: '12:00',
            paradas: [PARADAS_MOCK.fazendaEducativa],
            notas: 'Recepção na fazenda, apresentação, atividades com animais.',
          },
          {
            id: 'bloco-3-2',
            periodo: 'tarde',
            horaInicio: '13:00',
            horaFim: '15:30',
            paradas: [PARADAS_MOCK.fazendaEducativa],
            notas: 'Horta participativa, almoço na fazenda, brincadeiras ao ar livre.',
          },
        ],
        notas: 'Retorno às 16:30.',
      },
    ],
    logistica: {
      transporte: 'Ônibus ou van',
      alimentacao: 'Almoço fornecido pela fazenda (incluso)',
      pontoDaReuniao: 'Portaria da escola',
      horarioDeSaida: '07:15',
      horarioDeLlegada: '16:45',
      observacoesLogisticas: 'Equipe da fazenda faz supervisão. Leve documentação de alergia alimentar.',
    },
    privacidade: 'publico',
    versao: 1,
    criadoEm: '2025-09-10T09:30:00Z',
    atualizadoEm: '2025-10-02T11:00:00Z',
    ativo: true,
    curtidas: 18,
    duplicacoes: 8,
    avaliacoes: 9,
    notaMedia: 4.5,
  },

  {
    id: 'roteiro-3',
    communityId: 'community-1',
    autorId: 'user-1',
    autorNome: 'Profa. Ana Silva',
    titulo: 'Trekking Botânico - Ensino Médio',
    descricao: 'Trilha de nível moderado com foco em botânica, biodiversidade e sustentabilidade.',
    turmaAlvo: 'Ensino Médio',
    duracao: '1 dia',
    custoEstimado: 55,
    acessibilidade: 'nao-adaptado',
    notasAcessibilidade: 'Trilha requer bom condicionamento físico. Não recomendado para alunos com limitações de mobilidade.',
    objetivos: [
      'Identificar flora local',
      'Entender ecossistemas',
      'Conscientização ambiental',
    ],
    disciplinas: ['Biologia', 'Ecologia', 'Educação Ambiental'],
    tematicas: ['Natureza', 'Biodiversidade'],
    materiais: [
      'Botas de trekking',
      'Mochila 20-30L',
      'Água (1-2L)',
      'Protetor solar',
      'Repelente',
      'Lanterna',
    ],
    dias: [
      {
        id: 'dia-3-1',
        numero: 1,
        titulo: 'Trilha Botânica',
        data: '2025-11-02',
        blocos: [
          {
            id: 'bloco-4-1',
            periodo: 'manha',
            horaInicio: '08:00',
            horaFim: '12:30',
            paradas: [PARADAS_MOCK.trilhaSerraMarBotanica],
            notas: 'Caminhada pela trilha com paradas para identificação de plantas. Guia especializado.',
          },
          {
            id: 'bloco-4-2',
            periodo: 'tarde',
            horaInicio: '13:30',
            horaFim: '15:00',
            paradas: [PARADAS_MOCK.trilhaSerraMarBotanica],
            notas: 'Discussão e reflexão no pico. Retorno gradual.',
          },
        ],
        notas: 'Retorno às 17:00. Exigente fisicamente.',
      },
    ],
    logistica: {
      transporte: 'Van com 8-12 alunos por grupo',
      alimentacao: 'Lancheira com frutas, biscoitos e água',
      pontoDaReuniao: 'Base da trilha',
      horarioDeSaida: '07:00',
      horarioDeLlegada: '18:00',
      observacoesLogisticas: 'Exigir atestado médico. Ter seguro. Comunicar previsão de tempo.',
    },
    privacidade: 'link',
    linkCompartilhamento: 'https://roteiros.pedagopass.com/compartilhado/abc123',
    versao: 1,
    criadoEm: '2025-09-20T08:15:00Z',
    atualizadoEm: '2025-09-28T16:45:00Z',
    ativo: true,
    curtidas: 31,
    duplicacoes: 12,
    avaliacoes: 15,
    notaMedia: 4.8,
  },
];

// ============================================================================
// FUNÇÃO PARA BUSCAR ROTEIROS COM FILTROS (mock)
// ============================================================================

import { FiltrosRoteiro } from '@/shared/types/roteiro.types';

export function buscarRoteirosMock(
  communityId: string,
  filtros?: FiltrosRoteiro
): Roteiro[] {
  let resultados = ROTEIROS_MOCK.filter((r) => r.communityId === communityId && r.ativo);

  if (filtros?.turmaAlvo) {
    resultados = resultados.filter((r) => r.turmaAlvo === filtros.turmaAlvo);
  }

  if (filtros?.custoMax) {
    resultados = resultados.filter((r) => (r.custoEstimado ?? 0) <= filtros.custoMax!);
  }

  if (filtros?.duracao) {
    resultados = resultados.filter((r) => r.duracao === filtros.duracao);
  }

  if (filtros?.acessibilidade) {
    resultados = resultados.filter((r) => r.acessibilidade === filtros.acessibilidade);
  }

  // Ordenação
  if (filtros?.ordenarPor === 'novo') {
    resultados.sort((a, b) => new Date(b.criadoEm).getTime() - new Date(a.criadoEm).getTime());
  } else if (filtros?.ordenarPor === 'popular') {
    resultados.sort((a, b) => (b.curtidas ?? 0) - (a.curtidas ?? 0));
  } else if (filtros?.ordenarPor === 'custo-asc') {
    resultados.sort((a, b) => (a.custoEstimado ?? 0) - (b.custoEstimado ?? 0));
  } else if (filtros?.ordenarPor === 'rating') {
    resultados.sort((a, b) => (b.notaMedia ?? 0) - (a.notaMedia ?? 0));
  }

  return resultados;
}

export function obterRoteiroMock(id: string): Roteiro | undefined {
  return ROTEIROS_MOCK.find((r) => r.id === id);
}
