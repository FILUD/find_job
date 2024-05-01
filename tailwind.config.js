/** @type {import('tailwindcss').Config} */



module.exports = {
  daisyui: {
    themes: ["light", "dark", "cupcake"],
  },
  theme: {  
    extend: {
      fontFamily: {
        notoLao: ['NotoSanLao', 'sans-serif'],
      },
      height: {
        '128': '32rem',
      }
    },
  },
  plugins: [require("daisyui")],
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
  ],
};

