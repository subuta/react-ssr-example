import program from 'commander'
import unwrapModule from 'lib/common/utils/unwrapModule'

// Fix NODE_ENV to development for CLI runner.
process.env.NODE_ENV = 'development'

// CLI utilities.
program
  .command('sync-pages')
  .description('read `/pages` and generate index file.')
  .option('--watch', 'Start file watcher for /pages changes.')
  .action((options) => {
    // Set as development if watch specified.
    if (!options.watch) {
      process.env.DISABLE_WATCH_PAGES = true
    }

    // Load syncPages script with new env.
    const syncPages = unwrapModule(require('lib/server/syncPages'))

    syncPages()
  })

program.parse(process.argv)
