import { withInstall } from '../utils/with-install'

import _Aside from './Aside'

export const Aside = withInstall(_Aside)
export default Aside

declare module 'vue' {
  export interface GlobalComponents {
    EvAside: typeof Aside;
  }
}
