import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { cancelBookingService } from "../../services/venueOwner/venueBooking";

const useCancelBooking = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: cancelBookingService,
    onSuccess: () => {
      toast.success("Booking canceled successfully");
      queryClient.invalidateQueries(["owner_bookings"]); // refresh bookings
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Failed to cancel booking");
    },
  });
};

export default useCancelBooking;
