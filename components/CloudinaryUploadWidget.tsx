import React, { useEffect, useRef } from 'react';
import { Upload, Image as ImageIcon } from 'lucide-react';

interface CloudinaryUploadWidgetProps {
  onUpload: (url: string) => void;
  buttonText?: string;
  className?: string;
}

const CLOUD_NAME = 'djjiagkho';
const UPLOAD_PRESET = 'blog_upload';
const API_KEY = '488363368914933';

export const CloudinaryUploadWidget: React.FC<CloudinaryUploadWidgetProps> = ({ 
  onUpload, 
  buttonText = "Subir Imagen",
  className = ""
}) => {
  const cloudinaryRef = useRef<any>(null);
  const widgetRef = useRef<any>(null);

  useEffect(() => {
    if (window.cloudinary) {
      cloudinaryRef.current = window.cloudinary;
      widgetRef.current = cloudinaryRef.current.createUploadWidget(
        {
          cloudName: CLOUD_NAME,
          uploadPreset: UPLOAD_PRESET,
          apiKey: API_KEY,
          sources: ['local', 'url', 'camera', 'unsplash'], // Fuentes permitidas
          multiple: false,
          defaultSource: "local",
          styles: {
            palette: {
              window: "#FFFFFF",
              windowBorder: "#90A0B3",
              tabIcon: "#4F46E5", // Indigo-600 matches site
              menuIcons: "#5A6169",
              textDark: "#000000",
              textLight: "#FFFFFF",
              link: "#4F46E5",
              action: "#FF620C",
              inactiveTabIcon: "#0E2F5A",
              error: "#F44235",
              inProgress: "#4F46E5",
              complete: "#20B832",
              sourceBg: "#F4F5F7"
            }
          },
          language: "es", // Idioma español
          text: {
            es: {
              or: "o",
              back: "Atrás",
              advanced: "Avanzado",
              close: "Cerrar",
              no_results: "Sin resultados",
              search_placeholder: "Buscar archivos",
              menu: {
                files: "Mis Archivos",
                web: "Dirección Web",
                camera: "Cámara"
              },
              local: {
                browse: "Explorar",
                dd_title_single: "Arrastra y suelta una imagen aquí",
              }
            }
          }
        },
        (error: any, result: any) => {
          if (!error && result && result.event === "success") {
            // Cuando la carga es exitosa
            const secureUrl = result.info.secure_url;
            onUpload(secureUrl);
          }
        }
      );
    }
  }, [onUpload]);

  const openWidget = () => {
    if (widgetRef.current) {
      widgetRef.current.open();
    } else {
      alert("El widget de Cloudinary no se ha cargado. Revisa tu conexión.");
    }
  };

  return (
    <button 
      type="button" 
      onClick={openWidget} 
      className={`flex items-center justify-center ${className || 'bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors'}`}
    >
      <ImageIcon className="w-5 h-5 mr-2" />
      {buttonText}
    </button>
  );
};