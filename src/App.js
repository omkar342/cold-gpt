import React, { useState, useRef, useEffect } from 'react';
import ChatMessage from './components/ChatMessage';
import ChatInput from './components/ChatInput';
import Sidebar from './components/Sidebar';
import GeminiService from './services/geminiService';
import { getConfig, validateConfig } from './config';
import { MessageCircle, Bot, User, Settings, Plus } from 'lucide-react';

function App() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: 'assistant',
      content: 'Hello! I\'m your AI assistant. How can I help you today?',
      timestamp: new Date().toLocaleTimeString()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState(() => {
    const storageKey = getConfig('STORAGE.API_KEY') || 'openai-api-key';
    return localStorage.getItem(storageKey) || '';
  });
  const [showSettings, setShowSettings] = useState(false);
  const messagesEndRef = useRef(null);

  // Validate configuration on component mount
  useEffect(() => {
    validateConfig();
  }, []);

  const scrollToBottom = () => {
    const scrollBehavior = getConfig('UI.SCROLL_BEHAVIOR') || 'smooth';
    messagesEndRef.current?.scrollIntoView({ behavior: scrollBehavior });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (message) => {
    if (!message.trim()) return;

    const userMessage = {
      id: Date.now(),
      role: 'user',
      content: message,
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      if (!apiKey) {
        // No API key, show simulated response
        setTimeout(() => {
          const assistantMessage = {
            id: Date.now() + 1,
            role: 'assistant',
            content: `I received your message: "${message}". This is a simulated response. To get real AI responses, please add your OpenAI API key in the settings.`,
            timestamp: new Date().toLocaleTimeString()
          };
          setMessages(prev => [...prev, assistantMessage]);
          setIsLoading(false);
        }, 1000);
        return;
      }

      // Use Gemini API for real responses
      const geminiService = new GeminiService(apiKey);
      const conversationHistory = messages
        .filter(msg => msg.role !== 'system')
        .map(msg => ({
          role: msg.role,
          content: msg.content
        }));

      const response = await geminiService.sendMessage(message, conversationHistory);
      
      const assistantMessage = {
        id: Date.now() + 1,
        role: 'assistant',
        content: response,
        timestamp: new Date().toLocaleTimeString()
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);
    } catch (error) {
      console.error('Error sending message:', error);
      
      const errorMessage = {
        id: Date.now() + 1,
        role: 'assistant',
        content: `Error: ${error.message}. Please check your API key and try again.`,
        timestamp: new Date().toLocaleTimeString()
      };
      
      setMessages(prev => [...prev, errorMessage]);
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: Date.now(),
        role: 'assistant',
        content: 'Hello! I\'m your AI assistant. How can I help you today?',
        timestamp: new Date().toLocaleTimeString()
      }
    ]);
  };

  return (
    <div className="flex h-screen bg-chatgpt-gray">
      {/* Sidebar */}
      <Sidebar 
        clearChat={clearChat}
        setShowSettings={setShowSettings}
      />

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-chatgpt-dark border-b border-chatgpt-border p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <MessageCircle className="w-6 h-6 text-chatgpt-accent" />
              <div>
                <h1 className="text-xl font-semibold text-chatgpt-text">ChatGPT Clone</h1>
                <p className="text-xs text-gray-400">Using {getConfig('GEMINI.DEFAULT_MODEL') || 'gemini-pro'}</p>
              </div>
            </div>
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="p-2 rounded-lg hover:bg-chatgpt-light transition-colors"
            >
              <Settings className="w-5 h-5 text-chatgpt-text" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* Configuration Info Bar */}
          <div className="text-center p-2 bg-chatgpt-light rounded-lg">
            <span className="text-xs text-gray-400">
              Using {getConfig('GEMINI.DEFAULT_MODEL') || 'gemini-pro'} • Max {getConfig('GEMINI.MAX_TOKENS') || 1000} tokens • Temp {getConfig('GEMINI.TEMPERATURE') || 0.7}
            </span>
          </div>
          
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
          {isLoading && (
            <div className="flex items-center space-x-3 p-4 bg-chatgpt-light rounded-lg">
              <div className="w-8 h-8 bg-chatgpt-accent rounded-full flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-chatgpt-accent rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-chatgpt-accent rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                <div className="w-2 h-2 bg-chatgpt-accent rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
      </div>

      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-chatgpt-dark border border-chatgpt-border rounded-lg p-6 w-96">
            <h2 className="text-xl font-semibold mb-4 text-chatgpt-text">Settings</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-chatgpt-text mb-2">
                  OpenAI API Key
                </label>
                <input
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="AI API key (e.g., Google Gemini)"
                  className="w-full p-3 bg-chatgpt-light border border-chatgpt-border rounded-lg text-chatgpt-text focus:outline-none focus:ring-2 focus:ring-chatgpt-accent"
                />
                <p className="text-xs text-gray-400 mt-1">
                  Your API key is stored locally and never sent to our servers.
                </p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-chatgpt-text mb-2">
                  AI Model
                </label>
                <div className="p-3 bg-chatgpt-light border border-chatgpt-border rounded-lg text-chatgpt-text">
                  {getConfig('GEMINI.DEFAULT_MODEL') || 'gemini-pro'}
                </div>
                <p className="text-xs text-gray-400 mt-1">
                  Currently using {getConfig('GEMINI.DEFAULT_MODEL') || 'gemini-pro'} with {getConfig('GEMINI.MAX_TOKENS') || 1000} max tokens
                </p>
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowSettings(false)}
                  className="flex-1 p-3 bg-chatgpt-light hover:bg-gray-600 rounded-lg text-chatgpt-text transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    const storageKey = getConfig('STORAGE.API_KEY') || 'openai-api-key';
                    localStorage.setItem(storageKey, apiKey);
                    setShowSettings(false);
                  }}
                  className="flex-1 p-3 bg-chatgpt-accent hover:bg-green-600 rounded-lg text-white transition-colors"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
