/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primaryColor: "hsl(94, 55%, 56%)",
        hoverBtn: "#A9EBEF",
        mainBg: "#bddae0",
        mainColor: "#8CCADD",
        toDo: "#FFECEC",
        inProgress: "#D9F6FF",
        completed: "#D1FEC6",
        pending: "#FFFCB5",
        tagMemberBg: "#FFD6E8",
        tagMemberText: "#B94B7B",

        blueLevel1: "#E9F7FA",
        blueLevel2: "#CCEBF3", 
        blueLevel3: "#A2D0DD", 
        blueLevel4: "#4E93B2",
        blueLevel5: "#1B4769", // Màu xanh biển đậm nhất: icon, title, button

        textPrimary: "#2d4140", // Màu chữ chính
        textSecondary: "#888a7c", // Màu chữ phụ + icon inactive
      },
      fontSize: {
        14: "14px",
        18: "18px",
        24: "24px",
        32: "32px",
      },
      animation: {
        floating: "floating 3s ease-in-out infinite",
      },
      keyframes: {
        floating: {
          "0%": { transform: "translate(0, 0px)" },
          "50%": { transform: "translate(0, 10px)" },
          "100%": { transform: "translate(0, -0px)" },
        },
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
