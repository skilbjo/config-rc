import * as fs from 'fs';
import * as path from 'path';

import * as b from './b';
import * as a from './a';
import { One } from './c';

type Foo = {
  a: number;
  b: number;
  c: number;
};

const f: Foo = {
  a: 3,
  b: 2,
  c: 1,
};

const bar: Array<number> = [
  1, 2, 3, 4, 444444, 54353454325243, 543254325324, 54325432543523,
  1312312321312312,
];

type MaybePresent = { a: number[]; b?: { c: string } };
const maybePresent: MaybePresent = {
  a: [123],
};
const cKeyUndefined = maybePresent.b?.c;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const definitelyPresent: MaybePresent = {
  a: [123],
  b: { c: 'yodawg' },
};
const cKeyDefined = maybePresent.b!.c; // eslint-disable-line @typescript-eslint/no-non-null-assertion

console.log(f, fs, path);
console.log(a, b, One);
console.log({ bar });
console.log({ cKeyUndefined });
console.log({ cKeyDefined });
