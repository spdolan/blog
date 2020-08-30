const defaultSans = [
  "system-ui",
  "-apple-system",
  "BlinkMacSystemFont",
  '"Segoe UI"',
  "Roboto",
  '"Helvetica Neue"',
  "Arial",
  '"Noto Sans"',
  "sans-serif",
  '"Apple Color Emoji"',
  '"Segoe UI Emoji"',
  '"Segoe UI Symbol"',
  '"Noto Color Emoji"',
];

const defaultSerif = [
  "Georgia",
  "Cambria",
  '"Times New Roman"',
  "Times",
  "serif",
];

module.exports = {
  purge: ["./**/{pages,components,tailwind}/**/*.{js,jsx,ts,tsx,css}"],
  theme: {
    extend: {
      colors: {
        "neon-orange": "#526cbf",
      },
      fontSize: {
        "7xl": "4.5rem",
      },
      spacing: {
        14: "3.375rem",
      },
    },
    fontFamily: {
      display: ["Nunito Sans", ...defaultSans],
      body: ["Alegreya", ...defaultSerif],
    },
    typography: (theme) => ({
      default: {
        css: {
          color: theme("colors.gray.900"),
          blockquote: {
            borderLeftColor: theme("colors.gray.700"),
          },
          "ol > li::before": {
            color: theme("colors.gray.700"),
          },
          "ul > li::before": {
            backgroundColor: theme("colors.gray.700"),
          },
          a: {
            color: "#526cbf",
          },
        },
      },
    }),
  },
  variants: {},
  plugins: [require("@tailwindcss/typography")],
};
