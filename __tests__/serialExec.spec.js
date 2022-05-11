import serialExec from '../';

const delay = async (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const asyncFn = async (ms, breakFn) => {
  if (ms > 300) {
    console.log('call break');
    return breakFn();
  }
  console.log(`fn ${ms} start`);
  await delay(ms);
  console.log(`fn ${ms} done`);
  return ms + 1;
};

serialExec([100, 200, 400, 1000], asyncFn);
