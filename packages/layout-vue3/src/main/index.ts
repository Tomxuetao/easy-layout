import { withInstall } from '../utils/with-install'

import _Main from './Main'

export const Main = withInstall(_Main)
export default Main

declare module 'vue' {
  export interface GlobalComponents {
    EvMain: typeof Main;
  }
}
