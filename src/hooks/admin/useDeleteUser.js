import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUserService } from "../../services/admin/userService";

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userId) => deleteUserService(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["admin_users"],
      });
    },
    onError: () => {},
  });
};
