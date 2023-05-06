const daisyui = require('daisyui');

/** @type {import('tailwindcss').Config} */
module.exports = {
  // purge: ['./build/*.html'],
  content: ['./src/**/*.tsx'],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
};
