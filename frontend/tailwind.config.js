module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      height: {
        full: '100%',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
