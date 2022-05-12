import type { BreakFunction, SerialFunction, WrappedSerialFunction } from './types.js';

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
export const useSerialExec =
  <T>(fn: WrappedSerialFunction<T>) =>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (...args: any[]) =>
  (breakFn: BreakFunction) =>
    fn(breakFn, ...args);

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
export const all = <V>(fnList: SerialFunction<V>[]): Promise<V[]> => {
  let skip = false;
  const breakFn = () => {
    skip = true;
  };

  return fnList.slice(0).reduce<Promise<V[]>>(async (promise, fn, index) => {
    const result = (await promise) as V[];
    skip === true ? result.splice(index - 1) : (result[index] = await fn(breakFn));
    return result;
  }, [] as never);
};
