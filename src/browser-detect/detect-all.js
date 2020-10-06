import { classes } from './detect/classes.js'
import { lets } from './detect/lets.js'
import { consts } from './detect/consts.js'
import { symbols } from './detect/symbols.js'
import { arrowFunction } from './detect/arrow-function.js'
import { spread } from './detect/spread.js'
import { customElement } from './detect/custom-elements.js'
import { promise } from './detect/promise.js'
import { fetch } from './detect/fetch.js'
import { typeModule } from './detect/type-module.js'
import { detectAll } from './detect/detect-all.js'

const tests = {
  class: classes,
  const: consts,
  let: lets,
  arrowFunction,
  spread,
  symbols,
  customElement,
  promise,
  fetch,
  typeModule
}

/**
 * Function to detect Javascript features
 * @param {...string} args The list of Javascript tests
 */
export function all (...args) {
  return detectAll(tests, ...args)
}
