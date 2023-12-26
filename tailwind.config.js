/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  theme: {
    colors: {},
    extend: {},
    fontFamily: {
      body: ["Montserrat"],
    },
  },
  plugins: [require("daisyui"), require("@tailwindcss/typography")],
  daisyui: {
    themes: ["halloween", "lofi"],
    darkTheme: "halloween",
  },
};
