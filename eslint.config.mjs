import _import from "eslint-plugin-import";
import globals from "globals";
import jest from "eslint-plugin-jest";
import js from "@eslint/js";
import path from "node:path";
import prettier from "eslint-plugin-prettier";
import sortKeysFix from "eslint-plugin-sort-keys-fix";
import tsParser from "@typescript-eslint/parser";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import typescriptSortKeys from "eslint-plugin-typescript-sort-keys";
import { FlatCompat } from "@eslint/eslintrc";
import { fileURLToPath } from "node:url";
import { fixupConfigRules, fixupPluginRules } from "@eslint/compat";
import importPlugin from 'eslint-plugin-import'
import eslintJs from '@eslint/js'
import eslintTs from 'typescript-eslint'

const tsFiles = ['{app,tests}/**/*.ts']

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  allConfig: js.configs.all,
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
});

const languageOptions = {
  globals: {
    ...jest.environments.globals.globals,
    ...globals.node,
    ...globals.jest,
  },
  ecmaVersion: 2022,
  sourceType: "module",
}

const customTypescriptConfig = {
  files: tsFiles,
  plugins: {
    import: importPlugin,
    'import/parsers': tsParser,
  },
  languageOptions: {
    ...languageOptions,
    parser: tsParser,
    parserOptions: {
      project: './tsconfig.json',
    },
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts'],
    },
  },
  rules: {
    'import/export': 'error',
    'import/no-duplicates': 'warn',
    ...importPlugin.configs.typescript.rules,
    '@typescript-eslint/no-use-before-define': 'off',
    'require-await': 'off',
    'no-duplicate-imports': 'error',
    'no-unneeded-ternary': 'error',
    'prefer-object-spread': 'error',

    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        ignoreRestSiblings: true,
        args: 'none',
      },
    ],
  },
}

// Add the files for applying the recommended TypeScript configs
// only for the Typescript files.
// This is necessary when we have the multiple extensions files
// (e.g. .ts, .tsx, .js, .cjs, .mjs, etc.).
const recommendedTypeScriptConfigs = [
    ...eslintTs.configs.recommended.map((config) => ({
        ...config,
        files: tsFiles,
    })),
    ...eslintTs.configs.stylistic.map((config) => ({
        ...config,
        files: tsFiles,
    })),
]

export default [
    { ignores: ['docs/*', 'build/*', 'lib/*', 'dist/*'] }, // global ignores
    eslintJs.configs.recommended,
    ...recommendedTypeScriptConfigs,
    customTypescriptConfig,
]

const default1 = [
  ...fixupConfigRules(
    compat.extends(
      "prettier",
      "typescript",
      "eslint:recommended",
      "plugin:n/recommended",
      "plugin:prettier/recommended",
      "plugin:import/recommended",
      "plugin:import/typescript",
      "plugin:@typescript-eslint/recommended",
      "plugin:@typescript-eslint/strict",
      // "plugin:typescript-sort-keys/recommended",
      "plugin:security/recommended-legacy",
    )), {
      plugins: {
        prettier: fixupPluginRules(prettier),
        import: fixupPluginRules(_import),
        jest,
        "sort-keys-fix": sortKeysFix,
        "typescript-sort-keys": fixupPluginRules(typescriptSortKeys),
        "@typescript-eslint": fixupPluginRules(typescriptEslint),
      },
      linterOptions: {
        reportUnusedDisableDirectives: true,
      },
      languageOptions: {
        globals: {
          ...jest.environments.globals.globals,
          ...globals.node,
          Atomics: "readonly",
          SharedArrayBuffer: "readonly",
        },
        parser: tsParser,
        parserOptions: {
          project: "./tsconfig.json",
          ecmaVersion: 2022,
          sourceType: "module",
          tsconfigRootDir: __dirname,
        },
      },
      settings: {
        "import/parsers": {
          "@typescript-eslint/parser": [".ts"],
        },
        "import/resolver": {
          node: {
            extensions: [".ts", ".js"],
          },
          typescript: {
            alwaysTryTypes: true,
          },
        },
        node: {
          resolvePaths: ["node_modules/@types"],
          tryExtensions: [".js", ".json", ".node", ".ts", ".d.ts"],
        },
      },
      rules: {
        "@typescript-eslint/consistent-type-definitions": ["error", "type"],
        "@typescript-eslint/no-floating-promises": "error",
        "@typescript-eslint/no-misused-promises": "error",
        "@typescript-eslint/no-non-null-assertion": 1,
        "@typescript-eslint/no-unused-vars": 1,
        eqeqeq: 2,
        "import/default": 2,
        "import/export": 2,
        "import/named": 2,
        "import/namespace": 2,
        "import/newline-after-import": 2,
        "import/no-duplicates": 2,
        "import/no-unresolved": 2,
        "import/order": 2,
        "no-multiple-empty-lines": [2, {
          max: 1,
          maxEOF: 0,
        }],
        "n/no-missing-import": "off",
        "n/no-unsupported-features/es-syntax": "off",
        "n/shebang": "off",
        "prettier/prettier": ["error", {
          arrowParens: "always",
          printWidth: 80,
          semi: true,
          singleQuote: true,
          tabWidth: 2,
          trailingComma: "es5",
        }],
        "security/detect-object-injection": "off",
        "sort-keys-fix/sort-keys-fix": "warn",
        "typescript-sort-keys/interface": "warn",
      },
    },
];
