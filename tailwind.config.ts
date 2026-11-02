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
        luxury: {
          50: '#FDFBF7',
          100: '#FAF5ED',
          200: '#F3E8D8',
          300: '#E7D5BD',
          400: '#D5BC98',
          500: '#C5A059', // Primary Gold Accent
          600: '#B08B44',
          700: '#8C6C30',
          800: '#684F25',
          900: '#47361A',
        },
        gold: {
          light: '#F5E6B8',
          DEFAULT: '#C5A059',
          dark: '#9E7E36',
          shimmer: '#E8D39E'
        },
        cream: {
          light: '#FFFDF9',
          DEFAULT: '#F8F5F0',
          dark: '#EDE7DE',
        },
        walnut: {
          light: '#4A3B32',
          DEFAULT: '#2C221E',
          dark: '#1C1512',
        },
        charcoal: {
          light: '#333333',
          DEFAULT: '#1A1A1A',
          dark: '#0F0F0F',
        }
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'Playfair Display', 'Cinzel', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'luxury': '0 20px 40px -15px rgba(44, 34, 30, 0.08)',
        'luxury-hover': '0 30px 60px -15px rgba(197, 160, 89, 0.2)',
        'gold-glow': '0 0 25px rgba(197, 160, 89, 0.35)',
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #DFBE7C 0%, #C5A059 50%, #9E7E36 100%)',
        'dark-gradient': 'linear-gradient(180deg, #1C1512 0%, #2C221E 100%)',
        'soft-cream': 'linear-gradient(180deg, #FFFDF9 0%, #F8F5F0 100%)',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        },
      },
      animation: {
        'marquee': 'marquee 30s linear infinite',
        'marquee-slow': 'marquee 45s linear infinite',
        'marquee-reverse': 'marquee-reverse 30s linear infinite',
      },
    },
  },
  plugins: [],
};
export default config;

