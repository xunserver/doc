const { resolve } = require("path");
const c = (file) => resolve(__dirname, "./config", file);

module.exports = {
  config: {
    recommended: c("recommended"),
  },
};
