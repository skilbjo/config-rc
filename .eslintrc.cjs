/* eslint-disable perfectionist/sort-objects */
module.exports = {
  env: {
    es6: true,
    'jest/globals': true,
    node: true,
  },
  extends: [
    'prettier',
    'typescript',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/strict',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:n/recommended',
    'plugin:prettier/recommended',
    'plugin:security/recommended-legacy',
    'plugin:perfectionist/recommended-alphabetical-legacy',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
    'import',
    'jest',
    'prettier',
    'perfectionist',
  ],
  reportUnusedDisableDirectives: true,
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaVersion: 2022,
        project: './tsconfig.json',
        sourceType: 'module',
      },
      rules: {
        '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
        '@typescript-eslint/no-floating-promises': 'error',
        '@typescript-eslint/no-misused-promises': 'error',
      },
    },
  ],
  rules: {
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
      node: { extensions: ['.ts', '.js'] }, // leave this
      typescript: {
        alwaysTryTypes: true,
      },
    },
    node: {
      resolvePaths: ['node_modules/@types'],
      tryExtensions: ['.js', '.json', '.node', '.ts', '.d.ts'],
    },
  },
};
