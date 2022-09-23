import { resolve } from "path";

export const resolveFromRoot = (...paths) => resolve(process.cwd(), ...paths);
