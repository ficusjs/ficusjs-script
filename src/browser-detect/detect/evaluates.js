/* eslint-disable no-new-func,no-new */
export function evaluates (statement) {
  try {
    new Function(statement)()
    return true
  } catch (err) {
    return false
  }
}
