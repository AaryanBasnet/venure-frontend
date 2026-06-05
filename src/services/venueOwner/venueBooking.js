import { fetchBookingsForOwner, cancelBooking, approveBooking, getMonthlyEarningsForOwner, getApprovedBookingsCountForVenues } from "../../api/owner/venueBooking";
import { getTotalBookingsForOwner } from "../../api/user/booking";

export const fetchBookingsForOwnerService = async () => {
  try {
    const response = await fetchBookingsForOwner();
    return response ?? [];
  } catch {
    return [];
  }
};

export const cancelBookingService = async (bookingId) => {
  try {
    const response = await cancelBooking(bookingId);
    return response;
  } catch (error) {
    throw error;
  }
};

export const approveBookingService = async (bookingId) => {
  try {
    const response = await approveBooking(bookingId);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getMonthlyEarningsForOwnerService = async () => {
  const res = await getMonthlyEarningsForOwner();
  return res.data.data;
};

export const getTotalBookingsForOwnerService = async () => {
  const res = await getTotalBookingsForOwner();
  return res.data.data;
};

export const getApprovedBookingsForVenueService = async (venueIds) => {
  const res = await getApprovedBookingsCountForVenues(venueIds);
  return res;
};
