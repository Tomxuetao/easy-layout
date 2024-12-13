import { inject, PropType } from 'vue'
import { defineComponent, toRefs } from 'vue'
import { TreeNode } from '../layout/types'

import { Navbar } from '../navbar'
import { clapTree } from '../utils'
import { SlotsType } from 'vue/dist/vue'
import { ElMenu, ElScrollbar } from 'element-plus'

const asideProps = {
  menuList: {
    required: true,
    default: () => [],
    type: Array as PropType<TreeNode[]>
  },
  collapse: {
    type: Boolean,
    required: false,
    default: () => false
  },
  activeId: {
    required: true,
    type: String
  },
  uniqueOpened: {
    type: Boolean,
    required: false,
    default: () => true
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
    const { fold, menuIcon } = slots
    const { menuList, collapse, activeId, uniqueOpened } = toRefs(props)

    const menuItemClick = (data: TreeNode) => {
      emit('menuItemClick', data as TreeNode)
    }
    const menuMap: Map<any, TreeNode> =
      inject('menuMap') || clapTree(menuList.value)

    const tempNode: TreeNode = menuMap.get(activeId.value)!
    const defaultActive =
      !tempNode.isMenu && tempNode.url ? tempNode.pid : tempNode.id
    console.log(menuMap)

    return () => {
      if (!menuList.value.length) {
        return <aside class="ev-aside"></aside>
      }
      return (
        <aside class="ev-aside">
          <ElScrollbar>
            <ElMenu
              collapse={collapse.value}
              default-active={defaultActive}
              unique-opened={uniqueOpened.value}
            >
              {menuList.value.map((item) => (
                <Navbar
                  v-slots={{ menuIcon }}
                  menu={item}
                  key={item.id}
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
