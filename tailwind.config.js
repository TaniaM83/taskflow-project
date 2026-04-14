module.exports = {
  content: ['./src/**/*.{html,js}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        olive: {
          50: '#d5dace',
          100: '#c8cfbe',
          200: '#bbc4af',
          300: '#adb99a',
          400: '#7da344',
          500: '#688a38',
          600: '#526b35',
          700: '#3b4a33',
          800: '#313e2b',
          900: '#272f24',
          950: '#1d231b',
        },
        estado: {
          pendiente: '#e74c3c',
          proceso: '#f39c12',
          terminada: '#2ecc71',
          'terminada-light': '#5ef0a0',
        }
      }
    }
  },
  plugins: [],
}
