import ejs, { Data } from "ejs";
import fs from "fs";
import path from "path";

export const renderAndOutput = async (
  source: string,
  dest: string,
  context: Data
) => {
  const result = await ejs.renderFile(source, context);
  fs.writeFileSync(path.resolve(process.cwd(), dest), result);
};
