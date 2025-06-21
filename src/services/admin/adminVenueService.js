import { getAllVenues } from "../../api/admin/venueManagementApi";

export const getVenue = async() => {
    const response = await getAllVenues();
    return response.data.data;

}