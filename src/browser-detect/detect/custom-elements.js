import { evaluates } from './evaluates.js'

export function customElement () {
  return evaluates('window.customElements.define("mosaic-is-es6-and-custom-elements-test", class extends HTMLElement {})')
}
