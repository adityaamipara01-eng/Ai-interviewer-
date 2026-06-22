// tailwind.config.cjs
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  darkMode: 'class', // enable class-based dark mode
  theme: {
    extend: {
      colors: {
        primary: '#3b82f6', // Tailwind blue-500
        secondary: '#6366f1', // indigo-500
      },
    },
  },
  plugins: [],
};
