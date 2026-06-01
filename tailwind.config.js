/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#00d4ff',
        'secondary': '#7c3aed',
        'dark-bg': '#080c14',
      },
      fontFamily: {
        'mono': ['DM Mono', 'monospace'],
        'sans': ['DM Sans', 'sans-serif'],
      },
      boxShadow: {
        'glow': '0 0 20px rgba(0, 212, 255, 0.3)',
      },
    },
  },
  plugins: [],
}
