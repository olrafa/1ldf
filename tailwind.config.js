/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ldfGreen: "#52b199",
        ldfGrey: "#312726",
        ldfPink: "#c527bc",
        ldfBlue: "#0077ad",
        ldfPurple: "#ca28bc",
        ldfRed: "#f10e21",
      },
    },
    fontFamily: {
      'titles': ["Passion One"]
    }
  },
  plugins: [],
};
