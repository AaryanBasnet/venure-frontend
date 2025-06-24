import instance from "../api";

export const getAllApprovedVenuesApi = () => {
    console.log("Fetching Approved venues");
    return instance.get("/user/venues/getApprovedVenues");



}