import fetchFromGit from "download-git-repo";
// const fetchFromNpm = require('npm-fetch')

import { REPO_PREFIX, USER_PREFIX } from "../instance.js";

export const fetchGit = (template, dest) => {
  return fetchFromGit(`${USER_PREFIX}/${template}`, dest, function (err) {
    console.error(err);
  });
};

export const fetchNpm = async (template, dest) => {
  // return fetchFromNpm(`${REPO_PREFIX}-${template}`, dest, function(err: Error) {
  //   console.error(err)
  // })
};
