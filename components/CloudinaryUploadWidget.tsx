import React, { useState } from 'react';
import { Upload, Loader2, Check, X } from 'lucide-react';

interface CloudinaryUploadWidgetProps {
  onUploadSuccess: (url: string) => void;
}

const CLOUDINARY_CLOUD_NAME = 'djjiagkho';
const CLOUDINARY_UPLOAD_PRESET = 'blog_upload';

export const CloudinaryUploadWidget: React.FC<CloudinaryUploadWidgetProps> = ({ onUploadSuccess }) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    setUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error?.message || 'Error subiendo imagen');
      }

      const data = await response.json();
      onUploadSuccess(data.secure_url);
    } catch (err: any) {
      console.error('Upload error:', err);
      setError('Error al subir. Revisa el preset.');
      setFileName(null);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="w-full text-center">
      <label className="cursor-pointer inline-flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg hover:bg-gray-50 transition-colors">
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          {uploading ? (
            <>
              <Loader2 className="w-8 h-8 mb-3 text-indigo-500 animate-spin" />
              <p className="mb-2 text-sm text-gray-500">Subiendo...</p>
            </>
          ) : (
            <>
              <Upload className="w-8 h-8 mb-3 text-gray-400" />
              <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Haz clic para subir</span> o arrastra</p>
            </>
          )}
        </div>
        <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} disabled={uploading} />
      </label>
      {error && (
        <p className="mt-2 text-sm text-red-600 flex items-center justify-center">
           <X className="w-4 h-4 mr-1" /> {error}
        </p>
      )}
      {fileName && !uploading && !error && (
        <p className="mt-2 text-sm text-green-600 flex items-center justify-center">
           <Check className="w-4 h-4 mr-1" /> {fileName}
        </p>
      )}
    </div>
  );
};