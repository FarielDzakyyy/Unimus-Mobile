/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
     extend: {
      colors: {
        primary: "#0088FF",
        secondary: "#00B75B",
        tertiary: "#EFF0F6",
        white: {
          DEFAULT:  "#ffffff",
            100: "#fafafa",
            200: "#FE8C00",
        },
        gray: {
          100: "#878787",
        },
        bgColor: {
            DEFAULT: "#F3FDFF",
        },
        dark: {
          100: "#181c2e",
        },
        error: "#F14141",
        success: "#2F9B65",
        lightPrimary: "#78C0FF",

      },
    },
  },
  plugins: [],
}