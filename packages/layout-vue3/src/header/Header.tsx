import { SlotsType, PropType, defineComponent, inject, ref, watch } from 'vue'
import { TreeNode } from '../layout/types'
import { clapTree, computedRootNode } from '../utils'

export default defineComponent({
  name: 'ev-header',

  slots: Object as SlotsType<{
    logo: any
    avatar: any
  }>,

  props: {
    activeId: {
      required: true,
      type: String
    },
    menuList: {
      required: false,
      default: () => [],
      type: Array as PropType<TreeNode[]>
    },
    navMode: {
      type: String,
      required: false,
      default: () => 'aside',
      validator: (value: string) => ['aside', 'header'].includes(value)
    }
  },

  emits: ['menuChange'],

  setup(props, { slots, emit }) {
    const { logo, avatar } = slots

    const { menuList } = props

    const menuMap: Map<string, TreeNode> =
      inject('menuMap') || clapTree(menuList)

    const rootNode = computedRootNode(props.activeId, menuMap)!

    const activeRootId = ref(props.navMode === 'aside' ? '' : rootNode.id)

    const changeMenu = (menu: TreeNode) => {
      if (menu.id !== activeRootId.value) {
        activeRootId.value = menu.id
        emit('menuChange', menu.children)
      }
    }

    const renderHeaderCenter = () =>
      props.navMode === 'header' ? (
        <div class="header-center">
          {menuList.map((item) => (
            <div
              onClick={() => changeMenu(item)}
              class={
                item.id === activeRootId.value
                  ? 'center-item item-active'
                  : 'center-item'
              }
            >
              <div class="item-text">{item.text}</div>
            </div>
          ))}
        </div>
      ) : (
        <div class="header-center"></div>
      )

    watch(
      () => props.activeId,
      (value) => {
        if (props.navMode === 'header') {
          const rootNode = computedRootNode(value, menuMap)!
          if (rootNode.id !== activeRootId.value) {
            activeRootId.value = rootNode.id
            emit('menuChange', rootNode.children)
          }
        }
      }
    )
    watch(
      () => props.navMode,
      (value) => {
        if (value === 'aside') {
          activeRootId.value = ''
          emit('menuChange', menuList)
        } else {
          const rootNode = computedRootNode(props.activeId, menuMap)!
          activeRootId.value = rootNode.id
          emit('menuChange', rootNode.children)
        }
      }
    )

    return () => {
      return (
        <header class="ev-header">
          <div class="header-left">{logo?.()}</div>
          {renderHeaderCenter()}
          <div class="header-right">{avatar?.()}</div>
        </header>
      )
    }
  }
})
