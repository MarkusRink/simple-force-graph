/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,css,md,mdx,html,json,scss}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        solarized: { //by ethan schoonover
          15: "#002b36",
          20: "#073642",
          45: "#586e75",
          50: "#657b83",
          60: "#839496",
          65: "#93a1a1",
          92: "#eee8d5",
          97: "#fdf6e3",
          yellow: "#b58900",
          orange: "#cb4b16",
          red: "#dc322f",
          magenta: "#d33682",
          violet: "#6c71c4",
          blue: "#268bd2",
          cyan: "#2aa198",
          green: "#859900",
        },
      },
    },
  },
  plugins: [],
};
