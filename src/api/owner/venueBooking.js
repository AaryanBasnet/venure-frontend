import instance from "../api";

export const fetchBookingsForOwner = async () => {
  try {
    const res = await instance.get("/bookings/owner");
    return res.data.data;
  } catch (error) {
    throw error;
  }
};

export const getMonthlyEarningsForOwner = async () => {
  return await instance.get("/bookings/owner/monthly-earning");
};

export const cancelBooking = async (bookingId) => {
  try {
    const res = await instance.put(`/bookings/${bookingId}/cancel`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const approveBooking = async (bookingId) => {
  try {
    const res = await instance.put(`/bookings/${bookingId}/approve`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const getApprovedBookingsCountForVenues = async (venueIds) => {
  try {
    const res = await instance.post(
      `/bookings/venues/approved-bookings-count`,
      { venueIds }
    );
    return res.data.data;
  } catch (error) {
    throw error;
  }
};
