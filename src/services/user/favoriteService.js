import { getFavoriteVenueIds, getFavoriteVenuesApi, toggleFavoriteVenue } from "../../api/user/favorite";

export const toggleFavoriteVenueService = async (venueId) => {
  const res = await toggleFavoriteVenue(venueId);
  return res.data;
};

export const getFavoriteVenueIdsService = async () => {
  const res = await getFavoriteVenueIds();
  return res;
};


export const getFavoriteVenuesApiService = async () => {
    const res = await getFavoriteVenuesApi();
    return res.data;
}