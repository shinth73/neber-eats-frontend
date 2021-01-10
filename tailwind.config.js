/** @format */
const colors = require("tailwindcss/colors");

module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      // sans: ["ui-sans-serif", "system-ui"],
      sans: ["sans-serif", "Helvetica", "Arial"],
    },
    extend: {
      colors: {
        lime: colors.lime,
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
