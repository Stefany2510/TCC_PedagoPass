import { Destino } from '@/types/destino';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export async function getAllDestinos(): Promise<Destino[]> {
  try {
    const response = await fetch(`${API_URL}/destinos`);
    if (!response.ok) {
      throw new Error('Falha ao buscar destinos');
    }
    return response.json();
  } catch (error) {
    console.error('Erro ao buscar destinos:', error);
    throw error;
  }
}

export async function getDestinoById(id: string): Promise<Destino> {
  try {
    const response = await fetch(`${API_URL}/destinos/${id}`);
    if (!response.ok) {
      throw new Error('Destino não encontrado');
    }
    return response.json();
  } catch (error) {
    console.error(`Erro ao buscar destino ${id}:`, error);
    throw error;
  }
}

export async function searchDestinos(query: string): Promise<Destino[]> {
  try {
    const response = await fetch(`${API_URL}/destinos?search=${encodeURIComponent(query)}`);
    if (!response.ok) {
      throw new Error('Falha ao buscar destinos');
    }
    return response.json();
  } catch (error) {
    console.error('Erro ao buscar destinos:', error);
    throw error;
  }
}
