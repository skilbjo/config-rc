/* eslint-disable @typescript-eslint/no-require-imports */
const path = require('path');
const { fixupConfigRules, fixupPluginRules } = require('@eslint/compat');
const { FlatCompat } = require('@eslint/eslintrc');
const js = require('@eslint/js');
const typescriptEslint = require('@typescript-eslint/eslint-plugin');
const tsParser = require('@typescript-eslint/parser');
const _import = require('eslint-plugin-import');
const jest = require('eslint-plugin-jest');
const perfectionist = require('eslint-plugin-perfectionist');
const prettier = require('eslint-plugin-prettier');
const globals = require('globals');

const compat = new FlatCompat({
  allConfig: js.configs.all,
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
});

module.exports = [
  ...fixupConfigRules(
    compat.extends(
      'prettier',
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:@typescript-eslint/strict',
      'plugin:import/recommended',
      'plugin:import/typescript',
      'plugin:n/recommended',
      'plugin:prettier/recommended',
      'plugin:security/recommended-legacy',
      'plugin:perfectionist/recommended-alphabetical-legacy'
    )
  ),
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.cjs'],
    languageOptions: {
      ecmaVersion: 2022,
      globals: {
        ...jest.environments.globals.globals,
        ...globals.node,
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
      },
      parser: tsParser,
      parserOptions: {
        project: path.resolve(__dirname, './tsconfig.json'),
        sourceType: 'module',
        tsconfigRootDir: __dirname,
      },
      sourceType: 'module',
    },
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },
    plugins: {
      '@typescript-eslint': fixupPluginRules(typescriptEslint),
      import: fixupPluginRules(_import),
      jest,
      perfectionist: fixupPluginRules(perfectionist),
      prettier: fixupPluginRules(prettier),
    },
    rules: {
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/no-misused-promises': 'error',
      '@typescript-eslint/no-non-null-assertion': 1,
      '@typescript-eslint/no-unused-vars': 1,
      eqeqeq: 2,
      'import/default': 2,
      'import/export': 2,
      'import/named': 2,
      'import/namespace': 2,
      'import/newline-after-import': 2,
      'import/no-duplicates': 2,
      'import/no-unresolved': 2,
      'import/order': 2,
      'n/no-missing-import': 'off',
      'n/no-unsupported-features/es-syntax': 'off',
      'n/shebang': 'off',
      'no-multiple-empty-lines': [
        2,
        {
          max: 1,
          maxEOF: 0,
        },
      ],
      'perfectionist/sort-exports': 'off',
      'perfectionist/sort-imports': 'off',
      'prettier/prettier': [
        'error',
        {
          arrowParens: 'always',
          printWidth: 80,
          semi: true,
          singleQuote: true,
          tabWidth: 2,
          trailingComma: 'es5',
        },
      ],
      'security/detect-object-injection': 'off',
    },
    settings: {
      'import/parsers': {
        '@typescript-eslint/parser': ['.ts', '.js'],
      },
      'import/resolver': {
        node: {
          extensions: ['.ts', '.js'],
        },
        typescript: {
          alwaysTryTypes: true,
        },
      },
      node: {
        resolvePaths: ['node_modules/@types'],
        tryExtensions: ['.js', '.json', '.node', '.ts', '.d.ts'],
      },
    },
  },
];
