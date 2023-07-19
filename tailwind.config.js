import { iconsPlugin, getIconCollections } from "@egoist/tailwindcss-icons";

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [],
  theme: {
    extend: {
      colors: {
        "ultra-violet": "#53536fff",
        "tropical-indigo": "#a998edff",
        "rich-black": "#131524ff",
        "space-cadet": "#20213bff",
        "space-cadet-2": "#1e2037ff",
      },
    },
  },
  plugins: [
    iconsPlugin({
      collections: getIconCollections(["mdi", "icon-park", "ic"]),
    }),
  ],
};
