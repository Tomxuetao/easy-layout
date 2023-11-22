export default {
  name: "easy-layout",
  build: {
    name: "easy-layout",
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
