import React, { useState } from 'react';
import { Mail, MapPin, Send } from 'lucide-react';

export const Contact: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const encode = (data: { [key: string]: string }) => {
    return Object.keys(data)
      .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
      .join('&');
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setIsSuccess(false);

    const form = event.currentTarget;
    const formData = new FormData(form);
    const data: { [key: string]: string } = {};
    formData.forEach((value, key) => {
      data[key] = value.toString();
    });

    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode({ 'form-name': form.name, ...data }),
      });

      if (response.ok) {
        setIsSuccess(true);
        form.reset(); // Clear the form
      } else {
        alert('Hubo un problema al enviar tu mensaje. Por favor, inténtalo de nuevo.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Hubo un problema al enviar tu mensaje. Por favor, inténtalo de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

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

            {/* Form Side - Netlify Form */}
            <div className="p-10 bg-white dark:bg-slate-800">
              <form
                name="contact"
                method="POST"
                data-netlify="true"
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                <input type="hidden" name="form-name" value="contact" />

                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Nombre
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    required
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-slate-700 text-gray-900 dark:text-white transition-colors"
                    placeholder="Tu nombre"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    required
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-slate-700 text-gray-900 dark:text-white transition-colors"
                    placeholder="tu@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Asunto
                  </label>
                  <input
                    type="text"
                    name="subject"
                    id="subject"
                    required
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-slate-700 text-gray-900 dark:text-white transition-colors"
                    placeholder="¿En qué puedo ayudarte?"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Mensaje
                  </label>
                  <textarea
                    name="message"
                    id="message"
                    rows={4}
                    required
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-slate-700 text-gray-900 dark:text-white transition-colors resize-none"
                    placeholder="Cuéntame sobre tu proyecto..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-[1.02]"
                >
                  {isSubmitting ? (
                    'Enviando...'
                  ) : isSuccess ? (
                    '¡Mensaje Enviado!'
                  ) : (
                    <>
                      Enviar Mensaje <Send className="ml-2 h-4 w-4" />
                    </>
                  )}
                </button>

                {isSuccess && (
                  <p className="text-green-600 dark:text-green-400 text-center text-sm mt-2">
                    Gracias por contactar. Te responderé lo antes posible.
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};