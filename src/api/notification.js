import instance from "./api";

export const fetchNotification = async () => {
  return await instance.get("/notification");
};

export const markNotificationRead = async (id) => {
  return await instance.patch(`/notification/${id}/read`);
};

export const markAllNotificationRead = async () => {
  return await instance.patch("/notification/read-all");
};
