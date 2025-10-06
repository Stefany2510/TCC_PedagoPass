import Layout from '@/components/Layout';
import Head from 'next/head';
import { useState } from 'react';
import Link from 'next/link';

interface Community {
  id: string;
  name: string;
  description: string;
  members: number;
  posts: number;
  category: string;
  image: string;
  isJoined: boolean;
}

// Comunidades mockadas
const mockCommunities: Community[] = [
  {
    id: '1',
    name: 'Professores de História',
    description: 'Compartilhe experiências de viagens históricas e educacionais. Museus, sítios arqueológicos e patrimônios mundiais.',
    members: 342,
    posts: 127,
    category: 'Educação',
    image: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=400',
    isJoined: true
  },
  {
    id: '2',
    name: 'Viagens Culturais Europa',
    description: 'Roteiros e dicas para professores interessados em explorar a rica cultura europeia.',
    members: 456,
    posts: 203,
    category: 'Destinos',
    image: 'https://images.pexels.com/photos/2225442/pexels-photo-2225442.jpeg?auto=compress&cs=tinysrgb&w=400',
    isJoined: false
  },
  {
    id: '3',
    name: 'Intercâmbio Acadêmico',
    description: 'Experiências e oportunidades de intercâmbio para educadores. Programas, bolsas e parcerias.',
    members: 234,
    posts: 89,
    category: 'Intercâmbio',
    image: 'https://images.pexels.com/photos/267507/pexels-photo-267507.jpeg?auto=compress&cs=tinysrgb&w=400',
    isJoined: true
  },
  {
    id: '4',
    name: 'Professores de Ciências',
    description: 'Viagens educacionais para laboratórios, planetários, jardins botânicos e centros de pesquisa.',
    members: 289,
    posts: 156,
    category: 'Educação',
    image: 'https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg?auto=compress&cs=tinysrgb&w=400',
    isJoined: false
  },
  {
    id: '5',
    name: 'Turismo Sustentável',
    description: 'Práticas de turismo responsável e sustentável para educadores conscientes.',
    members: 178,
    posts: 67,
    category: 'Sustentabilidade',
    image: 'https://images.pexels.com/photos/346529/pexels-photo-346529.jpeg?auto=compress&cs=tinysrgb&w=400',
    isJoined: false
  },
  {
    id: '6',
    name: 'Línguas e Culturas',
    description: 'Imersão cultural e linguística para professores de idiomas e literatura.',
    members: 367,
    posts: 234,
    category: 'Idiomas',
    image: 'https://images.pexels.com/photos/256417/pexels-photo-256417.jpeg?auto=compress&cs=tinysrgb&w=400',
    isJoined: true
  }
];

export default function Comunidades() {
  const [communities, setCommunities] = useState<Community[]>(mockCommunities);
  const [selectedCategory, setSelectedCategory] = useState<string>('Todas');

  const categories = ['Todas', 'Educação', 'Destinos', 'Intercâmbio', 'Sustentabilidade', 'Idiomas'];

  const filteredCommunities = selectedCategory === 'Todas' 
    ? communities 
    : communities.filter(community => community.category === selectedCategory);

  const handleJoinCommunity = (communityId: string) => {
    setCommunities(communities.map(community => 
      community.id === communityId 
        ? { 
            ...community, 
            isJoined: !community.isJoined,
            members: community.isJoined ? community.members - 1 : community.members + 1
          }
        : community
    ));
  };

  const joinedCommunities = communities.filter(c => c.isJoined);

  return (
    <>
      <Head>
        <title>Comunidades - PedagoPass</title>
        <meta name="description" content="Participe de comunidades temáticas de professores viajantes" />
      </Head>

      <Layout>
        <div className="min-h-screen bg-gray-50 py-8">
          <div className="max-w-6xl mx-auto px-4">
            
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Comunidades</h1>
              <p className="text-gray-600">Conecte-se com outros educadores e compartilhe experiências por interesse</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow-md p-6 text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">{joinedCommunities.length}</div>
                <div className="text-gray-600">Comunidades que Participo</div>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6 text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">
                  {joinedCommunities.reduce((sum, c) => sum + c.posts, 0)}
                </div>
                <div className="text-gray-600">Posts das Minhas Comunidades</div>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6 text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">+25</div>
                <div className="text-gray-600">Pontos Este Mês</div>
              </div>
            </div>

            {/* Filtros */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h3 className="text-lg font-semibold mb-4">Filtrar por Categoria</h3>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition duration-300 ${
                      selectedCategory === category
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Minhas Comunidades */}
            {joinedCommunities.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Minhas Comunidades</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                  {joinedCommunities.map((community) => (
                    <div key={community.id} className="bg-white rounded-lg shadow-md overflow-hidden border-2 border-blue-200">
                      <img 
                        src={community.image} 
                        alt={community.name}
                        className="w-full h-40 object-cover"
                      />
                      <div className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-semibold text-gray-900">{community.name}</h3>
                          <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded">
                            {community.category}
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{community.description}</p>
                        <div className="flex justify-between items-center text-sm text-gray-500 mb-3">
                          <span>👥 {community.members} membros</span>
                          <span>📝 {community.posts} posts</span>
                        </div>
                        <Link 
                          href={`/feed?community=${community.id}`}
                          className="w-full bg-blue-600 hover:bg-blue-700 text-white text-center py-2 px-4 rounded-md transition duration-300 block"
                        >
                          Ver Posts
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Todas as Comunidades */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {selectedCategory === 'Todas' ? 'Todas as Comunidades' : `Comunidades - ${selectedCategory}`}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCommunities.map((community) => (
                  <div key={community.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300">
                    <img 
                      src={community.image} 
                      alt={community.name}
                      className="w-full h-40 object-cover"
                    />
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-gray-900">{community.name}</h3>
                        <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2 py-1 rounded">
                          {community.category}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm mb-3">{community.description}</p>
                      <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                        <span>👥 {community.members} membros</span>
                        <span>📝 {community.posts} posts</span>
                      </div>
                      <button
                        onClick={() => handleJoinCommunity(community.id)}
                        className={`w-full py-2 px-4 rounded-md font-medium transition duration-300 ${
                          community.isJoined
                            ? 'bg-green-600 hover:bg-green-700 text-white'
                            : 'bg-blue-600 hover:bg-blue-700 text-white'
                        }`}
                      >
                        {community.isJoined ? '✓ Participando' : '+ Participar'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Criar Comunidade */}
            <div className="mt-12 bg-blue-50 rounded-lg p-8 text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Não encontrou sua comunidade ideal?</h3>
              <p className="text-gray-600 mb-6">Crie uma nova comunidade e conecte-se com professores que compartilham seus interesses específicos.</p>
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300">
                🚀 Criar Nova Comunidade
              </button>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}