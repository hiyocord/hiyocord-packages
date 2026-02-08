import typescriptEslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import prettier from "eslint-config-prettier";
import typescriptEslintParser from "@typescript-eslint/parser";
import tseslint from "typescript-eslint";

export default [
  {
    ignores: ["**/dist/**"],
  },
  {
    languageOptions: {
      parser: typescriptEslintParser,
      parserOptions: {
        project: true,
        sourceType: "module",
      },
    },
  },
  // js.configs.recommended,
  ...tseslint.configs.recommended,

  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      "@typescript-eslint": typescriptEslint,
    },
    rules: {
      "@typescript-eslint/no-explicit-any": ["error"],
      "@typescript-eslint/consistent-type-imports": [
        "error",
        {
          prefer: "type-imports",
          fixStyle: "separate-type-imports",
        },
      ],
    },
  },

  prettier,
];
