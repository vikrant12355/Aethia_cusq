/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#ffffff",
        foreground: "#09090b",
        card: {
          DEFAULT: "#ffffff",
          foreground: "#09090b",
          border: "#e4e4e7",
        },
        panel: {
          DEFAULT: "#f8f9fa",
          border: "#e4e4e7",
          hover: "#f1f5f9",
        },
        chestnut: {
          50: "#faf4f0",
          100: "#f4e6dc",
          200: "#e7caa9",
          300: "#d7a574",
          400: "#c37e42",
          500: "#9a4e1b",
          600: "#8b4513",
          700: "#6d330d",
          800: "#54260a",
          900: "#3d1b06",
          950: "#240e03",
        },
      },
      fontFamily: {
        sans: ["Manrope", "Inter", "sans-serif"],
        mono: ["JetBrains Mono", "SF Mono", "Consolas", "monospace"],
      },
      fontSize: {
        "2xs": ["0.6875rem", { lineHeight: "0.875rem", letterSpacing: "0.02em" }],
      },
      boxShadow: {
        "chestnut-glow": "0 0 25px -5px rgba(154, 78, 27, 0.2)",
        "terminal": "0 4px 20px -2px rgba(0, 0, 0, 0.08)",
      }
    },
  },
  plugins: [],
};
