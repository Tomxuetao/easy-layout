import { defineComponent, toRefs } from 'vue';
import { ElMenu, ElScrollbar } from 'element-plus';
import { Navbar } from '../navbar';
const asideProps = {
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
    activeId: {
        required: true,
        type: String
    }
};
export default defineComponent({
    name: 'EvAside',
    props: asideProps,
    emits: ['menuItemClick'],
    slots: Object,
    setup(props, { slots, emit }) {
        const { fold, menuIcon } = slots;
        const { menuList, collapse, activeId } = toRefs(props);
        const menuItemClick = (data) => {
            emit('menuItemClick', data);
        };
        return () => {
            if (!menuList.value.length) {
                return <aside class="ev-aside"></aside>;
            }
            return (<aside class="ev-aside">
          <ElScrollbar>
            <ElMenu collapse={collapse.value} default-active={activeId.value}>
              {menuList.value.map((item) => (<Navbar v-slots={{ menuIcon }} menu={item} key={item.id} onMenuItemClick={(data) => menuItemClick(data)}></Navbar>))}
            </ElMenu>
          </ElScrollbar>
          <div class="aside-bottom">{fold === null || fold === void 0 ? void 0 : fold()}</div>
        </aside>);
        };
    }
});
