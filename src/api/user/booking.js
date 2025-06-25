import instance from "../api";

export const createBookingApi = (bookingData) =>{
    console.log("Booking Data: ", bookingData)
  return instance.post("/bookings/createBooking", bookingData);

}
