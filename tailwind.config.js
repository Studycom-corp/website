/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'mb': '375px'
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
    require('flowbite/plugin')
  ],
}

