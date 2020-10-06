export function promise () {
  return typeof window.Promise !== 'undefined' && typeof window.Promise.resolve === 'function'
}
