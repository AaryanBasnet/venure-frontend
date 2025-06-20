import { useQuery } from "@tanstack/react-query";
import { getAllUserService } from "../../services/admin/userService";

export const useAdminUser = (page, limit = 5) => {
  return useQuery({
    queryKey: ["admin_users", page, limit],
    queryFn: () => getAllUserService({ page, limit }),
    keepPreviousData: true,
  });
};
