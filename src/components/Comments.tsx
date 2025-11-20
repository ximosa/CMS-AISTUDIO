import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { Comment } from '../types';
import { MessageCircle, Send, User, Reply } from 'lucide-react';

interface CommentsProps {
    postId: number;
}

export const Comments: React.FC<CommentsProps> = ({ postId }) => {
    const [comments, setComments] = useState<Comment[]>([]);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        author_name: '',
        author_email: '',
        content: ''
    });
    const [replyingTo, setReplyingTo] = useState<number | null>(null);
    const [submitting, setSubmitting] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    useEffect(() => {
        fetchComments();
    }, [postId]);

    const fetchComments = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('comments')
                .select('*')
                .eq('post_id', postId)
                .eq('approved', true)
                .order('created_at', { ascending: true });

            if (error) throw error;

            // Organizar comentarios en estructura jerárquica
            const organized = organizeComments(data || []);
            setComments(organized);
        } catch (error) {
            console.error('Error fetching comments:', error);
        } finally {
            setLoading(false);
        }
    };

    const organizeComments = (flatComments: Comment[]): Comment[] => {
        const commentMap = new Map<number, Comment>();
        const rootComments: Comment[] = [];

        // Crear mapa de comentarios
        flatComments.forEach(comment => {
            commentMap.set(comment.id, { ...comment, replies: [] });
        });

        // Organizar en jerarquía
        flatComments.forEach(comment => {
            const commentWithReplies = commentMap.get(comment.id)!;
            if (comment.parent_id === null) {
                rootComments.push(commentWithReplies);
            } else {
                const parent = commentMap.get(comment.parent_id);
                if (parent) {
                    parent.replies!.push(commentWithReplies);
                }
            }
        });

        return rootComments;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.author_name || !formData.author_email || !formData.content) {
            setMessage({ type: 'error', text: 'Por favor completa todos los campos' });
            return;
        }

        try {
            setSubmitting(true);
            const { error } = await supabase.from('comments').insert([{
                post_id: postId,
                parent_id: replyingTo,
                author_name: formData.author_name,
                author_email: formData.author_email,
                content: formData.content,
                approved: false
            }]);

            if (error) throw error;

            setMessage({
                type: 'success',
                text: '¡Comentario enviado! Será visible una vez aprobado por el administrador.'
            });
            setFormData({ author_name: '', author_email: '', content: '' });
            setReplyingTo(null);

            setTimeout(() => setMessage(null), 5000);
        } catch (error) {
            console.error('Error submitting comment:', error);
            setMessage({ type: 'error', text: 'Error al enviar el comentario. Inténtalo de nuevo.' });
        } finally {
            setSubmitting(false);
        }
    };

    const renderComment = (comment: Comment, depth: number = 0) => {
        const initials = comment.author_name
            .split(' ')
            .map(n => n[0])
            .join('')
            .toUpperCase()
            .substring(0, 2);

        return (
            <div key={comment.id} className={`${depth > 0 ? 'ml-8 mt-4' : 'mt-6'}`}>
                <div className="flex gap-4">
                    {/* Avatar */}
                    <div className="flex-shrink-0">
                        <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-semibold">
                            {initials}
                        </div>
                    </div>

                    {/* Contenido */}
                    <div className="flex-1">
                        <div className="bg-gray-50 rounded-lg p-4">
                            <div className="flex items-center justify-between mb-2">
                                <h4 className="font-semibold text-gray-900">{comment.author_name}</h4>
                                <span className="text-sm text-gray-500">
                                    {new Date(comment.created_at).toLocaleDateString('es-ES', {
                                        day: 'numeric',
                                        month: 'short',
                                        year: 'numeric'
                                    })}
                                </span>
                            </div>
                            <p className="text-gray-700 whitespace-pre-wrap">{comment.content}</p>
                        </div>

                        {/* Botón responder */}
                        <button
                            onClick={() => setReplyingTo(comment.id)}
                            className="mt-2 text-sm text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
                        >
                            <Reply className="w-4 h-4" />
                            Responder
                        </button>

                        {/* Formulario de respuesta */}
                        {replyingTo === comment.id && (
                            <div className="mt-4 bg-indigo-50 p-4 rounded-lg">
                                <p className="text-sm text-gray-700 mb-3">
                                    Respondiendo a <strong>{comment.author_name}</strong>
                                </p>
                                {renderCommentForm()}
                            </div>
                        )}

                        {/* Respuestas anidadas */}
                        {comment.replies && comment.replies.length > 0 && (
                            <div className="mt-4">
                                {comment.replies.map(reply => renderComment(reply, depth + 1))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    };

    const renderCommentForm = () => (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Nombre *
                    </label>
                    <input
                        type="text"
                        value={formData.author_name}
                        onChange={(e) => setFormData({ ...formData, author_name: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email *
                    </label>
                    <input
                        type="email"
                        value={formData.author_email}
                        onChange={(e) => setFormData({ ...formData, author_email: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        required
                    />
                </div>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Comentario *
                </label>
                <textarea
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    required
                />
            </div>
            <div className="flex gap-2">
                <button
                    type="submit"
                    disabled={submitting}
                    className="flex items-center gap-2 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50"
                >
                    <Send className="w-4 h-4" />
                    {submitting ? 'Enviando...' : 'Enviar comentario'}
                </button>
                {replyingTo && (
                    <button
                        type="button"
                        onClick={() => setReplyingTo(null)}
                        className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                    >
                        Cancelar
                    </button>
                )}
            </div>
        </form>
    );

    const approvedCount = comments.reduce((count, comment) => {
        return count + 1 + (comment.replies?.length || 0);
    }, 0);

    return (
        <div className="mt-12 border-t border-gray-200 pt-8">
            <div className="flex items-center gap-2 mb-6">
                <MessageCircle className="w-6 h-6 text-indigo-600" />
                <h2 className="text-2xl font-bold text-gray-900">
                    Comentarios ({approvedCount})
                </h2>
            </div>

            {/* Mensaje de éxito/error */}
            {message && (
                <div className={`mb-6 p-4 rounded-lg ${message.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
                    }`}>
                    {message.text}
                </div>
            )}

            {/* Formulario principal */}
            {!replyingTo && (
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Deja un comentario</h3>
                    {renderCommentForm()}
                </div>
            )}

            {/* Lista de comentarios */}
            {loading ? (
                <div className="text-center py-8 text-gray-500">Cargando comentarios...</div>
            ) : comments.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                    Sé el primero en comentar
                </div>
            ) : (
                <div className="space-y-6">
                    {comments.map(comment => renderComment(comment))}
                </div>
            )}
        </div>
    );
};
