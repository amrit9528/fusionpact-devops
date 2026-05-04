import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "dark-black": "#0A050F",
        primary: "#6941C6",
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      backgroundImage: {
        "purple-gradient": "linear-gradient(90deg, #48296F 0%, #8A4FD5 100%)",
      },
      width: {
        "9xl": "1640px",
      },
      maxWidth: {
        "8xl": "1280px",
        "9xl": "1640px",
      },
      screens: {
        xs: "375px",
      },
    },
  },
  plugins: [],
} satisfies Config;
