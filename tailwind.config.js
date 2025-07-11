/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        corporate: {
          black: "#1a1a1a",
          "black-light": "#2d2d2d",
          "black-lighter": "#404040",
          yellow: "#ffd700",
          "yellow-light": "#ffed4e",
          "yellow-lighter": "#fff9c4",
        },
      },
      fontFamily: {
        corporate: ["Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        corporate:
          "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        "corporate-lg":
          "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      },
    },
  },
  plugins: [],
};
