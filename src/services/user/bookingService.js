import { createBookingApi, getMyBookings } from "../../api/user/booking";

export const createBookingService = async (bookingData) => {
  return await createBookingApi(bookingData);
};

export const getMyBookingsService = async () => {
  return await getMyBookings();
};
