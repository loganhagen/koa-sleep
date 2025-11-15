import tsParser from "@typescript-eslint/parser";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import globals from "globals";
import js from "@eslint/js";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    ignores: ["dist/**"],
  },

  js.configs.recommended,
  {
    files: ["**/*.ts"], 
    
    plugins: {
      "@typescript-eslint": typescriptEslint,
    },
    
    languageOptions: {
      parser: tsParser,
      globals: {
        ...globals.node,
      },
      ecmaVersion: "latest",
      sourceType: "module",
    },
    
    rules: {
      ...typescriptEslint.configs.recommended.rules,
      
      "semi": ["error", "always"],
      "@typescript-eslint/no-var-requires": "off",
      "@typescript-eslint/no-require-imports": "off",
      "@typescript-eslint/no-unused-vars": [
        "warn", 
        { "argsIgnorePattern": "^_" }
      ],
    },
  }
]);