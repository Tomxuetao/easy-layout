import { Crumb } from '../crumb'
import { TreeNode } from '../layout/types'
import { defineComponent, PropType, SlotsType, toRefs } from 'vue'

export default defineComponent({
  name: 'ev-main',

  slots: Object as SlotsType<{
    router: any
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
          <div
            class={['main-inner', showCrumb.value ? 'main-inner-crumb' : '']}
          >
            {showCrumb.value && menuList.value.length ? (
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
