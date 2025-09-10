import { Destino } from '@/types/destino';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

// Interface para resposta da API
interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
  total?: number;
}

export async function getAllDestinos(): Promise<Destino[]> {
  try {
    const response = await fetch(`${API_URL}/destinos`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result: ApiResponse<Destino[]> = await response.json();
    
    if (result.success) {
      return result.data;
    } else {
      throw new Error(result.message || 'Erro ao buscar destinos');
    }
  } catch (error) {
    console.error('Erro ao buscar destinos:', error);
    
    // Fallback para dados mock em caso de erro
    const mockDestinos: Destino[] = [
      {
        id: '1',
        titulo: 'Paris - Cidade da Luz',
        descricao: 'Explore os museus, arquitetura e história francesa em uma viagem educacional inesquecível.',
        preco: 4500,
        imagem: 'https://images.pexels.com/photos/161853/eiffel-tower-paris-france-tower-161853.jpeg?auto=compress&cs=tinysrgb&w=800',
        categoria: 'Cultural',
        dataInicio: '2025-03-15',
        dataFim: '2025-03-22',
        vagas: 20,
        localizacao: 'Paris, França',
        destaques: ['Museu do Louvre', 'Torre Eiffel', 'Versalhes', 'Workshops de arte'],
        inclui: ['Hospedagem', 'Café da manhã', 'Guia especializado', 'Visitas a museus'],
        professor: {
          nome: 'Dr. Ana Silva',
          especialidade: 'História da Arte',
          bio: 'Professora doutora em História da Arte com 15 anos de experiência em educação.'
        }
      },
      {
        id: '2',
        titulo: 'Roma - Berço da Civilização',
        descricao: 'Descubra a história antiga e renascentista em uma das cidades mais importantes do mundo.',
        preco: 3800,
        imagem: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        categoria: 'Histórica',
        dataInicio: '2025-04-10',
        dataFim: '2025-04-16',
        vagas: 18,
        localizacao: 'Roma, Itália',
        destaques: ['Coliseu', 'Fórum Romano', 'Museus Vaticanos', 'Seminários de história'],
        inclui: ['Hospedagem', 'Café da manhã', 'Guia histórico', 'Ingressos para monumentos'],
        professor: {
          nome: 'Prof. Carlos Romano',
          especialidade: 'História Antiga',
          bio: 'Especialista em civilizações antigas com doutorado pela Universidade de Roma.'
        }
      },
      {
        id: '3',
        titulo: 'Atenas - Filosofia e História',
        descricao: 'Caminhe pelos passos dos grandes filósofos em uma jornada educacional única.',
        preco: 3200,
        imagem: 'https://images.pexels.com/photos/2064827/pexels-photo-2064827.jpeg?auto=compress&cs=tinysrgb&w=800',
        categoria: 'Educacional',
        dataInicio: '2025-05-05',
        dataFim: '2025-05-10',
        vagas: 15,
        localizacao: 'Atenas, Grécia',
        destaques: ['Acrópole', 'Ágora Antiga', 'Museu Nacional', 'Debates filosóficos'],
        inclui: ['Hospedagem', 'Café da manhã', 'Workshops de filosofia', 'Visitas arqueológicas'],
        professor: {
          nome: 'Dra. Sofia Papadopoulos',
          especialidade: 'Filosofia Clássica',
          bio: 'Filósofa com especialização em pensamento grego antigo e métodos socráticos.'
        }
      }
    ];
    
    return mockDestinos;
  }
}

export async function getDestinoById(id: string): Promise<Destino> {
  try {
    const response = await fetch(`${API_URL}/destinos/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result: ApiResponse<Destino> = await response.json();
    
    if (result.success) {
      return result.data;
    } else {
      throw new Error(result.message || 'Destino não encontrado');
    }
  } catch (error) {
    console.error(`Erro ao buscar destino ${id}:`, error);
    throw error;
  }
}

export async function searchDestinos(query: string): Promise<Destino[]> {
  try {
    const response = await fetch(`${API_URL}/destinos?search=${encodeURIComponent(query)}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result: ApiResponse<Destino[]> = await response.json();
    
    if (result.success) {
      return result.data;
    } else {
      throw new Error(result.message || 'Erro ao buscar destinos');
    }
  } catch (error) {
    console.error('Erro ao pesquisar destinos:', error);
    return [];
  }
}
