import { fetchUserProfile, updateUserProfile } from "../../api/user/userApi";

export const getUserProfileService = async () => {
  const response = await fetchUserProfile();
  return response.data; // { success, user }
};

export const updateUserProfileService = async (formData) => {
  const response = await updateUserProfile(formData);
  return response.data; // { success, message, user }
};
