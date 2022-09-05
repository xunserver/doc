export const ignoreError = (fn, context, ...args) => {
  try {
    return fn.apply(context, args);
  } catch (err) {
    console.error(err);
  }
};
