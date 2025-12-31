/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        background: "#12081F",
        card: "#1C002A",
        accent: "#A855F7",
        accentHover: "#C084FC",
        gradientStart: "#9333EA",
        gradientEnd: "#C084FC",
        textSoft: "#EDE9FE"
      },
      fontFamily: {
        header: ["Poppins", "sans-serif"],
        body: ["Nunito", "sans-serif"],
        accent: ["Raleway", "sans-serif"]
      },
      boxShadow: {
        "soft-purple": "0 8px 30px rgba(147,51,234,0.12)"
      }
    }
  },
  plugins: []
}
