/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        background: "#FFFFFF",
        surface: "#F8F9FA",
        primary: "#FF6B6B", // Coral
        secondary: "#3B82F6", // Blue (Ongoing)
        accent: "#F59E0B",   // Yellow (In Process)
        success: "#14B8A6", // Teal (Completed)
        destructive: "#EF4444", // Red (Canceled/Error)
        text: "#1F2937",    // Gray 900
        textSecondary: "#9CA3AF", // Gray 400
        border: "#000000",
      },
    },
  },
  plugins: [],
}

