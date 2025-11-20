import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Twitter, Mail, Lock } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-2xl font-bold text-indigo-400 mb-4">DevWebgae</h3>
            <p className="text-gray-400">
              Transformando ideas en experiencias digitales excepcionales.
              Desarrollo web de alto nivel para tu negocio.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Enlaces Rápidos</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-white transition">Inicio</Link></li>
              <li><Link to="/servicios" className="text-gray-400 hover:text-white transition">Servicios</Link></li>
              <li><Link to="/proyectos" className="text-gray-400 hover:text-white transition">Proyectos</Link></li>
              <li><Link to="/sobre-mi" className="text-gray-400 hover:text-white transition">Sobre Mí</Link></li>
              <li><Link to="/wordpress-expert" className="text-gray-400 hover:text-white transition">Experto WordPress</Link></li>
              <li><Link to="/reparamos-web" className="text-gray-400 hover:text-white transition">Reparamos Web</Link></li>
              <li><Link to="/blog" className="text-gray-400 hover:text-white transition">Blog</Link></li>
              <li><Link to="/contacto" className="text-gray-400 hover:text-white transition">Contacto</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Síguenos</h4>
            <div className="flex space-x-4">
              <a href="https://github.com/ximosa" className="text-gray-400 hover:text-indigo-400 transition"><Github size={24} /></a>
              <a href="https://x.com/RedXimo" className="text-gray-400 hover:text-indigo-400 transition"><Twitter size={24} /></a>
              <a href="mailto:ximosa@gmail.com" className="text-gray-400 hover:text-indigo-400 transition"><Mail size={24} /></a>
              <Link to="/admin" className="text-gray-400 hover:text-indigo-400 transition" aria-label="Admin Access"><Lock size={24} /></Link>
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