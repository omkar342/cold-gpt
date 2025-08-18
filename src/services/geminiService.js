import axios from 'axios';
import { getConfig } from '../config';

class GeminiService {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.client = axios.create({
      baseURL: getConfig('GEMINI.API_URL') + getConfig('GEMINI.DEFAULT_MODEL') + ':generateContent',
      headers: {
        'Content-Type': 'application/json',
        [getConfig('GEMINI.API_KEY_NAME')]: apiKey // Use dynamic header name
      },
    });
  }

  async sendMessage(message, conversationHistory = []) {
    try {
      const messages = [
        {
          role: 'user',
          parts: [{ text: message }]
        }
      ];

      // Gemini API uses 'parts' in 'contents' for conversation history
      const geminiConversationHistory = conversationHistory.map(msg => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.content }]
      }));

      const response = await this.client.post('', {
        contents: [
          ...geminiConversationHistory,
          ...messages
        ],
        generationConfig: {
          maxOutputTokens: getConfig('GEMINI.MAX_TOKENS'),
          temperature: getConfig('GEMINI.TEMPERATURE'),
        },
      });

      return response.data.candidates[0].content.parts[0].text;
    } catch (error) {
      console.error('Gemini API Error:', error);
      if (error.response?.status === 401) {
        throw new Error('Invalid API key. Please check your Google Gemini API key in settings.');
      } else if (error.response?.status === 429) {
        throw new Error('Rate limit exceeded. Please try again later.');
      } else if (error.response?.status >= 500) {
        throw new Error('Gemini service is currently unavailable. Please try again later.');
      } else {
        throw new Error('Failed to get response from AI. Please try again.');
      }
    }
  }

  // Gemini API does not have a direct streaming equivalent like OpenAI's completions API
  // For streaming, you would typically use their SDK or handle chunking manually if the API supports it.
  // For this example, we'll remove the streamMessage method.
}

export default GeminiService;

