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
    'plugin:node/recommended',
    'plugin:prettier/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/strict',
    'plugin:typescript-sort-keys/recommended',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2022,
    project: './tsconfig.json',
    sourceType: 'module',
  },
  plugins: [
    'prettier',
    'import',
    'jest',
    'sort-keys-fix',
    'typescript-sort-keys',
    '@typescript-eslint',
  ],
  reportUnusedDisableDirectives: true,
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
    'no-multiple-empty-lines': [2, { max: 1, maxEOF: 0 }],
    'node/no-missing-import': 'off', // conflicts with typescript absolute imports
    'node/no-unsupported-features/es-syntax': 'off',
    'node/shebang': 'off',
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
    'sort-keys-fix/sort-keys-fix': 'warn',
    'typescript-sort-keys/interface': 'warn',
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