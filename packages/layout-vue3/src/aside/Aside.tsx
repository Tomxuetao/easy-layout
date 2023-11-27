import type { PropType } from 'vue'
import { defineComponent, toRefs } from 'vue'
import { TreeNode } from '../layout/types'

import { ElMenu, ElScrollbar } from 'element-plus'

import { Navbar } from '../navbar'
import { SlotsType } from 'vue/dist/vue'

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
    const { menuList, collapse } = toRefs(props)

    const menuItemClick = (data: TreeNode) => {
      emit('menuItemClick', data)
    }

    return () => {
      if (!menuList.value.length) {
        return <aside class="ev-aside"></aside>
      }
      return (
        <aside class="ev-aside">
          <ElScrollbar>
            <ElMenu collapse={collapse.value}>
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
