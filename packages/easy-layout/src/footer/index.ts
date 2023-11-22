import { withInstall } from '../utils/with-install'

import _Footer from './Footer'

export const Footer = withInstall(_Footer)
export default Footer

declare module 'vue' {
  export interface GlobalComponents {
    EvFooter: typeof Footer;
  }
}
