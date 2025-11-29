/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'green-100': '#c0fd2b',
        'gray-900': '#1a1a1a',
        'gray-800': '#282828',
        'gray-700': '#333333',
      },
      fontFamily: {
        regular: "Inter_400Regular",
        bold: "Inter_700Bold",
      }
    },
  },
  plugins: [],
}
