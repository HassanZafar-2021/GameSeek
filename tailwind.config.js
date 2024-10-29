// tailwind.config.js
module.exports = {
    darkMode: 'class',
    content: [
      // Add paths to your pages or components that use Flowbite and Tailwind classes
        './src/**/*.html',
        './src/**/*.js',
        './src/**/*.jsx',
    ],
    theme: {
      extend: {},
    },
    plugins: [
      require('flowbite/plugin')
    ],
  };
  