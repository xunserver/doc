import { program, Argument } from "commander"
import { lintAction } from "./lint";
import { babelAction } from "./babel";
import { postcssAction } from "./postcss";

program
  .command("add")
  .alias("a")
  .description("添加项目功能")
  .addArgument(new Argument('<type>', '添加组件分类').choices(['lint', 'babel', 'postcss']))
  .option(
    "-C, --config [config]",
    "采用设定的配置",
  )
  .option(
    "-M, --method [method]",
    "拉取方式",
    'git'
  )

  .action(async (type, option) => {
    const { method, config } = option;

    if (config) {
      return loadByConfig()
    }
    switch (type) {
      case 'lint':
        return lintAction(option)
      case 'babel':
        return babelAction(option)
      case 'postcss':
          return postcssAction(option)
    }
  });
