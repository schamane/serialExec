import type { AsyncParamsExecFunction } from './types.js';

/**
 *
 *  execute asynchronouse function with all parameters from array
 *  serial execution of functions for each parameter will be secured
 *  there is break function that can be called to break execution
 *
 * @param {T[]} taskParams array of params that will be passed to function
 * @param {asyncFn} fn function reference there all params from array will be passed as first argument
 * @returns {Promise<V[]>} Promise with array of result from function
 */
export const overParams = <T, V>(taskParams: T[], fn: AsyncParamsExecFunction<T, V>): Promise<V[]> => {
  let skip = false;
  const breakFn = () => {
    skip = true;
  };

  return taskParams.slice(0).reduce<Promise<V[]>>(async (promise, params, index) => {
    const result = (await promise) as V[];
    skip === true ? result.splice(index - 1) : (result[index] = await fn(params, breakFn));
    return result;
  }, [] as never);
};
