import { withInstall } from '../utils/with-install'

import _Header from './Header'

export const Header = withInstall(_Header)
export default Header

declare module 'vue' {
  export interface GlobalComponents {
    EvHeader: typeof Header;
  }
}
