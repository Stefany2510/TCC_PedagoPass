const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-center md:text-left">
              © {new Date().getFullYear()} PedagoPass. Todos os direitos reservados.
            </p>
          </div>
          <div className="flex space-x-6">
            <a href="/contato" className="hover:text-gray-300">
              Contato
            </a>
            <a href="/privacidade" className="hover:text-gray-300">
              Privacidade
            </a>
            <a href="/termos" className="hover:text-gray-300">
              Termos de Uso
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
