import jsLint from "@eslint/js";
import commentsPlugin from "eslint-plugin-eslint-comments";
import importPlugin from "eslint-plugin-import";
import jsxA11yPlugin from "eslint-plugin-jsx-a11y";
import litPlugin from "eslint-plugin-lit";
import playwrightPlugin from "eslint-plugin-playwright";
import prettierRecommendedConfig from "eslint-plugin-prettier/recommended";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import wcPlugin from "eslint-plugin-wc";
import { config, configs as tsLintConfigs } from "typescript-eslint";

export default config(
  jsLint.configs.recommended,
  ...tsLintConfigs.recommendedTypeChecked,
  /* eslint-disable @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access */
  importPlugin.flatConfigs.recommended,
  importPlugin.flatConfigs.typescript,
  /* eslint-enable @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access */
  prettierRecommendedConfig,
  // Lit/Web Component rules apply only to the Lit packages. They produce false
  // positives on React `.tsx`, and root lint runs with `--max-warnings 1`.
  {
    files: ["packages/web-components/**/*.ts", "packages/web-icons/**/*.ts"],
    extends: [
      litPlugin.configs["flat/recommended"],
      wcPlugin.configs["flat/recommended"],
    ],
  },
  // React rules apply only to the React sources.
  {
    files: ["packages/react-ui/**/*.{ts,tsx}", "storybook/*/src/**/*.{ts,tsx}"],
    // NOTE: `configs.flat.recommended` — not `configs["recommended-latest"]`,
    // which is still eslintrc-style and crashes flat config.
    /* eslint-disable @typescript-eslint/no-unsafe-member-access */
    extends: [
      reactHooksPlugin.configs.flat.recommended,
      jsxA11yPlugin.flatConfigs.recommended,
    ],
    /* eslint-enable @typescript-eslint/no-unsafe-member-access */
  },
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
      "**/coverage",
      "**/playwright-report",
      "**/node_modules",
      "docs/.vitepress/cache",
      // Storybook config is tooling, not shipped code. It also imports
      // exports-map-only ESM that the root tsconfig's Node10 resolution
      // cannot see, which would break type-aware linting.
      "storybook/*/.storybook/**",
      "**/storybook-static",
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
    files: ["*", "!**/scripts/**/*"],
    rules: {
      "no-console": "warn",
    },
  },
  {
    files: ["*", "!internals/danger/**/*"],
    rules: {
      "import/extensions": [
        "error",
        "always",
        {
          ignorePackages: true,
        },
      ],
    },
  },
  {
    rules: {
      "no-alert": "error",
      "prefer-const": "error",
      "default-case": "error",
      "eol-last": "error",
      "object-shorthand": "error",
      "require-atomic-updates": "error",
      "no-unused-private-class-members": "warn",
      "no-promise-executor-return": "error",
      "no-unmodified-loop-condition": "warn",
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
  },
  {
    settings: {
      "import/resolver": {
        typescript: {
          project: "tsconfig.json",
        },
      },
    },
  },
);
