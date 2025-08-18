import React from 'react';
import { getConfig } from '../config';
import { Plus, Trash2, MessageSquare, Settings as SettingsIcon } from 'lucide-react';

const Sidebar = ({ clearChat, setShowSettings }) => {
  return (
    <div className="w-64 bg-chatgpt-dark border-r border-chatgpt-border flex flex-col">
      {/* New Chat Button */}
      <div className="p-4">
        <button
          onClick={clearChat}
          className="w-full flex items-center justify-center space-x-2 p-3 bg-chatgpt-light hover:bg-gray-600 rounded-lg text-chatgpt-text transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>New Chat</span>
        </button>
      </div>

      {/* Chat History */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-2">
          {/* Example chat history items */}
          <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-chatgpt-light cursor-pointer transition-colors">
            <MessageSquare className="w-4 h-4 text-chatgpt-text" />
            <span className="text-sm text-chatgpt-text truncate">Previous conversation</span>
          </div>
          <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-chatgpt-light cursor-pointer transition-colors">
            <MessageSquare className="w-4 h-4 text-chatgpt-text" />
            <span className="text-sm text-chatgpt-text truncate">Another chat</span>
          </div>
        </div>
      </div>

              {/* Configuration Info */}
        <div className="p-4 border-t border-chatgpt-border">
          <div className="text-xs text-gray-400 space-y-1">
            <div>Model: {getConfig('GEMINI.DEFAULT_MODEL') || 'gemini-pro'}</div>
            <div>Max Tokens: {getConfig('GEMINI.MAX_TOKENS') || 1000}</div>
            <div>Temperature: {getConfig('GEMINI.TEMPERATURE') || 0.7}</div>
          </div>
        </div>

      {/* Bottom Actions */}
      <div className="p-4 border-t border-chatgpt-border">
        <div className="space-y-2">
          <button
            onClick={() => setShowSettings(true)}
            className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-chatgpt-light text-chatgpt-text transition-colors"
          >
            <SettingsIcon className="w-5 h-5" />
            <span>Settings</span>
          </button>
          
          <button
            onClick={clearChat}
            className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-chatgpt-light text-chatgpt-text transition-colors"
          >
            <Trash2 className="w-5 h-5" />
            <span>Clear Chat</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
