import { defineComponent } from 'vue';
import { ElSubMenu, ElMenuItem } from 'element-plus';
export default defineComponent({
    name: 'EvNavbar',
    slots: Object,
    props: {
        menu: {
            type: Object,
            required: true
        }
    },
    emits: ['menuItemClick'],
    setup(props, { slots, emit }) {
        const { menuIcon } = slots;
        const menuItemClick = (data) => {
            emit('menuItemClick', data);
        };
        return () => {
            var _a;
            const { menu } = props;
            const subMenuSlots = {
                title: () => {
                    return (<>
              {menuIcon === null || menuIcon === void 0 ? void 0 : menuIcon(menu)}
              <span>{menu.text}</span>
            </>);
                }
            };
            const menuItemSlots = {
                default: () => menuIcon === null || menuIcon === void 0 ? void 0 : menuIcon(menu),
                title: () => <span>{menu.text}</span>
            };
            if ((_a = menu.children.filter((item) => item.isMenu)) === null || _a === void 0 ? void 0 : _a.length) {
                return (<ElSubMenu index={menu.id} v-slots={subMenuSlots}>
            {menu.children.map((item) => (<ev-navbar key={item.id} menu={item} onMenuItemClick={() => menuItemClick(item)}></ev-navbar>))}
          </ElSubMenu>);
            }
            else {
                return (<ElMenuItem index={menu.id} v-slots={menuItemSlots} onClick={() => menuItemClick(menu)}></ElMenuItem>);
            }
        };
    }
});
