# serialExec

[![CI][ci-image]][ci-url]
[![npm version][npm-image]][npm-url]
[![install size][install-size-image]][install-size-url]
[![downloads][download-badge]][npm-url]

> Serial execution of asynchronouse functions for javascript with zero dependancies.

Use this if serial execution of anychronouse code should be implemented.

Let say you will execute HTTP request with different values not in parallel, but waiting on request is done, and also be abble to break execution.

Package can be used als commonjs or esm module

## Breaking API changes for v2

> Note

We made api changes to package since v1.0, please use "single" tag on npm to use older version

```bash
npm install @schamane/serial-exec:single
```

## Usage

There are two methods that can be used to serial execution of promises

- all
- overParams

```typescript
  async all(list: wrapedFunction[]): Promise<T[]>;
```

```typescript
  async overParams(params: any[], fn: Function): Promise<T[]>;
```

### Usage example for all

```javascript
import { all, useSerialExec } from '@schamane/serial-exec';

const delay = async (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const asyncFn = useSerialExec(async (ms, breakFn) => {
  if (ms > 300) {
    return breakFn();
  }
  console.log(`fn ${ms} start`);
  await delay(ms);
  console.log(`fn ${ms} done`);
  return ms + 1;
});

await all([asyncFn(100), asyncFn(200), asyncFn(400), asyncFn(1000)]);
```

### Usage example for overParams

```javascript
import { overParams } from '@schamane/serial-exec';

const delay = async (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const asyncFn = async (ms, breakFn) => {
  if (ms > 300) {
    return breakFn();
  }
  console.log(`fn ${ms} start`);
  await delay(ms);
  console.log(`fn ${ms} done`);
  return ms + 1;
};

await overParams([100, 200, 400, 1000], asyncFn);
```

## License

[MIT](LICENSE.md)

[npm-url]: https://npmjs.org/package/@schamane/serial-exec
[npm-image]: https://img.shields.io/npm/v/@schamane/serial-exec.svg?style=flat-square
[download-badge]: http://img.shields.io/npm/dm/@schamane/serial-exec.svg?style=flat-square
[install-size-image]: https://packagephobia.com/badge?p=@schamane/serial-exec
[install-size-url]: https://packagephobia.now.sh/result?p=@schamane/serial-exec
[ci-image]: https://github.com/schamane/serialExec/actions/workflows/checkcode.yml/badge.svg?branch=main
[ci-url]: https://github.com/schamane/serialExec/actions
