import { type PropType, type SlotsType, defineComponent, ref } from 'vue'
import { TreeNode, MenuProps, SubMenuProps, MenuItemProps } from './types'

import { Header } from '../header'
import { Aside } from '../aside'
import { Main } from '../main'

export default defineComponent({
  name: 'EvLayout',

  props: {
    imgBg: {
      type: String,
      required: false
    },
    showCrumb: {
      type: Boolean,
      required: false,
      default: () => false
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
      default: () => {},
      type: Object as PropType<SubMenuProps>
    },
    menuItemProps: {
      required: false,
      default: () => {},
      type: Object as PropType<MenuItemProps>
    }
  },

  emits: ['menuItemClick'],

  slots: Object as SlotsType<{
    logo: {};
    fold: {};
    router: {};
    menuIcon: TreeNode;
  }>,

  setup(props, { slots, emit }) {
    const { logo, fold, router, menuIcon } = slots
    const { imgBg, menuList, showCrumb } = props

    const activeId = ref(props.menuProps.defaultActive || menuList[0].id || '')
    const menuItemClick = (data: TreeNode) => {
      emit('menuItemClick', data)
      activeId.value = data.id
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
          <Main
            v-slots={{ router }}
            menuList={menuList}
            showCrumb={showCrumb}
            activeId={activeId.value}
          ></Main>
        </div>
      )
    }
  }
})
