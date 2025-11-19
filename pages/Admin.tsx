import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { BlogPost } from '../types';
import { PlusCircle, AlertCircle, CheckCircle, Image as ImageIcon } from 'lucide-react';

export const Admin: React.FC = () => {
  const [post, setPost] = useState<BlogPost>({
    title: '',
    summary: '',
    content: '',
    image_url: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setPost({
      ...post,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setMessage('');

    try {
      // Nota: Con la clave 'anon', necesitas tener habilitado RLS o permitir inserts públicos en Supabase
      const { error } = await supabase
        .from('posts')
        .insert([post]);

      if (error) throw error;

      setStatus('success');
      setMessage('Artículo publicado correctamente.');
      setPost({ title: '', summary: '', content: '', image_url: '' }); // Reset form
    } catch (error: any) {
      console.error('Error creating post:', error);
      setStatus('error');
      setMessage(`Error al crear el post: ${error.message || 'Verifica los permisos en Supabase'}`);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-indigo-900 px-8 py-6">
            <h1 className="text-2xl font-bold text-white flex items-center">
              <PlusCircle className="mr-3 h-6 w-6" />
              Crear Nuevo Artículo
            </h1>
            <p className="text-indigo-200 mt-1">Panel de administración del blog</p>
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
                <p className="text-xs text-gray-500 mt-1">Usa una URL pública de imagen.</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Contenido</label>
                <textarea
                  name="content"
                  value={post.content}
                  onChange={handleChange}
                  required
                  rows={8}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none"
                  placeholder="Escribe el contenido completo del artículo aquí..."
                ></textarea>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-md hover:bg-indigo-700 transition-colors shadow-md disabled:opacity-50 flex justify-center items-center"
                >
                  {status === 'loading' ? 'Publicando...' : 'Publicar Artículo'}
                </button>
              </div>
            </form>
          </div>
        </div>
        
        <div className="mt-8 text-center">
            <p className="text-gray-500 text-sm">
                Nota: Asegúrate de que la tabla 'posts' exista en tu proyecto Supabase y tenga permisos de escritura (RLS) configurados para la clave anónima si deseas probarlo directamente.
            </p>
        </div>
      </div>
    </div>
  );
};