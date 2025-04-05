import js from "@eslint/js";
import globals from "globals";

import tseslint from "typescript-eslint";
import SimpleImportSort from "eslint-plugin-simple-import-sort";

export default tseslint.config(
  { ignores: ["dist"] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "simple-import-sort": SimpleImportSort,
    },
    rules: {
      "simple-import-sort/imports": "warn",
    },
  }
);
