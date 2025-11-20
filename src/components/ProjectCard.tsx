import React from 'react';
import { ExternalLink, Github } from 'lucide-react';
import { Project } from '../types';

interface ProjectCardProps {
    project: Project;
    onClick: () => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick }) => {
    return (
        <div
            className="group relative bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-slate-700 hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2"
            onClick={onClick}
        >
            {/* Imagen con overlay */}
            <div className="relative h-64 overflow-hidden">
                <img
                    src={project.mainImage}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                {project.featured && (
                    <div className="absolute top-4 right-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                        ⭐ Destacado
                    </div>
                )}
            </div>

            {/* Contenido */}
            <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 rounded-md text-xs font-semibold uppercase">
                        {project.category}
                    </span>
                    {project.client && (
                        <span className="text-xs text-gray-500 dark:text-gray-400">• {project.client}</span>
                    )}
                </div>

                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {project.title}
                </h3>

                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                    {project.shortDescription}
                </p>

                {/* Tecnologías */}
                <div className="flex flex-wrap gap-2">
                    {project.technologies.slice(0, 4).map((tech, index) => (
                        <span
                            key={index}
                            className="px-2 py-1 bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 rounded text-xs font-medium"
                        >
                            {tech}
                        </span>
                    ))}
                    {project.technologies.length > 4 && (
                        <span className="px-2 py-1 bg-gray-100 dark:bg-slate-700 text-gray-500 dark:text-gray-400 rounded text-xs font-medium">
                            +{project.technologies.length - 4}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};
