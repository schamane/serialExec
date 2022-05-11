// test typescript typings

import serialExec from '../src/index.js';

interface Data {
  id: string;
  name: string;
}

const params: Data[] = [{ id: '1', name: 'test' }];

const delay = async () => new Promise((resolve) => setTimeout(resolve, 10));

const processFn = (param: Data) => {
  return param.name;
};

serialExec(params, async (param, breakFn) => {
  if (!param) {
    return breakFn();
  }
  await delay();

  return processFn(param);
});
