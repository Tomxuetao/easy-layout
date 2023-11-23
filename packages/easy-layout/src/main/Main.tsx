import { defineComponent, PropType, SlotsType, toRefs } from 'vue'

import { Crumb } from '../crumb'
import { TreeNode } from 'packages/easy-layout/src/layout/types'

export default defineComponent({
  name: 'EvMain',

  slots: Object as SlotsType<{
    router: any;
  }>,

  props: {
    activeId: {
      required: true,
      type: String
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
    }
  },

  setup(props, { slots }) {
    const { menuList, activeId, showCrumb } = toRefs(props)

    const { router } = slots
    return () => {
      return (
        <main class="ev-main">
          <div class="main-inner">
            {showCrumb.value ? (
              <Crumb
                menuList={menuList.value}
                activeId={activeId.value}
              ></Crumb>
            ) : (
              ''
            )}
            <div class="inner-ctx">{router?.()}</div>
          </div>
        </main>
      )
    }
  }
})
