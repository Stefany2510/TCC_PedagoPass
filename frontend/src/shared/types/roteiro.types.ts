/**
 * Tipos e modelos para o sistema de Roteiros
 * Alinhado com design branco-azul e estrutura de comunidades
 */

// ============================================================================
// TIPOS BÁSICOS
// ============================================================================

export type Privacidade = 'privado' | 'link' | 'publico';
export type Periodo = 'manha' | 'tarde' | 'noite';
export type NivelAcessibilidade = 'nao-adaptado' | 'parcialmente-adaptado' | 'totalmente-adaptado';

// ============================================================================
// PARADA (ponto de interesse no roteiro)
// ============================================================================

export interface Parada {
  id: string;
  nome: string;
  endereco?: string;
  lat?: number;
  lng?: number;
  tempoMin?: number; // tempo em minutos
  contato?: string; // telefone/email do local
  observacoes?: string;
  nomeContatoResponsavel?: string;
}

// ============================================================================
// BLOCO (periodo do dia com paradas)
// ============================================================================

export interface Bloco {
  id: string;
  periodo: Periodo;
  horaInicio?: string; // ex: "08:00"
  horaFim?: string; // ex: "12:00"
  paradas: Parada[];
  notas?: string;
}

// ============================================================================
// DIA (unidade de um roteiro)
// ============================================================================

export interface Dia {
  id: string;
  numero: number; // 1, 2, 3...
  titulo: string;
  data?: string; // YYYY-MM-DD
  blocos: Bloco[];
  notas?: string;
}

// ============================================================================
// LOGÍSTICA (detalhes operacionais)
// ============================================================================

export interface Logistica {
  transporte?: string; // "ônibus", "van", "carro próprio"
  alimentacao?: string; // "lancheira", "restaurante", "piquenique"
  pontoDaReuniao?: string;
  horarioDeSaida?: string;
  horarioDeLlegada?: string;
  observacoesLogisticas?: string;
}

// ============================================================================
// ROTEIRO (peça central)
// ============================================================================

export interface Roteiro {
  id: string;
  communityId: string;
  autorId: string;
  autorNome?: string;

  // Metadados
  titulo: string;
  descricao?: string;
  turmaAlvo: string; // ex: "Fundamental II", "Ensino Médio"
  duracao: string; // ex: "2 dias", "1 dia"
  custoEstimado?: number; // por aluno em reais
  acessibilidade: NivelAcessibilidade;
  notasAcessibilidade?: string;

  // Conteúdo pedagógico
  objetivos?: string[];
  disciplinas?: string[]; // ex: ["História", "Geografia"]
  tematicas?: string[]; // ex: ["Patrimônio", "Natureza"]
  materiais?: string[]; // lista de materiais necessários

  // Estrutura
  dias: Dia[];
  logistica?: Logistica;

  // Privacidade e versionamento
  privacidade: Privacidade;
  linkCompartilhamento?: string;

  versao?: number;
  parentId?: string; // referência ao roteiro original (se for fork)

  // Controle
  criadoEm: string; // ISO date
  atualizadoEm?: string; // ISO date
  ativo: boolean;

  // Stats para gamificação
  curtidas?: number;
  duplicacoes?: number;
  avaliacoes?: number;
  notaMedia?: number;
}

// ============================================================================
// DTO para criação/edição
// ============================================================================

export interface CriarRoteiroDTo {
  communityId: string;
  titulo: string;
  turmaAlvo: string;
  duracao: string;
  custoEstimado?: number;
  descricao?: string;
  objetivos?: string[];
  disciplinas?: string[];
  tematicas?: string[];
  privacidade: Privacidade;
}

export interface AtualizarRoteiroDTo {
  titulo?: string;
  descricao?: string;
  turmaAlvo?: string;
  duracao?: string;
  custoEstimado?: number;
  objetivos?: string[];
  disciplinas?: string[];
  acessibilidade?: NivelAcessibilidade;
  notasAcessibilidade?: string;
  privacidade?: Privacidade;
}

// ============================================================================
// FILTROS para busca/descoberta
// ============================================================================

export interface FiltrosRoteiro {
  turmaAlvo?: string;
  disciplinas?: string[];
  duracao?: string; // "1 dia", "2 dias", etc
  custoMax?: number;
  acessibilidade?: NivelAcessibilidade;
  tematicas?: string[];
  ordenarPor?: 'novo' | 'popular' | 'custo-asc' | 'custo-desc' | 'rating';
}

// ============================================================================
// RESPOSTA DE LISTAGEM
// ============================================================================

export interface ListaRoteirosResposta {
  total: number;
  pagina: number;
  porPagina: number;
  roteiros: Roteiro[];
}
