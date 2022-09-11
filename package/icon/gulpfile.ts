import del from "del";
import { src, dest, parallel, task, series } from "gulp";
import { Transform } from "stream";
import { isBuffer } from "util";

export default series(
  () => del(["src", "dist"]),
  parallel(
    () => src("template/*").pipe(dest("src/template")),
    () =>
      src("svg/**/aim.svg").pipe(
        new Transform({
          transform(chunk, enc, callback) {
            return callback(null, chunk);
          },
        })
      )
  )
);
