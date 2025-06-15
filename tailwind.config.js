/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    './src/**/*.{js,jsx,ts,tsx,html}',
  ],
  plugins: [
    require("tailwindcss-animate"),
  ],
}

