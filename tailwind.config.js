/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        "poppins-light": ["Poppins-Light"],
        "poppins-regular": ["Poppins-Regular"],
        "poppins-medium": ["Poppins-Medium"],
        "poppins-semibold": ["Poppins-SemiBold"],
        "poppins-bold": ["Poppins-Bold"],
        "poppins-extrabold": ["Poppins-ExtraBold"],
        "poppins-black": ["Poppins-Black"],

        "inter-light": ["Inter-Light"],
        "inter-regular": ["Inter-Regular"],
        "inter-medium": ["Inter-Medium"],
        "inter-semibold": ["Inter-SemiBold"],
        "inter-bold": ["Inter-Bold"],

        // "plus-jakarta-sans-regular": ["Plus-Jakarta-Sans-Regular"],
        // "plus-jakarta-sans-medium": ["Plus-Jakarta-Sans-Medium"],
        // "plus-jakarta-sans-semibold": ["Plus-Jakarta-Sans-SemiBold"],
        // "plus-jakarta-sans-bold": ["Plus-Jakarta-Sans-Bold"],
      },
    },
  },
  plugins: [],
};
