import { useQuery } from "@tanstack/react-query";
import { getFavoriteVenueIdsService } from "../../services/user/favoriteService";

export const useGetFavoriteVenueIds = () => {
  return useQuery({
    queryKey: ["favoriteVenueIds"],
    queryFn: getFavoriteVenueIdsService,
    staleTime: 5 * 60 * 1000, // 5 minutes cache
    retry: 1,
    refetchOnWindowFocus: false,
  });
};
