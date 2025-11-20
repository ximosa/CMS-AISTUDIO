export interface BlogPost {
  id?: number;
  title: string;
  slug?: string;
  summary?: string;
  content: string;
  image_url?: string;
  created_at?: string;
}

export interface ServiceItem {
  title: string;
  description: string;
  icon: string;
}

export interface Comment {
  id: number;
  created_at: string;
  post_id: number;
  parent_id: number | null;
  author_name: string;
  author_email: string;
  content: string;
  approved: boolean;
  replies?: Comment[];
}

export interface Project {
  id: number;
  title: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  mainImage: string;
  galleryImages?: string[];
  technologies: string[];
  category: string;
  projectUrl?: string;
  repoUrl?: string;
  client?: string;
  completedDate?: string;
  featured?: boolean;
}