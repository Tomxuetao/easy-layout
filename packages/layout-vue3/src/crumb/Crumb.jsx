import { defineComponent, inject, ref, toRefs, watch } from 'vue';
import { clapTree } from '../utils';
export default defineComponent({
    name: 'EvCrumb',
    props: {
        menuList: {
            required: true,
            default: () => [],
            type: Array
        },
        activeId: {
            required: true,
            type: String
        }
    },
    setup(props) {
        const { menuList, activeId } = toRefs(props);
        const menuMap = inject('menuMap') || clapTree(menuList.value);
        const generateCrumb = (activeData) => {
            const breadcrumbs = [activeData];
            const recursion = (activeData) => {
                const { pid } = activeData || {};
                if (pid) {
                    const tempData = menuMap.get(pid);
                    breadcrumbs.unshift(tempData);
                    recursion(tempData);
                }
            };
            recursion(activeData);
            return breadcrumbs;
        };
        const crumbList = ref();
        watch(() => activeId.value, () => {
            crumbList.value = generateCrumb(menuMap.get(activeId.value));
        }, {
            immediate: true
        });
        return () => {
            var _a;
            return (<div class="ev-crumb">
          {(_a = crumbList.value) === null || _a === void 0 ? void 0 : _a.map((item, index) => {
                    var _a;
                    return (<>
              <div class="crumb-item">{item.text}</div>
              {index + 1 !== ((_a = crumbList.value) === null || _a === void 0 ? void 0 : _a.length) ? (<div class="crumb-divide">/</div>) : ('')}
            </>);
                })}
        </div>);
        };
    }
});
