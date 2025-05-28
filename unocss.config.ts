import { theme, presetWind4 as preset, type Theme } from "@unocss/preset-wind4";
import { default as directives } from "@unocss/transformer-directives";
import { default as variants } from "@unocss/transformer-variant-group";
import { defineConfig, presetWebFonts } from "unocss";

const colors = {
  background: theme.colors.stone,
  foreground: theme.colors.slate,
  accent: theme.colors.orange,
};

export default defineConfig<Theme>({
  presets: [
    preset(),
    presetWebFonts({
      fonts: {
        heading: {
          provider: "fontshare",
          name: "Bespoke Serif",
        },

        serif: {
          provider: "google",
          name: "Bricolage Grotesque",
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
      include: [/\.(svelte|html|css)($|\?)/],
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
      background: colors.background,
      foreground: colors.foreground,
      accent: colors.accent,

      wallpaper: colors.background[100],
      paper: colors.background[50],

      disabled: colors.background[500],

      paragraph: colors.background[700],
    },
  },
});
