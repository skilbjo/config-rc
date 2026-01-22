/* eslint-disable perfectionist/sort-objects */
const eslint = require('@eslint/js');
const tseslint = require('typescript-eslint');
const importPlugin = require('eslint-plugin-import');
const nPlugin = require('eslint-plugin-n');
const jestPlugin = require('eslint-plugin-jest');
const prettierPlugin = require('eslint-plugin-prettier');
const securityPlugin = require('eslint-plugin-security');
const perfectionistPlugin = require('eslint-plugin-perfectionist');
const globals = require('globals');

const baseConfig = tseslint.config(
  {
    ignores: ['target/**', 'node_modules/**', '.git/**'],
  },
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
        ...globals.es2021,
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
      },
      ecmaVersion: 2022,
      sourceType: 'module',
    },
    plugins: {
      import: importPlugin,
      n: nPlugin,
      prettier: prettierPlugin,
      security: securityPlugin,
      perfectionist: perfectionistPlugin,
      jest: jestPlugin,
      '@typescript-eslint': tseslint.plugin,
    },
    rules: {
      ...eslint.configs.recommended.rules,
      ...importPlugin.configs.recommended.rules,
      ...nPlugin.configs.recommended.rules,
      ...prettierPlugin.configs.recommended.rules,
      ...securityPlugin.configs['recommended-legacy'].rules,
      ...perfectionistPlugin.configs['recommended-alphabetical-legacy'].rules,
      '@typescript-eslint/no-non-null-assertion': 1,
      eqeqeq: 2,
      'import/default': 2,
      'import/export': 2,
      'import/named': 2,
      'import/namespace': 2,
      'import/newline-after-import': 2,
      'import/no-duplicates': 2,
      'import/no-unresolved': 2,
      'import/order': 2,
      'n/hashbang': 'off',
      'n/no-extraneous-import': 'off',
      'n/no-missing-import': 'off', // conflicts with typescript absolute imports
      'n/no-process-exit': 'off',
      'n/no-unsupported-features/es-syntax': 'off',
      'n/shebang': 'off',
      'no-multiple-empty-lines': [2, { max: 1, maxEOF: 0 }],
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
        '@typescript-eslint/parser': ['.ts'],
      },
      'import/resolver': {
        node: { extensions: ['.ts', '.js'] },
        typescript: {
          alwaysTryTypes: true,
        },
      },
    },
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: './tsconfig.json',
      },
    },
    extends: [
      ...tseslint.configs.recommended,
      ...tseslint.configs.strict, // Note: This includes 'no-unused-vars': 'error'
      importPlugin.configs.typescript,
    ],
    rules: {
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/no-misused-promises': 'error',
      '@typescript-eslint/no-unsafe-function-type': 'off',
      '@typescript-eslint/no-wrapper-object-types': 'off',
    },
  },
  {
    files: ['**/*.js', '**/*.cjs', '**/*.mjs'],
    ...tseslint.configs.disableTypeChecked,
  },
  {
    // FINAL OVERRIDES: This block ensures your project-wide tolerances
    // are preserved regardless of any "strict" configs extended above.
    rules: {
      '@typescript-eslint/no-unused-vars': 1, // Warn
      '@typescript-eslint/no-unused-expressions': 'off',
      'no-unused-vars': 1, // Warn for pure JS files
    },
  }
);
module.exports = { baseConfig };
