// tailwind.config.js
export default {
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
  