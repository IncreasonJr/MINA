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
          orange: '#FF6B35',
          'orange-hover': '#E85924',
          'orange-light': '#FFF0EB',
          cream: '#FFF8F0',
          'cream-card': '#FFFFFF',
          'cream-dark': '#F5ECE1',
          charcoal: '#1A1A1A',
          muted: '#6B7280',
          green: '#2ECC71',
          'green-light': '#E8F8F0',
          'green-dark': '#27AE60',
          border: '#EFE6DC'
        }
      },
      fontFamily: {
        sans: ['Poppins', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(26, 26, 26, 0.06)',
        'soft-lg': '0 10px 30px -4px rgba(26, 26, 26, 0.08)',
        'orange': '0 8px 24px -4px rgba(255, 107, 53, 0.35)',
        'orange-sm': '0 4px 12px -2px rgba(255, 107, 53, 0.25)',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      }
    },
  },
  plugins: [],
}
