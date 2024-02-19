/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/styles/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/react-tailwindcss-datetimepicker/dist/react-tailwindcss-datetimepicker.js",
  ],
  theme: {
    extend: {
      fontFamily: {
        Hero: "Hero-Light-Regular",
        HeroLight: "Hero-Light-Light",
      },
      screens:{
        md:{
          max:"1112px"
        }
      }
    },
  },
  plugins: [],
};
