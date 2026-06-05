import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import api from "../../../api/api";

/**
 * Initiates a payment via the backend's Strategy Pattern endpoint.
 *
 * The backend owns the price calculation — the frontend never sends an amount.
 * The backend returns different payloads per provider:
 *
 *   Stripe → { clientSecret: "pi_..." }
 *     Caller must then run:
 *       const { error } = await stripe.confirmCardPayment(clientSecret, {
 *         payment_method: { card: elements.getElement(CardElement) }
 *       })
 *
 *   eSewa → { formPayload: { ... }, redirectUrl: "https://esewa.com.np/..." }
 *     Caller must then submit a POST form to redirectUrl with formPayload fields.
 *
 * Intentionally no onSuccess toast — the COMPONENT owns the success UX
 * (Stripe UI feedback, eSewa redirect). Only failures are communicated here
 * because the user needs feedback even if the component unmounts mid-flight.
 *
 * Payload shape:
 * {
 *   provider:        "stripe" | "esewa"
 *   venueId:         string
 *   startTime:       string   ISO 8601
 *   endTime:         string   ISO 8601
 *   numberOfGuests:  number
 *   eventType:       string
 *   selectedAddons?: { id, name, price }[]
 * }
 */
export const useInitiatePayment = () => {
  return useMutation({
    mutationFn: async (payload) => {
      const res = await api.post("/payments/initiate", payload);
      // Envelope unwrap: { success: true, data: { clientSecret } | { formPayload, redirectUrl } }
      return res.data.data;
    },

    onError: (err) => {
      toast.error(
        err?.response?.data?.message ||
          "Payment initiation failed. Please check your details and try again."
      );
    },
  });
};
