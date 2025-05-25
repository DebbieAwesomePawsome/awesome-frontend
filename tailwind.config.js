/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [ // <-- ADD THIS SECTION
    'm-12',
    'p-12',
    'font-extrabold',
    'bg-blue-700',
    'text-yellow-300',
    'text-5xl',
    // Let's also add one of your original test colors
    'text-pink-500',
    'underline'
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}