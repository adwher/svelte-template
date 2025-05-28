import { fileURLToPath } from "node:url";

import { includeIgnoreFile } from "@eslint/compat";
import { default as js } from "@eslint/js";
import { default as prettier } from "eslint-config-prettier";
import { default as svelte } from "eslint-plugin-svelte";
import { default as globals } from "globals";
import { default as ts } from "typescript-eslint";

import { default as svelteConfig } from "./svelte.config.js";

const ignorePathname = fileURLToPath(new URL("./.gitignore", import.meta.url));

export default ts.config(
  includeIgnoreFile(ignorePathname),

  js.configs.recommended,
  ...ts.configs.recommended,
  ...svelte.configs.recommended,
  ...svelte.configs.prettier,
  prettier,

  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },

  {
    files: ["**/*.svelte", "**/*.svelte.ts", "**/*.svelte.js"],
    // See more details at: https://typescript-eslint.io/packages/parser/
    languageOptions: {
      parserOptions: {
        projectService: true,
        // Add support for additional file extensions, such as .svelte
        extraFileExtensions: [".svelte"],
        parser: ts.parser,
        svelteConfig,
      },
    },
  },
);
