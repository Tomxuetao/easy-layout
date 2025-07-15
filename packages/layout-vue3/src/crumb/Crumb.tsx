import {
  type Ref,
  type PropType,
  ref,
  watch,
  toRefs,
  inject,
  defineComponent
} from 'vue'
import { clapTree } from '../utils'
import { TreeNode } from '../layout/types'

export default defineComponent({
  name: 'ev-crumb',

  props: {
    activeId: {
      required: true,
      type: String
    },
    menuList: {
      required: true,
      default: () => [],
      type: Array as PropType<TreeNode[]>
    },
    customCrumbs: {
      type: Array as PropType<TreeNode[]>,
      required: false
    }
  },

  setup(props) {
    const { activeId, menuList, customCrumbs } = toRefs(props)
    const menuMap: Map<string, TreeNode> =
      inject('menuMap') || clapTree(menuList.value)

    const generateCrumb = (activeData: TreeNode) => {
      const breadcrumbs: TreeNode[] = [activeData]
      const recursion = (activeData: TreeNode) => {
        const { pid } = activeData || {}
        if (pid) {
          const tempData = menuMap.get(pid)!
          breadcrumbs.unshift(tempData!)
          recursion(tempData)
        }
      }
      recursion(activeData)

      return breadcrumbs
    }

    const crumbList: Ref<TreeNode[] | undefined> = ref()

    watch(
      () => activeId.value,
      () => {
        crumbList.value = customCrumbs.value?.length
          ? customCrumbs.value
          : generateCrumb(menuMap.get(activeId.value)!)
      },
      {
        immediate: true
      }
    )

    return () => {
      return (
        <div class="ev-crumb">
          {crumbList.value?.map((item, index) => (
            <>
              <div class="crumb-item">{item.text}</div>
              {index + 1 !== crumbList.value?.length ? (
                <div class="crumb-divide">/</div>
              ) : (
                ''
              )}
            </>
          ))}
        </div>
      )
    }
  }
})
