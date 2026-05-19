/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./hooks/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary:   "#ffe16d",
        secondary: "#ffb2bf",
        accent:    "#00f1ff",
        surface:   "#231f14",
        bg:        "#161308",
        text:      "#eae2cf",
        muted:     "#d0c6ab",
      },
      fontFamily: {
        heading: ["Epilogue", "sans-serif"],
        body:    ["Inter",    "sans-serif"],
      },
      borderRadius: {
        brand: "16px",
      },
      boxShadow: {
        brand: "0 1px 3px rgba(0,0,0,0.07), 0 8px 24px rgba(0,0,0,0.04)",
        "brand-hover": "0 4px 12px rgba(0,0,0,0.10), 0 20px 48px rgba(0,0,0,0.08)",
        glow:  "0 0 24px rgba(255,225,109,0.25)",
      },
      keyframes: {
        fadeInUp: {
          from: { opacity: "0", transform: "translateY(20px)" },
          to:   { opacity: "1", transform: "translateY(0)"    },
        },
        pageFade: {
          from: { opacity: "0" },
          to:   { opacity: "1" },
        },
        slideInRight: {
          from: { opacity: "0", transform: "translateX(60px)" },
          to:   { opacity: "1", transform: "translateX(0)"    },
        },
        shimmer: {
          "0%":   { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition:  "200% 0" },
        },
      },
      animation: {
        "fade-in-up":    "fadeInUp 0.6s cubic-bezier(0.4,0,0.2,1) both",
        "page-fade":     "pageFade 0.4s ease",
        "slide-in-right":"slideInRight 0.35s cubic-bezier(0.4,0,0.2,1) both",
        shimmer:         "shimmer 1.5s infinite",
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg, #ffe16d 0%, #f5c842 100%)",
        "dark-gradient": "linear-gradient(180deg, #161308 0%, #231f14 100%)",
      },
    },
  },
  plugins: [],
};