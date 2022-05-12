/* eslint-disable @typescript-eslint/no-explicit-any */
export type BreakFunction = () => void;
export type AsyncParamsExecFunction<T, V> = (params: T, breakFn: BreakFunction) => Promise<V> | V;
export type WrappedSerialFunction<V> = (breakFn: BreakFunction, ...args: any[]) => Promise<V> | V;

export type SerialFunction<V> = (breakFn: BreakFunction) => Promise<V> | V;

export type WrapFunction<T, V> = (fn: WrappedSerialFunction<T>) => (...args: any[]) => SerialFunction<V>;
