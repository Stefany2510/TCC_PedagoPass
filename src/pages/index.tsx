import Layout from '@/components/Layout';
import Link from 'next/link';
import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>PedagoPass - Viagens para Professores</title>
        <meta name="description" content="Explore viagens feitas sob medida para professores. Descubra experiências educacionais únicas e enriquecedoras." />
      </Head>
      
      <Layout>
        {/* Hero Section */}
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <div className="mb-8">
              <div className="inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                ✨ Viagens Educacionais Exclusivas para Educadores
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
                Bem-vindo ao 
                <span className="text-blue-600 block mt-2">PedagoPass</span>
              </h1>
              
              <p className="text-xl md:text-2xl lg:text-3xl text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed">
                Explore viagens feitas sob medida para professores.<br />
                <span className="text-blue-600 font-semibold">Aprenda, conecte-se e inspire-se!</span>
              </p>
            </div>

            {/* Botão Principal */}
            <div className="mb-16">
              <Link 
                href="/destinos"
                className="group inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg md:text-xl px-12 py-4 rounded-full shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-blue-300"
              >
                <span>Ver destinos</span>
                <svg className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <p className="mt-4 text-gray-500 text-sm">
                🎒 Mais de 50 destinos educacionais • ⭐ Avaliação 4.9/5
              </p>
            </div>

            {/* Cards de Destaque */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-2">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Viagens Educacionais</h3>
                <p className="text-gray-600 leading-relaxed">
                  Explore destinos que combinam aprendizado e descoberta, 
                  proporcionando experiências únicas para enriquecer sua prática pedagógica.
                </p>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-2">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Formação Continuada</h3>
                <p className="text-gray-600 leading-relaxed">
                  Participe de workshops, cursos e seminários durante suas viagens, 
                  ampliando seus conhecimentos com especialistas renomados.
                </p>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-2">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Networking</h3>
                <p className="text-gray-600 leading-relaxed">
                  Conecte-se com educadores de todo o Brasil, 
                  construindo uma rede profissional sólida e duradoura.
                </p>
              </div>
            </div>

            {/* Seção de Depoimentos */}
            <div className="mt-16 pt-8 border-t border-gray-200">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">O que dizem nossos professores</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <p className="text-gray-700 italic mb-4">
                    "A viagem para Paris transformou minha maneira de ensinar História da Arte. 
                    Ver as obras pessoalmente e participar dos workshops foi incrível!"
                  </p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-blue-200 rounded-full flex items-center justify-center mr-3">
                      <span className="text-blue-800 font-bold">M</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Maria Santos</p>
                      <p className="text-sm text-gray-600">Professora de História</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-green-50 p-6 rounded-lg">
                  <p className="text-gray-700 italic mb-4">
                    "O networking com outros educadores foi fantástico. 
                    Trouxe muitas ideias novas para minha sala de aula!"
                  </p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-green-200 rounded-full flex items-center justify-center mr-3">
                      <span className="text-green-800 font-bold">J</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">João Oliveira</p>
                      <p className="text-sm text-gray-600">Professor de Geografia</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Call to Action Final */}
            <div className="mt-16 pt-8">
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white text-center">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                  Pronto para transformar sua jornada educacional?
                </h2>
                <p className="text-lg mb-8 text-blue-100">
                  Junte-se a centenas de professores que já vivenciaram experiências únicas
                </p>
                <div className="space-y-4 md:space-y-0 md:space-x-4 md:flex md:justify-center">
                  <Link 
                    href="/sobre"
                    className="inline-block bg-white text-blue-600 hover:bg-blue-50 font-semibold px-8 py-3 rounded-full transition duration-300 min-w-[160px]"
                  >
                    Saiba mais
                  </Link>
                  <Link 
                    href="/destinos"
                    className="inline-block bg-blue-800 hover:bg-blue-900 text-white font-semibold px-8 py-3 rounded-full transition duration-300 border-2 border-blue-800 hover:border-blue-900 min-w-[160px]"
                  >
                    Explore destinos
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
