/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        wellness: {
          primary: '#4F46E5',
          secondary: '#7C3AED',
          accent: '#10B981',
        }
      }
    },
  },
  plugins: [],
}
