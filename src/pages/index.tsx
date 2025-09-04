import Layout from '@/components/Layout';
import { useEffect, useState } from 'react';
import { Destino } from '@/types/destino';
import { getAllDestinos } from '@/services/destinoService';
import Link from 'next/link';

export default function Home() {
  const [destinos, setDestinos] = useState<Destino[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDestinos = async () => {
      try {
        const data = await getAllDestinos();
        setDestinos(data);
      } catch (err) {
        setError('Falha ao carregar os destinos');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDestinos();
  }, []);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-8">
            PedagoPass – Viagens para Professores
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-12">
            Descubra experiências educacionais únicas e enriquecedoras para sua jornada pedagógica
          </p>
        </div>

        {/* Seção de benefícios */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Viagens Educacionais</h3>
            <p className="text-gray-600">Explore destinos que combinam aprendizado e descoberta</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Formação Continuada</h3>
            <p className="text-gray-600">Participe de workshops e cursos durante suas viagens</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Networking</h3>
            <p className="text-gray-600">Conecte-se com educadores de todo o Brasil</p>
          </div>
        </div>

        {/* Seção de destinos */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center mb-8">Próximos Destinos</h2>
          
          {loading && (
            <div className="text-center py-8">
              <p className="text-gray-600">Carregando destinos...</p>
            </div>
          )}

          {error && (
            <div className="text-center py-8">
              <p className="text-red-600">{error}</p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {destinos.map((destino) => (
              <Link 
                href={`/destinos/${destino.id}`} 
                key={destino.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105"
              >
                <div className="relative h-48">
                  <img
                    src={destino.imagem}
                    alt={destino.titulo}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{destino.titulo}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">{destino.descricao}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-blue-600 font-bold">
                      R$ {destino.preco.toLocaleString()}
                    </span>
                    <span className="text-gray-500 text-sm">
                      {new Date(destino.dataInicio).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
