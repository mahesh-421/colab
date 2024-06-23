/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      xxs: '360px',
      xs: '475px',
      ...defaultTheme.screens,
    },
    extend: {},
  },
  plugins: [],
};
