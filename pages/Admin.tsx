import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { BlogPost } from '../types';
import { PlusCircle, AlertCircle, CheckCircle, Image as ImageIcon, Edit, Trash2, RotateCcw, LogOut, X, ExternalLink, Link as LinkIcon } from 'lucide-react';
import { RichTextEditor } from '../components/RichTextEditor';
import { CloudinaryUploadWidget } from '../components/CloudinaryUploadWidget';

export const Admin: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [existingPosts, setExistingPosts] = useState<BlogPost[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  
  const [post, setPost] = useState<BlogPost>({
    title: '',
    slug: '',
    summary: '',
    content: '',
    image_url: ''
  });
  
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [listLoading, setListLoading] = useState(false);

  useEffect(() => {
    fetchPosts();
    getUser();
  }, []);

  useEffect(() => {
    if (location.state && (location.state as any).editId && existingPosts.length > 0) {
      const editId = (location.state as any).editId;
      const postToEdit = existingPosts.find(p => p.id === editId);
      
      if (postToEdit) {
        handleEdit(postToEdit);
        window.history.replaceState({}, document.title);
      }
    }
  }, [existingPosts, location.state]);

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

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '') // Eliminar caracteres especiales
      .replace(/[\s_-]+/g, '-') // Reemplazar espacios con guiones
      .replace(/^-+|-+$/g, ''); // Eliminar guiones al principio y final
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    setPost(prev => {
      const newData = { ...prev, [name]: value };
      
      // Si cambiamos el título y no estamos en modo edición (o si decidimos que siempre se actualice el slug)
      // Para seguridad UX, actualizamos el slug si es un artículo nuevo O si el slug estaba vacío
      if (name === 'title' && (!isEditing || !prev.slug)) {
        newData.slug = generateSlug(value);
      }
      
      return newData;
    });
  };

  const handleContentChange = (newContent: string) => {
    setPost({
      ...post,
      content: newContent
    });
  };

  const handleImageUploaded = (url: string) => {
    setPost({ ...post, image_url: url });
  };

  const handleRemoveImage = () => {
    setPost({ ...post, image_url: '' });
  };

  const handleEdit = (postToEdit: BlogPost) => {
    setPost({
      title: postToEdit.title,
      slug: postToEdit.slug || generateSlug(postToEdit.title), // Fallback si no tiene slug
      summary: postToEdit.summary || '',
      content: postToEdit.content,
      image_url: postToEdit.image_url || ''
    });
    setSelectedId(postToEdit.id || null);
    setIsEditing(true);
    setMessage('');
    setStatus('idle');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setPost({ title: '', slug: '', summary: '', content: '', image_url: '' });
    setIsEditing(false);
    setSelectedId(null);
    setMessage('');
    setStatus('idle');
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('¿Estás seguro de que quieres eliminar este artículo? Esta acción no se puede deshacer.')) return;

    try {
      const { error } = await supabase
        .from('posts')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      await fetchPosts(); 
      setMessage('Artículo eliminado correctamente');
      setStatus('success');
      
      if (selectedId === id) {
        handleCancelEdit();
      }
      
    } catch (error: any) {
      console.error("Error eliminando:", error);
      alert(`No se pudo eliminar: ${error.message}`);
      setStatus('error');
      setMessage('Error al eliminar.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setMessage('');

    // Validación básica de slug
    const finalSlug = post.slug || generateSlug(post.title);
    const payload = { ...post, slug: finalSlug };

    try {
      if (isEditing && selectedId) {
        const { error } = await supabase
          .from('posts')
          .update(payload)
          .eq('id', selectedId);

        if (error) throw error;
        setMessage('Artículo actualizado correctamente.');
      } else {
        const { error } = await supabase
          .from('posts')
          .insert([payload]);

        if (error) throw error;
        setMessage('Artículo publicado correctamente.');
      }

      setStatus('success');
      setPost({ title: '', slug: '', summary: '', content: '', image_url: '' });
      setIsEditing(false);
      setSelectedId(null);
      fetchPosts(); 
    } catch (error: any) {
      console.error('Error saving post:', error);
      setStatus('error');
      // Detectar error de slug duplicado
      if (error.message.includes('duplicate key')) {
        setMessage('Error: El "Slug" (URL) ya existe. Por favor cámbialo.');
      } else {
        setMessage(`Error: ${error.message || 'Verifica los permisos en Supabase'}`);
      }
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Panel de Administración</h1>
            <p className="text-gray-500">Bienvenido, {userEmail}</p>
          </div>
          
          <div className="flex gap-3">
             <a 
               href="https://console.cloudinary.com/app/c-31236b1e7b763f924293c5c43f79ff/assets/media_library/search?q=&view_mode=mosaic" 
               target="_blank" 
               rel="noopener noreferrer"
               className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md text-indigo-600 hover:bg-indigo-50 transition-colors shadow-sm font-medium"
             >
               <ExternalLink className="w-4 h-4 mr-2" /> Gestión Galería Externa
             </a>

            <button 
              onClick={handleLogout}
              className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors shadow-sm"
            >
              <LogOut className="w-4 h-4 mr-2" /> Cerrar Sesión
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
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
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none bg-white text-gray-900"
                      placeholder="Ej: 5 Tendencias de Diseño Web para 2025"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                       <LinkIcon className="w-3 h-3 mr-1"/> Slug (URL Amigable)
                    </label>
                    <input
                      type="text"
                      name="slug"
                      value={post.slug}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none bg-gray-50 text-gray-600 font-mono text-sm"
                      placeholder="ej: 5-tendencias-diseno-web"
                    />
                    <p className="text-xs text-gray-500 mt-1">Se genera automáticamente del título, pero puedes editarlo. Debe ser único.</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Resumen (Intro)</label>
                    <input
                      type="text"
                      name="summary"
                      value={post.summary}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none bg-white text-gray-900"
                      placeholder="Breve descripción que aparecerá en la tarjeta del blog"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                      <ImageIcon className="w-4 h-4 mr-1" /> Imagen Destacada
                    </label>
                    
                    {!post.image_url ? (
                      <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center">
                        <CloudinaryUploadWidget onUploadSuccess={handleImageUploaded} />
                      </div>
                    ) : (
                      <div className="relative rounded-lg overflow-hidden border border-gray-200 group">
                        <img 
                          src={post.image_url} 
                          alt="Preview" 
                          className="w-full h-48 object-cover"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all flex items-center justify-center">
                          <button
                            type="button"
                            onClick={handleRemoveImage}
                            className="opacity-0 group-hover:opacity-100 bg-red-600 text-white px-4 py-2 rounded-full font-medium transform scale-95 group-hover:scale-100 transition-all flex items-center"
                          >
                            <X className="w-4 h-4 mr-2" /> Eliminar Imagen
                          </button>
                        </div>
                      </div>
                    )}
                    
                    <div className="mt-2">
                      <input
                        type="url"
                        name="image_url"
                        value={post.image_url}
                        onChange={handleChange}
                        className="w-full px-4 py-2 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-indigo-500 outline-none bg-white text-gray-600"
                        placeholder="O pega una URL de imagen aquí..."
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Contenido del Artículo</label>
                    <RichTextEditor value={post.content} onChange={handleContentChange} />
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

          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden sticky top-24 border border-gray-200">
              <div className="bg-gray-100 px-6 py-4 border-b border-gray-200">
                <h2 className="font-bold text-gray-700">Artículos Publicados ({existingPosts.length})</h2>
              </div>
              
              <div className="max-h-[800px] overflow-y-auto bg-white">
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