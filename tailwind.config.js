/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#1769aa",
          50: "#e1f2ff",
          100: "#b3d9ff",
          200: "#80c1ff",
          300: "#4da8f5",
          400: "#1f8fe8",
          500: "#1769aa",
          600: "#115181",
          700: "#0b3a59",
          800: "#052231",
          900: "#010a0f"
        },
        accent: "#ffb74d"
      }
    }
  },
  plugins: []
};
