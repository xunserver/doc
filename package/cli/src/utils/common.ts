import { errorLog, infoLog } from "./log";

export const sequenceIterate = async (fns: Function[], ...args) => {
  for (let i = 0; i < fns.length; i++) {
    await fns[i](...args);
  }
};

export const ignoreError = <T>(fn: () => T, context?: any, ...args) => {
  try {
    return fn.apply(context, args as any);
  } catch (err) {
    console.error(err);
  }
};

export const to = (promise: Promise<any>) =>
  Promise.resolve(promise)
    .then((result) => [null, result])
    .catch((err) => [err, null]);

type MessageString = string | ((s?: string) => string);
export const stringFunc = (message: MessageString) =>
  typeof message === "function" ? message() : message;

export const taskWithMessage = <T>(
  fn: (...args) => T,
  errorMsg?: MessageString,
  successMsg?: MessageString,
  { ignoreError } = { ignoreError: false }
) => {
  try {
    const result = fn();
    infoLog(stringFunc(successMsg));
    return result;
  } catch (err) {
    errorLog(stringFunc(errorMsg));
    if (!ignoreError) {
      process.exit();
    }
  }
};
