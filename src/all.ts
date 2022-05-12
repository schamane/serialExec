import type { BreakFunction, SerialFunction, WrappedSerialFunction } from './types.js';

/**
 * useSerialExec
 * wrap original function to be used for serial execution
 *
 * @param {T[]} fn array of params that will be passed to function
 * @returns {WrapFunction<T, V>} wraped function that can be used in array of methods to be executed serialy
 */
export const useSerialExec =
  <T>(fn: WrappedSerialFunction<T>) =>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (...args: any[]) =>
  (breakFn: BreakFunction) =>
    fn(breakFn, ...args);

/**
 *  all
 *  execute serialy asynchronouse functions from array
 *
 * @param {SerialFunction<V>[]} fnList array wraped functions with parameters that needs to be executed
 * @returns {Promise<V[]>} Promise with array of result from serial executions
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
