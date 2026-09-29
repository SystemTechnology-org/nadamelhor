import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: "#0C1014", // Background principal
          secondary: "#121610", // Background secundário
          elevated: "#161B1F",
          card: "#11161B",
        },
        surface: {
          graphite: "#231F14", // Grafite
          brown: "#302A20", // Marrom escuro
          earth: "#383226",
          dark: "#0F1318",
        },
        brand: {
          greenMuted: "#454534", // Verde/acinzentado
          blueSlate: "#526680", // Azul acinzentado
          blueMuted: "#80A3B1", // Azul claro dessaturado
          primary: "#F5F5F2", // Texto principal
          muted: "#A8A8A3", // Texto secundário
          border: "#1C242B",
          borderLight: "#2B353E",
        },
        text: {
          primary: "#F5F5F2",
          secondary: "#A8A8A3",
          muted: "#6E716E",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        editorial: ["var(--font-editorial)", "serif"],
        mono: ["monospace"],
      },
      letterSpacing: {
        ultrawide: "0.25em",
        mega: "0.35em",
      },
      fontSize: {
        "2xs": "0.65rem",
      },
      aspectRatio: {
        "3/4": "3 / 4",
        "4/5": "4 / 5",
        "16/9": "16 / 9",
        "9/16": "9 / 16",
        "2/3": "2 / 3",
      },
    },
  },
  plugins: [],
};

export default config;
