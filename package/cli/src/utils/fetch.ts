import fetchFromGit from "download-git-repo";
// const fetchFromNpm = require('npm-fetch')

import { USER_PREFIX } from "../instance";

export const fetchGit = (template: string, dest: string) => {
  return fetchFromGit(`${USER_PREFIX}/${template}`, dest, function (err) {
    console.error(err);
  });
};

export const fetchNpm = async (template: string, dest: string) => {
  // return fetchFromNpm(`${REPO_PREFIX}-${template}`, dest, function(err: Error) {
  //   console.error(err)
  // })
};
