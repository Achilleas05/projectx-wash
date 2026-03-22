import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        px: {
          bg: "#050509", // main background
          card: "#151519", // card background
          gold: "#f9b54a", // headings
          neon: "#9efc3f", // X green
        },
      },
    },
  },
  plugins: [],
};

export default config;
