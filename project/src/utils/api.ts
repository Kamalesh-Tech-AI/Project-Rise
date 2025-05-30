import { mockProjects, mockUsers } from './mockData';
import { Project, User, Purchase, ProjectType, ProjectStatus } from '../types';

// Simulate API delays
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Authentication API
export const authAPI = {
  login: async (email: string, password: string): Promise<User | null> => {
    await delay(800);
    const user = mockUsers.find(u => u.email === email);
    return user || null;
  },
  
  loginWithGoogle: async (): Promise<User> => {
    await delay(1000);
    return mockUsers[0]; // Return a mock buyer user
  },
  
  loginWithGithub: async (): Promise<User> => {
    await delay(1000);
    return mockUsers[1]; // Return a mock seller user
  },
  
  register: async (name: string, email: string, password: string, role: 'buyer' | 'seller'): Promise<User> => {
    await delay(1200);
    const newUser: User = {
      id: `user-${Date.now()}`,
      name,
      email,
      role,
    };
    return newUser;
  },

  logout: async (): Promise<void> => {
    await delay(500);
    // In a real app, this would clear cookies, tokens, etc.
  },

  switchRole: async (role: 'buyer' | 'seller'): Promise<User> => {
    await delay(800);
    // In a real app, this would update the user's role in the database
    return {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      role,
    };
  },
};

// Projects API
export const projectsAPI = {
  getProjects: async (filter?: { status?: ProjectStatus }): Promise<Project[]> => {
    await delay(800);
    if (filter?.status) {
      return mockProjects.filter(p => p.status === filter.status);
    }
    return mockProjects.filter(p => p.status === 'approved');
  },
  
  getProjectById: async (id: string): Promise<Project | null> => {
    await delay(600);
    return mockProjects.find(p => p.id === id) || null;
  },
  
  uploadProject: async (
    projectData: {
      title: string;
      description: string;
      type: ProjectType;
      category: string;
      price: number;
      previewUrl?: string;
      screenshots: File[];
    },
    file: File
  ): Promise<{ success: boolean; message: string }> => {
    await delay(1500);
    return { 
      success: true, 
      message: 'Project submitted successfully and is pending review.' 
    };
  },
  
  purchaseProject: async (projectId: string): Promise<Purchase> => {
    await delay(1000);
    const purchase: Purchase = {
      id: `purchase-${Date.now()}`,
      projectId,
      buyerId: mockUsers[0].id,
      purchaseDate: new Date().toISOString(),
      downloadUrl: `https://download.example.com/${projectId}?token=one-time-token`,
      downloaded: false
    };
    return purchase;
  },
  
  downloadProject: async (purchaseId: string): Promise<{ success: boolean; url?: string }> => {
    await delay(800);
    return {
      success: true,
      url: 'https://example.com/download-completed'
    };
  }
};

// Admin API
export const adminAPI = {
  getPendingProjects: async (): Promise<Project[]> => {
    await delay(700);
    return mockProjects.filter(p => p.status === 'pending');
  },
  
  reviewProject: async (
    projectId: string, 
    decision: 'approve' | 'reject', 
    feedback?: string
  ): Promise<{ success: boolean }> => {
    await delay(900);
    return { success: true };
  },
  
  assignDeveloperStatus: async (userId: string): Promise<{ success: boolean; credentials?: { username: string; password: string } }> => {
    await delay(1200);
    return { 
      success: true,
      credentials: {
        username: 'developer123',
        password: 'temp-password-123'
      }
    };
  }
};