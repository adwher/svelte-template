import { sveltekit } from "@sveltejs/kit/vite";
import { default as unocss } from "unocss/vite";
import { default as icons } from "unplugin-icons/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    unocss(),
    sveltekit(),
    // Import icons within Svelte components.
    // https://github.com/unplugin/unplugin-icons
    icons({ compiler: "svelte", scale: 1 }),
  ],
});
