// myName -> my-name
export function toKebabCase(input) {
  return input.replace(
    /[A-Z]/g,
    (val, index) => (index === 0 ? '' : '-') + val.toLowerCase()
  )
}
// name `v2.0.0` -> name
export function removeVersion(str) {
  return str.replace(/`(\w|\.)+`/g, '').trim()
}
// *boolean* -> boolean
// _boolean_ -> boolean
export function formatType(type) {
  return type.replace(/(^(\*|_))|((\*|_)$)/g, '')
}
export function normalizePath(path) {
  return path.replace(/\\/g, '/')
}
