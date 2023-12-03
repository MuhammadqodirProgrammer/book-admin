/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  darkMode: "class",
  theme: {
    variants: {
      extend: {},
    },
    extend: {
      colors: {
        mainColor: "#9F7AEA",
        // textColor: "#4F5765",
        bgColor: "#1A202C",
        cardColor: "#2D3748",
        topColor: "#171923",
        newCourcesBg: "#1A202C",
        newCourcesPreTitleColor: "#805AD5",
        newCourcesBtn: "#D6BCFA",
        newCourcesBtnHover: "#d6bcfa1f",
        famousCourcesBg: "#2d3748",
        famousCourcesFirstType: "#ececec",
        famousCourcesFirstBg: "#805ad599",
        famousCourcesSecondType: "#D6BCFA",
        famousCourcesSecondBg: "#d6bcfa29",
        famousCourcesDescsColor: "#ebebeb",
        CoursesHr: "#6d6d6d29",
        ContactBg: "#2d3748",
        ContactInputBorder: "#4f5765",
        ContactButton: "#D6BCFA",
        ContactButtonHover: "#b794f4",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
    container: {
      screens: {
        lt: "400px",
        sm: "600px",
        md: "728px",
        lg: "900px",
        xl: "992px",
      },
    },
  },
  plugins: [],
};
