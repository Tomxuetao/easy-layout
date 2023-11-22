import postcss from 'postcss'
import postcssrc from 'postcss-load-config'
import { transform } from 'esbuild'
import { POSTCSS_CONFIG_FILE } from '../common/constant.js'
export async function compileCss(source) {
  const config = await postcssrc({}, POSTCSS_CONFIG_FILE)
  const { css } = await postcss(config.plugins).process(source, {
    from: undefined
  })
  const result = await transform(css, {
    loader: 'css',
    minify: true,
    target: ['chrome53', 'safari10']
  })
  return result.code
}
