export const ignoreError = (fn: Function, context: any, ...args: any[]) => {
  try {
    return fn.apply(context, args);
  } catch (err) {
    console.error(err);
  }
};

export const pipe = (...fns: Function[]) => {
  return (initParams?: any) =>
    fns.reduce((params, fn) => fn(params), initParams);
};

export const pipeAsync =
  (...fns: Function[]) =>
  async (initParams: any) => {
    let i = 0;
    let result = initParams;
    for (;;) {
      const fn = fns[i];
      if (fn) {
        result = await fn(result);
      } else {
        return result;
      }
    }
  };
