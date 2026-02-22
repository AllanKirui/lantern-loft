/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    screens: {
      sm: "480px",
      sm_plus: "640px",
      md: "768px",
      lg: "976px",
      xl: "1440px"
    },
    extend: {
      fontFamily: {
        sans: [
          "IBM Plex Sans",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif"
        ],
        birthstone: ["Birthstone Bounce"]
      },
      colors: {
        black: "#020101",
        jet: "#333333",
        bone: "#e7d9cc",
        cream: "#f5eddb",
        crayola: "#f6c96e",
        "eerie-black": "#1a1a1a",
        "cosmic-latte": "#fefaea",
        "chestnut-brown": "#5f4235",
        "pale-brown": "#7a6153",
        "pastel-orange": "#ff7f2a",
        "pastel-yellow": "#f39852",
        "red-munsell": "#ec003f",
        "red-pigment": "#e81e25"
      }
    }
  },
  plugins: []
}
