/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          900: 'hsl(var(--hue-sat-primary) 7% / <alpha-value>)',
          800: 'hsl(var(--hue-sat-primary) 17% / <alpha-value>)',
          700: 'hsl(var(--hue-sat-primary) 27% / <alpha-value>)',
          600: 'hsl(var(--hue-sat-primary) 37% / <alpha-value>)',
          500: 'hsl(var(--hue-sat-primary) 47% / <alpha-value>)',
          450: 'hsl(var(--hue-sat-primary) 51% / <alpha-value>)',
          400: 'hsl(var(--hue-sat-primary) 57% / <alpha-value>)',
          300: 'hsl(var(--hue-sat-primary) 67% / <alpha-value>)',
          200: 'hsl(var(--hue-sat-primary) 77% / <alpha-value>)',
          100: 'hsl(var(--hue-sat-primary) 87% / <alpha-value>)',
        }
      }
    },
  },
  plugins: [],
}