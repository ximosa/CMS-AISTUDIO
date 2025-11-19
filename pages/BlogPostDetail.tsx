import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { BlogPost } from '../types';
import { Calendar, ArrowLeft, Loader2, AlertTriangle } from 'lucide-react';

export const BlogPostDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('posts')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;
        setPost(data);
      } catch (err: any) {
        console.error('Error fetching post:', err);
        setError('No se pudo cargar el artículo. Es posible que haya sido eliminado.');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-slate-50">
        <Loader2 className="h-10 w-10 text-indigo-600 animate-spin" />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-slate-50 py-12 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="bg-red-50 border border-red-200 rounded-lg p-8 inline-block mb-6">
             <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
             <h2 className="text-2xl font-bold text-gray-900 mb-2">Error</h2>
             <p className="text-gray-600">{error || 'Artículo no encontrado'}</p>
          </div>
          <div>
            <Link to="/blog" className="text-indigo-600 font-semibold hover:text-indigo-800 flex items-center justify-center">
              <ArrowLeft className="mr-2 h-5 w-5" /> Volver al Blog
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/blog" className="inline-flex items-center text-gray-600 hover:text-indigo-600 mb-8 transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" /> Volver al listado
        </Link>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {post.image_url && (
            <div className="w-full h-64 md:h-96 overflow-hidden">
              <img 
                src={post.image_url} 
                alt={post.title} 
                className="w-full h-full object-cover"
              />
            </div>
          )}
          
          <div className="p-8 md:p-12">
            <div className="flex items-center text-sm text-indigo-600 font-medium mb-4">
              <Calendar className="h-4 w-4 mr-2" />
              {new Date(post.created_at || '').toLocaleDateString('es-ES', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </div>

            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {post.title}
            </h1>

            <div className="text-xl text-gray-500 mb-8 border-l-4 border-indigo-500 pl-4 italic">
              {post.summary}
            </div>

            <div className="prose prose-lg prose-indigo max-w-none text-gray-700 whitespace-pre-wrap leading-relaxed">
              {post.content}
            </div>
          </div>
        </div>
      </article>
    </div>
  );
};