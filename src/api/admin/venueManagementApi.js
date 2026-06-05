import instance from "../api";

export const getAllVenues = (params) => {
  return instance.get("/admin/venues", { params });
};

export const getApprovedVenuesCount = () => {
  return instance.get("/admin/venues/getApprovedCount");
};

export const updateVenueStatus = (id, status) => {
  return instance.patch(`/admin/venues/${id}/status`, { status });
};
