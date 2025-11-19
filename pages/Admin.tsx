import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { BlogPost } from '../types';
import { PlusCircle, AlertCircle, CheckCircle, Image as ImageIcon, Edit, Trash2, RotateCcw, LogOut } from 'lucide-react';

export const Admin: React.FC = () => {
  const navigate = useNavigate();
  const [existingPosts, setExistingPosts] = useState<BlogPost[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  
  const [post, setPost] = useState<BlogPost>({
    title: '',
    summary: '',
    content: '',
    image_url: ''
  });
  
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [listLoading, setListLoading] = useState(false);

  // Cargar posts existentes y usuario al montar
  useEffect(() => {
    fetchPosts();
    getUser();
  }, []);

  const getUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) setUserEmail(user.email || 'Admin');
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  const fetchPosts = async () => {
    setListLoading(true);
    try {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setExistingPosts(data || []);
    } catch (error) {
      console.error("Error al cargar posts:", error);
    } finally {
      setListLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setPost({
      ...post,
      [e.target.name]: e.target.value
    });
  };

  const handleEdit = (postToEdit: BlogPost) => {
    setPost({
      title: postToEdit.title,
      summary: postToEdit.summary,
      content: postToEdit.content,
      image_url: postToEdit.image_url
    });
    setSelectedId(postToEdit.id || null);
    setIsEditing(true);
    setMessage('');
    setStatus('idle');
    window.scrollTo(0, 0);
  };

  const handleCancelEdit = () => {
    setPost({ title: '', summary: '', content: '', image_url: '' });
    setIsEditing(false);
    setSelectedId(null);
    setMessage('');
    setStatus('idle');
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('¿Estás seguro de que quieres eliminar este artículo?')) return;

    try {
      const { error } = await supabase.from('posts').delete().eq('id', id);
      if (error) throw error;
      
      fetchPosts(); // Recargar lista
    } catch (error: any) {
      alert(`Error al eliminar: ${error.message}`);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setMessage('');

    try {
      if (isEditing && selectedId) {
        // Actualizar
        const { error } = await supabase
          .from('posts')
          .update(post)
          .eq('id', selectedId);

        if (error) throw error;
        setMessage('Artículo actualizado correctamente.');
      } else {
        // Crear nuevo
        const { error } = await supabase
          .from('posts')
          .insert([post]);

        if (error) throw error;
        setMessage('Artículo publicado correctamente.');
      }

      setStatus('success');
      setPost({ title: '', summary: '', content: '', image_url: '' });
      setIsEditing(false);
      setSelectedId(null);
      fetchPosts(); // Recargar la lista
    } catch (error: any) {
      console.error('Error saving post:', error);
      setStatus('error');
      setMessage(`Error: ${error.message || 'Verifica los permisos en Supabase'}`);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Admin Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Panel de Administración</h1>
            <p className="text-gray-500">Bienvenido, {userEmail}</p>
          </div>
          <button 
            onClick={handleLogout}
            className="mt-4 md:mt-0 flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <LogOut className="w-4 h-4 mr-2" /> Cerrar Sesión
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Columna Izquierda: Formulario */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className={`px-8 py-6 ${isEditing ? 'bg-amber-600' : 'bg-indigo-900'} transition-colors`}>
                <h2 className="text-2xl font-bold text-white flex items-center">
                  {isEditing ? (
                    <>
                      <Edit className="mr-3 h-6 w-6" /> Editar Artículo
                    </>
                  ) : (
                    <>
                      <PlusCircle className="mr-3 h-6 w-6" /> Crear Nuevo Artículo
                    </>
                  )}
                </h2>
                <p className="text-indigo-100 mt-1 opacity-80">
                  {isEditing ? `Editando ID: ${selectedId}` : 'Publica nuevo contenido para el blog'}
                </p>
              </div>

              <div className="p-8">
                {status === 'success' && (
                  <div className="mb-6 bg-green-50 border-l-4 border-green-500 p-4 flex items-center">
                    <CheckCircle className="text-green-500 mr-3" />
                    <p className="text-green-700">{message}</p>
                  </div>
                )}
                
                {status === 'error' && (
                  <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 flex items-center">
                    <AlertCircle className="text-red-500 mr-3" />
                    <p className="text-red-700">{message}</p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Título</label>
                    <input
                      type="text"
                      name="title"
                      value={post.title}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none"
                      placeholder="Ej: 5 Tendencias de Diseño Web para 2025"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Resumen (Intro)</label>
                    <input
                      type="text"
                      name="summary"
                      value={post.summary}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none"
                      placeholder="Breve descripción que aparecerá en la tarjeta del blog"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                      <ImageIcon className="w-4 h-4 mr-1" /> URL de la Imagen
                    </label>
                    <input
                      type="url"
                      name="image_url"
                      value={post.image_url}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none"
                      placeholder="https://picsum.photos/800/400"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Contenido</label>
                    <textarea
                      name="content"
                      value={post.content}
                      onChange={handleChange}
                      required
                      rows={12}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none font-mono text-sm"
                      placeholder="Escribe el contenido completo del artículo aquí..."
                    ></textarea>
                  </div>

                  <div className="pt-4 flex gap-4">
                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className={`flex-1 text-white font-bold py-3 px-4 rounded-md shadow-md disabled:opacity-50 flex justify-center items-center transition-colors ${isEditing ? 'bg-amber-600 hover:bg-amber-700' : 'bg-indigo-600 hover:bg-indigo-700'}`}
                    >
                      {status === 'loading' ? 'Guardando...' : (isEditing ? 'Actualizar Artículo' : 'Publicar Artículo')}
                    </button>
                    
                    {isEditing && (
                      <button
                        type="button"
                        onClick={handleCancelEdit}
                        className="px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-md hover:bg-gray-300 transition-colors flex items-center"
                      >
                        <RotateCcw className="w-4 h-4 mr-2" /> Cancelar
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* Columna Derecha: Lista de Artículos */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden sticky top-24">
              <div className="bg-gray-100 px-6 py-4 border-b border-gray-200">
                <h2 className="font-bold text-gray-700">Artículos Publicados ({existingPosts.length})</h2>
              </div>
              
              <div className="max-h-[800px] overflow-y-auto">
                {listLoading ? (
                  <p className="p-4 text-center text-gray-500">Cargando...</p>
                ) : existingPosts.length === 0 ? (
                  <p className="p-4 text-center text-gray-500 text-sm">No hay artículos todavía.</p>
                ) : (
                  <div className="divide-y divide-gray-100">
                    {existingPosts.map((p) => (
                      <div key={p.id} className={`p-4 hover:bg-gray-50 transition-colors ${selectedId === p.id ? 'bg-indigo-50 border-l-4 border-indigo-500' : ''}`}>
                        <h3 className="font-semibold text-gray-800 text-sm mb-1 line-clamp-2">{p.title}</h3>
                        <p className="text-xs text-gray-500 mb-3">
                          {new Date(p.created_at || '').toLocaleDateString()}
                        </p>
                        
                        <div className="flex space-x-2">
                          <button 
                            onClick={() => handleEdit(p)}
                            className="p-1.5 text-xs font-medium text-blue-600 bg-blue-50 rounded hover:bg-blue-100 flex items-center transition-colors"
                          >
                            <Edit className="w-3 h-3 mr-1" /> Editar
                          </button>
                          <button 
                            onClick={() => p.id && handleDelete(p.id)}
                            className="p-1.5 text-xs font-medium text-red-600 bg-red-50 rounded hover:bg-red-100 flex items-center transition-colors"
                          >
                            <Trash2 className="w-3 h-3 mr-1" /> Eliminar
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
