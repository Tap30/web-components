import jsLint from "@eslint/js";
import commentsPlugin from "eslint-plugin-eslint-comments";
import importPlugin from "eslint-plugin-import";
import litPlugin from "eslint-plugin-lit";
import playwrightPlugin from "eslint-plugin-playwright";
import prettierRecommendedConfig from "eslint-plugin-prettier/recommended";
import wcPlugin from "eslint-plugin-wc";
import { config, configs as tsLintConfigs } from "typescript-eslint";

export default config(
  jsLint.configs.recommended,
  ...tsLintConfigs.recommendedTypeChecked,
  /* eslint-disable @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access */
  importPlugin.flatConfigs.recommended,
  importPlugin.flatConfigs.typescript,
  /* eslint-enable @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access */
  litPlugin.configs["flat/recommended"],
  wcPlugin.configs["flat/recommended"],
  prettierRecommendedConfig,
  {
    files: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)"],
    extends: [playwrightPlugin.configs["flat/recommended"]],
  },
  {
    files: ["*.ts", "*.tsx"],
  },
  {
    ignores: [
      "**/dist",
      "**/node_modules",
      "docs/.vitepress/dist",
      "docs/.vitepress/cache",
    ],
  },
  {
    languageOptions: {
      parserOptions: {
        tsconfigRootDir: import.meta.dirname,
        project: true,
        projectService: {
          allowDefaultProject: ["eslint.config.js"],
          defaultProject: "./tsconfig.json",
        },
        sourceType: "module",
      },
    },
  },
  {
    plugins: {
      "eslint-comments": commentsPlugin,
    },
    rules: {
      "eslint-comments/disable-enable-pair": "error",
      "eslint-comments/no-aggregating-enable": "error",
      "eslint-comments/no-duplicate-disable": "error",
      "eslint-comments/no-unlimited-disable": "error",
      "eslint-comments/no-unused-enable": "error",
      "eslint-comments/no-unused-disable": "error",
    },
  },
  {
    rules: {
      "no-alert": "error",
      "no-console": "warn",
      "prefer-const": "error",
      "default-case": "error",
      "eol-last": "error",
      "object-shorthand": "error",
      "require-atomic-updates": "error",
      "no-unused-private-class-members": "warn",
      "no-promise-executor-return": "error",
      "no-unmodified-loop-condition": "warn",
      "import/extensions": [
        "error",
        "always",
        {
          ignorePackages: true,
        },
      ],
      eqeqeq: ["error", "smart"],
      "no-duplicate-imports": [
        "error",
        {
          includeExports: true,
        },
      ],
      "@typescript-eslint/unbound-method": "off",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/consistent-type-imports": [
        "error",
        {
          fixStyle: "inline-type-imports",
        },
      ],
      "padding-line-between-statements": [
        "error",
        {
          blankLine: "always",
          prev: [
            "const",
            "let",
            "var",
            "directive",
            "import",
            "function",
            "class",
            "block",
            "block-like",
            "multiline-block-like",
          ],
          next: "*",
        },
        {
          blankLine: "any",
          prev: ["import"],
          next: ["import"],
        },
        {
          blankLine: "any",
          prev: ["directive"],
          next: ["directive"],
        },
        {
          blankLine: "any",
          prev: ["const", "let", "var"],
          next: ["const", "let", "var"],
        },
        {
          blankLine: "always",
          prev: ["multiline-const", "multiline-let"],
          next: "*",
        },
      ],
    },
    settings: {
      "import/resolver": {
        typescript: {
          project: "tsconfig.json",
        },
      },
    },
  },
);
