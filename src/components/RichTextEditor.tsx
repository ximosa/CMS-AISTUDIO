import React, { useRef, useState, useEffect } from 'react';
import { 
  Bold, Italic, Heading1, Heading2, List, Link as LinkIcon, 
  Image as ImageIcon, Code, X, Check, Upload, Loader2, Type, 
  Undo, Eye 
} from 'lucide-react';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
}

const CLOUDINARY_CLOUD_NAME = 'djjiagkho';
const CLOUDINARY_UPLOAD_PRESET = 'blog_upload';

// --- Tipos para los Modales ---
interface LinkData {
  url: string;
  text: string;
  title: string; // SEO Title
  openInNewTab: boolean;
}

interface ImageData {
  src: string;
  alt: string; // SEO Alt
  title: string; // SEO Title
  width: string;
}

export const RichTextEditor: React.FC<RichTextEditorProps> = ({ value, onChange }) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [activeModal, setActiveModal] = useState<'link' | 'image' | null>(null);
  const [savedRange, setSavedRange] = useState<Range | null>(null);
  const [showSource, setShowSource] = useState(false);

  // --- Estados de los Modales ---
  const [linkData, setLinkData] = useState<LinkData>({ url: '', text: '', title: '', openInNewTab: true });
  const [imageData, setImageData] = useState<ImageData>({ src: '', alt: '', title: '', width: '100%' });
  const [uploading, setUploading] = useState(false);
  const [currentImg, setCurrentImg] = useState<HTMLImageElement | null>(null);

  // Sincronizar contenido inicial (solo si no estamos viendo el código fuente)
  useEffect(() => {
    // Forzar la actualización del innerHTML cuando el valor de la prop cambie
    // y no coincida con el contenido actual del editor.
    // Esto es crucial para renderizar el HTML inyectado programáticamente (ej: desde Gemini).
    if (!showSource && editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value;
    }
  }, [value, showSource]);

  // Event listener para clicks en imágenes dentro del editor
  useEffect(() => {
    if (editorRef.current) {
      const handleClick = (e: MouseEvent) => {
        if (showSource) return;
        const target = e.target as HTMLElement;
        if (target.tagName === 'IMG') {
          e.preventDefault();
          const img = target as HTMLImageElement;
          setCurrentImg(img);
          setImageData({
            src: img.src,
            alt: img.alt || '',
            title: img.title || '',
            width: getComputedStyle(img).width
          });
          setActiveModal('image');
        }
      };
      editorRef.current.addEventListener('click', handleClick);
      return () => editorRef.current?.removeEventListener('click', handleClick);
    }
  }, [showSource]);

  // Manejar cambios en el editor visual
  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  // Manejar cambios en el editor de código
  const handleSourceChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  // Guardar la selección actual para restaurarla después de cerrar el modal
  const saveSelection = () => {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      setSavedRange(selection.getRangeAt(0));
    }
  };

  const restoreSelection = () => {
    const selection = window.getSelection();
    if (savedRange && selection) {
      selection.removeAllRanges();
      selection.addRange(savedRange);
    }
  };

  // --- Comandos de Formato Básico ---
  const execCommand = (command: string, value: string | undefined = undefined) => {
    if (showSource) return; // No ejecutar comandos en modo código
    document.execCommand(command, false, value);
    handleInput();
    editorRef.current?.focus();
  };

  const handleUndo = () => {
    execCommand('undo');
  };

  // Insertar bloque de código con estilo personalizado
  const insertCodeBlock = () => {
    if (showSource) return;
    saveSelection();
    const html = '<pre class="bg-gray-900 text-green-400 p-4 rounded overflow-x-auto font-mono code-block"><code>Inicia tu código aquí</code></pre>';
    document.execCommand('insertHTML', false, html);
    setTimeout(() => editorRef.current?.focus(), 0);
    handleInput();
  };

  // --- Lógica de Enlaces ---
  const openLinkModal = () => {
    if (showSource) return;
    saveSelection();
    const selection = window.getSelection();
    const selectedText = selection ? selection.toString() : '';
    
    setLinkData({
      url: '',
      text: selectedText,
      title: '',
      openInNewTab: true
    });
    setActiveModal('link');
  };

  const insertLink = () => {
    restoreSelection();
    if (!savedRange) return; // Fallback simple
    
    const a = document.createElement('a');
    a.href = linkData.url;
    a.title = linkData.title;
    a.innerText = linkData.text || linkData.url;
    a.className = "text-indigo-600 hover:underline cursor-pointer";
    
    if (linkData.openInNewTab) {
      a.target = "_blank";
      a.rel = "noopener noreferrer";
    }

    savedRange.deleteContents();
    savedRange.insertNode(a);
    
    handleInput();
    closeModal();
  };

  // --- Lógica de Imágenes ---
  const openImageModal = () => {
    if (showSource) return;
    saveSelection();
    setImageData({ src: '', alt: '', title: '', width: '100%' });
    setActiveModal('image');
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
        { method: 'POST', body: formData }
      );
      const data = await response.json();
      if (data.secure_url) {
        setImageData(prev => ({ ...prev, src: data.secure_url }));
      }
    } catch (error) {
      console.error('Upload error', error);
      alert('Error subiendo imagen');
    } finally {
      setUploading(false);
    }
  };

  const insertImage = () => {
    if (currentImg) {
      // Editar imagen existente
      currentImg.src = imageData.src;
      currentImg.alt = imageData.alt;
      currentImg.title = imageData.title;
      if (imageData.width) currentImg.style.width = imageData.width;
      setCurrentImg(null);
      handleInput();
      closeModal();
      return;
    }

    // Insertar nueva imagen
    restoreSelection();
    if (!savedRange) return;

    const img = document.createElement('img');
    img.src = imageData.src;
    img.alt = imageData.alt;
    img.title = imageData.title;
    img.className = "rounded-lg my-4 shadow-sm max-w-full";
    if (imageData.width) img.style.width = imageData.width;

    // Insertar imagen
    savedRange.insertNode(img);
    // Mover el cursor después de la imagen
    savedRange.collapse(false);

    handleInput();
    closeModal();
  };

  const closeModal = () => {
    setActiveModal(null);
    setSavedRange(null);
  };

  // --- Renderizado de Botones de la Barra ---
  const ToolbarButton = ({ onClick, icon: Icon, title, active = false, disabled = false }: any) => (
    <button
      type="button"
      onClick={onClick}
      title={title}
      disabled={disabled}
      className={`p-2 rounded transition-colors ${
        active 
          ? 'bg-indigo-100 text-indigo-700' 
          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
      } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      <Icon className="w-5 h-5" />
    </button>
  );

  return (
    <div className="relative border border-gray-300 rounded-lg bg-white shadow-sm flex flex-col">

      {/* Barra de Herramientas */}
      <div className="fixed top-16 left-0 right-0 z-60 flex flex-wrap items-center gap-1 p-2 border-b border-gray-200 bg-gray-50 rounded-t-lg">
        <ToolbarButton onClick={handleUndo} icon={Undo} title="Deshacer" disabled={showSource} />
        <div className="w-px h-6 bg-gray-300 mx-1" />
        
        <ToolbarButton onClick={() => execCommand('bold')} icon={Bold} title="Negrita" disabled={showSource} />
        <ToolbarButton onClick={() => execCommand('italic')} icon={Italic} title="Cursiva" disabled={showSource} />
        <div className="w-px h-6 bg-gray-300 mx-1" />
        
        <ToolbarButton onClick={() => execCommand('formatBlock', 'H2')} icon={Heading1} title="Título H2" disabled={showSource} />
        <ToolbarButton onClick={() => execCommand('formatBlock', 'H3')} icon={Heading2} title="Título H3" disabled={showSource} />
        <ToolbarButton onClick={() => execCommand('formatBlock', 'P')} icon={Type} title="Párrafo" disabled={showSource} />
        <div className="w-px h-6 bg-gray-300 mx-1" />
        
        <ToolbarButton onClick={() => execCommand('insertUnorderedList')} icon={List} title="Lista" disabled={showSource} />
        <ToolbarButton onClick={() => execCommand('formatBlock', 'PRE')} icon={Code} title="Bloque de Código" disabled={showSource} />
        <div className="w-px h-6 bg-gray-300 mx-1" />
        
        <ToolbarButton onClick={openLinkModal} icon={LinkIcon} title="Insertar Enlace SEO" disabled={showSource} />
        <ToolbarButton onClick={openImageModal} icon={ImageIcon} title="Insertar Imagen SEO" disabled={showSource} />
        
        <div className="flex-grow"></div>
        <div className="w-px h-6 bg-gray-300 mx-1" />
        <button
          type="button"
          onClick={() => setShowSource(!showSource)}
          className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded flex items-center gap-2 transition-colors ${
            showSource ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          {showSource ? <Eye className="w-4 h-4" /> : <Code className="w-4 h-4" />}
          {showSource ? 'Ver Visual' : 'Ver Código'}
        </button>
      </div>

      {/* Área de Edición */}
      {showSource ? (
        <textarea
          value={value}
          onChange={handleSourceChange}
          className="w-full p-4 min-h-[400px] font-mono text-sm bg-slate-900 text-green-400 resize-y outline-none rounded-b-lg"
          spellCheck={false}
        />
      ) : (
        <div
          ref={editorRef}
          contentEditable
          onInput={handleInput}
          className="p-4 min-h-[400px] outline-none prose prose-indigo max-w-none overflow-y-auto bg-white text-gray-900"
          suppressContentEditableWarning={true}
        />
      )}

      {/* --- MODAL DE ENLACE --- */}
      {activeModal === 'link' && (
        <div className="fixed inset-0 bg-black/50 z-60 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md animate-in fade-in zoom-in duration-200 mt-32">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-gray-900">Insertar Enlace SEO</h3>
              <button onClick={closeModal} className="text-gray-400 hover:text-gray-600"><X className="w-5 h-5"/></button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">URL Destino</label>
                <input 
                  type="text" 
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none bg-white text-gray-900"
                  placeholder="https://..."
                  value={linkData.url}
                  onChange={e => setLinkData({...linkData, url: e.target.value})}
                />
              </div>
              
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Texto del Enlace</label>
                <input 
                  type="text" 
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none bg-white text-gray-900"
                  placeholder="Texto visible"
                  value={linkData.text}
                  onChange={e => setLinkData({...linkData, text: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Title (SEO Tooltip)</label>
                <input 
                  type="text" 
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none bg-white text-gray-900"
                  placeholder="Descripción al pasar el mouse"
                  value={linkData.title}
                  onChange={e => setLinkData({...linkData, title: e.target.value})}
                />
              </div>

              <div className="flex items-center">
                <input 
                  type="checkbox" 
                  id="newTab"
                  className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                  checked={linkData.openInNewTab}
                  onChange={e => setLinkData({...linkData, openInNewTab: e.target.checked})}
                />
                <label htmlFor="newTab" className="ml-2 text-sm text-gray-700">Abrir en nueva pestaña (Target Blank)</label>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button onClick={closeModal} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded text-sm">Cancelar</button>
                <button 
                  onClick={insertLink}
                  disabled={!linkData.url}
                  className="px-4 py-2 bg-indigo-600 text-white rounded text-sm font-medium hover:bg-indigo-700 disabled:opacity-50"
                >
                  Insertar Enlace
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- MODAL DE IMAGEN --- */}
      {activeModal === 'image' && (
        <div className="fixed inset-0 bg-black/50 z-60 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-gray-900">Insertar Imagen SEO</h3>
              <button onClick={closeModal} className="text-gray-400 hover:text-gray-600"><X className="w-5 h-5"/></button>
            </div>

            <div className="space-y-4">
              
              {/* Subida de Archivo */}
              <div className="bg-gray-50 border border-dashed border-gray-300 rounded-lg p-4 text-center">
                 {uploading ? (
                   <div className="flex flex-col items-center py-2">
                     <Loader2 className="w-8 h-8 text-indigo-600 animate-spin mb-2"/>
                     <span className="text-sm text-gray-500">Subiendo a Cloudinary...</span>
                   </div>
                 ) : (
                   <>
                    {imageData.src ? (
                      <div className="relative mb-2">
                        <img src={imageData.src} alt="Preview" className="h-32 mx-auto object-contain rounded bg-white border" />
                        <button 
                          onClick={() => setImageData({...imageData, src: ''})}
                          className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 transform translate-x-1/2 -translate-y-1/2 shadow-sm"
                        >
                          <X className="w-3 h-3"/>
                        </button>
                      </div>
                    ) : (
                      <label className="cursor-pointer block">
                        <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2"/>
                        <span className="text-sm font-medium text-indigo-600 hover:text-indigo-500">Sube una imagen</span>
                        <span className="text-xs text-gray-500 block mt-1">o pega una URL abajo</span>
                        <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload}/>
                      </label>
                    )}
                   </>
                 )}
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">URL de la Imagen</label>
                <input 
                  type="text" 
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none bg-white text-gray-900"
                  placeholder="https://..."
                  value={imageData.src}
                  onChange={e => setImageData({...imageData, src: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Alt Text (SEO - Importante)</label>
                <input 
                  type="text" 
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none bg-white text-gray-900"
                  placeholder="Descripción de la imagen para accesibilidad y Google"
                  value={imageData.alt}
                  onChange={e => setImageData({...imageData, alt: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Title (Tooltip)</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none bg-white text-gray-900"
                  placeholder="Título visible al pasar el mouse"
                  value={imageData.title}
                  onChange={e => setImageData({...imageData, title: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Tamaño de la Imagen</label>
                <select
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none bg-white text-gray-900"
                  value={imageData.width}
                  onChange={e => setImageData({...imageData, width: e.target.value})}
                >
                  <option value="100%">100% (ancho completo)</option>
                  <option value="75%">75%</option>
                  <option value="50%">50% (mitad)</option>
                  <option value="25%">25% (cuarto)</option>
                  <option value="auto">Auto (tamaño original)</option>
                  <option value="200px">200px fijo</option>
                  <option value="300px">300px fijo</option>
                  <option value="400px">400px fijo</option>
                  <option value="600px">600px fijo</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button onClick={closeModal} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded text-sm">Cancelar</button>
                <button 
                  onClick={insertImage}
                  disabled={!imageData.src}
                  className="px-4 py-2 bg-indigo-600 text-white rounded text-sm font-medium hover:bg-indigo-700 disabled:opacity-50"
                >
                  Insertar Imagen
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
