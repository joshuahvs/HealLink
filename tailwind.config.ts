import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        darkblue: '#3C70FF',
        blue: '#3CA1FF',
        lightblue: '#3CA1FF',
        green: '#9FE076',
      },

      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },      

      fontSize: {
        'h1': '64px',
        'h2': '32px',
        'h3': '24px', 
        'h4': '20px',
        'h1-mob': ['48px', {fontWeight: '700'}],
        'h2-mob': ['24px', {fontWeight: '700'}],
        'h3-mob': ['20px', {fontWeight: '700'}],
        'h4-mob': ['18px', {fontWeight: '700'}],
        'lg': ['18px', {fontWeight: '400'}],
        'md': ['14px', {fontWeight: '400'}],
        'sm': ['12px', {fontWeight: '400'}],
        'lg-mob': '14px',
        'md-mob': '12px',
        'sm-mob': '10px',
      }
    },
  },
  plugins: [],
} satisfies Config;
