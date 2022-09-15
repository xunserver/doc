import del from "del";
import { src, dest, series } from "gulp";
import { pipe } from "@xunserver/util";
import parseXML from "@rgrove/parse-xml";
import { streamTransform } from "./plugin/streamTransform";
import { svgo } from "./plugin/svgo";
import { formateSvg } from "./plugin/svgFormat";
import rename from "gulp-rename";
import { genIcon } from "./plugin/genIcon";

export const clean = () => del(["src", "dist"]);

export default series(
  clean,
  () => src("template/*").pipe(dest("src")),
  () =>
    src("svg/*")
      .pipe(
        streamTransform((content, file) => {
          return pipe(
            svgo,
            parseXML,
            formateSvg(file),
            JSON.stringify,
            genIcon
          )(content);
        })
      )
      .pipe(
        rename((file) => {
          file.dirname = "";
          file.extname = ".ts";
        })
      )
      .pipe(dest("src/icon"))
);
