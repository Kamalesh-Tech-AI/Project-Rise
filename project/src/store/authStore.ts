import { create } from 'zustand';
import { User } from '../types';
import { authAPI } from '../utils/api';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  loginWithGithub: () => Promise<void>;
  register: (name: string, email: string, password: string, role: 'buyer' | 'seller') => Promise<void>;
  logout: () => Promise<void>;
  switchRole: (role: 'buyer' | 'seller') => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: false,
  error: null,
  isAuthenticated: false,

  login: async (email: string, password: string) => {
    set({ isLoading: true, error: null });
    try {
      const user = await authAPI.login(email, password);
      if (user) {
        set({ user, isAuthenticated: true });
      } else {
        set({ error: 'Invalid email or password' });
      }
    } catch (error) {
      set({ error: 'Login failed. Please try again.' });
    } finally {
      set({ isLoading: false });
    }
  },

  loginWithGoogle: async () => {
    set({ isLoading: true, error: null });
    try {
      const user = await authAPI.loginWithGoogle();
      set({ user, isAuthenticated: true });
    } catch (error) {
      set({ error: 'Google login failed. Please try again.' });
    } finally {
      set({ isLoading: false });
    }
  },

  loginWithGithub: async () => {
    set({ isLoading: true, error: null });
    try {
      const user = await authAPI.loginWithGithub();
      set({ user, isAuthenticated: true });
    } catch (error) {
      set({ error: 'GitHub login failed. Please try again.' });
    } finally {
      set({ isLoading: false });
    }
  },

  register: async (name: string, email: string, password: string, role: 'buyer' | 'seller') => {
    set({ isLoading: true, error: null });
    try {
      const user = await authAPI.register(name, email, password, role);
      set({ user, isAuthenticated: true });
    } catch (error) {
      set({ error: 'Registration failed. Please try again.' });
    } finally {
      set({ isLoading: false });
    }
  },

  logout: async () => {
    set({ isLoading: true });
    try {
      await authAPI.logout();
      set({ user: null, isAuthenticated: false });
    } catch (error) {
      set({ error: 'Logout failed' });
    } finally {
      set({ isLoading: false });
    }
  },

  switchRole: async (role: 'buyer' | 'seller') => {
    set({ isLoading: true, error: null });
    try {
      const updatedUser = await authAPI.switchRole(role);
      set({ user: updatedUser });
    } catch (error) {
      set({ error: 'Failed to switch role' });
    } finally {
      set({ isLoading: false });
    }
  },
}));