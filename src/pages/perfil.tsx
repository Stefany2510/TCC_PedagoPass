import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import { useAuth } from '@/hooks/useAuth';

export default function Perfil() {
  const { user, isAuthenticated, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }
    
    if (user) {
      setFormData(prev => ({
        ...prev,
        name: user.name,
        email: user.email,
      }));
    }
  }, [user, isAuthenticated, router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (error) setError('');
    if (success) setSuccess('');
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('🔄 Iniciando salvamento do perfil...');
    console.log('📊 Dados do formulário:', formData);
    
    setLoading(true);
    setError('');
    setSuccess('');

    // Validação de senha
    if (formData.newPassword && formData.newPassword !== formData.confirmPassword) {
      setError('As senhas não coincidem');
      setLoading(false);
      return;
    }

    if (formData.newPassword && formData.newPassword.length < 6) {
      setError('A nova senha deve ter pelo menos 6 caracteres');
      setLoading(false);
      return;
    }

    try {
      console.log('✅ Validações passaram, chamando updateProfile...');
      
      const result = await updateProfile(
        formData.name,
        formData.email,
        formData.currentPassword || undefined,
        formData.newPassword || undefined
      );
      
      console.log('📊 Resultado da atualização:', result);
      
      if (result.success) {
        setSuccess(result.message);
        setIsEditing(false);
        setFormData(prev => ({
          ...prev,
          currentPassword: '',
          newPassword: '',
          confirmPassword: '',
        }));
      } else {
        setError(result.message);
      }
    } catch (err) {
      console.log('❌ Erro capturado:', err);
      setError('Erro ao atualizar perfil. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setError('');
    setSuccess('');
    if (user) {
      setFormData(prev => ({
        ...prev,
        name: user.name,
        email: user.email,
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      }));
    }
  };

  if (!user) {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-8">
              <div className="flex items-center space-x-4">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center">
                  <span className="text-3xl font-bold text-blue-600">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="text-white">
                  <h1 className="text-2xl font-bold">{user.name}</h1>
                  <p className="text-blue-100">{user.email}</p>
                  <p className="text-blue-200 text-sm mt-1">
                    Membro desde {new Date().toLocaleDateString('pt-BR')}
                  </p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="px-6 py-8">
              {error && (
                <div className="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                  {error}
                </div>
              )}
              
              {success && (
                <div className="mb-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                  {success}
                </div>
              )}

              {!isEditing ? (
                // View Mode
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">
                      Informações do Perfil
                    </h2>
                    
                    <div className="grid grid-cols-1 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Nome Completo
                        </label>
                        <div className="p-3 bg-gray-50 rounded-md border">
                          {user.name}
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Email
                        </label>
                        <div className="p-3 bg-gray-50 rounded-md border">
                          {user.email}
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 flex space-x-4">
                      <button
                        onClick={() => setIsEditing(true)}
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                      >
                        Editar Perfil
                      </button>
                    </div>
                  </div>

                  {/* Statistics Section */}
                  <div className="border-t pt-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Suas Estatísticas
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-blue-50 p-4 rounded-lg text-center">
                        <div className="text-2xl font-bold text-blue-600">0</div>
                        <div className="text-sm text-gray-600">Viagens Realizadas</div>
                      </div>
                      <div className="bg-green-50 p-4 rounded-lg text-center">
                        <div className="text-2xl font-bold text-green-600">0</div>
                        <div className="text-sm text-gray-600">Destinos Favoritados</div>
                      </div>
                      <div className="bg-purple-50 p-4 rounded-lg text-center">
                        <div className="text-2xl font-bold text-purple-600">0</div>
                        <div className="text-sm text-gray-600">Avaliações Feitas</div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                // Edit Mode
                <form onSubmit={handleSaveProfile} className="space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">
                      Editar Perfil
                    </h2>
                    
                    <div className="grid grid-cols-1 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                          Nome Completo
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          disabled={loading}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                          Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          disabled={loading}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Password Change Section */}
                  <div className="border-t pt-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Alterar Senha (Opcional)
                    </h3>
                    
                    <div className="grid grid-cols-1 gap-6">
                      <div>
                        <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">
                          Senha Atual
                        </label>
                        <input
                          type="password"
                          id="currentPassword"
                          name="currentPassword"
                          value={formData.currentPassword}
                          onChange={handleInputChange}
                          disabled={loading}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                          Nova Senha
                        </label>
                        <input
                          type="password"
                          id="newPassword"
                          name="newPassword"
                          value={formData.newPassword}
                          onChange={handleInputChange}
                          disabled={loading}
                          minLength={6}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                        />
                        <p className="mt-1 text-xs text-gray-500">Mínimo de 6 caracteres</p>
                      </div>
                      
                      <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                          Confirmar Nova Senha
                        </label>
                        <input
                          type="password"
                          id="confirmPassword"
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                          disabled={loading}
                          minLength={6}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-4 pt-6 border-t">
                    <button
                      type="submit"
                      disabled={loading}
                      className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center"
                    >
                      {loading ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Salvando...
                        </>
                      ) : (
                        'Salvar Alterações'
                      )}
                    </button>
                    
                    <button
                      type="button"
                      onClick={handleCancel}
                      disabled={loading}
                      className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 transition-colors duration-200 disabled:opacity-50"
                    >
                      Cancelar
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
