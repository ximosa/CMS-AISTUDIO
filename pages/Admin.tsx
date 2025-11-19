import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { BlogPost } from '../types';
import { PlusCircle, AlertCircle, CheckCircle, Image as ImageIcon, Edit, Trash2, RotateCcw, LogOut, X } from 'lucide-react';
import { RichTextEditor } from '../components/RichTextEditor';
import { CloudinaryUploadWidget } from '../components/CloudinaryUploadWidget';

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
      const { data, error } = await supabase.from('posts').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      setExistingPosts(data || []);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setListLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const handleContentChange = (newContent: string) => {
    setPost({ ...post, content: newContent });
  };

  const handleImageSuccess = async (url: string) => {
    // Actualizar estado local
    setPost({ ...post, image_url: url });
    // Guardar en historial de galería
    await supabase.from('media_library').insert([{ url }]);
  };

  const handleRemoveImage = () => {
    setPost({ ...post, image_url: '' });
  };

  const handleEdit = (postToEdit: BlogPost) => {
    setPost({ ...postToEdit });
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
    if (!window.confirm('¿Eliminar este artículo?')) return;
    try {
      const { error } = await supabase.from('posts').delete().eq('id', id);
      if (error) throw error;
      fetchPosts();
    } catch (error: any) {
      alert(`Error: ${error.message}`);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setMessage('');

    try {
      if (isEditing && selectedId) {
        const { error } = await supabase.from('posts').update(post).eq('id', selectedId);
        if (error) throw error;
        setMessage('Artículo actualizado.');
      } else {
        const { error } = await supabase.from('posts').insert([post]);
        if (error) throw error;
        setMessage('Artículo publicado.');
      }
      setStatus('success');
      setPost({ title: '', summary: '', content: '', image_url: '' });
      setIsEditing(false);
      setSelectedId(null);
      fetchPosts();
    } catch (error: any) {
      setStatus('error');
      setMessage(`Error: ${error.message}`);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Panel de Administración</h1>
            <p className="text-gray-500">Hola, {userEmail}</p>
          </div>
          <button 
            onClick={handleLogout}
            className="mt-4 md:mt-0 flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 shadow-sm"
          >
            <LogOut className="w-4 h-4 mr-2" /> Salir
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Editor Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
              <div className={`px-8 py-6 ${isEditing ? 'bg-amber-600' : 'bg-indigo-900'}`}>
                <h2 className="text-2xl font-bold text-white flex items-center">
                  {isEditing ? <><Edit className="mr-3" /> Editar</> : <><PlusCircle className="mr-3" /> Nuevo Artículo</>}
                </h2>
              </div>

              <div className="p-8">
                {status === 'success' && <div className="mb-6 bg-green-50 border-l-4 border-green-500 p-4 text-green-700 flex"><CheckCircle className="mr-2"/> {message}</div>}
                {status === 'error' && <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 text-red-700 flex"><AlertCircle className="mr-2"/> {message}</div>}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Título</label>
                    <input
                      type="text" name="title" value={post.title} onChange={handleChange} required
                      className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500 outline-none bg-white text-gray-900"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Resumen</label>
                    <input
                      type="text" name="summary" value={post.summary} onChange={handleChange} required
                      className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500 outline-none bg-white text-gray-900"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                      <ImageIcon className="w-4 h-4 mr-1" /> Imagen Destacada
                    </label>
                    
                    {!post.image_url ? (
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center bg-gray-50">
                        <CloudinaryUploadWidget 
                          onUpload={handleImageSuccess}
                          className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 flex items-center"
                          buttonText="Subir Imagen Destacada"
                        />
                        <p className="text-xs text-gray-500 mt-2">O pega una URL abajo</p>
                      </div>
                    ) : (
                      <div className="relative rounded-lg overflow-hidden border border-gray-200 group">
                        <img src={post.image_url} alt="Preview" className="w-full h-48 object-cover"/>
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all flex items-center justify-center">
                          <button type="button" onClick={handleRemoveImage} className="opacity-0 group-hover:opacity-100 bg-red-600 text-white px-4 py-2 rounded-full flex items-center">
                            <X className="w-4 h-4 mr-2" /> Eliminar
                          </button>
                        </div>
                      </div>
                    )}
                    
                    <div className="mt-2">
                      <input
                        type="url" name="image_url" value={post.image_url} onChange={handleChange}
                        className="w-full px-4 py-2 text-sm border rounded-md bg-white text-gray-600"
                        placeholder="URL manual (opcional)"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Contenido</label>
                    <RichTextEditor value={post.content} onChange={handleContentChange} />
                  </div>

                  <div className="pt-4 flex gap-4">
                    <button
                      type="submit" disabled={status === 'loading'}
                      className={`flex-1 text-white font-bold py-3 px-4 rounded-md shadow-md transition-colors ${isEditing ? 'bg-amber-600 hover:bg-amber-700' : 'bg-indigo-600 hover:bg-indigo-700'}`}
                    >
                      {status === 'loading' ? 'Guardando...' : (isEditing ? 'Actualizar' : 'Publicar')}
                    </button>
                    
                    {isEditing && (
                      <button type="button" onClick={handleCancelEdit} className="px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-md hover:bg-gray-300 flex items-center">
                        <RotateCcw className="w-4 h-4 mr-2" /> Cancelar
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* Sidebar List */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden sticky top-24 border border-gray-200">
              <div className="bg-gray-100 px-6 py-4 border-b border-gray-200">
                <h2 className="font-bold text-gray-700">Publicados ({existingPosts.length})</h2>
              </div>
              <div className="max-h-[800px] overflow-y-auto bg-white">
                {listLoading ? <p className="p-4 text-center">Cargando...</p> : 
                  existingPosts.length === 0 ? <p className="p-4 text-center">Vacío.</p> : 
                  <div className="divide-y divide-gray-100">
                    {existingPosts.map((p) => (
                      <div key={p.id} className={`p-4 hover:bg-gray-50 ${selectedId === p.id ? 'bg-indigo-50 border-l-4 border-indigo-500' : ''}`}>
                        <h3 className="font-semibold text-gray-800 text-sm mb-1 line-clamp-2">{p.title}</h3>
                        <div className="flex space-x-2 mt-2">
                          <button onClick={() => handleEdit(p)} className="p-1.5 text-xs bg-blue-50 text-blue-600 rounded flex items-center"><Edit className="w-3 h-3 mr-1"/> Editar</button>
                          <button onClick={() => p.id && handleDelete(p.id)} className="p-1.5 text-xs bg-red-50 text-red-600 rounded flex items-center"><Trash2 className="w-3 h-3 mr-1"/> Borrar</button>
                        </div>
                      </div>
                    ))}
                  </div>
                }
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};