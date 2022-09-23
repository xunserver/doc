import chalk from "chalk";

const log = (message) => (message ? console.log(message) : "");
export const errorLog = (...messages) => {
  log(chalk.red(messages));
};

export const infoLog = (...messages) => {
  log(chalk.bgBlue(messages));
};

export const successLog = (...messages) => {
  log(chalk.green(messages));
};

export const warnLog = (...messages) => {
  log(chalk.yellowBright(messages));
};
