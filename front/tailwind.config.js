module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
      },
      fontSize: {
        "heading-1": ["64px", { lineHeight: "80px", letterSpacing: "0%" }],
        "heading-2": ["48px", { lineHeight: "56px", letterSpacing: "0%" }],
        "heading-3": ["32px", { lineHeight: "40px", letterSpacing: "0%" }],
        "heading-4": ["24px", { lineHeight: "32px", letterSpacing: "0%" }],
        "heading-5": ["20px", { lineHeight: "24px", letterSpacing: "0%" }],
        "heading-6": ["16px", { lineHeight: "24px", letterSpacing: "0%" }],
        "body-large": ["20px", { lineHeight: "32px", letterSpacing: "0%" }],
        "body-regular": ["16px", { lineHeight: "24px", letterSpacing: "0%" }],
        "body-small": ["14px", { lineHeight: "24px", letterSpacing: "0%" }],
        "body-extra-small": [
          "12px",
          { lineHeight: "24px", letterSpacing: "0%" },
        ],
        caption: ["14px", { lineHeight: "16px", letterSpacing: "0%" }],
      },
      colors: {
        primary: "rgba(43, 209, 126, 1)",
        error: "rgba(235, 87, 87, 1)",
        background: "rgba(9, 53, 69, 1)",
        input: "rgba(34, 73, 87, 1)",
        card: "rgba(9, 44, 57, 1)",
        hovercard: "rgba(8, 41, 53, 0.55)",
      },
    },
  },
  plugins: [],
};
