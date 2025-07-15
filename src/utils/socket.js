import { io } from "socket.io-client";

const SOCKET_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5050";

const socket = io(SOCKET_URL, {
  autoConnect: false,
});

// ⚡ Connect & join personal room
export const connectSocket = (userId) => {
  if (!socket.connected) {
    socket.connect();
    socket.emit("join", userId);
  }
};

// ✅ Messaging
export const sendMessage = (message) => {
  socket.emit("sendMessage", message);
};

export const subscribeToMessages = (callback) => {
  socket.on("receiveMessage", callback);
};

export const unsubscribeFromMessages = () => {
  socket.off("receiveMessage");
};

// ✅ Notifications
export const subscribeToNotifications = (callback) => {
  socket.on("newNotification", callback);
};

export const unsubscribeFromNotifications = () => {
  socket.off("newNotification");
};

// ✅ Disconnect safely
export const disconnectSocket = () => {
  if (socket.connected) {
    socket.disconnect();
  }
};

export default socket;
