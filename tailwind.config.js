/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: ['"JetBrains Mono"', 'monospace'],
        sans: ['"Inter"', 'sans-serif'],
      },
      colors: {
        nexus: {
          bg: '#114C5A',        // Nocturnal Expedition
          surface: '#172B36',   // Oceanic Noir
          text: '#F1F6F4',      // Arctic Powder
          muted: '#D9E8E2',     // Mystic Mint
          accent: '#FFC801',    // Forsythia (CTAs, highlights)
          secondary: '#FF9932', // Deep Saffron (secondary accent)
          border: '#114C5A',    // Border color
        }
      }
    },
  },
  plugins: [],
}

