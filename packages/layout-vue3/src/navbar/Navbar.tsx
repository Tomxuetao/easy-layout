import { defineComponent, SlotsType } from 'vue'
import type { PropType } from 'vue'
import { TreeNode } from '../layout/types'

import { ElSubMenu, ElMenuItem } from 'element-plus'

export default defineComponent({
  name: 'EvNavbar',

  slots: Object as SlotsType<{
    menuIcon: TreeNode;
  }>,

  props: {
    menu: {
      type: Object as PropType<TreeNode>,
      required: true
    }
  },

  emits: ['menuItemClick'],
  setup(props, { slots, emit }) {
    const { menuIcon } = slots

    const menuItemClick = (data: TreeNode) => {
      emit('menuItemClick', data)
    }

    return () => {
      const { menu } = props

      const subMenuSlots = {
        title: () => {
          return (
            <>
              {menuIcon?.(menu)}
              <span>{menu.text}</span>
            </>
          )
        }
      }

      const menuItemSlots = {
        default: () => menuIcon?.(menu),
        title: () => <span>{menu.text}</span>
      }

      if (menu.children.filter((item) => item.isMenu)?.length) {
        return (
          <ElSubMenu index={menu.id} v-slots={subMenuSlots}>
            {menu.children.map((item) => (
              <ev-navbar
                key={item.id}
                menu={item}
                onMenuItemClick={() => menuItemClick(item)}
              ></ev-navbar>
            ))}
          </ElSubMenu>
        )
      } else {
        return (
          <ElMenuItem
            index={menu.id}
            v-slots={menuItemSlots}
            onClick={() => menuItemClick(menu)}
          ></ElMenuItem>
        )
      }
    }
  }
})
