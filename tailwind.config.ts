import type { Config } from "tailwindcss";

const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      boxShadow: {
        input: `0px 2px 3px -1px rgba(0,0,0,0.1), 0px 1px 0px 0px rgba(25,28,33,0.02), 0px 0px 0px 1px rgba(25,28,33,0.08)`,
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#ff6f61", // Coral (Merah Muda Cerah)
          foreground: "#ffffff", // Putih untuk teks
        },
        secondary: {
          DEFAULT: "#42a5f5", // Biru Langit Cerah
          foreground: "#ffffff", // Putih untuk teks
        },
        destructive: {
          DEFAULT: "#ef5350", // Merah Terang
          foreground: "#ffffff",
        },
        muted: {
          DEFAULT: "#9e9e9e", // Abu-abu
          foreground: "#ffffff",
        },
        accent: {
          DEFAULT: "#ffd740", // Kuning Cerah
          foreground: "#000000", // Hitam untuk teks
        },
        popover: {
          DEFAULT: "#eeeeee", // Abu-abu Terang
          foreground: "#333333", // Abu-abu Gelap
        },
        card: {
          DEFAULT: "#ffffff", // Putih
          foreground: "#212121", // Hitam
        },
      },
      borderRadius: {
        lg: "1rem", // Lebih besar untuk elemen modern
        md: "0.75rem",
        sm: "0.5rem",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), addVariablesForColors],
} satisfies Config;

function addVariablesForColors({ addBase, theme }: any) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val]),
  );

  addBase({
    ":root": newVars,
  });
}

export default config;

