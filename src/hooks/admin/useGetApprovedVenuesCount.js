import { useQuery } from "@tanstack/react-query";
import { getApprovedVenuesCountService } from "../../services/admin/adminVenueService";

export const useGetApprovedVenuesCount = () => {
  return useQuery({
    queryKey: ["Count_Venues"],
    queryFn: async () => {
      const res = await getApprovedVenuesCountService();
      console.log(res);
      return res.totalApproved;
    },
    keepPreviousData: true,
  });
};
