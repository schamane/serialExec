import { overParams } from 'src/overParams';
import { delay } from 'tests/testhelper';

test('serialExec should has proper typings', () => {
  interface Data {
    id: string;
    name: string;
  }

  const params: Data[] = [{ id: '1', name: 'test' }];

  const processFn = (param: Data) => {
    return param.name;
  };

  overParams(params, async (param, breakFn) => {
    if (!param) {
      return breakFn();
    }
    await delay(10);

    return processFn(param);
  }).then((result) => {
    expect(result).toHaveLength(params.length);
  });
});
