/* eslint-disable perfectionist/sort-objects */
import eslint from '@eslint/js';
import * as tseslint from 'typescript-eslint';
import importXPlugin, {
  flatConfigs as importXFlatConfigs,
} from 'eslint-plugin-import-x';
import nPlugin from 'eslint-plugin-n';
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
        ...globals.es2025,
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
      },
      ecmaVersion: 2025,
      sourceType: 'module',
    },
    plugins: {
      'import-x': importXPlugin,
      n: nPlugin,
      prettier: prettierPlugin,
      security: securityPlugin,
      perfectionist: perfectionistPlugin,
      '@typescript-eslint': tseslint.plugin,
      '@stylistic': stylisticPlugin,
    },
    rules: {
      ...eslint.configs.recommended.rules,
      ...importXFlatConfigs.recommended.rules,
      ...nPlugin.configs.recommended.rules,
      ...prettierPlugin.configs.recommended.rules,
      ...securityPlugin.configs.recommended.rules,
      ...perfectionistConfigs['recommended-alphabetical'].rules,
      '@typescript-eslint/no-non-null-assertion': 1,
      eqeqeq: 2,
      'import-x/default': 2,
      'import-x/export': 2,
      'import-x/named': 2,
      'import-x/namespace': 2,
      'import-x/newline-after-import': 2,
      'import-x/no-duplicates': 2,
      'import-x/no-unresolved': 2,
      'import-x/order': 2,
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
      'import-x/parsers': {
        '@typescript-eslint/parser': ['.ts'],
      },
      'import-x/resolver': {
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
      importXFlatConfigs.typescript,
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
    files: [
      '**/*.test.ts',
      '**/*.test.tsx',
      '**/*.test.js',
      '**/*.test.jsx',
      'test/**/*.ts',
      'test/**/*.tsx',
      'test/**/*.js',
    ],
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
