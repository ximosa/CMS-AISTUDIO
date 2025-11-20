import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { Comment } from '../types';
import { MessageCircle, Check, Trash2, Filter, AlertCircle } from 'lucide-react';

type FilterType = 'all' | 'pending' | 'approved';

export const CommentModeration: React.FC = () => {
    const [comments, setComments] = useState<Comment[]>([]);
    const [posts, setPosts] = useState<Map<number, string>>(new Map());
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<FilterType>('pending');

    useEffect(() => {
        fetchData();
    }, [filter]);

    const fetchData = async () => {
        try {
            setLoading(true);

            // Fetch posts para mostrar títulos
            const { data: postsData } = await supabase
                .from('posts')
                .select('id, title');

            const postsMap = new Map<number, string>();
            postsData?.forEach(post => postsMap.set(post.id, post.title));
            setPosts(postsMap);

            // Fetch comments según filtro
            let query = supabase
                .from('comments')
                .select('*')
                .order('created_at', { ascending: false });

            if (filter === 'pending') {
                query = query.eq('approved', false);
            } else if (filter === 'approved') {
                query = query.eq('approved', true);
            }

            const { data, error } = await query;
            if (error) throw error;

            setComments(data || []);
        } catch (error) {
            console.error('Error fetching comments:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleApprove = async (id: number) => {
        try {
            const { error } = await supabase
                .from('comments')
                .update({ approved: true })
                .eq('id', id);

            if (error) throw error;
            fetchData();
        } catch (error) {
            console.error('Error approving comment:', error);
            alert('Error al aprobar el comentario');
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm('¿Estás seguro de eliminar este comentario?')) return;

        try {
            const { error } = await supabase
                .from('comments')
                .delete()
                .eq('id', id);

            if (error) throw error;
            fetchData();
        } catch (error) {
            console.error('Error deleting comment:', error);
            alert('Error al eliminar el comentario');
        }
    };

    const pendingCount = comments.filter(c => !c.approved).length;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <MessageCircle className="w-8 h-8 text-indigo-600" />
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">Moderación de Comentarios</h2>
                        <p className="text-sm text-gray-600">
                            {pendingCount > 0 && (
                                <span className="text-orange-600 font-semibold">
                                    {pendingCount} comentario{pendingCount !== 1 ? 's' : ''} pendiente{pendingCount !== 1 ? 's' : ''}
                                </span>
                            )}
                        </p>
                    </div>
                </div>

                {/* Filtros */}
                <div className="flex gap-2">
                    <button
                        onClick={() => setFilter('pending')}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${filter === 'pending'
                                ? 'bg-orange-600 text-white'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                    >
                        Pendientes
                    </button>
                    <button
                        onClick={() => setFilter('approved')}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${filter === 'approved'
                                ? 'bg-green-600 text-white'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                    >
                        Aprobados
                    </button>
                    <button
                        onClick={() => setFilter('all')}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${filter === 'all'
                                ? 'bg-indigo-600 text-white'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                    >
                        Todos
                    </button>
                </div>
            </div>

            {/* Lista de comentarios */}
            {loading ? (
                <div className="text-center py-12 text-gray-500">Cargando comentarios...</div>
            ) : comments.length === 0 ? (
                <div className="text-center py-12">
                    <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">No hay comentarios {filter !== 'all' && filter}</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {comments.map(comment => (
                        <div
                            key={comment.id}
                            className={`bg-white rounded-lg shadow-sm border-2 p-6 ${comment.approved ? 'border-green-200' : 'border-orange-200'
                                }`}
                        >
                            {/* Header del comentario */}
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <h3 className="font-semibold text-gray-900">{comment.author_name}</h3>
                                        <span
                                            className={`px-2 py-1 rounded-full text-xs font-medium ${comment.approved
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-orange-100 text-orange-800'
                                                }`}
                                        >
                                            {comment.approved ? 'Aprobado' : 'Pendiente'}
                                        </span>
                                        {comment.parent_id && (
                                            <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                Respuesta
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-sm text-gray-600">{comment.author_email}</p>
                                    <p className="text-sm text-gray-500">
                                        {new Date(comment.created_at).toLocaleString('es-ES', {
                                            day: 'numeric',
                                            month: 'long',
                                            year: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })}
                                    </p>
                                </div>

                                {/* Acciones */}
                                <div className="flex gap-2">
                                    {!comment.approved && (
                                        <button
                                            onClick={() => handleApprove(comment.id)}
                                            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                                            title="Aprobar comentario"
                                        >
                                            <Check className="w-4 h-4" />
                                            Aprobar
                                        </button>
                                    )}
                                    <button
                                        onClick={() => handleDelete(comment.id)}
                                        className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                                        title="Eliminar comentario"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                        Eliminar
                                    </button>
                                </div>
                            </div>

                            {/* Artículo */}
                            <div className="mb-3 p-3 bg-gray-50 rounded-lg">
                                <p className="text-sm text-gray-600">
                                    <span className="font-medium">Artículo:</span>{' '}
                                    {posts.get(comment.post_id) || `ID: ${comment.post_id}`}
                                </p>
                            </div>

                            {/* Contenido del comentario */}
                            <div className="bg-gray-50 rounded-lg p-4">
                                <p className="text-gray-800 whitespace-pre-wrap">{comment.content}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
