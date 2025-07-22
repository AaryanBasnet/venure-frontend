import { useMutation } from "@tanstack/react-query";
import { createBookingService } from "../../services/user/bookingService";
import { toast } from "react-toastify";

export const useCreateBooking = () => {
  return useMutation({
    mutationFn: async ({ bookingData, stripe, cardElement, elements }) => {
      return await createBookingService(
        bookingData,
        stripe,
        cardElement,
        elements
      );
    },
    mutationKey: ["create_booking"],

    onSuccess: (data) => {
      console.log(data);
      toast.success("Booking Successful");
    },
    onError: (err) => {
      console.log(err);
      toast.error(err.message || "Booking failed");
    },
  });
};
