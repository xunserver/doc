import { execSync, ExecSyncOptions } from "child_process";
import path from "path";
let cwd: string = process.cwd();

const cd = (_path) => {
  cwd = path.resolve(_path);
};

const cp = (from, to) => {
  return exec(`cp -rp ${from} ${to}`);
};

const exec = (bin, option: ExecSyncOptions = {}) => {
  return execSync(bin, {
    cwd,
    ...option,
  });
};

export { cd, exec, cp };
