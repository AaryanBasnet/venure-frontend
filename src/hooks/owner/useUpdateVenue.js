import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateVenueService } from "../../services/venueOwner/venueService";

export const useUpdateVenue = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ venueId, updatedData }) =>
      updateVenueService({ venueId, updatedData }),
    onSuccess: (_, variables) => {
      const ownerId = variables.updatedData.ownerId; // or pass it explicitly
      queryClient.invalidateQueries(["venuesByOwner", ownerId]);
      queryClient.invalidateQueries(["venues"]);
    },
    onError: (error) => {
      console.error("Update venue mutation error:", error);
    },
  });
};
