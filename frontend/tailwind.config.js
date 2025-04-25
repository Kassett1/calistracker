/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        color1: "#F8F1DF",
        color2: "#B3AC92",
        color3: "#847E69",
        color4: "#EBE3CB",
        color5: "#1B1B16",
        accent1: "#B4473B",
        accent2: "#C7AC76",
      },
      fontFamily: {
        luckiest: ['"Luckiest Guy"', "cursive"],
        cabin: ['"Cabin"', "cursive"],
      },
    },
  },
  plugins: [],
};
