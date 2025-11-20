import React, { useEffect, useState } from 'react';
import { List, X } from 'lucide-react';

interface TocItem {
    id: string;
    text: string;
    level: number;
}

interface TableOfContentsProps {
    content: string;
}

export const TableOfContents: React.FC<TableOfContentsProps> = ({ content }) => {
    const [tocItems, setTocItems] = useState<TocItem[]>([]);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        // Esperar a que el contenido se renderice en el DOM
        const extractHeadings = () => {
            const articleContent = document.getElementById('article-content');
            if (!articleContent) return;

            // Extraer todos los encabezados (h2, h3, h4)
            const headings = articleContent.querySelectorAll('h2, h3, h4');
            const items: TocItem[] = [];

            headings.forEach((heading, index) => {
                const text = heading.textContent || '';
                const level = parseInt(heading.tagName.charAt(1));

                // Generar un ID único basado en el texto
                const id = `toc-${text
                    .toLowerCase()
                    .normalize('NFD')
                    .replace(/[\u0300-\u036f]/g, '') // Eliminar acentos
                    .replace(/[^\w\s-]/g, '')
                    .replace(/\s+/g, '-')
                    .substring(0, 50)}-${index}`;

                // Añadir el ID al encabezado
                heading.id = id;

                items.push({ id, text, level });
            });

            setTocItems(items);
        };

        // Ejecutar después de un pequeño delay para asegurar que el DOM esté listo
        const timer = setTimeout(extractHeadings, 100);

        return () => clearTimeout(timer);
    }, [content]);

    const handleItemClick = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            setIsOpen(false);
        }
    };

    // Si no hay items, no mostrar nada
    if (tocItems.length === 0) {
        return null;
    }

    return (
        <>
            {/* Botón flotante */}
            <button
                onClick={() => setIsOpen(true)}
                className="fixed top-20 left-4 z-40 bg-indigo-600 dark:bg-indigo-500 text-white p-3 rounded-full shadow-lg hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-all duration-200 hover:scale-110"
                aria-label="Abrir tabla de contenidos"
                title="Tabla de contenidos"
            >
                <List className="h-5 w-5" />
            </button>

            {/* Diálogo modal */}
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-start justify-start p-4 bg-black bg-opacity-50 backdrop-blur-sm">
                    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-2xl max-w-md w-full mt-16 ml-4 max-h-[80vh] overflow-hidden flex flex-col animate-fade-in transition-colors duration-300">
                        {/* Header */}
                        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-slate-700">
                            <h2 className="text-lg font-bold text-gray-900 dark:text-white">Tabla de Contenidos</h2>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors"
                                aria-label="Cerrar"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        {/* Lista de contenidos */}
                        <nav className="overflow-y-auto p-4 flex-1">
                            <ul className="space-y-2">
                                {tocItems.map((item) => (
                                    <li
                                        key={item.id}
                                        style={{ paddingLeft: `${(item.level - 2) * 1}rem` }}
                                    >
                                        <button
                                            onClick={() => handleItemClick(item.id)}
                                            className="text-left w-full text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 px-3 py-2 rounded-md transition-colors text-sm"
                                        >
                                            {item.text}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </div>
                </div>
            )}
        </>
    );
};
