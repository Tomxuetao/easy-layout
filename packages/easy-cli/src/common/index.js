import fse from 'fs-extra'
import { sep, join } from 'node:path'
import { SRC_DIR, getVantConfig } from './constant.js'
import { loadConfigFromFile, mergeConfig } from 'vite'
const { lstatSync, existsSync, readdirSync, readFileSync, outputFileSync } =
  fse
export const EXT_REGEXP = /\.\w+$/
export const SFC_REGEXP = /\.(vue)$/
export const DEMO_REGEXP = new RegExp('\\' + sep + 'demo$')
export const TEST_REGEXP = new RegExp('\\' + sep + 'test$')
export const ASSET_REGEXP = /\.(png|jpe?g|gif|webp|ico|jfif|svg|woff2?|ttf)$/i
export const STYLE_REGEXP = /\.(css|less|scss)$/
export const SCRIPT_REGEXP = /\.(js|ts|jsx|tsx)$/
export const JSX_REGEXP = /\.(j|t)sx$/
export const ENTRY_EXTS = ['js', 'ts', 'tsx', 'jsx', 'vue']
export function removeExt(path) {
  return path.replace('.js', '')
}
export function replaceExt(path, ext) {
  return path.replace(EXT_REGEXP, ext)
}
export function hasDefaultExport(code) {
  return code.includes('export default') || code.includes('export { default }')
}
export function getComponents() {
  const EXCLUDES = ['.DS_Store']
  const dirs = readdirSync(SRC_DIR)
  return dirs
    .filter((dir) => !EXCLUDES.includes(dir))
    .filter((dir) =>
      ENTRY_EXTS.some((ext) => {
        const path = join(SRC_DIR, dir, `index.${ext}`)
        if (existsSync(path)) {
          return hasDefaultExport(readFileSync(path, 'utf-8'))
        }
        return false
      })
    )
}
export const isDir = (dir) => lstatSync(dir).isDirectory()
export const isDemoDir = (dir) => DEMO_REGEXP.test(dir)
export const isTestDir = (dir) => TEST_REGEXP.test(dir)
export const isAsset = (path) => ASSET_REGEXP.test(path)
export const isSfc = (path) => SFC_REGEXP.test(path)
export const isStyle = (path) => STYLE_REGEXP.test(path)
export const isScript = (path) => SCRIPT_REGEXP.test(path)
export const isJsx = (path) => JSX_REGEXP.test(path)
const camelizeRE = /-(\w)/g
const pascalizeRE = /(\w)(\w*)/g
export function camelize(str) {
  return str.replace(camelizeRE, (_, c) => c.toUpperCase())
}
export function pascalize(str) {
  return camelize(str).replace(
    pascalizeRE,
    (_, c1, c2) => c1.toUpperCase() + c2
  )
}
export function decamelize(str, sep = '-') {
  return str
    .replace(/([a-z\d])([A-Z])/g, '$1' + sep + '$2')
    .replace(/([A-Z])([A-Z][a-z\d]+)/g, '$1' + sep + '$2')
    .toLowerCase()
}
export function normalizePath(path) {
  return path.replace(/\\/g, '/')
}
export function setModuleEnv(value) {
  process.env.BABEL_MODULE = value
}
export function setNodeEnv(value) {
  process.env.NODE_ENV = value
}
export function setBuildTarget(value) {
  process.env.BUILD_TARGET = value
}
export function isDev() {
  return process.env.NODE_ENV === 'development'
}
// smarter outputFileSync
// skip output if file content unchanged
export function smartOutputFile(filePath, content) {
  if (existsSync(filePath)) {
    const previousContent = readFileSync(filePath, 'utf-8')
    if (previousContent === content) {
      return
    }
  }
  outputFileSync(filePath, content)
}
export async function mergeCustomViteConfig(config, mode) {
  var _a
  const vantConfig = getVantConfig()
  const configureVite =
    (_a = vantConfig.build) === null || _a === void 0
      ? void 0
      : _a.configureVite
  const userConfig = await loadConfigFromFile(
    {
      mode,
      command: mode === 'development' ? 'serve' : 'build'
    },
    undefined,
    process.cwd()
  )
  if (configureVite) {
    const ret = configureVite(config)
    if (ret) {
      config = ret
    }
  }
  if (userConfig) {
    return mergeConfig(config, userConfig.config)
  }
  return config
}
export { getVantConfig }
