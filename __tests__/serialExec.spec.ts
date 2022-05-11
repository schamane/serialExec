import serialExec from 'src/index';

const delay = async (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const fullFn = async (ms) => {
  await delay(ms);
  return ms;
};

const withBreakFn = async (ms, breakFn) => {
  if (ms > 300) {
    return breakFn();
  }
  await delay(ms);
  return ms + 1;
};

const testParams = [100, 200, 400, 1000];

test('serialExec has to return array with same lenght', async () => {
  const result = await serialExec(testParams, fullFn);
  expect(result).toHaveLength(testParams.length);
});

test('serialExec has to return array with 2 element lenght for function with break', async () => {
  const result = await serialExec(testParams, withBreakFn);
  expect(result).toHaveLength(2);
});
