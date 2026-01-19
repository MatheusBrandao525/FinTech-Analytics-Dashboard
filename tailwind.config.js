/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        fintech: {
            primary: '#0F172A', // Slate 900
            secondary: '#1E293B', // Slate 800
            accent: '#38BDF8', // Sky 400
            success: '#10B981', // Emerald 500
            warning: '#F59E0B', // Amber 500
            danger: '#EF4444', // Red 500
            text: '#F8FAFC', // Slate 50
            muted: '#94A3B8', // Slate 400
            card: '#1E293B',
            border: '#334155'
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
