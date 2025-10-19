import { httpClient } from '../../lib/httpClient';

export interface RegisterDTO {
  email: string;
  password: string;
  name: string;
  role?: 'STUDENT' | 'TEACHER' | 'ADMIN';
  escola?: string;
  cidade?: string;
  estado?: string;
  bio?: string;
}

export interface LoginDTO {
  email: string;
  password: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'STUDENT' | 'TEACHER' | 'ADMIN';
  avatarUrl?: string;
  bio?: string;
  escola?: string;
  cidade?: string;
  estado?: string;
  pontos: number;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  user?: User;
}

/**
 * Registrar novo usuário
 */
export const register = async (data: RegisterDTO): Promise<AuthResponse> => {
  const response = await httpClient.post<AuthResponse>('/api/auth/register', data);
  return response.data;
};

/**
 * Fazer login
 */
export const login = async (data: LoginDTO): Promise<AuthResponse> => {
  const response = await httpClient.post<AuthResponse>('/api/auth/login', data);
  return response.data;
};

/**
 * Fazer logout
 */
export const logout = async (): Promise<AuthResponse> => {
  const response = await httpClient.post<AuthResponse>('/api/auth/logout');
  return response.data;
};

/**
 * Buscar dados do usuário autenticado
 */
export const getMe = async (): Promise<AuthResponse> => {
  const response = await httpClient.get<AuthResponse>('/api/auth/me');
  return response.data;
};

/**
 * Validar token
 */
export const validateToken = async (): Promise<AuthResponse> => {
  const response = await httpClient.get<AuthResponse>('/api/auth/validate');
  return response.data;
};

/**
 * Atualizar perfil
 */
export const updateProfile = async (data: Partial<User>): Promise<AuthResponse> => {
  const response = await httpClient.put<AuthResponse>('/api/auth/profile', data);
  return response.data;
};

/**
 * Alterar senha
 */
export const changePassword = async (oldPassword: string, newPassword: string): Promise<AuthResponse> => {
  const response = await httpClient.put<AuthResponse>('/api/auth/change-password', {
    oldPassword,
    newPassword,
  });
  return response.data;
};
