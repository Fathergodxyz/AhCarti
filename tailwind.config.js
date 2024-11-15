const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        xs: "480px",
        ...defaultTheme.screens,
      },

      fontFamily: {
        sans: ["Jaro", ...defaultTheme.fontFamily.sans],
        madimi: ["Madimi One", ...defaultTheme.fontFamily.sans],
        raleway: ["Raleway", ...defaultTheme.fontFamily.sans],
      },

      colors: {
        maroon: "#580704",
        "pale-gold": "#E8D2A0",
      },
    },
  },
  plugins: [],
};
