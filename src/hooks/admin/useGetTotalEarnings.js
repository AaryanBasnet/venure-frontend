import { useQuery } from "@tanstack/react-query";
import { getTotalMonthlyEarningsService } from "../../services/admin/dashboardService";

const useGetTotalEarnings = () => {
  return useQuery({
    queryKey: ["total_earnings"],
    queryFn: getTotalMonthlyEarningsService,
  });
};

export default useGetTotalEarnings;
