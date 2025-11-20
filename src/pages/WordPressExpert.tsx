import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Zap, Shield, Layout, ArrowRight, Settings, Search, Smartphone } from 'lucide-react';

export const WordPressExpert: React.FC = () => {
    return (
        <>
            <title>Experto WordPress | Desarrollo, Optimización y Seguridad</title>
            <meta name="description" content="Servicios profesionales de WordPress: desarrollo a medida, optimización de velocidad (WPO), seguridad y mantenimiento. Lleva tu web al siguiente nivel." />

            <div className="bg-slate-50 dark:bg-slate-900 min-h-screen transition-colors duration-300">

                {/* Hero Section */}
                <section className="relative bg-gradient-to-br from-blue-900 to-indigo-900 text-white overflow-hidden">
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1600&h=900&fit=crop')] opacity-10 bg-cover bg-center"></div>
                    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 flex flex-col items-center text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/20 backdrop-blur-sm rounded-full border border-blue-400/30 mb-8">
                            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                            <span className="text-sm font-medium text-blue-100">Especialista WordPress Certificado</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
                            Tu Sitio WordPress, <br className="hidden md:block" />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Más Rápido, Seguro y Rentable</span>
                        </h1>
                        <p className="text-xl text-blue-100 mb-10 max-w-2xl leading-relaxed">
                            Deja de perder clientes por una web lenta o mal diseñada. Ofrezco soluciones avanzadas de WordPress para negocios que buscan excelencia técnica y resultados.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                            <Link
                                to="/contacto"
                                className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-bold rounded-xl text-blue-900 bg-white hover:bg-blue-50 transition-all transform hover:scale-105 shadow-lg"
                            >
                                Solicitar Auditoría Gratuita
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Link>
                            <Link
                                to="/proyectos"
                                className="inline-flex items-center justify-center px-8 py-4 border border-blue-400/50 text-lg font-bold rounded-xl text-white hover:bg-blue-800/50 backdrop-blur-sm transition-all"
                            >
                                Ver Casos de Éxito
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Pain Points Section */}
                <section className="py-20 bg-white dark:bg-slate-800 transition-colors duration-300">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">¿Tu web te está costando dinero?</h2>
                            <p className="text-xl text-gray-600 dark:text-gray-300">Muchos sitios WordPress sufren problemas que alejan a los clientes.</p>
                        </div>
                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="bg-slate-50 dark:bg-slate-700/50 p-8 rounded-2xl border border-slate-100 dark:border-slate-700 hover:shadow-lg transition-all">
                                <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center mb-6 text-red-600 dark:text-red-400">
                                    <Zap className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Carga Lenta</h3>
                                <p className="text-gray-600 dark:text-gray-300">Si tu web tarda más de 3 segundos en cargar, estás perdiendo hasta el 40% de tus visitas antes de que vean tu contenido.</p>
                            </div>
                            <div className="bg-slate-50 dark:bg-slate-700/50 p-8 rounded-2xl border border-slate-100 dark:border-slate-700 hover:shadow-lg transition-all">
                                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center mb-6 text-orange-600 dark:text-orange-400">
                                    <Shield className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Vulnerable a Ataques</h3>
                                <p className="text-gray-600 dark:text-gray-300">Plugins desactualizados y malas configuraciones son la puerta de entrada para malware que puede destruir tu reputación.</p>
                            </div>
                            <div className="bg-slate-50 dark:bg-slate-700/50 p-8 rounded-2xl border border-slate-100 dark:border-slate-700 hover:shadow-lg transition-all">
                                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mb-6 text-purple-600 dark:text-purple-400">
                                    <Layout className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Diseño Genérico</h3>
                                <p className="text-gray-600 dark:text-gray-300">Usar plantillas baratas sin personalizar hace que tu marca se vea poco profesional y no destaque frente a la competencia.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Solutions Section */}
                <section className="py-20 bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Soluciones WordPress de Alto Nivel</h2>
                            <p className="text-xl text-gray-600 dark:text-gray-300">Transformo tu sitio en una máquina de ventas segura y rápida.</p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-12">
                            <div className="space-y-8">
                                <div className="flex gap-4">
                                    <div className="flex-shrink-0">
                                        <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400">
                                            <Settings className="w-5 h-5" />
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Desarrollo a Medida</h3>
                                        <p className="text-gray-600 dark:text-gray-300">Plugins y temas personalizados programados desde cero para cumplir exactamente con tus requerimientos, sin código basura.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="flex-shrink-0">
                                        <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center text-green-600 dark:text-green-400">
                                            <Zap className="w-5 h-5" />
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">WPO (Web Performance Optimization)</h3>
                                        <p className="text-gray-600 dark:text-gray-300">Optimización extrema de velocidad. Core Web Vitals en verde garantizado. Caché, optimización de imágenes y minificación de código.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="flex-shrink-0">
                                        <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                                            <Search className="w-5 h-5" />
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">SEO Técnico para WordPress</h3>
                                        <p className="text-gray-600 dark:text-gray-300">Estructura de datos, sitemaps, y optimización on-page para que Google ame tu sitio y lo posicione mejor.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="flex-shrink-0">
                                        <div className="w-10 h-10 bg-pink-100 dark:bg-pink-900/30 rounded-full flex items-center justify-center text-pink-600 dark:text-pink-400">
                                            <Smartphone className="w-5 h-5" />
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">WooCommerce Avanzado</h3>
                                        <p className="text-gray-600 dark:text-gray-300">Tiendas online robustas, pasarelas de pago complejas, suscripciones y membresías. Todo lo que necesitas para vender más.</p>
                                    </div>
                                </div>
                            </div>

                            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-200 dark:border-slate-700">
                                <img
                                    src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=1000&fit=crop"
                                    alt="Dashboard WordPress Optimizado"
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-8">
                                    <div className="text-white">
                                        <p className="font-bold text-lg mb-1">Panel de Control Intuitivo</p>
                                        <p className="text-sm text-gray-300">Gestiona tu contenido fácilmente con interfaces personalizadas.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Final */}
                <section className="py-20 bg-blue-900 text-white">
                    <div className="max-w-4xl mx-auto px-4 text-center">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">¿Listo para profesionalizar tu WordPress?</h2>
                        <p className="text-xl text-blue-100 mb-10">
                            No dejes que una web mediocre frene tu negocio. Hablemos hoy mismo y diseñemos un plan de acción.
                        </p>
                        <Link
                            to="/contacto"
                            className="inline-block bg-white text-blue-900 px-10 py-4 rounded-xl font-bold text-lg hover:bg-blue-50 transition-colors shadow-xl transform hover:-translate-y-1"
                        >
                            Contactar Ahora
                        </Link>
                        <p className="mt-6 text-sm text-blue-200 flex items-center justify-center gap-2">
                            <CheckCircle className="w-4 h-4" /> Respuesta en menos de 24 horas
                        </p>
                    </div>
                </section>

            </div>
        </>
    );
};
