import { resolve } from "path";

export const resolveFromProjectRoot = (...paths: string[]) => {
  return resolve(process.cwd(), ...paths);
}

export const resolveFromCliRoot = (...paths: string[]) => {
  return resolve(__dirname, '../../', ...paths);
}
