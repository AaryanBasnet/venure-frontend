import instance from "../api";

export const createBookingApi = (bookingData) =>{
    console.log("Booking Data: ", bookingData)
  return instance.post("/bookings/createBooking", bookingData);

}

export const getMyBookings = async () => {
  const res = await instance.get("/bookings/my-bookings");
  return res.data.data;
};


///owner/bookings/total
export const getTotalBookingsForOwner = async () => {
  return await instance.get("/bookings/owner/total");
}