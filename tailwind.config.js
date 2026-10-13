/** @type {import('tailwindcss').Config} */
export default {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Clean clinic palette: porcelain white · clinical teal · deep ink
        cream: '#F7FBFB',
        champagne: '#0EA5A8',
        espresso: '#14343B',
      },
      fontFamily: {
        display: ['var(--font-heading)', 'system-ui', 'sans-serif'],
        heading: ['var(--font-heading)', 'system-ui', 'sans-serif'],
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
