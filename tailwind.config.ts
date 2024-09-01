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
        primary: {
          DEFAULT: "#C54F1F",            // Default primary color
          50: "rgba(197, 79, 31, 0.05)",  // 5% opacity
          100: "rgba(197, 79, 31, 0.1)",  // 10% opacity
          200: "rgba(197, 79, 31, 0.2)",  // 20% opacity
          300: "rgba(197, 79, 31, 0.3)",  // 30% opacity
          400: "rgba(197, 79, 31, 0.4)",  // 40% opacity
          500: "rgba(197, 79, 31, 0.5)",  // 50% opacity
          600: "rgba(197, 79, 31, 0.6)",  // 60% opacity
          700: "rgba(197, 79, 31, 0.7)",  // 70% opacity
          800: "rgba(197, 79, 31, 0.8)",  // 80% opacity
          900: "rgba(197, 79, 31, 0.9)",  // 90% opacity
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      borderRadius: {
        '4xl': '4rem', // Adjust this value as needed
      },
    },
  },
  plugins: [],
};
export default config;
