import { io } from "socket.io-client";

const SOCKET_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5051";

// Module-level singleton — one connection shared for the entire app lifetime.
// autoConnect: false means AuthProvider controls when the connection opens,
// preventing anonymous socket connections before the user is authenticated.
// withCredentials: true sends the HTTP-Only auth cookie on the initial
// Socket.io HTTP handshake so the server can identify the user immediately.
const socket = io(SOCKET_URL, {
  autoConnect: false,
  withCredentials: true,
});

/**
 * Opens the connection and subscribes the user to their private room.
 * Called by AuthProvider once the Zustand store has a confirmed user._id.
 * Safe to call multiple times — guards against duplicate connects.
 */
export const connectSocket = (userId) => {
  if (!socket.connected) {
    socket.connect();
    socket.emit("join", userId);
  }
};

export const sendMessage = (message) => socket.emit("sendMessage", message);

export const subscribeToMessages = (callback) =>
  socket.on("receiveMessage", callback);
export const unsubscribeFromMessages = () => socket.off("receiveMessage");

export const subscribeToNotifications = (callback) =>
  socket.on("newNotification", callback);
export const unsubscribeFromNotifications = () =>
  socket.off("newNotification");

export const disconnectSocket = () => {
  if (socket.connected) socket.disconnect();
};

export default socket;
