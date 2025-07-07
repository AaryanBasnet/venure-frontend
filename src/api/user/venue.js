import instance from "../api";

export const getAllApprovedVenuesApi = () => {
    return instance.get("/user/venues/getApprovedVenues");

}

export const getVenueByIdApi = (id) => {
  return instance.get(`/user/venues/${id}`);
};