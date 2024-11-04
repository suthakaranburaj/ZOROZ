/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      screens: {
        'custom600': {'max': '600px'}, // Custom media query
        'custom500': {'max':'500px'},
        'custom1024':{'max':'1024px'},
        'custom766':{'max':'767px'},
        'custom480':{'max':'480px'},
        'custom456':{'max':'456px'},
      },
    },
  },
  plugins: [],
}

