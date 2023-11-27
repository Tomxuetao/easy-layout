import { existsSync } from 'node:fs'
import { join, isAbsolute } from 'node:path'
import { getVantConfig } from '../common/index.js'
import { STYLE_DIR, SRC_DIR } from './constant.js'
function getCssLang() {
  var _a, _b
  const vantConfig = getVantConfig()
  const preprocessor =
    ((_b =
      (_a = vantConfig.build) === null || _a === void 0 ? void 0 : _a.css) ===
      null || _b === void 0
      ? void 0
      : _b.preprocessor) || 'scss'
  if (preprocessor === 'sass') {
    return 'scss'
  }
  return preprocessor
}
export const CSS_LANG = getCssLang()
export function getCssBaseFile() {
  var _a, _b
  const vantConfig = getVantConfig()
  let path = join(STYLE_DIR, `base.${CSS_LANG}`)
  const baseFile =
    ((_b =
      (_a = vantConfig.build) === null || _a === void 0 ? void 0 : _a.css) ===
      null || _b === void 0
      ? void 0
      : _b.base) || ''
  if (baseFile) {
    path = isAbsolute(baseFile) ? baseFile : join(SRC_DIR, baseFile)
  }
  if (existsSync(path)) {
    return path
  }
  return null
}
const IMPORT_STYLE_RE = /import\s+?(?:(?:".*?")|(?:'.*?'))[\s]*?(?:;|$|)/g
// "import 'a.less';" => "import 'a.css';"
export function replaceCSSImportExt(code) {
  return code.replace(IMPORT_STYLE_RE, (str) =>
    str.replace(`.${CSS_LANG}`, '.css')
  )
}
