import { resolve } from "path";

export const resolveFromRoot = (...paths: string[]) => {
  return resolve(process.cwd(), ...paths);
}
