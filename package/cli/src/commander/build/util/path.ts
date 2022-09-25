import { resolve } from "path";

export const resolveFromRoot = (...paths: string[]) =>
  resolve(process.cwd(), ...paths);
