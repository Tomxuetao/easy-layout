import { defineComponent, SlotsType } from 'vue'
import type { PropType } from 'vue'
import { TreeNode, SubMenuProps, MenuItemProps } from '../layout/types'

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
          <ElSubMenu
            index={menu.id}
            {...props.subMenuProps}
            v-slots={subMenuSlots}
          >
            {menu.children.map((item) => (
              <ev-navbar
                key={item.id}
                menu={item}
                subMenuProps={props.subMenuProps}
                menuItemProps={props.menuItemProps}
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
            {...props.menuItemProps}
            onClick={() => menuItemClick(menu)}
          ></ElMenuItem>
        )
      }
    }
  }
})
