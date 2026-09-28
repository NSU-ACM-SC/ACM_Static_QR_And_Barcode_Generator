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
        acm: {
          paper: "var(--acm-paper)",
          ink: "var(--acm-ink)",
          orange: "var(--acm-orange)",
          blue: "var(--acm-blue)",
          purple: "var(--acm-purple)",
        },
      },
      boxShadow: {
        neo: "4px 4px 0px 0px rgba(0,0,0,1)",
        "neo-sm": "2px 2px 0px 0px rgba(0,0,0,1)",
        "neo-lg": "8px 8px 0px 0px rgba(0,0,0,1)",
      },
      translate: {
        'neo': '4px',
      }
    },
  },
  plugins: [],
};
export default config;
