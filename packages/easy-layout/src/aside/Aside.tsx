import type { PropType } from 'vue'
import { defineComponent } from 'vue'
import {TreeNode,
  MenuProps,
  SubMenuProps,
  MenuItemProps} from '../layout/types'

import { ElMenu, ElScrollbar } from 'element-plus'

import { Navbar } from '../navbar'
import { SlotsType } from 'vue/dist/vue'

const asideProps = {
  menuList: {
    required: true,
    default: () => [],
    type: Array as PropType<TreeNode[]>
  },
  menuProps: {
    required: false,
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
}

export default defineComponent({
  name: 'EvAside',
  props: asideProps,

  emits: ['menuItemClick'],

  slots: Object as SlotsType<{
    fold: any;
    menuIcon: TreeNode;
  }>,

  setup(props, { slots, emit }) {
    const { menuList } = props
    const { fold, menuIcon } = slots

    const menuItemClick = (data: TreeNode) => {
      emit('menuItemClick', data)
    }

    return () => {
      if (!menuList.length) {
        return <aside class="ev-aside"></aside>
      }
      return (
        <aside class="ev-aside">
          <ElScrollbar>
            <ElMenu {...props.menuProps}>
              {menuList.map((item) => (
                <Navbar
                  v-slots={{ menuIcon }}
                  menu={item}
                  key={item.id}
                  subMenuProps={props.subMenuProps}
                  menuItemProps={props.menuItemProps}
                  onMenuItemClick={(data) => menuItemClick(data)}
                ></Navbar>
              ))}
            </ElMenu>
          </ElScrollbar>
          <div class="aside-bottom">{fold?.()}</div>
        </aside>
      )
    }
  }
})
