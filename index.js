/* eslint-disable perfectionist/sort-objects */
import eslint from '@eslint/js';
import * as tseslint from 'typescript-eslint';
import importPlugin from 'eslint-plugin-import';
import nPlugin from 'eslint-plugin-n';
import jestPlugin from 'eslint-plugin-jest';
import prettierPlugin from 'eslint-plugin-prettier';
import securityPlugin from 'eslint-plugin-security';
import perfectionistPlugin, {
  configs as perfectionistConfigs,
} from 'eslint-plugin-perfectionist';
import stylisticPlugin from '@stylistic/eslint-plugin';
import globals from 'globals';

const config = tseslint.config(
  {
    ignores: ['target/**', 'node_modules/**', '.git/**'],
  },
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
        ...globals.es2025,
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
      },
      ecmaVersion: 2025,
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
      '@stylistic': stylisticPlugin,
    },
    rules: {
      ...eslint.configs.recommended.rules,
      ...importPlugin.configs.recommended.rules,
      ...nPlugin.configs.recommended.rules,
      ...prettierPlugin.configs.recommended.rules,
      ...securityPlugin.configs.recommended.rules,
      ...perfectionistConfigs['recommended-alphabetical'].rules,
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
      'n/no-unsupported-features/es-syntax': [
        'error',
        { version: '>=24.14.1' },
      ],
      'n/no-unsupported-features/node-builtins': [
        'error',
        { version: '>=24.14.1' },
      ],
      'n/prefer-node-protocol': 'error',
      'n/shebang': 'off',
      'no-restricted-syntax': [
        'error',
        {
          selector: 'TSEnumDeclaration',
          message:
            'Use const object + as const instead of enum. Required for erasableSyntaxOnly / TS@7 compatibility.',
        },
        {
          selector: 'TSModuleDeclaration[declare!=true]',
          message:
            'Avoid namespace/module declarations; use ES modules instead.',
        },
      ],
      'no-multiple-empty-lines': [2, { max: 1, maxEOF: 0 }],
      '@stylistic/eol-last': ['error', 'always'],
      '@stylistic/no-trailing-spaces': 'error',
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
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    extends: [
      ...tseslint.configs.recommended,
      ...tseslint.configs.strict, // Note: This includes 'no-unused-vars': 'error'
      importPlugin.configs.typescript,
    ],
    rules: {
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          prefer: 'type-imports',
          fixStyle: 'inline-type-imports',
        },
      ],
      '@typescript-eslint/no-deprecated': 'warn',
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/no-misused-promises': 'error',
      '@typescript-eslint/no-unsafe-function-type': 'off',
      '@typescript-eslint/no-wrapper-object-types': 'off',
    },
  },
  {
    files: ['**/*.test.ts', '**/*.test.js', 'test/**/*.ts', 'test/**/*.js'],
    rules: {
      '@typescript-eslint/no-floating-promises': 'off',
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

export { config };
