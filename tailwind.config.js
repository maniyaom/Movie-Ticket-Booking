module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Adjust according to your file extensions
  ],
  theme: {
    extend: {
      screens: {
        'sm': '640px',  // Small screens and up
        'md': '768px',  // Medium screens and up
        'lg': '1024px', // Large screens and up
        'xl': '1280px', // Extra large screens and up
        '2xl': '1536px' // 2XL screens and up
      },
    },
  },
  plugins: [],
  darkMode: 'class', // Enables dark mode based on a class
};
