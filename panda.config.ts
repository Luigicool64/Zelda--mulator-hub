import { defineConfig } from "@pandacss/dev";

export default defineConfig({
  preflight: true,
  include: ["./src/**/*.{js,jsx,ts,tsx}"],
  exclude: [],
  theme: {
    extend: {
      tokens: {
        colors: {
          zelda: {
            green: { value: "#1a4d2e" },
            gold: { value: "#c9a03d" },
            dark: { value: "#0a1c12" },
            mystic: { value: "#2a5f3f" },
            wood: { value: "#5c3d2e" }
          }
        }
      }
    }
  },
  outdir: "styled-system"
});