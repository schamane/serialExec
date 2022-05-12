import { overParams } from 'src/overParams';
import type { BreakFunction } from 'src/types';
import { delay } from 'tests/testhelper';

const fullFn = async (ms: number) => {
  await delay(ms);
  return ms;
};

const withBreakFn = async (ms: number, breakFn: BreakFunction) => {
  if (ms > 300) {
    return breakFn();
  }
  await delay(ms);
  return ms + 1;
};

const testParams = [100, 200, 400, 1000];

test('serialExec has to return array with same lenght', async () => {
  const result = await overParams(testParams, fullFn);
  expect(result).toHaveLength(testParams.length);
});

test('serialExec has to return array with 2 element lenght for function with break', async () => {
  const result = await overParams(testParams, withBreakFn);
  expect(result).toHaveLength(2);
});
