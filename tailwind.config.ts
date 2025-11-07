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
          start: '#0f0f0f',
          end: '#1a1a1a',
        },
        card: 'rgba(255, 255, 255, 0.05)',
        text: {
          primary: '#ffffff',
          secondary: '#a0a0a0',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-dark': 'linear-gradient(to bottom, #0f0f0f, #1a1a1a)',
      },
    },
  },
  plugins: [],
};

export default config;
