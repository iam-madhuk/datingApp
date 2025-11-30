/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f7ff',
          100: '#d6eaff',
          200: '#add4ff',
          300: '#7bb7ff',
          400: '#4f97ff',
          500: '#1f75ff',
          600: '#165dde',
          700: '#1149b0',
          800: '#0e3c8f',
          900: '#0a2a63'
        }
      }
    }
  },
  plugins: []
}
