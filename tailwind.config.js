/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f7ff',
          100: '#e0effe',
          200: '#b9ddfe',
          300: '#7cc2fd',
          400: '#36a3f9',
          500: '#0c87eb',
          600: '#0069c8',
          700: '#0154a2',
          800: '#064886',
          900: '#0b3d6f',
        },
        lost: { DEFAULT: '#ef4444', light: '#fef2f2' },
        found: { DEFAULT: '#10b981', light: '#ecfdf5' },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 3px rgba(0,0,0,.06), 0 4px 16px rgba(0,0,0,.04)',
        'card-hover': '0 4px 12px rgba(0,0,0,.08), 0 12px 32px rgba(0,0,0,.06)',
      },
    },
  },
  plugins: [],
};
