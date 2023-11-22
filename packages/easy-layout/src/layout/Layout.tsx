import { SlotsType, defineComponent } from 'vue'

import { Header } from '../header'
import { Aside } from '../aside'
import { Main } from '../main'
import type { PropType } from 'vue'
import { TreeNode } from 'packages/easy-layout/src/layout/types'

export default defineComponent({
  name: 'EvLayout',

  inheritAttrs: true,

  slots: Object as SlotsType<{
    logo: {};
    fold: {};
    menuIcon: {};
  }>,
  props: {
    imgBg: {
      type: String,
      required: false
    },
    collapse: {
      type: Boolean,
      required: false,
      default: () => false
    },
    menuList: {
      required: true,
      default: () => [],
      type: Array as PropType<TreeNode[]>
    }
  },
  setup(props, { slots }) {
    const { logo, fold, menuIcon } = slots
    const { imgBg, menuList } = props
    return () => {
      return (
        <div class="ev-layout" style={`background-image: url(${imgBg})`}>
          <Header v-slots={{ logo }}></Header>
          <Aside
            v-slots={{ fold, menuIcon }}
            menuList={menuList}
            collapse={props.collapse}
          ></Aside>
          <Main></Main>
        </div>
      )
    }
  }
})
