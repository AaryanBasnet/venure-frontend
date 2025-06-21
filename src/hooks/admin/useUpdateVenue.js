import { useMutation } from "@tanstack/react-query";
import { updateVenueService } from "../../services/venueOwner/venueService";
export const useUpdateVenue = () => {
  return useMutation({
    mutationFn: ({ venueId, updatedData, newImages }) =>
      updateVenueService({ venueId, updatedData, newImages }),
  });
};
