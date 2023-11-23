import { withInstall } from '../utils/with-install'

import _Crumb from './Crumb'

export const Crumb = withInstall(_Crumb)
export default Crumb

declare module 'vue' {
  export interface GlobalComponents {
    EvCrumb: typeof Crumb;
  }
}
