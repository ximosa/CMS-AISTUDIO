import React from 'react';
import { Code, ShoppingCart, Database, BarChart, Smartphone, Globe } from 'lucide-react';

const ServiceCard: React.FC<{ title: string; description: string; icon: React.ReactNode }> = ({ title, description, icon }) => (
  <div className="bg-white dark:bg-slate-800 rounded-xl p-8 shadow-sm border border-gray-100 dark:border-slate-700 hover:shadow-lg transition-all duration-300 group">
    <div className="w-14 h-14 bg-indigo-50 dark:bg-indigo-900/30 rounded-full flex items-center justify-center mb-6 group-hover:bg-indigo-600 dark:group-hover:bg-indigo-600 transition-colors duration-300">
      <div className="text-indigo-600 dark:text-indigo-400 group-hover:text-white transition-colors duration-300">
        {icon}
      </div>
    </div>
    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{title}</h3>
    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{description}</p>
  </div>
);

export const Services: React.FC = () => {
  const services = [
    {
      title: "Desarrollo Web a Medida",
      description: "Creo sitios web únicos adaptados a las necesidades específicas de tu marca, utilizando las últimas tecnologías como React y Next.js.",
      icon: <Code className="w-7 h-7" />
    },
    {
      title: "E-Commerce",
      description: "Tiendas online robustas y seguras diseñadas para convertir visitantes en clientes. Integraciones con pasarelas de pago y gestión de inventario.",
      icon: <ShoppingCart className="w-7 h-7" />
    },
    {
      title: "Backend & API",
      description: "Desarrollo arquitecturas de servidor escalables y bases de datos optimizadas. Creo APIs RESTful y GraphQL para alimentar tus aplicaciones.",
      icon: <Database className="w-7 h-7" />
    },
    {
      title: "SEO & Analytics",
      description: "Optimizo tu presencia online para mejorar el ranking en Google. Implemento herramientas de análisis para medir el rendimiento.",
      icon: <BarChart className="w-7 h-7" />
    },
    {
      title: "Desarrollo Móvil",
      description: "Desarrollo aplicaciones híbridas y nativas que ofrecen una experiencia de usuario fluida en iOS y Android.",
      icon: <Smartphone className="w-7 h-7" />
    },
    {
      title: "Hosting & Mantenimiento",
      description: "Me encargo de que tu sitio esté siempre online, seguro y actualizado. Ofrezco copias de seguridad automáticas y monitoreo 24/7.",
      icon: <Globe className="w-7 h-7" />
    }
  ];

  return (
    <>
      <title>Servicios de Desarrollo Web | Joaquín</title>
      <meta name="description" content="Ofrezco servicios de desarrollo web a medida, e-commerce, backend, SEO, y más. Soluciones tecnológicas para impulsar tu negocio." />

      <div className="bg-slate-50 dark:bg-slate-900 min-h-screen py-12 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl mb-4">
              Mis Servicios
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Ofrezco soluciones tecnológicas integrales para impulsar tu proyecto en el mundo digital.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <ServiceCard key={index} {...service} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};