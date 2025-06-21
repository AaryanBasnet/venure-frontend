import { useQuery } from "@tanstack/react-query";
import { fetchVenuesByOwnerService } from "../../services/venueOwner/venueService";

export const useVenuesByOwner = (ownerId) => {
  return useQuery({
    queryKey: ["venuesByOwner", ownerId],
    queryFn: () => fetchVenuesByOwnerService(ownerId),
    enabled: !!ownerId, // only fetch if ownerId is valid
    staleTime: 5 * 60 * 1000, // 5 minutes caching for example
  });
};
