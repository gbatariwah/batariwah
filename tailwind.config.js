/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  theme: {
    extend: {},
    fontFamily: {
      body: ["Montserrat"],
    },
  },
  plugins: [require("daisyui"), require("@tailwindcss/typography")],
  daisyui: {
    themes: ["halloween", "coffee", "bumblebee", "lofi"],
    darkTheme: "halloween",
  },
};
