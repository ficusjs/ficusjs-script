export function cssVars (condition) {
  return (window.CSS && window.CSS.supports(`(${condition})`)) || false
}
