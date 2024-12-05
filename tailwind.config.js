/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Arial', 'Helvetica', 'sans-serif'],
        'prima-sans-bold': ['PrimaSansBT-Bold', 'Arial', 'sans-serif'],
      },
      fontSize: {
        'xl-': ['1.15rem', { lineHeight: '1.75rem' }],
        'tiny': ['0.65rem', { lineHeight: '1rem' }],
      },
      width: {
        '50': '12.5rem', // 200px
      }
    },
  },
  plugins: [],
}
