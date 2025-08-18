import React, { useState, useRef, useEffect } from 'react';
import { getConfig } from '../config';
import { Send, Paperclip, Mic } from 'lucide-react';

const ChatInput = ({ onSendMessage, isLoading }) => {
  const [message, setMessage] = useState('');
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [message]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      onSendMessage(message);
      setMessage('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="border-t border-chatgpt-border bg-chatgpt-dark p-4">
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
        <div className="flex items-end space-x-3">
          {/* Attachment Button */}
          <button
            type="button"
            className="p-2 text-chatgpt-text hover:text-chatgpt-accent transition-colors"
            title="Attach file"
          >
            <Paperclip className="w-5 h-5" />
          </button>

          {/* Message Input */}
          <div className="flex-1 relative">
            <textarea
              ref={textareaRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message here..."
              className="w-full p-3 pr-12 bg-chatgpt-light border border-chatgpt-border rounded-lg text-chatgpt-text placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-chatgpt-accent min-h-[44px] max-h-32"
              rows="1"
              disabled={isLoading}
            />
          </div>

          {/* Voice Button */}
          <button
            type="button"
            className="p-2 text-chatgpt-text hover:text-chatgpt-accent transition-colors"
            title="Voice message"
          >
            <Mic className="w-5 h-5" />
          </button>

          {/* Send Button */}
          <button
            type="submit"
            disabled={!message.trim() || isLoading}
            className={`p-3 rounded-lg transition-all ${
              message.trim() && !isLoading
                ? 'bg-chatgpt-accent hover:bg-green-600 text-white'
                : 'bg-chatgpt-light text-gray-400 cursor-not-allowed'
            }`}
          >
            <Send className="w-5 h-5" />
          </button>
        </div>

        {/* Character Count */}
        <div className="text-xs text-gray-400 mt-2 text-right">
          {message.length}/{getConfig('UI.MAX_MESSAGE_LENGTH') || 4000} characters
        </div>
      </form>
    </div>
  );
};

export default ChatInput;
