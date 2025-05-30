import { create } from 'zustand';
import { Project } from '../types';
import { adminAPI } from '../utils/api';

interface AdminState {
  pendingProjects: Project[];
  isLoading: boolean;
  error: string | null;
  fetchPendingProjects: () => Promise<void>;
  reviewProject: (projectId: string, decision: 'approve' | 'reject', feedback?: string) => Promise<boolean>;
  assignDeveloperStatus: (userId: string) => Promise<{ success: boolean; credentials?: { username: string; password: string } }>;
}

export const useAdminStore = create<AdminState>((set) => ({
  pendingProjects: [],
  isLoading: false,
  error: null,

  fetchPendingProjects: async () => {
    set({ isLoading: true, error: null });
    try {
      const projects = await adminAPI.getPendingProjects();
      set({ pendingProjects: projects });
    } catch (error) {
      set({ error: 'Failed to fetch pending projects' });
    } finally {
      set({ isLoading: false });
    }
  },

  reviewProject: async (projectId, decision, feedback) => {
    set({ isLoading: true, error: null });
    try {
      const result = await adminAPI.reviewProject(projectId, decision, feedback);
      if (result.success) {
        // Remove the project from the pending list
        set(state => ({
          pendingProjects: state.pendingProjects.filter(p => p.id !== projectId)
        }));
        return true;
      }
      return false;
    } catch (error) {
      set({ error: 'Failed to review project' });
      return false;
    } finally {
      set({ isLoading: false });
    }
  },

  assignDeveloperStatus: async (userId) => {
    set({ isLoading: true, error: null });
    try {
      const result = await adminAPI.assignDeveloperStatus(userId);
      return result;
    } catch (error) {
      set({ error: 'Failed to assign developer status' });
      return { success: false };
    } finally {
      set({ isLoading: false });
    }
  }
}));