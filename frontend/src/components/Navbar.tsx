import Link from 'next/link';
import { useMemo } from 'react';
import { useAuth, useLogout } from '@/hooks/useAuth';

export default function Navbar() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const logoutMutation = useLogout();

  const userInitials = useMemo(() => {
    if (!user?.name) return '?';
    const [first] = user.name.trim().split(' ');
    return first?.charAt(0)?.toUpperCase() || '?';
  }, [user?.name]);

  const handleLogout = () => {
    if (!logoutMutation.isPending) {
      logoutMutation.mutate();
    }
  };

  return (
    <header className="border-b border-slate-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <img src="/logo.svg" alt="PedagoPass" className="h-8 w-auto" />
        </Link>

        <nav className="flex items-center gap-4 text-sm text-slate-700">
          <Link href="/destinos" className="hover:text-slate-900">Destinos</Link>
          <Link href="/comunidades" className="hover:text-slate-900">Comunidades</Link>
          <Link href="/sobre-nos" className="hover:text-slate-900">Sobre</Link>
        </nav>

        <div className="flex items-center gap-3">
          {isLoading ? (
            <div className="h-9 w-24 animate-pulse rounded-full bg-slate-200" aria-label="Carregando usuário" />
          ) : isAuthenticated && user ? (
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold text-white">
                {userInitials}
              </div>
              <div className="hidden text-right sm:block">
                <span className="block text-xs text-slate-500">Bem-vindo(a)</span>
                <span className="block text-sm font-semibold text-slate-900">{user.name}</span>
              </div>
              <button
                type="button"
                onClick={handleLogout}
                disabled={logoutMutation.isPending}
                className="rounded-full border border-slate-300 px-3 py-1 text-xs font-medium text-slate-700 transition hover:border-blue-500 hover:text-blue-600 disabled:cursor-wait disabled:opacity-60"
              >
                {logoutMutation.isPending ? 'Saindo...' : 'Sair'}
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/login"
                className="rounded-full border border-transparent px-3 py-1 text-xs font-medium text-blue-600 transition hover:bg-blue-50"
              >
                Entrar
              </Link>
              <Link
                href="/cadastro"
                className="rounded-full bg-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-blue-700"
              >
                Criar conta
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
