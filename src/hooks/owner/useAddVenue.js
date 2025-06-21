import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { addVenueService } from "../../services/venueOwner/venueService";

export default function useAddVenue() {
  return useMutation({
    mutationKey: ["create_venue"],
    mutationFn: addVenueService,
    onSuccess: (data) => {
      toast.success(data.message || "Venue created successfully");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to create venue");
    },
  });
}
