import type { App } from 'vue'
import IconSvg from '@/components/svg-icon.vue'

export default (app: App) => {
  app.component('IconSvg', IconSvg)
}

export { IconSvg }
