/** @type {import('tailwindcss').Config} */
export default {
  content: ['./public/**/*.html', './src/**/*.{js,jsx,ts,tsx,vue}'],
  theme: {
    fontFamily: {
      sans: ['Noto Sans Georgian', 'sans-serif'],
      serif: ['Noto Sans Georgian', 'serif'],
    },
    extend: {
      colors: {
        grey: '#657178',
        lightBlue: '#F5F8FF',
        blue: '#585ee2',
        primaryLight: '#f5f8ff',
        background: '#f2f3f7',
      },
    },
  },
  plugins: [],
};
