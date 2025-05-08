/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "button-fill": "#f9940a63", // button fill style from Figma Tokens
        // Figma-exported tokens
        "nav-background": "#fff9f1ff", // nav bar background from Figma
        "nav-link": "#000000ff", // nav link text color from Figma
        "button-primary": "#000000ff", // button primary fill color
        // original gray scale
        gray: {
          50: "#f9fafb",
          100: "#f3f4f6",
          200: "#e5e7eb",
          300: "#d1d5db",
          400: "#9ca3af",
          500: "#6b7280",
          600: "#4b5563",
          700: "#374151",
          800: "#1f2937",
          900: "#111827",
        },
        // original primary color scale
        primary: {
          50: "#ffffff",
          100: "#f7f7f7",
          200: "#ededed",
          300: "#d2d2d2",
          400: "#b1b1b1",
          500: "#737373",
          600: "#404040",
          700: "#1a1a1a",
          800: "#0d0d0d",
          900: "#000000",
        },
        // original accent color scale
        accent: {
          50: "#ffe5e5",
          100: "#fbb8b8",
          200: "#f28a8a",
          300: "#ea5c5c",
          400: "#e12e2e",
          500: "#c41f1f",
          600: "#a11a1a",
          700: "#6d1313",
          800: "#420c0c",
          900: "#1e0606",
        },
        // semantic tokens (new) without breaking existing classes
        background: "#F5E4D9", // warm beige backdrop
        surface: "#FFFFFF", // clean surface white
        "primary-dark": "#70543E", // dark wood accent
        "accent-light": "#F9940A", // bright orange button fill
        // hero image overlay fills
        "hero-fill-0": "#65360d80", // reduced opacity for mist effect
        "hero-fill-1": "#00000022", // lighter black tint
        "hero-fill-2": "#00000022", // lighter black tint
      },
      boxShadow: {
        // nav drop-shadow per Figma spec
        nav: "0 2px 4px rgba(0, 0, 0, 0.1)",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        display: ["Playfair Display", "serif"],
        montserrat: ["Montserrat", "sans-serif"],
      },
    },
  },
  plugins: [],
};
