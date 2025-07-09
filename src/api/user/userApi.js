import instance from "../api";

export const fetchUserProfile = () => {
  return instance.get("/user/profile");
};

export const updateUserProfile = (formData) => {
  return instance.put(`user/profile`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};