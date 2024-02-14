/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'custom': '5px 5px 0px 0px rgba(0, 173, 181, 0.4), 10px 10px 0px 0px rgba(0, 173, 181, 0.3), 15px 15px 0px 0px rgba(0, 173, 181, 0.2), 20px 20px 0px 0px rgba(0, 173, 181, 0.1), 25px 25px 0px 0px rgba(0, 173, 181, 0.05), inset 5px 5px 0px 0px rgba(57, 62, 70, 0.4), inset 10px 10px 0px 0px rgba(57, 62, 70, 0.3), inset 15px 15px 0px 0px rgba(57, 62, 70, 0.2), inset 20px 20px 0px 0px rgba(57, 62, 70, 0.1), inset 25px 25px 0px 0px rgba(57, 62, 70, 0.05)',
      },
    },
  },
  plugins: [],
}

