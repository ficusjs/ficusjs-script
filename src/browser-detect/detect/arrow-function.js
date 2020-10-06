import { evaluates } from './evaluates.js'

export function arrowFunction () {
  return evaluates('var f = x => 1')
}
