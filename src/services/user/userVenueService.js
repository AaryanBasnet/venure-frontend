import { getAllApprovedVenuesApi } from "../../api/user/venue";

 export const getApprovedVenues = async () => {
    const response = await getAllApprovedVenuesApi();
    return response.data.data;

 }