import { create } from "zustand";

export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  isInitializing: true, // true until the /auth/me check resolves on mount

  setUser: (user) =>
    set({ user, isAuthenticated: true, isInitializing: false }),

  clearUser: () =>
    set({ user: null, isAuthenticated: false, isInitializing: false }),
}));
