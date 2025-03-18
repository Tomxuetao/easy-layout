import type { App } from 'vue'
import IconSvg from '@/components/svg-icon.vue'
import { Main, Aside, Crumb, Header, Navbar, Layout } from 'layout-vue3'

export default (app: App) => {
  app.component('IconSvg', IconSvg)

  app.component(Main.name!, Main)
  app.component(Aside.name!, Aside)
  app.component(Crumb.name!, Crumb)
  app.component(Header.name!, Header)
  app.component(Navbar.name!, Navbar)
  app.component(Layout.name!, Layout)
}

export { IconSvg }
