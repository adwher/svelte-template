import { theme, presetWind4 as preset, type Theme } from "@unocss/preset-wind4";
import { default as directives } from "@unocss/transformer-directives";
import { default as variants } from "@unocss/transformer-variant-group";
import { defineConfig, presetWebFonts } from "unocss";

export default defineConfig<Theme>({
  presets: [
    preset(),
    presetWebFonts({
      fonts: {
        serif: {
          provider: "fontshare",
          name: "Clash Display",
        },

        sans: {
          provider: "fontshare",
          name: "General Sans",
        },
      },
    }),
  ],

  content: {
    pipeline: {
      include: ["src/**/*.{svelte,css}"],
    },
  },

  transformers: [
    // https://unocss.dev/transformers/directives
    directives(),
    // https://unocss.dev/transformers/variant-group
    variants(),
  ],

  theme: {
    colors: {
      wallpaper: theme.colors.gray[50],
      paper: theme.colors.white,

      disabled: theme.colors.gray[400],

      paragraph: theme.colors.gray[800],
    },
  },
});
