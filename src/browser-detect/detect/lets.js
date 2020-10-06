import { evaluates } from './evaluates.js'

export function lets () {
  return evaluates('let a = 1')
}
