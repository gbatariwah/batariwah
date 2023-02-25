/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui"), require("@tailwindcss/typography")],
  daisyui: {
    themes: ["halloween", "coffee", "bumblebee", "lofi"],
    darkTheme: "halloween",
  },
};
