import instance from "../api";

export const toggleFavoriteVenue = async (venueId) => {
  return instance.post(`/user/favorites/${venueId}`);
};

export const getFavoriteVenueIds = async () => {
  const res = await instance.get(`/user/favorites`);
  return res.data.favorites.map((v) => v._id);
};

export const getFavoriteVenuesApi = async () => {
  console.log("favourite venues", getFavoriteVenuesApi);
  return await instance.get("/user/favorites/venues"); // adjust base URL if needed
};
