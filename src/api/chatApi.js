import instance from "./api";

// Get all chats for logged-in user, optionally filtered by venueId
export const fetchChats = (venueId) => {
  const query = venueId ? `?venueId=${venueId}` : "";
  return instance.get(`/chats${query}`);
};

// Get or create chat between user and participant, scoped to a venue
export const createOrGetChat = (participantId, venueId) =>
  instance.post("/chats", { participantId, venueId });

// Get messages for a specific chat
export const fetchMessages = (chatId) =>
  instance.get(`/messages/${chatId}`);
