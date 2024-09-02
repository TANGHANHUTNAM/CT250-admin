/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // trang
        primary: "#ffffff",
        // den
        secondary: "#000000",
        // vang
        tertiary: "#d69c52 ",
        // xanh nhat
        bgPrimary: "#143b36",
        // den nhat
        bgSecondary: "#071513",
        // xanh dam
        bgTertiary: "#10302c",
        // opacity bg sidebar
        bgOpacity: "rgba(1, 1, 1, 0.8)",
      },
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
        dancingscript: ["Dancing Script", "cursive"],
      },
    },
  },
  plugins: [],
};