/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        stone: {
          50: "#FBFAF7",
          100: "#F5F3EE",
          200: "#EAE6DC",
          300: "#DBD5C6",
        },
        ink: {
          DEFAULT: "#18160F",
          700: "#2B2820",
          500: "#57503F",
          300: "#8A8270",
        },
        brass: {
          50: "#F8F1E2",
          200: "#E4C88A",
          400: "#C39A45",
          500: "#B8863B",
          600: "#96692A",
          700: "#734F1F",
        },
        line: "#E4E0D6",
        forest: "#2F6B4F",
        rust: "#B4432E",
      },
      fontFamily: {
        display: ["Fraunces", "serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(24,22,15,0.06), 0 8px 24px -12px rgba(24,22,15,0.12)",
      },
      keyframes: {
        "fade-in": { from: { opacity: 0 }, to: { opacity: 1 } },
        "slide-up": { from: { opacity: 0, transform: "translateY(8px)" }, to: { opacity: 1, transform: "translateY(0)" } },
      },
      animation: {
        "fade-in": "fade-in 0.2s ease-out",
        "slide-up": "slide-up 0.25s ease-out",
      },
    },
  },
  plugins: [],
};
