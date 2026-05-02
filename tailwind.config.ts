import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#94442e",
        secondary: "#745853",
        accent: "#D4AF37",
        background: "#fff8f6",
        surface: "#ffffff",
        "on-primary": "#ffffff",
        "on-background": "#221a17",
      },
      fontFamily: {
        serif: ["Newsreader", "serif"],
        sans: ["DM Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;