interface User {
  id: string;
  name: string;
  email: string;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

interface LoginData {
  email: string;
  password: string;
}

interface UpdateProfileData {
  name: string;
  email: string;
  currentPassword?: string;
  newPassword?: string;
}

interface AuthResponse {
  success: boolean;
  user?: User;
  message: string;
  token?: string;
}

const resolveApiBaseUrl = (): string => {
  const envUrl = process.env.NEXT_PUBLIC_API_URL?.trim();
  const baseUrl = envUrl && envUrl.startsWith('http')
    ? envUrl
    : (typeof window !== 'undefined'
        ? window.location.origin
        : 'http://localhost:4000');

  const normalized = baseUrl.replace(/\/$/, '');
  return normalized.endsWith('/api') ? normalized : `${normalized}/api`;
};

class UserService {
  private baseURL = resolveApiBaseUrl();

  async register(userData: RegisterData): Promise<AuthResponse> {
    try {
      const response = await fetch(`${this.baseURL}/users/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao cadastrar usuário');
      }

      return {
        success: true,
        user: data.user,
        message: 'Usuário cadastrado com sucesso!',
        token: data.token,
      };
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Erro desconhecido',
      };
    }
  }

  async login(loginData: LoginData): Promise<AuthResponse> {
    try {
      const response = await fetch(`${this.baseURL}/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao fazer login');
      }

      // Salvar token no localStorage
      if (data.token) {
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
      }

      return {
        success: true,
        user: data.user,
        message: 'Login realizado com sucesso!',
        token: data.token,
      };
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Erro desconhecido',
      };
    }
  }

  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  }

  getCurrentUser(): User | null {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  async updateProfile(userData: UpdateProfileData): Promise<AuthResponse> {
    try {
      console.log('🔄 Iniciando atualização de perfil...');
      console.log('📊 Dados a serem enviados:', userData);
      
      const token = this.getToken();
      console.log('🔑 Token:', token ? 'encontrado' : 'não encontrado');

      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };

      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      console.log('� Fazendo requisição para:', `${this.baseURL}/users/profile`);

      const response = await fetch(`${this.baseURL}/users/profile`, {
        method: 'PUT',
        headers,
        body: JSON.stringify(userData),
      });

      console.log('📡 Resposta recebida:', response.status, response.statusText);

      const data = await response.json();
      console.log('📊 Dados da resposta:', data);

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao atualizar perfil');
      }

      // Atualizar dados do usuário no localStorage se o perfil foi atualizado com sucesso
      if (data.user) {
        console.log('💾 Atualizando localStorage com novos dados do usuário');
        localStorage.setItem('user', JSON.stringify(data.user));
      }

      return {
        success: true,
        user: data.user,
        message: 'Perfil atualizado com sucesso!',
      };
    } catch (error) {
      console.log('❌ Erro na atualização do perfil:', error);
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Erro desconhecido',
      };
    }
  }
}

export default new UserService();