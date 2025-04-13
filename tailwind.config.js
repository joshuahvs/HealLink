// tailwind.config.js
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        black: '#000000',   // Hitam
        gray: '#6B7280',    // Abu-abu
        white: '#FFFFFF',   // Putih
        blue: {
          light: '#60A5FA', // Biru terang
          default: '#3B82F6', // Biru default
        },
        green: '#84CC16',   // Hijau
      },
    },
  },
  plugins: [],
}
