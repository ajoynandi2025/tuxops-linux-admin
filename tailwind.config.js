/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        linux: {
          dark: '#0a0d14',
          card: '#111726',
          border: '#1e293b',
          accent: '#10b981', // Emerald terminal
          cyan: '#06b6d4',
          amber: '#f59e0b',
          red: '#ef4444'
        }
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'Courier New', 'monospace'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
