export default {
  darkMode: "class",
  content: ["./*.html", "./src/**/*.html", "./src/**/*.js", "./src/**/*.jsx"],
  theme: {
    extend: {
      zIndex: {
        "nes-modal": "1050",
      },
    },
  },
  safelist: ["nes-btn", "nes-container", "nes-icon", "nes-balloon"],
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    require("flowbite/plugin"),
  ],
};
