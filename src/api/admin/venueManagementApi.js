import instance from "../api";

export const getAllVenues = () => {
  console.log("Fetching venues with params:");
  return instance.get("/admin/venues");
};