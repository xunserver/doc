import { program } from "commander";
import { resolve } from "path";
import { USER_PREFIX } from "../instance";

import { fetchGit, fetchNpm } from "../utils/fetch";

interface InitOptions {
  /**
   * 模板名称
   */
  template: string;
  /**
   * 拉取方式
   */
  method?: "git" | "npm";
}

program
  .command("init")
  .alias("i")
  .description("初始化项目")
  .argument("<name>", "项目名称")
  .argument("[folder]", "项目目录")
  .option(
    "-T, --template <template>",
    `项目模板，按照${USER_PREFIX}/\${项目模板}`
  )
  .option("-M, --method [method]", "拉取方式，默认git", "git")

  .action(
    async (
      name: string,
      dest: string = name,
      { template, method }: InitOptions
    ) => {
      const fullDest = resolve(process.cwd(), dest || name);
      if (method === "git") {
        await fetchGit(template, fullDest);
      } else if (method === "npm") {
        await fetchNpm(template, fullDest);
      }

      // 修改
    }
  );
