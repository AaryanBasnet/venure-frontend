import { io } from "socket.io-client";

const SOCKET_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5050";

const socket = io(SOCKET_URL, {
  autoConnect: false,
});

export const connectSocket = (userId) => {
  if (!socket.connected) {
    socket.connect();
    socket.emit("join", userId);
  }
};

export const sendMessage = (message) => {
  socket.emit("sendMessage", message);
};

export const subscribeToMessages = (callback) => {
  socket.on("receiveMessage", callback);
};

export const unsubscribeFromMessages = () => {
  socket.off("receiveMessage");
};

export default socket;
