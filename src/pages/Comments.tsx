import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CommentModeration } from '../components/CommentModeration';
import { ArrowLeft, LogOut } from 'lucide-react';
import { supabase } from '../supabaseClient';

export const Comments: React.FC = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate('/login');
    };

    return (
        <div className="bg-gray-50 min-h-screen py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => navigate('/admin')}
                            className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors shadow-sm"
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" /> Volver al Admin
                        </button>
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Moderación de Comentarios</h1>
                            <p className="text-gray-500">Gestiona los comentarios de tus artículos</p>
                        </div>
                    </div>

                    <button
                        onClick={handleLogout}
                        className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors shadow-sm"
                    >
                        <LogOut className="w-4 h-4 mr-2" /> Cerrar Sesión
                    </button>
                </div>

                {/* Componente de moderación */}
                <CommentModeration />
            </div>
        </div>
    );
};
