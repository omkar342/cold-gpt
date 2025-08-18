# ChatGPT Clone - React.js Website

A beautiful, modern ChatGPT-like interface built with React.js and Tailwind CSS. This project provides a fully functional chat interface that can be integrated with the Google Gemini API for real AI responses.

## Features

- 🎨 **Modern UI/UX**: Clean, Gemini-inspired design with dark theme
- 💬 **Real-time Chat**: Smooth chat experience with message history
- 🔧 **API Integration**: Ready for Google Gemini API integration
- 📱 **Responsive Design**: Works perfectly on desktop and mobile
- ⚡ **Fast & Smooth**: Built with React hooks and optimized performance
- 🎯 **Accessibility**: Keyboard shortcuts and screen reader support
- 🔒 **Secure**: API keys stored locally, never sent to external servers

## Screenshots

The interface includes:
- Sidebar with chat history and settings
- Main chat area with user and AI messages
- Input area with attachment and voice options
- Settings modal for API key configuration
- Beautiful animations and transitions

## Prerequisites

- Node.js (version 14 or higher)
- npm or yarn package manager
- Google Gemini API key (for real AI responses)

## Installation

1. **Clone or download the project**
   ```bash
   # If you have git installed
   git clone <repository-url>
   cd chatgpt-clone
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm start
   # or
   yarn start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## Configuration

### Setting up Google Gemini API

1. **Get an API key**
   - Visit [Google AI Studio](https://aistudio.google.com/)
   - Sign up or log in to your Google account
   - Navigate to API Keys section
   - Create a new API key

2. **Add your API key**
   - Click the Settings icon (⚙️) in the top-right corner
   - Enter your Google Gemini API key in the settings modal
   - Click Save

3. **Start chatting**
   - Your API key is stored locally in your browser
   - You can now send messages and get real AI responses

## Usage

### Basic Chat
- Type your message in the input field
- Press Enter or click the Send button
- The AI will respond using the OpenAI API

### Keyboard Shortcuts
- `Enter`: Send message
- `Shift + Enter`: New line in message
- `Ctrl/Cmd + K`: Focus on input field

### Features
- **New Chat**: Click the "New Chat" button to start fresh
- **Clear Chat**: Remove all messages from current conversation
- **Settings**: Configure your API key and preferences
- **Chat History**: View and switch between previous conversations

## Project Structure

```
src/
├── components/
│   ├── ChatMessage.js      # Individual message display
│   ├── ChatInput.js        # Message input component
│   └── Sidebar.js          # Navigation sidebar
├── services/
│   └── geminiService.js    # Google Gemini API integration
├── App.js                  # Main application component
├── index.js                # React entry point
└── index.css               # Global styles and Tailwind
```

## Customization

### Styling
The project uses Tailwind CSS for styling. You can customize:
- Colors in `tailwind.config.js`
- Global styles in `src/index.css`
- Component-specific styles in each component

### API Configuration
Modify `src/services/geminiService.js` to:
- Change the AI model (e.g., gemini-1.5-pro-latest)
- Adjust response parameters
- Add custom system prompts
- Implement different streaming options

## Deployment

### Build for Production
```bash
npm run build
# or
yarn build
```

### Deploy Options
- **Netlify**: Drag and drop the `build` folder
- **Vercel**: Connect your GitHub repository
- **AWS S3**: Upload the `build` folder to S3
- **GitHub Pages**: Use the `gh-pages` package

## Troubleshooting

### Common Issues

1. **API Key Errors**
   - Ensure your Google Gemini API key is correct
   - Check if you have sufficient API credits
   - Verify your account is active

2. **Build Errors**
   - Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`
   - Check Node.js version compatibility
   - Ensure all dependencies are properly installed

3. **Styling Issues**
   - Verify Tailwind CSS is properly configured
   - Check if PostCSS is working correctly
   - Clear browser cache

### Performance Tips
- Use the production build for deployment
- Enable gzip compression on your server
- Consider implementing message pagination for long conversations
- Use React.memo for components that don't need frequent re-renders

## Contributing

Feel free to contribute to this project by:
- Reporting bugs
- Suggesting new features
- Submitting pull requests
- Improving documentation

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

If you need help or have questions:
- Check the troubleshooting section above
- Review the code comments for implementation details
- Open an issue on the project repository

## Acknowledgments

- Built with React.js and Tailwind CSS
- Icons from Lucide React
- Inspired by ChatGPT's user interface
- Google for providing the AI API

---

**Happy Chatting! 🤖💬**
