import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export const Contact: React.FC = () => {
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    
    // Simulación de envío
    setTimeout(() => {
      setFormStatus('success');
      // Aquí se podría conectar con Supabase o un servicio de email
      console.log("Formulario enviado");
    }, 1500);
  };

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Contáctanos</h1>
          <p className="text-xl text-gray-600">Estamos listos para empezar tu próximo gran proyecto.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Info Side */}
          <div className="bg-indigo-700 p-10 text-white flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-bold mb-6">Información de Contacto</h3>
              <p className="text-indigo-100 mb-8">
                Rellena el formulario y nuestro equipo se pondrá en contacto contigo en menos de 24 horas.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <Mail className="h-6 w-6 text-indigo-300" />
                  <span>info@webgae.com</span>
                </div>
                <div className="flex items-center space-x-4">
                  <Mail className="h-6 w-6 text-indigo-300" />
                  <span>ximosa@gmail.com</span>
                </div>
                <div className="flex items-center space-x-4">
                  <MapPin className="h-6 w-6 text-indigo-300" />
                  <span>España, Valencia</span>
                </div>
                <div className="space-y-2">
                  <a href="https://forms.gle/pCq7uu95ZrdHd6N26" target="_blank" rel="noopener noreferrer" className="block text-indigo-200 hover:text-white transition">
                    Usar un Formulario Seguro desde aqui
                  </a>
                  <a href="https://wa.me/34667590554" target="_blank" rel="noopener noreferrer" className="block text-indigo-200 hover:text-white transition">
                    Hablamos por WhatsApp
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-10">
              <div className="flex space-x-4">
                {/* Social Icons placeholder */}
                <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center hover:bg-indigo-500 transition cursor-pointer">IG</div>
                <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center hover:bg-indigo-500 transition cursor-pointer">TW</div>
                <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center hover:bg-indigo-500 transition cursor-pointer">LI</div>
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="p-10">
            {formStatus === 'success' ? (
              <div className="h-full flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <Send className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">¡Mensaje Enviado!</h3>
                <p className="text-gray-600">Gracias por contactarnos. Te responderemos pronto.</p>
                <button 
                  onClick={() => setFormStatus('idle')}
                  className="mt-6 text-indigo-600 font-semibold hover:text-indigo-800"
                >
                  Enviar otro mensaje
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                    <input type="text" required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition bg-white text-gray-900" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Apellido</label>
                    <input type="text" required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition bg-white text-gray-900" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input type="email" required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition bg-white text-gray-900" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Mensaje</label>
                  <textarea rows={4} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition bg-white text-gray-900"></textarea>
                </div>
                <button
                  type="submit"
                  disabled={formStatus === 'submitting'}
                  className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-700 transition duration-300 flex items-center justify-center disabled:opacity-50"
                >
                  {formStatus === 'submitting' ? 'Enviando...' : 'Enviar Mensaje'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};