// Application Configuration
export const CONFIG = {
  // OpenAI API Configuration
  OPENAI: {
    DEFAULT_MODEL: 'gpt-3.5-turbo',
    MAX_TOKENS: 1000,
    TEMPERATURE: 0.7,
    API_URL: 'https://api.openai.com/v1/chat/completions'
  },
  
  // UI Configuration
  UI: {
    MAX_MESSAGE_LENGTH: 4000,
    TYPING_INDICATOR_DELAY: 1000,
    SCROLL_BEHAVIOR: 'smooth'
  },
  
  // Storage Keys
  STORAGE: {
    API_KEY: 'openai-api-key',
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
    'OPENAI.DEFAULT_MODEL',
    'OPENAI.MAX_TOKENS',
    'OPENAI.TEMPERATURE',
    'OPENAI.API_URL',
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
