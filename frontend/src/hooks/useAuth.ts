import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import * as authApi from '../services/api/authApi';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

export const authKeys = {
  me: ['auth', 'me'] as const,
  validate: ['auth', 'validate'] as const,
};

/**
 * Hook para obter dados do usuário autenticado
 */
export const useAuth = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: authKeys.me,
    queryFn: authApi.getMe,
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutos
  });

  const user = data?.user || null;
  const isAuthenticated = !!user;

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
  };
};

/**
 * Hook para registro
 */
export const useRegister = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: authApi.register,
    onSuccess: (data) => {
      // Atualizar cache do usuário
      queryClient.setQueryData(authKeys.me, data);
      
      // Redirecionar para home ou dashboard após breve feedback para o usuário
      setTimeout(() => {
        router.push('/');
      }, 1500);
    },
    onError: (error: any) => {
      console.error('Erro no registro:', error);
    },
  });
};

/**
 * Hook para login
 */
export const useLogin = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: authApi.login,
    onSuccess: (data) => {
      // Atualizar cache do usuário
      queryClient.setQueryData(authKeys.me, data);
      
      // Redirecionar para home ou página anterior após feedback na tela
      const returnTo = router.query.returnTo as string;
      setTimeout(() => {
        router.push(returnTo || '/');
      }, 1200);
    },
    onError: (error: any) => {
      console.error('Erro no login:', error);
    },
  });
};

/**
 * Hook para logout
 */
export const useLogout = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      // Limpar cache
      queryClient.clear();
      
      // Redirecionar para login
      router.push('/login');
    },
  });
};

/**
 * Hook para atualizar perfil
 */
export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authApi.updateProfile,
    onSuccess: (data) => {
      // Atualizar cache do usuário
      queryClient.setQueryData(authKeys.me, data);
      queryClient.invalidateQueries({ queryKey: authKeys.me });
    },
  });
};

/**
 * Hook para alterar senha
 */
export const useChangePassword = () => {
  return useMutation({
    mutationFn: ({ oldPassword, newPassword }: { oldPassword: string; newPassword: string }) =>
      authApi.changePassword(oldPassword, newPassword),
  });
};

/**
 * Hook para proteger rotas (redirect se não autenticado)
 */
export const useRequireAuth = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        // Salvar URL atual para retornar depois do login
        const returnTo = router.asPath;
        router.push(`/login?returnTo=${encodeURIComponent(returnTo)}`);
      } else {
        setIsChecking(false);
      }
    }
  }, [isAuthenticated, isLoading, router]);

  return { isChecking: isLoading || isChecking };
};
