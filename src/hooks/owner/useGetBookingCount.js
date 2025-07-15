import { useQuery } from "@tanstack/react-query";
import { getApprovedBookingsForVenueService } from "../../services/venueOwner/venueBooking";
const useGetBookingCount = (venueIds) => {
  return useQuery({
    queryKey: ["venue_booking_count", venueIds],
    queryFn: () => getApprovedBookingsForVenueService(venueIds), // ✅ FIXED
    enabled: !!venueIds && venueIds.length > 0,
    
  });
};

export default useGetBookingCount;
