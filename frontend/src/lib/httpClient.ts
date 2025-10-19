import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export const httpClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Importante: envia cookies automaticamente
});

// Interceptor para tratar erros de resposta
httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expirado ou inválido
      if (typeof window !== 'undefined') {
        // Redirecionar para login apenas se não estiver na página de login/cadastro
        const currentPath = window.location.pathname;
        if (currentPath !== '/login' && currentPath !== '/cadastro') {
          window.location.href = '/login';
        }
      }
    }
    return Promise.reject(error);
  }
);
