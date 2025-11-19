import React from 'react';
import { Code, ShoppingCart, Database, BarChart, Smartphone, Globe } from 'lucide-react';

const ServiceCard: React.FC<{ title: string; description: string; icon: React.ReactNode }> = ({ title, description, icon }) => (
  <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 group">
    <div className="w-14 h-14 bg-indigo-50 rounded-full flex items-center justify-center mb-6 group-hover:bg-indigo-600 transition-colors duration-300">
      <div className="text-indigo-600 group-hover:text-white transition-colors duration-300">
        {icon}
      </div>
    </div>
    <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
    <p className="text-gray-600 leading-relaxed">{description}</p>
  </div>
);

export const Services: React.FC = () => {
  const services = [
    {
      title: "Desarrollo Web a Medida",
      description: "Creamos sitios web únicos adaptados a las necesidades específicas de tu marca, utilizando las últimas tecnologías como React y Next.js.",
      icon: <Code className="w-7 h-7" />
    },
    {
      title: "E-Commerce",
      description: "Tiendas online robustas y seguras diseñadas para convertir visitantes en clientes. Integraciones con pasarelas de pago y gestión de inventario.",
      icon: <ShoppingCart className="w-7 h-7" />
    },
    {
      title: "Backend & API",
      description: "Arquitecturas de servidor escalables y bases de datos optimizadas. Desarrollo de APIs RESTful y GraphQL para alimentar tus aplicaciones.",
      icon: <Database className="w-7 h-7" />
    },
    {
      title: "SEO & Analytics",
      description: "Optimizamos tu presencia online para mejorar el ranking en Google. Implementamos herramientas de análisis para medir el rendimiento.",
      icon: <BarChart className="w-7 h-7" />
    },
    {
      title: "Desarrollo Móvil",
      description: "Aplicaciones híbridas y nativas que ofrecen una experiencia de usuario fluida en iOS y Android.",
      icon: <Smartphone className="w-7 h-7" />
    },
    {
      title: "Hosting & Mantenimiento",
      description: "Nos encargamos de que tu sitio esté siempre online, seguro y actualizado. Copias de seguridad automáticas y monitoreo 24/7.",
      icon: <Globe className="w-7 h-7" />
    }
  ];

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl mb-4">
            Nuestros Servicios
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Ofrecemos soluciones tecnológicas integrales para impulsar tu negocio en el mundo digital.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
      </div>
    </div>
  );
};