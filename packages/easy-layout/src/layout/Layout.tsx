import { SlotsType, defineComponent } from 'vue'

import { Header } from '../header'
import { Aside } from '../aside'
import { Main } from '../main'
import type { PropType } from 'vue'
import { TreeNode, MenuProps, SubMenuProps, MenuItemProps } from './types'

export default defineComponent({
  name: 'EvLayout',

  inheritAttrs: true,
  props: {
    imgBg: {
      type: String,
      required: false
    },
    menuList: {
      required: true,
      default: () => [],
      type: Array as PropType<TreeNode[]>
    },
    menuProps: {
      required: false,
      default: () => {},
      type: Object as PropType<MenuProps>
    },
    subMenuProps: {
      required: false,
      type: Object as PropType<SubMenuProps>
    },
    menuItemProps: {
      required: false,
      type: Object as PropType<MenuItemProps>
    }
  },

  emits: ['menuItemClick'],

  slots: Object as SlotsType<{
    logo: {};
    fold: {};
    router: {};
    menuIcon: {};
  }>,

  setup(props, { slots, emit }) {
    const { logo, fold, router, menuIcon } = slots
    const { imgBg, menuList } = props

    const menuItemClick = (data: TreeNode) => {
      emit('menuItemClick', data)
    }

    return () => {
      return (
        <div class="ev-layout" style={`background-image: url(${imgBg})`}>
          <Header v-slots={{ logo }}></Header>
          <Aside
            v-slots={{ fold, menuIcon }}
            menuList={menuList}
            menuProps={props.menuProps}
            subMenuProps={props.subMenuProps}
            menuItemProps={props.menuItemProps}
            onMenuItemClick={(data) => menuItemClick(data)}
          ></Aside>
          <Main v-slots={{ router }}></Main>
        </div>
      )
    }
  }
})
