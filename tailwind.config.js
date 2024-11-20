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
        dark: "#161616",
        "modal-bg": "#1a1a1a",
        "input-dark": "rgba(0, 0, 0, 0.2)",
      },

      backgroundColor: {
        'modal': 'rgba(22, 22, 22, 0.8)',
        'modal-content': '#1a1a1a',
      },
      
      zIndex: {
        'modal': 60,
      },

      animation: {
        'slide-up': 'slideUp 0.3s ease-out',
        'fade-in': 'fadeIn 0.2s ease-out',
        'spin-slow': 'spin 2s linear infinite',
      },

      keyframes: {
        slideUp: {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },

      borderColor: {
        'default': '#E8D2A0',
      },

      opacity: {
        '85': '0.85',
      },
    },
  },
  plugins: [],
};