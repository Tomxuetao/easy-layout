import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'node:path'
import svgLoader from 'vite-svg-loader'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { visualizer } from 'rollup-plugin-visualizer'
import { LayoutResolver } from 'layout-vue3/es/utils/auto-import'

export default defineConfig({
  plugins: [
    vue(),
    svgLoader(),
    visualizer({
      open: true,
      gzipSize: true
    }),
    AutoImport({
      resolvers: [LayoutResolver()]
    }),
    Components({
      resolvers: [LayoutResolver()]
    })
  ],
  resolve: {
    alias: [
      {
        find: '@',
        replacement: resolve(__dirname, 'src')
      }
    ],
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
  },
  build: {
    outDir: 'dist',
    assetsInlineLimit: 2048,
    cssCodeSplit: true
  }
})
