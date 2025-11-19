import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { BlogPost } from '../types';
import { Calendar, ArrowRight, Loader2, Edit, Trash2, AlertTriangle } from 'lucide-react';

export const Blog: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPosts();
    checkUser();
  }, []);

  const checkUser = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    setIsAdmin(!!session);
  };

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setPosts(data || []);
    } catch (err: any) {
      console.error('Error fetching posts:', err);
      setError('No se pudieron cargar los artículos.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number, e: React.MouseEvent) => {
    e.preventDefault(); // Prevenir navegación del Link
    if (!window.confirm('¿Estás seguro de eliminar este artículo?')) return;

    try {
      const { error } = await supabase.from('posts').delete().eq('id', id);
      if (error) throw error;
      
      // Actualizar lista local
      setPosts(posts.filter(post => post.id !== id));
    } catch (error: any) {
      alert('Error al eliminar: ' + error.message);
    }
  };

  const handleEditRedirect = (id: number, e: React.MouseEvent) => {
    e.preventDefault(); // Prevenir navegación del Link
    navigate('/admin', { state: { editId: id } });
  };

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Blog & Noticias</h1>
          <p className="text-xl text-gray-600">
            Últimas tendencias en desarrollo web, tecnología y diseño.
          </p>
          {isAdmin && (
            <div className="mt-4 p-2 bg-indigo-100 text-indigo-800 inline-block rounded-lg text-sm font-medium">
              Modo Administrador Activo: Puedes editar y eliminar contenido.
            </div>
          )}
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-10 w-10 text-indigo-600 animate-spin" />
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative text-center">
            {error}
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center text-gray-500 py-12">
            <p className="text-xl">No hay artículos publicados aún.</p>
            {isAdmin && (
               <Link to="/admin" className="text-indigo-600 hover:underline mt-2 inline-block">Crear el primero</Link>
            )}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <div key={post.id} className="relative group h-full">
                {/* Admin Controls Overlay */}
                {isAdmin && (
                  <div className="absolute top-3 right-3 z-20 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 p-1.5 rounded-lg shadow-sm backdrop-blur-sm">
                    <button 
                      onClick={(e) => post.id && handleEditRedirect(post.id, e)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                      title="Editar Artículo"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={(e) => post.id && handleDelete(post.id, e)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
                      title="Eliminar Artículo"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                )}

                <Link to={`/blog/${post.slug || post.id}`} className="block h-full">
                  <article className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow flex flex-col h-full border border-gray-100">
                    {post.image_url && (
                      <div className="h-48 w-full overflow-hidden bg-gray-100">
                        <img 
                          src={post.image_url} 
                          alt={post.title} 
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="flex items-center text-sm text-gray-500 mb-3">
                        <Calendar className="h-4 w-4 mr-2" />
                        {new Date(post.created_at || '').toLocaleDateString('es-ES', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </div>
                      <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-indigo-600 transition-colors">
                        {post.title}
                      </h2>
                      <p className="text-gray-600 mb-4 line-clamp-3 flex-1">
                        {post.summary}
                      </p>
                      <div className="text-indigo-600 font-semibold flex items-center mt-auto">
                        Leer más <ArrowRight className="ml-1 h-4 w-4" />
                      </div>
                    </div>
                  </article>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};