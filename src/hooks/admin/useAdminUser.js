import { useQuery } from "@tanstack/react-query";
import { getAllUserService } from "../../services/admin/userService";

export const useAdminUser = (page, limit = 5, search = "", role = "") => {
  return useQuery({
    queryKey: ["admin_users", page, limit, search, role],
    queryFn: () => getAllUserService({ page, limit, search, role }),
    keepPreviousData: true,
  });
};
