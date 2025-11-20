import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Code2, Sun, Moon, ChevronDown } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  const dropdownLinks = [
    { name: 'Servicios', path: '/servicios' },
    { name: 'Proyectos', path: '/proyectos' },
    { name: 'Experto WordPress', path: '/wordpress-expert' },
    { name: 'Sobre Mí', path: '/sobre-mi' },
  ];

  const isActive = (path: string) => location.pathname === path;
  const isDropdownActive = dropdownLinks.some(link => link.path === location.pathname);

  // Cerrar dropdown al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="bg-white dark:bg-slate-900 shadow-sm fixed w-full z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Code2 className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
              <span className="text-xl font-bold text-gray-900 dark:text-white">Webgae</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {/* Inicio */}
            <Link
              to="/"
              className={`${isActive('/')
                ? 'text-indigo-600 dark:text-indigo-400 font-semibold'
                : 'text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400'
                } transition-colors duration-200`}
            >
              Inicio
            </Link>

            {/* Dropdown Explorar */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className={`flex items-center gap-1 ${isDropdownActive
                  ? 'text-indigo-600 dark:text-indigo-400 font-semibold'
                  : 'text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400'
                  } transition-colors duration-200 focus:outline-none`}
              >
                Explorar
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Content */}
              {isDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-gray-100 dark:border-slate-700 py-2 animate-fade-in">
                  {dropdownLinks.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={() => setIsDropdownOpen(false)}
                      className={`block px-4 py-2 text-sm ${isActive(link.path)
                        ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 font-medium'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700 hover:text-indigo-600 dark:hover:text-indigo-400'
                        } transition-colors`}
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Blog */}
            <Link
              to="/blog"
              className={`${isActive('/blog')
                ? 'text-indigo-600 dark:text-indigo-400 font-semibold'
                : 'text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400'
                } transition-colors duration-200`}
            >
              Blog
            </Link>

            {/* Contacto CTA */}
            <Link
              to="/contacto"
              className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg"
            >
              Contacto
            </Link>

            {/* Botón de Tema (Desktop) */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Cambiar tema"
            >
              {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-4">
            {/* Botón de Tema (Mobile) */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
            >
              {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-slate-900 border-t dark:border-slate-800 max-h-[calc(100vh-4rem)] overflow-y-auto">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className={`${isActive('/')
                ? 'bg-indigo-50 dark:bg-slate-800 text-indigo-600 dark:text-indigo-400'
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-800'
                } block px-3 py-2 rounded-md text-base font-medium`}
            >
              Inicio
            </Link>

            {/* Mobile Dropdown Items (Flat list for better mobile UX) */}
            <div className="pl-4 border-l-2 border-gray-100 dark:border-slate-800 ml-2 my-2 space-y-1">
              <p className="px-3 py-1 text-xs font-semibold text-gray-400 uppercase tracking-wider">Explorar</p>
              {dropdownLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`${isActive(link.path)
                    ? 'text-indigo-600 dark:text-indigo-400 font-medium'
                    : 'text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400'
                    } block px-3 py-2 rounded-md text-base`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <Link
              to="/blog"
              onClick={() => setIsOpen(false)}
              className={`${isActive('/blog')
                ? 'bg-indigo-50 dark:bg-slate-800 text-indigo-600 dark:text-indigo-400'
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-800'
                } block px-3 py-2 rounded-md text-base font-medium`}
            >
              Blog
            </Link>

            <Link
              to="/contacto"
              onClick={() => setIsOpen(false)}
              className="block mx-2 mt-4 px-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-semibold text-center shadow-md"
            >
              Contacto
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};