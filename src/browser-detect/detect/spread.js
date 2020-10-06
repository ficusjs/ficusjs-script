import { evaluates } from './evaluates.js'

export function spread () {
  return evaluates('Math.max(...[ 5, 10 ])')
}
