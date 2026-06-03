/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Aqua palette: cool misted white · teal accent · deep teal ink
        cream: '#E6F5F7',
        champagne: '#1BA8B5',
        espresso: '#0E3B40',
      },
      fontFamily: {
        display: ['"Manrope"', 'system-ui', 'sans-serif'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
