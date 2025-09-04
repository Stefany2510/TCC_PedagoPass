const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="text-xl font-bold">PedagoPass</span>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <a href="/" className="hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium">
                Início
              </a>
              <a href="/viagens" className="hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium">
                Viagens
              </a>
              <a href="/sobre" className="hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium">
                Sobre
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
