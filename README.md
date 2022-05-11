# serialExec

Serial execution of asynchronouse functions for javascript

Use this if serial execution of anychronouse code should be implemented.

Let say you will execute HTTP request with different values not in parallel, but waiting on request is done, and also be abble to break execution.

```javascript
import serialExec from '@schamane/serial-exec';

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

await serialExec([100, 200, 400, 1000], asyncFn);
```