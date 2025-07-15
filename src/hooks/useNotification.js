import { useEffect, useState } from "react";
import {
  fetchNotificationService,
  markNotificationReadService,
  markAllNotificationReadService,
} from "../services/notificationService";
import socket, { connectSocket, disconnectSocket } from "../utils/socket";

export function useNotifications(userId) {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (!userId) return;

    // Connect and join user room on mount
    connectSocket(userId);

    // Fetch existing notifications
    fetchNotificationService().then((res) => setNotifications(res.data));

    // Subscribe to real-time notification events
    socket.on("newNotification", (notif) => {
      setNotifications((prev) => [notif, ...prev]);
    });

    // Cleanup on unmount or userId change
    return () => {
      socket.off("newNotification");
      disconnectSocket();
    };
  }, [userId]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markRead = async (id) => {
    await markNotificationReadService(id);
    setNotifications((prev) =>
      prev.map((n) => (n._id === id ? { ...n, read: true } : n))
    );
  };

  const markAllRead = async () => {
    await markAllNotificationReadService();
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return { notifications, unreadCount, markRead, markAllRead };
}
