const Navbar = () => {
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
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-6">
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
          </div>
          {/* Menu mobile */}
          <div className="md:hidden">
            <button className="hover:bg-blue-700 p-2 rounded-md">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
