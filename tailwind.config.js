// tailwind.config.js
export default {
  darkMode: 'class',
  content: [
      './*.html', // If you have root HTML files
      './src/**/*.html',
      './src/**/*.js',
      './src/**/*.jsx',
  ],
  theme: {
      extend: {
          zIndex: {
              'nes-modal': '1050',
          },
      },
  },
  safelist: [
      'nes-btn',
      'nes-container',
      'nes-icon',
      'nes-balloon', 
      // Any other NES.css classes you’re using
  ],
  plugins: [
      require('@tailwindcss/forms'),
      require('@tailwindcss/typography'),
      require('flowbite/plugin'),
  ],
};
