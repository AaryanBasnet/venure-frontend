import { useQuery } from "@tanstack/react-query";
import api from "../../../api/api";

/** Admin-curated featured venues for the "Our Finest Heritage Spaces" section. */
export function useFeaturedVenues() {
  const query = useQuery({
    queryKey: ["venues", "featured"],
    queryFn: async () => {
      const res = await api.get("/venues/featured");
      return res.data.data;
    },
    staleTime: 1000 * 60 * 5,
  });

  return {
    venues: query.data ?? [],
    isPending: query.isPending,
    isError: query.isError,
  };
}
