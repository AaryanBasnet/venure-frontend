import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getMeApi } from "../../api/authApi";
import { useAuthStore } from "../../store/authStore";

/**
 * Runs once on app mount. Hits /auth/me (which is validated by the
 * HTTP-Only access-token cookie). On success the Zustand store is
 * hydrated with the user object. On failure (no session / truly
 * expired) the store is cleared so the app knows no user is active.
 *
 * staleTime: Infinity — the session is cookie-driven; TanStack Query
 * should never speculatively refetch this in the background.
 */
export const useFetchMe = () => {
  const setUser = useAuthStore((s) => s.setUser);
  const clearUser = useAuthStore((s) => s.clearUser);

  const query = useQuery({
    queryKey: ["auth", "me"],
    queryFn: async () => {
      const res = await getMeApi();
      return res.data.data; // { _id, name, email, role, ... }
    },
    retry: false,
    staleTime: Infinity,
  });

  useEffect(() => {
    if (query.isSuccess && query.data) {
      setUser(query.data);
    }
  }, [query.isSuccess, query.data, setUser]);

  useEffect(() => {
    if (query.isError) {
      clearUser();
    }
  }, [query.isError, clearUser]);

  return query;
};
