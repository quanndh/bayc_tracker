/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        insetShadow: `box-shadow: -65px 31px 341px -22px rgba(0,0,0,0.44) inset;
        -webkit-box-shadow: -65px 31px 341px -22px rgba(0,0,0,0.44) inset;
        -moz-box-shadow: -65px 31px 341px -22px rgba(0,0,0,0.44) inset;`,
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
