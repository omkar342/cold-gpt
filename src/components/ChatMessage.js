import React from 'react';
import { Bot, User } from 'lucide-react';

const ChatMessage = ({ message }) => {
  const isUser = message.role === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`flex items-start space-x-3 max-w-4xl ${isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
        {/* Avatar */}
        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
          isUser ? 'bg-chatgpt-accent' : 'bg-gray-600'
        }`}>
          {isUser ? (
            <User className="w-5 h-5 text-white" />
          ) : (
            <Bot className="w-5 h-5 text-white" />
          )}
        </div>

        {/* Message Content */}
        <div className={`flex-1 ${isUser ? 'text-right' : 'text-left'}`}>
          <div className={`inline-block p-4 rounded-lg ${
            isUser 
              ? 'bg-chatgpt-accent text-white' 
              : 'bg-chatgpt-light text-chatgpt-text'
          }`}>
            <div className="whitespace-pre-wrap break-words">
              {message.content}
            </div>
          </div>
          
          {/* Timestamp */}
          <div className={`text-xs text-gray-400 mt-2 ${
            isUser ? 'text-right' : 'text-left'
          }`}>
            {message.timestamp}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
