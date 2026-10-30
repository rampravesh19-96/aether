/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        void: '#08090D',
        graphite: '#151922',
        silver: '#A8B5C8',
        electric: '#7B9DFF',
        paper: '#F2F3F5',
      },
      fontFamily: {
        sans: ['Manrope', 'sans-serif'],
        mono: ['DM Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
