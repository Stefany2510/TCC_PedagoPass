import { useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/hooks/useAuth';

const Navbar = () => {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
    router.push('/');
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-xl md:text-2xl font-bold tracking-wide">
                PedagoPass – Viagens para Professores
              </h1>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-6">
            <div className="flex items-baseline space-x-6">
              <a 
                href="/" 
                className="hover:bg-blue-700 hover:bg-opacity-75 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ease-in-out transform hover:scale-105"
              >
                Início
              </a>
              <a 
                href="/destinos" 
                className="hover:bg-blue-700 hover:bg-opacity-75 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ease-in-out transform hover:scale-105"
              >
                Viagens
              </a>
              <a 
                href="/sobre" 
                className="hover:bg-blue-700 hover:bg-opacity-75 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ease-in-out transform hover:scale-105"
              >
                Sobre
              </a>
            </div>

            {/* User Menu */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 bg-blue-700 hover:bg-blue-600 px-4 py-2 rounded-lg transition-all duration-200"
                >
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-bold text-sm">
                      {user.name?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="text-sm font-medium">{user.name}</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
                    <div className="px-4 py-2 border-b border-gray-200">
                      <p className="text-sm text-gray-600">Logado como:</p>
                      <p className="text-sm font-medium text-gray-900">{user.email}</p>
                    </div>
                    <a
                      href="/perfil"
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200 block"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      Meu Perfil
                    </a>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200"
                    >
                      Sair
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex space-x-3">
                <a
                  href="/login"
                  className="bg-blue-700 hover:bg-blue-600 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                >
                  Entrar
                </a>
                <a
                  href="/cadastro"
                  className="bg-white text-blue-600 hover:bg-gray-100 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                >
                  Cadastrar
                </a>
              </div>
            )}
          </div>

          {/* Menu mobile */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="hover:bg-blue-700 p-2 rounded-md"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-blue-500">
              <a href="/" className="block hover:bg-blue-700 px-3 py-2 rounded-md text-base font-medium">
                Início
              </a>
              <a href="/destinos" className="block hover:bg-blue-700 px-3 py-2 rounded-md text-base font-medium">
                Viagens
              </a>
              <a href="/sobre" className="block hover:bg-blue-700 px-3 py-2 rounded-md text-base font-medium">
                Sobre
              </a>
              {user ? (
                <>
                  <div className="border-t border-blue-500 pt-3 mt-3">
                    <div className="px-3 py-2">
                      <p className="text-sm text-blue-200">Logado como:</p>
                      <p className="text-sm font-medium">{user.name}</p>
                      <p className="text-xs text-blue-200">{user.email}</p>
                    </div>
                    <a 
                      href="/perfil" 
                      className="block hover:bg-blue-700 px-3 py-2 rounded-md text-sm text-blue-100"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Meu Perfil
                    </a>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-3 py-2 text-sm text-red-200 hover:bg-blue-700 rounded-md"
                    >
                      Sair
                    </button>
                  </div>
                </>
              ) : (
                <div className="border-t border-blue-500 pt-3 mt-3 space-y-1">
                  <a href="/login" className="block hover:bg-blue-700 px-3 py-2 rounded-md text-base font-medium">
                    Entrar
                  </a>
                  <a href="/cadastro" className="block hover:bg-blue-700 px-3 py-2 rounded-md text-base font-medium">
                    Cadastrar
                  </a>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
