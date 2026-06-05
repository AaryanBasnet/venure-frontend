import { useQuery } from "@tanstack/react-query";
import api from "../../../api/api";

/**
 * Fetches the authenticated user's booking history.
 * The query key ["userBookings"] is the same key used by useCreateBooking's
 * optimistic update and invalidation, so both hooks stay in sync automatically.
 */
export const useUserBookings = () => {
  return useQuery({
    queryKey: ["userBookings"],
    queryFn: async () => {
      const res = await api.get("/bookings/my-bookings");
      return res.data.data ?? [];
    },
    staleTime: 1000 * 60 * 5,
  });
};
