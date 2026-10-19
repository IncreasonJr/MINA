/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        savory: {
          orange: '#FF5722',
          'orange-hover': '#E64A19',
          'orange-light': '#FFECE5',
          gold: '#FFB300',
          'gold-light': '#FFF8E1',
          cream: '#FAF6EE',
          'cream-card': '#FFFFFF',
          'cream-dark': '#F0E9DA',
          charcoal: '#141414',
          muted: '#616161',
          green: '#00C853',
          'green-light': '#E8F5E9',
          'green-dark': '#009624',
          pink: '#FF4081',
          'pink-light': '#FCE4EC',
          border: '#141414',
          paper: '#FFFDF9'
        }
      },
      fontFamily: {
        display: ['Righteous', 'cursive'],
        sans: ['Space Grotesk', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'brutal-sm': '2px 2px 0px 0px #141414',
        'brutal': '4px 4px 0px 0px #141414',
        'brutal-lg': '7px 7px 0px 0px #141414',
        'brutal-xl': '10px 10px 0px 0px #141414',
        'brutal-orange': '4px 4px 0px 0px #FF5722',
        'brutal-gold': '4px 4px 0px 0px #FFB300',
        'brutal-white': '4px 4px 0px 0px #FFFFFF',
        'soft': '0 4px 20px -2px rgba(20, 20, 20, 0.06)',
        'orange': '0 8px 24px -4px rgba(255, 87, 34, 0.35)',
      },
      borderRadius: {
        '2xl': '1.25rem',
        '3xl': '1.75rem',
      }
    },
  },
  plugins: [],
}
