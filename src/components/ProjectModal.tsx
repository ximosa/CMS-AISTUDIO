import React from 'react';
import { X, ExternalLink, Github, Calendar, User } from 'lucide-react';
import { Project } from '../types';

interface ProjectModalProps {
    project: Project | null;
    isOpen: boolean;
    onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, isOpen, onClose }) => {
    if (!isOpen || !project) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            {/* Overlay */}
            <div
                className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative min-h-screen flex items-center justify-center p-4">
                <div className="relative bg-white dark:bg-slate-900 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto transition-colors duration-300">
                    {/* Header con imagen */}
                    <div className="relative h-80 overflow-hidden rounded-t-2xl">
                        <img
                            src={project.mainImage}
                            alt={project.title}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                        {/* Botón cerrar */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 p-2 bg-white/90 hover:bg-white dark:bg-slate-800/90 dark:hover:bg-slate-800 rounded-full transition-colors shadow-lg"
                        >
                            <X className="w-6 h-6 text-gray-900 dark:text-white" />
                        </button>

                        {/* Título sobre la imagen */}
                        <div className="absolute bottom-0 left-0 right-0 p-8">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="px-3 py-1 bg-white/90 text-indigo-700 rounded-md text-sm font-bold uppercase">
                                    {project.category}
                                </span>
                                {project.featured && (
                                    <span className="px-3 py-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-md text-sm font-bold">
                                        ⭐ Destacado
                                    </span>
                                )}
                            </div>
                            <h2 className="text-4xl font-bold text-white mb-2">{project.title}</h2>
                            <p className="text-white/90 text-lg">{project.shortDescription}</p>
                        </div>
                    </div>

                    {/* Contenido */}
                    <div className="p-8">
                        {/* Metadata */}
                        <div className="flex flex-wrap gap-4 mb-6 pb-6 border-b border-gray-200 dark:border-slate-700">
                            {project.client && (
                                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                                    <User className="w-5 h-5" />
                                    <span className="font-medium">{project.client}</span>
                                </div>
                            )}
                            {project.completedDate && (
                                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                                    <Calendar className="w-5 h-5" />
                                    <span>{new Date(project.completedDate).toLocaleDateString('es-ES', { year: 'numeric', month: 'long' })}</span>
                                </div>
                            )}
                        </div>

                        {/* Descripción completa */}
                        <div className="mb-8">
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Sobre el proyecto</h3>
                            <div className="prose prose-lg max-w-none text-gray-700 dark:text-gray-300">
                                {project.fullDescription.split('\n').map((paragraph, index) => (
                                    <p key={index} className="mb-4">{paragraph}</p>
                                ))}
                            </div>
                        </div>

                        {/* Tecnologías */}
                        <div className="mb-8">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Tecnologías utilizadas</h3>
                            <div className="flex flex-wrap gap-2">
                                {project.technologies.map((tech, index) => (
                                    <span
                                        key={index}
                                        className="px-4 py-2 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/50 dark:to-purple-900/50 text-indigo-700 dark:text-indigo-300 rounded-lg text-sm font-semibold border border-indigo-200 dark:border-indigo-800"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Galería de imágenes (si existe) */}
                        {project.galleryImages && project.galleryImages.length > 0 && (
                            <div className="mb-8">
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Galería</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    {project.galleryImages.map((image, index) => (
                                        <img
                                            key={index}
                                            src={image}
                                            alt={`${project.title} - ${index + 1}`}
                                            className="w-full h-48 object-cover rounded-lg shadow-md hover:shadow-xl transition-shadow"
                                        />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
