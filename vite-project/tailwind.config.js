/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      maxWidth: {
        'section': '1280px', // Consistent max-width for all sections
      },
      // Spacing System Documentation:
      // Section padding: py-24 px-8 md:py-20 md:px-6 (96px/32px mobile, 80px/24px desktop)
      // Section header margin: mb-12 md:mb-10 (48px mobile, 40px desktop)
      // Content gaps: gap-8 md:gap-6 (32px mobile, 24px desktop)
      // Large content gaps: gap-16 md:gap-12 (64px mobile, 48px desktop)
    },
  },
  plugins: [],
}





