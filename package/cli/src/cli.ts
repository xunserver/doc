import { program } from 'commander'
import './commander/init'
import './commander/add'

import { description, version } from '../package.json'
program.description(description).version(version)

program.parse();
