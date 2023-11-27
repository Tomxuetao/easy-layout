import { withInstall } from '../utils/with-install'

import _Navbar from './Navbar'

export const Navbar = withInstall(_Navbar)
export default Navbar

declare module 'vue' {
  export interface GlobalComponents {
    EvNavbar: typeof Navbar;
  }
}
