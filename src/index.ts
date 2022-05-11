type asyncFn = <T, V>(params: T, breakFn: () => void) => Promise<V> | V;

const serialExec = <T, V>(taskParams: T[], fn: asyncFn): Promise<V[]> => {
  let skip = false;
  const breakFn = () => {
    skip = true;
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return taskParams.slice(0).reduce(async (promise: any, params: T, index: number) => {
    const result = (await promise) as V[];
    skip === true ? result.splice(index - 1) : (result[index] = await fn(params, breakFn));
    return result;
  }, []);
};

export default serialExec;
