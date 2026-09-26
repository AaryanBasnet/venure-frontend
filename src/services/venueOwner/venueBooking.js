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
  return await cancelBooking(bookingId);
};

export const approveBookingService = async (bookingId) => {
  return await approveBooking(bookingId);
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
