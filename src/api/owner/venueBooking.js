import instance from "../api";

export const fetchBookingsForOwner = async () => {
  try {
    const res = await instance.get("/bookings/owner");
    return res.data.data;
  } catch (error) {
    console.error("Failed to fetch owner bookings:", error);
    throw error;
  }
};
///owner/monthly-earning
export const getMonthlyEarningsForOwner = async () => {
  console.log("getMonthlyEarningsForOwner", getMonthlyEarningsForOwner)
  return await instance.get("/bookings/owner/monthly-earning")
}

export const cancelBooking = async (bookingId) => {
  try {
    const res = await instance.put(`/bookings/${bookingId}/cancel`);
    return res.data;
  } catch (error) {
    console.error("Failed to cancel booking:", error);
    throw error;
  }
};

export const approveBooking = async (bookingId) => {
  try {
    const res = await instance.put(`/bookings/${bookingId}/approve`);
    return res.data;
  } catch (error) {
    console.error("Failed to approve booking:", error);
    throw error;
  }
};


