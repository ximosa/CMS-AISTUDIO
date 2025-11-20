import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, CheckCircle, Clock, ShieldCheck, Wrench, Activity, Server, Lock } from 'lucide-react';

export const WebRepair: React.FC = () => {
    return (
        <>
            <title>Reparación de Sitios Web | Solución de Errores y Hacks</title>
            <meta name="description" content="Servicio de reparación urgente de sitios web. Solucionamos errores 500, pantallas blancas, hacks, malware y problemas de funcionamiento. Recupera tu web hoy." />

            <div className="bg-slate-50 dark:bg-slate-900 min-h-screen transition-colors duration-300">

                {/* Hero Section - Urgency Focused */}
                <section className="relative bg-gradient-to-br from-slate-900 to-slate-800 text-white overflow-hidden">
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1600&h=900&fit=crop')] opacity-10 bg-cover bg-center"></div>
                    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 flex flex-col items-center text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/20 backdrop-blur-sm rounded-full border border-red-400/30 mb-8 animate-pulse">
                            <AlertTriangle className="w-4 h-4 text-red-400" />
                            <span className="text-sm font-bold text-red-100 uppercase tracking-wide">Servicio de Emergencia Disponible</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
                            ¿Tu Web ha Dejado de Funcionar? <br className="hidden md:block" />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-300">La Reparamos Hoy Mismo</span>
                        </h1>
                        <p className="text-xl text-slate-300 mb-10 max-w-2xl leading-relaxed">
                            Errores críticos, pantallas en blanco, malware o funcionalidades rotas. No pierdas más clientes ni ventas. Recuperamos tu sitio web rápido y seguro.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                            <Link
                                to="/contacto"
                                className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-bold rounded-xl text-white bg-red-600 hover:bg-red-700 transition-all transform hover:scale-105 shadow-lg shadow-red-900/20"
                            >
                                <Wrench className="mr-2 h-5 w-5" />
                                Solicitar Reparación Urgente
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Common Problems Section */}
                <section className="py-20 bg-white dark:bg-slate-800 transition-colors duration-300">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Solucionamos Todo Tipo de Errores</h2>
                            <p className="text-xl text-gray-600 dark:text-gray-300">Si tu web tiene alguno de estos síntomas, podemos ayudarte.</p>
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <div className="p-6 bg-slate-50 dark:bg-slate-700/50 rounded-xl border border-slate-100 dark:border-slate-700 hover:border-red-200 dark:hover:border-red-900/50 transition-all group">
                                <Activity className="w-10 h-10 text-red-500 mb-4 group-hover:scale-110 transition-transform" />
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Pantalla Blanca / Error 500</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">La web no carga nada o muestra un error interno del servidor crítico.</p>
                            </div>
                            <div className="p-6 bg-slate-50 dark:bg-slate-700/50 rounded-xl border border-slate-100 dark:border-slate-700 hover:border-orange-200 dark:hover:border-orange-900/50 transition-all group">
                                <Lock className="w-10 h-10 text-orange-500 mb-4 group-hover:scale-110 transition-transform" />
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Hackeos y Malware</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Redirecciones extrañas, publicidad invasiva o avisos de "Sitio no seguro" de Google.</p>
                            </div>
                            <div className="p-6 bg-slate-50 dark:bg-slate-700/50 rounded-xl border border-slate-100 dark:border-slate-700 hover:border-blue-200 dark:hover:border-blue-900/50 transition-all group">
                                <Server className="w-10 h-10 text-blue-500 mb-4 group-hover:scale-110 transition-transform" />
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Errores de Base de Datos</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Problemas de conexión, datos corruptos o pérdida de información.</p>
                            </div>
                            <div className="p-6 bg-slate-50 dark:bg-slate-700/50 rounded-xl border border-slate-100 dark:border-slate-700 hover:border-green-200 dark:hover:border-green-900/50 transition-all group">
                                <Wrench className="w-10 h-10 text-green-500 mb-4 group-hover:scale-110 transition-transform" />
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Funcionalidades Rotas</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Formularios que no envían, carritos de compra que fallan o menús desconfigurados.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Why Choose Us / Guarantee */}
                <section className="py-20 bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl overflow-hidden border border-gray-100 dark:border-slate-700">
                            <div className="grid md:grid-cols-2">
                                <div className="p-12 flex flex-col justify-center">
                                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Tranquilidad Garantizada</h2>
                                    <ul className="space-y-6">
                                        <li className="flex items-start">
                                            <div className="flex-shrink-0 w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mt-1">
                                                <Clock className="w-5 h-5 text-green-600 dark:text-green-400" />
                                            </div>
                                            <div className="ml-4">
                                                <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Respuesta Rápida</h4>
                                                <p className="text-gray-600 dark:text-gray-400">Sabemos que cada minuto cuenta. Priorizamos las emergencias.</p>
                                            </div>
                                        </li>
                                        <li className="flex items-start">
                                            <div className="flex-shrink-0 w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mt-1">
                                                <ShieldCheck className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                            </div>
                                            <div className="ml-4">
                                                <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Copias de Seguridad</h4>
                                                <p className="text-gray-600 dark:text-gray-400">Siempre realizamos un backup completo antes de tocar una sola línea de código.</p>
                                            </div>
                                        </li>
                                        <li className="flex items-start">
                                            <div className="flex-shrink-0 w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mt-1">
                                                <CheckCircle className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                                            </div>
                                            <div className="ml-4">
                                                <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Informe Detallado</h4>
                                                <p className="text-gray-600 dark:text-gray-400">Te explicamos qué pasó, cómo lo arreglamos y cómo evitar que vuelva a suceder.</p>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                <div className="relative h-64 md:h-auto">
                                    <img
                                        src="https://images.unsplash.com/photo-1624996752380-8ec242e0f85d?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                        alt="Reparación de código"
                                        className="absolute inset-0 w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-r from-white dark:from-slate-800 to-transparent md:via-transparent"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Final */}
                <section className="py-20 bg-gray-900 text-white">
                    <div className="max-w-4xl mx-auto px-4 text-center">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">Recupera el Control de tu Web</h2>
                        <p className="text-xl text-gray-300 mb-10">
                            No dejes que un error técnico arruine tu reputación online.
                        </p>
                        <Link
                            to="/contacto"
                            className="inline-block bg-red-600 text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-red-700 transition-colors shadow-xl transform hover:-translate-y-1"
                        >
                            Contactar Soporte Técnico
                        </Link>
                    </div>
                </section>

            </div>
        </>
    );
};
