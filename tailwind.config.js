/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        px: {
          bg: "#050509",
          card: "#0c0c12",
          gold: "#f9b54a",
          neon: "#9efc3f",
        },
      },
    },
  },
  plugins: [],
};
