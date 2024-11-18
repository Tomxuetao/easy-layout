import { Crumb } from '../crumb';
import { defineComponent, toRefs } from 'vue';
export default defineComponent({
    name: 'EvMain',
    slots: Object,
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
            type: Array
        }
    },
    setup(props, { slots }) {
        const { menuList, activeId, showCrumb } = toRefs(props);
        const { router } = slots;
        return () => {
            return (<main class="ev-main">
          <div class="main-inner">
            {showCrumb.value && menuList.value.length ? (<Crumb menuList={menuList.value} activeId={activeId.value}></Crumb>) : ('')}
            <div class="inner-ctx">{router === null || router === void 0 ? void 0 : router()}</div>
          </div>
        </main>);
        };
    }
});
