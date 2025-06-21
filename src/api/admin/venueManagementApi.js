import instance from "../api";

export const getAllVenues = () => {
  console.log("Fetching venues with params:");
  return instance.get("/admin/venues");
};

export const updateVenueStatus = (id, status) => {
  console.log("Status update:", id, status);
  // status is a string like "approved"
  return instance.patch(`/admin/venues/${id}/status`, { status });
};