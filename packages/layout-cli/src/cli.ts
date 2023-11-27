import { Command } from 'commander'

import { cliVersion } from './index.js'

const program = new Command()

program.version(`@easy/cli ${cliVersion}`)

program
  .command('clean')
  .description('Clean all dist files')
  .action(async () => {
    const { clean } = await import('./commands/clean.js')
    return clean()
  })

program
  .command('build')
  .description('Compile components in production mode')
  .action(async () => {
    const { build } = await import('./commands/build.js')
    return build()
  })

program.parse()
