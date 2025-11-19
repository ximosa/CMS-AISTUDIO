import React, { useRef } from 'react';
import { Image as ImageIcon } from 'lucide-react';

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
  const widgetRef = useRef<any>(null);

  const openWidget = () => {
    if (!window.cloudinary) {
      alert("El script de Cloudinary aún no ha cargado. Espera un momento o recarga la página.");
      return;
    }

    // Crear el widget solo cuando se hace click, para asegurar que la configuración es fresca
    // y evitar problemas de inicialización en el montaje del componente.
    widgetRef.current = window.cloudinary.createUploadWidget(
      {
        cloudName: CLOUD_NAME,
        uploadPreset: UPLOAD_PRESET,
        apiKey: API_KEY,
        // IMPORTANTE: Quitamos 'unsplash' y 'camera' para reducir fallos si no están configurados en el dashboard
        sources: ['local', 'url'], 
        multiple: false,
        maxFiles: 1,
        defaultSource: "local",
        zIndex: 99999, // Asegurar que esté por encima de todo
        styles: {
          palette: {
            window: "#FFFFFF",
            sourceBg: "#F4F5F7",
            windowBorder: "#90A0B3",
            tabIcon: "#4F46E5",
            inactiveTabIcon: "#69778A",
            menuIcons: "#5A6169",
            link: "#4F46E5",
            action: "#4F46E5",
            inProgress: "#4F46E5",
            complete: "#20B832",
            error: "#F44235",
            textDark: "#000000",
            textLight: "#FFFFFF"
          }
        },
        language: "es",
        text: {
          es: {
            or: "o",
            back: "Atrás",
            close: "Cerrar",
            menu: {
              files: "Subir Archivo",
              web: "URL Web"
            },
            local: {
              browse: "Seleccionar archivo",
              dd_title_single: "Arrastra una imagen aquí",
            }
          }
        }
      },
      (error: any, result: any) => {
        if (error) {
          // Logueamos el error pero no bloqueamos la UI con alertas molestas a menos que sea crítico
          console.error("Cloudinary Error:", error);
          if (typeof error === 'string' && error.includes('unsigned')) {
              alert("Error crítico: El Preset de Cloudinary no está en modo 'Unsigned'.");
          }
          return;
        }
        
        if (result && result.event === "success") {
          console.log("Imagen subida con éxito:", result.info.secure_url);
          onUpload(result.info.secure_url);
        }
      }
    );

    widgetRef.current.open();
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