/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./path/to/your/html/**/*.html", // Update this path to point to your HTML files
      "./path/to/your/js/**/*.js",     // Update this path to point to your JavaScript files
    ],
    theme: {
      extend: {
        colors: {
          'nes-red': '#8e2538',
          'nes-purple': '#7e2553',
          'nes-blue': '#2d3c6e',
          'nes-green': '#2d6a4f',
          'nes-yellow': '#8a8e0a',
          'nes-orange': '#cd5c0f',
          'nes-gray': '#7b7b7b',
          'nes-light-gray': '#b7b7b7',
          'nes-dark-gray': '#414141',
          'nes-white': '#ffffff',
          'nes-black': '#000000',
        },
      },
    },
    plugins: [],
  }
  