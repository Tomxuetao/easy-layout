import { defineComponent } from 'vue';
export default defineComponent({
    name: 'EvHeader',
    slots: Object,
    props: {
        menuList: {
            required: false,
            default: () => [],
            type: Array
        },
        navMode: {
            type: String,
            required: false,
            default: () => 'aside',
            validator: (value) => ['aside', 'header'].includes(value)
        },
        modelValue: {
            type: String,
            required: false,
            default: () => ''
        }
    },
    emits: ['update:modelValue'],
    setup(props, { slots, emit }) {
        const { logo } = slots;
        const { navMode, menuList } = props;
        const changeMenu = (id) => {
            emit('update:modelValue', id);
        };
        const renderHeaderCenter = () => navMode === 'header' ? (<div class="header-center">
          {menuList.map((item) => (<div onClick={() => changeMenu(item.id)} class={item.id === props.modelValue
                    ? 'center-item item-active'
                    : 'center-item'}>
              <div class="item-text">{item.text}</div>
            </div>))}
        </div>) : (<div class="header-center"></div>);
        return () => {
            return (<header class="ev-header">
          <div class="header-left">{logo === null || logo === void 0 ? void 0 : logo()}</div>
          {renderHeaderCenter()}
          <div class="header-right"></div>
        </header>);
        };
    }
});
