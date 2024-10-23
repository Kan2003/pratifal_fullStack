/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        "press-start": ['"Press Start 2P"', "cursive"],
        lato: ["Lato", "sans-serif"],
        headlandOne: ["Headland One", "serif"],
        "hanken-grotesk": ["Hanken Grotesk", "sans-serif"],
        Harmattan: ["Harmattan", "sans-serif"],
        Economica: ["Economica", "sans-serif"],
      },
      fontWeight: {
        "extra-light": 100,
        light: 300,
        normal: 400,
        medium: 500,
        "semi-bold": 600,
        bold: 700,
        "extra-bold": 900,
      },
      screens : {
        'xs': '330px',    
      }
    },
  },
  plugins: [],
};
