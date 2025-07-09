import { useQuery } from "@tanstack/react-query";
import { getTotalBookingsForOwnerService } from "../../services/venueOwner/venueBooking";

export const useGetTotalBookingsForOwner = () => {
  return useQuery({
    queryKey: ["total_bookings"],
    queryFn: getTotalBookingsForOwnerService,
  });
};
