import { useQuery } from "@tanstack/react-query";
import api from "../../../api/api";

/**
 * Approved-venue counts per category, keyed by slug (e.g. { "garden-estates": 4 }).
 * Missing keys mean zero venues — the venue-type cards render without a count
 * rather than showing an error, since this is decorative on a public landing page.
 */
export function useCategoryCounts() {
  const query = useQuery({
    queryKey: ["venues", "category-counts"],
    queryFn: async () => {
      const res = await api.get("/venues/categories/counts");
      return res.data.data;
    },
    staleTime: 1000 * 60 * 5,
  });

  return { counts: query.data ?? {}, isPending: query.isPending };
}
