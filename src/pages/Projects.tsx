import React, { useState } from 'react';
import { Briefcase, Filter } from 'lucide-react';
import { Project } from '../types';
import { ProjectCard } from '../components/ProjectCard';
import { ProjectModal } from '../components/ProjectModal';

// Datos de ejemplo - Reemplaza con tus proyectos reales
const SAMPLE_PROJECTS: Project[] = [
    {
        id: 1,
        title: "E-commerce Moderno",
        slug: "ecommerce-moderno",
        shortDescription: "Tienda online completa con carrito de compras, pagos integrados y panel de administración.",
        fullDescription: "Desarrollo de una plataforma de e-commerce completa desde cero, incluyendo catálogo de productos dinámico, sistema de carrito de compras con persistencia, integración con múltiples pasarelas de pago, y un panel de administración robusto para gestionar inventario, pedidos y clientes.\n\nEl proyecto incluye optimización SEO avanzada, diseño responsivo adaptado a todos los dispositivos, sistema de búsqueda y filtros inteligentes, gestión de cupones y descuentos, y notificaciones por email automatizadas. Se implementó un sistema de reseñas y valoraciones de productos, así como recomendaciones personalizadas basadas en el historial de navegación.\n\nLa arquitectura del proyecto está diseñada para escalar, con caché de datos, optimización de imágenes automática, y un sistema de CDN para mejorar los tiempos de carga globalmente.\n\n*Por motivos de privacidad y protección de datos del cliente, no se pueden compartir enlaces directos al proyecto.*",
        mainImage: "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&h=600&fit=crop",
        galleryImages: [
            "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop"
        ],
        technologies: ["React", "Node.js", "MongoDB", "Stripe", "Tailwind CSS", "Redis"],
        category: "E-commerce",
        client: "Confidencial",
        completedDate: "2024-01-15",
        featured: true
    },
    {
        id: 2,
        title: "App Móvil de Fitness",
        slug: "app-fitness",
        shortDescription: "Aplicación móvil para seguimiento de entrenamientos y nutrición con planes personalizados.",
        fullDescription: "Aplicación móvil nativa para iOS y Android que permite a los usuarios realizar seguimiento completo de sus entrenamientos, registrar su alimentación diaria, y recibir planes personalizados basados en sus objetivos específicos de fitness.\n\nLa aplicación incluye integración con dispositivos wearables (Apple Watch, Fitbit, Garmin), gráficos detallados de progreso con estadísticas avanzadas, biblioteca de más de 500 ejercicios con videos demostrativos, y un sistema de gamificación con logros y desafíos para mantener la motivación.\n\nSe implementó una comunidad social donde los usuarios pueden compartir sus logros, participar en retos grupales, y conectar con entrenadores certificados. El sistema de nutrición incluye escaneo de códigos de barras, base de datos de alimentos, y cálculo automático de macronutrientes.\n\nLa arquitectura utiliza sincronización offline-first para que los usuarios puedan registrar sus datos sin conexión, con sincronización automática cuando recuperan la conectividad.\n\n*Por motivos de privacidad y protección de datos del cliente, no se pueden compartir enlaces directos al proyecto.*",
        mainImage: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&h=600&fit=crop",
        technologies: ["React Native", "Firebase", "TypeScript", "Redux", "HealthKit"],
        category: "Mobile",
        client: "Confidencial",
        completedDate: "2023-11-20",
        featured: true
    },
    {
        id: 3,
        title: "Dashboard Analítico",
        slug: "dashboard-analitico",
        shortDescription: "Panel de control con visualización de datos en tiempo real y reportes personalizados.",
        fullDescription: "Dashboard empresarial para visualización de métricas clave de negocio en tiempo real, diseñado para ejecutivos y analistas de datos. Incluye gráficos interactivos con drill-down capabilities, filtros avanzados multidimensionales, exportación de reportes en múltiples formatos (PDF, Excel, CSV), y sistema de alertas configurables.\n\nLa plataforma está optimizada para manejar grandes volúmenes de datos con actualizaciones en tiempo real mediante WebSockets, permitiendo monitorear KPIs críticos sin latencia. Se implementaron dashboards personalizables donde cada usuario puede crear sus propias vistas y widgets.\n\nEl sistema incluye análisis predictivo con machine learning para forecasting de ventas, detección de anomalías automática, y recomendaciones basadas en datos históricos. También cuenta con un sistema de permisos granular para controlar el acceso a información sensible.\n\nSe integró con múltiples fuentes de datos (CRM, ERP, Google Analytics, redes sociales) mediante APIs y conectores personalizados, consolidando toda la información en un único punto de acceso.\n\n*Por motivos de privacidad y protección de datos del cliente, no se pueden compartir enlaces directos al proyecto.*",
        mainImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
        technologies: ["Vue.js", "D3.js", "Python", "PostgreSQL", "WebSockets", "TensorFlow"],
        category: "Web",
        client: "Confidencial",
        completedDate: "2024-02-10"
    },
    {
        id: 4,
        title: "Plataforma Educativa",
        slug: "plataforma-educativa",
        shortDescription: "Sistema de gestión de aprendizaje con cursos online, evaluaciones y certificados.",
        fullDescription: "Plataforma completa de e-learning que permite crear y gestionar cursos online, realizar evaluaciones interactivas, emitir certificados digitales verificables, y hacer seguimiento detallado del progreso de los estudiantes.\n\nEl sistema incluye un editor de contenido rico que permite a los instructores crear lecciones multimedia con videos, documentos, presentaciones, y elementos interactivos. Se implementó un sistema de videoconferencias integrado para clases en vivo, con funcionalidades de pizarra virtual, compartir pantalla, y grabación de sesiones.\n\nLos estudiantes tienen acceso a foros de discusión moderados, sistema de mensajería privada con instructores, calendario de eventos y entregas, y un espacio personal para organizar sus materiales de estudio. El sistema de evaluaciones soporta múltiples tipos de preguntas (opción múltiple, verdadero/falso, respuesta corta, ensayos) con calificación automática y manual.\n\nSe integró un sistema de gamificación con puntos, badges, y tablas de clasificación para aumentar el engagement. La plataforma también incluye herramientas de análisis para instructores, permitiéndoles identificar estudiantes en riesgo y áreas de mejora en el contenido.\n\nLa arquitectura está diseñada para escalar a miles de usuarios concurrentes, con CDN para distribución de contenido multimedia y optimización de streaming de video.\n\n*Por motivos de privacidad y protección de datos del cliente, no se pueden compartir enlaces directos al proyecto.*",
        mainImage: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&h=600&fit=crop",
        technologies: ["Next.js", "Prisma", "PostgreSQL", "AWS", "Zoom API", "FFmpeg"],
        category: "Web",
        client: "Confidencial",
        completedDate: "2023-09-15"
    },
    {
        id: 5,
        title: "Sistema de Reservas",
        slug: "sistema-reservas",
        shortDescription: "Plataforma para gestión de reservas de restaurantes con calendario inteligente.",
        fullDescription: "Sistema de reservas online para restaurantes que optimiza la gestión de mesas mediante algoritmos inteligentes, permite reservas en tiempo real con confirmación instantánea, envía recordatorios automáticos por SMS y email, y gestiona listas de espera de forma eficiente.\n\nLa plataforma incluye un panel de administración completo para el restaurante donde pueden gestionar la disponibilidad de mesas, configurar horarios especiales, bloquear fechas, y ver estadísticas de ocupación. El sistema aprende de patrones históricos para sugerir optimizaciones en la distribución de mesas.\n\nLos clientes pueden hacer reservas desde la web o app móvil, ver el menú del restaurante, especificar preferencias dietéticas y alergias, y acumular puntos de fidelidad. Se implementó integración con Google Calendar para sincronizar reservas automáticamente.\n\nEl sistema incluye funcionalidades avanzadas como gestión de eventos privados, reservas recurrentes, depósitos online para reservas de grupos grandes, y sistema de reseñas post-visita. También cuenta con un módulo de CRM para gestionar la relación con clientes VIP.\n\n*Por motivos de privacidad y protección de datos del cliente, no se pueden compartir enlaces directos al proyecto.*",
        mainImage: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop",
        technologies: ["React", "Express", "MySQL", "Twilio", "Google Calendar API", "Stripe"],
        category: "Web",
        client: "Confidencial",
        completedDate: "2024-03-01"
    },
    {
        id: 6,
        title: "Portfolio Interactivo",
        slug: "portfolio-interactivo",
        shortDescription: "Sitio web portfolio con animaciones 3D y experiencia inmersiva.",
        fullDescription: "Portfolio personal con diseño innovador que incluye animaciones 3D inmersivas, transiciones fluidas entre secciones, y una experiencia de usuario única que combina creatividad con funcionalidad.\n\nEl sitio utiliza WebGL y Three.js para crear escenas 3D interactivas que responden al movimiento del mouse y scroll del usuario, creando una experiencia memorable. Se implementaron micro-interacciones cuidadosamente diseñadas en cada elemento de la interfaz.\n\nEl portfolio está optimizado para rendimiento máximo con lazy loading de assets, code splitting, y técnicas avanzadas de optimización. Incluye modo oscuro y claro con transición suave, sistema de internacionalización para múltiples idiomas, y está completamente optimizado para SEO.\n\nSe prestó especial atención a la accesibilidad, asegurando que todas las animaciones respeten las preferencias de movimiento reducido del usuario, y que la navegación sea completamente funcional con teclado.\n\n*Por motivos de privacidad y protección de datos del cliente, no se pueden compartir enlaces directos al proyecto.*",
        mainImage: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=600&fit=crop",
        technologies: ["Three.js", "React", "GSAP", "Tailwind CSS", "WebGL"],
        category: "Design",
        client: "Confidencial",
        completedDate: "2023-12-05"
    }
];

const CATEGORIES = ["Todos", "Web", "Mobile", "E-commerce", "Design"];

export const Projects: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState("Todos");
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const filteredProjects = selectedCategory === "Todos"
        ? SAMPLE_PROJECTS
        : SAMPLE_PROJECTS.filter(p => p.category === selectedCategory);

    const handleProjectClick = (project: Project) => {
        setSelectedProject(project);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setTimeout(() => setSelectedProject(null), 300);
    };

    return (
        <div className="bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800 min-h-screen transition-colors duration-300">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-6">
                            <Briefcase className="w-5 h-5" />
                            <span className="font-semibold">Portfolio</span>
                        </div>
                        <h1 className="text-5xl md:text-6xl font-bold mb-6">
                            Proyectos Destacados
                        </h1>
                        <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
                            Explora una selección de mis trabajos más recientes y descubre cómo puedo ayudarte a llevar tu proyecto al siguiente nivel
                        </p>
                    </div>
                </div>
            </div>

            {/* Filtros */}
            <div className="sticky top-16 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-gray-200 dark:border-slate-700 shadow-sm transition-colors duration-300">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex items-center gap-4 overflow-x-auto">
                        <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300 font-semibold whitespace-nowrap">
                            <Filter className="w-5 h-5" />
                            <span>Filtrar:</span>
                        </div>
                        <div className="flex gap-2">
                            {CATEGORIES.map((category) => (
                                <button
                                    key={category}
                                    onClick={() => setSelectedCategory(category)}
                                    className={`px-6 py-2 rounded-full font-semibold transition-all whitespace-nowrap ${selectedCategory === category
                                            ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg scale-105'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-slate-800 dark:text-gray-300 dark:hover:bg-slate-700'
                                        }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Grid de Proyectos */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {filteredProjects.length === 0 ? (
                    <div className="text-center py-20">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 dark:bg-slate-800 rounded-full mb-4">
                            <Briefcase className="w-10 h-10 text-gray-400" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                            No hay proyectos en esta categoría
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                            Intenta seleccionar otra categoría para ver más proyectos
                        </p>
                    </div>
                ) : (
                    <>
                        <div className="text-center mb-12">
                            <p className="text-lg text-gray-600 dark:text-gray-300">
                                Mostrando <span className="font-bold text-indigo-600 dark:text-indigo-400">{filteredProjects.length}</span> proyecto{filteredProjects.length !== 1 ? 's' : ''}
                                {selectedCategory !== "Todos" && ` en ${selectedCategory}`}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredProjects.map((project) => (
                                <ProjectCard
                                    key={project.id}
                                    project={project}
                                    onClick={() => handleProjectClick(project)}
                                />
                            ))}
                        </div>
                    </>
                )}
            </div>

            {/* Modal */}
            <ProjectModal
                project={selectedProject}
                isOpen={isModalOpen}
                onClose={handleCloseModal}
            />
        </div>
    );
};
