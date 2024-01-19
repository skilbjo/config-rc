// import { createRequire } from 'node:module';

// const require = createRequire(import.meta.url);

export const eslintrc = require('./.eslintrc.cjs'); // eslint-disable-line @typescript-eslint/no-var-requires

module.exports = eslintrc;
