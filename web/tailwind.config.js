/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./common/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '6rem',
        '2xl': '7rem',
      },
    },
    extend: {
      fontFamily: {
        'opensans': ['Open Sans'],
      },
      colors: {
        primary: {
          900: 'hsl(var(--hue-sat-primary) 10% / <alpha-value>)',
          800: 'hsl(var(--hue-sat-primary) 16% / <alpha-value>)',
          700: 'hsl(var(--hue-sat-primary) 27% / <alpha-value>)',
          600: 'hsl(var(--hue-sat-primary) 37% / <alpha-value>)',
          500: 'hsl(var(--hue-sat-primary) 47% / <alpha-value>)',
          450: 'hsl(var(--hue-sat-primary) 51% / <alpha-value>)',
          400: 'hsl(var(--hue-sat-primary) 57% / <alpha-value>)',
          300: 'hsl(var(--hue-sat-primary) 67% / <alpha-value>)',
          200: 'hsl(var(--hue-sat-primary) 77% / <alpha-value>)',
          100: 'hsl(var(--hue-sat-primary) 87% / <alpha-value>)',
          50: 'hsl(var(--hue-sat-primary) 95% / <alpha-value>)',
        },
        "dark": "#121212",
      },
      gridTemplateRows: {
        'layout': 'auto 1fr auto',
      }
    },
  },
  plugins: [],
}