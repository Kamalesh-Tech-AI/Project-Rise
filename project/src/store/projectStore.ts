import { create } from 'zustand';
import { Project, ProjectType, Purchase } from '../types';
import { projectsAPI } from '../utils/api';

interface ProjectState {
  projects: Project[];
  currentProject: Project | null;
  userProjects: Project[];
  purchases: Purchase[];
  isLoading: boolean;
  error: string | null;
  fetchProjects: () => Promise<void>;
  fetchProjectById: (id: string) => Promise<void>;
  uploadProject: (projectData: {
    title: string;
    description: string;
    type: ProjectType;
    category: string;
    price: number;
    previewUrl?: string;
    screenshots: File[];
  }, file: File) => Promise<{ success: boolean; message: string }>;
  purchaseProject: (projectId: string) => Promise<Purchase>;
  downloadProject: (purchaseId: string) => Promise<{ success: boolean; url?: string }>;
}

export const useProjectStore = create<ProjectState>((set, get) => ({
  projects: [],
  currentProject: null,
  userProjects: [],
  purchases: [],
  isLoading: false,
  error: null,

  fetchProjects: async () => {
    set({ isLoading: true, error: null });
    try {
      const projects = await projectsAPI.getProjects();
      set({ projects });
    } catch (error) {
      set({ error: 'Failed to fetch projects' });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchProjectById: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      const project = await projectsAPI.getProjectById(id);
      if (project) {
        set({ currentProject: project });
      } else {
        set({ error: 'Project not found' });
      }
    } catch (error) {
      set({ error: 'Failed to fetch project details' });
    } finally {
      set({ isLoading: false });
    }
  },

  uploadProject: async (projectData, file) => {
    set({ isLoading: true, error: null });
    try {
      const result = await projectsAPI.uploadProject(projectData, file);
      return result;
    } catch (error) {
      set({ error: 'Failed to upload project' });
      return { success: false, message: 'Failed to upload project' };
    } finally {
      set({ isLoading: false });
    }
  },

  purchaseProject: async (projectId: string) => {
    set({ isLoading: true, error: null });
    try {
      const purchase = await projectsAPI.purchaseProject(projectId);
      set(state => ({ purchases: [...state.purchases, purchase] }));
      return purchase;
    } catch (error) {
      set({ error: 'Failed to purchase project' });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  downloadProject: async (purchaseId: string) => {
    set({ isLoading: true, error: null });
    try {
      const result = await projectsAPI.downloadProject(purchaseId);
      if (result.success) {
        // Mark the purchase as downloaded
        set(state => ({
          purchases: state.purchases.map(p => 
            p.id === purchaseId ? { ...p, downloaded: true } : p
          )
        }));
      }
      return result;
    } catch (error) {
      set({ error: 'Failed to download project' });
      return { success: false };
    } finally {
      set({ isLoading: false });
    }
  }
}));