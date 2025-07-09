import { getFilteredVenuesApi, getVenueByIdApi } from "../../api/user/venue";

export const getApprovedVenues = async (filters = {}) => {
  const response = await getFilteredVenuesApi(filters);
  return response.data;
};
export const getVenueById = async (id) => {
  const response = await getVenueByIdApi(id);
  return response.data.data;
};
