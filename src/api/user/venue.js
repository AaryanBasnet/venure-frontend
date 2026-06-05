import instance from "../api";

export const getFilteredVenuesApi = (filters) => {
  return instance.get("/venues", { params: filters });
};

export const getVenueByIdApi = (id) => {
  return instance.get(`/venues/${id}`);
};


