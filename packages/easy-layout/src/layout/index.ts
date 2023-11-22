import { withInstall } from '../utils/with-install'

import _Layout from './Layout'

export const Layout = withInstall(_Layout)
export default Layout

declare module 'vue' {
  export interface GlobalComponents {
    EvLayout: typeof Layout;
  }
}
