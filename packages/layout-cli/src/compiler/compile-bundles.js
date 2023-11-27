import { build } from 'vite'
import { getPackageJson, getVantConfig } from '../common/constant.js'
import { mergeCustomViteConfig } from '../common/index.js'
import { getViteConfigForPackage } from '../config/vite.package.js'
export async function compileBundles() {
  var _a
  const dependencies = getPackageJson().dependencies || {}
  const external = Object.keys(dependencies)
  const DEFAULT_OPTIONS = [
    {
      minify: false,
      formats: ['umd']
    },
    {
      minify: true,
      formats: ['umd']
    },
    {
      minify: false,
      formats: ['es', 'cjs'],
      external
    }
  ]
  const bundleOptions =
    ((_a = getVantConfig().build) === null || _a === void 0
      ? void 0
      : _a.bundleOptions) || DEFAULT_OPTIONS
  await Promise.all(
    bundleOptions.map(async (config) =>
      build(
        await mergeCustomViteConfig(
          getViteConfigForPackage(config),
          'production'
        )
      )
    )
  )
}
