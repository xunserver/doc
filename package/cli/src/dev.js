#! /usr/bin/env node
require("esbuild-register/dist/node").register({
  tsconfigRaw: require("../tsconfig.json"),
});
require("./index");
