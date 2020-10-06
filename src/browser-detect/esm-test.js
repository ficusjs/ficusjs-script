import * as detect from './detect-all.js'

/**
 * Function to detect ES2015 features
 */
export function esmTest () {
  return detect.all('symbols', 'class', 'const', 'arrowFunction', 'typeModule')
}
