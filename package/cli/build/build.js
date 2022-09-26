const shelljs = require("shelljs");

shelljs.exec("rm -rf dist");
shelljs.exec("tsc");
shelljs.exec("cp  -rp src/commander/add/template dist/commander/add/template");
