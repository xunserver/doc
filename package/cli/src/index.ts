import { program } from "commander";

import "./commander/init";
import "./commander/pub";
import "./commander/add";
import "./commander/build";

import { description, version } from "../package.json";
program.description(description).version(version);

program.parse();
