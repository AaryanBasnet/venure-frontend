import instance from "../api";

export const getAllApprovedVenuesApi = () => {
    console.log("Fetching Approved venues");
    return instance.get("/user/venues/getApprovedVenues");

}

export const getVenueByIdApi = (id) => {
      console.log("📦 api received ID:", id); // <-- should match route ID
  return instance.get(`/user/venues/${id}`);
};