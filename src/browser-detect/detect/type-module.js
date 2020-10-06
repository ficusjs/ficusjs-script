/* global HTMLScriptElement */

export function typeModule () {
  return 'noModule' in HTMLScriptElement.prototype
}
