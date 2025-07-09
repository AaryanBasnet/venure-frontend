import { useQuery } from "@tanstack/react-query";
import { getMyBookingsService } from "../../services/user/bookingService";

export const useMyBookings = () => {
  return useQuery({
    queryKey: ["myBookings"],
    queryFn: getMyBookingsService,
    staleTime: 2 * 60 * 1000,
    retry: 1,
  });
};
