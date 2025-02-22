import { defineComponent, ref, provide, watch } from 'vue';
import { Main } from '../main';
import { Aside } from '../aside';
import { Header } from '../header';
import { clapTree, computedRootNode } from '../utils';
export default defineComponent({
    name: 'EvLayout',
    props: {
        imgBg: {
            type: String,
            required: false
        },
        navMode: {
            type: String,
            required: false,
            default: () => 'aside',
            validator: (value) => ['aside', 'header'].includes(value)
        },
        showCrumb: {
            type: Boolean,
            required: false,
            default: () => false
        },
        menuList: {
            required: true,
            default: () => [],
            type: Array
        },
        collapse: {
            type: Boolean,
            required: false,
            default: () => false
        },
        modelValue: {
            required: true,
            type: Object
        }
    },
    emits: ['update:modelValue'],
    slots: Object,
    setup(props, { slots, emit }) {
        const { logo, fold, router, menuIcon } = slots;
        const { imgBg, navMode, menuList, showCrumb } = props;
        const menuMap = clapTree(menuList);
        provide('menuMap', menuMap);
        const activeId = ref(props.modelValue.id || '');
        const rootNode = computedRootNode(activeId.value, menuMap);
        const tempList = ref(navMode === 'aside' ? menuList : rootNode.children);
        const activeRootId = ref(navMode === 'aside' ? '' : rootNode.id);
        const menuItemClick = (data) => {
            emit('update:modelValue', Object.assign(Object.assign({}, props.modelValue), data));
            activeId.value = data.id;
        };
        watch(() => activeRootId.value, () => {
            tempList.value = menuMap.get(activeRootId.value).children;
        });
        return () => {
            return (<div class="ev-layout" style={`background-image: url(${imgBg})`}>
          <Header v-slots={{ logo }} navMode={navMode} menuList={menuList} v-model={activeRootId.value}></Header>
          <Aside v-slots={{ fold, menuIcon }} activeId={activeId.value} menuList={tempList.value} collapse={props.collapse} onMenuItemClick={(data) => menuItemClick(data)}></Aside>
          <Main v-slots={{ router }} menuList={menuList} showCrumb={showCrumb} activeId={activeId.value}></Main>
        </div>);
        };
    }
});
