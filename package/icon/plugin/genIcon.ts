import ejs from "ejs";
import { readFileSync } from "fs";

export const genIcon = (content: string) =>
  ejs.render(readFileSync("template/icon.ts.ejs").toString(), {
    content,
  });
