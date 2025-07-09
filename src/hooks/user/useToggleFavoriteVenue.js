import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toggleFavoriteVenueService } from "../../services/user/favoriteService";
import { toast } from "react-toastify";

export const useToggleFavoriteVenue = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (venueId) => toggleFavoriteVenueService(venueId),

    onSuccess: (data, venueId) => {
      // Show toast based on API response message
      toast.success(
        data.message === "Removed from favorites"
          ? "Removed from Favorites"
          : "Added to Favorites"
      );

      // Refresh favorite venue IDs
      queryClient.invalidateQueries({ queryKey: ["favoriteVenueIds"] });
        queryClient.invalidateQueries({ queryKey: ["favoriteVenues"] }); 
    },

    onError: (error) => {
      toast.error("Failed to update favorite");
      console.error("Error toggling favorite:", error);
    }
  });
};
