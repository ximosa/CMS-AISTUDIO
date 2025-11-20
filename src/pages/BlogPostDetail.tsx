import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { BlogPost } from '../types';
import { Calendar, ArrowLeft, Loader2, AlertTriangle, Edit, Trash2 } from 'lucide-react';
import { TableOfContents } from '../components/TableOfContents';
import { Comments } from '../components/Comments';

export const BlogPostDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) return;

      try {
        setLoading(true);
        // Buscamos por slug en lugar de ID
        const { data, error } = await supabase
          .from('posts')
          .select('*')
          .eq('slug', slug)
          .single();

        if (error) throw error;
        setPost(data);
      } catch (err: any) {
        console.error('Error fetching post:', err);
        setError('No se pudo cargar el artículo. Es posible que haya sido eliminado o la URL sea incorrecta.');
      } finally {
        setLoading(false);
      }
    };

    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsAdmin(!!session);
    };

    fetchPost();
    checkUser();
  }, [slug]);

  const handleDelete = async () => {
    if (!window.confirm('¿Estás TOTALMENTE seguro de borrar este artículo?')) return;
    if (!post?.id) return;

    try {
      const { error } = await supabase.from('posts').delete().eq('id', post.id);
      if (error) throw error;
      navigate('/blog'); // Volver al listado tras borrar
    } catch (error: any) {
      alert('Error al eliminar: ' + error.message);
    }
  };

  const handleEdit = () => {
    if (post?.id) {
      navigate('/admin', { state: { editId: post.id } });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
        <Loader2 className="h-10 w-10 text-indigo-600 dark:text-indigo-400 animate-spin" />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-12 px-4 transition-colors duration-300">
        <div className="max-w-3xl mx-auto text-center">
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-8 inline-block mb-6">
            <AlertTriangle className="h-12 w-12 text-red-500 dark:text-red-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Error</h2>
            <p className="text-gray-600 dark:text-gray-300">{error || 'Artículo no encontrado'}</p>
          </div>
          <div>
            <Link to="/blog" className="text-indigo-600 dark:text-indigo-400 font-semibold hover:text-indigo-800 dark:hover:text-indigo-300 flex items-center justify-center">
              <ArrowLeft className="mr-2 h-5 w-5" /> Volver al Blog
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.summary,
    "image": post.image_url || "https://ximosa.github.io/CMS-AISTUDIO/images/joaquin.png", // Fallback image
    "author": {
      "@type": "Person",
      "name": "Joaquín"
    },
    "publisher": {
      "@type": "Person",
      "name": "Joaquín"
    },
    "datePublished": post.created_at,
    "dateModified": post.created_at // Assuming no separate modified date
  };

  return (
    <>
      <title>{`${post.title} | Blog de Joaquín`}</title>
      <meta name="description" content={post.summary} />
      <script type="application/ld+json">{JSON.stringify(structuredData)}</script>

      <div className="bg-slate-50 dark:bg-slate-900 min-h-screen py-12 transition-colors duration-300">
        <TableOfContents content={post.content} />
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <Link to="/blog" className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              <ArrowLeft className="mr-2 h-4 w-4" /> Volver al listado
            </Link>

            {isAdmin && (
              <div className="flex gap-2">
                <button
                  onClick={handleEdit}
                  className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium shadow-sm"
                >
                  <Edit className="w-4 h-4 mr-2" /> Editar
                </button>
                <button
                  onClick={handleDelete}
                  className="flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors text-sm font-medium shadow-sm"
                >
                  <Trash2 className="w-4 h-4 mr-2" /> Eliminar
                </button>
              </div>
            )}
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg overflow-hidden transition-colors duration-300">
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
              <div className="flex items-center text-sm text-indigo-600 dark:text-indigo-400 font-medium mb-4">
                <Calendar className="h-4 w-4 mr-2" />
                {new Date(post.created_at || '').toLocaleDateString('es-ES', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>

              <h1 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                {post.title}
              </h1>

              <div className="text-xl text-gray-500 dark:text-gray-400 mb-8 border-l-4 border-indigo-500 pl-4 italic">
                {post.summary}
              </div>

              <div
                id="article-content"
                className="prose prose-lg prose-indigo dark:prose-invert max-w-none text-gray-700 dark:text-gray-300"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </div>
          </div>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Comments postId={post.id!} />
          </div>
        </article>
      </div>
    </>
  );
};