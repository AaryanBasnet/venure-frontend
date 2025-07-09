import { useQuery } from "@tanstack/react-query";
import { getMonthlyEarningsForOwnerService } from "../../services/venueOwner/venueBooking";

export const useGetMonthlyEarningsForOwner =  () => {
  return useQuery({
    queryKey: ["monthlyEarnings"],
    queryFn: getMonthlyEarningsForOwnerService,
  });
};
