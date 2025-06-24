import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getApprovedVenues } from "../../services/user/userVenueService";

export const useGetApprovedVenue = () => {
  return useQuery({
    queryKey: ["approved_venues"],
    queryFn: getApprovedVenues,
    
    keepPreviousData: true,
  });
};
