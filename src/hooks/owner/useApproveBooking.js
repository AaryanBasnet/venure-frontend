import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { approveBookingService } from "../../services/venueOwner/venueBooking";

const useApproveBooking = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: approveBookingService,
    onSuccess: () => {
      toast.success("Booking approved successfully");
      queryClient.invalidateQueries(["owner_bookings"]);
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Failed to approve booking");
    },
  });
};

export default useApproveBooking;
