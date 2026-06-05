import React, { createContext, useEffect, useCallback } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import api from "../api/api";
import { useAuthStore } from "../store/authStore";
import { useFetchMe } from "../hooks/auth/useFetchMe";
import { connectSocket, disconnectSocket } from "../lib/socket";

/**
 * AuthContext still exists so every existing route guard and layout that
 * calls useContext(AuthContext) keeps working without changes in Phase 3.
 * Internally the truth lives in Zustand — this context is a thin bridge.
 */
export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const { user, isAuthenticated, clearUser, isInitializing } = useAuthStore();
  const queryClient = useQueryClient();

  // Hydrate Zustand from the HTTP-Only cookie on every cold load / tab-open.
  useFetchMe();

  // ── Session-expired handler ───────────────────────────────────────────────
  // The axios interceptor fires this when BOTH the access token AND the
  // refresh token are dead.  We only redirect when the store is fully
  // initialized; if isInitializing is still true we got here during the
  // very first /auth/me check which means there was simply never a session.
  const handleSessionExpired = useCallback(() => {
    const { isInitializing: stillInit } = useAuthStore.getState();

    clearUser();
    queryClient.clear();
    disconnectSocket();

    if (!stillInit) {
      toast.error("Your session has expired. Please log in again.");
      window.location.replace("/login");
    }
  }, [clearUser, queryClient]);

  useEffect(() => {
    window.addEventListener("auth:session-expired", handleSessionExpired);
    return () =>
      window.removeEventListener("auth:session-expired", handleSessionExpired);
  }, [handleSessionExpired]);

  // ── Socket lifecycle ──────────────────────────────────────────────────────
  // Connect once we know the userId; disconnect on logout / unauthenticated.
  useEffect(() => {
    if (user?._id) {
      connectSocket(user._id);
    } else {
      disconnectSocket();
    }
  }, [user?._id]);

  // ── Logout ────────────────────────────────────────────────────────────────
  // Fire-and-forget the server call so the UI clears immediately.
  // Cookie is cleared server-side asynchronously.
  const logout = useCallback(() => {
    api.post("/auth/logout").catch(() => {});
    clearUser();
    queryClient.clear();
    disconnectSocket();
  }, [clearUser, queryClient]);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading: isInitializing,
        isAuthenticated,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
