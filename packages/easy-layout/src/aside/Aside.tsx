import type { PropType } from 'vue'
import { defineComponent } from 'vue'
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

  slots: Object as SlotsType<{
    fold: any;
    menuIcon: any;
  }>,
  props: asideProps,

  setup(props, { slots }) {
    const { menuList } = props
    const { fold, menuIcon } = slots
    return () => {
      if (!menuList.length) {
        return <aside class="ev-aside"></aside>
      }
      return (
        <aside class="ev-aside">
          <ElScrollbar>
            <ElMenu collapse={props.collapse}>
              {menuList.map((item) => (
                <Navbar
                  v-slots={{ menuIcon }}
                  menu={item}
                  key={item.id}
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
