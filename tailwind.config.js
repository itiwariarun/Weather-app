/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,css}"],
  theme: {
    extend: {
      backgroundImage: {
        "hero-pattern":
          "url('https://images.pexels.com/photos/325117/pexels-photo-325117.jpeg?auto=compress&cs=tinysrgb&w=300')",
      },
    },
  },
  plugins: [],
};
