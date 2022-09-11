import del from "del";
import { src, dest, parallel, task, series } from "gulp";

export default series(
  () => del(["src", "dist"]),
  parallel(
    () => src("template/*").pipe(dest("src/template")),
    () =>
      src("svg/*").pipe((file: File, encoding, done) => {
        console.log(args);
        return;
      })
  )
);
