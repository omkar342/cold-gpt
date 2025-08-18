/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'chatgpt-gray': '#343541',
        'chatgpt-dark': '#202123',
        'chatgpt-light': '#444654',
        'chatgpt-border': '#565869',
        'chatgpt-text': '#ECECF1',
        'chatgpt-accent': '#10A37F'
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
