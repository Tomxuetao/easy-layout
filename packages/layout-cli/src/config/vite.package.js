import { join } from 'node:path'
import { setBuildTarget } from '../common/index.js'
import { CWD, ES_DIR, getVantConfig, LIB_DIR } from '../common/constant.js'
export function getViteConfigForPackage({ minify, formats, external = [] }) {
  var _a
  setBuildTarget('package')
  const { name, build } = getVantConfig()
  const entryExtension =
    ((_a = build === null || build === void 0 ? void 0 : build.extensions) ===
      null || _a === void 0
      ? void 0
      : _a.esm) || '.js'
  const entry = join(ES_DIR, `index${entryExtension}`)
  const shouldReplaceEnv =
    minify ||
    (formats === null || formats === void 0 ? void 0 : formats.includes('umd'))
  return {
    root: CWD,
    logLevel: 'silent',
    define: shouldReplaceEnv
      ? {
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      }
      : undefined,
    build: {
      emptyOutDir: false,
      lib: {
        name,
        entry,
        formats,
        fileName: (format) => {
          const suffix = format === 'umd' ? '' : `.${format}`
          return minify ? `${name}${suffix}.min.js` : `${name}${suffix}.js`
        }
      },
      // terser has better compression than esbuild
      minify: minify ? 'terser' : false,
      rollupOptions: {
        external: [...external, 'vue'],
        output: {
          dir: LIB_DIR,
          exports: 'named',
          globals: {
            vue: 'Vue'
          }
        }
      }
    }
  }
}
