import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import api from "../../../api/api";

/**
 * Creates a venue booking record.
 *
 * Payload — all dates must be strict ISO 8601 strings (not locale strings):
 * {
 *   venueId:              string   venue._id
 *   startTime:            string   e.g. "2024-12-25T09:00:00.000Z"
 *   endTime:              string   e.g. "2024-12-25T13:00:00.000Z"
 *   numberOfGuests:       number
 *   eventType:            string
 *   contactName:          string
 *   phoneNumber:          string
 *   paymentIntentId?:     string   filled after stripe.confirmCardPayment succeeds
 *   specialRequirements?: string
 *   selectedAddons?:      { id, name, price }[]
 * }
 *
 * Helper — build ISO strings from the calendar UI:
 *   const startTime = new Date(`${selectedDate}T${startHH}:00:00`).toISOString()
 *   const endTime   = new Date(`${selectedDate}T${endHH}:00:00`).toISOString()
 *
 * Optimistic update: a pending booking is prepended to the cache immediately
 * so the UI reacts before the round-trip completes. It is rolled back cleanly
 * on server error — the user never sees a stale ghost entry.
 */
export const useCreateBooking = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload) => {
      const res = await api.post("/bookings", payload);
      return res.data.data;
    },

    // ── Optimistic update ─────────────────────────────────────────────────
    onMutate: async (payload) => {
      // Freeze any in-flight refetch so it can't overwrite the optimistic entry
      await queryClient.cancelQueries({ queryKey: ["userBookings"] });

      const previous = queryClient.getQueryData(["userBookings"]);

      queryClient.setQueryData(["userBookings"], (old = []) => [
        {
          _id: `optimistic_${Date.now()}`,
          status: "pending",
          startTime: payload.startTime,
          endTime: payload.endTime,
          venue: { _id: payload.venueId, venueName: "Reserving your spot…" },
          numberOfGuests: payload.numberOfGuests,
          totalPrice: 0, // backend calculates; 0 is the visual placeholder
          createdAt: new Date().toISOString(),
          _optimistic: true,
        },
        ...old,
      ]);

      return { previous };
    },

    onError: (err, _payload, context) => {
      // Roll back the ghost entry
      if (context?.previous !== undefined) {
        queryClient.setQueryData(["userBookings"], context.previous);
      }
      toast.error(
        err?.response?.data?.message || "Booking failed. Please try again."
      );
    },

    onSuccess: () => {
      toast.success("Booking confirmed!");
    },

    onSettled: () => {
      // Always reconcile with the server regardless of success/failure
      queryClient.invalidateQueries({ queryKey: ["userBookings"] });
    },
  });
};
