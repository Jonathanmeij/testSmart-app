/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "san-marino": {
          50: "#f4f6fb",
          100: "#e8edf6",
          200: "#cdd9ea",
          300: "#a1b9d8",
          400: "#6e93c2",
          500: "#4870a2",
          600: "#3a5d8f",
          700: "#304b74",
          800: "#2b4161",
          900: "#283952",
        },
      },
    },
  },
  plugins: [],
};

module.exports = config;
