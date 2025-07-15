import { fetchBookingsForOwner, cancelBooking, approveBooking, getMonthlyEarningsForOwner, getApprovedBookingsCountForVenues } from "../../api/owner/venueBooking";
import { getTotalBookingsForOwner } from "../../api/user/booking";

export const fetchBookingsForOwnerService = async () => {
  try {
    const response = await fetchBookingsForOwner();
    console.log("Fetched Owner Bookings:", response);
    return response ?? []; // Always return an array, fallback to empty
  } catch (error) {
    console.error("Error fetching bookings for owner:", error);
    return []; // Fail gracefully by returning empty array
  }
};

export const cancelBookingService = async (bookingId) => {
  try {
    const response = await cancelBooking(bookingId);
    console.log("Booking canceled:", response);
    return response;
  } catch (error) {
    console.error("Error canceling booking:", error);
    throw error;
  }
};

export const approveBookingService = async (bookingId) => {
  try {
    const response = await approveBooking(bookingId);
    console.log("Booking approved:", response);
    return response;
  } catch (error) {
    console.error("Error approving booking:", error);
    throw error;
  }
};

export const getMonthlyEarningsForOwnerService = async () => {
  const res = await getMonthlyEarningsForOwner();
  return res.data.data;
}

export const getTotalBookingsForOwnerService = async () => {
  const res = await getTotalBookingsForOwner();
  return res.data.data;
}

export const getApprovedBookingsForVenueService = async (venueIds) => {
  const res = await getApprovedBookingsCountForVenues(venueIds);
  return res;
};