import program from 'commander'

import syncPages from 'lib/utils/syncPages'

// CLI utilities.
program
  .command('sync-pages')
  .description('read `/pages` and generate index file.')
  .action(() => {
    syncPages()
  })

program.parse(process.argv)
