import { SlotsType, PropType, defineComponent } from 'vue'
import { TreeNode } from '../layout/types'

export default defineComponent({
  name: 'EvHeader',

  slots: Object as SlotsType<{
    logo: any;
    avatar: any;
  }>,

  props: {
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
    },
    modelValue: {
      type: String,
      required: false,
      default: () => ''
    }
  },

  emits: ['update:modelValue'],

  setup(props, { slots, emit }) {
    const { logo, avatar } = slots

    const { navMode, menuList } = props

    const changeMenu = (id: string) => {
      emit('update:modelValue', id)
    }

    const renderHeaderCenter = () =>
      navMode === 'header' ? (
        <div class="header-center">
          {menuList.map((item) => (
            <div
              onClick={() => changeMenu(item.id)}
              class={
                item.id === props.modelValue
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
