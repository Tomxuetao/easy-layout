export default {
  name: "layout-vue3",
  build: {
    name: "layout-vue3",
    packageManager: 'pnpm',
    srcDir: 'src',
    tagPrefix: 'ev-',
    namedExport: true,
    extensions: {
      esm: '.mjs'
    },
    css: {
      removeSourceFile: true
    }
  }
}
