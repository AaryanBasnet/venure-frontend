import {
  getAllVenues,
  updateVenueStatus,
} from "../../api/admin/venueManagementApi";

export const getVenue = async () => {
  const response = await getAllVenues();
  return response.data.data;
};

export const changeVenueStatus = async (venueId, status) => {
  const response = await updateVenueStatus(venueId, status); // ✅
  return response.data.data;
};
