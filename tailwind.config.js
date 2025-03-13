/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  mode: "jit",
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#fda5ce",
          dark: "#82033e",
          light: "#fda5ce21",
        },
        background: {
          dark: "#1b1e39",
          light: "#2c314f",
          highlight: "#2e3550",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
