// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default { // Or module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // This content array is still correct
  ],
  theme: {
    extend: {
      // You can add your custom theme extensions here later if needed
      // For example:
      // colors: {
      //   'brand-blue': '#007bff',
      // },
    },
  },
  plugins: [],
}