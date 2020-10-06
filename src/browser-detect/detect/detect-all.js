export function detectAll (tests, ...args) {
  return args.every(function (testName) {
    const method = tests[testName]
    if (method && typeof method === 'function') {
      return method()
    } else {
      console.warn(`No detection available for '${testName}'`)
      return false
    }
  })
}
