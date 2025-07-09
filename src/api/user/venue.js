import instance from "../api";

export const getFilteredVenuesApi = (filters) => {
  return instance.get("/user/venues/getApprovedVenues", { params: filters });
};

export const getVenueByIdApi = (id) => {
  return instance.get(`/user/venues/${id}`);
};


