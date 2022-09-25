let chalk;

import("chalk").then((m) => {
  chalk = m.default;
});

const log = (message: string) => (message ? console.log(message) : "");
export const errorLog = (...messages: string[]) => {
  log(chalk.red(messages));
};

export const infoLog = (...messages: string[]) => {
  log(chalk.bgBlue(messages));
};

export const successLog = (...messages: string[]) => {
  log(chalk.green(messages));
};

export const warnLog = (...messages: string[]) => {
  log(chalk.yellowBright(messages));
};
