import { useQuery } from "@tanstack/react-query";
import { getCustomerCountService } from "../../services/admin/userService";

export const useGetCustomerCount = () => {
  return useQuery({
    queryKey: ["Customer_Count"],
    queryFn: async () => {
      const res = await getCustomerCountService();
      return res.totalCustomers; // returns just the number
    },
    keepPreviousData: true,
  });
};
