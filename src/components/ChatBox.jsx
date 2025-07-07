import React, { useState, useRef, useEffect } from "react";
import { Send, Paperclip, Smile, MoreVertical, Clock, Check, CheckCheck } from "lucide-react";

export default function ChatBox({ messages, onSend, activeChat, currentUserId }) {
  const [text, setText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [text]);

  const handleSend = () => {
    if (text.trim() === "") return;
    onSend(text.trim());
    setText("");
    setIsTyping(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const formatTime = (timestamp) => {
    if (!timestamp) return "";
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // THIS is the fix: use currentUserId to detect if message is from current user (owner/user)
  const isOwnerMessage = (msg) => {
    const senderId = typeof msg.sender === "object" ? msg.sender._id : msg.sender;
    return senderId === currentUserId;
  };

  const getMessageStatus = (msg) => {
    if (msg.status === 'sent') return <Check className="w-3 h-3 text-gray-400" />;
    if (msg.status === 'delivered') return <CheckCheck className="w-3 h-3 text-gray-400" />;
    if (msg.status === 'read') return <CheckCheck className="w-3 h-3 text-blue-500" />;
    return <Clock className="w-3 h-3 text-gray-300" />;
  };

  const getSenderName = (msg) => {
    if (isOwnerMessage(msg)) return "You";
    return msg.sender?.name || msg.sender || "Customer";
  };

  const getSenderInitials = (msg) => {
    const name = getSenderName(msg);
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  if (!messages || messages.length === 0) {
    return (
      <div className="flex flex-col h-full">
        {/* Empty State */}
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Send className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Start the conversation</h3>
            <p className="text-gray-500 mb-4">Send a message to begin chatting with the customer</p>
          </div>
        </div>

        {/* Input Area */}
        <div className="border-t border-gray-200 bg-white p-4">
          <div className="flex items-end gap-3">
            <div className="flex-1 relative">
              <textarea
                ref={textareaRef}
                value={text}
                placeholder="Type your message..."
                onChange={(e) => setText(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full resize-none border border-gray-300 rounded-lg px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm max-h-32"
                rows={1}
              />
              <div className="absolute right-3 bottom-3 flex items-center gap-1">
                <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                  <Paperclip className="w-4 h-4 text-gray-400" />
                </button>
                <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                  <Smile className="w-4 h-4 text-gray-400" />
                </button>
              </div>
            </div>
            <button
              onClick={handleSend}
              disabled={text.trim() === ""}
              className={`p-3 rounded-lg transition-all duration-200 ${
                text.trim() === ""
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 text-white shadow-sm hover:shadow-md"
              }`}
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, i) => {
          const isOwner = isOwnerMessage(msg);
          const showAvatar = i === 0 || isOwnerMessage(messages[i-1]) !== isOwner;
          const showTime = i === messages.length - 1 || 
            (messages[i+1] && new Date(messages[i+1].timestamp) - new Date(msg.timestamp) > 300000); // 5 minutes

          return (
            <div key={i} className={`flex ${isOwner ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex items-end gap-2 max-w-xs lg:max-w-md ${isOwner ? 'flex-row-reverse' : 'flex-row'}`}>
                {/* Avatar */}
                {showAvatar && !isOwner && (
                  <div className="w-8 h-8 bg-gradient-to-r from-gray-400 to-gray-500 rounded-full flex items-center justify-center text-white text-xs font-semibold flex-shrink-0">
                    {getSenderInitials(msg)}
                  </div>
                )}
                {showAvatar && isOwner && (
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-xs font-semibold flex-shrink-0">
                    {getSenderInitials(msg)}
                  </div>
                )}

                {/* Message Bubble */}
                <div className={`relative group ${!showAvatar && !isOwner ? 'ml-10' : ''} ${!showAvatar && isOwner ? 'mr-10' : ''}`}>
                  <div
                    className={`px-4 py-2 rounded-2xl shadow-sm ${
                      isOwner
                        ? "bg-blue-600 text-white"
                        : "bg-white text-gray-900 border border-gray-200"
                    } ${showAvatar ? (isOwner ? 'rounded-br-md' : 'rounded-bl-md') : ''}`}
                  >
                    {!isOwner && showAvatar && (
                      <div className="text-xs font-medium text-gray-600 mb-1">
                        {getSenderName(msg)}
                      </div>
                    )}
                    
                    <div className="text-sm leading-relaxed whitespace-pre-wrap">
                      {msg.text}
                    </div>
                    
                    <div className={`flex items-center justify-end gap-1 mt-1 ${
                      isOwner ? 'text-blue-100' : 'text-gray-500'
                    }`}>
                      <span className="text-xs">
                        {formatTime(msg.timestamp)}
                      </span>
                      {isOwner && getMessageStatus(msg)}
                    </div>
                  </div>

                  <div className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                      <MoreVertical className="w-4 h-4 text-gray-400" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {isTyping && (
          <div className="flex justify-start">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
              <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-md px-4 py-2">
                <div className="flex items-center gap-1">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                  <span className="text-xs text-gray-500 ml-2">Customer is typing...</span>
                </div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t border-gray-200 bg-white p-4">
        <div className="flex items-end gap-3">
          <div className="flex-1 relative">
            <textarea
              ref={textareaRef}
              value={text}
              placeholder="Type your message..."
              onChange={(e) => setText(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full resize-none border border-gray-300 rounded-lg px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm max-h-32"
              rows={1}
            />
            <div className="absolute right-3 bottom-3 flex items-center gap-1">
              <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                <Paperclip className="w-4 h-4 text-gray-400" />
              </button>
              <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                <Smile className="w-4 h-4 text-gray-400" />
              </button>
            </div>
          </div>
          <button
            onClick={handleSend}
            disabled={text.trim() === ""}
            className={`p-3 rounded-lg transition-all duration-200 ${
              text.trim() === ""
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 text-white shadow-sm hover:shadow-md"
            }`}
          >
            <Send className="w-5 h-5" />
          </button>
        </div>

        <div className="flex items-center gap-2 mt-3">
          <button className="px-3 py-1 text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full transition-colors">
            Quick Reply
          </button>
          <button className="px-3 py-1 text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full transition-colors">
            Send File
          </button>
          <button className="px-3 py-1 text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full transition-colors">
            Templates
          </button>
        </div>
      </div>
    </div>
  );
}
