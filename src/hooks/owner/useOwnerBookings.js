// hooks/useOwnerBookings.js
import { useQuery } from "@tanstack/react-query";
import { fetchBookingsForOwnerService } from "../../services/venueOwner/venueBooking";

const useOwnerBookings = () => {
  return useQuery({
    queryKey: ["owner_bookings"],
    queryFn: fetchBookingsForOwnerService,
  });
};

export default useOwnerBookings;
