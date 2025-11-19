import React, { useRef, useState, useEffect } from 'react';
import { 
  Bold, Italic, Heading1, Heading2, List, Link as LinkIcon, 
  Image as ImageIcon, Code, X, Upload, Loader2, Type, 
  Undo, Eye, Grid 
} from 'lucide-react';
import { supabase } from '../supabaseClient';
import { MediaItem } from '../types';
import { CloudinaryUploadWidget } from './CloudinaryUploadWidget';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
}

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
  
  // --- Estados de Modales ---
  const [linkData, setLinkData] = useState<LinkData>({ url: '', text: '', title: '', openInNewTab: true });
  const [imageData, setImageData] = useState<ImageData>({ src: '', alt: '', title: '', width: '100%' });
  
  // --- Estados de Galería ---
  const [galleryTab, setGalleryTab] = useState<'upload' | 'library'>('upload');
  const [mediaLibrary, setMediaLibrary] = useState<MediaItem[]>([]);
  const [loadingMedia, setLoadingMedia] = useState(false);

  // Sincronizar contenido
  useEffect(() => {
    if (!showSource && editorRef.current && editorRef.current.innerHTML !== value) {
      if (editorRef.current.innerHTML === '' || value === '') {
          editorRef.current.innerHTML = value;
      } else if (document.activeElement !== editorRef.current) {
          editorRef.current.innerHTML = value;
      }
    }
  }, [value, showSource]);

  // Cargar galería al abrir el tab
  useEffect(() => {
    if (activeModal === 'image' && galleryTab === 'library') {
      fetchMediaLibrary();
    }
  }, [activeModal, galleryTab]);

  const fetchMediaLibrary = async () => {
    setLoadingMedia(true);
    try {
      const { data, error } = await supabase.from('media_library').select('*').order('created_at', { ascending: false });
      if (error) console.warn("Error cargando galería (posible RLS):", error);
      setMediaLibrary(data || []);
    } catch (e) {
      console.warn("Excepción cargando galería:", e);
    } finally {
      setLoadingMedia(false);
    }
  };

  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const handleSourceChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

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

  const execCommand = (command: string, value: string | undefined = undefined) => {
    if (showSource) return;
    document.execCommand(command, false, value);
    handleInput();
    editorRef.current?.focus();
  };

  const handleUndo = () => {
    execCommand('undo');
  };

  // --- Enlaces ---
  const openLinkModal = () => {
    if (showSource) return;
    saveSelection();
    const selection = window.getSelection();
    const selectedText = selection ? selection.toString() : '';
    setLinkData({ url: '', text: selectedText, title: '', openInNewTab: true });
    setActiveModal('link');
  };

  const insertLink = () => {
    restoreSelection();
    if (!savedRange) return;
    
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

  // --- Imágenes ---
  const openImageModal = () => {
    if (showSource) return;
    saveSelection();
    setImageData({ src: '', alt: '', title: '', width: '100%' });
    setGalleryTab('upload'); // Reset a upload
    setActiveModal('image');
  };

  const handleCloudinarySuccess = async (url: string) => {
    // 1. Setear la URL en el input del modal INMEDIATAMENTE
    setImageData(prev => ({ ...prev, src: url }));
    
    // 2. Intentar guardar en Supabase, pero ignorar errores para no bloquear al usuario
    try {
      const { error } = await supabase.from('media_library').insert([{ url }]);
      if (error) console.warn("No se pudo guardar en historial (RLS):", error.message);
    } catch (e) {
      console.warn("Error de conexión al guardar historial:", e);
    }
  };

  const selectFromGallery = (url: string) => {
    setImageData(prev => ({ ...prev, src: url }));
    // Volver a la pestaña de detalles para rellenar el ALT
    setGalleryTab('upload');
  };

  const insertImage = () => {
    restoreSelection();
    if (!savedRange) return;

    const img = document.createElement('img');
    img.src = imageData.src;
    img.alt = imageData.alt;
    img.title = imageData.title;
    img.className = "rounded-lg my-4 shadow-sm max-w-full";
    if (imageData.width) img.style.width = imageData.width;

    savedRange.insertNode(img);
    savedRange.collapse(false);
    
    handleInput();
    closeModal();
  };

  const closeModal = () => {
    setActiveModal(null);
    setSavedRange(null);
  };

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
      {/* Barra */}
      <div className="flex flex-wrap items-center gap-1 p-2 border-b border-gray-200 bg-gray-50 rounded-t-lg sticky top-0 z-10">
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
        <ToolbarButton onClick={openImageModal} icon={ImageIcon} title="Gestor de Imágenes" disabled={showSource} />
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
          {showSource ? 'Visual' : 'HTML'}
        </button>
      </div>

      {/* Editor */}
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
        <div className="absolute inset-0 bg-black/50 z-50 flex items-center justify-center p-4 rounded-lg">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-gray-900">Insertar Enlace SEO</h3>
              <button onClick={closeModal} className="text-gray-400 hover:text-gray-600"><X className="w-5 h-5"/></button>
            </div>
            <div className="space-y-4">
              <input 
                type="text" 
                className="w-full border rounded px-3 py-2 text-sm text-gray-900 bg-white"
                placeholder="https://..."
                value={linkData.url}
                onChange={e => setLinkData({...linkData, url: e.target.value})}
              />
              <input 
                type="text" 
                className="w-full border rounded px-3 py-2 text-sm text-gray-900 bg-white"
                placeholder="Texto visible"
                value={linkData.text}
                onChange={e => setLinkData({...linkData, text: e.target.value})}
              />
              <input 
                type="text" 
                className="w-full border rounded px-3 py-2 text-sm text-gray-900 bg-white"
                placeholder="Title (Tooltip)"
                value={linkData.title}
                onChange={e => setLinkData({...linkData, title: e.target.value})}
              />
              <div className="flex items-center">
                <input 
                  type="checkbox" 
                  checked={linkData.openInNewTab}
                  onChange={e => setLinkData({...linkData, openInNewTab: e.target.checked})}
                  className="mr-2"
                />
                <label className="text-sm text-gray-700">Abrir en nueva pestaña</label>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button onClick={closeModal} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded text-sm">Cancelar</button>
                <button 
                  onClick={insertLink}
                  disabled={!linkData.url}
                  className="px-4 py-2 bg-indigo-600 text-white rounded text-sm hover:bg-indigo-700"
                >
                  Insertar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- MODAL DE IMAGEN (Con Widget Cloudinary) --- */}
      {activeModal === 'image' && (
        <div className="absolute inset-0 bg-black/50 z-50 flex items-center justify-center p-4 rounded-lg">
          <div className="bg-white p-0 rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col animate-in fade-in zoom-in duration-200">
            
            {/* Header Tabs */}
            <div className="flex border-b bg-gray-50">
              <button 
                className={`px-6 py-3 font-medium text-sm ${galleryTab === 'upload' ? 'bg-white text-indigo-600 border-t-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
                onClick={() => setGalleryTab('upload')}
              >
                <Upload className="w-4 h-4 inline mr-2"/> Subir / URL
              </button>
              <button 
                className={`px-6 py-3 font-medium text-sm ${galleryTab === 'library' ? 'bg-white text-indigo-600 border-t-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
                onClick={() => setGalleryTab('library')}
              >
                <Grid className="w-4 h-4 inline mr-2"/> Historial (Galería)
              </button>
              <div className="flex-grow flex justify-end items-center pr-4">
                <button onClick={closeModal} className="text-gray-400 hover:text-gray-600"><X className="w-5 h-5"/></button>
              </div>
            </div>

            <div className="p-6 overflow-y-auto flex-grow">
              {galleryTab === 'upload' ? (
                <div className="space-y-6">
                  {/* Botón Widget Cloudinary */}
                  <div className="border-2 border-dashed border-indigo-100 bg-indigo-50 rounded-lg p-8 flex flex-col items-center justify-center text-center">
                    <CloudinaryUploadWidget 
                      onUpload={handleCloudinarySuccess} 
                      buttonText="Abrir Subidor de Cloudinary"
                    />
                    <p className="text-xs text-gray-500 mt-2">Formatos: JPG, PNG, WebP</p>
                  </div>

                  <div className="relative py-2">
                    <div className="absolute inset-0 flex items-center" aria-hidden="true">
                      <div className="w-full border-t border-gray-200"></div>
                    </div>
                    <div className="relative flex justify-center">
                      <span className="px-2 bg-white text-sm text-gray-500">O ingresa datos manualmente</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase mb-1">URL Imagen</label>
                      <div className="flex gap-2">
                         <input 
                            type="text" 
                            className="flex-grow border rounded px-3 py-2 text-sm text-gray-900 bg-white"
                            placeholder="https://..."
                            value={imageData.src}
                            onChange={e => setImageData({...imageData, src: e.target.value})}
                          />
                          {imageData.src && (
                            <div className="w-10 h-10 border rounded overflow-hidden bg-gray-100 flex-shrink-0">
                              <img src={imageData.src} className="w-full h-full object-cover" alt="preview"/>
                            </div>
                          )}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Alt Text (SEO)</label>
                        <input 
                          type="text" 
                          className="w-full border rounded px-3 py-2 text-sm text-gray-900 bg-white"
                          placeholder="Descripción"
                          value={imageData.alt}
                          onChange={e => setImageData({...imageData, alt: e.target.value})}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Title (Tooltip)</label>
                        <input 
                          type="text" 
                          className="w-full border rounded px-3 py-2 text-sm text-gray-900 bg-white"
                          placeholder="Título"
                          value={imageData.title}
                          onChange={e => setImageData({...imageData, title: e.target.value})}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                // Tab Galería
                <div className="h-full">
                  {loadingMedia ? (
                    <div className="flex justify-center py-10"><Loader2 className="animate-spin text-indigo-600"/></div>
                  ) : mediaLibrary.length === 0 ? (
                    <div className="text-center text-gray-500 py-10">
                      No hay imágenes en el historial.<br/>
                      <span className="text-xs">Nota: Si la subida falló en guardarse aquí, revisa las políticas RLS en Supabase.</span>
                    </div>
                  ) : (
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
                      {mediaLibrary.map((item) => (
                        <button 
                          key={item.id}
                          onClick={() => selectFromGallery(item.url)}
                          className="group relative aspect-square border rounded-lg overflow-hidden hover:ring-2 hover:ring-indigo-500 focus:outline-none"
                        >
                          <img src={item.url} alt="" className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all"/>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="bg-gray-50 p-4 flex justify-end gap-2 border-t">
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
      )}
    </div>
  );
};