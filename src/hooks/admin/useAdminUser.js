import { useQuery } from "@tanstack/react-query";
import { getAllUserService } from "../../services/admin/userService";

export const useAdminUser = (page, limit = 5, search = "") => {
  return useQuery({
    queryKey: ["admin_users", page, limit, search],
    queryFn: () => getAllUserService({ page, limit, search }),
    keepPreviousData: true,
  });
};