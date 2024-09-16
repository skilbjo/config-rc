import * as fs from 'fs';
import * as path from 'path';

import * as a from './a';
import { one } from './a';

type Foo = {
  a: number;
  b: number;
  c: number;
};
type MaybePresent = { a: number[]; b?: { c: string } };

const f: Foo = {
  a: 3,
  b: 2,
  c: 1,
};

const numberArr: Array<number> = [
  1, 2, 3, 4, 444444, 54353454325243, 543254325324, 54325432543523,
  1312312321312312,
];

const maybePresent: MaybePresent = {
  a: [123],
};
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const isPresent: MaybePresent = {
  a: [123],
  b: { c: 'yodawg' },
};
const cUndefined = maybePresent.b?.c;
const cDefined = maybePresent.b!.c; // eslint-disable-line @typescript-eslint/no-non-null-assertion

console.log(f, fs, path);
console.log(a, one);
console.log({ numberArr });
console.log({ cUndefined });
console.log({ cDefined });
