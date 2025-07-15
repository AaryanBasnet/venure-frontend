import { useQuery } from "@tanstack/react-query";
import { getTopVenuesByBookingService } from "../../services/admin/dashboardService";

export const useTopVenuesByBooking = () => {
  return useQuery({
    queryKey: ["topVenuesByBooking"],
    queryFn: getTopVenuesByBookingService,
    staleTime: 5 * 60 * 1000, // cache for 5 minutes
    retry: 1,
  });
};
