/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      
      colors: {
        primaryColor: "hsl(94, 55%, 56%)",
        hoverBtn: "#A9EBEF",
        mainBg:"#AFCED0",
        mainColor:"#8CCADD"
      },
      fontSize: {
        14: "14px",
        18: "18px",
        24: "24px",
        32: "32px",
      },
    },
  },
  plugins: [],
}