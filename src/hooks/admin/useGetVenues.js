import { useQuery } from "@tanstack/react-query";
import { getAllVenues } from "../../api/admin/venueManagementApi";

export const useGetVenues = () => {
  return useQuery({
    queryKey: ["admin_venue"],
    queryFn: async () => {
      const response = await getAllVenues(); // returns axios response
      return response.data.data; // ✅ extract only the array
    },
    keepPreviousData: true,
  });
};
