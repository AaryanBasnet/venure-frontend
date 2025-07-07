import { useState, useEffect, useCallback } from "react";
import {
  fetchChats,
  fetchMessages,
  createOrGetChat,
} from "../api/chatApi";
import {
  connectSocket,
  sendMessage,
  subscribeToMessages,
  unsubscribeFromMessages,
} from "../services/socket";

export function useChat(currentUser, venueId = null) {
  const [chats, setChats] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (!currentUser) return;
    fetchChats(venueId).then((res) => setChats(res.data));
    connectSocket(currentUser._id);

    return () => unsubscribeFromMessages();
  }, [currentUser, venueId]);

  useEffect(() => {
    subscribeToMessages((newMessage) => {
      if (activeChat && newMessage.chatId === activeChat._id) {
        setMessages((prev) => [...prev, newMessage]);
      }
    });

    return () => unsubscribeFromMessages();
  }, [activeChat]);

  const loadMessages = useCallback(
    (chat) => {
      setActiveChat(chat);
      fetchMessages(chat._id).then((res) => setMessages(res.data));
    },
    []
  );

  const sendNewMessage = (text) => {
    if (!activeChat) return;
    const message = {
      chatId: activeChat._id,
      sender: currentUser._id,
      receiver: activeChat.participants.find((p) => p._id !== currentUser._id)._id,
      text,
    };
    sendMessage(message);
    setMessages((prev) => [...prev, message]);
  };

  const startChatWith = async (participantId) => {
    const res = await createOrGetChat(participantId, venueId);
    const chat = res.data;
    if (!chats.find((c) => c._id === chat._id)) {
      setChats((prev) => [...prev, chat]);
    }
    loadMessages(chat);
    return chat; // Return chat so caller can use it
  };

  return {
    chats,
    activeChat,
    messages,
    loadMessages,
    sendNewMessage,
    startChatWith,
  };
}
