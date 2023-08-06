/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],

  theme: {
    extend: {
      gridTemplateColumns: {
        // 1fr 4fr
        myTemplate: "1fr 4fr",
      },
    },
  },
  plugins: [],
};
