import { Destino } from '@/types/destino';
import Layout from '@/components/Layout';

// Mock data - será substituído pela integração com o backend
const destinosMock: Destino[] = [
  {
    id: '1',
    nome: 'Museus de São Paulo',
    descricao: 'Visita guiada aos principais museus de São Paulo',
    imagem: 'https://via.placeholder.com/400x300',
    preco: 1200,
    dataInicio: '2024-01-15',
    dataFim: '2024-01-20',
    vagas: 20,
    categoria: 'Cultural',
    localizacao: 'São Paulo, SP'
  },
  {
    id: '2',
    nome: 'Congresso de Educação RJ',
    descricao: 'Participação no maior congresso de educação do Rio',
    imagem: 'https://via.placeholder.com/400x300',
    preco: 1500,
    dataInicio: '2024-02-10',
    dataFim: '2024-02-15',
    vagas: 30,
    categoria: 'Congresso',
    localizacao: 'Rio de Janeiro, RJ'
  },
  // Mais destinos mock aqui...
];

export default function Destinos() {
  return (
    <Layout>
      <div className="bg-gray-100 min-h-screen py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Destinos Disponíveis
            </h1>
            <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
              Explore nossas viagens educacionais e encontre a perfect match para seu desenvolvimento profissional
            </p>
          </div>

          <div className="mt-12 grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {destinosMock.map((destino) => (
              <div key={destino.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <img
                  className="w-full h-48 object-cover"
                  src={destino.imagem}
                  alt={destino.nome}
                />
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900">{destino.nome}</h2>
                  <p className="mt-2 text-gray-600">{destino.descricao}</p>
                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-blue-600 font-bold">
                      R$ {destino.preco.toLocaleString()}
                    </span>
                    <span className="text-gray-500">
                      {destino.vagas} vagas
                    </span>
                  </div>
                  <a
                    href={`/destinos/${destino.id}`}
                    className="mt-4 w-full block text-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                  >
                    Ver detalhes
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
