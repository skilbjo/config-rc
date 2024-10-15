// import { createRequire } from 'node:module';

// const require = createRequire(import.meta.url);

const eslintrc = require('./eslint.config.cjs'); // eslint-disable-line @typescript-eslint/no-require-imports, n/no-missing-require

module.exports = eslintrc;
