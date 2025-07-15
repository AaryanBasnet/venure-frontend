import React, { useMemo } from "react";
import { User, MessageCircle, Clock, ChevronRight } from "lucide-react";

export default function ChatList({ chats, activeChat, onSelect, currentUserId }) {
  const formatTime = (timestamp) => {
    if (!timestamp) return "";
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now - date) / (1000 * 60 * 60);

    if (diffInHours < 1) {
      const minutes = Math.floor((now - date) / (1000 * 60));
      return minutes <= 1 ? "now" : `${minutes}m`;
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}h`;
    } else {
      return date.toLocaleDateString();
    }
  };

  const getUnreadCount = (chat) => chat.unreadCount || 0;

  const getInitials = (name) =>
    name?.split(" ").map(n => n[0]).join("").toUpperCase() || "U";

  const isOnline = (chat) => chat.isOnline || Math.random() > 0.5;

  // 🔥 Precompute participant names excluding self
  const participantNameMap = useMemo(() => {
    const map = {};
    chats.forEach(chat => {
      const names = chat.participants
        .filter(p => p._id !== currentUserId)
        .map(p => p.name || "Customer")
        .join(", ");
      map[chat._id] = names;
    });
    return map;
  }, [chats, currentUserId]);

  if (!chats || chats.length === 0) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <MessageCircle className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No conversations</h3>
        <p className="text-sm text-gray-500">New customer chats will appear here</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Search Bar */}
      <div className="sticky top-0 z-10 bg-white p-4 border-b border-gray-100">
        <input
          type="text"
          placeholder="Search conversations..."
          className="w-full pl-3 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Chat Items */}
      <div className="overflow-y-auto flex-1">
        {chats.map((chat) => {
          const participantNames = participantNameMap[chat._id];
          const unreadCount = getUnreadCount(chat);
          const isActive = activeChat?._id === chat._id;
          const online = isOnline(chat);

          return (
            <div
              key={chat._id}
              className={`relative p-4 cursor-pointer transition-all duration-200 border-b border-gray-50 hover:bg-gray-50 ${
                isActive
                  ? "bg-blue-50 border-l-4 border-l-blue-500 shadow-sm"
                  : "hover:shadow-sm"
              }`}
              onClick={() => onSelect(chat)}
            >
              <div className="flex items-start gap-3">
                {/* Avatar */}
                <div className="relative flex-shrink-0">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold text-sm ${
                      isActive
                        ? "bg-gradient-to-r from-blue-500 to-blue-600"
                        : "bg-gradient-to-r from-gray-400 to-gray-500"
                    }`}
                  >
                    {getInitials(participantNames)}
                  </div>
                  {online && (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 border-2 border-white rounded-full"></div>
                  )}
                </div>

                {/* Chat Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3
                      className={`font-semibold truncate ${
                        isActive ? "text-blue-900" : "text-gray-900"
                      }`}
                    >
                      {participantNames || "Customer"}
                    </h3>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      {chat.lastMessage?.timestamp && (
                        <span className="text-xs text-gray-500">
                          {formatTime(chat.lastMessage.timestamp)}
                        </span>
                      )}
                      {isActive && (
                        <ChevronRight className="w-4 h-4 text-blue-500" />
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <p
                      className={`text-sm truncate ${
                        isActive ? "text-blue-700" : "text-gray-600"
                      }`}
                    >
                      {chat.lastMessage?.text || "No messages yet"}
                    </p>
                    {unreadCount > 0 && (
                      <span className="ml-2 bg-blue-500 text-white text-xs font-medium px-2 py-1 rounded-full flex-shrink-0">
                        {unreadCount > 99 ? "99+" : unreadCount}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-3 mt-2">
                    {online && (
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <span className="text-xs text-green-600 font-medium">Online</span>
                      </div>
                    )}
                    {chat.priority === "high" && (
                      <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full font-medium">
                        High Priority
                      </span>
                    )}
                    {chat.status === "waiting" && (
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-orange-500" />
                        <span className="text-xs text-orange-600 font-medium">Waiting</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              {isActive && (
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500"></div>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer Summary */}
      <div className="p-4 border-t border-gray-100 bg-gray-50 text-sm text-gray-600 flex justify-between">
        <span>{chats.length} total conversations</span>
        <span className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
          {chats.filter((c) => isOnline(c)).length} online
        </span>
      </div>
    </div>
  );
}
