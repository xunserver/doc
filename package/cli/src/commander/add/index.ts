import { program, Argument } from "commander";
import { lintAction } from "./lint";
import { babelAction } from "./babel";
import { postcssAction } from "./postcss";

/**
 * xs add 选项
 */
export interface AddOptions {
  config?: string;
  method: "git" | "npm";
}

/**
 * xs add 可添加的类型
 */
type AddType = "lint" | "babel" | "postcss";

program
  .command("add")
  .alias("a")
  .description("添加项目功能")
  .addArgument(
    new Argument("<type>", "添加组件分类").choices(["lint", "babel", "postcss"])
  )
  .option("-C, --config [config]", "采用设定的配置")
  .option("-M, --method [method]", "拉取方式", "git")

  .action(async (type: AddType, option: AddOptions) => {
    switch (type) {
      case "lint":
        return lintAction(option);
      case "babel":
        return babelAction(option);
      case "postcss":
        return postcssAction(option);
    }
  });
