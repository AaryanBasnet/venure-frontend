import { useEffect } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { toast } from "react-toastify";
import api from "../../../api/api";

/**
 * Central TanStack Query hook for the venues feature.
 *
 * Uses keepPreviousData (TanStack v5 API) so the previous page's cards
 * stay visible while the next page loads — prevents a jarring blank flash
 * on every page/filter change.
 *
 * The hook unwraps the standard backend envelope:
 *   { success: true, data: [...venues], pages: N }
 */
export const useVenues = (filters = {}) => {
  const query = useQuery({
    queryKey: ["venues", filters],
    queryFn: async () => {
      const res = await api.get("/user/venues/getApprovedVenues", {
        params: filters,
      });
      return res.data; // full envelope — caller can access .data and .pages
    },
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 2, // 2 min — venue lists are stable mid-session
  });

  // Surface network/server errors as toasts so the user gets feedback even
  // if the component renders a graceful empty state instead of an error wall.
  useEffect(() => {
    if (query.isError) {
      toast.error(
        query.error?.response?.data?.message ||
          "Failed to load venues. Please try again."
      );
    }
  }, [query.isError, query.error]);

  return {
    venues: query.data?.data ?? [],
    totalPages: query.data?.pages ?? 1,
    isPending: query.isPending,
    isFetching: query.isFetching, // true during background refetch / page change
    isError: query.isError,
  };
};
