/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],

  theme: {
    extend: {
      gridTemplateColumns: {
        // 1fr 4fr
        myTopicTemplate: "1fr 3fr 3fr 1fr 1fr",
        myHomeTemplate: "2fr 5fr",
        myLoginTemplate: "3fr 2fr",
      },
      height: {
        240: "60rem",
      },
    },
  },
  plugins: [],
};
