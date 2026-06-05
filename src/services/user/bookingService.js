import {
  createBookingApi,
  createPaymentIntentApi,
  getMyBookings,
} from "../../api/user/booking";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement } from "@stripe/react-stripe-js";

export const createBookingService = async (
  bookingData,
  stripe,
  cardElement,
  elements
) => {
  try {
    // 1️⃣ Create Stripe Payment Intent
    const clientSecret = await createPaymentIntentApi({
      amount: bookingData.totalPrice,
      venueId: bookingData.venue,
      bookingDate: bookingData.bookingDate,
      timeSlot: bookingData.timeSlot,
    });

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement || elements.getElement(CardElement),
      },
    });
    if (result.error) {
      throw new Error(result.error.message);
    }

    if (result.paymentIntent.status !== "succeeded") {
      throw new Error("Payment failed");
    }

    // 3️⃣ Call your backend booking API with the paymentIntentId
    const finalBookingData = {
      ...bookingData,
      paymentIntentId: result.paymentIntent.id,
    };

    return await createBookingApi(finalBookingData);
  } catch (error) {
    throw error;
  }
};

export const getMyBookingsService = async () => {
  return await getMyBookings();
};
