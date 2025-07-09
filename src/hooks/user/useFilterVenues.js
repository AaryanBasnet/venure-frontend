import { useQuery } from "@tanstack/react-query";
import { getApprovedVenues } from "../../services/user/venueService";

export const useFilterVenues = (filters) => {
  return useQuery({
    queryKey: ["venues", filters],
    queryFn: () => getApprovedVenues(filters),
    keepPreviousData: true, // keeps old data while fetching new data (good for pagination)
  });
};
