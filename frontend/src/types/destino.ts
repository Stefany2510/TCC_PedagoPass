export interface DestinoProfessor {
  nome: string;
  especialidade: string;
  bio: string;
  foto?: string;
}

export interface DestinoItinerarioDia {
  dia: number;
  titulo: string;
  atividades: string[];
}

export interface Destino {
  id: string;
  titulo: string;
  descricao: string;
  preco: number;
  imagem: string;
  categoria: string;
  dataInicio: string;
  dataFim: string;
  vagas: number;
  localizacao: string;
  duracao: string;
  destaques: string[];
  inclui: string[];
  professor?: DestinoProfessor;
  itinerario?: DestinoItinerarioDia[];
}
