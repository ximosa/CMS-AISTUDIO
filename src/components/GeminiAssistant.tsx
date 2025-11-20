import React, { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { Sparkles, Loader2, AlertTriangle } from 'lucide-react';

interface GeminiAssistantProps {
  onGeneratedContent: (content: string) => void;
  apiKey: string;
}

export const GeminiAssistant: React.FC<GeminiAssistantProps> = ({ onGeneratedContent, apiKey }) => {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError('El prompt no puede estar vacío.');
      return;
    }
    if (!apiKey) {
      setError('La clave de la API de Gemini no está configurada.');
      return;
    }

    setIsLoading(true);
    setError(null);

    const models = ['gemini-3-pro-preview', 'gemini-2.5-pro', 'gemini-1.5-flash'];
    let success = false;

    const systemPrompt = `
      Eres un experto en SEO y redactor de contenido para blogs. Tu única función es generar fragmentos de código HTML.

      **REGLAS ABSOLUTAS:**
      1.  **SOLO HTML:** Tu respuesta DEBE ser únicamente un fragmento de código HTML.
      2.  **NO MARKDOWN:** No uses NUNCA la sintaxis de Markdown. No escribas \`\`\`html ni \`\`\`. La respuesta debe empezar directamente con una etiqueta HTML como <h2>.
      3.  **ESTRUCTURA SEO:** Usa <h2> para títulos principales y <h3> o <h4> para subtítulos. Es obligatorio para el SEO.
      4.  **ETIQUETAS PERMITIDAS:** Solo puedes usar estas etiquetas: <h2>, <h3>, <h4>, <p>, <ul>, <li>, <code>, <strong>, <em>.
      5.  **RESPUESTA LIMPIA:** NO incluyas <html>, <head>, <body>, o <!DOCTYPE>.

      **Ejemplo de respuesta CORRECTA:**
      <h2>Este es un Título Principal</h2>
      <p>Este es un párrafo de introducción.</p>
      <h3>Este es un Subtítulo</h3>
      <p>Más texto aquí.</p>

      **Ejemplo de respuesta INCORRECTA:**
      \`\`\`html
      <h2>Título</h2>
      <p>Texto...</p>
      \`\`\`

      A continuación, la petición del usuario:
    `;
    const fullPrompt = `${systemPrompt}\n\n${prompt}`;

    for (const modelName of models) {
      try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: modelName });
        const result = await model.generateContent(fullPrompt);
        const response = await result.response;
        const text = response.text();
        onGeneratedContent(text);
        setPrompt(''); // Limpiar el prompt después de generar
        success = true;
        break; // Si tiene éxito, salimos del bucle
      } catch (e: any) {
        console.warn(`El modelo ${modelName} falló. Intentando con el siguiente...`, e);
      }
    }

    if (!success) {
      console.error('Todos los modelos de Gemini fallaron.');
      setError('Error al generar contenido. Todos los modelos fallaron. Revisa la consola.');
    }

    setIsLoading(false);
  };

  return (
    <div className="flex items-center gap-2">
      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Instrucción para IA..."
        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none bg-white text-gray-900 text-sm"
        disabled={isLoading}
      />
      <button
        onClick={handleGenerate}
        disabled={isLoading || !prompt.trim()}
        className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md font-medium hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Generando...
          </>
        ) : (
          <>
            <Sparkles className="w-4 h-4 mr-2" />
            Generar
          </>
        )}
      </button>
      {error && (
        <div className="text-xs text-red-600 flex items-center ml-2">
          <AlertTriangle className="w-3 h-3 mr-1" />
          Error
        </div>
      )}
    </div>
  );
};
