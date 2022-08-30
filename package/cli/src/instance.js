import { fileURLToPath } from 'url'
import { dirname } from 'path'

export const REPO_PREFIX = 'xunserver-template'
export const USER_PREFIX = 'xunserver'
const __filename = fileURLToPath(import.meta.url);
export const rootDirName = dirname(__filename);