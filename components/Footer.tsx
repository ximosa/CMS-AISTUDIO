import React from 'react';
import { Github, Twitter, Linkedin, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-2xl font-bold text-indigo-400 mb-4">DevAgency</h3>
            <p className="text-gray-400">
              Transformando ideas en experiencias digitales excepcionales.
              Desarrollo web de alto nivel para tu negocio.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Enlaces Rápidos</h4>
            <ul className="space-y-2">
              <li><a href="#/" className="text-gray-400 hover:text-white transition">Inicio</a></li>
              <li><a href="#/servicios" className="text-gray-400 hover:text-white transition">Servicios</a></li>
              <li><a href="#/blog" className="text-gray-400 hover:text-white transition">Blog</a></li>
              <li><a href="#/contacto" className="text-gray-400 hover:text-white transition">Contacto</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Síguenos</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-indigo-400 transition"><Github size={24} /></a>
              <a href="#" className="text-gray-400 hover:text-indigo-400 transition"><Twitter size={24} /></a>
              <a href="#" className="text-gray-400 hover:text-indigo-400 transition"><Linkedin size={24} /></a>
              <a href="mailto:info@devagency.com" className="text-gray-400 hover:text-indigo-400 transition"><Mail size={24} /></a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} DevAgency. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};