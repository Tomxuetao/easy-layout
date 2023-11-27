import { parse } from 'node:path'
import fse from 'fs-extra'
import { logger } from 'rslog'
import { getVantConfig, replaceExt } from '../common/index.js'
import { compileCss } from './compile-css.js'
import { compileLess } from './compile-less.js'
import { compileSass } from './compile-sass.js'
const { readFileSync, writeFileSync, removeSync } = fse
async function compileFile(filePath) {
  const parsedPath = parse(filePath)
  try {
    if (parsedPath.ext === '.less') {
      const source = await compileLess(filePath)
      return await compileCss(source)
    }
    if (parsedPath.ext === '.scss') {
      const source = await compileSass(filePath)
      return await compileCss(source)
    }
    const source = readFileSync(filePath, 'utf-8')
    return await compileCss(source)
  } catch (err) {
    logger.error('Compile style failed: ' + filePath)
    throw err
  }
}
export async function compileStyle(filePath) {
  var _a, _b
  const css = await compileFile(filePath)
  const vantConfig = getVantConfig()
  if (
    (_b =
      (_a = vantConfig.build) === null || _a === void 0 ? void 0 : _a.css) ===
      null || _b === void 0
      ? void 0
      : _b.removeSourceFile
  ) {
    removeSync(filePath)
  }
  writeFileSync(replaceExt(filePath, '.css'), css)
}
