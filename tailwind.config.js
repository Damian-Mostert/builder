/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/lib/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/styles/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Hero: "Hero-Light-Regular",
        HeroLight: "Hero-Light-Light",
      },
      screens: {
        md: {
          max: "1112px",
        },
        lg: {
          min: "1112px"
        }
      }
    },
  },
  plugins: []
};
