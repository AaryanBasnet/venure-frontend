// src/pages/user/ChatPage.jsx
import React, { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ChatList from "../../components/ChatList";
import ChatBox from "../../components/ChatBox";
import { AuthContext } from "../../auth/AuthProvider";
import { useChat } from "../../hooks/useChat";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function ChatPage() {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const query = useQuery();
  const participantId = query.get("user"); // user = venue owner id

  const {
    chats,
    activeChat,
    messages,
    loadMessages,
    sendNewMessage,
    startChatWith,
  } = useChat(user);

  // Start chat if user ID is provided in query
  useEffect(() => {
    if (participantId && user?._id) {
      startChatWith(participantId);
    }
  }, [participantId, user?._id, startChatWith]);

  return (
    <div className="flex pt-30 h-[750px] border rounded shadow overflow-hidden bg-white">
      <ChatList
        chats={chats}
        activeChat={activeChat}
        onSelect={loadMessages}
      />
      <div className="flex-1 flex flex-col">
        {activeChat ? (
          <ChatBox
            messages={messages}
            onSend={sendNewMessage}
            activeChat={activeChat}
            currentUserId={user?._id}
          />
        ) : (
          <div className="p-5 text-center text-gray-500">
            Select a conversation to start chatting.
          </div>
        )}
      </div>
    </div>
  );
}
