import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        pink: {
          light: "#ffc0cb",
          DEFAULT: "#ff69b4",
          dark: "#ff1493",
        },
        white: "#ffffff",
        black: "#000000",
      },
    },
  },
  plugins: [],
};
export default config;
