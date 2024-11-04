/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        amazon_blue: "#131921",
        amazon_yellow: "#febd69",
      },
    },
  },
  plugins: [],
}