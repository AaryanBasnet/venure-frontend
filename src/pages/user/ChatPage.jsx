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
  const query = useQuery();
  const participantId = query.get("user");

  const {
    chats,
    activeChat,
    messages,
    loadMessages,
    sendNewMessage,
    startChatWith,
  } = useChat(user);

  useEffect(() => {
    if (participantId && user?._id) {
      startChatWith(participantId);
    }
  }, [participantId, user?._id, startChatWith]);

  return (
    <div className="flex flex-col md:flex-row h-[calc(100vh-64px)] w-full bg-white border shadow rounded overflow-hidden">
      {/* Chat List */}
      <div className="w-full md:w-[300px] h-[300px] md:h-auto overflow-y-auto border-r">
        <ChatList
          chats={chats}
          activeChat={activeChat}
          onSelect={loadMessages}
          currentUserId={user?._id}
        />
      </div>

      {/* Chat Box */}
      <div className="flex-1 h-[calc(100vh-300px)] md:h-full flex flex-col min-h-0">
        {activeChat ? (
          <ChatBox
            messages={messages}
            onSend={sendNewMessage}
            activeChat={activeChat}
            currentUserId={user?._id}
          />
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            Select a conversation to start chatting.
          </div>
        )}
      </div>
    </div>
  );
}
