// Application Configuration
export const CONFIG = {
  // Google Gemini API Configuration
  GEMINI: {
    DEFAULT_MODEL: 'gemini-2.5-flash', // Or 'gemini-1.5-pro-latest' or other available Gemini models
    MAX_TOKENS: 1000,
    TEMPERATURE: 0.7,
    API_URL: 'https://generativelanguage.googleapis.com/v1beta/models/', // Base URL for Gemini API
    API_KEY_NAME: 'x-goog-api-key' // Header name for Gemini API key
  },
  
  // UI Configuration
  UI: {
    MAX_MESSAGE_LENGTH: 4000,
    TYPING_INDICATOR_DELAY: 1000,
    SCROLL_BEHAVIOR: 'smooth'
  },
  
  // Storage Keys
  STORAGE: {
    API_KEY: 'gemini-api-key',
    CHAT_HISTORY: 'chatgpt-chat-history',
    SETTINGS: 'chatgpt-settings'
  }
};

// Helper function to get configuration value
export const getConfig = (key) => {
  if (!key) {
    console.warn('getConfig called without a key');
    return undefined;
  }
  
  const keys = key.split('.');
  let value = CONFIG;
  
  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k];
    } else {
      console.warn(`Configuration key "${key}" not found. Available keys:`, Object.keys(CONFIG));
      return undefined;
    }
  }
  
  return value;
};

// Validate configuration on import
export const validateConfig = () => {
  const requiredKeys = [
    'GEMINI.DEFAULT_MODEL',
    'GEMINI.MAX_TOKENS',
    'GEMINI.TEMPERATURE',
    'GEMINI.API_URL',
    'GEMINI.API_KEY_NAME',
    'UI.MAX_MESSAGE_LENGTH',
    'UI.TYPING_INDICATOR_DELAY',
    'UI.SCROLL_BEHAVIOR',
    'STORAGE.API_KEY',
    'STORAGE.CHAT_HISTORY',
    'STORAGE.SETTINGS'
  ];
  
  const missingKeys = requiredKeys.filter(key => getConfig(key) === undefined);
  
  if (missingKeys.length > 0) {
    console.error('Missing configuration keys:', missingKeys);
    return false;
  }
  
  console.log('Configuration validated successfully');
  return true;
};
