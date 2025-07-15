// hooks/user/useFavoriteVenues.js
import { useQuery } from "@tanstack/react-query";
import { getFavoriteVenuesApiService } from "../../services/user/favoriteService";

export const useFavoriteVenues = (options = {}) => {
  return useQuery({
    queryKey: ["favoriteVenues"],
    queryFn: getFavoriteVenuesApiService,
    staleTime: 5 * 60 * 1000,
    retry: 1,
    refetchOnWindowFocus: false,
    ...options,
  });
};
