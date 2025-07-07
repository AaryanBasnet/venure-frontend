import React, { useCallback, useMemo } from "react";
import ChatList from "../../components/ChatList";
import ChatBox from "../../components/ChatBox";
import { useChat } from "../../hooks/useChat";
import { useContext } from "react";
import { AuthContext } from "../../auth/AuthProvider";
import { MessageCircle, Users, Clock } from "lucide-react";

export default function OwnerChatPage() {
  const { user } = useContext(AuthContext);
  const {
    chats,
    activeChat,
    messages,
    loadMessages,
    sendNewMessage,
  } = useChat(user);

  // Memoize callbacks to prevent unnecessary re-renders
  const handleLoadMessages = useCallback((chat) => {
    loadMessages(chat);
  }, [loadMessages]);

  const handleSendMessage = useCallback((message) => {
    sendNewMessage(message);
  }, [sendNewMessage]);

  // Memoize computed values
  const chatCount = useMemo(() => chats?.length || 0, [chats?.length]);

  // Memoize the chat list component to prevent unnecessary re-renders
  const chatListComponent = useMemo(() => (
    <ChatList 
      chats={chats} 
      activeChat={activeChat} 
      onSelect={handleLoadMessages} 
    />
  ), [chats, activeChat, handleLoadMessages]);

  // Memoize the empty state to prevent re-renders
  const emptyState = useMemo(() => (
    <div className="flex-1 flex items-center justify-center bg-gradient-to-b from-gray-50 to-white">
      <div className="text-center max-w-md mx-auto p-8">
        <div className="w-20 h-20 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <MessageCircle className="w-10 h-10 text-blue-600" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          No conversation selected
        </h3>
        <p className="text-gray-500 mb-6">
          Choose a conversation from the sidebar to start responding to customer inquiries
        </p>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800">
            💡 <strong>Tip:</strong> New messages will appear in real-time when customers reach out
          </p>
        </div>
      </div>
    </div>
  ), []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-600 rounded-lg">
              <MessageCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Customer Support Chat
              </h1>
              <p className="text-gray-600">
                Manage and respond to customer inquiries
              </p>
            </div>
          </div>
          
          {/* Stats Bar */}
          <div className="flex gap-4 mt-4">
            <div className="bg-white rounded-lg px-4 py-2 shadow-sm border border-gray-200">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-gray-700">
                  {chatCount} Active Chats
                </span>
              </div>
            </div>
            <div className="bg-white rounded-lg px-4 py-2 shadow-sm border border-gray-200">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium text-gray-700">
                  Online
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Chat Interface */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="flex h-[700px]">
            {/* Chat List Sidebar */}
            <div className="w-80 border-r border-gray-200 bg-gray-50">
              <div className="p-4 border-b border-gray-200 bg-white">
                <h2 className="font-semibold text-gray-900">Conversations</h2>
                <p className="text-sm text-gray-500 mt-1">
                  {chatCount} total conversations
                </p>
              </div>
              <div className="overflow-y-auto h-full">
                {chatListComponent}
              </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col bg-white">
              {activeChat ? (
                <>
                  {/* Chat Header */}
                  <div className="p-4 border-b border-gray-200 bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                          <span className="text-white font-semibold text-sm">
                            {activeChat.customerName?.[0]?.toUpperCase() || 'U'}
                          </span>
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            {activeChat.customerName || 'Customer'}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {activeChat.status || 'Active conversation'}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        <span className="text-sm text-gray-500">Online</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Chat Messages */}
                  <div className="flex-1 bg-gradient-to-b from-gray-50 to-white">
                    <ChatBox 
                      key={activeChat._id} // Force re-mount when chat changes
                      messages={messages} 
                      onSend={handleSendMessage}
                      activeChat={activeChat}
                      currentUserId={user?._id}
                    />
                  </div>
                </>
              ) : (
                emptyState
              )}
            </div>
          </div>
        </div>

        {/* Quick Actions Footer */}
        <div className="mt-6 flex justify-between items-center">
          <div className="text-sm text-gray-500">
            Last updated: {new Date().toLocaleTimeString()}
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 text-sm bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              Export Chats
            </button>
            <button className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}