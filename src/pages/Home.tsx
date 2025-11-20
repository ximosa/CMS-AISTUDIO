import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Monitor, Smartphone, Search } from 'lucide-react';

export const Home: React.FC = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Joaquín's Web Development",
    "url": "https://ximosa.github.io/CMS-AISTUDIO/",
    "description": "Desarrollador web experto en la creación de sitios y aplicaciones web a medida, rápidos y optimizados para SEO.",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://ximosa.github.io/CMS-AISTUDIO/blog?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <>
      <title>Desarrollo Web a Medida | Joaquín</title>
      <meta name="description" content="Desarrollador web experto en la creación de sitios y aplicaciones web a medida, rápidos y optimizados para SEO. Transforma tu idea en una realidad digital." />
      <script type="application/ld+json">{JSON.stringify(structuredData)}</script>

      <div className="bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
        {/* Hero Section */}
        <section className="relative bg-indigo-900 text-white overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://picsum.photos/1920/1080?blur=2')] opacity-20 bg-cover bg-center"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
            <div className="lg:w-2/3">
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
                Creo Experiencias Digitales <span className="text-indigo-400">Inolvidables</span>
              </h1>
              <p className="text-xl text-indigo-100 mb-8 leading-relaxed">
                Soy un desarrollador web experto. Ayudo a tu negocio a crecer con soluciones tecnológicas a medida, rápidas y escalables.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/contacto"
                  className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-900 bg-white hover:bg-indigo-50 transition-colors"
                >
                  Empezar Proyecto
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link
                  to="/servicios"
                  className="inline-flex items-center justify-center px-8 py-3 border border-indigo-400 text-base font-medium rounded-md text-white hover:bg-indigo-800 transition-colors"
                >
                  Ver Servicios
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features Preview */}
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">¿Por qué elegir mi trabajo?</h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">Combino diseño, tecnología y estrategia para ofrecerte la mejor solución.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
              <div className="bg-indigo-100 dark:bg-indigo-900/30 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                <Monitor className="text-indigo-600 dark:text-indigo-400 h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Diseño Responsivo</h3>
              <p className="text-gray-600 dark:text-gray-300">Tu sitio web se verá perfecto en cualquier dispositivo, desde móviles hasta pantallas gigantes.</p>
            </div>
            <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
              <div className="bg-indigo-100 dark:bg-indigo-900/30 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                <Smartphone className="text-indigo-600 dark:text-indigo-400 h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Aplicaciones Web</h3>
              <p className="text-gray-600 dark:text-gray-300">Desarrollo aplicaciones web complejas y PWAs que funcionan como software nativo.</p>
            </div>
            <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
              <div className="bg-indigo-100 dark:bg-indigo-900/30 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                <Search className="text-indigo-600 dark:text-indigo-400 h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">SEO Optimizado</h3>
              <p className="text-gray-600 dark:text-gray-300">Código limpio y estructurado para que los motores de búsqueda adoren tu sitio web.</p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gray-900 dark:bg-black py-16 transition-colors duration-300">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-6">¿Listo para llevar tu negocio al siguiente nivel?</h2>
            <p className="text-indigo-200 mb-8 text-lg">Contáctame hoy mismo para una consulta gratuita y descubre cómo puedo ayudarte.</p>
            <Link
              to="/contacto"
              className="inline-block bg-indigo-600 text-white px-8 py-4 rounded-md font-bold text-lg hover:bg-indigo-700 transition-colors shadow-lg"
            >
              Hablemos
            </Link>
          </div>
        </section>
      </div>
    </>
  );
};