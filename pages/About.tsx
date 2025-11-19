import React from 'react';

export const About: React.FC = () => {
  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Intro */}
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center mb-20">
          <div className="mb-10 lg:mb-0">
            <img 
              src="https://picsum.photos/800/600?grayscale" 
              alt="Equipo de trabajo" 
              className="rounded-xl shadow-xl w-full object-cover h-96"
            />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-6">Sobre Mí & La Agencia</h1>
            <p className="text-lg text-gray-600 mb-6">
              Hola, soy un desarrollador apasionado con más de 10 años de experiencia transformando ideas en código. Fundé esta agencia con una misión clara: democratizar el acceso a tecnología de alta calidad para empresas de todos los tamaños.
            </p>
            <p className="text-lg text-gray-600 mb-6">
              Creemos que un sitio web no es solo una tarjeta de presentación, es una herramienta de crecimiento. Nuestro enfoque combina creatividad artística con ingeniería robusta.
            </p>
            <div className="grid grid-cols-2 gap-6 mt-8">
              <div>
                <span className="block text-4xl font-bold text-indigo-600 mb-2">50+</span>
                <span className="text-gray-500">Proyectos Completados</span>
              </div>
              <div>
                <span className="block text-4xl font-bold text-indigo-600 mb-2">100%</span>
                <span className="text-gray-500">Clientes Satisfechos</span>
              </div>
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="bg-slate-50 rounded-2xl p-12">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Nuestros Valores</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm text-2xl">💡</div>
              <h3 className="text-xl font-semibold mb-2">Innovación</h3>
              <p className="text-gray-600">Siempre buscamos la mejor y más moderna solución tecnológica para cada problema.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm text-2xl">🤝</div>
              <h3 className="text-xl font-semibold mb-2">Transparencia</h3>
              <p className="text-gray-600">Sin costes ocultos ni tecnicismos confusos. Comunicación clara desde el día uno.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm text-2xl">🚀</div>
              <h3 className="text-xl font-semibold mb-2">Calidad</h3>
              <p className="text-gray-600">No entregamos nada que no usaríamos nosotros mismos. La excelencia es nuestro estándar.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};