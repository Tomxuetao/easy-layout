import fse from 'fs-extra'
import path from 'node:path'
import hash from 'hash-sum'
import { parse, compileTemplate, compileScript } from 'vue/compiler-sfc'
import { replaceExt } from '../common/index.js'
const { remove, readFileSync, outputFile } = fse
const RENDER_FN = '__vue_render__'
const VUEIDS = '__vue_sfc__'
const EXPORT = 'export default'
// trim some unused code
function trim(code) {
  return code.replace(/\/\/\n/g, '').trim()
}
function getSfcStylePath(filePath, ext, index) {
  const number = index !== 0 ? `-${index + 1}` : ''
  return replaceExt(filePath, `-sfc${number}.${ext}`)
}
// inject render fn to script
function injectRender(script, render) {
  script = trim(script)
  render = render.replace('export function render', `function ${RENDER_FN}`)
  script += `\n${render}\n${VUEIDS}.render = ${RENDER_FN} \n`
  return script
}
function injectScopeId(script, scopeId) {
  script += `\n${VUEIDS}._scopeId = '${scopeId}'`
  return script
}
function injectStyle(script, styles, filePath) {
  if (styles.length) {
    const imports = styles
      .map((style, index) => {
        const { base } = path.parse(getSfcStylePath(filePath, 'css', index))
        return `import './${base}';`
      })
      .join('\n')
    script = `${imports}\n${script}`
    return script
  }
  return script
}
export function parseSfc(filename) {
  const source = readFileSync(filename, 'utf-8')
  const { descriptor } = parse(source, {
    filename
  })
  return descriptor
}
export async function compileSfc(filePath) {
  var _a, _b
  const tasks = [remove(filePath)]
  const source = readFileSync(filePath, 'utf-8')
  const descriptor = parseSfc(filePath)
  const { template, styles } = descriptor
  const hasScoped = styles.some((s) => s.scoped)
  const scopeId = hasScoped ? `data-v-${hash(source)}` : ''
  // compile js part
  if (descriptor.script || descriptor.scriptSetup) {
    const lang =
      ((_a = descriptor.script) === null || _a === void 0 ? void 0 : _a.lang) ||
      ((_b = descriptor.scriptSetup) === null || _b === void 0
        ? void 0
        : _b.lang) ||
      'js'
    const scriptFilePath = replaceExt(filePath, `.${lang}`)
    tasks.push(
      new Promise((resolve) => {
        let script = ''
        let bindingMetadata
        if (descriptor.scriptSetup) {
          const { bindings, content } = compileScript(descriptor, {
            id: scopeId
          })
          script += content
          bindingMetadata = bindings
        } else {
          script += descriptor.script.content
        }
        script = injectStyle(script, styles, filePath)
        script = script.replace(EXPORT, `const ${VUEIDS} =`)
        if (template) {
          const render = compileTemplate({
            id: scopeId,
            source: template.content,
            filename: filePath,
            compilerOptions: {
              bindingMetadata
            }
          }).code
          script = injectRender(script, render)
        }
        if (scopeId) {
          script = injectScopeId(script, scopeId)
        }
        script += `\n${EXPORT} ${VUEIDS}`
        // ts-nocheck should be placed on the first line
        // the generated render fn lacks type definitions
        if (lang === 'ts') {
          script = '// @ts-nocheck\n' + script
        }
        outputFile(scriptFilePath, script).then(resolve)
      })
    )
  }
  // compile style part
  tasks.push(
    ...styles.map(async (style, index) => {
      const cssFilePath = getSfcStylePath(filePath, style.lang || 'css', index)
      const styleSource = trim(style.content)
      // TODO support scoped
      // if (style.scoped) {
      //   styleSource = compileUtils.compileStyle({
      //     id: scopeId,
      //     scoped: true,
      //     source: styleSource,
      //     filename: cssFilePath,
      //     preprocessLang: style.lang,
      //   }).code;
      // }
      return outputFile(cssFilePath, styleSource)
    })
  )
  return Promise.all(tasks)
}
