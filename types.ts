import React from 'react';

export interface BlogPost {
  id?: number;
  created_at?: string;
  title: string;
  summary: string;
  content: string;
  image_url: string;
}

export interface ServiceItem {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export interface MediaItem {
  id: number;
  created_at: string;
  url: string;
}

// Extend Window interface for Cloudinary
declare global {
  interface Window {
    cloudinary: {
      createUploadWidget: (
        options: any,
        callback: (error: any, result: any) => void
      ) => any;
    };
  }
}