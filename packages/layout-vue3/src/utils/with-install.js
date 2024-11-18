const camelizeRE = /-(\w)/g
export const camelize = (str) =>
  str.replace(camelizeRE, (_, c) => c.toUpperCase())
export function withInstall(options) {
  options.install = (app) => {
    const { name } = options
    if (name) {
      app.component(name, options)
      app.component(camelize(`-${name}`), options)
    }
  }
  return options
}
