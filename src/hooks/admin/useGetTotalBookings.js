import { useQuery } from "@tanstack/react-query";
import { getTotalBookingsForAdminService } from "../../services/admin/dashboardService";

export const useGetTotalBookingsForAdmin = () => {
  return useQuery({
    queryKey: ["total_bookings_admin"],
    queryFn: getTotalBookingsForAdminService,
  });
};
