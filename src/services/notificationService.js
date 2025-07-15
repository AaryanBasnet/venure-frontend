import {
  fetchNotification,
  markAllNotificationRead,
  markNotificationRead,
} from "../api/notification";

export const fetchNotificationService = async () => {
  return await fetchNotification();
};

export const markNotificationReadService = async (id) => {
  return await markNotificationRead();
};

export const markAllNotificationReadService = async () => {
  return await markAllNotificationRead();
};
