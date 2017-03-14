#!/usr/bin/env node

const spawn = require('cross-spawn')
const script = process.argv[2]
const args = process.argv.slice(3)

const scripts = [ 'build', 'dev', 'start' ]

if (scripts.includes(script)) {
  const filename = require.resolve(`../scripts/${script}`)
  const result = spawn.sync('node', [filename].concat(args), { stdio: 'inherit' })
  if (result.signal) {
    if (result.signal === 'SIGKILL') {
      console.log(
        'The build failed because the process exited too early. ' +
          'This probably means the system ran out of memory or someone called ' +
          '`kill -9` on the process.'
      )
    } else if (result.signal === 'SIGTERM') {
      console.log(
        'The build failed because the process exited too early. ' +
          'Someone might have called `kill` or `killall`, or the system could ' +
          'be shutting down.'
      )
    }
    process.exit(1)
  }
  process.exit(result.status)
} else {
  console.log('Unknown script "' + script + '".')
  console.log('Perhaps you need to update v-scripts?')
  console.log(
    'See: https://github.com/zce/create-v-app'
  )
}
