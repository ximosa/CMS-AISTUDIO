import React from 'react';
import { Mail, MapPin } from 'lucide-react';

export const Contact: React.FC = () => {
  return (
    <>
      <title>Contacto | Joaquín - Desarrollador Web</title>
      <meta name="description" content="¿Tienes una idea para un proyecto web? Contáctame para empezar a hacerlo realidad. Rellena el formulario o encuéntrame en WhatsApp." />

      <div className="bg-slate-50 dark:bg-slate-900 min-h-screen py-12 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Contacto</h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">Estoy listo para empezar tu próximo gran proyecto.</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 bg-white dark:bg-slate-800 rounded-2xl shadow-xl overflow-hidden transition-colors duration-300">
            {/* Info Side */}
            <div className="bg-indigo-700 dark:bg-indigo-900 p-10 text-white flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-bold mb-6">Información de Contacto</h3>
                <p className="text-indigo-100 mb-8">
                  Rellena el formulario y me pondré en contacto contigo en menos de 24 horas.
                </p>

                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <Mail className="h-6 w-6 text-indigo-300" />
                    <span>ximosa@gmail.com</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <MapPin className="h-6 w-6 text-indigo-300" />
                    <span>España, Valencia</span>
                  </div>
                  <div className="space-y-2">
                    <a href="https://wa.me/34667590554" target="_blank" rel="noopener noreferrer" className="block text-indigo-200 hover:text-white transition">
                      Hablamos por WhatsApp
                    </a>
                  </div>
                </div>
              </div>

              <div className="mt-10">
                <div className="flex space-x-4">
                  {/* Social Icons placeholder */}
                  <div className="w-10 h-10 rounded-full bg-indigo-600 dark:bg-indigo-800 flex items-center justify-center hover:bg-indigo-500 dark:hover:bg-indigo-700 transition cursor-pointer">IG</div>
                  <div className="w-10 h-10 rounded-full bg-indigo-600 dark:bg-indigo-800 flex items-center justify-center hover:bg-indigo-500 dark:hover:bg-indigo-700 transition cursor-pointer">TW</div>
                  <div className="w-10 h-10 rounded-full bg-indigo-600 dark:bg-indigo-800 flex items-center justify-center hover:bg-indigo-500 dark:hover:bg-indigo-700 transition cursor-pointer">LI</div>
                </div>
              </div>
            </div>

            {/* Form Side - Iframe */}
            <div className="p-0 bg-white dark:bg-slate-800">
              <iframe
                src="https://formularios-resend.vercel.app/embed/form_1762906075895"
                width="100%"
                height="600px"
                frameBorder="0"
                title="Formulario de Contacto"
                className="w-full h-full min-h-[550px]"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};