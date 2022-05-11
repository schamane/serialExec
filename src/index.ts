type asyncFn<T, V> = (params: T, breakFn: () => void) => Promise<V> | V;

const serialExec = <T, V>(taskParams: T[], fn: asyncFn<T, V>): Promise<V[]> => {
  let skip = false;
  const breakFn = () => {
    skip = true;
  };

  return taskParams.slice(0).reduce<Promise<T[]>>(async (promise, params, index) => {
    const result = (await promise) as T[];
    skip === true ? result.splice(index - 1) : (result[index] = (await fn(params, breakFn)) as T);
    return result;
  }, [] as never) as unknown as Promise<V[]>;
};

export default serialExec;
