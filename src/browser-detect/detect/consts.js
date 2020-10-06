import { evaluates } from './evaluates.js'

export function consts () {
  return evaluates('const a = 1')
}
