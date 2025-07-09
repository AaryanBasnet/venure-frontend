import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getUserProfileService, updateUserProfileService } from "../../services/user/userService";

export const useUserProfile = () => {
  return useQuery({
    queryKey: ["userProfile"],
    queryFn: getUserProfileService,
    staleTime: 5 * 60 * 1000,
    retry: 1,
    refetchOnWindowFocus: false,
  });
};

export const useUpdateUserProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateUserProfileService,
    onSuccess: (data) => {
      // Invalidate and refetch user profile after update
      queryClient.invalidateQueries(["userProfile"]);
    },
    onError: (error) => {
      // You can handle error display here or in UI component
      console.error("Failed to update profile:", error);
    },
  });
};
