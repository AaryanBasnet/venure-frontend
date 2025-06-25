import { createBookingApi } from "../../api/user/booking"


export const createBookingService = async (bookingData) => {
    return await createBookingApi(bookingData);
}