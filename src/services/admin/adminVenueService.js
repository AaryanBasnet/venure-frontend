import {
  getApprovedVenuesCount,
  getAllVenues,
  updateVenueStatus,
} from "../../api/admin/venueManagementApi";

export const getVenue = async (params) => {
  const response = await getAllVenues(params);
  return response.data;
};

export const getApprovedVenuesCountService = async () => {
  const res = await getApprovedVenuesCount();
  return res.data;
};

export const changeVenueStatus = async (venueId, status) => {
  const response = await updateVenueStatus(venueId, status); // ✅
  return response.data.data;
};
