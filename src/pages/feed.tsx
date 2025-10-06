import Layout from '@/components/Layout';
import Head from 'next/head';
import { useState } from 'react';

interface Post {
  id: string;
  author: string;
  title: string;
  content: string;
  image?: string;
  location: string;
  date: string;
  likes: number;
  comments: number;
}

// Posts mockados para demonstração
const mockPosts: Post[] = [
  {
    id: '1',
    author: 'Prof. Ana Maria',
    title: 'Viagem incrível para Paris!',
    content: 'Acabei de voltar de uma viagem educacional amazing para Paris. Visitamos o Louvre e foi uma experiência transformadora para minha prática pedagógica!',
    image: 'https://images.pexels.com/photos/161853/eiffel-tower-paris-france-tower-161853.jpeg?auto=compress&cs=tinysrgb&w=400',
    location: 'Paris, França',
    date: '2 dias atrás',
    likes: 24,
    comments: 8
  },
  {
    id: '2',
    author: 'Prof. Carlos Silva',
    title: 'Museus de História em Roma',
    content: 'Compartilhando algumas dicas de museus imperdíveis em Roma para professores de História. A experiência no Coliseu foi inesquecível!',
    image: 'https://images.pexels.com/photos/2225442/pexels-photo-2225442.jpeg?auto=compress&cs=tinysrgb&w=400',
    location: 'Roma, Itália',
    date: '5 dias atrás',
    likes: 31,
    comments: 12
  },
  {
    id: '3',
    author: 'Profa. Mariana Costa',
    title: 'Intercâmbio Cultural no Japão',
    content: 'Que experiência única! Participar do programa de intercâmbio no Japão abriu minha mente para novas metodologias de ensino.',
    location: 'Tóquio, Japão',
    date: '1 semana atrás',
    likes: 45,
    comments: 15
  }
];

export default function Feed() {
  const [posts, setPosts] = useState<Post[]>(mockPosts);
  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    location: ''
  });
  const [showCreateForm, setShowCreateForm] = useState(false);

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newPost.title || !newPost.content || !newPost.location) return;

    const post: Post = {
      id: Date.now().toString(),
      author: 'Você',
      title: newPost.title,
      content: newPost.content,
      location: newPost.location,
      date: 'Agora',
      likes: 0,
      comments: 0
    };

    setPosts([post, ...posts]);
    setNewPost({ title: '', content: '', location: '' });
    setShowCreateForm(false);
  };

  const handleLike = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, likes: post.likes + 1 }
        : post
    ));
  };

  return (
    <>
      <Head>
        <title>Feed - PedagoPass</title>
        <meta name="description" content="Compartilhe suas experiências de viagem educacional com outros professores" />
      </Head>

      <Layout>
        <div className="min-h-screen bg-gray-50 py-8">
          <div className="max-w-2xl mx-auto px-4">
            
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Feed de Experiências</h1>
              <p className="text-gray-600">Compartilhe e descubra experiências de viagem de outros educadores</p>
            </div>

            {/* Botão Criar Post */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <button
                onClick={() => setShowCreateForm(!showCreateForm)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-300"
              >
                ✨ Compartilhar Nova Experiência
              </button>
            </div>

            {/* Formulário Criar Post */}
            {showCreateForm && (
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h3 className="text-lg font-semibold mb-4">Compartilhar Experiência</h3>
                <form onSubmit={handleCreatePost}>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Título da Experiência
                    </label>
                    <input
                      type="text"
                      value={newPost.title}
                      onChange={(e) => setNewPost({...newPost, title: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Ex: Viagem incrível para Paris!"
                      required
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Localização
                    </label>
                    <input
                      type="text"
                      value={newPost.location}
                      onChange={(e) => setNewPost({...newPost, location: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Ex: Paris, França"
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Conte sua experiência
                    </label>
                    <textarea
                      value={newPost.content}
                      onChange={(e) => setNewPost({...newPost, content: e.target.value})}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Compartilhe detalhes sobre sua viagem educacional..."
                      required
                    />
                  </div>

                  <div className="flex gap-2">
                    <button
                      type="submit"
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition duration-300"
                    >
                      Publicar
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowCreateForm(false)}
                      className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-md transition duration-300"
                    >
                      Cancelar
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Timeline de Posts */}
            <div className="space-y-6">
              {posts.map((post) => (
                <div key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  {/* Header do Post */}
                  <div className="p-6 pb-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-900">{post.author}</h3>
                        <p className="text-sm text-gray-500">{post.date} • {post.location}</p>
                      </div>
                      <span className="text-blue-600 text-sm font-medium">+5 pontos</span>
                    </div>
                  </div>

                  {/* Conteúdo */}
                  <div className="px-6 pb-4">
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">{post.title}</h4>
                    <p className="text-gray-700 leading-relaxed">{post.content}</p>
                  </div>

                  {/* Imagem */}
                  {post.image && (
                    <div className="px-6 pb-4">
                      <img 
                        src={post.image} 
                        alt={post.title}
                        className="w-full h-64 object-cover rounded-lg"
                      />
                    </div>
                  )}

                  {/* Ações */}
                  <div className="px-6 py-4 bg-gray-50 flex items-center justify-between">
                    <div className="flex gap-4">
                      <button
                        onClick={() => handleLike(post.id)}
                        className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition duration-300"
                      >
                        <span>❤️</span>
                        <span>{post.likes}</span>
                      </button>
                      <button className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition duration-300">
                        <span>💬</span>
                        <span>{post.comments}</span>
                      </button>
                      <button className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition duration-300">
                        <span>🔗</span>
                        <span>Compartilhar</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-8 text-center">
              <p className="text-gray-600 mb-4">Quer compartilhar mais experiências?</p>
              <button
                onClick={() => setShowCreateForm(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-300"
              >
                Criar Novo Post
              </button>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}