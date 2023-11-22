import { defineComponent, SlotsType } from 'vue'
import type { PropType } from 'vue'
import { TreeNode } from '../layout/types'

import { ElSubMenu, ElMenuItem } from 'element-plus'

export default defineComponent({
  name: 'EvNavbar',

  slots: Object as SlotsType<{
    menuIcon: any;
  }>,

  props: {
    menu: {
      type: Object as PropType<TreeNode>,
      required: true
    }
  },
  setup(props, { slots }) {
    const { menuIcon } = slots

    const menuItemClick = (data: TreeNode) => {
      console.log(data)
    }

    return () => {
      const { menu } = props

      const subMenuSlots = {
        title: () => {
          return (
            <>
              {menuIcon?.({ menu })}
              <span>{menu.text}</span>
            </>
          )
        }
      }

      const menuItemSlots = {
        default: () => menuIcon?.({ menu }),
        title: () => <span>{menu.text}</span>
      }

      if (menu.children?.length) {
        return (
          <ElSubMenu index={menu.id} v-slots={subMenuSlots}>
            {menu.children.map((item) => (
              <ev-navbar key={item.id} menu={item}></ev-navbar>
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
