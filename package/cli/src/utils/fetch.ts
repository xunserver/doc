const fetchFromGit = require('download-git-repo')
const fetchFromNpm = require('npm-fetch')

import { REPO_PREFIX, USER_PREFIX } from '../instance';

export const fetchGit = async (template: string, dest: string) => {
    return fetchFromGit(`${USER_PREFIX}/${REPO_PREFIX}-${template}`, dest, function(err: Error) {
      console.error(err)
    })
  }
  
 export const fetchNpm = async (template: string, dest: string) => {
    return fetchFromNpm(`${REPO_PREFIX}-${template}`, dest, function(err: Error) {
      console.error(err)
    })
  }