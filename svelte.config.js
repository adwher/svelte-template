import { default as adapter } from "@sveltejs/adapter-auto";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

/** @type {import('@sveltejs/kit').Config} */
export default {
  // Consult https://svelte.dev/docs/kit/integrations for more information about preprocessors.
  preprocess: vitePreprocess(),

  compilerOptions: {
    runes: true,
    experimental: {
      async: true,
    },
  },

  kit: {
    // See https://svelte.dev/docs/kit/adapters for more information about adapters.
    adapter: adapter(),

    alias: {
      $: "src/",
    },

    experimental: {
      remoteFunctions: true,
    },
  },
};
