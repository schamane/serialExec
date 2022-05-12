import { all, useSerialExec } from 'src/all';
import type { BreakFunction } from 'src/types';
import { delay } from 'tests/testhelper';

const fnToTest = useSerialExec(async (breakFn: BreakFunction, ms: number): Promise<number | void> => {
  if (ms > 1000) {
    return breakFn();
  }
  await delay(ms);
  return ms;
});

test('all has to return array with same lenght', async () => {
  const list = [fnToTest(10), fnToTest(100), fnToTest(200)];
  const result = await all(list);
  expect(result).toHaveLength(list.length);
});

test('all has to return array with smaller lenght for long running methods', async () => {
  const list = [fnToTest(10), fnToTest(2000), fnToTest(200), fnToTest(100)];
  const result = await all(list);
  expect(result).toHaveLength(1);
});
