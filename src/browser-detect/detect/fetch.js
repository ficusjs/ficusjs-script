export function fetch () {
  return typeof window.fetch !== 'undefined' &&
    typeof window.Headers !== 'undefined' &&
    typeof window.Request !== 'undefined' &&
    typeof window.Response !== 'undefined'
}
