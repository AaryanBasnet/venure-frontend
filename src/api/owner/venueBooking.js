import instance from "../api";

export const fetchBookingsForOwner = async () => {
  const res = await instance.get("/bookings/owner");
  return res.data.data;
};

export const getMonthlyEarningsForOwner = async () => {
  return await instance.get("/bookings/owner/monthly-earning");
};

export const cancelBooking = async (bookingId) => {
  const res = await instance.put(`/bookings/${bookingId}/cancel`);
  return res.data;
};

export const approveBooking = async (bookingId) => {
  const res = await instance.put(`/bookings/${bookingId}/approve`);
  return res.data;
};

export const getApprovedBookingsCountForVenues = async (venueIds) => {
  const res = await instance.post(`/bookings/venues/approved-bookings-count`, {
    venueIds,
  });
  return res.data.data;
};
