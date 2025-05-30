export type UserRole = 'buyer' | 'seller' | 'developer' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export type ProjectType = 'website' | 'portfolio' | 'custom' | 'phd';

export type ProjectStatus = 'pending' | 'approved' | 'rejected';

export interface Project {
  id: string;
  title: string;
  description: string;
  type: ProjectType;
  category: string;
  price: number;
  previewUrl?: string;
  screenshots: string[];
  seller: {
    id: string;
    name: string;
    rating: number;
  };
  status: ProjectStatus;
  createdAt: string;
}

export interface Purchase {
  id: string;
  projectId: string;
  buyerId: string;
  purchaseDate: string;
  downloadUrl: string;
  downloaded: boolean;
}