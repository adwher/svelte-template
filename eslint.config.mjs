import { fileURLToPath } from "node:url";

import { includeIgnoreFile } from "@eslint/compat";
import { default as js } from "@eslint/js";
import { default as prettier } from "eslint-config-prettier";
import { default as svelte } from "eslint-plugin-svelte";
import { defineConfig } from "eslint/config";
import { default as globals } from "globals";
import { default as ts } from "typescript-eslint";

import { default as svelteConfig } from "./svelte.config";

const ignorePathname = fileURLToPath(new URL("./.gitignore", import.meta.url));

const OFF = "off";
const ERROR = "error";

export default defineConfig(
  includeIgnoreFile(ignorePathname),

  js.configs.recommended,
  ts.configs.recommended,
  svelte.configs.recommended,
  svelte.configs.prettier,
  prettier,

  {
    languageOptions: {
      parserOptions: {
        projectService: {
          // Allow these files to be parsed
          allowDefaultProject: ["*.config.{mjs,js}", "unocss.config.ts"],
        },
      },

      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },

    rules: {
      "@typescript-eslint/no-floating-promises": ERROR,
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

    rules: {
      "@typescript-eslint/no-unsafe-call": OFF,
    },
  },
);
