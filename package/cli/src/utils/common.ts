import { errorLog, infoLog } from "./log";

export const sequenceIterate = async (fns, ...args) => {
  for (let i = 0; i < fns.length; i++) {
    await fns[i](...args);
  }
};

export const ignoreError = (fn, context, ...args) => {
  try {
    return fn.apply(context, args);
  } catch (err) {
    console.error(err);
  }
};

export const to = (promise) =>
  Promise.resolve(promise)
    .then((result) => [null, result])
    .catch((err) => [err, null]);

export const stringFunc = (message) =>
  typeof message === "function" ? message() : message;

export const taskWithMessage = (
  fn,
  errorMsg,
  successMsg,
  { ignoreError } = {}
) => {
  let result;
  try {
    result = fn();
    infoLog(stringFunc(successMsg));
    return result;
  } catch (err) {
    errorLog(stringFunc(errorMsg));
    if (!ignoreError) {
      process.exit();
    }
  }
};
