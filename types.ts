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